import styles from "./PartnerManage.module.scss";
import classNames from "classnames/bind";
import addIcon from "../../assets/img/Add Circle.png";
import bankIcon from "../../assets/img/Buildings 3.png";
import settingIcon from "../../assets/img/Settings Minimalistic.png";
import deleteIcon from "../../assets/img/Trash Bin Trash.png";

const cx = classNames.bind(styles);

function PartnerManage() {
    return (
        <div className={cx("wrap-manage","g-0")}>
            <h2 className={cx("title-manage")}>Partner</h2>
            <div className={cx("wrap")}>
                <div className={cx("wrap-item")}>
                    <span className={cx("name")}>Total Earnings</span>
                    <span className={cx("price","success")}>$430.00</span>
                    <span className={cx("date")}>as of 01-December 2023</span>
                </div>
                <div className={cx("wrap-item")}>
                    <span className={cx("name")}>Pending Payments</span>
                    <span className={cx("price","p-color")}>$100.00</span>
                    <span className={cx("date")}>as of 01-December 2023</span>
                </div>
                <div className={cx("wrap-item","g-14")}>
                    <div className={cx("item")}>
                        <span className={cx("name")}>Withdrawal Method</span>
                        <button className={cx("btn-account")}><img src={addIcon} alt=""/></button>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("bank-account")}>
                            <img src={bankIcon} alt="" className={cx("icon")}/>
                            <span className={cx("number")}>1502********4832</span>
                        </div>
                        <div className={cx("group-btn")}>
                            <button className={cx("btn-account")}><img src={settingIcon} alt=""/></button>
                            <button className={cx("btn-account")}><img src={deleteIcon} alt=""/></button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className={cx("sub-title")}>Payment History</h3>
            <div className={cx("filter-wrap")}>
                <div className={cx("filter-item")}>All</div>
                <div className={cx("filter-item")}>Complete</div>
                <div className={cx("filter-item")}>Pending</div>
                <div className={cx("filter-item")}>Reject</div>
            </div>
            <div className={cx("table-wrap")}>

      <div className={cx("table")}>
          <div className={cx("table-head")}>
            <span className={cx("table-cell")}>OrderId</span>
            <span className={cx("table-cell")}>Date</span>
            <span className={cx("table-cell")}>Ammout</span>
            <span className={cx("table-cell")}>Total Questions</span>
            <span className={cx("table-cell")}>Status</span>
          </div>
        <div className={cx("table-body")}>
          <div className={cx("table-row")}>
            <span className={cx("table-cell")}>#15267</span>
            <span className={cx("table-cell")}>Mar 1, 2023</span>
            <span className={cx("table-cell")}>100</span>
            <span className={cx("table-cell")}>1</span>
            <span className={cx("table-cell","success")}>Success</span>
          </div>
          <div className={cx("table-row")}>
            <span className={cx("table-cell")}>#15267</span>
            <span className={cx("table-cell")}>Mar 1, 2023</span>
            <span className={cx("table-cell")}>100</span>
            <span className={cx("table-cell")}>1</span>
            <span className={cx("table-cell","success")}>Success</span>
          </div>
          <div className={cx("table-row")}>
            <span className={cx("table-cell")}>#15267</span>
            <span className={cx("table-cell")}>Mar 1, 2023</span>
            <span className={cx("table-cell")}>100</span>
            <span className={cx("table-cell")}>1</span>
            <span className={cx("table-cell","reject")}>Reject</span>
          </div>
          <div className={cx("table-row")}>
            <span className={cx("table-cell")}>#15267</span>
            <span className={cx("table-cell")}>Mar 1, 2023</span>
            <span className={cx("table-cell")}>100</span>
            <span className={cx("table-cell")}>1</span>
            <span className={cx("table-cell","pending")}>Pending</span>
          </div>
        </div>
      </div>
      <div className={cx("pagination-wrap")}>
        
      </div>
      </div>
        </div>
    )
}

export default PartnerManage;