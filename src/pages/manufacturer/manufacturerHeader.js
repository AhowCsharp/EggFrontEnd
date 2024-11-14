// src/shared/manufacturerHeader.js
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import webManufacturerHeader from '@app/static/web-manufacturerHeader.png'
import mobileManufacturerHeader from '@app/static/mobile-manufacturerHeader.png'

const HeaderContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 20px auto;
  img.background {
    width: 100%;
  }
`

export default function ManufacturerHeader() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <HeaderContainer>
      <img
        className="background"
        src={isMobile ? mobileManufacturerHeader : webManufacturerHeader}
        alt="線上一番賞廠商"
      />
    </HeaderContainer>
  )
}
