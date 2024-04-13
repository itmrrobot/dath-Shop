import styles from './ManageProducts.module.scss';
import classNames from 'classnames/bind';
import dropDownIcon from '../../assets/img/Vector 9 (1).png';
import moreIcon from '../../assets/img/more.png';
import arrowDownIcon from '../../assets/img/arrow-down.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageProducts() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(); // undefined is nothing open
    const [idProductDelete, setIdProductDelete] = useState(0);
    const toggle = (id) => setOpen(open === id ? undefined : id);
    const navigate = useNavigate();
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
    const handleDelete = async (id) => {
        let product;
        try {
            const res = await axios.delete(url + `/products/delete/${id}`);
            product = data?.products?.filter((p) => p.id !== id);
            console.log(res);
            setData(data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className={cx('wrap-manage', 'g-38')}>
            <h2 className={cx('title-manage')}>All Products</h2>
            <div className={cx('table-wrap')}>
                <div className={cx('table')}>
                    <div className={cx('table-head')}>
                        <span className={cx('table-cell', 'f-2')}>Item</span>
                        <span className={cx('table-cell', 'f-1')}>Categories</span>
                        <span className={cx('table-cell', 'f-1')}>Quantity</span>
                        <span className={cx('table-cell', 'f-1')}>Price</span>
                        <span className={cx('table-cell', 'f-1')}>Sold</span>
                        <span className={cx('table-cell', 'f-1')}></span>
                    </div>
                    <div className={cx('table-body')}>
                        {data?.products &&
                            data?.products.map((p, index) => {
                                return (
                                    <div className={cx('table-row')} key={index}>
                                        <span className={cx('table-cell', 'f-2')}>
                                            {p?.ten_san_pham}
                                        </span>
                                        <span className={cx('table-cell', 'f-1')}>
                                            {p?.Category?.ten_chuyen_muc}
                                        </span>
                                        <span className={cx('table-cell', 'f-1')}>
                                            {p?.so_luong_nhap}
                                        </span>
                                        <span className={cx('table-cell', 'f-1')}>
                                            {p?.gia_khuyen_mai?.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                        <span className={cx('table-cell', 'f-1')}>
                                            {p?.so_luong_ban}
                                        </span>
                                        <span className={cx('table-cell', 'f-1')}>
                                            <img
                                                src={arrowDownIcon}
                                                alt="icon"
                                                onClick={() => toggle(p?.id)}
                                            />
                                        </span>
                                        <div
                                            className={cx('dropdown-list')}
                                            style={
                                                open === p?.id
                                                    ? { display: 'block' }
                                                    : { display: 'none' }
                                            }
                                        >
                                            <div className={cx('dropdown-item')}>Sửa</div>
                                            <div
                                                className={cx('dropdown-item')}
                                                onClick={() => handleDelete(p?.id)}
                                            >
                                                Xóa
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={cx('pagination-wrap')}></div>
            </div>
            <div className={cx('right')}>
                <button className={cx('btn-add')} onClick={() => navigate('/admin/products/add')}>
                    + Add new product
                </button>
            </div>
        </div>
    );
}

export default ManageProducts;
