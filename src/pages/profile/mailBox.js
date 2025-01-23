import BigButton from "@app/shared/bigButton";
import SmallButton from "@app/shared/smallButton";
import Tab from "@app/shared/tab";
import TextEditor from "@app/shared/TextEditor";
import { dataStore, useSelector } from "@app/store";
import { DEFAULT_PAGINATION } from "@app/utils/constants";
import { renderDate } from "@app/utils/date";
import { Input, Modal, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./mobilePagination";
import { MobileItem, MobileList, Select } from "./tabStyle";

const { Column } = Table;

const MailBox = () => {
  const [isSendMailModalVisible, setIsSendMailModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const member = useSelector(() => dataStore.member);
  const readMailList = useSelector(() => dataStore.readMailList);
  const unreadMailList = useSelector(() => dataStore.unreadMailList);
  const draftMailList = useSelector(() => dataStore.draftMailList);
  const friendList = useSelector(() => dataStore.friendList);
  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
  });
  const [page, setPage] = useState(1);

  const tabList = ["已讀信件", "未讀信件", "寄件備份"];
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dataStore.getReadMailList(req);
    dataStore.getUnreadMailList(req);
    const friendReq = {
      name: "",
      ...DEFAULT_PAGINATION,
      pageSize: 1000,
    };
    dataStore.getFriendList(friendReq);
  }, [req]);

  const data = useMemo(() => {
    return activeTab === 0
      ? readMailList?.data
      : activeTab === 1
        ? unreadMailList?.data
        : draftMailList?.data;
  }, [activeTab, readMailList, unreadMailList, draftMailList]);

  const friendListData = friendList?.data?.map((item) => {
    return {
      value: item.friendId,
      label: `(${item.friendName})`,
    };
  });

  const sendMail = () => {
    const req = {
      account: subject,
      content: content,
      recevierId: selectedFriend,
    };
    dataStore.sendMail(req);
    setIsSendMailModalVisible(false);
    setSubject("");
    setContent("");
    setSelectedFriend();
  };

  return (
    <div style={{ width: "100%" }}>
      <Modal
        width="80vw"
        closeIcon={false}
        visible={isSendMailModalVisible}
        footer={null}
        style={{
          width: "80vw",
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "0px",
          paddingRight: "0px",
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
          撰寫郵件
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              flex: 1,
              paddingTop: "20px",
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
              寄件人
            </div>
            <Input value={member?.nickName} disabled />
          </div>
          <div
            style={{
              flex: 1,
              paddingTop: "20px",
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
              收件人
            </div>
            <Select
              placeholder="請選擇收件人"
              value={selectedFriend}
              onChange={setSelectedFriend}
              style={{ width: "100%" }}
              options={friendListData || []}
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            marginBottom: "20px",
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
            主旨
          </div>
          <Input
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        </div>

        <div>
          <TextEditor value={content} onChange={setContent} />
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
              setIsSendMailModalVisible(false);
            }}
            backgroundColor="#EBE9F1"
            color="#817D8D"
          >
            取消編輯
          </BigButton>
          <div
            style={{
              marginRight: "10px",
              cursor: "pointer",
              width: "104px",
              height: "38px",
              marginLeft: "10px",
              border: "1px solid #A21A2B",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
              儲存草稿
            </div>
          </div>
          <BigButton onClick={sendMail}>傳送郵件</BigButton>
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
          E-mail通知管理
        </div>
        <BigButton
          cursor="pointer"
          onClick={() => {
            setIsSendMailModalVisible(true);
          }}
        >
          撰寫新郵件
        </BigButton>
      </div>

      <Tab
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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
          title="信件主旨"
          dataIndex="account"
          key="account"
          render={(text, record) => {
            return <div>{text}</div>;
          }}
        />
        <Column
          title="寄件人"
          dataIndex="title"
          key="title"
          render={(text, record) => {
            return <div>{text}</div>;
          }}
        />
        <Column
          title="收件人"
          dataIndex=""
          key=""
          render={(text, record) => {
            return <div>{member?.nickName}</div>;
          }}
        />
        <Column
          title="收信日期"
          dataIndex="title"
          key="title"
          render={(text, record) => {
            return <div>{text}</div>;
          }}
        />
        <Column
          title=""
          dataIndex=""
          key=""
          render={(text, record) => {
            return <SmallButton>查看信件</SmallButton>;
          }}
        />
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
                  src={item.avatar}
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
                  {item.name}
                </div>
              </div>
            </div>
            <div className="title" style={{ maxWidth: "20%" }}>
              <span className="label">狀態消息</span> {item.account}
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
                <span className="label">友情時刻</span> {item.account}
              </div>
            )}
            {activeTab === 0 && (
              <div>
                <span className="label">好友生日</span>{" "}
                {renderDate(item.endTime)}
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

export default MailBox;
