import Banner from "../../components/Banner";
import CategoryProducts from "../../components/CategoryProducts";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Rectangle1390 from "../../assets/img/Rectangle1390.png";
import PopularProducts from "../../components/PopularProducts";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("wrap")}>
            <Banner/>
            <CategoryProducts/>
            <div className={cx("banner")}>
                <img src={Rectangle1390} alt="Rectangle 1390" className={cx("img")}/>
            </div>
            <PopularProducts/>
        </div>
    )
}

export default Home;