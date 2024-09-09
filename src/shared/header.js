import { memo, useState } from 'react'
import styled from 'styled-components'
import logoImg from '@app/static/logo.png'
import paths from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'
import gachaImg from '@app/static/gacha.png'
import blindBoxImg from '@app/static/blind-box.png'
import signInImg from '@app/static/sign-in.png'
import rankListImg from '@app/static/rank-list.png'
import manufacturerImg from '@app/static/manufacturer.png'
import coinImg from '@app/static/coin.svg'
import ticket2000Img from '@app/static/ticket-2000.svg'
import luckyBagImg from '@app/static/lucky-bag.png'
import ticketPlatformImg from '@app/static/ticket-platform.svg'
import coinWelfareImg from '@app/static/coin-welfare.svg'
import userImg from '@app/static/profile/member.png'
import topUpImg from '@app/static/profile/top-up.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon as BaseFontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector, dataStore } from '@app/store'
import { CATEGORY } from '@app/utils/constants'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleDollarToSlot)
library.add(faBars)

const HeaderModule = styled.div`
  width: 100%;
  top: 10px;
  position: sticky;
  z-index: ${(p) => p.theme.zIndex.header};
  transition: transform 0.2s, -webkit-transform 0.2s;
`

const BaseNavItem = styled.div`
  border-radius: 30px;
  background: #08090b;
  padding: 4px 10px;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  align-items: center;
  display: flex;
  margin-right: 5px;
  background-color: ${(p) => p.bg};
  cursor: pointer;
  box-shadow: 1px 2px 0 #ffffff;
  border: 1px solid #ffffff;

  img {
    width: 25px;
    height: 25px;
    margin-right: 3px;
  }
`

const HeaderModuleContainer = styled.div`
  display: flex;
  align-items: start;
  position: relative;
  height: 100%;
  transition: transform 0.2s, -webkit-transform 0.2s;
  transform: translateY(0);
  justify-content: space-between;
  flex-wrap: wrap;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: start;
  height: 100%;
  padding-left: 16px;
  flex-wrap: wrap;
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

const NavItemAfterLogin = styled(BaseNavItem)`
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 400;
  margin: 0 5px 0 0;
  padding: 4px 10px;
  line-height: 24px;
`

const NavItemBeforeLoginContainer = styled(BaseNavItem)`
  padding: 0;
`

const NavItemBeforeLogin = styled(BaseNavItem)`
  text-shadow: 0 0 5px #dc8100;
  background: none;
  border-radius: none;
  margin: 0;
  color: #fff;
  font-weight: 400;
  font-size: 1rem;
  padding: 4px;
  line-height: 24px;
  box-shadow: none;
  border: none;
`

const Logo = styled.img`
  width: 110px;
  height: auto;
  margin-bottom: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 60px;
    margin: 7px 0 0;
  }
`

const FontAwesomeIcon = styled(BaseFontAwesomeIcon)`
  color: #fff;
