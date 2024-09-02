import styled from 'styled-components'
import { DatePicker, Select as BaseSelect, Input } from 'antd'

const { RangePicker: BaseRangePicker } = DatePicker
const { Search: BaseSearch } = Input

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  .ant-table-wrapper {
    min-width: ${(p) => (p.tableMinWidth ? `${p.tableMinWidth}px` : '500px')};
  }
`

export const RangePicker = styled(BaseRangePicker)`
  margin-bottom: 20px;
`

export const Select = styled(BaseSelect)`
  margin-bottom: 20px;
`

export const Search = styled(BaseSearch)`
  margin-bottom: 20px;
  ${(p) => p.mt10 && `margin-top: 10px;`}
  button {
    background: unset !important;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${(p) => (p.left ? 'flex-start' : 'center')};
  margin: 10px 0;
`
