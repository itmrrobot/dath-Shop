import styles from './LoginSignup.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/img';
const cx = classNames.bind(styles);
function LoginSignUp({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-side')}>{children}</div>
            <div className={cx('right-side')}>
                <div className={cx('img-wrapper')}>
                    <img src={images.logo_login} alt="Login" />
                </div>
            </div>
            {/* {

            } */}
        </div>
    );
}

export default LoginSignUp;
