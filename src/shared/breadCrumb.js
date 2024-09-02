import styled from 'styled-components'
import { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import paths, { breadCrumbs } from '@app/utils/paths'
import { useSelector, dataStore } from '@app/store'

const BreadCrumbItem = styled.a`
  color: ${(p) => p.theme.color.gray};
  text-decoration: none;
  cursor: pointer;
  &:last-child {
    cursor: default;
    color: ${(p) => p.theme.color.orange};
  }
`

const Container = styled.div`
  font-size: 1rem;
  color: ${(p) => p.theme.color.gray};
  margin: 40px 0 20px;
`

export default function BreadCrumb() {
  const location = useLocation()
  const isHomePage = location.pathname === paths.index
  const data = useSelector(() => dataStore.breadCrumbs)
  const goto = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const manufacturer = searchParams.get('manufacturer')
  useEffect(() => {
    dataStore.setBreadCrumbs(breadCrumbs?.[location.pathname])
  }, [location])

  useEffect(() => {
    if (!manufacturer) return
    const b = [...breadCrumbs?.[location.pathname], manufacturer]
    dataStore.setBreadCrumbs(b)
  }, [manufacturer])

  if (isHomePage || !data?.length) return null
  return (
    <Container>
      {data.map((item, index) => (
        <Fragment key={index}>
          {index !== 0 && <span> / </span>}
          <BreadCrumbItem onClick={onItemClick(index)}>{item}</BreadCrumbItem>
        </Fragment>
      ))}
    </Container>
  )

  function onItemClick(index) {
    const isLastChild = data?.length && index === data.length - 1
    if (isLastChild) return null
    if (index === 0) return () => goto(paths.index)
    return () => goto(-1)
  }
}
