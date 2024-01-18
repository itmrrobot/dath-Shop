import Footer from "../../Footer";
import Header from "../../Header";
import styles from "./Default.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return (
        <div className={cx("wrap")}>
            <Header/>
            <>
                {children}
            </>
            <Footer/>
        </div>
    )
}

export default DefaultLayout;