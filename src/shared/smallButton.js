const SmallButton = ({ children, onClick, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: "#a21a2b",
        color: "#ffffff",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingLeft: "12px",
        paddingRight: "12px",
        cursor: "pointer",
        ...props,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SmallButton;
