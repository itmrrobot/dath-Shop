import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import AppStore from '../../assets/img/AppStore.png';
import GoogelPlay from '../../assets/img/GooglePlay.png';
import youtube from '../../assets/img/youtube.png';
import facebook from '../../assets/img/facebook.png';
import twitter from '../../assets/img/twitter.png';
import instagram from '../../assets/img/instagram.png';
import linkedin from '../../assets/img/linkedin.png';
import images from '../../assets/img';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            {/* <div className={cx('footer-head')}>
                <div className={cx('logo-container')}>Logo</div>
                <div className={cx('form')}>
                    <div className={cx('field')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <path
                                d="M5.598 7.5L11.345 12.62C11.5281 12.7831 11.7648 12.8732 12.01 12.8732C12.2552 12.8732 12.4919 12.7831 12.675 12.62L18.423 7.5H5.598ZM20 8.773L14.006 14.114C13.4565 14.6037 12.7461 14.8744 12.01 14.8744C11.2739 14.8744 10.5635 14.6037 10.014 14.114L4 8.754V17.5H20V8.773ZM4 5.5H20C20.5304 5.5 21.0391 5.71071 21.4142 6.08579C21.7893 6.46086 22 6.96957 22 7.5V17.5C22 18.0304 21.7893 18.5391 21.4142 18.9142C21.0391 19.2893 20.5304 19.5 20 19.5H4C3.46957 19.5 2.96086 19.2893 2.58579 18.9142C2.21071 18.5391 2 18.0304 2 17.5V7.5C2 6.96957 2.21071 6.46086 2.58579 6.08579C2.96086 5.71071 3.46957 5.5 4 5.5V5.5Z"
                                fill="#697077"
                            />
                        </svg>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="Enter your email to get the latest news..."
                        />
                    </div>
                    <button className={cx('btn-subcribe')}>Subcribe</button>
                </div>
            </div> */}
            <div className={cx('footer-body')}>
                <div className={cx('footer-left')}>
                    <div className={cx('nav')}>
                        <h5 className={cx('section_1')}>Luxury’s Closet</h5>
                        <div className={cx('nav-item_1')}>
                            We're expanding your clothing store globally,
                            <br></br>
                            Simple and luxury.
                        </div>
                        <div className={cx('nav-item_2')}>Luxury’s Closet, 2024</div>
                        {/* <div className={cx("nav-item")}>Twenty One</div>
                    <div className={cx("nav-item")}>Twenty One</div> */}
                    </div>
                </div>
                <div className={cx('footer-right')}>
                    <div className={cx('nav')}>
                        <h5 className={cx('section')}>Customer support</h5>
                        <div className={cx('nav-item')}>Help Center</div>
                        <div className={cx('nav-item')}>Buying Guide</div>
                        <div className={cx('nav-item')}>Payment</div>
                        <div className={cx('nav-item')}>Returns & Refunds</div>
                        <div className={cx('nav-item')}>Warranty Policy</div>
                    </div>
                    <div className={cx('nav')}>
                        <h5 className={cx('section')}>Resources</h5>
                        <div className={cx('nav-item')}>Documentation</div>
                        <div className={cx('nav-item')}>Papers</div>
                        <div className={cx('nav-item')}>Press Conferences</div>
                    </div>
                    <div className={cx('nav')}>
                        <h5 className={cx('section')}>Legal</h5>
                        <div className={cx('nav-item')}>Terms of Service</div>
                        <div className={cx('nav-item')}>Privacy Policy</div>
                        <div className={cx('nav-item')}>Cookies Policy</div>
                        <div className={cx('nav-item')}>Data Processing</div>
                    </div>
                </div>
            </div>
            <div className={cx('footer-tail')}>
                <div className={cx('desc')}>© 2024 Luxury’s Closet. All rights reserved</div>
                <div className={cx('social_media')}>
                    <img src={images.instagram} alt="" />
                    <img src={images.facebook} alt="" />
                    <img src={images.youtube} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
