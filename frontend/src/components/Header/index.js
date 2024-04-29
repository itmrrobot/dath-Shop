import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import DropdownAccount from '../DropdownAccount';
import { useState, useMemo, useRef, useEffect, useContext } from 'react';
import ModalMessage from '../ModalMessage';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '../../hooks/useDebounce';
import images from '../../assets/img';
import { UseContextUser } from '../../hooks/useContextUser';
import 'tippy.js/dist/tippy.css'; // optional
import { Wrapper as PopperWrapper } from '../Popper';
import axios from 'axios';
import Search from '../Layout/components/Search';
import { url } from '../../constants';
import { formatPrice } from '../../common';

const cx = classNames.bind(styles);

function Header() {
    // const {setSearchContent} = FilterState();
    const state = useContext(UseContextUser);
    // console.log(state.cuser.value);
    const [isSuccess, setIsSuccess] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartHeader, setCartHeader] = useState([]);
    const inputRef = useRef();
    const navigate = useNavigate();
    const totalProduct = useMemo(() => {
        return cartHeader.reduce((acc, cur) => {
            return acc + Number(cur?.quantity);
        }, 0);
    }, [cartHeader]);
    const handleClickCart = () => {
        navigate('/cart');
        // else setIsSuccess(true)
    };
    // const filterSearch = useMemo(() => {
    //     const productFilter = products.filter((product) => {
    //         if (!debounce.trim()) {
    //             setSearchResult([]);
    //             return;
    //         }
    //         let indexItem = product.name.toLowerCase().includes(debounce.toLowerCase());
    //         return indexItem;
    //     });

    //     return productFilter;
    // }, [debounce]);
    useEffect(() => {
        let product_id = state.cart.value.map((i) => i.id_product);
        const fetchProducts = async () => {
            try {
                const baseUrl = 'http://localhost:4000/products';
                const requests = product_id?.map((id) => axios.get(`${baseUrl}/${id}`));
                const responses = await Promise.all(requests);
                const products = responses.map((response) => response.data);
                // console.log(products);
                let product_cart = state?.cart?.value;
                // console.log(product_cart);
                let a = product_cart?.map((item) => {
                    // console.log(products);
                    // console.log(products?.find((i) => i.id == item.id_product));
                    return {
                        ...item,
                        product: products?.find((i) => i.id == item.id_product),
                    };
                });
                setCartHeader(a);
                // state.cart.setCart(a);
                // setProducts(products);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };
        // Gọi hàm lấy danh sách sản phẩm
        fetchProducts();
    }, [state.cart.value]);
    return (
        <nav className={cx('navbar')}>
            <div className={cx('container')}>
                <Link to={'/'}>
                    <div className={cx('navbar-brand')} href="/">
                        Luxury’s Closet
                    </div>
                </Link>
                <div className={cx('search')}>
                    <Search />
                    {/* <HeadlessTippy
            // Cho phep duoc active thanh phan trong Tippy
            interactive
            //
            appendTo={() => document.body}
            //
            visible={showResults && searchResult.length > 0}
            // visible
            // trigger="click"
            // placement="bottom-end"
            // Attribute cho phep render ra popup voi dieu kien la
            // visible
            render={(attrs) => {
                return (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper overflow>
                            <p className={cx('title-search-result')}>Gợi ý sản phẩm</p>
                            {searchResult.map((result) => (
                                <Link key={result.id} to={'/product/' + result.id} onClick={() => handleClear()}>
                                    <div className={cx('wrapper-result')}>
                                        <img className={cx('search-icon')} src={images.search} alt="search-btn" />
                                        <p className={cx('product')}>{result.ten_san_pham}</p>
                                    </div>
                                </Link>
                            ))}
                        </PopperWrapper>
                    </div>
                );
            }}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <button className={cx('search-btn')}>
                    <img className={cx('search-logo')} src={images.search} alt="search" />
                </button>

                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={(e) => {
                        e.target.value = e.target.value.trimStart();
                        setSearchValue(e.target.value);
                    }}
                    
                    placeholder="Search for an Item..."
                    onFocus={() => setShowResults(true)}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        Cài đặt thư viện fontawesome 
                            Với mỗi icon sẽ bao gồm chuẩn fa+tên icon
                       
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            </div>
        </HeadlessTippy> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 17" fill="none">
                        <path d="M7.83333 13.1667C10.7789 13.1667 13.1667 10.7789 13.1667 7.83333C13.1667 4.88781 10.7789 2.5 7.83333 2.5C4.88781 2.5 2.5 4.88781 2.5 7.83333C2.5 10.7789 4.88781 13.1667 7.83333 13.1667Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.5 14.5L11.6 11.6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input type="text" className={cx("input")} placeholder="Search for an item..." onKeyDown={handleSearch} onChange={(e) => {
                        e.target.value = e.target.value.trimStart();
                        setSearchValue(e.target.value);
                    }}
                    onFocus={() => setShowResults(true)}
                    /> */}
                </div>
                <div className={cx('navbar-nav')}>
                    <Tippy delay={[0, 50]} content="Visit Shop!" placement="bottom">
                        {/* <Button
                                    text
                                    onClick={() => {
                                        navigator('/product?_page=1&_limit=9');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    Store
                                </Button> */}
                        <Link className={cx('nav-link')} to="/products?page=1&limit=9">
                            Store
                        </Link>
                    </Tippy>
                    {state?.cuser?.value === '' && (
                        <HeadlessTippy
                            // Cho phep duoc active thanh phan trong Tippy
                            interactive
                            //
                            appendTo={() => document.body}
                            // visible={true}
                            placement="bottom"
                            // Attribute cho phep render ra popup voi dieu kien la
                            // visible
                            render={(attrs) => {
                                return (
                                    <div className={cx('account-result')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('account-wrapper')}>
                                                <Link to={'/register'}>
                                                    <div className={cx('btn-register')}>
                                                        <FontAwesomeIcon
                                                            icon={faUserPlus}
                                                        ></FontAwesomeIcon>
                                                        <p className={cx('panel')}>Register</p>
                                                    </div>
                                                </Link>
                                                <Link to={'/login'}>
                                                    <div className={cx('btn-login')}>
                                                        <FontAwesomeIcon
                                                            icon={faUser}
                                                        ></FontAwesomeIcon>
                                                        <p className={cx('panel')}>Login</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </PopperWrapper>
                                    </div>
                                );
                            }}
                        >
                            <p className={cx('nav-link')}>Account</p>
                        </HeadlessTippy>
                    )}
                    {/* {<HeadlessTippy
                                // Cho phep duoc active thanh phan trong Tippy
                                interactive
                                //
                                appendTo={() => document.body}
                                // visible={true}
                                placement="bottom"
                                // Attribute cho phep render ra popup voi dieu kien la
                                // visible
                                render={(attrs) => {
                                    return (
                                        <div className={cx('account-result')} tabIndex="-1" {...attrs}>
                                            <PopperWrapper>
                                                <div className={cx('account-wrapper')}>
                                                <Link to={'/register'}>
                                                <div className={cx('btn-register')}>
                                                    
                                                    <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                                                    <p className={cx('panel')}>Register</p>
                                                    
                                                    
                                                </div>
                                                </Link>
                                                <Link to={'/login'}>
                                                <div className={cx('btn-login')}>
                                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                                    <p className={cx('panel')}>Login</p>
                                                </div>
                                                </Link>
                                                
                                                </div>
                                                
                                            </PopperWrapper>
                                        </div>
                                    );
                                }}
                            >
                                <p className={cx("nav-link")}>Account</p>
                            </HeadlessTippy>}    */}
                    <Tippy delay={[0, 50]} content="Your Favourites!" placement="bottom">
                        <Link to={`/user/wishlist/${state?.cuser?.value?.id}`}>Wish List</Link>
                    </Tippy>
                    <HeadlessTippy
                        // Cho phep duoc active thanh phan trong Tippy
                        interactive
                        //
                        appendTo={() => document.body}
                        // visible={true}
                        // placement="bottom-end"
                        placement="top"
                        // Attribute cho phep render ra popup voi dieu kien la
                        // visible
                        render={(attrs) => {
                            return (
                                <div className={cx('cart-result')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        {cartHeader.length > 0 && cartHeader ? (
                                            <div className={cx('cart-list')}>
                                                <ul className={cx('cart-list-item')}>
                                                    {cartHeader.map((prod, i) => {
                                                        return (
                                                            <li key={i} className={cx('cart-item')}>
                                                                <div className={cx('product-img')}>
                                                                    <div
                                                                        className={cx(
                                                                            'product-img-wrapper',
                                                                        )}
                                                                    >
                                                                        <img src={`${prod?.img}`} />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        'cart-item-infor',
                                                                    )}
                                                                >
                                                                    <Link
                                                                        to={`/product/${prod.id_product}`}
                                                                    >
                                                                        <p
                                                                            className={cx(
                                                                                'cart-item-name',
                                                                            )}
                                                                        >
                                                                            {prod.nameProduct}
                                                                        </p>
                                                                    </Link>
                                                                    <span
                                                                        className={cx(
                                                                            'cart-item-price',
                                                                        )}
                                                                    >
                                                                        {formatPrice(
                                                                            prod.priceProduct,
                                                                        )}
                                                                    </span>
                                                                    <div
                                                                        className={cx(
                                                                            'cart-item-quantity',
                                                                        )}
                                                                    >
                                                                        <p>
                                                                            Size:{' '}
                                                                            <span>
                                                                                {prod?.size.replace(
                                                                                    /[\[\]"]+/g,
                                                                                    '',
                                                                                )}
                                                                            </span>
                                                                        </p>
                                                                        <p>
                                                                            x
                                                                            <span>
                                                                                {prod?.quantity}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className={cx('cart-wrapper')}>
                                                <img src={images.emptyCart} />
                                                <p>Bạn chưa có sản phẩm nào!!!</p>
                                            </div>
                                        )}
                                    </PopperWrapper>
                                </div>
                            );
                        }}
                    >
                        <div className={cx('nav-link')} onClick={handleClickCart}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_55_779)">
                                    <path
                                        d="M16.2986 20.2248C16.3377 20.2313 16.3766 20.2345 16.415 20.2345C16.7525 20.2345 17.0504 19.9908 17.1077 19.6468L17.8109 15.4281C17.8747 15.0451 17.616 14.6828 17.2329 14.6189C16.8498 14.5549 16.4876 14.8138 16.4237 15.1969L15.7206 19.4156C15.6568 19.7987 15.9155 20.161 16.2986 20.2248Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M7.93937 19.6468C7.99669 19.9907 8.29454 20.2345 8.63208 20.2345C8.67048 20.2345 8.70938 20.2314 8.74852 20.2248C9.13159 20.161 9.39034 19.7987 9.32649 19.4156L8.62337 15.1969C8.55952 14.8138 8.19732 14.5551 7.81421 14.6189C7.43115 14.6828 7.1724 15.045 7.23624 15.4281L7.93937 19.6468Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M23.7969 8.98437H21.3223L15.9084 2.21702C15.6659 1.91388 15.2234 1.86462 14.9202 2.10724C14.6169 2.34982 14.5677 2.79227 14.8104 3.09551L19.5215 8.98437H5.47855L10.1897 3.09551C10.4323 2.79227 10.3831 2.34977 10.0799 2.10724C9.77661 1.86462 9.33416 1.91384 9.09163 2.21702L3.6777 8.98437H1.20312C0.814812 8.98437 0.5 9.29918 0.5 9.68749V12.5C0.5 12.8883 0.814812 13.2031 1.20312 13.2031H2.07903L4.74584 22.5369C4.83205 22.8388 5.10795 23.0469 5.42188 23.0469H19.5781C19.892 23.0469 20.168 22.8388 20.2542 22.5369L22.921 13.2031H23.7969C24.1852 13.2031 24.5 12.8883 24.5 12.5V9.68749C24.5 9.29918 24.1852 8.98437 23.7969 8.98437ZM19.0478 21.6406H5.95222L3.54153 13.2031H21.4585L19.0478 21.6406ZM23.0938 11.7969C20.6851 11.7969 4.18813 11.7969 1.90625 11.7969V10.3906H23.0938V11.7969Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M12.5 20.2344C12.8883 20.2344 13.2031 19.9196 13.2031 19.5312V15.3125C13.2031 14.9242 12.8883 14.6094 12.5 14.6094C12.1117 14.6094 11.7969 14.9242 11.7969 15.3125V19.5312C11.7969 19.9196 12.1117 20.2344 12.5 20.2344Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_55_779">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0.5 0.5)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            {totalProduct > 0 && (
                                <span className={cx('badge')}>{totalProduct}</span>
                            )}
                        </div>
                    </HeadlessTippy>
                    {/* {console.log(state.cuser.value)}        */}
                    {state.cuser.value !== '' && <DropdownAccount />}
                </div>
            </div>
            {isSuccess && <ModalMessage setIsSuccess={setIsSuccess} msg={'You need to login'} />}
        </nav>
    );
}

export default Header;
