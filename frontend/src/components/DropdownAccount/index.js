import styles from './DropdownAccount.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import arrowDownIcon from '../../assets/img/Arrow - Down 2.png';
import userImage from '../../assets/img/image 11.png';
import { useState, useContext } from 'react';
import { UseContextUser } from '../../hooks/useContextUser';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function DropdownAccount() {
    const [isClickAvatar, setIsClickAvatar] = useState(false);
    const navigator = useNavigate();
    const state = useContext(UseContextUser);
    const handleLogout = () => {
        state?.cuser?.setCurrentUser(null);
        localStorage.setItem('user', null);
        localStorage.setItem('accessToken', null);
        localStorage.setItem('refreshToken', null);
        state?.render?.setRender((prev) => !prev);
        toast.success(`Đăng xuất thành công!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        // navigator('/login');
        // setIsLogin(false);
    };
    const handleClickOut = function (event) {
        setIsClickAvatar(false);
    };

    window.addEventListener('click', handleClickOut);
    return (
        <div
            className={cx('account')}
            onClick={(e) => {
                e.stopPropagation();
                setIsClickAvatar(!isClickAvatar);
            }}
        >
            <img src={state?.cuser?.value?.avatar} alt="img-user" className={cx('img')} />
            <div className={cx('desc')}>
                <span className={cx('text')}>Welcome back</span>
                <span className={cx('name')}>{state?.cuser?.value?.name}</span>
            </div>
            <img src={arrowDownIcon} alt="icon-dropdown" className={cx('icon')} />
            <div
                className={cx('avatar-dropdown')}
                onClick={(e) => e.stopPropagation()}
                style={isClickAvatar === true ? { display: 'block' } : { display: 'none' }}
            >
                <div className={cx('avatar-dropdown-list')}>
                    {state?.cuser?.value?.Role?.id === 1 && (
                        <Link
                            to="/admin"
                            className={cx('avatar-dropdown-item', 'avatar-link')}
                            onClick={() => {
                                setIsClickAvatar(false);
                            }}
                        >
                            <div className={cx('item-icon')}>
                                <svg
                                    width="18px"
                                    height="18px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                </svg>
                            </div>
                            <span className={cx('info-name')}>Quản lý</span>
                        </Link>
                    )}
                    {(state?.cuser?.value?.Role?.id === 3 ||
                        state?.cuser?.value?.Role?.id === 4) && (
                        <Link
                            to="/user/profile"
                            className={cx('avatar-dropdown-item', 'avatar-link')}
                            onClick={() => {
                                setIsClickAvatar(false);
                            }}
                        >
                            <div className={cx('item-icon')}>
                                <svg
                                    width="18px"
                                    height="18px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                </svg>
                            </div>
                            <span className={cx('info-name')}>Tài khoản</span>
                        </Link>
                    )}
                    <Link
                        className={cx('avatar-dropdown-item')}
                        onClick={handleLogout}
                        to={'/login'}
                    >
                        <svg
                            width="18px"
                            height="18px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                        </svg>
                        <span className={cx('info-name')}>Đăng xuất</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DropdownAccount;
