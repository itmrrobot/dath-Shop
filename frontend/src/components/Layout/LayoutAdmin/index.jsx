import Header from '../../Header';
import styles from './LayoutAdmin.module.scss';
import SideBarAdmin from '../components/SideBarAdmin';
import Footer from '../../Footer';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function LayoutAdmin({ children }) {
    return (
        <div className={cx('wrapper')}>
            {/* Chứa:
                1. Component Header  */}
            <Header />

            {/* 2. Container chứa: */}

            <div className={cx('has-sidebar-wrapper')}>
                <div className={cx('container')}>
                    <SideBarAdmin />
                    {/* + Content: Chứa thông tin sản phẩm */}
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LayoutAdmin;
