import styles from './PurchaseOrderCancel.module.scss';
import classNames from 'classnames/bind';
import images from '../../assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PurchaseOrderCancel() {
    // const [email, setEmail] = useState();
    const navigate = useNavigate();
    // const state = useContext(UseContextUser);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await axios.get(`${url}/login/success`);
    //             console.log(response);
    //             setEmail(response.data.user.email);
    //             let payload = {
    //                 Role: {
    //                     id: response.data.user.RoleId,
    //                     name: 'Customer',
    //                 },
    //                 address: response.data.user.address,
    //                 avatar: response.data.user.avatar,
    //                 email: response.data.user.email,
    //                 fullname: response.data.user.name,
    //                 id: response.data.user.id,
    //                 name: response.data.user.name,
    //                 phone: response.data.user.phone,
    //                 isGoogle: 1,
    //             };
    //             localStorage.setItem('user', JSON.stringify(payload));
    //             state?.cuser?.setCurrentUser(payload);
    //             toast.success(`Đăng nhập thành công`, {
    //                 position: 'top-right',
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: 'light',
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, []);
    const handleNavigationToMyOrder = () => {
        navigate('/cart');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor-container')}>
                <div className={cx('infor-header')}>
                    <div className={cx('logo')}>
                        {/* <p>Hello</p> */}
                        <img src={images.vnpay} alt="" />
                    </div>
                    <p>Thanh toán bằng VNPAY</p>
                </div>
                <div className={cx('infor-body')}>
                    <div className={cx('logo')}>
                        {/* <p>Hello</p> */}
                        <img src={images.uncheckmark} alt="" />
                    </div>
                    <div className={cx('content')}>
                        <p className={cx('content-notification')}>Đặt hàng thất bại!!</p>
                        <p className={cx('content-notification-sub')}>
                            Bạn đã huỷ giao dịch thanh toán
                        </p>
                    </div>
                </div>
                <div className={cx('return-home')} onClick={handleNavigationToMyOrder}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    <p>Quay lại trang Cart!</p>
                </div>
            </div>
        </div>
    );
}

export default PurchaseOrderCancel;
