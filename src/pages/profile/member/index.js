import styled from 'styled-components';
import { Descriptions } from 'antd';
import { useSelector, dataStore } from '@app/store';
import { useEffect, useRef, useState } from 'react';
import CopyToClipboard from '@app/shared/copyToClipboard';
import {
  INCLUDE_MEMBER_COLUMNS,
  INCLUDE_MEMBER_COLUMNS_ENABLE_COPY,
} from '@app/utils/constants';
import coinImg from '@app/static/profile/coin.png';
import ticket2000Img from '@app/static/profile/ticket-2000.png';
import ticketPlatformImg from '@app/static/profile/ticket-platform.png';
import coinWelfareImg from '@app/static/profile/coin-welfare.png';
import { Content } from '../index';
import EditPassword from './editPassword';
import EditMember from './editMember';
import checkBrokenImg from '@app/static/check-broken.jpg';
import upImg from '@app/static/arrow-up.png';
import downImg from '@app/static/arrow-down.png';
import defaultHeadShotUrl from '@app/static/imgUpload.png';

const BindSuccessText = styled.span`
  font-size: 16px;
  color: #58b83f;
  line-height: 22px;
`;

const labelDisplay = {
  account: '帳號',
  name: '收貨姓名',
  nickName: '暱稱',
  phoneNum: '手機',
  email: 'E-mail',
  city: '居住城市',
  districtNo: '郵遞區號',
  districtName: '居住地區',
  address: '詳細地址',
  referralCode: '推薦碼',
  referralCodeUrl: '推薦連結',
};

function handleMemberInfo(member) {
  return Object.keys(member)
    .map((key) => {
      if (INCLUDE_MEMBER_COLUMNS.includes(key))
        return (
          <Descriptions.Item key={key} label={labelDisplay[key]}>
            {member[key]}
          </Descriptions.Item>
        );
      if (INCLUDE_MEMBER_COLUMNS_ENABLE_COPY.includes(key))
        return (
          <Descriptions.Item
            key={key}
            label={labelDisplay[key]}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <CopyToClipboard>{member[key]}</CopyToClipboard>
            {key === 'account' && member.lineUserId !== null && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <div style={{ marginRight: '10px' }}></div>
                <img
                  style={{ width: '24px', height: '24px', marginRight: '6px' }}
                  src={checkBrokenImg}
                  alt='checkBrokenImg'
                />
                <BindSuccessText>已綁定LINE</BindSuccessText>
              </div>
            )}
          </Descriptions.Item>
        );
    })
    .filter(Boolean);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  background: #f7f7f7;
  border-radius: ${(p) => p.theme.borderRadius.memberInfo};
  margin: 0 0 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  img {
    width: 50px;
    height: 50px;
  }
  span {
    font-size: 0.8rem;
  }
  * + * {
    margin-top: 2px;
  }
