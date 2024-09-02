import styled, { keyframes } from 'styled-components'

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) translateX(100%);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Image = styled.img`
  animation: ${scaleIn} 1s ease-in-out;
  width: 250px;
  height: auto;
  max-height: 100%;
  margin-bottom: 10px;
`

export default function Only1Prize({ data }) {
  const { imgUrl, prizeName } = data
  return (
    <Container>
      <Image src={imgUrl} />
      {prizeName}
    </Container>
  )
}
