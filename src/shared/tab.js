import { Grid } from "antd";

const useBreakpoint = Grid.useBreakpoint;

const Tab = ({ tabList, activeTab, setActiveTab }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint.xs;

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        borderBottom: isMobile ? "1px solid #999999" : "1px solid #DBDADE",
      }}
    >
      {tabList.map((tab, index) => (
        <div
          key={index}
          style={
            isMobile
              ? {
                  flex: 1,
                  textAlign: "center",
                }
              : {}
          }
        >
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "8px 20px",
              fontSize: "15px",
              lineHeight: "23px",
              color:
                activeTab === index
                  ? isMobile
                    ? "#FFFFFF"
                    : "#A21A2B"
                  : isMobile
                    ? "#999999"
                    : "#5D596C",
              cursor: "pointer",
            }}
          >
            {tab}
          </div>
          {activeTab === index && (
            <div
              style={{
                height: "3px",
                backgroundColor: "#A21A2B",
                marginTop: "-3px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tab;
