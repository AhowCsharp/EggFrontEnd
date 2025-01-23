const Tab = ({ tabList, activeTab, setActiveTab }) => {
  return (
    <div style={{ display: "flex", marginBottom: "20px", borderBottom: "1px solid #DBDADE" }}>
      {tabList.map((tab, index) => (
        <div key={index}>
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "8px 20px",
              fontSize: "15px",
              lineHeight: "23px",
              color: activeTab === index ? "#A21A2B" : "#5D596C",
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
