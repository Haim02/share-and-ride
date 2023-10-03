import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./featuredTotal.scss";

const FeaturedTotal = ({ value }) => {
  let rejectRentStats = 0;
  let approveRentStats = 0;
  let pendingRentStats = 0;
  for (let index = 0; index < value.allRentStats.length; index++) {
    if (value.allRentStats[index].status === "reject") {
      rejectRentStats++;
    } else if (value.allRentStats[index].status === "approve") {
      approveRentStats++;
    } else {
      pendingRentStats++;
    }
  }

  return (
    <div className="featuredTotal">
      <div className="top">
        <h1 className="titleTotal">סה"כ ההשכרות</h1>
      </div>
      <div className="bottom">
        <div className="featuredChartTotal">
          <CircularProgressbar
            value={100}
            text={value.allRentStats.length}
            strokeWidth={8}
          />
        </div>
        <div className="summaryTotal">
          <div className="item">
            <div className="itemTitle">נדחו</div>
            <div className="itemResult positive">
              <div className="resultAmount" style={{ color: "red" }}>
                {rejectRentStats}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">ממתינים</div>
            <div className="itemResult positive">
              <div className="resultAmount" style={{ color: "gray" }}>
                {pendingRentStats}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">אושרו</div>
            <div className="itemResult positive">
              <div className="resultAmount">{approveRentStats}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTotal;