`;

const InfoComponent = ({
  img,
  title,
  value_title,
  value,
  subValue_title,
  subValue,
  showLevel,
  member,
}) => {
  // const rankingChanges = member.rankingChanges;
  const rankingChanges = 2;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginRight: '35px',
      }}
    >
      <img src={img} alt={title} style={{ width: '80px', height: '80px' }} />
      <div
        style={{
          justifyContent: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '700' }}
          >
            {title}
          </div>
          {showLevel && (
            <div style={{ display: 'flex', marginLeft: '38px' }}>
              <div style={{ display: 'flex', lineHeight: '20px' }}>
                <div style={{ fontWeight: '400', fontSize: '14px' }}>
                  生涯排名&nbsp;
                </div>
                <div style={{ fontWeight: '600', fontSize: '18px' }}>
                  {member.todayRank}
                </div>
                {rankingChanges !== 0 && (
                  <div
                    style={{
                      marginLeft: '8px',
                      fontWeight: '400',
                      fontSize: '14px',
                      border:
                        rankingChanges > 0
                          ? '1px solid #58B83F'
                          : '1px solid #A21A2B',
                      borderRadius: '11px',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      height: '22px',
                    }}
                  >
                    {rankingChanges > 0 ? (
                      <img
                        src={upImg}
                        alt='upImg'
                        style={{ width: '18px', marginRight: '4px' }}
                      />
                    ) : (
                      <img
                        src={downImg}
                        alt='downImg'
                        style={{ width: '18px', marginRight: '4px' }}
                      />
                    )}
                    <div
                      style={{
                        color: rankingChanges > 0 ? '#58B83F' : '#A21A2B',
                      }}
                    >
                      {rankingChanges}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            height: '2px',
            backgroundColor: '#E6E6E6',
            width: '100%',
            minWidth: showLevel ? '200px' : '110px',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        ></div>
        <div
          style={{ fontSize: '16px', lineHeight: '22px', fontWeight: '500' }}
        >
          {value_title} {value}
        </div>
        {subValue_title && (
          <div style={{ display: 'flex', marginTop: '4px' }}>
            <div
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '400',
                color: '#999999',
              }}
            >
              {subValue_title}&nbsp;
            </div>
            <div
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '600',
                color: '#999999',
              }}
            >
              {subValue}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const membershipLevel = {
  1: '會員',
  2: '黑鐵',
  3: '青銅',
  4: '白銀',
  5: '黃金',
  6: '白金',
  7: '鑽石',
  8: '傳說',
};
const handleWalletInfo = (member) => {
  return [
    {
      showLevel: true,
      img: coinImg,
      title: membershipLevel[member.membershipLevel],
      value_title: '可用金幣',
      value: member.moneyAmount,
      subValue_title: '生涯總儲值',
      subValue: member.totalStoredMoney,
    },
    {
      img: coinWelfareImg,
      title: '御守',
      value_title: '可用數量',
      value: member.welfareAmount,
      subValue_title: '總回饋數量',
      subValue: member.totalFeedback,
    },
    {
      img: ticketPlatformImg,
      title: '平台抽獎券',
      value_title: '可用數量',
      value: member.ticketEverydayAmount,
    },
    {
      img: ticket2000Img,
      title: '廠商抽獎券',
      value_title: '可用數量',
      value: member.ticketAmount,
    },
  ];
};

export default function Member() {
  const member = useSelector(() => dataStore.member);
  const [memberDisplayInfos, setMemberDisplayInfos] = useState(null);
  const [walletInfo, setWalletInfo] = useState(null);
  const headShotFile = useRef(null);
  const [uploadHeadShotSuccess, setUploadHeadShotSuccess] = useState(false);
  console.log('🚀 ~ Member ~ memberDisplayInfos:', memberDisplayInfos);

  useEffect(() => {
    if (member) {
      const memberDisplayInfos = handleMemberInfo(member);
      setMemberDisplayInfos(memberDisplayInfos);
      const walletInfo = handleWalletInfo(member);
      setWalletInfo(walletInfo);
      return;
    }
  }, [member, uploadHeadShotSuccess]);

  useEffect(() => {
    if (uploadHeadShotSuccess) {
      setUploadHeadShotSuccess(false);
      headShotFile.current.value = null;
    }
  }, [uploadHeadShotSuccess]);

  const handleUploadHeadShot = () => {
    const file = headShotFile.current.files[0];
    dataStore.uploadHeadShot(file);
    headShotFile.current.value = null;
    setUploadHeadShotSuccess(true);
  };

  if (!member) return null;

  return (
    <Content>
      <Container>
        <InfoContainer>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              rowGap: '16px',
            }}
          >
            {walletInfo?.map((item) => (
              <InfoComponent {...item} member={member} />
            ))}
          </div>
        </InfoContainer>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            {member.lineUserId === null && member.headShotUrl === null ? (
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  headShotFile.current.click();
                }}
              >
                <input
                  type='file'
                  ref={headShotFile}
                  style={{ display: 'none' }}
                  onChange={handleUploadHeadShot}
                />
                <img
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '6px',
                    marginTop: '48px',
                  }}
                  src={defaultHeadShotUrl}
                  alt='defaultHeadShotUrl'
                />
              </div>
            ) : (
              <img
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '6px',
                  marginTop: '48px',
                }}
                src={member.headShotUrl}
                alt='headShotUrl'
              />
            )}
          </div>
          <Descriptions
            title='修改會員資料'
            layout='vertical'
            // items={memberDisplayInfos}
            column={1}
          >
            {memberDisplayInfos?.map((item) => item)}
          </Descriptions>
        </div>
        <EditMember member={member} />
        {member.lineUserId == null ? <EditPassword /> : null}
      </Container>
    </Content>
  );
}
