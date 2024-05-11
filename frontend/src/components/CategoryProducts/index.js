import styles from './CategoryProducts.module.scss';
import classNames from 'classnames/bind';
import Rectangle1389 from '../../assets/img/Rectangle1389.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import images from '../../assets/img';
import ContentSection from '../ContentSection';
const cx = classNames.bind(styles);

function CategoryProducts() {
    const [isBlur, setIsBlur] = useState(false);
    const [data, setData] = useState([]);
    let newData = data.category?.slice(0, 4);
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const respone = await axios.get(`${url}/category`, {
                    signal: controller.signal,
                });
                // console.log(respone);
                setData(respone.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        return () => controller.abort();
    }, []);

    const handleClick = () => {};

    const handleBlur = (e) => {
        setIsBlur(!isBlur);
    };

    return (
        <div className={cx('category-products')}>
            <ContentSection name="Product Catalogue">
                <div className={cx('wrap')}>
                    <div className={cx('item')} onClick={handleClick}>
                        <img
                            src={images.thumbnail1}
                            onBlur={handleBlur}
                            className={cx('img')}
                            alt="Rectangle 1389"
                        />
                        <div className={cx('card-body')}>
                            <p className={cx('card-title')}>Catalogue</p>
                            <p className={cx('card-sub-title')}>Vest</p>
                            {/* <p className={cx('card-content')}>Comming Soon!!</p> */}
                        </div>
                    </div>
                    <div className={cx('item')} onClick={handleClick}>
                        <img
                            src={images.catalogue_hoodie}
                            onBlur={handleBlur}
                            className={cx('img')}
                            alt="Rectangle 1389"
                        />
                        <div className={cx('card-body')}>
                            <p className={cx('card-title')}>Catalogue</p>
                            <p className={cx('card-sub-title')}>Hoodie</p>
                            {/* <p className={cx('card-content')}>Comming Soon!!</p> */}
                        </div>
                    </div>
                    <div className={cx('item')} onClick={handleClick}>
                        <img
                            src={images.catalogue_thun}
                            onBlur={handleBlur}
                            className={cx('img')}
                            alt="Rectangle 1389"
                        />
                        <div className={cx('card-body')}>
                            <p className={cx('card-title')}>Catalogue</p>
                            <p className={cx('card-sub-title')}>T-Shirts</p>
                            {/* <p className={cx('card-content')}>Comming Soon!!</p> */}
                        </div>
                    </div>
                    <div className={cx('item')} onClick={handleClick}>
                        <img
                            src={images.catalogue_family}
                            onBlur={handleBlur}
                            className={cx('img')}
                            alt="Rectangle 1389"
                        />
                        <div className={cx('card-body')}>
                            <p className={cx('card-title')}>Catalogue</p>
                            <p className={cx('card-sub-title')}>Family Shirts</p>
                            {/* <p className={cx('card-content')}>Comming Soon!!</p> */}
                        </div>
                    </div>
                    {/* {newData!==null&&newData?.map((item,index) => {
                    return (
                        <div className={cx("item")} key={index} onClick={handleClick}>
                    <img src={`${url}/img/${item.hinh_anh}`} onBlur={handleBlur} className={cx("img")} alt="Rectangle 1389"/>
                    <div className={cx("middle")}>
                        <div className={cx("text")}>{item.ten_chuyen_muc}</div>
                    </div>
                </div>
                    )
                })} */}
                </div>
            </ContentSection>
        </div>
    );
}

export default CategoryProducts;
