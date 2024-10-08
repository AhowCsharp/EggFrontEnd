import Request from './request'

export const getCommodities = async (req) => {
  const res = await Request.get('/commodities').params({
    pageSize: 10,
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
  const res = await Request.get('/freeshippingtickets').bearer(token).params(req)
  return res
}

export const getHistoryTaskLogs = async (req, token) => {
  const res = await Request.get('/taskhistory').bearer(token).params(req)
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

export const getManufacturers = async () => {
  const res = await Request.get('/manufacturers')
  return res
}

export const editPassword = async (req, token) => {
  const res = await Request.put('/resetpw').bearer(token).body(req)
  return res
}

export const topUp = async (req, token) => {
  const res = await Request.post('/paybyprime').bearer(token).body(req)
  return res
}

export const validateMember = async (token) => {
  const res = await Request.post('/validate').bearer(token)
  return res
}

export const getTopUpResult = async (token) => {
  const res = await Request.get('/topupresult').bearer(token)
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

export const sendSms = async (req) => {
  const res = await Request.get('/sms').params(req)
  return res
}

export const verifySms = async (req) => {
  const res = await Request.post('/sms').body(req)
  return res
}
