import { action, observable, flow } from 'mobx'
import * as Api from '@app/utils/api'
import {
  SIGN_PRIZE_TYPE_LOCALE,
  SIGN_PRIZE_TYPE,
  INFO_DIALOG_TYPE,
  DRAW_OUT_STATUS,
  TOP_UP_RESULT,
  REGISTER_STATUS,
} from '@app/utils/constants'
import locale from '@app/utils/formLocale'
import wait from '@app/utils/wait'
import store from './helpers/store'

const getToken = () => {
  const encodedKey = btoa('token')
  const encodedToken = localStorage.getItem(encodedKey)
  if (encodedToken) {
    const decodedToken = atob(encodedToken)
    return decodedToken
  }
  return null
}

const handleTimer = (time) => {
  if (typeof time === 'number') return Math.ceil(time)
  return time
}

@store
export default class DataStore {
  // Loading
  @observable
  isLoading = false

  @action
  setIsLoading(value) {
    this.isLoading = value
  }

  // Info Dialog
  @observable
  infoDialogType = undefined

  @action
  setInfoDialogType(type) {
    this.infoDialogType = type
  }

  // Alert Message
  @observable
  alertMessage = undefined

  @action
  setAlertMessage(msg) {
    this.alertMessage = msg
  }

  @action
  clearAlertMessage() {
    this.alertMessage = undefined
  }

  // Commodities
  @observable.ref
  commodities = undefined;

  @flow
  *getCommodities(req) {
    this.isLoading = true
    const res = yield Api.getCommodities(req)
    if (!res) {
      this.isLoading = false
      return
    }
    const { source: data, totalItemCount: totalCount } = res
    this.commodities = { data, totalCount }
    this.isLoading = false
  }

  // Ads
  @observable.ref
  ads = [];

  @flow
  *getAds() {
    this.isLoading = true
    const res = yield Api.getAds()
    if (res) this.ads = res.source
    this.isLoading = false
  }

  // Commodity
  @observable
  drawOutStatus = DRAW_OUT_STATUS.UNSET

  @observable.ref
  drawOutResult = undefined

  @observable
  commodity = undefined

  @observable.ref
  countdownSec = {}

  @action
  clearDrawOutResult() {
    this.drawOutResult = undefined
  }

  @action
  setDrawOutStatus(value) {
    this.drawOutStatus = value
  }

  @action
  setCountdownSec(key, value) {
    this.countdownSec = { ...this.countdownSec, [key]: value }
  }

  @flow
  *drawOut(req) {
    try {
      if (!this.isLogged) return
      const token = getToken()
      if (!token) return
      const res = yield Api.drawOut(req, token)
      this.drawOutStatus = DRAW_OUT_STATUS.DRAWING
      this.drawOutResult = res.source.getPrizes
      if (res.source.timer) {
        const timer = handleTimer(res.source.timer)
        this.setCountdownSec(req.commodityId, timer)
      }
      yield this.loadMember()
      yield this.getCommodity(req.commodityId)
      yield this.getPrizes(req.commodityId)
    } catch (e) {
      const msg = e.response?.data?.errors
      console.log('draw out failed', e, msg)
      this.setCountdownSec(req.commodityId)
      this.drawOutStatus = DRAW_OUT_STATUS.FAILED
      if (e.response?.data?.source) {
        this.drawOutStatus = DRAW_OUT_STATUS.PROTECTING
        const timer = handleTimer(e.response.data.source.timer)
        this.setCountdownSec(req.commodityId, timer)
        return
      }
      this.alertMessage = `抽獎失敗，${msg}`
    }
  }

  @flow
  *getCommodity(commodityId) {
    const res = yield Api.getCommodity(commodityId)
    if (res) this.commodity = res.source
  }

  @flow
  *getPrizes(commodityId) {
    const res = yield Api.getPrizes(commodityId)
    if (!res) return
    const { source: prizes } = res
    this.commodity = { ...this.commodity, prizes }
  }

  // Bread Crumbs
  @observable.ref
  breadCrumbs = []

  @action
  setBreadCrumbs(breadCrumbs) {
    this.breadCrumbs = breadCrumbs
  }

