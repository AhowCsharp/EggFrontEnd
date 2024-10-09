import { useState, useEffect } from 'react';
import { Radio, Modal, Input, Select } from 'antd';
import styled from 'styled-components';
import { TOP_UP_PRICE_OPTIONS } from '@app/utils/constants';
import { dataStore, useSelector } from '@app/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faLine } from '@fortawesome/free-brands-svg-icons'; // 引入 LinePay 圖示
import { DrawOutBtn as Button } from '@app/pages/commodity';
import { P } from '@app/shared/infoDialog';
import { Container, ButtonContainer } from '../tabStyle';
import { Content } from '../index';
import TapPay from './tapPay';

const PayWayOptions = [
  { value: 'credit_card', label: '信用卡', icon: faCreditCard },
  { value: 'line_pay', label: 'LINEPAY', icon: faLine }, // 新增 LINEPAY 選項
];

// 定義發票類型和選項
const INVOICE_TYPES = [
  {
    value: 'personal_cloud',
    label: '個人雲端發票',
    subTypes: [
      { value: 'mobile_barcode', label: '手機條碼載具', placeholder: '請輸入您的手機條碼載具' },
      { value: 'citizen_certificate', label: '自然人憑證載具', placeholder: '請輸入您的自然人憑證載具' },
    ],
  },
  {
    value: 'donate_invoice',
    label: '發票捐贈',
    donateOptions: [
      { value: '38626905', label: '社團法人臺北市毛小孩幸福聯盟協會' },
      { value: '72374225', label: '社團法人浪浪的後盾協會' },
    ],
  },
];

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  width: 100%;
  vertical-align: middle;
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  span {
    font-size: 1.25rem;
    color: rgb(245, 173, 61);
    margin-right: 5px;
  }
`;

const SubTitle = styled.div`
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CheckIcon = styled(FontAwesomeIcon).attrs(() => ({
  icon: faCheck,
}))`
  font-size: 1rem;
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  background-color: ${(p) =>
    p.selected ? p.theme.color.topUpSelected : '#ddd'};
`;

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
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`;

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
`;

const Price = styled.div`
  color: ${(p) => p.theme.color.topUpSelected};
  font-size: 1.3rem;
  font-weight: 700;
`;

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .ant-radio-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; /* 使用 gap 屬性控制圖示和文字之間的間距 */
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0 5px; /* 調整為左右各 5px，確保總間距為 10px */
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
    background-color: #f5f5f5;
    border: none; /* 移除邊框 */
    transition: background-color 0.3s, color 0.3s;
  }

  .ant-radio-button-wrapper-checked {
    background-color: ${(p) => p.theme.color.topUpSelected};
    color: #fff;
  }

  /* 移除 hover 時的樣式變化 */
  .ant-radio-button-wrapper:hover {
    background-color: #f5f5f5; /* 保持原有背景色 */
    color: #666; /* 保持原有文字顏色 */
  }
`;

const StyledInvoiceRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .ant-radio-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 5px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #666;
    background-color: #f5f5f5;
    border: none;
  }

  .ant-radio-button-wrapper-checked {
    background-color: ${(p) => p.theme.color.topUpSelected};
    color: #fff;
  }

  .ant-radio-button-wrapper:hover {
    background-color: #f5f5f5;
    color: #666;
  }
`;

const StyledCarrierRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  .ant-radio-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 5px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #666;
    background-color: #f5f5f5;
    border: none;
  }

  .ant-radio-button-wrapper-checked {
    background-color: ${(p) => p.theme.color.topUpSelected};
    color: #fff;
  }

  .ant-radio-button-wrapper:hover {
    background-color: #f5f5f5;
    color: #666;
  }
