const RatingBreakdown = () => {
  return (
    <div
      className="product-data5"
      style={{
        display: "flex",
        padding: "20px",
        maxWidth: "100%",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        margin: "10px 6px",
      }}
    >
      {/* LEFT SUMMARY */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "20px",
          paddingRight: "20px",
          borderRight: "1px solid #eee",
          minWidth: "120px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <span
            style={{
              fontSize: "25px",
              fontWeight: 500,
              lineHeight: 1,
              color: "#212121",
            }}
          >
            4.9
          </span>

          <StarIcon style={{ fontSize: "14px", marginLeft: "5px" }} />
        </div>

        <div style={{ textAlign: "center", lineHeight: 1.2, marginTop: "5px" }}>
          <div style={{ fontSize: "1.1em", fontWeight: "bold", color: "#5f6368" }}>
            44,348
          </div>
          <div style={{ fontSize: "0.8em", color: "#5f6368" }}>
            Ratings &amp; Reviews
          </div>
        </div>
      </div>

      {/* RIGHT DISTRIBUTION */}
      <div style={{ flexGrow: 1, width: "100%" }}>
        <RatingRow star={5} width="100%" count="27,987" color="#4caf50" />
        <RatingRow star={4} width="33.537%" count="9,386" color="#4caf50" />
        <RatingRow star={3} width="10.1547%" count="2,842" color="#ffc107" />
        <RatingRow star={2} width="8.30743%" count="2,325" color="#ff9800" />
        <RatingRow star={1} width="6.46014%" count="1,808" color="#f44336" />
      </div>
    </div>
  );
};

const RatingRow = ({ star, width, count, color }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
    <div
      style={{
        fontSize: "0.9em",
        color: "#212121",
        width: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: "5px",
        fontWeight: 600,
      }}
    >
      {star}
      <StarIcon style={{ fontSize: "0.7em", marginLeft: "2px" }} />
    </div>

    <div
      style={{
        flexGrow: 1,
        height: "6px",
        backgroundColor: "#f1f1f1",
        borderRadius: "4px",
        margin: "0 8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width,
          backgroundColor: color,
          borderRadius: "4px",
          transition: "width 0.5s ease-out",
        }}
      />
    </div>

    <div
      style={{
        fontSize: "0.8em",
        color: "#5f6368",
        minWidth: "40px",
        textAlign: "right",
      }}
    >
      {count}
    </div>
  </div>
);

const StarIcon = ({ style }) => (
  <svg
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    style={{ color: "#212121", ...style }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
  </svg>
);

export default RatingBreakdown;
