import { useContext, useEffect, useState } from 'react';
import images from '../../assets/img';
import styles from './PaypalSuccess.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../constants';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function PaypalSuccess() {
    // const [email, setEmail] = useState();
    // const navigate = useNavigate();
    // const state = useContext(UseContextUser);
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
        navigate('/user/order');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor-container')}>
                <div className={cx('infor-header')}>
                    <div className={cx('logo')}>
                        {/* <p>Hello</p> */}
                        <img src={images.paypal} alt="" />
                    </div>
                    <p>Thanh toán bằng Paypal</p>
                </div>
                <div className={cx('infor-body')}>
                    <div className={cx('logo')}>
                        {/* <p>Hello</p> */}
                        <img src={images.checkmark} alt="" />
                    </div>
                    <div className={cx('content')}>
                        <p className={cx('content-notification')}>Đặt hàng thành công!!</p>
                        <p className={cx('content-notification-sub')}>
                            Vui lòng kiểm tra đơn hàng của bạn trong mục My Order
                        </p>
                    </div>
                </div>
                <div className={cx('return-home')} onClick={handleNavigationToMyOrder}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    <p>Quay lại trang My Orders</p>
                </div>
            </div>
        </div>
    );
}

export default PaypalSuccess;
