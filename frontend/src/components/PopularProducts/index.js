import styles from './PopularProducts.module.scss';
import classNames from 'classnames/bind';
import Rectangle1394 from '../../assets/img/Rectangle1394.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { Link } from 'react-router-dom';
import ContentSection from '../ContentSection';
const cx = classNames.bind(styles);

function PopularProducts() {
    const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(false);
    let newProducts = data && data?.products?.filter((p) => p?.so_luong_ban >= 100)?.slice(0, 4);
    useEffect(() => {
        const control = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(url + '/products', {
                    signal: control.signal,
                });
                setData(respone.data);
                setIsLoading(true);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        return () => {
            control.abort();
        };
    }, []);
    return (
        <div className={cx('wrap')}>
            <ContentSection name="Featured Products" navigation upper>
                <div className={cx('products')}>
                    {newProducts?.map((product, index) => {
                        let imgs = product?.img;
                        return (
                            <Link to={`/product/${product.id}`} className={cx('item')} key={index}>
                                <img
                                    src={`${imgs[0]}`}
                                    alt="Rectangle-1394"
                                    className={cx('img')}
                                />
                            </Link>
                        );
                    })}
                </div>
            </ContentSection>
        </div>
    );
}

export default PopularProducts;
