import { generatePath } from 'react-router-dom'

const paths = {
  index: '/',
  login: '/login',
  signIn: '/sign-in',
  member: '/member',
  profile: '/profile',
  gacha: '/gacha',
  blindBox: '/blind-box',
  campaign: '/campaign',
  register: '/register',
  rankList: '/rank-list',
  manufacturer: '/manufacturer',
  commodity: '/commodity/:commodityId',
  others: '/*',
}

export const breadCrumbs = {
  default: ['首頁'],
  [paths.gacha]: ['首頁', '扭蛋'],
  [paths.blindBox]: ['首頁', '盲盒'],
  [paths.campaign]: ['首頁', '福袋'],
  [paths.profile]: ['首頁', '會員中心'],
  [paths.login]: ['首頁', '會員登入'],
  [paths.register]: ['首頁', '加入會員'],
  [paths.signIn]: ['首頁', '簽到'],
  [paths.rankList]: ['首頁', '榜單'],
  [paths.manufacturer]: ['首頁', '廠商資訊'],
}

export const url = Object.keys(paths).reduce((obj, key) => {
  obj[key] = (params) => generatePath(paths[key], params)
  return obj
}, {})

export default paths
