import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// Toast
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { url } from '../../constants';
import images from '../../assets/img';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function Register() {
    const [checkDuplicate, setCheckDuplicate] = useState(false);
    const getGoogleAuthUrl = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth`;
        const query = {
            client_id: `529951967259-ndpvd8bdqpa0sacgdr4mviflrv0p63il.apps.googleusercontent.com`,
            redirect_uri: `${url}/auth/google/callback`,
            response_type: 'code',
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                // ' ',
                'https://www.googleapis.com/auth/userinfo.profile',
            ].join(' '),
            prompt: 'consent',
            access_type: 'offline',
        };
        const queryString = new URLSearchParams(query).toString();
        return `${url}?${queryString}`;
    };
    const googleOAuth = getGoogleAuthUrl();
    // const [userName, setUserName] = useState('')
    // Schema là một đối tượng mô tả cấu trúc và quy tắc kiểm tra của dữ liệu
    // 1 Schema có thể bao gồm các phương thức như string(), number(),
    // object(), array(),...
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const navigate = useNavigate();

    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Bạn cần nhập trường này'),
            email: yup
                .string()
                .required('Bạn cần nhập trường này')
                .email('Email không hợp lệ')
                .matches(/@gmail\.com$/, 'Email phải kết thúc bằng @gmail.com'),
            phoneNumber: yup
                .string()
                .required('Bạn cần nhập trường này')
                .length(10, 'Số điện thoại phải có 10 số')
                .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
            password: yup
                .string()
                .required('Bạn cần nhập trường này')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt')
                .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .max(24, 'Password is too long - should not exceed 24 chars.'),
            passwordCF: yup
                .string()
                .required('Bạn cần nhập trường này')
                .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
            address: yup.string().required('Bạn cần nhập trường này'),
        })
        .required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            // userName: '',
            // email: '',
            // phoneNumber: '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // console.log({ ...data });
        const dataPost = {
            // ...data,
            name: data.name,
            email: data.email,
            password: data.password,
            rePassword: data.passwordCF,
            phone: data.phoneNumber,
            address: data.address,
            avatar: `${url}/img/default-avatar.jpg`,
        };
        axios
            .post(`${url}/auth/register`, dataPost)
            .then((res) => {
                if (res.data.err === 1) {
                    toast.success('Đăng ký thành công!!!!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    navigate('/login');
                    setCheckDuplicate(false);
                }
            })
            .catch((res) => {
                // console.log(res);
                setCheckDuplicate((prev) => !prev);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <Link className={cx('return-home')} to={'/'}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    <p>Return to Home</p>
                </Link>
                <div className={cx('title')}>
                    <p>Luxury</p>
                    <p>Sign up</p>
                </div>
                <div className={cx('fill-in-form')}>
                    {/* <div className={cx('inputField')}>
                        <label htmlFor="fullname" className="form-label">
                            Fullname
                        </label>
                        <input
                            id="fullname"
                            {...register('fullname')}
                            type="text"
                            className="form-control"
                        />
                        {errors.fullname && (
                            <span className="form-message">{errors.fullname.message}</span>
                        )}
                    </div> */}
                    <div className={cx('inputField')}>
                        <label htmlFor="name" className="form-label">
                            Username
                        </label>
                        <input
                            // id="username"
                            {...register('name')}
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            // value={user}
                        />
                        {errors.name && <span className="form-message">{errors.name.message}</span>}
                    </div>
                    <div className={cx('inputField')}>
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="avatar"
                            type="email"
                            placeholder="Your Email"
                            className="form-control"
                            {...register('email')}

                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            // value={user}
                        />
                        {errors.email && (
                            <span className="form-message">{errors.email.message}</span>
                        )}
                        {checkDuplicate && <span className="form-message">Email đã tồn tại</span>}
                    </div>
                    <div className={cx('inputField')}>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Your Password"
                            {...register('password')}

                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            // value={user}
                        />
                        {errors.password && (
                            <span className="form-message">{errors.password.message}</span>
                        )}
                    </div>
                    <div className={cx('inputField')}>
                        <label htmlFor="rePassword" className="form-label">
                            Re-enter password
                        </label>
                        <input
                            id="rePassword"
                            name="avatar"
                            type="password"
                            className="form-control"
                            placeholder="Your Re-Password"
                            {...register('passwordCF')}

                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            // value={user}
                        />
                        {errors.passwordCF && (
                            <span className="form-message">{errors.passwordCF.message}</span>
                        )}
                    </div>
                    <div className={cx('inputField')}>
                        <label htmlFor="phone" className="form-label">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            name="avatar"
                            type="tel"
                            className="form-control"
                            placeholder="Your Re-Password"
                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            {...register('phoneNumber')}

                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            // value={user}
                        />
                        {errors.phoneNumber && (
                            <span className="form-message">{errors.phoneNumber.message}</span>
                        )}
                    </div>
                    <div className={cx('inputField')}>
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="tel"
                            className="form-control"
                            placeholder="Your Address"
                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            {...register('address')}

                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            // value={user}
                        />
                        {errors.address && (
                            <span className="form-message">{errors.address.message}</span>
                        )}
                    </div>
                    {/* <input type="submit" /> */}
                    <Button
                        primary
                        rounded
                        type="submit"
                        onClick={(e) => {
                            handleSubmit(onSubmit)(e);
                        }}
                    >
                        Sign up
                    </Button>
                </div>
                <p>or continue with </p>
                <div className={cx('another-login')}>
                    {/* <div className={cx('another-login-btn')}>
                        <Button rounded>
                            <img
                                src={require('~/assets/images/icons_google.svg').default}
                                alt="yt"
                            />
                        </Button>
                        <Button rounded>
                            <img
                                src={require('~/assets/images/icons_github.svg').default}
                                alt="yt"
                            />
                        </Button>
                        <Button rounded>
                            <img
                                src={require('~/assets/images/bi_facebook.svg').default}
                                alt="yt"
                            />
                        </Button>
                    </div> */}
                    <Link
                        to={'https://backend-datn-production.up.railway.app/auth/google/callback'}
                    >
                        <Button rounded>
                            <img src={images.google} alt="yt" />
                        </Button>
                    </Link>
                    <Button rounded>
                        <img src={images.github_btn} alt="yt" />
                    </Button>
                    <Button rounded>
                        <img src={images.facebook_btn} alt="yt" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;
