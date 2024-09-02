import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  border-radius: ${(p) => p.theme.borderRadius.content};
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: absolute;
  opacity: 1;
  top: 25vh;
  width: 60%;
  left: 20%;
  z-index: ${(p) => p.theme.zIndex.dialog};
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
        <Container>
          <img ref={imgRef} src={src} />
        </Container>
      </>
    )
  )
}

export default GifPlayer
