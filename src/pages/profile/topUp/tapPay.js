import { DrawOutBtn as Button } from '@app/pages/commodity';
import styled from 'styled-components';
import { useState, useEffect } from 'react'; // 确保导入 useState
import { Container } from '../tabStyle';
import { Content } from '../index';

// 新增的 styled 组件
const InfoText = styled.div`
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    color: white;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  div + div {
    margin-left: 8px;
  }
`;

const TapPayContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    height: 38px;
    line-height: 38px;
    width: 370px;
    max-width: 100%;
    border: 1px solid #d9d9d9;
    margin-bottom: 10px;
    padding: 0 10px;
    border-radius: 6px;
  }
`;

export default function TapPay({ onSubmit, selected, cancel }) {
  const [isMobile, setIsMobile] = useState(false);

  const isDev = process.env.NODE_ENV !== 'production';
  const APP_ID = 154437;
  const APP_KEY =
    'app_FwMCJkWJTC66UdYQU4CP3iYN9ECAarqcNzqn9hJnegjRiyp4RdOiPKioRjLt';
  const serverType = isDev ? 'sandbox' : 'production';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    TPDirect.setupSDK(APP_ID, APP_KEY, serverType);

    const config = {
      fields: {
        number: {
          element: '#card-number',
          placeholder: '**** **** **** ****',
        },
        expirationDate: {
          element: '#card-expiration-date',
          placeholder: 'MM / YY',
        },
        ccv: {
          element: '#card-ccv',
          placeholder: '後三碼',
        },
      },
      styles: {
        input: {
          'font-size': '14px',
          color: isMobile ? 'white' : 'black',
        },
        '.invalid': {
          color: '#ff0000',
        },
      },
      isMaskCreditCardNumber: true,
      maskCreditCardNumberRange: {
        beginIndex: 4,
        endIndex: 11,
      },
    };

    TPDirect.card.setup(config);
  }, [APP_ID, APP_KEY, serverType, isMobile]); // 添加 isMobile 作为依赖

  return (
    <Content>
      <Container>
        <InfoText>
          本站串接 喬睿科技 TapPay金流🕵️採3D驗證，請顧客放心⚠️
          <br />
          <br />
          我們真不是詐騙集團🤣
        </InfoText>
        <TapPayContainer id="tap-pay">
          <div id="card-number"></div>
          <div id="card-expiration-date"></div>
          <div id="card-ccv"></div>
        </TapPayContainer>
        <ButtonContainer>
          <Button onClick={() => cancel(false)}>取消</Button>
          <Button onClick={onTopUp}>儲值</Button>
        </ButtonContainer>
      </Container>
    </Content>
  );

  function onTopUp(event) {
    event.preventDefault();
    const { canGetPrime } = TPDirect.card.getTappayFieldsStatus();
    if (!canGetPrime) return;
    const req = { amount: selected };
    onSubmit(req);
  }
}
