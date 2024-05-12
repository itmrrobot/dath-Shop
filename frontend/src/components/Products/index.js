import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import SideBarFilter from '../SideBarFilter';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { url } from '../../constants';
import { Link } from 'react-router-dom';
import images from '../../assets/img';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBaseball,
    faChevronDown,
    faChevronUp,
    faSortDown,
    faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { UseContextUser } from '../../hooks/useContextUser';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import { StoreContext } from '../PageLoading/store';
import { actions } from '../PageLoading/store';

const cx = classNames.bind(styles);

function Products() {
    const location = useLocation();
    const navigate = useNavigate();
    // const [isLoading, dispatch] = useContext(StoreContext);
    const [selected, setSelected] = useState('All');
    const [productsPerPage, setProductPerPage] = useState([]);
    const [, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [display, setDisplay] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const price_gte = searchParams.get('price_gte');
    const price_lte = searchParams.get('price_lte');
    const type = searchParams.get('type');
    const brandId = searchParams.get('brandId');
    const filter = searchParams.get('order');
    const categoryId = searchParams.get('categoryId');
    const sort = searchParams.get('sort');
    const state = useContext(UseContextUser);
    const [isLoading, dispatch] = useContext(StoreContext);

    const numPages = (n) => {
        const arrPage = Math.ceil(+n / 9);
        return arrPage;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/products`, {
                    params: {
                        page: page,
                        limit: limit,
                        brandId: brandId,
                        // type: type,
                        price_gte: price_gte,
                        price_lte: price_lte,
                        // _sort: sort,
                        order: filter,
                        categoryId: categoryId,
                    },
                });
                // console.log('re-render');
                // response.headers('X-Total-Count', )
                const xTotalCount = response.headers['x-total-count'];
                setTotalPages(numPages(Number(+xTotalCount)));
                setProductPerPage(response.data.products);
                setDisplay(false);
                sort ? setSelected((prev) => prev) : setSelected('All');
                dispatch(actions.setLoading(false));
            } catch (error) {
                console.error(error);
            }
        };
        dispatch(actions.setLoading(true));
        setTimeout(async () => {
            await fetchData();
        }, 1000);
        // dispatch(actions.setLoading(true));
    }, [page, price_gte, price_lte, filter, categoryId, brandId, limit, sort]);

    const handleDropItem = (select, path = '') => {
        if (selected !== select) {
            setSelected(select);
            var redirectToURL = `/products?page=1&limit=9`;
            if (type) {
                redirectToURL += `&type=${type}`;
            }
            if (brandId) {
                redirectToURL += `&brandId=${brandId}`;
            }
            if (categoryId) {
                redirectToURL += `&categoryId=${categoryId}`;
            }
            if (price_gte && price_lte) {
                redirectToURL += `&price_gte=${price_gte}&price_lte=${price_lte}`;
            }

            if (path === '') {
                navigate(redirectToURL);
            } else {
                navigate(redirectToURL + `&sort=price&order=${path}`);
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setDisplay(false);
    };
    const handleRemoveWishList = (id) => {
        const wishlistObj = state?.wishlist?.value.find((item) => item.id_product === id);
        // console.log(wishlistObj);
        const fetchData = async () => {
            try {
                await axios.delete(`${url}/wishlist/delete/${wishlistObj.id}`);
                state?.render?.setRender((prev) => !prev);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };
    const handleAddWishList = (payload) => {
        const data = {
            id_user: state?.cuser?.value?.id,
            id_product: payload.id,
            nameProduct: payload.name,
            priceProduct: payload.discount_price,
            img: `${payload.img[0]}`,
        };
        const fetchData = async () => {
            try {
                await axios.post(`${url}/wishlist/create`, data);
                // toast.success(`Add product ${payload.name} to wishlist success`, {
                //     position: 'top-right',
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     // theme: 'light',
                //     theme: 'colored',
                // });
                state?.render?.setRender((prev) => !prev);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };
    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
        searchParams.set('page', +e.selected + 1);
        searchParams.set('limit', '9');
        navigate(`/products?${searchParams.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleClickOut = function (event) {
        setDisplay(false);
    };

    window.addEventListener('click', handleClickOut);
    return (
        <div className={cx('wrap')}>
            <div className={cx('quantity-filter-wrapper')}>
                <div className={cx('filter')}>
                    <p>Sort by:</p>
                    <p
                        className={cx('filter-name')}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDisplay((prev) => !prev);
                        }}
                    >
                        {selected}
                    </p>
                </div>
                <div className={cx('dropdown')}>
                    <div
                        className={cx('dropdown-btn', display ? 'active' : '')}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDisplay((prev) => !prev);
                        }}
                    >
                        {display ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                        )}
                    </div>

                    <div className={cx('dropdown-content', display ? 'active' : '')}>
                        <div className={cx('dropdown-item')} onClick={() => handleDropItem('All')}>
                            <FontAwesomeIcon icon={faBaseball} />
                            <p className={cx('option')}>All</p>
                        </div>
                        <div
                            className={cx('dropdown-item')}
                            onClick={() => handleDropItem('Price Low to High', 'asc')}
                        >
                            <FontAwesomeIcon icon={faSortUp} />
                            <p className={cx('option')}>Price Low to High</p>
                        </div>
                        <div
                            className={cx('dropdown-item')}
                            onClick={() => handleDropItem('Price High to Low', 'desc')}
                        >
                            <FontAwesomeIcon icon={faSortDown} />
                            <p className={cx('option')}>Price High to Low</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper')}></div>
            <div className={cx('container')}>
                <SideBarFilter />
                <div className={cx('wrap-products')}>
                    <div className={cx('products-list')}>
                        {productsPerPage?.map((product, index) => {
                            let imgs = product?.img;
                            console.log(imgs);
                            // console.log(product.id);
                            return (
                                product !== null && (
                                    <div className={cx('product')} key={index}>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className={cx('product-link')}
                                        >
                                            <div className={cx('product-img')}>
                                                <div className={cx('product-img-wrapper')}>
                                                    <img
                                                        src={`${imgs[0]}`}
                                                        alt="product"
                                                        className={cx('img')}
                                                    />
                                                    <img
                                                        src={`${imgs[1]}`}
                                                        alt="rear_product_image"
                                                        className={cx('rear-img')}
                                                    />
                                                </div>
                                            </div>
                                            <p className={cx('desc')}>{product.name}</p>
                                            <div className={cx('wrap-all')}>
                                                <div className={cx('wrap-price')}>
                                                    {product?.discount_price == product?.price ? (
                                                        <>
                                                            <span className={cx('price')}>
                                                                {product?.price?.toLocaleString(
                                                                    'it-IT',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    },
                                                                )}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={cx('price')}>
                                                                {product?.discount_price?.toLocaleString(
                                                                    'it-IT',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    },
                                                                )}
                                                            </span>
                                                            <span className={cx('unused-price')}>
                                                                {product?.price?.toLocaleString(
                                                                    'it-IT',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    },
                                                                )}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className={cx('wrap-orders-category')}>
                                                    <span className={cx('order-number')}>
                                                        24 Orders
                                                    </span>
                                                    <span className={cx('category-name')}>
                                                        New Arrivals
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        {state?.cuser?.value !== '' &&
                                            (state?.wishlist?.value.some(
                                                (item) => item.id_product === product.id,
                                            ) ? (
                                                <div
                                                    className={cx('loved')}
                                                    onClick={() => handleRemoveWishList(product.id)}
                                                >
                                                    <img src={images.heart_wishlist} alt="" />
                                                    {/* <p>Có tồn tại</p> */}
                                                </div>
                                            ) : (
                                                <div
                                                    className={cx('loved')}
                                                    onClick={() => handleAddWishList(product)}
                                                >
                                                    <img src={images.unheart} alt="" />
                                                </div>
                                            ))}
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={cx('pagination')}>
                {/* {console.log('Hello')} */}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    // pageRangeDisplayed={10}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    pageClassName={cx('page-item')}
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </div>
    );
}

export default Products;
