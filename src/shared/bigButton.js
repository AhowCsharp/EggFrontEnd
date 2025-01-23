const BigButton = ({ children, onClick, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: "#a21a2b",
        color: "#ffffff",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "20px",
        paddingRight: "20px",
        cursor: "pointer",
        ...props,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BigButton;
