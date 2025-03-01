import { useSelector, dataStore } from "@app/store";
import { useEffect, useState } from "react";
import {
  Table,
  InputNumber,
  Checkbox,
  Select,
  Input,
  Modal,
  Radio,
} from "antd";
import styled from "styled-components";
import { Button as BaseButton } from "@app/pages/commodity";
import { getDefaultDateRange, formatDate } from "@app/utils/date";
import Tag from "@app/shared/tag";
import { Content } from "./index";
import {
  Container,
  RangePicker,
  ButtonContainer,
  MobileItem,
  MobileList,
  Search,
} from "./tabStyle";
import ShipDialog from "./shipDialog";
import Tab from "@app/shared/tab";
import BigButton from "@app/shared/bigButton";
import { Grid } from "antd";
import logo from "@app/static/logo.png";
import { DEFAULT_PAGINATION } from "@app/utils/constants";
import { formatDateToYmd } from "@app/utils/date";

const { Column } = Table;

const ImgContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

const Img = styled.img.attrs((p) => ({ src: p.src }))`
  height: 80px;
  width: auto;
  @media (max-width: 768px) {
    width: 50%;
    max-width: 300px;
    height: auto;
  }
`;

const disableStyle = `
  cursor: not-allowed;
  opacity: 0.5;
`;

export const Button = styled(BaseButton)`
  font-size: 0.8rem;
  text-align: center;
  ${(p) => p.disable && disableStyle}
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const MobileButton = styled(Button)`
  font-size: 0.8rem;
  text-align: center;
  ${(p) => p.disable && disableStyle}
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 76px;
    width: 76px;
    height: 38px;
  }
`;
const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  .ant-input-number {
    width: 60px;
    margin-right: 5px;
  }
  .ant-input-number-input-wrap,
  .ant-input-number-input {
    height: 100% !important;
  }
  ${Button} {
    padding: 0.5rem;
  }
  ${Button} + ${Button} {
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: end;
    flex-direction: row;
    align-items: end;
    margin-right: -10px;
  }
`;

const Warning = styled.div`
  color: red;
`;

const Info = styled.div`
  margin: 10px;
  div {
    line-height: 1.5;
  }
`;

function formatShipDict(data) {
  return data.reduce((acc, cur) => {
    const { prizeId, prizeName, commodityName } = cur;
    acc[prizeId] = { amount: cur.totalAmount, prizeName, commodityName };
    return acc;
  }, {});
}

