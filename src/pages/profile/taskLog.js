import { useSelector, dataStore } from "@app/store";
import { useEffect, useState } from "react";
import { Table, Modal, Grid } from "antd";
import { DEFAULT_PAGINATION } from "@app/utils/constants";
import { getDefaultDateRange, formatDate, renderDate } from "@app/utils/date";
import { Button } from "@app/pages/commodity";
import { Content } from "./index";
import {
  Container,
  RangePicker,
  Search,
  MobileItem,
  MobileList,
} from "./tabStyle";
import Pagination from "./mobilePagination";
import Tab from "@app/shared/tab";
import SmallButton from "@app/shared/smallButton";

const { Column } = Table;

export default function TaskLog() {
  const breakpoint = Grid.useBreakpoint();
  const isMobile = breakpoint.xs;
  const taskHistoryLogs = useSelector(() => dataStore.taskHistoryLogs);
  const mineTaskList = useSelector(() => dataStore.mineTaskList);
  const dateRange = getDefaultDateRange();
  const [page, setPage] = useState(DEFAULT_PAGINATION.pageNumber);

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  });

  useEffect(() => {
    dataStore.getTaskHistoryLogs(req);
    dataStore.getMineTaskList(req);
  }, [req]);

  const data = taskHistoryLogs?.data || [];

  const tabList = ["任務回顧", "每日任務", "常駐任務", "限時任務"];
  const [activeTab, setActiveTab] = useState(0);
  const [isShowTaskDetail, setIsShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <Content>
      <Modal
        open={isShowTaskDetail}
        onCancel={() => setIsShowTaskDetail(false)}
        footer={null}
        closeIcon={false}
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "0px",
          paddingRight: "0px",
          borderRadius: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#181818",
              }}
            >
              任務操作說明
            </div>

            <div
              style={{
                color: selectedTask?.isFinish === true ? "#28C76F" : "#EA5455",
                backgroundColor:
                  selectedTask?.isFinish === true ? "#D4F4E2" : "#FBDDDD",
                fontSize: "13px",
                lineHeight: "14px",
                padding: "5px 10px",
                borderRadius: "12px",
                height: "24px",
              }}
            >
              {selectedTask?.isFinish ? "任務已完成" : "尚未完成任務"}
            </div>
          </div>

          <div
            style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#EBE9F1",
              }}
            />
          </div>

          <div
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "500",
              color: "#000000",
              marginBottom: "16px",
            }}
          >
            {selectedTask?.taskName}
          </div>

          {/* block */}
          <div
            style={{
              width: "100%",
              height: "78px",
              backgroundColor: "#F8F7FA",
              borderRadius: "6px",
              display: "flex",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#5D596C",
                }}
              >
                上架時間
              </div>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#000000",
                }}
              >
                {selectedTask?.startTime === null
                  ? "無限制"
                  : renderDate(selectedTask?.startTime)}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#5D596C",
                }}
              >
                任務期間
              </div>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#000000",
                }}
              >
                {selectedTask?.endTime === null
                  ? "無限制"
                  : renderDate(selectedTask?.endTime)}
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
              color: "#000000",
              marginBottom: "10px",
            }}
          >
            獎勵內容
          </div>
          <div
            style={{
              fontSize: "16px",
              lineHeight: "22px",
              color: "#5D596C",
            }}
          >
            {selectedTask?.detailContent}
          </div>

          <div
            style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#EBE9F1",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "120px",
                height: "38px",
                backgroundColor: "#A21A2B",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsShowTaskDetail(false)}
            >
              <div>關閉</div>
            </div>
          </div>
        </div>
      </Modal>
      <Container>
        <Tab
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div style={{ display: isMobile ? "block" : "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
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
                setReq({
                  ...req,
                  start,
                  end,
                });
              }}
              mb20={true}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Search
              placeholder="請輸入任務名稱"
              enterButton={<Button>送出</Button>}
              size="small"
              onSearch={(value) => {
                setReq({ ...req, taskName: value });
              }}
              mb20={true}
            />
          </div>
        </div>
        {/* 每日任務提醒 */}
        {activeTab === 1 && (
          <div
            style={{
              border: "1px solid #FFCE3D",
              padding: "17px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "500",
              color: "#5D596C",
              backgroundColor: "#FFF7E0",
              marginBottom: "20px",
            }}
          >
            🔔 每日任務截止時間為 24:00:00，請勿錯過！
          </div>
        )}

        {renderTable()}
      </Container>
    </Content>
  );
  function renderTable() {
    const data =
      activeTab === 0
        ? taskHistoryLogs?.data || []
        : activeTab === 1
          ? mineTaskList?.data.everyDayTaskRecords || []
          : activeTab === 2
            ? mineTaskList?.data.alwaysTaskRecords || []
            : mineTaskList?.data.limitedTimeTaskRecords || [];
    return (
      <>
        <Table
          style={{ maxWidth: "100%", overflow: "hidden" }}
          className="hide-in-mobile"
          dataSource={data}
          pagination={{
            current: page,
            total: taskHistoryLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            },
          }}
        >
          {activeTab === 0 && (
            <Column title="任務類型" dataIndex="taskType" key="taskType" />
          )}
          <Column
            title="任務名稱"
            dataIndex={activeTab === 0 ? "taskTitle" : "taskName"}
            key={activeTab === 0 ? "taskTitle" : "taskName"}
            render={(text) => {
              return (
                <div style={{ maxWidth: "20%", whiteSpace: "nowrap" }}>
                  {text}
                </div>
              );
            }}
          />
          <Column
            title="獎勵內容"
            dataIndex={activeTab === 0 ? "award" : "detailContent"}
            key={activeTab === 0 ? "award" : "detailContent"}
            render={(text) => {
              return (
                <div
                  style={{
                    display: "grid",
                    placeItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {text}
                  </div>
                </div>
              );
            }}
          />
          {activeTab === 3 && (
            <Column
              title="截止時間"
              key="endTime"
              dataIndex="endTime"
              render={(text) => {
                return (
                  <div style={{ maxWidth: "10%", whiteSpace: "nowrap" }}>
                    {renderDate(text)}
                  </div>
                );
              }}
            />
          )}
          <Column
            title={activeTab === 0 ? "達成時間" : "達成狀態"}
            key={activeTab === 0 ? "completingTime" : "isFinish"}
            dataIndex={activeTab === 0 ? "completingTime" : "isFinish"}
            render={(text, record) => {
              if (activeTab === 0) {
                return (
                  <div style={{ maxWidth: "10%", whiteSpace: "nowrap" }}>
                    {text}
                  </div>
                );
              }
              return (
                <div
                  style={{
                    maxWidth: "10%",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      color: text === true ? "#28C76F" : "#EA5455",
                      backgroundColor: text === true ? "#D4F4E2" : "#FBDDDD",
                      fontSize: "13px",
                      lineHeight: "14px",
                      padding: "5px 10px",
                      borderRadius: "12px",
                      marginRight: "25px",
                      height: "24px",
                    }}
                  >
                    {text === true ? "已完成" : "未完成"}
                  </div>

                  <SmallButton
                    onClick={() => {
                      setIsShowTaskDetail(true);
                      setSelectedTask(record);
                    }}
                  >
                    查看任務
                  </SmallButton>
                </div>
              );
            }}
          />
        </Table>
        <MobileList>
          {data?.map((item, index) => (
            <MobileItem key={index}>
              {activeTab === 0 && (
                <div className="title">
                  <span className="label">任務類型</span> {item.taskType}
                </div>
              )}
              <div className={activeTab === 0 ? "" : "title"}>
                <span className="label">任務名稱</span>{" "}
                {activeTab === 0 ? item.taskTitle : item.taskName}
              </div>
              <div
                style={{
                  wordBreak: "break-all",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span className="label">獎勵內容</span>{" "}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    maxWidth: "80%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeTab === 0 ? item.award : item.detailContent}
                </div>
              </div>
              {activeTab === 3 && (
                <div>
                  <span className="label">截止時間</span>{" "}
                  {renderDate(item.endTime)}
                </div>
              )}
              <div>
                <span className="label">
                  {activeTab === 0 ? "達成時間" : "達成狀態"}
                </span>{" "}
                {activeTab === 0 ? (
                  renderDate(item.completingTime)
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div
                      style={{
                        color: item.isFinish === true ? "#28C76F" : "#EA5455",
                        backgroundColor:
                          item.isFinish === true ? "#D4F4E2" : "#FBDDDD",
                        fontSize: "13px",
                        lineHeight: "14px",
                        padding: "5px 10px",
                        borderRadius: "12px",
                        height: "24px",
                      }}
                    >
                      {item.isFinish === true ? "已完成" : "未完成"}
                    </div>
                  </div>
                )}
              </div>

              {activeTab !== 0 && (
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div style={{ width: "80px" }}>
                    <SmallButton
                      onClick={() => {
                        setIsShowTaskDetail(true);
                        setSelectedTask(item);
                      }}
                    >
                      查看任務
                    </SmallButton>
                  </div>
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
            totalCount={taskHistoryLogs?.totalCount || 0}
            alignCenter={true}
          />
        </MobileList>
      </>
    );
  }
}
