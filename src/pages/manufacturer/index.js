import Layout from '@app/shared/layout'
import styled from 'styled-components'
import { useSelector, dataStore } from '@app/store'
import { useNavigate, useLocation } from 'react-router-dom'
import paths from '@app/utils/paths'
import { useEffect, useState } from 'react'
import Item from './item'
import Commodities from './commodities'

const List = styled.div`
  display: flex;
  justify-content: ${(p) => (p.center ? 'center' : 'flex-start')};
  align-items: center;
  padding: 10px 0;
  margin: 1rem;
  flex-wrap: wrap;
  margin-top: -20px;
  min-height: 150px;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

export default function Manufacturer() {
  const manufacturers = useSelector(() => dataStore.manufacturers)
  const goto = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const manufacturer = searchParams.get('manufacturer')

  useEffect(() => {
    if (!manufacturers) dataStore.getManufacturers()
  }, [manufacturers])

  if (!manufacturers) return <Layout />
  if (manufacturer) return <Commodities manufacturerName={manufacturer} />
  return (
    <Layout>
      <List>
        {manufacturers.map((m) => (
          <Item key={m.id} data={m} handleClick={handleClick} />
        ))}
      </List>
    </Layout>
  )
  function handleClick(data) {
    return () => {
      goto(`${paths.manufacturer}?manufacturer=${data.name}`)
    }
  }
}
