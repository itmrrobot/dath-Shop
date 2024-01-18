import HeaderPannel from "../../HeaderPannel";
import SideBarPannel from "../../SideBarPannel";
import styles from "./PannelLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function PannelLayout({ children }) {
  return (
    <div className={cx("wrap")}>
      <HeaderPannel/>  
      <div className={cx("body")}>
        <SideBarPannel />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default PannelLayout;
