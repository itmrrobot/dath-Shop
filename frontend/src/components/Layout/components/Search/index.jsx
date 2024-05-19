import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Wrapper as PopperWrapper } from '../../../Popper';
// import ProductItem from '~/components/AccountItem';
import images from '../../../../assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useDebounce from '../../../../hooks/useDebounce';
import axios from 'axios';
import { url } from '../../../../constants';
import Tippy from '@tippyjs/react';
const cx = classNames.bind(styles);
function Search() {
    // const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [products, setProducts] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [suggest, setSuggest] = useState([]);
    const debounce = useDebounce(searchValue, 800); // trả về data sau 1 khoảng trễ
    const inputRef = useRef();
    // console.log(products);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        setSuggest([]);
        inputRef.current.focus();
    };

    // Call API
    useEffect(() => {
        axios.get(`${url}/products`).then((res) => {
            // Trả về 1 mảng [sản phẩm]
            setProducts(res.data.products);
        });
    }, []);

    // Tra ve 1 mang chua nhung product = searchValue
    const firstFourProducts = useMemo(() => {
        return suggest.slice(0, 4);
    }, [suggest]);
    const filterSearch = useMemo(() => {
        const productFilter = products.filter((product) => {
            if (!debounce.trim()) {
                setSearchResult([]);
                setSuggest([]);
                return 0;
            } else if (product.name !== null) {
                let indexItem = product.name.toLowerCase().includes(debounce.toLowerCase());
                return indexItem;
            } else {
                return [];
            }
        });
        return productFilter.slice(0, 5);
    }, [debounce, products]);

    // Xu ly hien thi ket qua
    useEffect(() => {
        const fetchData = async () => {
            let searchPost = {
                search: debounce,
            };
            try {
                let response = await axios.post(`${url}/recommend`, searchPost);
                console.log(response);
                setSuggest(response.data.recommendations);
            } catch (error) {
                console.log('Hello');
                setSuggest([]);
            }
        };
        fetchData();
        setSearchResult(filterSearch);
    }, [filterSearch, debounce]);
    const handleHideResult = () => {
        setShowResults(false);
    };

    return (
        <HeadlessTippy
            // Cho phep duoc active thanh phan trong Tippy
            interactive
            //
            appendTo={() => document.body}
            //
            visible={showResults && searchResult.length > 0}
            // visible={showResults && searchResult.length > 0}

            // trigger="click"
            // placement="bottom-end"
            // Attribute cho phep render ra popup voi dieu kien la
            // visible
            render={(attrs) => {
                return (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper overflow>
                            {suggest && searchResult.length !== 1 && (
                                <p className={cx('title-search-result')}>Product Suggestions</p>
                            )}

                            <div className={cx('recommendation-child')}>
                                {suggest &&
                                    searchResult.length !== 1 &&
                                    firstFourProducts.map((sug, index) => {
                                        return (
                                            <Tippy delay={[0, 50]} content={sug} placement="bottom">
                                                <p
                                                    className={cx('recommend-content')}
                                                    onClick={() => {
                                                        setSearchValue(sug);
                                                    }}
                                                >
                                                    {sug}
                                                </p>
                                            </Tippy>
                                        );
                                    })}
                            </div>

                            {searchResult.length > 0 ? (
                                searchResult.map((result) => (
                                    <Link
                                        key={result.id}
                                        to={'/product/' + result.id}
                                        onClick={() => handleClear()}
                                    >
                                        {/* <ProductItem data={result} /> */}
                                        <div className={cx('wrapper')}>
                                            <img
                                                className={cx('search-icon')}
                                                src={images.search}
                                                alt="search-btn"
                                            />
                                            <p className={cx('product')}>{result.name}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className={cx('wrapper')}>
                                    {/* <img
                                className={cx('search-icon')}
                                src={images.search}
                                alt="search-btn"
                            /> */}
                                    <p className={cx('product')}>Không tìm thấy sản phẩm nào!</p>
                                </div>
                            )}
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
                    autocomplete={'off'}
                    placeholder="Search for an Item..."
                    onFocus={() => setShowResults(true)}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Cài đặt thư viện fontawesome 
                            Với mỗi icon sẽ bao gồm chuẩn fa+tên icon
                        */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />} */}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
