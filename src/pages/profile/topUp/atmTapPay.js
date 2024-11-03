import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DrawOutBtn as Button } from '@app/pages/commodity';
import { Container } from '../tabStyle';
import { Content } from '../index';

// TapPay SDK 初始化參數
const isDev = process.env.NODE_ENV !== 'production';
const APP_ID = 154437;
const APP_KEY = 'app_FwMCJkWJTC66UdYQU4CP3iYN9ECAarqcNzqn9hJnegjRiyp4RdOiPKioRjLt';

const TapPayContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  div + div {
    margin-left: 8px;
  }
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  span {
    font-size: 16px;
    color: #333333;
  }

  .label {
    font-weight: 600;
  }

  .value {
    color: #555555;
  }

  @media (max-width: 600px) {
    span {
      font-size: 14px;
    }
  }
`;

const Title = styled.h2`
  font-size: 20px;
  color: #222222;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 發票類型對應的標籤
const invoiceTypeMap = {
  1: {
    label: '個人雲端發票',
    numberLabel: '載具號碼',
  },
  2: {
    label: '自然人憑證',
    numberLabel: '憑證號碼',
  },
  3: {
    label: '發票捐贈',
    numberLabel: '捐贈碼',
  },
};

export default function AtmTapPay({ onSubmit, selected, number, invoiceType, cancel }) {
  const serverType = isDev ? 'sandbox' : 'production';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    TPDirect.setupSDK(APP_ID, APP_KEY, serverType);
  }, []);

  // 根據 invoiceType 獲取相應的標籤
  const currentInvoiceType = invoiceTypeMap[invoiceType] || {
    label: '未知發票類型',
    numberLabel: '發票號碼',
  };

  function onTopUp() {
    event.preventDefault()
    alert('開發中 尚未開通')
    // const req = { amount: selected }
    // onSubmit(req)
  }

  return (
    <Content>
      {loading && (
        <LoadingOverlay>
          <div className="spinner"></div>
        </LoadingOverlay>
      )}
      <Container>
        <TapPayContainer id="tap-pay">
          <SummaryCard>
            <Title>請確認您的消費資訊</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SummaryItem>
              <span className="label">消費金額：</span>
              <span className="value">NT$ {selected.toLocaleString()}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="label">{currentInvoiceType.numberLabel}：</span>
              <span className="value">{number}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="label">發票類型：</span>
              <span className="value">{currentInvoiceType.label}</span>
            </SummaryItem>
          </SummaryCard>
          <ButtonContainer>
            <Button onClick={()=>cancel(false)}>取消</Button>
            <Button onClick={onTopUp}>儲值</Button>
          </ButtonContainer>
        </TapPayContainer>
      </Container>
    </Content>
  );
}
