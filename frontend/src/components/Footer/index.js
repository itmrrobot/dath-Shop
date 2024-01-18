import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import AppStore from "../../assets/img/AppStore.png";
import GoogelPlay from "../../assets/img/GooglePlay.png";
import youtube from "../../assets/img/youtube.png";
import facebook from "../../assets/img/facebook.png";
import twitter from "../../assets/img/twitter.png";
import instagram from "../../assets/img/instagram.png";
import linkedin from "../../assets/img/linkedin.png";

const cx = classNames.bind(styles);

function Footer() {
    return(
        <div className={cx("footer")}>
            <div className={cx("footer-head")}>
                <div className={cx("logo-container")}>
                    Logo
                </div>
                <div className={cx("form")}>
                    <div className={cx("field")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
                            <path d="M5.598 7.5L11.345 12.62C11.5281 12.7831 11.7648 12.8732 12.01 12.8732C12.2552 12.8732 12.4919 12.7831 12.675 12.62L18.423 7.5H5.598ZM20 8.773L14.006 14.114C13.4565 14.6037 12.7461 14.8744 12.01 14.8744C11.2739 14.8744 10.5635 14.6037 10.014 14.114L4 8.754V17.5H20V8.773ZM4 5.5H20C20.5304 5.5 21.0391 5.71071 21.4142 6.08579C21.7893 6.46086 22 6.96957 22 7.5V17.5C22 18.0304 21.7893 18.5391 21.4142 18.9142C21.0391 19.2893 20.5304 19.5 20 19.5H4C3.46957 19.5 2.96086 19.2893 2.58579 18.9142C2.21071 18.5391 2 18.0304 2 17.5V7.5C2 6.96957 2.21071 6.46086 2.58579 6.08579C2.96086 5.71071 3.46957 5.5 4 5.5V5.5Z" fill="#697077"/>
                        </svg>
                        <input type="text" className={cx("input")} placeholder="Enter your email to get the latest news..."/>
                    </div>
                    <button className={cx("btn-subcribe")}>Subcribe</button>
                </div>
            </div>
            <div className={cx("footer-body")}>
                <div className={cx("nav")}>
                    <h5 className={cx("section")}>Column One</h5>
                    <div className={cx("nav-item")}>Twenty One</div>
                    <div className={cx("nav-item")}>Sixty Five</div>
                    <div className={cx("nav-item")}>Twenty One</div>
                    <div className={cx("nav-item")}>Twenty One</div>
                </div>
                <div className={cx("nav")}>
                    <h5 className={cx("section")}>Column Two</h5>
                    <div className={cx("nav-item")}>Sixty Five</div>
                    <div className={cx("nav-item")}>Sixty Five</div>
                    <div className={cx("nav-item")}>Sixty Five</div>
                    <div className={cx("nav-item")}>One Two</div>
                </div>
                <div className={cx("nav")}>
                    <h5 className={cx("section")}>Column Three</h5>
                    <div className={cx("nav-item")}>One Two</div>
                    <div className={cx("nav-item")}>One Two</div>
                    <div className={cx("nav-item")}>One Two</div>
                    <div className={cx("nav-item")}>One Two</div>
                </div>
                <div className={cx("nav")}>
                    <h5 className={cx("section")}>Column Four</h5>
                    <div className={cx("group-btn")}>
                        <button className={cx("btn")}>
                            <img src={AppStore} alt=""/>
                        </button>
                        <button className={cx("btn")}>
                            <img src={GoogelPlay} alt=""/>
                        </button>
                    </div>
                    <div className={cx("social-network")}>
                        <div className={cx("text")}>Join Us</div>
                        <div className={cx("social-icons")}>
                            <a href="/">
                                <img src={youtube} alt="icon-youtube"/>
                            </a>
                            <a href="/">
                                <img src={facebook} alt="icon-facebook"/>
                            </a>
                            <a href="/">
                                <img src={twitter} alt="icon-twitter"/>
                            </a>
                            <a href="/">
                                <img src={instagram} alt="icon-instagram"/>
                            </a>
                            <a href="/">
                                <img src={linkedin} alt="icon-linkedin"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("footer-tail")}>
                <div className={cx("desc")}>CompanyName @ 202X. All rights reserved.</div>
            </div>
        </div>
    )
}

export default Footer;