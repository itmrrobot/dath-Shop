import styles from "./ForgotPassword.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ForgotPassword() {
    return (
        <div className={cx("wrap-login")}>
      <div className={cx("wrapper")}>
        <h4 className={cx("logo")}>Luxury</h4>
        <h1 className={cx("title")}>Forgot Password</h1>
        <p className={cx("desc")}>Enter the email address<br/>
associated with your account</p>
        <form className={cx("form")}>
          <div className={cx("form-group")}>
            <input
              type="text"
              className={cx("form-input")}
              placeholder="nguyenngockhanh@gmail.com"
            />
          </div>
          <button className={cx("btn-common")}>Next</button>
          <button className={cx("btn-common","btn-cancel")}>Cancel</button>
        </form>
      </div>
    </div>
    )
}

export default ForgotPassword;