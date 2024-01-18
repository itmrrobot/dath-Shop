import { Link } from "react-router-dom";
import styles from "./ModalMessage.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

function ModalMessage({...props}) {
  const {setIsSuccess,msg} = props;
  const handleCliclkModal = (e) => {
    e.stopPropagation();
    setIsSuccess(false);
  }

  return (
    <div className={cx("modal-wrap")}>
      <div className={cx("modal")} onClick={handleCliclkModal}></div>
      <div className={cx("modal-content")}>
        <h3 className={cx("title")}>{msg} successfully</h3>
        {msg==="Registed"&&<p className={cx("desc")}>Please log in to shop</p>}
        {msg==="Registed"&&<Link to="/login" className={cx("btn-login")}>Login here</Link>}
      </div>
    </div>
  );
}

export default ModalMessage;
