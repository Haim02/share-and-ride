import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import profileImage from "../../assets/images/profileImage.jpg";
import "./navbar.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <img src={profileImage} alt="" className="avatar" />
            {currentUser.name.slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
