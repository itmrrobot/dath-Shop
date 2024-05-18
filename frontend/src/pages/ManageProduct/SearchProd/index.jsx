import HeadlessTippy from '@tippyjs/react/headless';
// import * as searchService from '~/apiServices/searchService';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
// import AccountItem from '~/components/AccountItem';
import { faCircleXmark, faSpinner, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '../../../components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchProd.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useContext, useMemo } from 'react';
// import { useDebounce } from "~/hooks";
import useDebounce from '../../../hooks/useDebounce';
import axios from 'axios';
import ModalDetailProduct from '../ModalDetailProduct';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { url } from '../../../constants';

const cx = classNames.bind(styles);
function SearchProd({ render }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [prodInfor, setProdInfor] = useState({});
    const [itemId, setItemId] = useState();
    const [products, setProducts] = useState([]);
    // console.log(!!searchValue);
    const [renders, setRenders] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);
    console.log(loading);

    const handleOk = async () => {
        setIsModalOpen(false);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // .then((res) => console.log(res));
        try {
            // console.log(dataPost);
            // console.log(state?.cuser?.value);
            await delay(2000); // Chờ 2 giây
            const res = await axios.delete(`${url}/products/delete/${itemId}`);
            console.log(res);
            // setOrder(dataUpdate);
            toast.success('Xoá sản phẩm thành công', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
            render((prev) => !prev);
            setRenders((prev) => !prev);
            handleClear();
        } catch (error) {
            // Xử lý lỗi nếu có
            toast.error(`Xoá sản phẩm thất bại => Error: ${error}`, {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
        }
    };
    const debounce = useDebounce(searchValue, 3000);
    const inputRef = useRef();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [showModal, setShowModal] = useState(false);
    // Call API get data
    // Sau khi Web duoc mounted (lan dau tien) => thuc hien call API get data bang useEffect
    //
    useEffect(() => {
        // fetch : Lay duong link API
        // Cấu trúc URL:
        // + https:// -> là giao thức http
        // + //tiktok (subdomain): Tên miền con của tên miền chính
        axios.get(`${url}/products`).then((res) => {
            // Trả về 1 mảng [sản phẩm]
            setProducts(res.data.products);
        });
    }, [renders]);
    const filterSearch = useMemo(() => {
        const productFilter = products.filter((product) => {
            if (!debounce.trim()) {
                setSearchResult([]);
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
    useEffect(() => {
        setSearchResult(filterSearch);
    }, [filterSearch]);
    const handleClear = () => {
        console.log('Hello');
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResults(false);
    };

    const showModalDelete = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <HeadlessTippy
                // Cho phep duoc active thanh phan trong Tippy
                interactive={true}
                //
                appendTo={() => document.body}
                // Xuất hiện (visible) với 1 điều kiện nào đó
                visible={showResults && searchResult.length > 0}
                placement="bottom-end"
                // attr render
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Search Results: {searchResult.length} result
                            </h4>
                            <div className={cx('search-result-wrapper')}>
                                {searchResult?.map((result) => {
                                    // console.log(result);
                                    return (
                                        <div className={cx('result')}>
                                            {/* <img
                                    className={cx('avatar')}
                                    src={`https://shoesshop-6n6z.onrender.com/imgs/${result?.img}`}
                                    alt={result?.name}
                                /> */}
                                            <div className={cx('product-img')}>
                                                <div className={cx('product-img-wrapper')}>
                                                    <img src={`${result?.img[0]}`} />
                                                </div>
                                            </div>
                                            <div className={cx('info')}>
                                                <h4
                                                    className={cx('name')}
                                                    onClick={() => {
                                                        handleClear();
                                                        handleShow();
                                                        setProdInfor(result);
                                                    }}
                                                >
                                                    <span>{result?.name}</span>
                                                </h4>
                                                <span className={cx('prod-id')}>
                                                    Product ID: {result?.id}
                                                </span>
                                                <div
                                                    className={cx('remove-btn')}
                                                    data-label="Remove"
                                                    onClick={() => {
                                                        showModalDelete();
                                                        handleHideResult();
                                                        setItemId(result?.id);
                                                    }}
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                {/* + Search */}
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Using name to Search Product"
                        spellCheck={false}
                        onChange={(e) => {
                            e.target.value = e.target.value.trimStart();
                            setSearchValue(e.target.value);
                        }}
                        onFocus={() => setShowResults(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
            <ModalDetailProduct
                show={showModal}
                handleClose={handleClose}
                prodID={prodInfor?.id}
            ></ModalDetailProduct>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn xoá sản phẩm này không?</p>
            </Modal>
        </>
    );
}

export default SearchProd;
