// Member.js
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

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0.5rem 0;
`;

const Warning = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 0.9em;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const Info = styled.div`
  margin: 10px;
  padding: 20px;
  background-color: white;
  border: 1px solid #999999;
  border-radius: 8px;
  font-size: 0.85em;
  font-weight: bold;
  color: #333;
  text-align: center;
  div {
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.8em;
  }
`;

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
  city: "縣市",
  districtNo: "郵遞區號",
  districtName: "行政區",
  address: "詳細地址",
  referralCode: "推薦碼",
  referralCodeUrl: "推薦連結",
};

// 處理會員資訊的函數
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
            {key === "account" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                {member.isBindLineOa ? (
                  // 當 isBindLineOa 為 true 時顯示綁定成功的圖標和文字
                  <>
                    <img
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "6px",
                        marginLeft: "8px",
                      }}
                      src={checkBrokenImg}
                      alt="checkBrokenImg"
                    />
                    <BindSuccessText>已綁定Line</BindSuccessText>
                  </>
                ) : (
                  // 當 isBindLineOa 為 false 時顯示紅色的 X Emoji 和紅色文字
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "18px",
                          color: "red",
                          marginRight: "6px",
                          marginLeft: "8px",
                          display: "flex",
                          alignItems: "center",
                          height: "24px", // 確保與文字高度一致
                        }}
                      >
                        ❌
                      </span>
                      <span style={{ color: "red", lineHeight: "24px" }}>
                        未綁定Line
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </Descriptions.Item>
        );
    })
    .filter(Boolean);
}

const CenteredTitle = styled.div`
  text-align: center; /* 置中對齊 */
  font-size: 24px; /* 字體大小，可根據需求調整 */
  font-weight: bold; /* 字體加粗 */
  margin: 10px 0;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    color: white;
    font-size: 18px;
    margin: 0;
  }
`;

// 保持原有的 Container，不修改
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// 保持原有的 InfoContainer，不修改
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

// 保持原有的 InfoComponent 和其內部結構
const InfoComponent = ({
  img,
  title,
  value_title,
  value,
  subValue_title,
  subValue,
  subValue_remain,
  subRemainValue,
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
          <div
            style={{
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: "700",
            }}
          >
            {title}
          </div>
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
        <div
          style={{
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "500",
          }}
        >
          {value_title} {value}
        </div>
        {subValue_title && (
          <div
            style={{
              display: "flex",
              marginTop: "4px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "400",
              color: "#999999",
            }}
          >
            <div>{subValue_title}&nbsp;</div>
            <div style={{ fontWeight: "600" }}>{subValue}</div>
          </div>
        )}
        {subValue_remain && (
          <div
            style={{
              display: "flex",
              marginTop: "4px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "400",
              color: "#999999",
            }}
          >
            <div>{subValue_remain}&nbsp;</div>
            <div style={{ fontWeight: "600" }}>{subRemainValue}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// 新增的 Styled Components
const ABContainer = styled.div`
  display: flex;
  flex-direction: column; /* 默認為垂直排列，手機版 */
  align-items: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: column; /* 桌面版水平排列 */
    align-items: center; /* 讓子項目在桌面版時延伸相同高度 */
    justify-content: space-between;
  }
`;

const ASection = styled.div`
  flex: 1;
  order: 2; /* 手機版時，A 區塊在後 */
  margin-top: 10px; /* 與 B 區塊間距 */

  @media (min-width: 768px) {
    order: 2; /* 桌面版時，A 區塊在左 */
  }
`;

const BSection = styled(Info)`
  display: none; /* 手機版隱藏 */

  flex: 1;
  width: calc(100% - 20px);

  @media (min-width: 768px) {
    display: block; /* 桌面版顯示 */
    order: 1; /* 桌面版時，B 區塊在右 */
    height: 60%;
  }
`;

const AContentContainer = styled.div`
  text-align: center;
  @media (min-width: 768px) {
    display: flex;
    gap: 32px;
  }
`;

const DescriptionsContainer = styled.div`
  margin-left: -8px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto; /* 水平居中 */

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 6px;
`;

// HeadShotAndStatusMessegeComponent 定義保持不變
const HeadShotAndStatusMessegeComponent = ({ member }) => {
  const headShotFile = useRef(null);
  const [uploadHeadShotSuccess, setUploadHeadShotSuccess] = useState(false);
  const [isUploadingHeadShot, setIsUploadingHeadShot] = useState(false);
  const [statusMessage, setStatusMessage] = useState(member.statusMessage);
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleUploadHeadShot = async () => {
    console.log("headShotFile.current.files[0]", headShotFile.current.files[0]);

    setUploadHeadShotSuccess(true);

    const file = headShotFile.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
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
          style={{
            cursor: "pointer",
            width: "200px",
            height: "200px",
            margin: "0 auto",
          }}
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
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
              }}
            >
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
          justifyContent: "center",
        }}
      >
        {member.lineUserId === null ? (
          <Input
            placeholder="尚未填寫"
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            style={{ maxWidth: "300px" }}
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
                whiteSpace: "nowrap",
              }}
              onClick={handleSave}
            >
              儲存
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
      value_title: "目前金幣",
      value: member.moneyAmount,
      subValue_title: "生涯總儲值",
      subValue: member.totalStoredMoney,
      subValue_remain: "距離升級",
      subRemainValue: member.remainHowMuch,
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

// 主組件
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
        {/* 保持最上面四個圖片的區域不變 */}
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
        <ABContainer>
          <BSection>
            <Title>新手村公告</Title>
            <br />
            <div>金幣與御守等值。</div>
            <div>金幣可藉由儲值獲得。</div>
            <div>抽獎券可以用於福袋專區，請找尋對應廠商出品之福袋。</div>
            <div>
              御守可透過完成任務、每日簽到、抽獎回饋、提升會員等級、分享推薦連結給朋友獲得。
            </div>
            <div>
              抽獎券、免運券可就由當月消費滿額贈送，詳情請點擊廠商資訊查看門檻。
            </div>
            <div>
              每次抽獎都有一定機率獲得寶箱或鑰匙，單抽價格愈高獲得的寶箱、鑰匙等級也愈高。
            </div>
            <Warning>
              不同廠商抽獎券、免運券不得混合使用，平台抽獎券用於 剩蛋快樂
              出品之福袋。
            </Warning>
          </BSection>
          <ASection>
            <CenteredTitle>會員資料</CenteredTitle>

            <AContentContainer>
              <HeadShotAndStatusMessegeComponent member={member} />
              <DescriptionsContainer>
                <Descriptions
                  style={{ paddingLeft: "0px" }}
                  title=""
                  layout="vertical"
                  column={1}
                >
                  {memberDisplayInfos?.map((item) => item)}
                </Descriptions>
              </DescriptionsContainer>
            </AContentContainer>
          </ASection>
        </ABContainer>
        {/* 其他編輯組件 */}
        <EditMember member={member} />
        {member.lineUserId == null ? <EditPassword /> : null}
      </Container>
    </Content>
  );
}
