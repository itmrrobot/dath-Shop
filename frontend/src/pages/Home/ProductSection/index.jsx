import classNames from 'classnames/bind';
import styles from './ProductSection.module.scss';
import { url } from '../../../constants';
import SliderHome from '../SliderHome';
import images from '../../../assets/img';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../common';
const cx = classNames.bind(styles);
function ProductSection({ brandId }) {
    const [products, setProduct] = useState([]);
    console.log(products);
    useEffect(() => {
        axios.get(`${url}/products?brandId=${brandId}`).then((res) => {
            // Trả về 1 mảng [sản phẩm]
            setProduct(res.data.products);
        });
    }, [brandId]);
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
                                    <div className={cx('loved')}>
                                        <img src={images.unheart} alt="" />
                                    </div>
                                </div>
                            </>
                        );
                    })}
            </SliderHome>
        </div>
    );
}

export default ProductSection;