`;

export default function TopUp() {
  // 狀態變量
  const [selectedPrice, setSelectedPrice] = useState(TOP_UP_PRICE_OPTIONS[0].value);
  const [selectedPayWay, setSelectedPayWay] = useState('credit_card');
  const [showTapPayPage, setShowTapPayPage] = useState(false);
  const paymentUrl = useSelector(() => dataStore.paymentUrl);

  // 發票資訊狀態
  const [invoiceType, setInvoiceType] = useState('personal_cloud');
  const [personalCarrierType, setPersonalCarrierType] = useState('mobile_barcode');
  const [carrierNumber, setCarrierNumber] = useState('');
  const [donateOrganization, setDonateOrganization] = useState('');

  useEffect(() => {
    if (paymentUrl) {
      window.open(paymentUrl, '_self');
    }
  }, [paymentUrl]);

  const handlePayWayChange = (e) => {
    const value = e.target.value;
    if (value === 'line_pay') {
      // 顯示尚未開放的提示框
      Modal.info({
        title: 'LINEPAY 尚未開放',
        content: '抱歉，LINEPAY 付款方式尚未開放，請選擇其他付款方式。',
        okText: '確定',
      });
      // 重置選擇為信用卡
      setSelectedPayWay('credit_card');
    } else {
      setSelectedPayWay(value);
    }
  };

  const handleConfirm = () => {
    // 驗證發票資訊
    if (invoiceType === 'personal_cloud') {
      if (!carrierNumber) {
        Modal.error({
          title: '請輸入載具號碼',
          content: '請輸入您的載具號碼',
        });
        return;
      }
    } else if (invoiceType === 'donate_invoice') {
      if (!donateOrganization) {
        Modal.error({
          title: '請選擇捐贈機構',
          content: '請選擇要捐贈的機構',
        });
        return;
      }
    }

    // 保存發票資訊到 dataStore
    dataStore.setInvoiceData({
      invoiceType,
      personalCarrierType,
      carrierNumber,
      donateOrganization,
    });

    // 進入 TapPay 付款頁面
    setShowTapPayPage(true);
  };

  if (showTapPayPage)
    return <TapPay onSubmit={dataStore.topUp} selected={selectedPrice} />;

  return (
    <Content>
      <Container>
        <Title>
          <span>step 1</span>請選擇付款方式
        </Title>
        <StyledRadioGroup onChange={handlePayWayChange} value={selectedPayWay}>
          {PayWayOptions.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              <FontAwesomeIcon icon={option.icon} className="icon" />
              {' '}{option.label}
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
        <P center={true}>首次儲值超過300元 會得到新手禮包50元的御守</P>
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
        {/* 新增發票資訊區塊 */}
        <Title>
          <span>step 3</span>請填寫發票資訊
        </Title>
        <StyledInvoiceRadioGroup
          onChange={(e) => setInvoiceType(e.target.value)}
          value={invoiceType}
        >
          {INVOICE_TYPES.map((type) => (
            <Radio.Button key={type.value} value={type.value}>
              {type.label}
            </Radio.Button>
          ))}
        </StyledInvoiceRadioGroup>
        {invoiceType === 'personal_cloud' && (
          <>
            <SubTitle>請選擇載具類型</SubTitle>
            <StyledCarrierRadioGroup
              onChange={(e) => setPersonalCarrierType(e.target.value)}
              value={personalCarrierType}
            >
              {INVOICE_TYPES.find((type) => type.value === 'personal_cloud').subTypes.map(
                (subType) => (
                  <Radio.Button key={subType.value} value={subType.value}>
                    {subType.label}
                  </Radio.Button>
                )
              )}
            </StyledCarrierRadioGroup>
            <Input
              placeholder={
                INVOICE_TYPES.find((type) => type.value === 'personal_cloud').subTypes.find(
                  (subType) => subType.value === personalCarrierType
                ).placeholder
              }
              value={carrierNumber}
              onChange={(e) => setCarrierNumber(e.target.value)}
            />
          </>
        )}
        {invoiceType === 'donate_invoice' && (
          <>
            <SubTitle>請選擇捐贈機構</SubTitle>
            <Select
              placeholder="請選擇捐贈機構"
              value={donateOrganization}
              onChange={(value) => setDonateOrganization(value)}
              style={{ width: '100%' }}
            >
              {INVOICE_TYPES.find((type) => type.value === 'donate_invoice').donateOptions.map(
                (option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                )
              )}
            </Select>
          </>
        )}
        <ButtonContainer>
          <Button type="primary" onClick={handleConfirm}>
            確認
          </Button>
        </ButtonContainer>
      </Container>
    </Content>
  );
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
  );
}
