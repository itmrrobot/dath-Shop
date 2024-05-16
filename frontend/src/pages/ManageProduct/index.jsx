import classNames from 'classnames/bind';
import styles from './ManageProduct.module.scss';
import Header from '../../chartComp/Header';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { priceDiscount, formatPrice } from '../../common';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import ModalDetailProduct from './ModalDetailProduct';
import SearchProd from './SearchProd';
import { url } from '../../constants';
import ReactPaginate from 'react-paginate';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function ManageProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('categoryId');
    const brandId = searchParams.get('brandId');
    const [product, setProduct] = useState([]);
    const [itemId, setItemId] = useState();
    const [prodInfor, setProdInfor] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [brands, setBrands] = useState();
    const [brandSelected, setBrandSelected] = useState(brandId);
    const [categories, setCategories] = useState();
    const [categorySelected, setCategorySelected] = useState(categoryId);

    // const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
    const pageCount = Math.ceil(product.length / 5); // Tổng số trang
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const offset = currentPage * 5;
    const currentPageData = product.slice(offset, offset + 5);
    // console.log();
    const [render, setRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // Modal Detail
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleReRender = () => {
        setRender((prev) => !prev);
    };
    const handleOk = async () => {
        setIsModalOpen(false);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        try {
            await delay(2000); // Chờ 2 giây
            const res = await axios.delete(`${url}/products/delete/${JSON.stringify(itemId)}`);
            // setOrder(dataUpdate);
            toast.success('Xoá sản phẩm thành công', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error(`Xoá sản phẩm thất bại => Error: ${error}`, {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            // navigator('/user/order');
            setRender((prev) => !prev);
        }
    };
    const showModalDelete = () => {
        setIsModalOpen(true);
    };
    const handleBrandsChange = (e) => {
        const selectedValue = e.target.value;
        setBrandSelected(selectedValue);
        if (selectedValue) {
            if (categorySelected) {
                navigate(
                    `/admin/manageProduct?brandId=${selectedValue}&categoryId=${categorySelected}`,
                );
            } else {
                navigate(`/admin/manageProduct?brandId=${selectedValue}`);
            }
        } else {
            if (categorySelected) {
                navigate(`/admin/manageProduct?categoryId=${categorySelected}`);
            } else {
                navigate(`/admin/manageProduct`);
            }
        }
    };
    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setCategorySelected(selectedValue);
        if (selectedValue) {
            if (brandSelected) {
                navigate(
                    `/admin/manageProduct?brandId=${brandSelected}&categoryId=${selectedValue}`,
                );
            } else {
                navigate(`/admin/manageProduct?categoryId=${selectedValue}`);
            }
        } else {
            if (brandSelected) {
                navigate(`/admin/manageProduct?brandId=${brandSelected}`);
            } else {
                navigate(`/admin/manageProduct`);
            }
        }
    };
    console.log(product);
    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(`${url}/products`, {
                params: {
                    brandId: brandSelected,
                    categoryId: categorySelected,
                },
            });
            let responseBrand = await axios.get(`${url}/brand`);
            let responseCategory = await axios.get(`${url}/category`);
            setProduct(res.data.products);
            setBrands(responseBrand.data.brand);
            setCategories(responseCategory.data.category);
        };
        fetchData();
    }, [render, brandSelected, categorySelected]);
    return (
        <>
            <div className={cx('wrapper')}>
                <Header title="MANAGE PRODUCT" subtitle="View & Managing Product!" />
                <div className={cx('total-prod-search')}>
                    <p>
                        Showing {currentPage + 1} - {pageCount}{' '}
                        <span>out of {product?.length} Products</span>
                        {/* TOTAL PRODUCTS: <span> products</span> */}
                    </p>
                    <div className={cx('right-side')}>
                        <SearchProd></SearchProd>
                        <select
                            // onChange={(e) => {
                            //     // setCity(e.target.value);
                            //     setCity(e.target.value);
                            // }}
                            className={cx('city-dropdown')}
                            onChange={handleBrandsChange}
                        >
                            <option value="">---Brands---</option>
                            {brands &&
                                brands.map((brand) => {
                                    return <option value={brand.id}>{brand.brand_name}</option>;
                                })}
                        </select>
                        <select
                            // onChange={(e) => {
                            //     // setCity(e.target.value);
                            //     setCity(e.target.value);
                            // }}
                            className={cx('city-dropdown')}
                            onChange={handleCategoryChange}
                        >
                            <option value="">---Categories---</option>
                            {categories &&
                                categories.map((category) => {
                                    return (
                                        <option value={category.id}>
                                            {category.category_name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <ul className={cx('responsive-table')}>
                    <li className={cx('table-header')}>
                        <div className={cx('col', 'col-1')}>
                            {/* <FontAwesomeIcon icon={faImage}></FontAwesomeIcon> */}
                            Picture
                        </div>
                        <div className={cx('col', 'col-2')}>ID</div>
                        <div className={cx('col', 'col-3')}>Product Name</div>
                        <div className={cx('col', 'col-4')}>Price</div>
                        <div className={cx('col', 'col-5')}>Discount</div>
                        <div className={cx('col', 'col-6')}></div>
                        <div className={cx('col', 'col-7')}></div>
                    </li>
                    {currentPageData?.map((item, index) => {
                        let imgs = item.img;
                        console.log(item);
                        return (
                            <li key={index} className={cx('table-row')}>
                                <div className={cx('col', 'col-1', 'name')} data-label="Picture">
                                    <div className={cx('product-img')}>
                                        <div className={cx('product-img-wrapper')}>
                                            <img src={`${imgs[0]}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col', 'col-2', 'name')} data-label="ID">
                                    {item.id}
                                </div>
                                <div
                                    className={cx('col', 'col-3', 'name')}
                                    data-label="Product Name"
                                >
                                    {item.name}
                                </div>
                                <div className={cx('col', 'col-4', 'name')} data-label="Price">
                                    {/* {item.price} */}
                                    {formatPrice(item?.price)}
                                </div>
                                <div className={cx('col', 'col-5', 'name')} data-label="Discount">
                                    {formatPrice(item?.discount_price)}
                                </div>
                                <div
                                    className={cx('col', 'col-6', 'name', 'btn-hover')}
                                    data-label="Remove"
                                    onClick={() => {
                                        showModalDelete();
                                        setItemId(item?.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    Remove
                                </div>
                                <div
                                    className={cx('col', 'col-7', 'name', 'btn-hover')}
                                    data-label="Modify"
                                    onClick={() => {
                                        handleShow();
                                        setProdInfor(item);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPenNib}></FontAwesomeIcon>
                                    Modify
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Bạn có muốn xoá sản phẩm này không?</p>
                </Modal>
                <ModalDetailProduct
                    show={showModal}
                    handleClose={handleClose}
                    handleReRender={handleReRender}
                    prodID={prodInfor?.id}
                ></ModalDetailProduct>
            </div>
            <div className={cx('pagination')}>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    renderOnZeroPageCount={null}
                    pageClassName={cx('page-item')}
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </>
    );
}

export default ManageProduct;
