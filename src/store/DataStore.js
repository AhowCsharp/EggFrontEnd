import { action, observable, flow } from 'mobx'
import * as Api from '@app/utils/api'
import {
  SIGN_PRIZE_TYPE_LOCALE,
  SIGN_PRIZE_TYPE,
  INFO_DIALOG_TYPE,
  DRAW_OUT_STATUS,
  TOP_UP_RESULT,
  REGISTER_STATUS,
  CATEGORY,
} from '@app/utils/constants'
import locale from '@app/utils/formLocale'
import wait from '@app/utils/wait'
import getRandomColors from '@app/utils/getRandomColors'
import store from './helpers/store'

const invoiceNumberEncodedKey = btoa('invoiceNumber')
const invoiceTypeEncodedKey = btoa('invoiceType')
const invoiceCompanyNameEncodedKey = btoa('invoiceCompanyName')

const defaultFilterOptionsByCategory = Object.values(CATEGORY).reduce(
  (acc, key) => {
    acc[key] = {}
    return acc
  },
  {}
)

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

  @observable
  isToast = false

  @action
  setIsToast(value) {
    this.isToast = value
  }

  @action
  setAlertMessage(msg) {
    this.alertMessage = msg
  }

  @action
  clearAlertMessage() {
    this.alertMessage = undefined
    this.isToast = false
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

  // Ads and News
  @observable.ref
  newAds = []

  @observable.ref
  hotAds = []

  @observable.ref
  news = []

  @observable.ref
  newsById = {};

  @flow
  *getAds() {
    this.isLoading = true
    const res = yield Api.getAds()
    if (res) {
      this.newAds = res.source.newCommodities
      this.hotAds = res.source.hotsCommodities.map((c, i) => ({
        ...c,
        index: i + 1,
      }))
      this.news = res.source.news
    }
    this.isLoading = false
  }

  @flow
  *getNewsById(id) {
    this.isLoading = true
    const res = yield Api.getNews(id)
    if (res) {
      this.newsById = { ...this.newsById, [id]: res.source }
    }
    this.isLoading = false
  }

  // Commodity
  @observable
  drawOutStatus = DRAW_OUT_STATUS.UNSET

  @observable.ref
  drawOutResult = undefined

  @observable.ref
  drawOutBonusResult = {}

  @observable
  commodity = undefined

  @observable
  protectPlayer = undefined

  @observable.ref
  countdownSec = {}

  @action
  clearDrawOutResult() {
    this.drawOutResult = undefined
    this.drawOutBonusResult = {}
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
      let keysByType, cratesByType
      if (res.source.keys) {
        keysByType = res.source.keys.reduce((acc, cur) => {
          if (acc[cur['keyType']]) acc[cur['keyType']] += 1
          else acc[cur['keyType']] = 1
          return acc
        }, {})
      }
      if (res.source.crates) {
        cratesByType = res.source.crates.reduce((acc, cur) => {
          if (acc[cur['crateType']]) acc[cur['crateType']] += 1
          else acc[cur['crateType']] = 1
          return acc
        }, {})
      }
      this.drawOutBonusResult = {
        keys: keysByType || {},
        crates: cratesByType || {},
      }
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
        this.protectPlayer = e.response.data.source.protectPlayer
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
  crateLogs = undefined

  @observable
  currentCrateLogs = undefined

  @observable
  storedLogs = undefined

  @observable
  freeshippingTicketLogs = undefined

  @observable
  taskHistoryLogs = undefined

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
    localStorage.removeItem('referralCode')
    localStorage.removeItem(invoiceNumberEncodedKey)
    localStorage.removeItem(invoiceTypeEncodedKey)
    localStorage.removeItem(invoiceCompanyNameEncodedKey)
    this.member = undefined
    this.isLogged = false
    this.countdownSec = {}
  }

  // Register

  @observable
  registerReq = undefined

  @action
  setRegisterReq(req) {
    if (!this.isSmsVerified) {
      this.alertMessage = '請先驗證手機'
      return
    }
    this.registerReq = req
    this.setInfoDialogType(INFO_DIALOG_TYPE.REGISTER)
  }

  @flow
  *register(referralCode) {
    if (!this.registerReq) return
    try {
      const req = referralCode
        ? { ...this.registerReq, usedReferralCode: referralCode }
        : this.registerReq
      const res = yield Api.register(req)
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
  *getCrateLogs(req) {
    const token = getToken()
    if (token) {
      const res = yield Api.getCrateLogs(req, token)
      if (!res) return
      const { source: data, totalItemCount: totalCount } = res
      this.crateLogs = { data, totalCount }
    }
  }

  @flow
  *openCrate(req) {
    try {
      const token = getToken()
      if (token) {
        const res = yield Api.openCrate(req, token)
        // this.alertMessage = '開箱成功'
        if (!res) return
        const { source: data } = res
        this.currentCrateLogs = { data }
        yield this.loadMember()
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `開箱失敗，${msg}`
      console.log('reclaim failed', e, msg)
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
  *getFreeshippingticketLogs(req) {
    try {
      const token = getToken()
      if (token) {
        const res = yield Api.getFreeshippingticketLogs(req, token)
        if (!res) return
        const { source: data, totalItemCount: totalCount } = res
        this.freeshippingTicketLogs = { data, totalCount }
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `取得失敗，${msg}`
      console.log('freeshipping failed', e, msg)
    }
  }

  @flow
  *getTaskHistoryLogs(req) {
    try {
      const token = getToken()
      if (token) {
        const res = yield Api.getHistoryTaskLogs(req, token)
        if (!res) return
        const { source: data, totalItemCount: totalCount } = res
        this.taskHistoryLogs = { data, totalCount }
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `取得失敗，${msg}`
      console.log('freeshipping failed', e, msg)
    }
  }

  @flow
  *getStoredLogs(req) {
    try {
      const token = getToken()
      if (token) {
        const res = yield Api.getStoredLogs(req, token)
        if (!res) return
        const { source: data, totalItemCount: totalCount } = res
        this.storedLogs = { data, totalCount }
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `取得失敗，${msg}`
      console.log('storedLogs failed', e, msg)
    }
  }

  @flow
  *ship(req) {
    try {
      const token = getToken()
      if (token) {
        yield Api.ship(req, token)
        this.getPendingPrize(this.getPendingPrizeReq)
        this.alertMessage = '配送申請成功'
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

  @observable.ref
  taskList = undefined;

  @flow
  *getTaskList() {
    const res = yield Api.getTaskList()
    if (res) this.taskList = res.source
  }

  // Manufacturers
  @observable.ref
  manufacturers = undefined

  @observable.ref
  manufacturerColors = undefined;

  @flow
  *getManufacturers() {
    const res = yield Api.getManufacturers()
    if (!res) return
    this.manufacturers = res.source
  }

  @action
  setManufacturerColors() {
    if (!this.manufacturers || this.manufacturerColors) return
    const colors = getRandomColors(this.manufacturers, 'id')
    this.manufacturerColors = colors
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

  // forget Password
  @flow
  *forgetPassword(req) {
    try {
      yield Api.forgetPassword(req)
      this.alertMessage = '已成功寄送密碼重設信、簡訊，請查收'
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `重設信件寄送失敗，${msg}`
      console.log('forget password failed', e, msg)
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
    localStorage.setItem(invoiceNumberEncodedKey, this.invoiceNumber)
    localStorage.setItem(invoiceTypeEncodedKey, this.invoiceType)
    localStorage.setItem(invoiceCompanyNameEncodedKey, this.invoiceCompanyName)

    if (token) {
      yield TPDirect.card.getPrime(
        getPrimeCallback(
          token,
          {
            ...req,
            invoiceNumber: this.invoiceNumber,
            invoiceType: this.invoiceType,
            companyName:
              this.invoiceType === 4 ? this.invoiceCompanyName : null,
          },
          this
        )
      )
    }

    function getPrimeCallback(token, req, thx) {
      return async (result) => {
        try {
          if (result.status !== 0) {
            throw new Error('get prime error ' + result.msg)
          }
          const prime = result.card.prime
          req = { ...req, prime }
          console.log('getPrimeCallback:', {
            result,
            token,
            req,
          })
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

  @observable
  payeeInfo = undefined

  @action
  clearPayeeInfo() {
    this.payeeInfo = undefined
  }

  @flow
  *atmTopUp(req) {
    const token = getToken()
    localStorage.setItem(invoiceNumberEncodedKey, this.invoiceNumber)
    localStorage.setItem(invoiceTypeEncodedKey, this.invoiceType)
    localStorage.setItem(invoiceCompanyNameEncodedKey, this.invoiceCompanyName)

    if (token) {
      console.log('action atmTopUp ~ start getPrime')

      yield TPDirect.virtualAccount.getPrime(
        getPrimeCallback(
          token,
          {
            ...req,
            invoiceNumber: this.invoiceNumber,
            invoiceType: this.invoiceType,
            companyName:
              this.invoiceType === 4 ? this.invoiceCompanyName : null,
          },
          this
        )
      )
    }

    function getPrimeCallback(token, req, thx) {
      return async (err, result) => {
        try {
          if (result.status !== 0 || !!err) {
            throw new Error('atm get prime error ' + result.msg)
          }
          const prime = result.prime
          req = {
            ...req,
            prime,
          }
          console.log('get prime done, in atm getPrimeCallback')
          const res = await Api.atmTopUp(req, token)
          // console.log('atm top up getPrimeCallback res:', res)
          if (!res || !res?.source?.payee_info) throw res
          thx.payeeInfo = { ...res.source.payee_info, ...req }
        } catch (e) {
          const msg = e.response?.data || e?.source?.message
          // thx.alertMessage = `儲值失敗${!!msg ? '，' + msg : ''}`
          console.log('atmTopUp failed', e, msg)
        }
      }
    }
  }

  @flow
  *getTopUpResult(req) {
    try {
      const token = getToken()
      if (token) {
        const res = yield Api.getTopUpResult(req, token)
        if (res && res.success && res?.source?.success) {
          this.topUpResult = TOP_UP_RESULT.SUCCESS
          yield this.loadMember()
          return
        }
        yield wait(1500)
        const res2 = yield Api.getTopUpResult(req, token)
        if (res2 && res2.success && res?.source?.success) {
          this.topUpResult = TOP_UP_RESULT.SUCCESS
          yield this.loadMember()
        }
        yield wait(1500)
        const res3 = yield Api.getTopUpResult(req, token)
        if (res3 && res3.success && res?.source?.success) {
          this.topUpResult = TOP_UP_RESULT.SUCCESS
          yield this.loadMember()
        }
        yield wait(1500)
        const res4 = yield Api.getTopUpResult(req, token)
        if (res4 && res4.success && res?.source?.success) {
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
  userInfo = { accessToken: undefined, lineLoginUserId: undefined }

  @observable
  referralCode = localStorage.getItem('referralCode')

  @action
  setReferralCode(code) {
    this.referralCode = code
    localStorage.setItem('referralCode', code)
  }

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

  @flow
  *uploadHeadShot(file, statusMessage) {
    try {
      const token = getToken()
      if (token) {
        const formData = new FormData()
        formData.append('HeadShotFile', file) // Append the image file to the form data
        formData.append('StatusMessage', statusMessage)

        const res = yield Api.uploadHeadShot(formData, token) // Call the API with form data
        if (res && res.success) {
          this.alertMessage = '更新成功'
        } else {
          this.alertMessage = '更新失敗'
        }

        yield this.loadMember()
      }
    } catch (e) {
      const msg = e.response?.data
      this.alertMessage = `圖片上傳失敗，${msg}`
      console.log('upload image failed', e, msg)
    }
  }

  // SMS
  @observable
  enableSendSms = true

  @observable
  sentSmsReq = undefined

  @observable
  isSmsVerified = false

  @action
  setSendSmsEnable() {
    this.enableSendSms = true
  }

  @flow
  *sendSms(req) {
    this.isSmsVerified = false
    if (!this.enableSendSms) return
    try {
      const res = yield Api.sendSms(req)
      if (!res || !res.success) throw res
      this.enableSendSms = false
      this.sentSmsReq = { phoneNumber: req.phoneNum }
    } catch (e) {
      console.log('send sms failed', e)
      const msg = e.response?.data
      this.alertMessage = `發送簡訊失敗，${msg}`
    }
  }

  @flow
  *verifySms(sms) {
    try {
      const res = yield Api.verifySms({ ...this.sentSmsReq, sms })
      if (!res || !res.success) throw res
      this.isSmsVerified = true
      this.alertMessage = '手機驗證成功'
    } catch (e) {
      console.log('verify sms failed', e)
      const msg = e.response?.data
      this.alertMessage = `驗證失敗，${msg}`
    }
  }

  // Filter Dialog
  @observable.ref
  tagsByCategory = {};

  @flow
  *getTags(category) {
    const res = yield Api.getTagOptions(category)
    if (!res) return
    this.tagsByCategory = {
      ...this.tagsByCategory,
      [category || 'default']: res.source,
    }
  }

  // Invoice
  @observable
  invoiceType = localStorage.getItem(invoiceTypeEncodedKey) || 1

  @observable
  invoiceNumber = localStorage.getItem(invoiceNumberEncodedKey) || ''

  @observable
  invoiceCompanyName = localStorage.getItem(invoiceCompanyNameEncodedKey) || ''

  @action
  setInvoiceType(value) {
    this.invoiceType = value
  }

  @action
  setInvoiceNumber(value) {
    this.invoiceNumber = value
  }

  @action
  setInvoiceCompanyName(value) {
    this.invoiceCompanyName = value
  }

  // Filter Dialog
  @observable
  filterOptionsByCategory = defaultFilterOptionsByCategory

  @action
  setFilterOptions(category, options) {
    this.filterOptionsByCategory = {
      ...this.filterOptionsByCategory,
      [category]: options,
    }
  }
}
