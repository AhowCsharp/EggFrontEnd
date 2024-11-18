import { useState, useEffect } from 'react'
import { Radio, Modal, Input, Select } from 'antd'
import styled from 'styled-components'
import { TOP_UP_PRICE_OPTIONS } from '@app/utils/constants'
import { dataStore, useSelector } from '@app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faCreditCard,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons'
import { faLine } from '@fortawesome/free-brands-svg-icons'
import { DrawOutBtn as Button } from '@app/pages/commodity'
import { P } from '@app/shared/infoDialog'
import { Container, ButtonContainer } from '../tabStyle'
import { Content } from '../index'
import TapPay from './tapPay'
import AtmTapPay from './atmTapPay'

const PayWayOptions = [
  { value: 'credit_card', label: '信用卡', icon: faCreditCard },
  { value: 'atm', label: 'ATM轉帳', icon: faLandmark },
  { value: 'line_pay', label: 'LINEPAY', icon: faLine },
]

// 定義發票類型和選項
const INVOICE_TYPES = [
  {
    value: 1,
    label: '⼿機條碼載具',
    placeholder: '請輸入您的載具號碼',
  },
  {
    value: 2,
    label: '自然人憑證',
    placeholder: '請輸入您的自然人憑證號碼',
  },
  {
    value: 3,
    label: '發票捐贈',
    donateOptions: [
      { value: '1798', label: '社團法人台灣浪浪幫客協會' },
      { value: '9427', label: '社團法人浪浪的後盾協會' },
      { value: '56888', label: '社團法人雅風汪喵浪浪中途照護安養協會' },
      { value: '8866', label: '社團法人新北市流浪貓狗再生保護協會' },
      { value: '856203', label: '社團法人台灣幸褔狗流浪中途協會' },
      { value: '5866', label: '社團法人臺南市貓狗流浪終點協會' },
      { value: '9958', label: '社團法人台灣流浪貓狗關懷協會' },
      { value: '591', label: '台灣狗腳印幸福聯盟' },
    ],
  },
  {
    value: 4,
    label: '企業統一編號',
    placeholder: '請輸入統編',
  },
]

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  width: 100%;
  vertical-align: middle;
`

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  span {
    font-size: 1.25rem;
    color: rgb(245, 173, 61);
    margin-right: 5px;
  }
`

const CheckIcon = styled(FontAwesomeIcon).attrs(() => ({
  icon: faCheck,
}))`
  font-size: 1rem;
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  background-color: ${(p) =>
    p.selected ? p.theme.color.topUpSelected : '#ddd'};
`

const WarningBlock = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(p) => p.theme.color.topUpSelected};
  border: 1px solid ${(p) => p.theme.color.topUpSelected};
  border-radius: 8px;
  margin: 20px auto;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  * + * {
    margin-top: 10px;
  }
`

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`

const BaseOption = styled.div`
  ${(p) => p.selected && `border: 2px solid ${p.theme.color.topUpSelected};`}
  border-radius: 20px;
  align-items: center;
  overflow: visible;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 10px;
  width: calc((100% - 60px) / 3);
  margin: 20px 10px 0;
  cursor: pointer;
  @media (max-width: 768px) {
    width: calc((100% - 20px) / 2);
    margin: 20px 5px 0;
  }
`

const Price = styled.div`
  color: ${(p) => p.theme.color.topUpSelected};
  font-size: 1.3rem;
  font-weight: 700;
`

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  & > .ant-radio-button-wrapper {
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0 5px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
    background-color: #f5f5f5;
    border: none;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s, color 0.3s;
  }

  & > .ant-radio-button-wrapper-checked,
  & > .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
    background-color: ${(p) => p.theme.color.topUpSelected} !important;
    color: #fff !important;
  }

  & > .ant-radio-button-wrapper:hover {
    background-color: #f5f5f5;
    color: #666;
  }

  @media (max-width: 768px) {
    & > .ant-radio-button-wrapper {
      font-size: 14px;
      padding: 0 5px;
    }
  }
`

const StyledInvoiceRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  & > .ant-radio-button-wrapper {
    flex: 1;
    text-align: center;
    margin: 0 5px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 38px;
    background-color: #f5f5f5;
    color: #333;
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s, color 0.3s;
  }

  & > .ant-radio-button-wrapper-checked,
  & > .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
    background-color: #f98d00 !important;
    color: #fff !important;
  }

  & > .ant-radio-button-wrapper:hover {
    background-color: #f5f5f5;
    color: #333;
  }

  @media (max-width: 768px) {
    & > .ant-radio-button-wrapper {
      font-size: 12px;
      padding: 0 3px;
    }
  }
`

const InvoiceSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
`

const InvoiceOptionLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000; /* 设置默认颜色为黑色 */

  /* 在手机版时确保文字颜色为黑色 */
  @media (max-width: 768px) {
    color: #000;
  }
`

