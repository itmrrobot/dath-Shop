import classNames from 'classnames/bind';
import styles from './ProductSection.module.scss';
import { url } from '../../../constants';
import SliderHome from '../SliderHome';
import images from '../../../assets/img';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../common';
import { toast } from 'react-toastify';
import { UseContextUser } from '../../../hooks/useContextUser';
const cx = classNames.bind(styles);
function ProductSection({ brandId }) {
    const [products, setProduct] = useState([]);
    const state = useContext(UseContextUser);
    useEffect(() => {
        axios.get(`${url}/products?brandId=${brandId}`).then((res) => {
            // Trả về 1 mảng [sản phẩm]
            setProduct(res.data.products);
        });
    }, [brandId]);
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
    return (
        <div className={cx('wrapper')}>
            <SliderHome>
                {brandId &&
                    products.length > 0 &&
                    products?.map((product, i) => {
                        // console.log(slide[0].name);
                        return (
                            <>
                                <div
                                    key={i}
                                    className={cx('item-wrapper')}
                                    // style={{ width: '90%', backgroundColor: 'red' }}
                                >
                                    <div className={cx('product-img')}>
                                        <div className={cx('product-img-wrapper')}>
                                            <img src={`${product.img[0]}`} alt={product.name} />
                                            <img
                                                src={`${product.img[1]}`}
                                                alt="rear_product_image"
                                                className={cx('rear-img')}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('content')}>
                                        {/* <p className={cx('name')}>{prod.name}</p> */}
                                        <Link
                                            to={`/product/${product.id}`}
                                            onClick={() =>
                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                            }
                                        >
                                            <p className={cx('name')}>{product.name}</p>
                                        </Link>
                                        <p className={cx('price')}>
                                            {formatPrice(product.discount_price)}
                                        </p>
                                        <p className={cx('old-price')}>
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
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
                                    {/* <div className={cx('loved')}>
                                        <img src={images.unheart} alt="" />
                                    </div> */}
                                </div>
                            </>
                        );
                    })}
            </SliderHome>
        </div>
    );
}

export default ProductSection;
