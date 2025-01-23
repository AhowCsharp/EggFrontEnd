import { Modal, Input, Table } from "antd";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useSelector, dataStore } from "@app/store";
import friendImg from "@app/static/profile/friend.png";
import addedFriendImg from "@app/static/profile/added-friend.png";
import BigButton from "@app/shared/bigButton";
import Tab from "@app/shared/tab";
import { DEFAULT_PAGINATION } from "@app/utils/constants";
import { Search, MobileItem, MobileList } from "./tabStyle";
import { Button } from "@app/pages/commodity";
import Pagination from "./mobilePagination";
import { renderDate } from "@app/utils/date";
import logo from "@app/static/logo.png";
import birthdayHat from "@app/static/profile/birthday.png";

const { Column } = Table;

const FriendList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friendAccount, setFriendAccount] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [req, setReq] = useState({
    name: "",
    ...DEFAULT_PAGINATION,
  });
  const [page, setPage] = useState(1);

  const friendList = useSelector(() => dataStore.friendList);
  const invitedFriendList = useSelector(() => dataStore.invitedFriendList);
  const sendInviteFriendList = useSelector(
    () => dataStore.sendInviteFriendList
  );

  const tabList = useMemo(() => {
    return [
      "好友名單",
      `待確認（${invitedFriendList?.data?.length || 0}）`,
      "已邀請",
    ];
  }, [invitedFriendList]);

  useEffect(() => {
    dataStore.getFriendList(req);
  }, [req]);

  useEffect(() => {
    const req = {
      name: "",
      ...DEFAULT_PAGINATION,
    };
    setPage(1);
    dataStore.getSendInviteFriendList(req);
    dataStore.getInvitedFriendList(req);
  }, [activeTab]);

  console.log("friendList", friendList);
  console.log("invitedFriendList", invitedFriendList);
  console.log("sendInviteFriendList", sendInviteFriendList);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addFriend = async () => {
    const data = {
      receiveAccount: friendAccount,
    };
    await dataStore.addFriend(data);
    setIsModalVisible(false);
  };

  const data = useMemo(() => {
    return activeTab === 0
      ? friendList?.data || []
      : activeTab === 1
        ? invitedFriendList?.data || []
        : sendInviteFriendList?.data || [];
  }, [friendList, invitedFriendList, sendInviteFriendList, activeTab]);

  const acceptInviteFriend = async (id) => {
    const data = {
      friendShipId: id,
      friendStatus: 1,
    };
    await dataStore.editFriend(data);
    dataStore.getInvitedFriendList(req);
    dataStore.getFriendList(req);
  };

  const rejectInviteFriend = async (id) => {
    const data = {
      friendShipId: id,
      friendStatus: 2,
    };
    await dataStore.editFriend(data);
    dataStore.getInvitedFriendList(req);
  };

  return (
    <div style={{ width: "100%" }}>
      <Modal
        closeIcon={false}
        visible={isModalVisible}
        footer={null}
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "bold",
            color: "#181818",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          加入好友
        </div>
        <div
          style={{
            borderTop: "1px solid #EBE9F1",
            paddingTop: "20px",
            borderBottom: "1px solid #EBE9F1",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              lineHeight: "20px",
              color: "#5D596C",
              marginBottom: "4px",
            }}
          >
            好友帳號
          </div>
          <Input
            placeholder="請輸入好友帳號"
            value={friendAccount}
            onChange={(e) => {
              setFriendAccount(e.target.value);
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "12px",
          }}
        >
          <BigButton
            onClick={handleCancel}
            backgroundColor="#EBE9F1"
            color="#817D8D"
          >
            稍後再說
          </BigButton>
          <BigButton onClick={addFriend}>加入好友</BigButton>
        </div>
      </Modal>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "bold",
            color: "#333333",
          }}
        >
          好友名單
        </div>
        <BigButton
          cursor="pointer"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          加入好友
        </BigButton>
      </div>

      <div
        style={{
          display: "flex",
          padding: "16px",
          backgroundColor: "#F8F7FA",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "50px", marginRight: "4x" }}
            src={friendImg}
            alt="好友"
          />
          <div>
            <div
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#000000",
                marginBottom: "2px",
              }}
            >
              {friendList?.length || 0}
            </div>
            <div
              style={{ fontSize: "14px", lineHeight: "20px", color: "#5D596C" }}
            >
              好友人數
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "50px", marginRight: "4x" }}
            src={addedFriendImg}
            alt="好友"
          />
          <div>
            <div
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#000000",
                marginBottom: "2px",
              }}
            >
              {friendList?.length || 0}
            </div>
            <div
              style={{ fontSize: "14px", lineHeight: "20px", color: "#5D596C" }}
            >
              已推薦人數
            </div>
          </div>
        </div>
      </div>

      <Tab
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 0 && (
        <div style={{ flex: 1 }}>
          <Search
            placeholder="請輸入好友的暱稱或帳號進行搜尋"
            enterButton={<Button>送出</Button>}
            size="small"
            onSearch={(value) => {
              setReq({ ...req, taskName: value });
            }}
            mb20={true}
          />
        </div>
      )}

      <Table
        style={{ maxWidth: "100%", overflow: "hidden" }}
        className="hide-in-mobile"
        dataSource={data}
        pagination={{
          current: page,
          total: data?.totalCount || 0,
          defaultPageSize: DEFAULT_PAGINATION.pageSize,
          showSizeChanger: true,
          onChange: (pageNumber, pageSize) => {
            setPage(pageNumber);
            setReq({ ...req, pageNumber, pageSize });
          },
        }}
      >
        <Column
          title="大頭照"
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
          title="狀態消息"
          dataIndex="statusMessage"
          key="statusMessage"
          render={(text) => {
            return <div>{text || "無狀態消息"}</div>;
          }}
        />
        {activeTab === 0 && (
          <Column
            title="友情時刻"
            dataIndex="processingDate"
            key="processingDate"
            render={(text) => {
              return <div>{renderDate(text)}</div>;
            }}
          />
        )}
        {activeTab === 0 && (
          <Column
            title="好友生日"
            dataIndex="birthday"
            key="birthday"
            render={(text) => {
              return <div>{renderDate(text) || "尚未設定生日"}</div>;
            }}
          />
        )}

        {activeTab === 1 && (
          <Column
            title=""
            dataIndex=""
            key=""
            render={(text, record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      width: "52px",
                      height: "31px",
                      border: "1px solid #A21A2B",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      acceptInviteFriend(record.id);
                    }}
                  >
                    <div
                      style={{
                        color: "#A21A2B",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: "500",
                      }}
                    >
                      接受
                    </div>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      width: "52px",
                      height: "31px",
                      backgroundColor: "#DBDADE",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      rejectInviteFriend(record.id);
                    }}
                  >
                    <div
                      style={{
                        color: "#817D8D",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: "500",
                      }}
                    >
                      拒絕
                    </div>
                  </div>
                </div>
              );
            }}
          />
        )}
      </Table>

      <MobileList>
        {data?.map((item, index) => (
          <MobileItem key={index}>
            <div className="title">
              <span className="label">大頭照</span>{" "}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                  src={item.headShotUrl}
                  alt="大頭照"
                />
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "22px",
                    fontWeight: "500",
                    color: "#6F6B7D",
                  }}
                >
                  {item.nickName}
                </div>
              </div>
            </div>
            <div className="title" style={{ maxWidth: "20%" }}>
              <span className="label">狀態消息</span> {item.statusMessage}
            </div>
            {activeTab === 0 && (
              <div
                style={{
                  wordBreak: "break-all",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span className="label">友情時刻</span> {item.processingDate}
              </div>
            )}
            {activeTab === 0 && (
              <div>
                <span className="label">好友生日</span>{" "}
                {renderDate(item.birthday)}
              </div>
            )}
          </MobileItem>
        ))}
        <Pagination
          onChange={(pageNumber, pageSize) => {
            setPage(pageNumber);
            setReq({ ...req, pageNumber, pageSize });
          }}
          page={page}
          totalCount={data?.totalCount || 0}
          alignCenter={true}
        />
      </MobileList>
    </div>
  );
};

export default FriendList;
