import styled from 'styled-components'
import AlertDialog from './alertDialog'
import InfoDialog from './infoDialog'
import BreadCrumb from './breadCrumb'

const Container = styled.div`
  width: 100%;
  border-radius: ${(p) => p.theme.borderRadius.content};
  background: ${(p) => p.theme.color.background};
  padding: 30px 10px;
  width: 100%;
`

export default function Layout({ children }) {
  return (
    <Container>
      <BreadCrumb />
      {children}
      <AlertDialog />
      <InfoDialog />
    </Container>
  )
}
