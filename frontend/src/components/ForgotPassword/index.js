import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../Button';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function ForgotPassword() {
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorMes, setErrorMes] = useState('');
    const navigator = useNavigate();
    const schema = yup
        .object()
        .shape({
            email: yup
                .string()
                .required('Bạn cần nhập trường này')
                .email('Email không hợp lệ')
                .matches(/@gmail\.com$/, 'Email phải kết thúc bằng @gmail.com'),
        })
        .required();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        try {
            var response = await axios.post(`${url}/auth/forgot/password`, {
                email: data.email,
            });
            toast.success(`Thay đổi mật khẩu thành công!, vui lòng kiểm tra email`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setErrorDisplay(false);
            setErrorMes('');
            navigator('/login');
        } catch (error) {
            if (error.response.status) {
                setErrorDisplay(true);
                setErrorMes(error.message);
            } else console.log(error.message);
        }
    };
    return (
        // <div className={cx('wrap-login')}>
        //     <div className={cx('wrapper')}>
        //         <h4 className={cx('logo')}>Luxury</h4>
        //         <h1 className={cx('title')}>Forgot Password</h1>
        //         <p className={cx('desc')}>
        //             Enter the email address
        //             <br />
        //             associated with your account
        //         </p>
        //         <div className={cx('alert-error')}>
        //             {errorDisplay && (
        //                 <div className="alert alert-danger" role="alert">
        //                     <h4 className="alert-heading">Error: {`${errorMes}`}</h4>
        //                     <p>{`Tên tài khoản (email) không tồn tại`}</p>

        //                     <p className="mb-0">Vui lòng nhập lại!!</p>
        //                 </div>
        //             )}
        //         </div>
        //         <div className={cx('input_product')}>
        //             <input placeholder="Enter Email Address" {...register('email')} />
        //             {errors.email && <p className={cx('form-message')}>{errors.email.message}</p>}
        //         </div>
        //         <Button
        //             primary
        //             rounded
        //             onClick={(e) => {
        //                 handleSubmit(onSubmit)(e);
        //             }}
        //         >
        //             Next
        //         </Button>
        //     </div>
        // </div>
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('title')}>
                    <p>Luxury</p>
                    <p>Forgot Password</p>
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
                            <p>{`Tên email không tồn tại`}</p>

                            <p className="mb-0">Vui lòng nhập lại!!</p>
                        </div>
                    )}

                    <div className={cx('inputField')}>
                        <label htmlFor="email" className="form-label">
                            Enter the email address
                            <br />
                            associated with your account
                        </label>
                        <input
                            id="email"
                            name="avatar"
                            type="email"
                            className="form-control"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className="form-message">{errors.email.message}</span>
                        )}
                    </div>
                </div>

                <Button
                    primary
                    rounded
                    onClick={(e) => {
                        handleSubmit(onSubmit)(e);
                    }}
                >
                    Next
                </Button>
                {/* <Button
                    // primary
                    rounded
                    // onClick={(e) => {
                    //     handleSubmit(onSubmit)(e);
                    // }}
                >
                    Cancel
                </Button> */}
            </div>
        </div>
    );
}

export default ForgotPassword;
