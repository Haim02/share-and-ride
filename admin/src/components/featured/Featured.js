import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "react-circular-progressbar/dist/styles.css";
import "./featured.scss";

const Featured = ({ value }) => {
  let target = 50;
  let percent = (value.todayRentStats.length / 100) * target;
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">סה"כ ההזמנות</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={value?.todayRentStats.length}
            text={`${percent}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">כל ההזמנות שבוצעו היום</p>
        <p className="amount">{value.todayRentStats.length}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">יעד</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">{target}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">נדחו</div>
            <div className="itemResult positive">
              <div className="resultAmount" style={{ color: "red" }}>
                {value?.todayRejectRentStats.length}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">אושרו</div>
            <div className="itemResult positive">
              <div className="resultAmount">
                {value?.todayApproveRentStats.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
