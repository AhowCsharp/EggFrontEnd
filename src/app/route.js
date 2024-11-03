import { memo, Suspense, lazy } from 'react'
import styled from 'styled-components'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import bgTopImg from '@app/static/bg-top.svg'
import bgBottomImg from '@app/static/bg-bottom.svg'
import paths from '@app/utils/paths'
import GlobalStyle from '@app/utils/style/globalStyle'
import Spinner from '@app/shared/spinner'
import Header from '@app/shared/header'
import Footer from '@app/shared/footer'
import Home from '@app/pages/home'
import Danmaku from '@app/shared/danmaku'

const Login = lazy(() => import('@app/pages/login'))
const Profile = lazy(() => import('@app/pages/profile'))
const Gacha = lazy(() => import('@app/pages/gacha'))
const BlindBox = lazy(() => import('@app/pages/blindBox'))
const Ichiban = lazy(() => import('@app/pages/ichiban'))
const OutsideWallWorld = lazy(() => import('@app/pages/outsideWallWorld'))
const DigitalWorld = lazy(() => import('@app/pages/digitalWorld'))
const Special = lazy(() => import('@app/pages/special'))
const LuckyBag = lazy(() => import('@app/pages/luckyBag'))
const Register = lazy(() => import('@app/pages/register'))
const SignIn = lazy(() => import('@app/pages/signIn'))
const Commodity = lazy(() => import('@app/pages/commodity'))
const RankList = lazy(() => import('@app/pages/rankList'))
const Campaign = lazy(() => import('@app/pages/campaign'))
const Manufacturer = lazy(() => import('@app/pages/manufacturer'))
const NotFoundPage = lazy(() => import('@app/pages/notFound'))
import { hideScrollBarStyle } from '@app/shared/header'

const SiteContainer = styled.div`
  ${(props) => (props.disableScroll ? '' : 'overflow-y: auto;')}
  overflow: hidden;
  height: 100%;
  width: 100vw;
  -webkit-overflow-scrolling: touch;
  background: ${(p) => p.theme.color.siteBg};
  > .content {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100vw;
    position: relative;
    padding-bottom: 80px;
    padding-top: 160px;
  }
  ${hideScrollBarStyle}
  @media (max-width: 768px) {
    > .content {
      padding-top: 145px;
    }
  }
`

const Wrapper = styled.div`
  z-index: auto !important;
  position: relative;
`

const Main = styled.div`
  width: 100%;
`

const MobileViewController = styled.div`
  font-weight: 400;
  position: relative;
  margin: 50px 60px 0;
  width: calc(100% - 120px);
  border-radius: 30px;
  @media (max-width: 768px) {
    margin: 30px 10px 0;
    width: calc(100% - 20px);
  }
`

const TopBg = styled.div`
  background-image: url(${bgTopImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const BottomBg = styled.div`
  background-image: url(${bgBottomImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 350px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  @media (max-width: 768px) {
    bottom: env(safe-area-inset-bottom);
  }
`

function AppRoute() {
  return (
    <>
      <Danmaku />
      <GlobalStyle />
      <BrowserRouter>
        <Header id="header" />
        <SiteContainer id="app-container">
          <div className="content">
            <TopBg />
            <BottomBg />
            <Wrapper>
              <Main>
                <MobileViewController>
                  <Suspense fallback={<Spinner />}>
                    <Routes>
                      <Route path={paths.index} element={<Home />} />
                      <Route path={paths.login} element={<Login />} />
                      <Route path={paths.register} element={<Register />} />
                      <Route path={paths.profile} element={<Profile />} />
                      <Route path={paths.signIn} element={<SignIn />} />
                      <Route path={paths.gacha} element={<Gacha />} />
                      <Route path={paths.blindBox} element={<BlindBox />} />
                      <Route path={paths.ichiban} element={<Ichiban />} />
                      <Route path={paths.special} element={<Special />} />
                      <Route
                        path={paths.outsideWallWorld}
                        element={<OutsideWallWorld />}
                      />
                      <Route
                        path={paths.digitalWorld}
                        element={<DigitalWorld />}
                      />
                      <Route path={paths.luckyBag} element={<LuckyBag />} />
                      <Route path={paths.commodity} element={<Commodity />} />
                      <Route path={paths.rankList} element={<RankList />} />
                      <Route path={paths.campaign} element={<Campaign />} />
                      <Route
                        path={paths.manufacturer}
                        element={<Manufacturer />}
                      />
                      <Route path={paths.others} element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </MobileViewController>
              </Main>
            </Wrapper>
            <Footer />
          </div>
        </SiteContainer>
      </BrowserRouter>
    </>
  )
}

export default memo(AppRoute)
