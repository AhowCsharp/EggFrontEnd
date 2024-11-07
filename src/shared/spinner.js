import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import animation from '@app/static/loading.gif';
import {
  IS_FIRST_TIME
} from "@app/utils/constants";

// Styled Components
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.alertMask};
`;

const Layout = styled.div`
  position: fixed;
  top: 50vh;
  transform: translateY(-50%);
  width: 50%;
  left: 25%;
  z-index: ${(p) => p.theme.zIndex.alertDialog};
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;

  @media (max-width: 768px) {
    width: 80%;
    left: 10%;
  }
`;

const ImgContainer = styled.div`
  width: 36%;
  display: flex;
  z-index: ${(p) => p.theme.zIndex.dialog};
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 80%;
  }

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
`;

// Spinner Component
const Spinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasShown = localStorage.getItem(IS_FIRST_TIME);

      if (hasShown == 'true') {
        setShowSpinner(true);
      }
      else {
        setShowSpinner(false);
      }
    }
  }, []);

  if (!showSpinner) {
    return null;
  }

  return (
    <>
      <Mask />
      <Layout>
        <ImgContainer>
          <img className="loading" src={animation} alt="Loading..." />
        </ImgContainer>
      </Layout>
    </>
  );
};

export default Spinner;
