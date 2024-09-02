import styled from 'styled-components'
import puff from '@app/shared/icons/puff.svg'

const Layout = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  transform: translateY(-46px);
`

const DynamicLoadSpinner = () => {
  return (
    <Layout>
      <img className="icon" src={puff} />
    </Layout>
  )
}

export default DynamicLoadSpinner
