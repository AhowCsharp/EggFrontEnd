import Campaign from './campaign'
import headerImg from '@app/static/header.png'
import { url } from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { DisplayPageSize } from '../index'
import { Container, Header, ArrowButton } from './index'

export default function mobileContainer({ data }) {
  const goto = useNavigate()
  const pageSize = DisplayPageSize
  const pageCount = Math.ceil(data.length / pageSize)
  const [page, setPage] = useState(1)
  const [showData, setShowData] = useState([])

  useEffect(() => {
    setShowData(data.slice((page - 1) * pageSize, page * pageSize))
  }, [data, page])
  if (showData.length === 0) return null

  return (
    <div className="container mobile">
      <Header className="digital-font">
        <div className="block">
          <img src={headerImg} />
          活動消息
        </div>
        <div className="block">
          <ArrowButton
            disabled={page === 1}
            onClick={() => setPage(() => page - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </ArrowButton>
          <ArrowButton
            disabled={page === pageCount}
            onClick={() => setPage(() => page + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </ArrowButton>
        </div>
      </Header>
      <Container>
        {showData.map((c, index) => (
          <Campaign
            key={index}
            data={c}
            isHighLight
            handleClick={handleClick}
          />
        ))}
      </Container>
    </div>
  )
  function handleClick(data) {
    return () => {
      goto(url.campaign({ campaignId: data.id }))
    }
  }
}