  // Member
  @observable
  isLogged = false

  @observable
  member = undefined

  @observable
  consumeLog = undefined

  @observable
  pendingPrize = undefined

  @observable
  ticket = undefined

  @observable
  reclaimLog = undefined

  @observable
  shipLog = undefined

  @observable
  getPendingPrizeReq = undefined;

  @flow
  *login(req) {
    try {
      const res = yield Api.login(req)
      this.token = res.source
      const encodedToken = btoa(res.source)
      const encodedKey = btoa('token')
      localStorage.setItem(encodedKey, encodedToken)
      this.isLogged = true
      yield this.loadMember()
      this.alertMessage = '登入成功'
    } catch (e) {
      console.log('login failed', e)
      const msg = e.response?.data
      this.alertMessage = `登入失敗，${msg}`
    }
  }

  @flow
  *loadMember() {
    const token = getToken()
    if (token) {
      this.isLogged = true
      const res = yield Api.getMember(token)
      if (res) this.member = res.source
    }
  }

  @flow
  *getConsumeLog(req) {
    const token = getToken()
    if (token) {
      const res = yield Api.getConsumeLog(req, token)
      if (!res) return
      const { source: data, totalItemCount: totalCount } = res
      this.consumeLog = { data, totalCount }
    }
  }

  @flow
  *getTickets(req) {
    const token = getToken()
    if (!token) return
    const res = yield Api.getTickets(req, token)
    if (!res) return
    const { source: data, totalItemCount: totalCount } = res
    this.ticket = { data, totalCount }
  }

  @action
  logout() {
    const encodedKey = btoa('token')
    localStorage.removeItem(encodedKey)
    this.member = undefined
    this.isLogged = false
    this.countdownSec = {}
  }

  // Register

  @observable
  registerReq = undefined

  @action
  setRegisterReq(req) {
    this.registerReq = req
    this.setInfoDialogType(INFO_DIALOG_TYPE.REGISTER)
  }

  @flow
  *register(referralCode) {
    if (!this.registerReq) return
    try {
      const res = yield Api.register(this.registerReq)
      const { source: data } = res
      const { token } = data
      const encodedKey = btoa('token')
      const encodedToken = btoa(token)
      localStorage.setItem(encodedKey, encodedToken)
      this.isLogged = true
      this.registerReq = undefined
      this.setInfoDialogType()
      this.alertMessage = '註冊成功'
    } catch (e) {
      const failedColumns = Object.keys(e.response?.data?.errors || {})
      if (failedColumns.length)
        this.alertMessage = `註冊失敗，請檢查欄位： ${failedColumns
          .map((k) => locale[k.toLowerCase()])
          .join(', ')}`
      this.alertMessage = `註冊失敗，${e.response?.data}`
      console.log('register failed', e)
    }
  }

  @flow
  *getPendingPrize(req) {
    const token = getToken()
    if (token) {
      const res = yield Api.getPendingPrize(req, token)
      if (!res) return
      const { source: data, totalItemCount: totalCount } = res
      this.pendingPrize = { data, totalCount }
      this.getPendingPrizeReq = req
    }
  }

  @flow
  *getReclaimLog(req) {
    const token = getToken()
    if (token) {
      const res = yield Api.getReclaimLog(req, token)
      if (!res) return
      const { source: data, totalItemCount: totalCount } = res
      this.reclaimLog = { data, totalCount }
    }
  }

  @flow
  *getShipLog(req) {
    const token = getToken()
    if (token) {
      const res = yield Api.getShipLog(req, token)
      if (!res) return
      const { source: data, totalItemCount: totalCount } = res
      this.shipLog = { data, totalCount }
    }
  }

