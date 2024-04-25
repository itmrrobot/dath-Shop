import styles from './ModalPayment.module.scss';
import classNames from 'classnames/bind';
import vnpayLogo from '../../assets/img/vnpay.png';
import cashLogo from '../../assets/img/nhanhang.png';
import axios from 'axios';
import { url } from '../../constants';

const cx = classNames.bind(styles);

function ModalPayment({ ...props }) {
    const { setIsClickPlaceOrder, total } = props;

    const handleCliclModal = (e) => {
        e.stopPropagation();
        setIsClickPlaceOrder(false);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(url + '/create_payment_url', {
                amount: total - 300000 - 20000,
                bankCode: 'VNBANK',
                language: 'vn',
            });

            if (res) {
                window.location.replace(`${res.data}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={cx('modal-wrap')}>
            <div className={cx('modal')} onClick={handleCliclModal}></div>
            <div className={cx('modal-content')}>
                <div className={cx('item')} onClick={handleSubmit}>
                    <img src={vnpayLogo} alt="vnpay" className={cx('img')} />
                    <span className={cx('text')}>Thanh toán bằng vnpay</span>
                </div>
                <div className={cx('item')}>
                    <img src={cashLogo} alt="vnpay" className={cx('img')} />
                    <span className={cx('text')}>Thanh toán khi nhận hàng</span>
                </div>
            </div>
        </div>
    );
}

export default ModalPayment;
