import styles from "./SideBarPannel.module.scss";
import classNames from "classnames/bind";
import messageIcon from "../../assets/img/messageIcon.png";
import peopleIcon from "../../assets/img/people.png";
import boxIcon from "../../assets/img/box.png";
import commandIcon from "../../assets/img/command.png";
import exitIcon from "../../assets/img/ion_exit-outline.png";
import elementIcon from "../../assets/img/element-3.png";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SideBarPannel() {
    return (
        <div className={cx("sidebar")}>
            <div className={cx("list")}>
                <div className={cx("item")}>
                    <Link to="/admin" className={cx("link")}>
                        <img src={commandIcon} alt="" className={cx("icon")}/>
                        <span className={cx("text")}>Admin</span>
                    </Link>
                </div>
                <div className={cx("item")}>
                    <Link to="/admin/dashboard" className={cx("link")}>
                        <img src={elementIcon} alt="" className={cx("icon")}/>
                        <span className={cx("text")}>Dashboard</span>
                    </Link>
                </div>
                <div className={cx("item")}>
                    <Link to="/admin/partner" className={cx("link")}>
                        <img src={peopleIcon} alt="" className={cx("icon")}/>
                        <span className={cx("text")}>Partner</span>
                    </Link>
                </div>
                <div className={cx("item")}>
                    <Link to="/admin/products" className={cx("link")}>
                        <img src={boxIcon} alt="" className={cx("icon")}/>
                        <span className={cx("text")}>Products</span>
                    </Link>
                </div>
                <div className={cx("item")}>
                    <Link to="/" className={cx("link")}>
                        <img src={messageIcon} alt="" className={cx("icon")}/> 
                        <span className={cx("text")}>Message</span>
                    </Link>
                </div>
            </div>
            <div className={cx("btn-signOut")}>
            <img src={exitIcon} alt="" className={cx("icon")}/>
            <span className={cx("text")}>Sign out</span>
            </div>
        </div>
    )
}

export default SideBarPannel;