import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.alertMask};
`

const Container = styled.div`
  position: fixed;
  top: 50vh;
  width: 60%;
  left: 20%;
  transform: translateY(-50%);
  z-index: ${(p) => p.theme.zIndex.alertDialog};
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  }
`

const GifPlayer = ({ src, onComplete, duration }) => {
  const imgRef = useRef(null)
  const [shouldDisplay, setShouldDisplay] = useState(true)

  useEffect(() => {
    const instance = setTimeout(() => {
      setShouldDisplay(false)
      onComplete()
    }, duration)
    return () => clearTimeout(instance)
  }, [onComplete, duration])

  return (
    shouldDisplay && (
      <>
        <Mask />
        <Container className="img-container">
          <img ref={imgRef} src={src} />
        </Container>
      </>
    )
  )
}

export default GifPlayer
