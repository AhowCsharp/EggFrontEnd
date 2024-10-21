import { Carousel as BaseCarousel } from 'antd'
import styled from 'styled-components'

const Carousel = styled(BaseCarousel)`
  > .slick-dots li button {
    background: black;
    opacity: 0.5;
  }

  > .slick-dots li.slick-active button {
    background: black;
  }

  > .slick-prev,
  > .slick-prev:focus {
    font-size: 1.5em;
    left: 10px;
    z-index: 2;
    color: #aaa;
  }

  > .slick-next,
  > .slick-next:focus {
    font-size: 1.5em;
    right: 10px;
    z-index: 2;
    color: #aaa;
  }

  > .slick-prev:hover,
  > .slick-next:hover {
    color: #aaa;
  }
`

export default Carousel
