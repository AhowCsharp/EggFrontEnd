import styled from "styled-components";
import { Descriptions, Spin, Input } from "antd";
import { useSelector, dataStore } from "@app/store";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "@app/shared/copyToClipboard";
import {
  INCLUDE_MEMBER_COLUMNS,
  INCLUDE_MEMBER_COLUMNS_ENABLE_COPY,
} from "@app/utils/constants";
import coinImg from "@app/static/profile/coin.png";
import ticket2000Img from "@app/static/profile/ticket-2000.png";
import ticketPlatformImg from "@app/static/profile/ticket-platform.png";
import coinWelfareImg from "@app/static/profile/coin-welfare.png";
import { Content } from "../index";
import EditPassword from "./editPassword";
import EditMember from "./editMember";
import checkBrokenImg from "@app/static/check-broken.png";
import upImg from "@app/static/arrow-up.png";
import downImg from "@app/static/arrow-down.png";
import defaultHeadShotUrl from "@app/static/imgUpload.png";
import { Button } from "../../commodity/index";

const BindSuccessText = styled.span`
  font-size: 16px;
  color: #58b83f;
  line-height: 22px;
`;

const labelDisplay = {
  account: "帳號",
  name: "收貨姓名",
  nickName: "暱稱",
  phoneNum: "手機",
  email: "E-mail",
  city: "居住城市",
  districtNo: "郵遞區號",
  districtName: "居住地區",
  address: "詳細地址",
  referralCode: "推薦碼",
  referralCodeUrl: "推薦連結",
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
            style={{ display: "flex", alignItems: "center" }}
          >
            <CopyToClipboard>{member[key]}</CopyToClipboard>
            {key === "account" && member.lineUserId !== null && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <div style={{ marginRight: "10px" }}></div>
                <img
                  style={{ width: "24px", height: "24px", marginRight: "6px" }}
                  src={checkBrokenImg}
                  alt="checkBrokenImg"
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

  @media (max-width: 768px) {
    background: #212b3a;
  }
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

const Title = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;

  @media (max-width: 768px) {
    color: #ffffff;
  }
`;

const ValueText = styled.div`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;

  @media (max-width: 768px) {
    color: #ffffff;
  }
`;

const SubValueText = styled.div`
  display: flex;
  margin-top: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #999999;

  @media (max-width: 768px) {
    color: #cccccc;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 6px;
`;

const ProfileImageContainer = styled.div`
  @media (max-width: 768px) {
    position: static;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
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
  const rankingChanges = member.rankingChanges;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        marginRight: "35px",
      }}
    >
      <img src={img} alt={title} style={{ width: "80px", height: "80px" }} />
      <div
        style={{
          justifyContent: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>{title}</Title>
          {showLevel && (
            <div style={{ display: "flex", marginLeft: "38px" }}>
              <div style={{ display: "flex", lineHeight: "20px" }}>
                <div style={{ fontWeight: "400", fontSize: "14px" }}>
                  生涯排名&nbsp;
                </div>
                <div style={{ fontWeight: "600", fontSize: "18px" }}>
                  {member.todayRank}
                </div>
                {rankingChanges !== 0 && (
                  <div
                    style={{
                      marginLeft: "8px",
                      fontWeight: "400",
                      fontSize: "14px",
                      border:
                        rankingChanges > 0
                          ? "1px solid #58B83F"
                          : "1px solid #A21A2B",
                      borderRadius: "11px",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      height: "22px",
                    }}
                  >
                    {rankingChanges > 0 ? (
                      <img
                        src={upImg}
                        alt="upImg"
                        style={{ width: "18px", marginRight: "4px" }}
                      />
                    ) : (
                      <img
                        src={downImg}
                        alt="downImg"
                        style={{ width: "18px", marginRight: "4px" }}
                      />
                    )}
                    <div
                      style={{
                        color: rankingChanges > 0 ? "#58B83F" : "#A21A2B",
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
            height: "2px",
            backgroundColor: "#E6E6E6",
            width: "100%",
            minWidth: showLevel ? "200px" : "110px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        ></div>
        <ValueText>
          {value_title} {value}
        </ValueText>
        {subValue_title && (
          <SubValueText>
            <div>{subValue_title}&nbsp;</div>
            <div style={{ fontWeight: "600" }}>{subValue}</div>
          </SubValueText>
        )}
      </div>
    </div>
  );
};

const HeadShotAndStatusMessegeComponent = ({ member }) => {
  const headShotFile = useRef(null);
  const [uploadHeadShotSuccess, setUploadHeadShotSuccess] = useState(false);
  const [isUploadingHeadShot, setIsUploadingHeadShot] = useState(false);
  const [statusMessage, setStatusMessage] = useState(member.statusMessage);
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleUploadHeadShot = async () => {
    // setIsUploadingHeadShot(true);

    console.log("headShotFile.current.files[0]", headShotFile.current.files[0]);

    setUploadHeadShotSuccess(true);

    const file = headShotFile.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
    // dataStore.uploadHeadShot(file, member.statusMessage);
    // headShotFile.current.value = null;
  };

  const handleSave = () => {
    if (member.lineUserId === null) {
      const file = headShotFile.current.files[0];
      dataStore.uploadHeadShot(file, statusMessage);
    }
  };

  return (
    <div>
      {member.lineUserId === null ? (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            headShotFile.current.click();
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={headShotFile}
            style={{ display: "none" }}
            onChange={handleUploadHeadShot}
          />
          {isUploadingHeadShot ? (
            // 使用 style 來實作轉圈 spinner
            <div style={{ width: "50px", height: "50px" }}>
              <Spin />
            </div>
          ) : (
            <div style={{ position: "relative", width: "200px", height: "200px" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  textAlign: "center",
                  width: "200px",
                  backgroundColor: "#ffffff",
                  opacity: "0.5",
                  padding: "10px 0",
                  color: "#000000",
                }}
              >
                編輯大頭貼
              </div>
              <ProfileImage
                src={
                  uploadHeadShotSuccess
                    ? previewSrc
                    : member.headShotUrl || defaultHeadShotUrl
                }
                alt="defaultHeadShotUrl"
              />
            </div>
          )}
        </div>
      ) : (
        <ProfileImage src={member.headShotUrl} alt="headShotUrl" />
      )}

      {member.lineUserId === null && (
        <div
          style={{
            marginTop: "12px",
            marginBottom: "10px",
            fontSize: "16px",
            lineHeight: "22px",
          }}
        >
          狀態訊息
        </div>
      )}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          marginBottom: "12px",
        }}
      >
        {member.lineUserId === null ? (
          <Input
            placeholder="尚未填寫"
            // disabled={member.lineUserId === null}
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
          />
        ) : (
          <div>{member.statusMessage}</div>
        )}
        {member.lineUserId === null && (
          <Button
            style={{ width: "150px", marginLeft: "12px", textAlign: "center" }}
            type="primary"
          >
            <div
              style={{
                margin: "auto",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              儲存狀態
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

const membershipLevel = {
  1: "黑鐵",
  2: "青銅",
  3: "白銀",
  4: "黃金",
  5: "白金",
  6: "鑽石",
  7: "傳說",
};

const handleWalletInfo = (member) => {
  return [
    {
      showLevel: true,
      img: coinImg,
      title: membershipLevel[member.membershipLevel],
      value_title: "可用金幣",
      value: member.moneyAmount,
      subValue_title: "生涯總儲值",
      subValue: member.totalStoredMoney,
    },
    {
      img: coinWelfareImg,
      title: "御守",
      value_title: "可用數量",
      value: member.welfareAmount,
      subValue_title: "總回饋數量",
      subValue: member.totalFeedback,
    },
    {
      img: ticketPlatformImg,
      title: "平台抽獎券",
      value_title: "可用數量",
      value: member.ticketEverydayAmount,
      subValue_title: "\u00A0", // 使用空格作為佔位符
      subValue: "\u00A0",
    },
    {
      img: ticket2000Img,
      title: "廠商抽獎券",
      value_title: "可用數量",
      value: member.ticketAmount,
      subValue_title: "\u00A0", // 使用空格作為佔位符
      subValue: "\u00A0",
    },
  ];
};

export default function Member() {
  const member = useSelector(() => dataStore.member);
  const [memberDisplayInfos, setMemberDisplayInfos] = useState(null);
  const [walletInfo, setWalletInfo] = useState(null);

  useEffect(() => {
    if (member) {
      const memberDisplayInfos = handleMemberInfo(member);
      setMemberDisplayInfos(memberDisplayInfos);
      const walletInfo = handleWalletInfo(member);
      setWalletInfo(walletInfo);
    }
  }, [member]);

  if (!member) return null;

  return (
    <Content>
      <Container>
        <InfoContainer>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              rowGap: "16px",
            }}
          >
            {walletInfo?.map((item) => (
              <InfoComponent key={item.title} {...item} member={member} />
            ))}
          </div>
        </InfoContainer>
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            修改會員資料
          </div>
          <HeadShotAndStatusMessegeComponent member={member} />
          <div style={{ marginLeft: "-8px" }}>
            <Descriptions
              style={{ paddingLeft: "0px" }}
              title=""
              layout="vertical"
              column={1}
            >
              {memberDisplayInfos?.map((item) => item)}
            </Descriptions>
          </div>
        </div>
        <EditMember member={member} />
        {member.lineUserId == null ? <EditPassword /> : null}
      </Container>
    </Content>
  );
}
