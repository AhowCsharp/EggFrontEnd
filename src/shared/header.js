import { memo, useState } from 'react'
import styled from 'styled-components'
import logoImg from '@app/static/logo.png'
import paths from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'
import gachaImg from '@app/static/gacha.png'
import blindBoxImg from '@app/static/blind-box.png'
import luckyBagImg from '@app/static/lucky-bag.png'
import ichibanImg from '@app/static/ichiban.png'
import specialImg from '@app/static/special.svg'
import outsideWallWorldImg from '@app/static/outsideWallWorld.svg'
import digitalWorldImg from '@app/static/digital-world.png'
import signInImg from '@app/static/sign-in.png'
import rankListImg from '@app/static/rank-list.png'
import manufacturerImg from '@app/static/manufacturer.png'
import coinImg from '@app/static/coin.svg'
import ticket2000Img from '@app/static/ticket-2000.svg'
import ticketPlatformImg from '@app/static/ticket-platform.svg'
import coinWelfareImg from '@app/static/coin-welfare.svg'
import userImg from '@app/static/profile/member.png'
import topUpImg from '@app/static/profile/top-up.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon as BaseFontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector, dataStore } from '@app/store'
import bgTopImg from '@app/static/bg-top.svg'
import {
  faXmark,
  faPlus,
  faChevronRight,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { CATEGORY, PROFILE_TAB } from '@app/utils/constants'

library.add(faCircleDollarToSlot)
library.add(faBars)

export const hideScrollBarStyle = `
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
    display: none;
  }
`

const HeaderModule = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: ${(p) => p.theme.zIndex.header};
  background-color: ${(p) => p.theme.color.danmakuMask};
  padding: 10px 0;
  @media (max-width: 768px) {
    padding-top: env(safe-area-inset-top);
  }
`

const BaseNavItem = styled.div`
  padding: 4px 10px;
  color: #fff;
  font-size: 0.875rem;
  text-decoration: none;
  align-items: center;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 3px;
  }
`

const MemberNav = styled.div`
  display: flex;
  height: 100%;
  padding-right: 16px;
  margin-left: 10px;
  flex-wrap: wrap;
  color: #fff;
  font-weight: 400;
  font-size: 1rem;
  align-items: start;
  img {
    width: 25px;
    height: 25px;
  }
  ${BaseNavItem} {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const TopUpBtn = styled(BaseNavItem)`
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 400;
  line-height: 24px;
  flex-direction: row;
  background: ${(p) => p.theme.color.red};
  border: 1px solid #fff;
  border-radius: 4px;
  img {
    margin-bottom: 0;
    margin-right: 3px;
  }
`

const Logo = styled.img`
  height: 100%;
  width: auto;
  transform: scale(1.5) translateX(-10%);
  cursor: pointer;
  @media (max-width: 768px) {
    transform: scale(1.2) translateX(-10%) translateY(-5%);
  }
`

const FontAwesomeIcon = styled(BaseFontAwesomeIcon)`
  color: #fff;
`

const MobileNavItem = styled.div`
  align-items: center;
  border-bottom: 1px solid ${(p) => p.theme.mobile.color.menuDivider};
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  justify-content: space-between;
  padding: 0 3rem;
  align-items: center;
  height: 60px;
  cursor: pointer;
  background-color: ${(p) => p.isChild && '#000'};
`

const MobileNav = styled.div`
  display: none;
  flex-direction: column;
  background: ${(p) => p.theme.mobile.color.background};
  position: relative;
  top: -130px;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  z-index: ${(p) => p.theme.zIndex.header};
  padding-bottom: 10px;
  ${MobileNav}:last-child {
    border-bottom: none;
  }
  ${BaseNavItem} {
    color: ${(p) => p.theme.color.orange};
  }
  ${Block}.bar {
    display: flex;
    height: 72px;
    flex: unset;
    padding: 1rem 1.5rem;
    align-items: center;
    background: url(${bgTopImg}) no-repeat center center / cover;
    img {
      transform: unset;
      height: 40px;
    }
    .icon {
      font-size: 1.5rem;
      border: 1px solid #fff;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
    .logo {
      justify-content: flex-start;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    ${MemberNav} {
      display: flex;
      justify-content: flex-end;
    }
  }
`

const MobileNavButton = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: inline-block;
  }