const InvoiceInput = styled(Input)`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
`

const InvoiceSelect = styled(Select)`
  width: 100%;
  margin-bottom: 10px;
`

const InvoiceNote = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 3px;
  margin-left: 5px;
  margin-bottom: 20px;
`

export default function TopUp() {
  const [selectedPrice, setSelectedPrice] = useState(
    TOP_UP_PRICE_OPTIONS[0].value
  )
  const [selectedPayWay, setSelectedPayWay] = useState('credit_card')
  const [showTapPayPage, setShowTapPayPage] = useState(false)
  const [showATMTapPayPage, setShowATMTapPayPage] = useState(false)
  const paymentUrl = useSelector(() => dataStore.paymentUrl)
  const payeeInfo = useSelector(() => dataStore.payeeInfo)
  const invoiceType = useSelector(() => +dataStore.invoiceType)
  const number = useSelector(() => dataStore.invoiceNumber)
  const companyName = useSelector(() => dataStore.invoiceCompanyName)

  useEffect(() => {
    if (paymentUrl) {
      window.open(paymentUrl, '_self')
    }
  }, [paymentUrl])

  useEffect(() => {
    if (!showATMTapPayPage) return
    const layoutElement = document.getElementById('layout')
    if (layoutElement) {
      layoutElement.scrollIntoView({ behavior: 'instant' })
    }
  }, [showATMTapPayPage])

  function validateUBN(ubn) {
    const weights = [1, 2, 1, 2, 1, 2, 4, 1];
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      let digit = parseInt(ubn.charAt(i), 10);
      let product = digit * weights[i];
      sum += Math.floor(product / 10) + (product % 10);
    }
    if (sum % 10 === 0) {
      return true;
    } else if (ubn.charAt(6) === '7' && (sum + 1) % 10 === 0) {
      return true;
    } else {
      return false;
    }
  }

  const handlePayWayChange = (e) => {
    const value = e.target.value
    if (value === 'line_pay') {
      Modal.info({
        title: 'LINEPAY 尚未開放',
        content: '抱歉，LINEPAY 付款方式尚未開放，請選擇其他付款方式。',
        okText: '確定',
        centered: true,
      })
      setSelectedPayWay('credit_card')
    } else {
      setSelectedPayWay(value)
    }
  }

  const handleConfirm = () => {
    if (invoiceType === 1) {
      // 驗證載具號碼格式
      const carrierPattern = /^\/{1}[A-Z0-9+-.]{7}$/i;
      if (!number) {
        Modal.error({
          title: '請輸入載具號碼',
          content: '請輸入您的載具號碼',
          centered: true,
        });
        return false;
      } else if (!carrierPattern.test(number)) {
        Modal.error({
          title: '載具號碼格式錯誤',
          content: '載具號碼應以「/」開頭，後接 7 位英數字或符號',
          centered: true,
        });
        return false;
      }
    } else if (invoiceType === 2) {
      // 驗證自然人憑證格式
      const citizenCertPattern = /^[A-Z]{2}\d{14}$/i;
      if (!number) {
        Modal.error({
          title: '請輸入自然人憑證',
          content: '請輸入您的自然人憑證',
          centered: true,
        });
        return false;
      } else if (!citizenCertPattern.test(number)) {
        Modal.error({
          title: '自然人憑證格式錯誤',
          content: '自然人憑證應為 2 位字母加 14 位數字，共 16 位',
          centered: true,
        });
        return false;
      }
    } else if (invoiceType === 3) {
      // 驗證是否選擇捐贈機構
      if (!number) {
        Modal.error({
          title: '請選擇捐贈機構',
          content: '請選擇要捐贈的機構',
          centered: true,
        });
        return false;
      }
    } else if (invoiceType === 4) {
      // 驗證統一編號格式和合法性
      if (!number) {
        Modal.error({
          title: '請輸入統一編號',
          content: '請輸入您的統一編號',
          centered: true,
        });
        return false;
      } else if (!/^\d{8}$/.test(number)) {
        Modal.error({
          title: '統一編號格式錯誤',
          content: '統一編號應為 8 位數字',
          centered: true,
        });
        return false;
      } else if (!validateUBN(number)) {
        Modal.error({
          title: '統一編號錯誤',
          content: '請輸入有效的統一編號',
          centered: true,
        });
        return false;
      }
    }
    if (selectedPayWay === 'credit_card') {
      setShowTapPayPage(true)
      setShowATMTapPayPage(false)
    } else if (selectedPayWay === 'atm') {
      setShowATMTapPayPage(true)
      setShowTapPayPage(false)
    }
  }

  if (showTapPayPage)
    return (
      <TapPay
        onSubmit={dataStore.topUp}
        selected={selectedPrice}
        cancel={setShowTapPayPage}
      />
    )
  if (showATMTapPayPage) {
    if (selectedPrice > 49999) {
      Modal.error({
        title: 'ATM轉帳限制',
        content: 'ATM 轉帳單筆限制金額為 50,000 元，請選擇其他付款方式。',
        centered: true,
      })
      setShowATMTapPayPage(false)
      return
    } else {
      return (
        <AtmTapPay
          cancel={setShowATMTapPayPage}
          onSubmit={dataStore.atmTopUp}
          selected={selectedPrice}
          number={number}
          invoiceType={invoiceType}
          payeeInfo={payeeInfo}
        />
      )
    }
  }

  return (
    <Content>
      <Container>
        <Title>
          <span>step 1</span>請選擇付款方式
        </Title>
        <StyledRadioGroup onChange={handlePayWayChange} value={selectedPayWay}>
          {PayWayOptions.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              <FontAwesomeIcon icon={option.icon} className="icon" />{' '}
              {option.label}
            </Radio.Button>
          ))}
        </StyledRadioGroup>
        <WarningBlock>
          <div>
            連續刷卡有機率會被銀行鎖卡，請務必確認好儲值金額，避免損失。
          </div>
        </WarningBlock>
        <Title>
          <span>step 2</span>請選擇儲值金額
        </Title>
        <P center={true}>首次儲值超過300元 會得到新手禮包50張 御守</P>
        <P center={true}>請確保會員資料信箱、手機號碼、等相關個人資訊正確 避免發票無法寄出</P>
        <OptionContainer>
          {TOP_UP_PRICE_OPTIONS.map((option) => (
            <Option
              key={option.value}
              selected={selectedPrice}
              setSelected={setSelectedPrice}
              {...option}
            />
          ))}
        </OptionContainer>

        {/* 發票資訊區塊 */}
        <InvoiceSection>
          <Title>
            <span>step 3</span>請填寫發票資訊
          </Title>

          {/* 發票類型選擇 */}
          <InvoiceOptionLabel>發票類型：</InvoiceOptionLabel>
          <StyledInvoiceRadioGroup
            onChange={(e) => {
              dataStore.setInvoiceType(e.target.value)
              dataStore.setInvoiceNumber('') // 重置 number
            }}
            value={invoiceType}
          >
            {INVOICE_TYPES.map((type) => (
              <Radio.Button key={type.value} value={type.value}>
                {type.label}
              </Radio.Button>
            ))}
          </StyledInvoiceRadioGroup>

          {/* 載具號碼輸入框 */}
          {(invoiceType === 1 || invoiceType === 2) && (
            <>
              <InvoiceOptionLabel>
                {invoiceType === 1 ? '載具號碼：' : '自然人憑證號碼：'}
              </InvoiceOptionLabel>
              <InvoiceInput
                placeholder={
                  INVOICE_TYPES.find((type) => type.value === invoiceType)
                    .placeholder
                }
                value={number}
                onChange={(e) => dataStore.setInvoiceNumber(e.target.value)}
              />
              <InvoiceNote>
                {invoiceType === 1
                  ? '載具號碼為8碼，請輸入正確的載具號碼。'
                  : '自然人憑證號碼為16碼，請輸入正確的號碼。'}
              </InvoiceNote>
            </>
          )}

          {/* 捐贈機構選擇 */}
          {invoiceType === 3 && (
            <>
              <InvoiceOptionLabel>捐贈機構：</InvoiceOptionLabel>
              <InvoiceSelect
                placeholder="請選擇捐贈機構"
                value={number}
                onChange={(value) => dataStore.setInvoiceNumber(value)}
              >
                {INVOICE_TYPES.find(
                  (type) => type.value === 3
                ).donateOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </InvoiceSelect>
            </>
          )}
          {invoiceType === 4 && (
            <>
              <InvoiceOptionLabel>公司名稱</InvoiceOptionLabel>
              <InvoiceInput
                placeholder="請輸入公司名稱"
                value={companyName}
                onChange={(e) =>
                  dataStore.setInvoiceCompanyName(e.target.value)
                }
              />
              <InvoiceOptionLabel>統一編號</InvoiceOptionLabel>
              <InvoiceInput
                status={number.length === 8 ? 'success' : 'error'}
                placeholder={
                  INVOICE_TYPES.find((type) => type.value === invoiceType)
                    .placeholder
                }
                value={number}
                onChange={(e) => dataStore.setInvoiceNumber(e.target.value)}
              />
              <InvoiceNote>統一編號共八碼</InvoiceNote>
            </>
          )}
        </InvoiceSection>

        <ButtonContainer>
          <Button type="primary" onClick={handleConfirm}>
            確認
          </Button>
        </ButtonContainer>
      </Container>
    </Content>
  )
}

function Option({ selected, setSelected, value, name, src }) {
  return (
    <BaseOption
      onClick={() => setSelected(value)}
      selected={selected === value}
    >
      <CheckIcon selected={selected === value} />
      <Image src={src} alt={name} />
      <Price>{name}</Price>
    </BaseOption>
  )
}
