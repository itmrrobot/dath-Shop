import styles from './RelatedProduct.module.scss';
import classNames from 'classnames/bind';
import productImg from '../../assets/img/image 4.png';
import starIcon from '../../assets/img/star-vote.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';

const cx = classNames.bind(styles);

function RelatedProduct({ ...props }) {
    const [data, setData] = useState([]);
    const { categoryId } = props;
    let products = data && data.products?.filter((p) => p.categoryId === categoryId)?.slice(0, 5);
    console.log(data.products?.filter((p) => p.categoryId === categoryId));
    console.log(categoryId);
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(`${url}/products`, {
                    signal: controller.signal,
                });
                setData(respone.data);
                //setImgs(respone.data.hinh_anh)
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, []);
    return (
        <div className={cx('wrap')}>
            <h3 className={cx('title')}>Similar Items You Might Also Like</h3>
            <div className={cx('list')}>
                {data.products &&
                    products.map((product, index) => {
                        let imgs = product?.img;
                        return (
                            <div key={index} className={cx('item')}>
                                <img src={`${imgs[0]}`} alt="" className={cx('img')} />
                                <h5 className={cx('product-title')}>{product.ten_san_pham}</h5>
                                <p className={cx('price')}>
                                    {product?.gia_khuyen_mai?.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </p>
                                <p className={cx('quantity')}>5 types of shoos available</p>
                                <div className={cx('vote')}>
                                    <div className={cx('vote-star')}>
                                        <img
                                            src={starIcon}
                                            alt="star-icon"
                                            className={cx('icon')}
                                        />
                                        <img
                                            src={starIcon}
                                            alt="star-icon"
                                            className={cx('icon')}
                                        />
                                        <img
                                            src={starIcon}
                                            alt="star-icon"
                                            className={cx('icon')}
                                        />
                                        <img
                                            src={starIcon}
                                            alt="star-icon"
                                            className={cx('icon')}
                                        />
                                        <img
                                            src={starIcon}
                                            alt="star-icon"
                                            className={cx('icon')}
                                        />
                                    </div>
                                    <span className={cx('vote-number')}>(121)</span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default RelatedProduct;
