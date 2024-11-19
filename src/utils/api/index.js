import Request from './request'

export const getCommodities = async (r) => {
  const { tagIds, ...req } = r
  const q = tagIds?.join('&tagIds=')
  const res = await Request.get(
    `/commodities${q ? `?tagIds=${q}` : ''}`
  ).params({
    ...req,
  })
  return res
}

export const getCommodity = async (commodityId) => {
  const res = await Request.get('/commodity').params({ commodityId })
  return res
}

export const getPrizes = async (commodityId) => {
  const res = await Request.get('/prizes').params({ commodityId })
  return res
}

export const getAds = async () => {
  const res = await Request.get('/ad')
  return res
}

export const drawOut = async (req, token) => {
  const res = await Request.post('/lottery').bearer(token).body(req)
  return res
}

export const login = async (req) => {
  const res = await Request.post('/login').body(req)
  return res
}

export const register = async (req) => {
  const res = await Request.post('/register').body(req)
  return res
}

export const getSignIn = async (token) => {
  const res = await Request.get('/signin').bearer(token)
  return res
}

export const getTickets = async (req, token) => {
  const res = await Request.get('/tickets').bearer(token).params(req)
  return res
}

export const getMember = async (token) => {
  const res = await Request.get('/information').bearer(token)
  return res
}

export const getConsumeLog = async (req, token) => {
  const res = await Request.get('/consumelogs').bearer(token).params(req)
  return res
}

export const getPendingPrize = async (req, token) => {
  const res = await Request.get('/notshippedprizes').bearer(token).params(req)
  return res
}

export const getReclaimLog = async (req, token) => {
  const res = await Request.get('/reclaimlogs').bearer(token).params(req)
  return res
}

export const getFreeshippingticketLogs = async (req, token) => {
  const res = await Request.get('/freeshippingtickets')
    .bearer(token)
    .params(req)
  return res
}

export const getHistoryTaskLogs = async (req, token) => {
  const res = await Request.get('/taskhistory').bearer(token).params(req)
  return res
}

export const getCrateLogs = async (req, token) => {
  const res = await Request.get('/crateandkey').bearer(token).params(req)
  return res
}

export const getStoredLogs = async (req, token) => {
  const res = await Request.get('/stored').bearer(token).params(req)
  return res
}

export const getShipLog = async (req, token) => {
  const res = await Request.get('/shippingorders').bearer(token).params(req)
  return res
}

export const reclaim = async (req, token) => {
  const res = await Request.post('/reclaim').bearer(token).body(req)
  return res
}

export const openCrate = async (req, token) => {
  const res = await Request.post('/open').bearer(token).body(req)
  return res
}

export const ship = async (req, token) => {
  const res = await Request.post('/order').bearer(token).body(req)
  return res
}

export const signIn = async (token) => {
  const res = await Request.post('/signin').bearer(token)
  return res
}

export const getRankingList = async () => {
  const res = await Request.get('/rankingList')
  return res
}

export const getTaskList = async () => {
  const res = await Request.get('/task')
  return res
}

export const getManufacturers = async () => {
  const res = await Request.get('/manufacturers')
  return res
}

export const editPassword = async (req, token) => {
  const res = await Request.put('/resetpw').bearer(token).body(req)
  return res
}

export const forgetPassword = async (req) => {
  const res = await Request.post('/forget').body(req)
  return res
}

export const topUp = async (req, token) => {
  const res = await Request.post('/paybyprime').bearer(token).body(req)
  return res
}

export const atmTopUp = async (req, token) => {
  console.log('in atmTopUp api')

  // return {
  //   source: {
  //     status: 0,
  //     msg: 'Success',
  //     rec_trade_id: 'VA20241119Wk3kCW',
  //     bank_transaction_id: '56T1732012347A1',
  //     amount: 1,
  //     order_number: '56T1732012347A1',
  //     acquirer: 'TW_TAPPAY_ATM',
  //     transaction_time_millis: 1731983547350,
  //     bank_transaction_time: {
  //       start_time_millis: '1731983547381',
  //       end_time_millis: '1731983547962',
  //     },
  //     merchant_id: 'tppf_onlyeggisreal_5984001',
  //     payee_info: {
  //       expire_time: '2024-11-20 23:59:59',
  //       vacc_bank_code: '822',
  //       vacc_no: '9259624110003546',
  //     },
  //     bank_result_code: 'SUCCESS',
  //     bank_result_msg: '',
  //   },
  //   pageCount: null,
  //   totalItemCount: null,
  //   success: true,
  //   errors: '',
  //   correctMessage: null,
  // }
  const res = await Request.post('/atmpaybyprime').bearer(token).body(req)
  return res
}

export const validateMember = async (token) => {
  const res = await Request.post('/validate').bearer(token)
  return res
}

export const getTopUpResult = async (req, token) => {
  const res = await Request.get('/topupresult').params(req).bearer(token)
  return res
}

export const recordVisitCount = async () => {
  const res = await Request.get('/visit')
  return res
}

export const getLoginByLineUrl = async () => {
  const res = await Request.get('/oauth2.0/line/loginurl')
  return res
}

export const getAccessTokenByLine = async (req) => {
  const res = await Request.get('/oauth2.0/line/accesstoken').params(req)
  return res
}

export const registerByLine = async (req) => {
  const res = await Request.get('/oauth2.0/line/register').params(req)
  return res
}

export const getProfileByLine = async (req) => {
  const res = await Request.get('/oauth2.0/line/profile').params(req)
  return res
}

export const uploadHeadShot = async (req, token) => {
  const res = await Request.post('/profile').bearer(token).body(req)
  return res
}

export const sendSms = async (req) => {
  const res = await Request.get('/sms').params(req)
  return res
}

export const verifySms = async (req) => {
  const res = await Request.post('/sms').body(req)
  return res
}

export const getNews = async (newsId) => {
  const res = await Request.get('/news').params({ newsId })
  return res
}

export const getTagOptions = async (category) => {
  const res = await Request.get('/tags').params({ category })
  return res
}
