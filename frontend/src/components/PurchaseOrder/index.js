import styles from "./PurchaseOrder.module.scss";
import classNames from "classnames/bind";
import ArrowNext from "../../assets/img/Frame.svg";

const cx = classNames.bind(styles);

function PurchaseOrder() {
    return(
        <div className={cx("wrap-manage","wrap")}>
            <h2 className={cx("title-manage")}>Purchase order</h2>
            <div className={cx("wrap-code")}>
                <span className={cx("code-order")}>Code orders:8224XHDLAD632</span>
                <span>|</span>
                <span className={cx("text")}>The seller has confirmed the order</span>
            </div>
            <div className={cx("process-purchase")}>
                <span className={cx("name")}>Order placed</span>
                <img src={ArrowNext} alt="arrow-next-icon" className={cx("icon")}/>
                <span className={cx("name")}>Confirm information</span>
                <img src={ArrowNext} alt="arrow-next-icon" className={cx("icon")}/>
                <span className={cx("name")}>Transpot</span>
                <img src={ArrowNext} alt="arrow-next-icon" className={cx("icon")}/>
                <span className={cx("name","non-active")}>Delivery</span>
                <img src={ArrowNext} alt="arrow-next-icon" className={cx("icon")}/>
                <span className={cx("name","non-active")}>Evaluate</span>
            </div>
            <div className={cx("box")}>
                <p className={cx("desc")}>The order has been successfully paid and is waiting for the shipping unit to pick up the goods</p>
                <div className={cx("group-btn")}>
                    <button className={cx("btn-common","btn-contact")}>Contact seller</button>
                    <button className={cx("btn-common","btn-cancel")}>Cancel order</button>
                </div>
            </div>
            <div className={cx("wrap-address")}>
                <h4 className={cx("wrap-address__title")}>Delivery address</h4>
                <div className={cx("wrap-address__name")}></div>
                <div className={cx("wrap-address__address")}></div>
                <div className={cx("wrap-address__phone")}></div>
            </div>
        </div>
    )
}

export default PurchaseOrder;