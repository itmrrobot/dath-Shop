import styles from "./Banner.module.scss";
import classNames from "classnames/bind";
import Rectangle1387 from "../../assets/img/Rectangle1387.png";

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className={cx("banner")}>
            <img src={Rectangle1387} className={cx("img")} alt="Rectangle 1387"/>
        </div>
    )
}

export default Banner;