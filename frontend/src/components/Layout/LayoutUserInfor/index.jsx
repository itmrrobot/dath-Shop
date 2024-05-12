import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './LayoutUserInfor.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseContextUser } from '../../../hooks/useContextUser';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function LayoutUserInfor({
    children,
    path,
    title,
    profile = false,
    order = false,
    password = false,
    returnn = false,
    wishlist = false,
}) {
    const navigate = useNavigate();
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
    };
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('path')}>
                <li>
                    <Link to="/">
                        <p>Home</p>
                    </Link>
                </li>
                <span> &#62; </span>
                <li>{path}</li>
            </ul>
            <div className={cx('title')}>
                <p>{title}</p>
                <Link className={cx('logout')} onClick={handleLogout} to="/login">
                    <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
                    <p>Log out</p>
                </Link>
            </div>
            <div className={cx('wrapper-content')}>
                <div className={cx('side-bar-user')}>
                    <ul className={cx('list-user')}>
                        <Link to="/user/profile">
                            <li className={cx(profile ? 'isActive' : '')}>
                                Personal Information
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </li>
                        </Link>
                        <Link to="/user/password">
                            <li className={cx(password ? 'isActive' : '')}>
                                Password
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </li>
                        </Link>
                        <Link to="/user/order">
                            <li className={cx(order ? 'isActive' : '')}>
                                My Orders
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </li>
                        </Link>
                        <Link to="/user/return">
                            <li className={cx(returnn ? 'isActive' : '')}>
                                Returns
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </li>
                        </Link>

                        <Link to={`/user/wishlist/${state?.cuser?.value?.id}`}>
                            <li className={cx(wishlist ? 'isActive' : '')}>
                                Wish list
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default LayoutUserInfor;
