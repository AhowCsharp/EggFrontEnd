import styled from 'styled-components'
import drawOutAnimation from '@app/static/drawOutAnimation'
import GifPlayer from '@app/shared/gitPlayer'
import DollarSign from '@app/shared/dollarSign'
import { DRAW_OUT_STATUS, CATEGORY } from '@app/utils/constants'
import { DrawOutBtn as Button } from './index'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: fixed;
  top: 50vh;
  left: 20%;
  width: 60%;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 250px;
  max-height: calc(90vh - 175px);
  transform: translateY(-50%);
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px 40px 40px;
  display: flex;
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
    max-height: calc(90vh - 165px);
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Header = styled(Block)`
  position: relative;
  top: 0;
  h3 {
    margin: 0;
  }
`

const Footer = styled(Block)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px 0;
`

const Content = styled(Block)`
  padding: 20px 0;
  flex-direction: column;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const HeightLight = styled.span`
  color: ${(p) => p.theme.color.warning};
  margin: 0 5px;
  font-size: 1.2rem;
`

const GraySmallText = styled.span`
  color: gray;
  font-size: 12px;
  margin-left: 7px;
`;

const Cost = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 10px;
`

export default function ConfirmDialog({
  data,
  onClose,
  onSubmit,
  drawOutStatus,
}) {
  const { req, totalDrawOutTimes, totalCost, category } = data

  if (drawOutStatus === DRAW_OUT_STATUS.DRAWING)
    return (
      <GifPlayer
        src={drawOutAnimation[category]}
        onComplete={onClose}
        duration={1300}
      />
    )
  if (drawOutStatus === DRAW_OUT_STATUS.CONFIRMING)
    return (
      <>
        <Mask />
        <Container className="dialog">
          <Header>
            <h3>抽獎確認</h3>
          </Header>
          <Content>
            <p>
              目前剩餘<HeightLight>{totalDrawOutTimes}</HeightLight>抽
            </p>
            <p>
              連抽次數<HeightLight>{req.times}</HeightLight>抽
            </p>
            <p>
              共花費
              <Cost>
                <DollarSign category={category} />
                {CATEGORY.LUCKY_BAG === category ? '1' : totalCost}
              </Cost>
              <GraySmallText>(御守優先扣除)</GraySmallText>
            </p>
          </Content>
          <Footer>
            <Button onClick={onClose}>關閉</Button>
            <Button onClick={handleSubmit}>確認</Button>
          </Footer>
        </Container>
      </>
    )
  return null
  function handleSubmit() {
    onSubmit(req)
  }
}
