import classNames from "classnames/bind";
import styles from "./Chatbox.module.scss"
import images from "../../assets/img";
const cx = classNames.bind(styles)
function Chatbox() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('chatbox-wrapper')}>
                <div className={cx('chatbox__header')}>
                
                <div className={cx('chatbox__content--header')}>
                    <div className={cx('chatbox__image--header')}>
                        <img src='' alt="image"/>
                    </div>
                    <div className={cx('chatbox__title--header')}>
                        <h4 className={cx('chatbox__heading--header')}>Chat support</h4>
                        <div className={cx('status')}>
                            <img src={images.active_chat} alt="" />
                        <p className={cx('chatbox__description--header')}>Always Active</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('chatbox__messages')}>
                <div></div>
            </div>
            <div className={cx('chatbox__footer')}>
                <input type="text" placeholder="Write a message..." className={cx('input-text')}/>
                <button className={cx('chatbox__send--footer send__button')}>Send</button>
            </div>
            </div>
        </div>
     );
}

export default Chatbox;