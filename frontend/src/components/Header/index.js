import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { FilterState } from "../../store/FilterProvider";
import { AuthState } from "../../store/AuthProvider";
import DropdownAccount from "../DropdownAccount";
import { useState } from "react";
import ModalMessage from "../ModalMessage";

const cx = classNames.bind(styles);

function Header() {
    const {setSearchContent} = FilterState();
    const [isSuccess,setIsSuccess] = useState(false);
    const {isLogin,user} = AuthState();
    const navigate = useNavigate();
    const handleSearch = (e) => {
        setSearchContent(e.target.value)
        if(e.which===13) {
            navigate('/products');
        }
    }
    const handleClickCart = () => {
        if(user) navigate('/cart');
        else setIsSuccess(true)
    }
    return(
        <nav className={cx("navbar")}>
            <div className={cx("container")} style={user?{gap:"198px"}:{gap:"230px"}}>
                <a className={cx("navbar-brand")} href="/">Luxury’s Closet</a>
                <div className={cx("search")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 17" fill="none">
                        <path d="M7.83333 13.1667C10.7789 13.1667 13.1667 10.7789 13.1667 7.83333C13.1667 4.88781 10.7789 2.5 7.83333 2.5C4.88781 2.5 2.5 4.88781 2.5 7.83333C2.5 10.7789 4.88781 13.1667 7.83333 13.1667Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.5 14.5L11.6 11.6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input type="text" className={cx("input")} placeholder="Search for an item..." onKeyDown={handleSearch}/>
                </div>
                <div className={cx("navbar-nav")}>
                    <Link className={cx("nav-link")} to="/products">Store</Link>
                    {!user&&<Link className={cx("nav-link")} to="/login">Account</Link>}    
                    <a className={cx("nav-link")} href="/">Wish List</a> 
                    <div className={cx("nav-link")} onClick={handleClickCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <g clipPath="url(#clip0_55_779)">
                                <path d="M16.2986 20.2248C16.3377 20.2313 16.3766 20.2345 16.415 20.2345C16.7525 20.2345 17.0504 19.9908 17.1077 19.6468L17.8109 15.4281C17.8747 15.0451 17.616 14.6828 17.2329 14.6189C16.8498 14.5549 16.4876 14.8138 16.4237 15.1969L15.7206 19.4156C15.6568 19.7987 15.9155 20.161 16.2986 20.2248Z" fill="black"/>
                                <path d="M7.93937 19.6468C7.99669 19.9907 8.29454 20.2345 8.63208 20.2345C8.67048 20.2345 8.70938 20.2314 8.74852 20.2248C9.13159 20.161 9.39034 19.7987 9.32649 19.4156L8.62337 15.1969C8.55952 14.8138 8.19732 14.5551 7.81421 14.6189C7.43115 14.6828 7.1724 15.045 7.23624 15.4281L7.93937 19.6468Z" fill="black"/>
                                <path d="M23.7969 8.98437H21.3223L15.9084 2.21702C15.6659 1.91388 15.2234 1.86462 14.9202 2.10724C14.6169 2.34982 14.5677 2.79227 14.8104 3.09551L19.5215 8.98437H5.47855L10.1897 3.09551C10.4323 2.79227 10.3831 2.34977 10.0799 2.10724C9.77661 1.86462 9.33416 1.91384 9.09163 2.21702L3.6777 8.98437H1.20312C0.814812 8.98437 0.5 9.29918 0.5 9.68749V12.5C0.5 12.8883 0.814812 13.2031 1.20312 13.2031H2.07903L4.74584 22.5369C4.83205 22.8388 5.10795 23.0469 5.42188 23.0469H19.5781C19.892 23.0469 20.168 22.8388 20.2542 22.5369L22.921 13.2031H23.7969C24.1852 13.2031 24.5 12.8883 24.5 12.5V9.68749C24.5 9.29918 24.1852 8.98437 23.7969 8.98437ZM19.0478 21.6406H5.95222L3.54153 13.2031H21.4585L19.0478 21.6406ZM23.0938 11.7969C20.6851 11.7969 4.18813 11.7969 1.90625 11.7969V10.3906H23.0938V11.7969Z" fill="black"/>
                                <path d="M12.5 20.2344C12.8883 20.2344 13.2031 19.9196 13.2031 19.5312V15.3125C13.2031 14.9242 12.8883 14.6094 12.5 14.6094C12.1117 14.6094 11.7969 14.9242 11.7969 15.3125V19.5312C11.7969 19.9196 12.1117 20.2344 12.5 20.2344Z" fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_55_779">
                                <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    {user&&<DropdownAccount/>} 
                </div>
            </div>
            {isSuccess&&<ModalMessage setIsSuccess={setIsSuccess} msg={"You need to login"}/>}
        </nav>
    )
}

export default Header;