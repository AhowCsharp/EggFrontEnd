import styled from 'styled-components'

const Container = styled.div`
  border-radius: 4px;
  color: #fff;
  margin: 8px 5px 0 0;
  padding: 3px 10px;
  transform: translateY(-6px);
  background: ${(p) =>
    p.color || p.theme.tagColor[p.id] || p.theme.tagColor.others};
  line-height: 24px;
  max-height: 30px;
  max-width: 105px;
  text-align: center;
`

export default function Tag({ name, id, color }) {
  return (
    <Container color={color} id={id}>
      {name}
    </Container>
  )
}
