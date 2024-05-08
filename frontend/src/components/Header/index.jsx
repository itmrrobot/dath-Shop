import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import DropdownAccount from '../DropdownAccount';
import { useState, useMemo, useRef, useEffect, useContext } from 'react';
import ModalMessage from '../ModalMessage';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import images from '../../assets/img';
import { UseContextUser } from '../../hooks/useContextUser';
import 'tippy.js/dist/tippy.css'; // optional
import { Wrapper as PopperWrapper } from '../Popper';
import axios from 'axios';
import Search from '../Layout/components/Search';
import { formatPrice } from '../../common';
import Button from '../Button';
import { url } from '../../constants';
const cx = classNames.bind(styles);

function Header() {
    // const {setSearchContent} = FilterState();
    const state = useContext(UseContextUser);
    // console.log(state.cuser.value);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cartHeader, setCartHeader] = useState([]);
    const navigate = useNavigate();
    const totalProduct = useMemo(() => {
        return cartHeader.reduce((acc, cur) => {
            return acc + Number(cur?.quantity);
        }, 0);
    }, [cartHeader]);
    const handleClickCart = () => {
        navigate('/cart');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                const baseUrl = `${url}/products`;
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
                        <Link
                            className={cx('nav-link')}
                            to="/products?page=1&limit=9"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <Button text>Store</Button>
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
                            <Button
                                text
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <p className={cx('nav-link')}>Account</p>
                            </Button>
                        </HeadlessTippy>
                    )}
                    {state?.cuser?.value === '' ? (
                        <Tippy delay={[0, 50]} content="Your Favourites!" placement="bottom">
                            <Button
                                text
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Wish List
                            </Button>
                        </Tippy>
                    ) : (
                        <Tippy delay={[0, 50]} content="Your Favourites!" placement="bottom">
                            <Link
                                to={`/user/wishlist/${state?.cuser?.value?.id}`}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <Button text>Wish List</Button>
                            </Link>
                        </Tippy>
                    )}
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
                            <Button
                                icon={
                                    <img
                                        className={cx('cart-img')}
                                        src={images.cart}
                                        alt="logo-cart"
                                    />
                                }
                            ></Button>
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
