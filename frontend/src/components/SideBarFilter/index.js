import { useEffect, useState } from 'react';
import styles from './SideBarFilter.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { url } from '../../constants';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './priceSlider.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBarFilter() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('All');
    const [brands, setBrands] = useState('');
    const [categories, setCategories] = useState(0);
    const [price, setprice] = useState([0, 400000000]);

    const categoryId = searchParams.get('categoryId');
    const type = searchParams.get('type');
    const brand = searchParams.get('brand');
    const price_gte = searchParams.get('price_gte');
    const price_lte = searchParams.get('price_lte');

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(url + '/category', {
                    signal: controller.signal,
                });
                setData(respone.data);
                console.log(respone.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, []);

    const handleClick = (e) => {
        // let newFilterId = [];
        // if(e.target.checked) {
        //     setFilterId([...filterId,e.target.name]);
        // } else {
        //     newFilterId=filterId.filter((i) => i!==e.target.name);
        //     setFilterId([...newFilterId]);
        // }
    };
    const handleFilterPrice = () => {
        var redirectToURL = `/products?page=1&limit=15`;
        if (type) {
            redirectToURL += `&type=${type}`;
        }
        if (brand) {
            redirectToURL += `&brand=${brand}`;
        }
        if (categoryId) {
            redirectToURL += `&categoryId=${categoryId}`;
        }
        navigate(redirectToURL + `&price_gte=${price[0]}&price_lte=${price[1]}`);
    };
    const handleFilterForBrands = (brand) => {
        var redirectToURL = `/products?page=1&limit=15`;
        if (type) {
            redirectToURL += `&type=${type}`;
        }
        navigate(redirectToURL + `&brand=${brand}`);
        setBrands(brand);
    };
    const handleFilterForCategories = (categoryId) => {
        var redirectToURL = `/products?page=1&limit=15`;
        if (type) {
            redirectToURL += `&type=${type}`;
        }
        if (brand) {
            redirectToURL += `&brand=${brand}`;
        }
        if (price_gte && price_lte) {
            redirectToURL += `&&price_gte=${price_gte}&price_lte=${price_lte}`;
        }
        navigate(redirectToURL + `&categoryId=${categoryId}`);
        setCategories(categoryId);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('sidebar-wrapper')}>
                    <div className={cx('sidebar-section')}>
                        <p className={cx('title')}>Prices</p>
                        <div className={cx('range')}>
                            <p>Range</p>
                            <div className={cx('number')}>
                                <span>
                                    {price[0].toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>{' '}
                                -{' '}
                                <span>
                                    {price[1].toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            </div>
                        </div>
                        <RangeSlider
                            id="range-slider-yellow"
                            value={price}
                            onInput={setprice}
                            min={0}
                            max={400000000}
                            step={10000}
                        />
                        <div className={cx('filter-wrapper')}>
                            <button
                                className={cx('filter_price_btn')}
                                onClick={() => handleFilterPrice()}
                            >
                                Lọc
                            </button>
                        </div>
                    </div>
                    <div className={cx('sidebar-section')}>
                        <p className={cx('title')}>FILTERS</p>
                        <div className={cx('ckb-wrapper')}>
                            <div
                                className={cx('item')}
                                onClick={() => {
                                    setFilter('All');
                                }}
                            >
                                <Link to={'/products?page=1&limit=15'}>
                                    <span className={cx('name', filter === 'All' && 'active')}>
                                        All
                                    </span>
                                </Link>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => {
                                    setFilter('Women');
                                }}
                            >
                                <Link to={'/products?page=1&limit=15&type=Women'}>
                                    <span className={cx('name', filter === 'Women' && 'active')}>
                                        Women
                                    </span>
                                </Link>
                                {/* <span className={cx('name')}>Women</span> */}
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => {
                                    setFilter('Men');
                                }}
                            >
                                <Link to={'/products?page=1&limit=15&type=Men'}>
                                    <span className={cx('name', filter === 'Men' && 'active')}>
                                        Men
                                    </span>
                                </Link>
                                {/* <span className={cx('name')}>Men</span> */}
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => {
                                    setFilter('Wjewelry');
                                }}
                            >
                                <Link to={'/products?page=1&limit=15&type=WomenJewelry'}>
                                    <span className={cx('name', filter === 'Wjewelry' && 'active')}>
                                        Women's jewelry
                                    </span>
                                </Link>
                                {/* <span className={cx('name')}>Women's jewelry</span> */}
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => {
                                    setFilter('Mjewelry');
                                }}
                            >
                                <Link to={'/products?page=1&limit=15&type=MenJewelry'}>
                                    <span className={cx('name', filter === 'Mjewelry' && 'active')}>
                                        Men's jewelry
                                    </span>
                                </Link>
                                {/* <span className={cx('name')}>Men's jewelry</span> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('sidebar-section')}>
                        <p className={cx('title')}>BRANDS</p>
                        <div className={cx('ckb-wrapper')}>
                            <div className={cx('item')} onClick={() => handleFilterForBrands('HM')}>
                                <span className={cx('name', brands === 'HM' && 'active')}>H&M</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('MarkSpencer')}
                            >
                                <span className={cx('name')}>Mark & Spencer</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Victoria’sSecret')}
                            >
                                <span className={cx('name')}>Victoria’s Secret</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Dior')}
                            >
                                <span className={cx('name')}>Dior</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Gucci')}
                            >
                                <span className={cx('name')}>Gucci</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Fendi')}
                            >
                                <span className={cx('name')}>Fendi</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Prada')}
                            >
                                <span className={cx('name')}>Prada</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Versace')}
                            >
                                <span className={cx('name')}>Versace</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('DolceGabbana')}
                            >
                                <span className={cx('name')}>Dolce & Gabbana</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Zara')}
                            >
                                <span className={cx('name')}>Zara</span>
                            </div>
                            <div
                                className={cx('item')}
                                onClick={() => handleFilterForBrands('Chanel')}
                            >
                                <span className={cx('name')}>Chanel</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sidebar-section')}>
                        <p className={cx('title')}>CATEGORIES</p>
                        <div className={cx('ckb-wrapper')}>
                            {data?.category !== null &&
                                data?.category?.map((item, index) => {
                                    // console.log(item);
                                    return (
                                        <div
                                            className={cx('item')}
                                            key={index}
                                            onClick={() => handleFilterForCategories(item.id)}
                                        >
                                            {/* <input
                                                type="checkbox"
                                                name={item?.id}
                                                className={cx('input')}
                                                onChange={handleClick}
                                            /> */}
                                            <span
                                                className={cx(
                                                    'name',
                                                    categories === item.id && 'active',
                                                )}
                                            >
                                                {item?.category_name}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    {/* <div className={cx('sidebar-section')}>
                        <p className={cx('title')}>SIZE</p>
                        <div className={cx('ckb-wrapper')}>
                            <div className={cx('item')}>
                                <span className={cx('name')}>Medium</span>
                            </div>
                            <div className={cx('item')}>
                                <span className={cx('name')}>Large</span>
                            </div>
                            <div className={cx('item')}>
                                <span className={cx('name')}>Plus Size</span>
                            </div>
                            <div className={cx('item')}>
                                <span className={cx('name')}>Sexy Plus Size</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default SideBarFilter;