`

const Block = styled.div`
  display: flex;
  flex: 0%;
  min-width: 224px;
  > * {
    padding: 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.row {
    flex: 100%;
    flex-direction: row;
    justify-content: space-between;
    justify-content: center;
    > * {
      flex-direction: row;
      padding: 0 0.25rem;
    }
  }
  &.logo {
    min-width: 145px;
    min-height: 28px;
  }
  > * {
    padding: 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > ${TopUpBtn} {
    padding: 4px 8px;
  }
  .divider {
    border-left: 1px solid #fff;
  }
  @media (max-width: 768px) {
    display: none;
    &.logo {
      display: flex;
    }
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #fff;
  border-radius: 100px;
  color: #fff;
  width: calc(100% - 120px);
  padding: 1.125rem 1.5rem;
  margin: 0 60px 10px;
  height: 4.125rem;
  background-color: #08090b;
  > ${Block}:first-child {
    justify-content: flex-start;
  }
  > ${Block}:last-child {
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    width: calc(100% - 20px);
    margin: 0 10px 10px;
  }
`

const Nav = styled(Block)`
  width: 100%;
  justify-content: center;
  ${hideScrollBarStyle}
  ${BaseNavItem} {
    padding: 0 1rem;
    word-break: keep-all;
  }
  @media (max-width: 768px) {
    display: flex;
    width: calc(100% - 20px);
    margin: 0 10px;
    justify-content: center;
    ${BaseNavItem} {
      padding: 0 0.5rem;
    }
  }
  @media (max-width: 576px) {
    width: calc(100% - 10px);
    overflow-x: auto;
    margin-left: 10px;
    justify-content: flex-start;
  }
`

function NavItem({ title, type, src }) {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(paths[type])
  }

  return (
    <BaseNavItem onClick={onClick}>
      <img src={src} />
      {title}
    </BaseNavItem>
  )
}

const NavList = [
  {
    title: '會員中心',
    type: 'profile',
    src: userImg,
    checkIsLogged: true,
    hideInPc: true,
    children: [
      { title: '會員管理', path: `profile?type=${PROFILE_TAB.MEMBER}` },
      { title: '金幣儲值', path: `profile?type=${PROFILE_TAB.TOP_UP}` },
      { title: '儲值紀錄', path: `profile?type=${PROFILE_TAB.STORED_LOG}` },
      { title: '消費紀錄', path: `profile?type=${PROFILE_TAB.CONSUME_LOG}` },
      {
        title: '待處理獎品列表',
        path: `profile?type=${PROFILE_TAB.PENDING_PRIZES}`,
      },
      { title: '回收紀錄', path: `profile?type=${PROFILE_TAB.RECLAIM_LOG}` },
      { title: '配送紀錄', path: `profile?type=${PROFILE_TAB.SHIP_LOG}` },
      { title: '任務成就', path: `profile?type=${PROFILE_TAB.TASK_HISTORY}` },
      { title: '神秘寶箱', path: `profile?type=${PROFILE_TAB.CRATE_LOG}` },
      {
        title: '免運券紀錄',
        path: `profile?type=${PROFILE_TAB.FREE_SHIPPING}`,
      },
      { title: '抽獎券查詢', path: `profile?type=${PROFILE_TAB.TICKETS}` },
    ],
  },
  {
    title: CATEGORY.GACHA,
    type: 'gacha',
    src: gachaImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.BLIND_BOX,
    type: 'blindBox',
    src: blindBoxImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.LUCKY_BAG,
    type: 'luckyBag',
    src: luckyBagImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.ICHIBAN,
    type: 'ichiban',
    src: ichibanImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.SPECIAL,
    type: 'special',
    src: specialImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.OUTSIDE_WALL_WORLD,
    type: 'outsideWallWorld',
    src: outsideWallWorldImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.DIGITAL_WORLD,
    type: 'digitalWorld',
    src: digitalWorldImg,
    checkIsLogged: false,
  },
  { title: '每日簽到', type: 'signIn', src: signInImg, checkIsLogged: true },
  { title: '榜單', type: 'rankList', src: rankListImg, checkIsLogged: false },
  {
    title: '廠商資訊',
    type: 'manufacturer',
    src: manufacturerImg,
    checkIsLogged: false,
  },
]

const getNavList = (isLogged) => {
  return NavList.filter((item) => !item.checkIsLogged || isLogged)
}

function Header() {
  const goto = useNavigate()
  const isLogged = useSelector(() => dataStore.isLogged)
  const member = useSelector(() => dataStore.member)
  const navList = getNavList(isLogged)
  const [openMobileNav, setOpenMobileNav] = useState(false)
  const [openNavChildrenSetting, setOpenNavChildrenSetting] = useState({})

  return (
    <HeaderModule>
      <Container>
        <Block className="logo">
          <Logo src={logoImg} onClick={() => goto(paths.index)} />
          <span className="digital-font divider">瞇那賞</span>
        </Block>
        <Block className="row">
          {isLogged && (
            <>
              <BaseNavItem onClick={() => goto(`${paths.profile}?type=member`)}>
                <img src={coinImg} />
                {member?.moneyAmount || 0}
              </BaseNavItem>
              <BaseNavItem onClick={() => goto(`${paths.profile}?type=member`)}>
                <img src={coinWelfareImg} />
                {member?.welfareAmount || 0}
              </BaseNavItem>
              <BaseNavItem onClick={() => goto(`${paths.profile}?type=member`)}>
                <img src={ticketPlatformImg} />
                {member?.ticketEverydayAmount || 0}
              </BaseNavItem>
              <BaseNavItem onClick={() => goto(`${paths.profile}?type=member`)}>
                <img src={ticket2000Img} />
                {member?.ticketAmount || 0}
              </BaseNavItem>
            </>
          )}
        </Block>
        <Block>
          <TopUpBtn
            onClick={() => goto(`${paths.profile}?type=topUp`)}
            bg="#d04a26"
          >
            <img src={topUpImg} />
            儲值
          </TopUpBtn>
          {isLogged ? (
            <>
              <BaseNavItem
                onClick={() => goto(`${paths.profile}?type=member`)}
                bg="#d07a00"
              >
                會員中心
              </BaseNavItem>
              <BaseNavItem
                className="divider"
                bg="#231815"
                onClick={() => dataStore.logout()}
              >
                登出
              </BaseNavItem>
            </>
          ) : (
            <>
              <BaseNavItem onClick={() => goto(paths.login)}>登入</BaseNavItem>
              <BaseNavItem
                className="divider"
                onClick={() => goto(paths.register)}
              >
                註冊
              </BaseNavItem>
            </>
          )}
        </Block>
        <MobileNavButton onClick={() => setOpenMobileNav(true)}>
          <FontAwesomeIcon icon="fa-bars" />
        </MobileNavButton>
      </Container>
      <Nav>
        {navList.map(
          (item, index) =>
            !item.hideInPc && (
              <NavItem
                key={index}
                title={item.title}
                type={item.type}
                src={item.src}
              />
            )
        )}
      </Nav>

      {openMobileNav ? (
        <MobileNav>
          <Block className="bar">
            <Block className="logo">
              <Logo src={logoImg} onClick={() => goto(paths.index)} />
              <span className="digital-font divider">瞇那賞</span>
            </Block>
            <div className="icon">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setOpenMobileNav(false)}
              />
            </div>
          </Block>
          {!isLogged && (
            <MobileNavItem onClick={() => mobileGoto(paths.login)}>
              登入
            </MobileNavItem>
          )}
          {navList.map((item, index) => {
            const { type, title, children } = item
            const isParent = children?.length
            const icon = isParent
              ? openNavChildrenSetting[type]
                ? faMinus
                : faPlus
              : faChevronRight
            return (
              <>
                <MobileNavItem
                  key={index}
                  onClick={() => {
                    if (isParent)
                      setOpenNavChildrenSetting({
                        ...openNavChildrenSetting,
                        [type]: !openNavChildrenSetting[type],
                      })
                    else mobileGoto(paths[type])
                  }}
                >
                  {title}
                  <FontAwesomeIcon icon={icon} />
                </MobileNavItem>
                {openNavChildrenSetting[type] &&
                  children?.map((child, childIndex) => (
                    <MobileNavItem
                      isChild={true}
                      key={`${index}-${childIndex}`}
                      onClick={() => mobileGoto(child.path)}
                    >
                      {child.title}
                      <FontAwesomeIcon icon={faChevronRight} />
                    </MobileNavItem>
                  ))}
              </>
            )
          })}
          {isLogged && (
            <MobileNavItem onClick={() => dataStore.logout()}>
              登出
            </MobileNavItem>
          )}
        </MobileNav>
      ) : null}
    </HeaderModule>
  )
  function mobileGoto(path) {
    goto(path)
    setOpenMobileNav(false)
    setOpenNavChildrenSetting({})
  }
}

export default memo(Header)
