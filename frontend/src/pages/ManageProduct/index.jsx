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
const cx = classNames.bind(styles);
function ManageProduct() {
    const [product, setProduct] = useState([]);
    const [itemId, setItemId] = useState();
    console.log(JSON.stringify(itemId));

    const [prodInfor, setProdInfor] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    // const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
    const pageCount = Math.ceil(product.length / 5); // Tổng số trang
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    console.log('Render');
    const offset = currentPage * 5;
    // const currentPageData = product.slice(offset, offset + 5);
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
    console.log(product);
    useEffect(() => {
        axios.get(`${url}/products`).then((res) => {
            setProduct(res.data.products);
        });
    }, [render]);
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
                    <SearchProd></SearchProd>
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
                    {product?.map((item, index) => {
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
                {/* <ReactPaginate
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
                /> */}
            </div>
        </>
    );
}

export default ManageProduct;
