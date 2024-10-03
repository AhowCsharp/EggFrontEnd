import { generatePath } from 'react-router-dom'
import { CATEGORY } from './constants'

const paths = {
	index: '/',
	login: '/login',
	signIn: '/sign-in',
	member: '/member',
	profile: '/profile',
	gacha: '/gacha',
	blindBox: '/blind-box',
	luckyBag: '/lucky-bag',
	ichiban: '/ichiban',
	special: '/special',
	outsideWallWorld: '/outside-wall-world',
	digitalWorld: '/digital-world',
	register: '/register',
	rankList: '/rank-list',
	manufacturer: '/manufacturer',
	commodity: '/commodity/:commodityId',
	others: '/*',
}

export const breadCrumbs = {
	default: ['首頁'],
	[paths.gacha]: ['首頁', CATEGORY.GACHA],
	[paths.blindBox]: ['首頁', CATEGORY.BLIND_BOX],
	[paths.ichiban]: ['首頁', CATEGORY.ICHIBAN],
	[paths.special]: ['首頁', CATEGORY.SPECIAL],
	[paths.outsideWallWorld]: ['首頁', CATEGORY.OUTSIDE_WALL_WORLD],
	[paths.digitalWorld]: ['首頁', CATEGORY.DIGITAL_WORLD],
	[paths.luckyBag]: ['首頁', CATEGORY.LUCKY_BAG],
	[paths.profile]: ['首頁', '會員中心'],
	[paths.login]: ['首頁', '會員登入'],
	[paths.register]: ['首頁', '加入會員'],
	[paths.signIn]: ['首頁', '簽到'],
	[paths.rankList]: ['首頁', '榜單'],
	[paths.manufacturer]: ['首頁', '廠商資訊'],
}

export const url = Object.keys(paths).reduce((obj, key) => {
	obj[key] = params => generatePath(paths[key], params)
	console.log(obj)
	return obj
}, {})

export default paths
