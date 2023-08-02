import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useLogoutMutation } from "../../redux/apiCalls/auth";
import { authAction } from "../../redux/slice/auth";
import { homeStateAction } from "../../redux/slice/home";
import { productAction } from "../../redux/slice/product";
import { userAction } from "../../redux/slice/user";
import { resetStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authAction.logoutSuccess());
      dispatch(homeStateAction.clearState());
      dispatch(productAction.clearState());
      dispatch(userAction.clearState());
      await resetStore()
    } catch (error) {
      dispatch(authAction.logoutFailure(error.message));
    }
    navigate("/");
    if (!currentUser) {
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Share&Ride</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">ראשי</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>ראשי</span>
            </li>
          </Link>
          <p className="title">מידע</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>משתמשים</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>מוצרים</span>
            </li>
          </Link>
          <p className="title">הודעות</p>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>התראות</span>
          </li>
          <p className="title">משתמש</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>התנתק</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