`

const Nav = styled.div`
  display: flex;
  margin-left: 10px;
  flex-wrap: wrap;
  max-width: 510px;
  overflow: hidden;
  position: relative;
  height: ${(p) => (p.isNavOpened ? '80px' : '36px')};
  ${BaseNavItem} {
    margin-bottom: 8px;
  }
  ${FontAwesomeIcon} {
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    top: 10px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const MobileNavItem = styled.div`
  align-items: center;
  border-bottom: 1px solid #fff;
  display: flex;
  flex-wrap: wrap;
  font-size: 140%;
  justify-content: flex-start;
  padding: 14px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`

const MobileNav = styled.div`
  display: none;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 55px;
  width: 320px;
  right: 0;
  z-index: 1;
  padding: 10px 0;
  ${MobileNav}:last-child {
    border-bottom: none;
  }
  ${NavItemAfterLogin} {
    color: ${(p) => p.theme.color.orange};
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
  width: 38px;
  font-size: 3rem;
  margin-right: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: inline-block;
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
  { title: '每日簽到', type: 'signIn', src: signInImg, checkIsLogged: true },
  { title: '榜單', type: 'rankList', src: rankListImg, checkIsLogged: false },
  {
    title: '廠商資訊',
    type: 'manufacturer',
    src: manufacturerImg,
    checkIsLogged: false,
  },
  {
    title: CATEGORY.ICHIBAN,
    type: 'ichiban',
    src: luckyBagImg, // TODO
    checkIsLogged: false,
  },
  {
    title: CATEGORY.OUTSIDE_WALL_WORLD,
    type: 'outsideWallWorld',
    src: luckyBagImg, // TODO
    checkIsLogged: false,
  },
  {
    title: CATEGORY.DIGITAL_WORLD,
    type: 'digitalWorld',
    src: luckyBagImg, // TODO
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
  const [openSider, setOpenSider] = useState(false)
  const [isNavOpened, setIsNavOpened] = useState(false)

  return (
    <HeaderModule>
      <HeaderModuleContainer>
        <LeftContainer>
          <Logo src={logoImg} onClick={() => goto(paths.index)} />
          <Nav isNavOpened={isNavOpened}>
            {navList.map((item, index) => (
              <NavItem
                key={index}
                title={item.title}
                type={item.type}
                src={item.src}
              />
            ))}
            <FontAwesomeIcon
              icon={isNavOpened ? faCaretUp : faCaretDown}
              onClick={() => setIsNavOpened((v) => !v)}
            />
          </Nav>
        </LeftContainer>
        <MemberNav>
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
                {member?.ticket2000Amount || 0}
              </BaseNavItem>
            </>
          )}
          <NavItemAfterLogin
            onClick={() => goto(`${paths.profile}?type=topUp`)}
            bg="#d04a26"
          >
            <img src={topUpImg} />
            儲值
          </NavItemAfterLogin>
          {isLogged ? (
            <>
              <NavItemAfterLogin
                onClick={() => goto(`${paths.profile}?type=member`)}
                bg="#d07a00"
              >
                會員中心
              </NavItemAfterLogin>
              <NavItemAfterLogin
                bg="#231815"
                onClick={() => dataStore.logout()}
              >
                登出
              </NavItemAfterLogin>
            </>
          ) : (
            <NavItemBeforeLoginContainer>
              <NavItemBeforeLogin onClick={() => goto(paths.login)}>
                <img src={userImg} /> 登入
              </NavItemBeforeLogin>
              <NavItemBeforeLogin>/</NavItemBeforeLogin>
              <NavItemBeforeLogin onClick={() => goto(paths.register)}>
                註冊
              </NavItemBeforeLogin>
            </NavItemBeforeLoginContainer>
          )}
        </MemberNav>

        <MobileNavButton onClick={() => setOpenSider(openSider ? false : true)}>
          <FontAwesomeIcon icon="fa-bars" />
        </MobileNavButton>

        {openSider ? (
          <MobileNav>
            {isLogged ? (
              <>
                <MemberNav>
                  <NavItemAfterLogin
                    bg="#231815"
                    onClick={() => dataStore.logout()}
                  >
                    登出
                  </NavItemAfterLogin>
                </MemberNav>
                <MobileNavItem
                  onClick={() => mobileGoto(`${paths.profile}?type=member`)}
                >
                  <img src={userImg} />
                  會員中心
                </MobileNavItem>
              </>
            ) : (
              <>
                <MobileNavItem onClick={() => mobileGoto(paths.login)}>
                  <img src={userImg} />
                  登入
                </MobileNavItem>
                <MobileNavItem onClick={() => mobileGoto(paths.register)}>
                  <img src={userImg} />
                  註冊
                </MobileNavItem>
              </>
            )}
            {navList.map((item, index) => (
              <MobileNavItem
                key={index}
                onClick={() => mobileGoto(paths[item.type])}
              >
                <img src={item.src} />
                {item.title}
              </MobileNavItem>
            ))}
          </MobileNav>
        ) : null}
      </HeaderModuleContainer>
    </HeaderModule>
  )
  function mobileGoto(path) {
    goto(path)
    setOpenSider(false)
  }
}

export default memo(Header)
