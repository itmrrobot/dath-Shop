import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { url } from '../../constants/index';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { validate } from '../../utils';
import ModalMessage from '../ModalMessage';

const cx = classNames.bind(styles);

function Register() {
    const avatarDefault = `${url}/img/default-avatar.jpg`;
    const initialValue = {
        fullname: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        avatar: avatarDefault,
        address: '',
    };
    const [rePassword, setRePassword] = useState('');
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [data, setData] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        try {
            if (formValues.password === rePassword && formValues.password && rePassword) {
                const respone = await axios.post(url + '/auth/register', formValues);
                setData(respone.data);
                setIsSuccess(true);
            } else {
                formErrors.passwordMsg = 'Mật khẩu không khớp';
            }
            // setIsSuccess(true);
            // setIsLogin(true);

            //localStorage.setItem("user",JSON.parse(respone.data));
        } catch (e) {
            console.log(e);
        }
    };
    console.log(data);
    return (
        <div className={cx('wrap-login')}>
            <div className={cx('wrapper')}>
                <h4 className={cx('logo')}>Luxury</h4>
                <h1 className={cx('title')}>Sign up</h1>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Fullname</label>
                        <input
                            type="text"
                            className={cx('form-input')}
                            placeholder="nguyenngockhanh"
                            name="fullname"
                            onChange={handleChange}
                        />
                        {formErrors.fullname && (
                            <p className={cx('message')}>{formErrors.fullname}</p>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Username</label>
                        <input
                            type="text"
                            className={cx('form-input')}
                            placeholder="nguyenngockhanh"
                            name="name"
                            onChange={handleChange}
                        />
                        {formErrors.name && <p className={cx('message')}>{formErrors.name}</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Email</label>
                        <input
                            type="text"
                            className={cx('form-input')}
                            placeholder="nguyenngockhanh@gmail.com"
                            name="email"
                            onChange={handleChange}
                        />
                        {formErrors.email && <p className={cx('message')}>{formErrors.email}</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Password</label>
                        <input
                            type="password"
                            className={cx('form-input')}
                            placeholder="*****************"
                            name="password"
                            onChange={handleChange}
                        />
                        {formErrors.password && (
                            <p className={cx('message')}>{formErrors.password}</p>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Re-enter password</label>
                        <input
                            type="password"
                            className={cx('form-input')}
                            placeholder="*****************"
                            name="rePassword"
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        {!rePassword && <p className={cx('message')}>{formErrors.rePassword}</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Phone number</label>
                        <input
                            type="text"
                            className={cx('form-input')}
                            placeholder="0856086269"
                            name="phone"
                            onChange={handleChange}
                        />
                        {formErrors.phone && <p className={cx('message')}>{formErrors.phone}</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('name')}>Address</label>
                        <input
                            type="text"
                            className={cx('form-input')}
                            placeholder="12 Le loi"
                            name="address"
                            onChange={handleChange}
                        />
                        {formErrors.phone && <p className={cx('message')}>{formErrors.address}</p>}
                    </div>
                    <button type="submit" className={cx('btn-common')}>
                        Sign up
                    </button>
                </form>
                <div className={cx('wrap-text-and-button')}>
                    <div className={cx('text')}>or continue with</div>
                    <div className={cx('wrap-button')}>
                        <button className={cx('btn-login-social')}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_18_653)">
                                    <path
                                        d="M23.7662 9.64963H22.7996V9.59983H11.9998V14.3998H18.7815C17.7921 17.1939 15.1335 19.1997 11.9998 19.1997C8.02366 19.1997 4.79992 15.9759 4.79992 11.9998C4.79992 8.02366 8.02366 4.79992 11.9998 4.79992C13.8352 4.79992 15.5049 5.4923 16.7763 6.62329L20.1705 3.22914C18.0273 1.23178 15.1605 0 11.9998 0C5.37291 0 0 5.37291 0 11.9998C0 18.6267 5.37291 23.9996 11.9998 23.9996C18.6267 23.9996 23.9996 18.6267 23.9996 11.9998C23.9996 11.1952 23.9168 10.4098 23.7662 9.64963Z"
                                        fill="#FFC107"
                                    />
                                    <path
                                        d="M1.38281 6.41449L5.32534 9.30584C6.39213 6.66468 8.97568 4.79992 11.999 4.79992C13.8344 4.79992 15.5042 5.4923 16.7755 6.62328L20.1697 3.22914C18.0265 1.23178 15.1598 0 11.999 0C7.38991 0 3.39278 2.60215 1.38281 6.41449Z"
                                        fill="#FF3D00"
                                    />
                                    <path
                                        d="M12 24C15.0995 24 17.9159 22.8138 20.0452 20.8849L16.3313 17.7421C15.086 18.6891 13.5644 19.2013 12 19.2001C8.87881 19.2001 6.22865 17.2099 5.23027 14.4326L1.31714 17.4475C3.3031 21.3336 7.33623 24 12 24Z"
                                        fill="#4CAF50"
                                    />
                                    <path
                                        d="M23.7662 9.64963H22.7996V9.59983H11.9998V14.3998H18.7815C18.3082 15.7296 17.4557 16.8916 16.3293 17.7423L16.3311 17.7411L20.0451 20.8838C19.7823 21.1226 23.9996 17.9997 23.9996 11.9998C23.9996 11.1952 23.9168 10.4098 23.7662 9.64963Z"
                                        fill="#1976D2"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_18_653">
                                        <rect width="24" height="24" rx="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button className={cx('btn-login-social')}>
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_18_661)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.5 0C5.87 0 0.5 5.37 0.5 12C0.5 17.31 3.935 21.795 8.705 23.385C9.305 23.49 9.53 23.13 9.53 22.815C9.53 22.53 9.515 21.585 9.515 20.58C6.5 21.135 5.72 19.845 5.48 19.17C5.345 18.825 4.76 17.76 4.25 17.475C3.83 17.25 3.23 16.695 4.235 16.68C5.18 16.665 5.855 17.55 6.08 17.91C7.16 19.725 8.885 19.215 9.575 18.9C9.68 18.12 9.995 17.595 10.34 17.295C7.67 16.995 4.88 15.96 4.88 11.37C4.88 10.065 5.345 8.985 6.11 8.145C5.99 7.845 5.57 6.615 6.23 4.965C6.23 4.965 7.235 4.65 9.53 6.195C10.49 5.925 11.51 5.79 12.53 5.79C13.55 5.79 14.57 5.925 15.53 6.195C17.825 4.635 18.83 4.965 18.83 4.965C19.49 6.615 19.07 7.845 18.95 8.145C19.715 8.985 20.18 10.05 20.18 11.37C20.18 15.975 17.375 16.995 14.705 17.295C15.14 17.67 15.515 18.39 15.515 19.515C15.515 21.12 15.5 22.41 15.5 22.815C15.5 23.13 15.725 23.505 16.325 23.385C18.7072 22.5807 20.7772 21.0497 22.2437 19.0074C23.7101 16.965 24.4993 14.5143 24.5 12C24.5 5.37 19.13 0 12.5 0Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_18_661">
                                        <rect x="0.5" width="24" height="24" rx="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button className={cx('btn-login-social')}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_18_666)">
                                    <path
                                        d="M24 12.0735C24 5.4045 18.627 -0.00150013 12 -0.00150013C5.36999 -1.29687e-07 -0.00300598 5.4045 -0.00300598 12.075C-0.00300598 18.1005 4.38599 23.0955 10.122 24.0015V15.564H7.07699V12.075H10.125V9.4125C10.125 6.387 11.9175 4.716 14.658 4.716C15.972 4.716 17.3445 4.9515 17.3445 4.9515V7.9215H15.831C14.3415 7.9215 13.8765 8.853 13.8765 9.8085V12.0735H17.2035L16.6725 15.5625H13.875V24C19.611 23.094 24 18.099 24 12.0735Z"
                                        fill="#059BE5"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_18_666">
                                        <rect width="24" height="24" rx="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={cx('ask')}>
                    Have an account yet?
                    <Link to="/login" className={cx('link')}>
                        Login here
                    </Link>
                </div>
            </div>
            {isSuccess && <ModalMessage msg={'Registed'} setIsSuccess={setIsSuccess} />}
        </div>
    );
}

export default Register;
