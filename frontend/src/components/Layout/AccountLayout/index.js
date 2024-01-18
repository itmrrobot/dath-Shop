import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import BrownWhiteAesthetic from "../../../assets/img/Brown White Aesthetic Fashion Musllimah Logo 2.png";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AccountLayout({children}) {
    return (
        <div className={cx('wrap')}>
            {children}
            <div className={cx("picture-login")}>
        <Link to="/">

        <img src={BrownWhiteAesthetic} alt="login" className={cx("img")}/>
        </Link>
      </div>
        </div>
    )
}

export default AccountLayout;