export default function PendingPrizes() {
  const breakpoint = Grid.useBreakpoint();
  const isMobile = breakpoint.xs;
  const pendingPrize = useSelector(() => dataStore.pendingPrize);
  const friendList = useSelector(() => dataStore.friendList);

  const dateRange = getDefaultDateRange();
  const [isReclaiming, setIsReclaiming] = useState(false);
  const [shipDict, setShipDict] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [shipInfo, setShipInfo] = useState();
  const [listReq, setListReq] = useState({
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  });

  const [friendReq, setFriendReq] = useState({
    name: "",
    ...DEFAULT_PAGINATION,
  });
  const [itemCount, setItemCount] = useState(1);
  const tabList = ["抽獎結果", "我的禮物"];
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenGiftModal, setIsOpenGiftModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState({});
  const [selectedFriend, setSelectedFriend] = useState("");
  const [selectedGiftAmount, setSelectedGiftAmount] = useState(1);

  useEffect(() => {
    if (!pendingPrize) return;
    const dict = formatShipDict(pendingPrize.data);
    setShipDict(dict);
  }, [pendingPrize]);

  useEffect(() => {
    dataStore.getPendingPrize(listReq);
  }, [listReq, isOpenGiftModal]);

  useEffect(() => {
    dataStore.getFriendList(friendReq);
  }, [friendReq]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (ids) => {
      setSelectedRowKeys(ids);
    },
  };

  const onSendGift = () => {
    if (!selectedFriend) {
      dataStore.setAlertMessage("請選擇贈禮對象");
      return;
    }
    const req = {
      // giftInfo: {
      //   [selectedGift.prizeId]: {
      //     amount: selectedGiftAmount,
      //     prizeName: selectedGift.prizeName,
      //     commodityName: selectedGift.commodityName,
      //   },
      // },
      giftInfo: {
        [selectedGift.prizeId]: selectedGiftAmount,
      },
      friendId: selectedFriend,
    };

    dataStore.sendGift(req);
    setIsOpenGiftModal(false);
  };

  const data = pendingPrize?.data || [];
  return (
    <div
      style={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Modal
        closeIcon={false}
        visible={isOpenGiftModal}
        footer={null}
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
        onCancel={() => {
          setIsOpenGiftModal(false);
          setSelectedGift({});
          setSelectedGiftAmount(1);
        }}
      >
        <div
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: "bold",
            color: "#000000",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          贈送禮物給好友
        </div>

        <div
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            borderTop: "1px solid #EBE9F1",
            borderBottom: "1px solid #EBE9F1",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              lineHeight: "21px",
              color: "#000000",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            填寫送禮數量
          </div>
          <Input
            style={{
              height: "41px",
            }}
            type="number"
            min={1}
            max={selectedGift.totalAmount}
            defaultValue={1}
            onChange={(e) => {
              setSelectedGiftAmount(e.target.value);
            }}
            size="small"
          />
        </div>

        <div>
          <div
            style={{
              marginTop: "16px",
              fontSize: "15px",
              lineHeight: "21px",
              color: "#000000",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            選擇贈禮對象
          </div>

          <Search
            placeholder="請輸入好友暱稱"
            enterButton={<Button>送出</Button>}
            size="small"
            onSearch={(value) => {
              setFriendReq({ ...friendReq, name: value });
            }}
            mb20={true}
          />

          <Table
            style={{ maxWidth: "100%", overflow: "hidden" }}
            // className="hide-in-mobile"
            dataSource={friendList?.data || []}
            pagination={{
              current: friendReq.page,
              total: friendList?.totalCount || 0,
              defaultPageSize: friendReq.pageSize,
              showSizeChanger: true,
              onChange: (pageNumber, pageSize) => {
                setFriendReq({ ...friendReq, page: pageNumber, pageSize });
              },
            }}
          >
            <Column
              title=""
              dataIndex=""
              key=""
              render={(text, record) => {
                return (
                  <Radio
                    value={record.friendId}
                    onChange={(e) => {
                      setSelectedFriend(e.target.value);
                    }}
                  />
                );
              }}
            />
            <Column
              title="好友暱稱"
              dataIndex={["name", "headShotUrl"]}
              key="name"
              render={(text, record) => {
                return (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ position: "relative" }}>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          marginRight: "10px",
                          zIndex: 10,
                          position: "relative",
                        }}
                        src={record.headShotUrl || logo}
                        alt="大頭照"
                      />
                      {record.isBirthday && (
                        <img
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "8px",
                            zIndex: 1,
                          }}
                          src={birthdayHat}
                          alt="生日帽"
                        />
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        lineHeight: "22px",
                        fontWeight: "500",
                        color: "#6F6B7D",
                      }}
                    >
                      {record.friendName}
                    </div>
                  </div>
                );
              }}
            />
            <Column
              title="好友生日"
              dataIndex="birthday"
              key="birthday"
              render={(text) => {
                return <div>{formatDateToYmd(text) || "尚未設定生日"}</div>;
              }}
            />
          </Table>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            gap: "12px",
          }}
        >
          <BigButton
            onClick={() => {
              setIsOpenGiftModal(false);
              setSelectedGift({});
              setSelectedGiftAmount(1);
            }}
            backgroundColor="#EBE9F1"
            color="#817D8D"
          >
            稍後再說
          </BigButton>

          <BigButton onClick={onSendGift}>送給好友</BigButton>
        </div>
      </Modal>
      <Tab
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Content>
        {shipInfo && (
          <ShipDialog
            onClose={() => {
              setShipInfo(null);
              setSelectedRowKeys([]);
            }}
            onSubmit={dataStore.ship}
            shipInfoData={shipInfo}
          />
        )}
        <Container tableMinWidth={700}>
          <Info>
            <div>單筆訂單尺寸 45 （含）以內🉑使用711店到店。</div>
            <div>超過125（含）只能選擇宅配。</div>
            <div>運費價格取單筆訂單最高的賞品運費價格去做計算。</div>
            <div> 例： 單筆訂單 有2個A賞+1個B賞：</div>
            <div>
              A賞運費價格150，B賞運費價格120，此筆訂單運費則挑150最高價格最為此單運費。
            </div>
            <Warning>
              不同廠商的賞品不得合併出貨，若未處理獎品超過30天，則廠商會自動回收該獎品!!
            </Warning>
          </Info>
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            defaultValue={dateRange}
            onOk={(value) => {
              const start = formatDate(value[0]);
              const end = formatDate(value[1]);
              if (start === "Invalid Date" || end === "Invalid Date") return;
              setListReq({
                ...listReq,
                start,
                end,
              });
            }}
          />
          <ButtonContainer>
            <Button disable={!selectedRowKeys.length} onClick={onShip}>
              配送
            </Button>
          </ButtonContainer>
          {renderTable()}
        </Container>
      </Content>
    </div>
  );
  function renderManufacturer({ manufacturerName, manufacturerId: id }) {
    return <Tag name={manufacturerName} id={id} isSmall={true} />;
  }
  function renderImg(src) {
    return (
      <ImgContainer>
        <Img src={src} />
      </ImgContainer>
    );
  }
  function renderAction(data) {
    if (selectedRowKeys.includes(data.prizeId))
      return (
        <InputNumber
          min={1}
          max={data.totalAmount}
          defaultValue={data.totalAmount}
          onChange={onSelectedItemAmountChange(data.prizeId)}
          size="small"
        />
      );
    if (isReclaiming && isReclaiming === data.prizeId)
      return (
        <ActionContainer>
          <InputNumber
            min={1}
            max={data.totalAmount}
            defaultValue={1}
            onChange={setItemCount}
            size="small"
          />
          <Button onClick={onReclaim}>確定</Button>
          <Button
            onClick={() => {
              setIsReclaiming(false);
              setItemCount(1);
            }}
          >
            取消
          </Button>
        </ActionContainer>
      );
    return (
      <ActionContainer>
        <MobileButton onClick={() => setIsReclaiming(data.prizeId)}>
          回收
        </MobileButton>
        {activeTab === 0 && (
          <div
            onClick={() => {
              setSelectedGift(data);
              setIsOpenGiftModal(true);
            }}
            style={{
              marginRight: "10px",
              cursor: "pointer",
              width: isMobile ? "76px" : "43px",
              height: "38px",
              marginLeft: "10px",
              border: "1px solid #A21A2B",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                color: "#A21A2B",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "500",
                marginTop: "1px",
              }}
            >
              贈禮
            </div>
          </div>
        )}
      </ActionContainer>
    );
    function onReclaim() {
      const req = {
        amount: itemCount,
        prizeId: isReclaiming,
      };
      dataStore.reclaim(req);
      setIsReclaiming(false);
      setItemCount(1);
    }
  }
  function onSelectedItemAmountChange(prizeId) {
    return (value) => {
      setShipDict({
        ...shipDict,
        [prizeId]: { ...shipDict[prizeId], amount: value },
      });
    };
  }
  function onShip() {
    if (!selectedRowKeys.length) return;
    const infos = Object.keys(shipDict).reduce((acc, key) => {
      if (selectedRowKeys.includes(+key)) {
        acc[key] = shipDict[key];
      }
      return acc;
    }, {});
    setShipInfo(infos);
  }
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
          rowSelection={!isReclaiming && rowSelection}
          rowKey="prizeId"
          dataSource={data}
          pagination={false}
        >
          <Column
            dataIndex="prizeImgUrl"
            key="prizeImgUrl"
            render={renderImg}
          />

          <Column
            title="獎品"
            dataIndex="prizeName"
            key="prizeName"
            width={100}
          />
          <Column
            title="廠商"
            key="manufacturerName"
            render={renderManufacturer}
          />
          {activeTab === 1 && (
            <Column title="贈禮好友" dataIndex="giftFriend" key="giftFriend" />
          )}
          <Column
            title="總花費"
            dataIndex="totalCostMoney"
            key="totalCostMoney"
          />
          <Column title="運費價格" dataIndex="shippingFee" key="shippingFee" />
          <Column
            title="兌換代幣"
            dataIndex="reclaimPrize"
            key="reclaimPrize"
          />
          <Column title="擁有數量" dataIndex="totalAmount" key="totalAmount" />
          <Column title="商品尺寸" key="size" dataIndex="size" />
          <Column title="狀態" dataIndex="status" key="status" />
          <Column
            title="需運送或回收數量"
            key="action"
            render={renderAction}
            width={220}
          />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title vertical">
                <Checkbox
                  className="dark-in-mobile"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRowKeys([...selectedRowKeys, item.prizeId]);
                    } else {
                      setSelectedRowKeys(
                        selectedRowKeys.filter((key) => key !== item.prizeId)
                      );
                    }
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="label">商品圖</span>
                {renderImg(item.prizeImgUrl)}
              </div>
              <div>
                <span className="label">獎品</span> {item.prizeName}
              </div>

              <div>
                <span className="label">廠商</span>
                {renderManufacturer(item)}
              </div>
              {activeTab === 1 && (
                <div>
                  <span className="label">贈禮好友</span> {item.giftFriend}
                </div>
              )}
              <div>
                <span className="label">總花費</span> {item.totalCostMoney}
              </div>
              <div>
                <span className="label">運費價格</span> {item.shippingFee}
              </div>
              <div>
                <span className="label">兌換代幣</span> {item.reclaimPrize}
              </div>
              <div>
                <span className="label">數量</span> {item.totalAmount}
              </div>
              <div>
                <span className="label">商品尺寸</span> {item.size}
              </div>
              <div>
                <span className="label">狀態</span> {item.status}
              </div>
              <div>
                <div>
                  {selectedRowKeys.includes(item.prizeId) ? "配送數量" : ""}
                </div>
                {renderAction(item)}
              </div>
            </MobileItem>
          ))}
        </MobileList>
      </>
    );
  }
}
