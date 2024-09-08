import { memo, Suspense, lazy } from 'react'
import styled from 'styled-components'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import bgImg from '@app/static/bg.png'
import bgMobileImg from '@app/static/bg_m.png'
import containerHeaderImg from '@app/static/container-header.png'
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
const LuckyBag = lazy(() => import('@app/pages/luckyBag'))
const Register = lazy(() => import('@app/pages/register'))
const SignIn = lazy(() => import('@app/pages/signIn'))
const Commodity = lazy(() => import('@app/pages/commodity'))
const RankList = lazy(() => import('@app/pages/rankList'))
const Manufacturer = lazy(() => import('@app/pages/manufacturer'))
const NotFoundPage = lazy(() => import('@app/pages/notFound'))

const SiteContainer = styled.div`
  ${(props) => (props.disableScroll ? '' : 'overflow-y: auto;')}
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translate3d(0, 0, 0);
  /* This webkit only work in iOS devices. */
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  @media (max-width: 768px) {
    background-image: url(${bgMobileImg});
  }
`

const Wrapper = styled.div`
  transition: transform 0.2s, -webkit-transform 0.2s;
  z-index: auto !important;
  position: relative;
  top: -30px;
`

const Main = styled.div`
  width: 100%;
`

const MobileViewController = styled.div`
  font-family: -apple-system, Helvetica Neue, Roboto, Droid Sans, Segoe UI,
    Verdana, Arial, Lucida Grande, sans-serif;
  font-weight: 400;
  position: relative;
  margin: -70px auto 0;
  width: 90%;
  border-radius: 30px;
`

const ContainerHeader = styled.div`
  background: url(${containerHeaderImg}) no-repeat top / contain;
  width: 95%;
  height: 115px;
  margin: 105px auto 0;
  z-index: ${(p) => p.theme.zIndex.layoutImg};
  position: relative;
  top: -60px;
  @media (max-width: 768px) {
    height: 100px;
    margin-top: 0;
  }
`

function AppRoute() {
  return (
    <>
      <Danmaku />
      <GlobalStyle />
      <BrowserRouter>
        <SiteContainer id="app-container">
          <Header />
          <ContainerHeader id="header" />
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
        </SiteContainer>
      </BrowserRouter>
    </>
  )
}

export default memo(AppRoute)
