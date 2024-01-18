import styles from "./HeaderPannel.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import notifyIcon from "../../assets/img/Notification.png";
import arrowDownIcon from "../../assets/img/Arrow - Down 2.png";
import userImage from "../../assets/img/image 11.png";
import DropdownAccount from "../DropdownAccount";

const cx = classNames.bind(styles);

function HeaderPannel() {
  return (
    <nav className={cx("navbar")}>
      <div className={cx("container")}>
        <a className={cx("navbar-brand")} href="/">
          Luxury’s Closet
        </a>
        <div className={cx("search")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M7.83333 13.1667C10.7789 13.1667 13.1667 10.7789 13.1667 7.83333C13.1667 4.88781 10.7789 2.5 7.83333 2.5C4.88781 2.5 2.5 4.88781 2.5 7.83333C2.5 10.7789 4.88781 13.1667 7.83333 13.1667Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 14.5L11.6 11.6"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            className={cx("input")}
            placeholder="Search here"
          />
        </div>
        <div className={cx("wrap")}>
            <div className={cx("notify")}>
                <img src={notifyIcon} alt="" className={cx("notify-icon")}/>
            </div>
            <DropdownAccount/>
        </div>
      </div>
    </nav>
  );
}

export default HeaderPannel;
