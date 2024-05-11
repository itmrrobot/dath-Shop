import styles from './WishList.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import images from '../../assets/img';
import { Link } from 'react-router-dom';
import { url } from '../../constants';
import { toast } from 'react-toastify';
import { UseContextUser } from '../../hooks/useContextUser';

const cx = classNames.bind(styles);
function WishList() {
    const user_id = useParams();
    const [products, setProducts] = useState([]);
    const [render, setRender] = useState(false);
    const state = useContext(UseContextUser);
    useEffect(() => {
        const fetchData = async () => {
            const reponse = await axios.get(`${url}/wishlist/${user_id.id}`);
            setProducts(reponse.data);
        };
        fetchData();
    }, [render]);
    const handleRemoveProduct = (id) => {
        const fetchData = async () => {
            const response = await axios.delete(`${url}/wishlist/delete/${id}`);
            // console.log(response);
            toast.success(`${response.data.msg}`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: 'light',
                theme: 'colored',
            });
            setRender((prev) => !prev);
            state?.render?.setRender((prev) => !prev);
        };
        fetchData();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-products')}>
                {products.length > 0 ? (
                    <div className={cx('products-list')}>
                        {products.map((product, index) => {
                            console.log(product);
                            return (
                                <div className={cx('product')} key={index}>
                                    <Link
                                        to={`/product/${product.id_product}`}
                                        className={cx('product-link')}
                                    >
                                        <div className={cx('product-img')}>
                                            <div className={cx('product-img-wrapper')}>
                                                <img
                                                    src={product.img}
                                                    alt="product"
                                                    className={cx('img')}
                                                />
                                                <img
                                                    src={product.img}
                                                    alt="rear product image"
                                                    className={cx('rear-img')}
                                                />
                                            </div>
                                        </div>
                                        <p className={cx('desc')}>{product.nameProduct}</p>
                                        <div className={cx('wrap-all')}>
                                            <div className={cx('wrap-price')}>
                                                <span className={cx('price')}>
                                                    {product?.priceProduct?.toLocaleString(
                                                        'it-IT',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        },
                                                    )}
                                                </span>
                                                {/* <span className={cx('unused-price')}>
                                                {product?.price?.toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span> */}
                                            </div>
                                            {/* <div className={cx('wrap-orders-category')}>
                                                <span className={cx('order-number')}>
                                                    24 Orders
                                                </span>
                                                <span className={cx('category-name')}>
                                                    New Arrivals
                                                </span>
                                            </div> */}
                                        </div>
                                    </Link>
                                    <div
                                        className={cx('loved')}
                                        onClick={() => handleRemoveProduct(product.id)}
                                    >
                                        {/* <img src={images.unheart} alt="" /> */}
                                        <span className={cx('delete')}>&times;</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={cx('notification')}>
                        {/* <h1>Xin chao</h1> */}
                        <p>Chưa có wishlist</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishList;
