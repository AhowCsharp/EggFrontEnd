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
  ${(p) => p.mb20 && `margin-bottom: 20px;`}
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
  margin: 20px 0;
`

export const MobileList = styled.div`
  display: none;
  border-radius: ${(p) => p.theme.mobile.borderRadius.list};
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

export const MobileItem = styled.div`
  background-color: ${(p) => p.theme.mobile.color.descBg};
  justify-content: flex-end;
  line-height: 1.75rem;
  div {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
  }
  .label {
    font-weight: normal;
    color: ${(p) => p.theme.mobile.color.listItemTitleLabel};
  }
  div.title {
    font-weight: bold;
    color: ${(p) => p.theme.mobile.color.font};
    font-size: 1.15rem;
    background-color: ${(p) => p.theme.mobile.color.listItemTitleBg};
  }
  > div {
    border-bottom: 1px solid ${(p) => p.theme.mobile.color.font};
  }
  > div:last-child {
    border-bottom: none;
  }
`
