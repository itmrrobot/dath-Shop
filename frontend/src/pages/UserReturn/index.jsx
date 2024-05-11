import classNames from 'classnames/bind';
import styles from './UserReturn.module.scss';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UseContextUser } from '../../hooks/useContextUser';
import { formatPrice, priceDiscount } from '../../common';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from '../../constants';

const cx = classNames.bind(styles);

function UserReturn() {
    const state = useContext(UseContextUser);
    const [response, setResponse] = useState();
    const [pagCurr, setPagCurr] = useState(0);
    const pagName = ['All', 'Confirmating', 'Pick up', 'Received', 'Refund', 'Returned', 'Cancel'];

    useEffect(() => {
        axios.get(`${url}/list/returns/${state?.cuser?.value?.id}`).then((res) => {
            let returnOrder = [...res.data].reverse();
            if (pagCurr === 1) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                returnOrder = returnOrder.filter((i) => i.status === 1);
            } else if (pagCurr === 2) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                returnOrder = returnOrder.filter((i) => i.status === 2);
            } else if (pagCurr === 3) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                returnOrder = returnOrder.filter((i) => i.status === 3);
            } else if (pagCurr === 4) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                returnOrder = returnOrder.filter((i) => i.status === 4);
            } else if (pagCurr === 5) {
                returnOrder = returnOrder.filter((i) => i.status === 5);
            } else if (pagCurr === 6) {
                returnOrder = returnOrder.filter((i) => i.status === 6);
            }
            // setOrders(orderUser);
            setResponse(returnOrder);
        });
    }, [pagCurr]);
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('navigate')}>
                {pagName.map((item, index) => (
                    <li
                        key={item}
                        className={cx({ li_active: index === pagCurr })}
                        onClick={() => {
                            setPagCurr(index);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div className={cx('table')}>
                <Return response={response} userID={state?.cuser?.value?.id}></Return>
            </div>
        </div>
    );
}

export default UserReturn;

function Return({ response, userID }) {
    const navigator = useNavigate();
    const handleChangePage = (id) => {
        navigator(`/user/return/detail/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const expectedDate = (day) => {
        // const splitD = d.split('/');
        // const D = 1706322872160;
        const currentDate = new Date(day);
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        let date = currentDate.getDate();
        let month = currentDate.getMonth();
        const monthAbbreviation = monthNames[month];

        let year = currentDate.getFullYear();
        return `${date} ${monthAbbreviation}, ${year}`;
    };
    // console.log(expectedDate());
    return (
        <>
            {response?.length > 0 ? (
                response?.map((res, i) => {
                    // console.log(order);
                    console.log(res);
                    return (
                        <div className={cx('order')} key={i}>
                            <div className={cx('header-bill')}>
                                <ul className={cx('title-bill')}>
                                    <li>
                                        <div className={cx('status')}>
                                            <p className={cx('row-title')}>Status</p>
                                            {res.status === 1 && <p>Return Confirmation</p>}
                                            {res.status === 2 && <p>Picking up</p>}
                                            {res.status === 3 && <p>Returning</p>}
                                            {res.status === 4 && <p>Refund</p>}
                                            {res.status === 5 && <p>Returned</p>}
                                            {res.status === 6 && <p>Cancel</p>}
                                        </div>
                                    </li>
                                    <li>
                                        <div className={cx('order-id')}>
                                            <p className={cx('row-title')}>Return ID</p>
                                            <p>RT_#2024{res.id}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={cx('total')}>
                                            <p className={cx('row-title')}>Total</p>
                                            {res?.Orders?.map((order) => {
                                                return <p>{formatPrice(order.total)}</p>;
                                            })}
                                        </div>
                                    </li>
                                    <li>
                                        <div className={cx('detail')}>
                                            <button onClick={() => handleChangePage(res?.id)}>
                                                See Detail
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('body-bill')}>
                                <div className={cx('message-status')}>
                                    {res.status === 1 && (
                                        <p>Please Waiting Confirmation For Your Return</p>
                                    )}
                                    {res.status === 2 && (
                                        <p>Drop off the items by {expectedDate(res.date_pickup)}</p>
                                    )}
                                    {res.status === 3 && (
                                        <p>
                                            Item was returning to us
                                            {/* {expectedDate(res.createdAt, res?.shipment)} */}
                                        </p>
                                    )}
                                    {res.status === 4 && (
                                        <p>Refund sent within a week after we get the items</p>
                                    )}
                                    {res.status === 5 && <p>Completed</p>}
                                    {res.status === 6 && <p>Cancelation</p>}
                                </div>
                                {res.Orders.map((order) => {
                                    return <Order_Item product={order?.OrderDetails}></Order_Item>;
                                })}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className={cx('notification')}>
                    {/* <h1>Xin chao</h1> */}
                    <p>Không có đơn hàng nào</p>
                </div>
            )}
        </>
    );
}

function Order_Item({ product }) {
    const [prod, setProd] = useState();
    console.log(product);
    useEffect(() => {
        let product_id = product?.map((i) => i.id_product);
        const fetchProducts = async () => {
            try {
                const requests = product_id?.map((id) => axios.get(`${url}/products/${id}`));
                const responses = await Promise.all(requests);
                const products = responses.map((response) => response.data);
                let a = product?.map((item) => {
                    return {
                        ...item,
                        product: products?.find((i) => i.id === item.id_product),
                    };
                });
                setProd(a);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };
        fetchProducts();
    }, [product]);
    return (
        <>
            {prod?.map((item) => {
                let imgs = item?.product?.img;
                return (
                    <div className={cx('product')}>
                        <div className={cx('product-img')}>
                            <div className={cx('product-img-wrapper')}>
                                <img src={`${imgs[0]}`} />
                            </div>
                        </div>
                        <div className={cx('cart-item-infor')}>
                            <div className={cx('left-infor')}>
                                <p className={cx('cart-item-name')}>{item?.product?.name}</p>
                                <div className={cx('cart-item-quantity')}>
                                    <p>
                                        Size: <span>{item?.size.replace(/[\[\]"]+/g, '')}</span>
                                    </p>
                                    <p>
                                        x<span>{item?.quantity}</span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('right-infor')}>
                                <span className={cx('cart-item-price')}>
                                    {formatPrice(item?.product?.discount_price)}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
