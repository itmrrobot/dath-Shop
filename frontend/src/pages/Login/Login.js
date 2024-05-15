import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from '../../constants';
import { validate } from '../../utils';
// import {UserContext} from "../../hooks/useContextUser"
import { UserProvider, UseContextUser } from '../../hooks/useContextUser';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../components/Button';
import images from '../../assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const state = useContext(UseContextUser);
    // console.log(state);
    const initialValues = { email: '', password: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    // const {setUser,setIsLogin,user} = AuthState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorMes, setErrorMes] = useState('');
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 13) {
                handleSubmit(handleLogin)(event);
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [state?.cuser?.value]);
    const schema = yup
        .object()
        .shape({
            email: yup
                .string()
                .required('Bạn cần nhập trường này')
                .email('Email không hợp lệ')
                .matches(/@gmail\.com$/, 'Email phải kết thúc bằng @gmail.com'),
            password: yup.string().required('Bạn cần nhập trường này'),
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
    const handleLogin = (data) => {
        const dataPost = {
            ...data,
        };

        axios
            .post(url + '/auth/login', dataPost)
            .then((response) => {
                const { access_token, refresh_token } = response.data;
                toast.success(`Chào mừng ${response.data.res.name}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                // St ore the tokens in localStorage or secure cookie for later use
                // cookies.set('accessToken', access_token);
                // cookies.set('refreshToken', refresh_token);
                // setUser(response.data.res)
                localStorage.setItem('user', JSON.stringify(response.data.res));
                localStorage.setItem('accessToken', JSON.stringify(access_token));
                localStorage.setItem('refreshToken', JSON.stringify(refresh_token));

                console.log(response);
                state.cuser.setCurrentUser(response.data.res);
                navigate('/');
            })
            .catch((res) => {
                console.log(res);
                if (res.response.status) {
                    setErrorDisplay(true);
                    setErrorMes(res.message);
                } else console.log(res.message);
                // console.log(res.message);
            });
    };
    // const getGoogleAuthUrl = () => {
    //     // const url = `https://accounts.google.com/o/oauth2/v2/auth`;
    //     // const url = `https://backend-datn-production.up.railway.app`;
    //     const query = {
    //         client_id: `529951967259-ndpvd8bdqpa0sacgdr4mviflrv0p63il.apps.googleusercontent.com`,
    //         redirect_uri: `${url}/auth/google/callback`,
    //         response_type: 'code',
    //         scope: [
    //             'https://www.googleapis.com/auth/userinfo.email',
    //             // ' ',
    //             'https://www.googleapis.com/auth/userinfo.profile',
    //         ].join(' '),
    //         prompt: 'consent',
    //         access_type: 'offline',
    //     };
    //     const queryString = new URLSearchParams(query).toString();
    //     // window.open(`${url}/auth/google/callback`, '_self');
    //     return `${url}?${queryString}`;
    // };
    // const googleOAuth = getGoogleAuthUrl();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <Link className={cx('return-home')} to={'/'}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    <p>Return to Home</p>
                </Link>
                <div className={cx('title')}>
                    <p>Luxury</p>
                    <p>Sign in</p>
                </div>
                <div className={cx('fill-in-form')}>
                    {/* <div className={cx('error-message')}>
                        <FontAwesomeIcon icon={faExclamation} />
                        <h4>Error:</h4>
                        <span>{errorMes}</span>
                    </div> */}
                    {errorDisplay && (
                        <div className="alert alert-danger" role="alert">
                            <h4 className="alert-heading">Error: {`${errorMes}`}</h4>
                            <p>{`The email or password is incorrect`}</p>

                            <p className="mb-0">Please re-enter!!</p>
                        </div>
                    )}

                    <div className={cx('inputField')}>
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="avatar"
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className="form-message">{errors.email.message}</span>
                        )}
                    </div>
                    <div className={cx('inputField')}>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            placeholder="Your Password"
                            type="password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <span className="form-message">{errors.password.message}</span>
                        )}
                    </div>

                    <div className={cx('login-forget')}>
                        <Link to="/forgot">Forgot Password?</Link>
                    </div>
                    <Button
                        onClick={(e) => {
                            handleSubmit(handleLogin)(e);
                        }}
                        primary
                        rounded
                    >
                        Sign in
                    </Button>
                </div>
                <p>or continue with </p>
                <div className={cx('another-login')}>
                    <div className={cx('another-login-btn')}>
                        <Link
                            to={
                                'https://backend-datn-production.up.railway.app/auth/google/callback'
                            }
                        >
                            <Button rounded>
                                <img src={images.google} alt="yt" />
                            </Button>
                        </Link>
                        <Button rounded onClick={() => setIsModalOpen(true)}>
                            <img src={images.github_btn} alt="yt" />
                        </Button>
                        <Button rounded onClick={() => setIsModalOpen(true)}>
                            <img src={images.facebook_btn} alt="yt" />
                        </Button>
                    </div>
                </div>
                <div className={cx('register')}>
                    <p>
                        Don't have an account yet?{' '}
                        <span>
                            <Link to="/register">Register for free</Link>
                        </span>
                    </p>
                </div>
            </div>
            <Modal title="Login" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Comming Soon!</p>
            </Modal>
        </div>
    );
}

export default Login;