  @flow
  *reclaim(req) {
    try {
      const token = getToken()
      if (token) {
        yield Api.reclaim(req, token)
        this.getPendingPrize(this.getPendingPrizeReq)
        this.alertMessage = '回收成功'
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `回收失敗，${msg}`
      console.log('reclaim failed', e, msg)
    }
  }

  @flow
  *ship(req) {
    try {
      const token = getToken()
      if (token) {
        yield Api.ship(req, token)
        this.getPendingPrize(this.getPendingPrizeReq)
      }
    } catch (e) {
      const failedColumns = Object.keys(e.response?.data?.errors || {})
      if (failedColumns.length)
        this.alertMessage = `配送申請失敗，請檢查欄位： ${failedColumns
          .map((k) => locale[k.toLowerCase()])
          .join(', ')}`
      const msg = e.response?.data
      this.alertMessage = `配送失敗，${msg}`
      console.log('ship failed', e, msg)
    }
  }

  // Sign In
  @observable
  isSigned = false

  @observable
  signInOptions = undefined

  @observable
  signInResult = undefined

  @observable
  isSigning = false

  @action
  setIsSigning(value) {
    this.isSigning = value
  }

  @flow
  *getSignIn() {
    if (!this.isLogged) return
    const token = getToken()
    const res = yield Api.getSignIn(token)
    if (!res) return
    const { isSign: isSigned, setting } = res.source
    this.isSigned = isSigned
    if (!setting) return
    this.signInOptions = Array.from({ length: 8 }).map((_, i) => {
      const type = setting[`prize${i + 1}Type`]
      const value = setting[`prize${i + 1}Value`]
      const title = getTitle(type, value)
      return {
        type,
        value,
        probability: setting[`prize${i + 1}Probability`],
        title,
        option: title,
      }
    })
    function getTitle(type, value) {
      if (type === SIGN_PRIZE_TYPE.COIN)
        return `${value} ${SIGN_PRIZE_TYPE_LOCALE[type]}`
      return `${SIGN_PRIZE_TYPE_LOCALE[type]}`
    }
  }

  @flow
  *signIn() {
    try {
      if (!this.isLogged) return
      const token = getToken()
      this.isSigning = true
      const res = yield Api.signIn(token)
      if (!res) return
      yield this.loadMember()
      this.isSigned = true
      const source = res.source
      this.signInResult = this.signInOptions.find(
        (p) => p.type === source.prizeType && p.value === source.prizeValue
      )?.title
    } catch (e) {
      this.isSigning = false

      const msg = e.response?.data
      this.alertMessage = `簽到失敗，${msg}`
      console.log('signIn failed', e, msg)
    }
  }

  // Ranking List
  @observable.ref
  rankingList = undefined;

  @flow
  *getRankingList() {
    const res = yield Api.getRankingList()
    if (res) this.rankingList = res.source
  }

  // Manufacturers
  @observable.ref
  manufacturers = undefined;

  @flow
  *getManufacturers() {
    const res = yield Api.getManufacturers()
    if (!res) return
    this.manufacturers = res.source
  }

  // Edit Member
  @flow
  *editMember(req) {
    try {
      const token = getToken()
      if (token) {
        yield Api.validateMember(token)
        yield Api.register(req)
        this.alertMessage = '修改會員資料成功'
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `修改會員資料失敗，${msg}`
      console.log('edit member failed', e, msg)
    }
  }

  // Edit Password
  @flow
  *editPassword(req) {
    try {
      const token = getToken()
      if (token) {
        yield Api.editPassword(req, token)
        this.alertMessage = '修改密碼成功'
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `修改密碼失敗，${msg}`
      console.log('edit password failed', e, msg)
    }
  }

  // Top Up

  @observable
  paymentUrl = undefined

  @observable
  topUpResult = TOP_UP_RESULT.NONE;

  @flow
  *topUp(req) {
    const token = getToken()
    if (token) {
      yield TPDirect.card.getPrime(getPrimeCallback(token, req, this))
    }

    function getPrimeCallback(token, req, thx) {
      return async (result) => {
        try {
          if (result.status !== 0) {
            throw new Error('get prime error ' + result.msg)
          }
          const prime = result.card.prime
          req = { ...req, prime }
          const res = await Api.topUp(req, token)
          if (!res || !res?.source?.paymentUrl) throw res
          thx.paymentUrl = res.source.paymentUrl
        } catch (e) {
          const msg = e.response?.data || e?.source?.message
          thx.alertMessage = `儲值失敗${!!msg ? '，' + msg : ''}`
          console.log('top up failed', e, msg)
        }
      }
    }
  }

  @flow
  *getTopUpResult() {
    try {
      const token = getToken()
      if (token) {
        const res = yield Api.getTopUpResult(token)

        if (res && res.success && res?.source?.success) {
          this.topUpResult = TOP_UP_RESULT.SUCCESS
          yield this.loadMember()
          return
        }
        yield wait(5000)
        const res2 = yield Api.getTopUpResult(token)
        if (res2 && res2.success && res?.source?.success) {
          this.topUpResult = TOP_UP_RESULT.SUCCESS
          yield this.loadMember()
        }
      }
    } catch (e) {
      const msg = e.response?.data
      this.topUpResult = TOP_UP_RESULT.FAILED
      console.log('get top up result failed', e, msg)
      this.alertMessage = `${!!msg ? msg : '金幣儲值失敗，請聯繫客服'}`
    }
  }

  // SEO
  @observable
  isRecord = sessionStorage.getItem('isVisited');

  @flow
  *recordVisitCount() {
    if (this.isRecord) return
    try {
      yield Api.recordVisitCount()
      sessionStorage.setItem('isVisited', true)
    } catch (e) {
      console.log('record visit count failed', e)
    }
  }

  // Line Auth

  @observable
  loginByLineUrl = undefined

  @observable
  userInfo = { accessToken: undefined, lineLoginUserId: undefined };

  @flow
  *getLoginByLineUrl() {
    try {
      const res = yield Api.getLoginByLineUrl()
      if (!res || !res?.source) throw res
      this.loginByLineUrl = res.source
    } catch (e) {
      console.log('login by line failed', e)
      const msg = e.response?.data
      this.alertMessage = `登入失敗，${msg}`
    }
  }

  @flow
  *getAccessTokenByLine(req) {
    try {
      const res = yield Api.getAccessTokenByLine(req)
      if (!res || !res?.source || !res?.source?.access_token) throw res
      yield this.getProfileByLine({ accessToken: res.source.access_token })
    } catch (e) {
      console.log('get access token by line failed', e)
      this.alertMessage = `登入失敗`
    }
  }

  @flow
  *getProfileByLine(req) {
    try {
      const res = yield Api.getProfileByLine(req)
      if (!res || !res?.source) throw res
      const { jwtToken, status } = res.source
      if (status === REGISTER_STATUS.REGISTER_BY_WEB) {
        this.alertMessage = '已透過網站註冊，請使用網站登入'
        return
      }
      if (status === REGISTER_STATUS.NOT_REGISTERED_YET) {
        this.setInfoDialogType(INFO_DIALOG_TYPE.REGISTER)
        this.userInfo = {
          accessToken: req.accessToken,
          lineLoginUserId: jwtToken,
        }
        return
      }
      if (!jwtToken) throw new Error('get jwt token error ' + res)
      const encodedKey = btoa('token')
      const encodedToken = btoa(jwtToken)
      localStorage.setItem(encodedKey, encodedToken)
      this.isLogged = true
      yield this.loadMember()
      this.alertMessage =
        '登入成功，請記得去會員中心修改個資 以避免影響您的權利'
    } catch (e) {
      console.log('get profile by line failed', e)
      const msg = e.response?.data
      this.alertMessage = `登入失敗，${msg}`
    }
  }

  @flow
  *registerByLine(referralCode) {
    console.log(' registerByLine:', referralCode)
    try {
      const res = yield Api.registerByLine({
        referralCode,
        ...this.userInfo,
      })
      const { source: token } = res
      const encodedKey = btoa('token')
      const encodedToken = btoa(token)
      localStorage.setItem(encodedKey, encodedToken)
      this.isLogged = true
      yield this.loadMember()
      this.alertMessage =
        '註冊成功，請記得去會員中心修改個資 以避免影響您的權利'
      this.setInfoDialogType()
    } catch (e) {
      console.log('register by line failed', e)
      const msg = e.response?.data
      this.alertMessage = `註冊失敗，${msg}`
    }
  }
}
