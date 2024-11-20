import styled from 'styled-components';
import { useSelector, dataStore } from '@app/store';
import { DrawOutBtn as Button } from '@app/pages/commodity';
import { useEffect, useState } from 'react';

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.alertMask};
`;

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Footer = styled(Block)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px 0;
`;

const Content = styled(Block)`
  padding: 20px 0;
  flex-direction: column;
  
  p {
    text-align: center; /* Centered text */
    word-break: break-word; /* Automatic line breaking */
    margin: 0; /* Remove default margins */
    line-height: 1.6; /* Increase line spacing */
  }

  @media (max-width: 768px) {
    p {
      font-size: 1.2rem;
      padding: 0 10px; /* Add horizontal padding */
      line-height: 1.6; /* Ensure consistent line spacing on mobile */
    }
  }
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 完全居中 */
  width: 60%;
  z-index: ${(p) => p.theme.zIndex.alertDialog};
  display: flex;
  flex-direction: column;
  min-height: 230px;
  max-height: calc(90vh - 175px);
  font-size: 1.15rem;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 15px 35px 40px;

  @media (max-width: 768px) {
    width: 90%;
    max-height: calc(90vh - 165px);
    padding: 15px 20px 30px;
  }
`;

const Toast = styled.div`
  position: fixed; /* 改為 fixed 以便於居中 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 完全居中 */
  width: 30%;
  z-index: ${(p) => p.theme.zIndex.alertDialog};
  display: flex;
  flex-direction: column;
  font-size: 1.15rem;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px;

  @media (max-width: 768px) {
    width: 80%;
    padding: 15px 20px;
  }
`;

export default function AlertDialog() {
  const msg = useSelector(() => dataStore.alertMessage);
  const isToast = useSelector(() => dataStore.isToast);
  const onClose = () => dataStore.clearAlertMessage();
  const [seconds, setSeconds] = useState(800);

  useEffect(() => {
    if (!isToast) return;
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 100);
      }, 100);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      dataStore.clearAlertMessage();
      setSeconds(800);
    }
  }, [seconds, isToast]);

  if (!msg) return null;

  if (isToast)
    return (
      <>
        <Mask />
        <Toast className="dialog">
          <Content>
            <p>{msg}</p>
          </Content>
        </Toast>
      </>
    );

  return (
    <>
      <Mask />
      <Container className="dialog">
        <Content>
          <p>{msg}</p>
        </Content>
        <Footer>
          <Button onClick={onClose}>關閉</Button>
        </Footer>
      </Container>
    </>
  );
}
