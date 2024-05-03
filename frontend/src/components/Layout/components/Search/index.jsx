import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Wrapper as PopperWrapper } from '../../../Popper';
// import ProductItem from '~/components/AccountItem';
import images from '../../../../assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
    const [loading, setLoading] = useState(true);
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
    const filterSearch = useMemo(() => {
        const productFilter = products.filter((product) => {
            if (!debounce.trim()) {
                setSearchResult([]);
                setSuggest([]);
                return;
            }
            // console.log(product.name);
            if (product.name !== null) {
                let indexItem = product.name.toLowerCase().includes(debounce.toLowerCase());
                return indexItem;
            }
        });

        return productFilter;
    }, [debounce]);

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
    }, [filterSearch]);
    // const handleClear = () => {
    //     setSearchValue('');
    //     setSearchResult([]);

    //     inputRef.current.focus();
    // };
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
            // trigger="click"
            // placement="bottom-end"
            // Attribute cho phep render ra popup voi dieu kien la
            // visible
            render={(attrs) => {
                return (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper overflow>
                            <p className={cx('title-search-result')}>Gợi ý sản phẩm</p>

                            <div className={cx('recommendation-child')}>
                                {suggest &&
                                    suggest.map((sug, index) => {
                                        return (
                                            <Tippy delay={[0, 50]} content={sug} placement="bottom">
                                                {/* <Button
                                                        text
                                                        onClick={() => {
                                                            navigator('/product?_page=1&_limit=9');
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                    >
                                                        Store
                                                    </Button> */}
                                                <p className={cx('recommend-content')}>{sug}</p>
                                            </Tippy>
                                        );
                                    })}
                            </div>

                            {searchResult.map((result) => (
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
                            ))}
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
