import styled from 'styled-components'
import { useSelector, dataStore } from '@app/store'
import AlertDialog from './alertDialog'
import InfoDialog from './infoDialog'
import BreadCrumb from './breadCrumb'
import Spinner from './spinner'

const Container = styled.div`
  width: 100%;
  border-radius: ${(p) => p.theme.borderRadius.content};
  background: ${(p) => p.theme.color.background};
  padding: 30px 10px;
  overflow: hidden;
  width: 100%;
  position: relative;
`

export default function Layout({ children }) {
  const isLoading = useSelector(() => dataStore.isLoading)

  return (
    <Container>
      <BreadCrumb />
      {children}
      <AlertDialog />
      <InfoDialog />
      {isLoading && <Spinner />}
    </Container>
  )
}
