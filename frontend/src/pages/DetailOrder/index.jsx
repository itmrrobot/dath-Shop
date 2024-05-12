import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useContext } from 'react';
import { formatPrice, priceDiscount } from '../../common';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { url } from '../../constants';
import moment from 'moment';
import { StoreContext } from '../../components/PageLoading/store';
import { actions } from '../../components/PageLoading/store';
const cx = classNames.bind(styles);
function DetailOrder() {
    const param = useParams();
    const [order, setOrder] = useState();
    console.log(order);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, dispatch] = useContext(StoreContext);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const checkReturnDate = () => {
        var targetDate = moment(order?.returnDate);
        var today = moment();
        if (today.isAfter(targetDate)) {
            return true;
        } else {
            return false;
        }
    };
    const handleOk = async () => {
        let cancel = {
            ...order,
            status: 4,
        };
        // console.log(cancel);
        setIsModalOpen(false);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // .then((res) => console.log(res));
        try {
            // console.log(dataPost);
            // console.log(state?.cuser?.value);
            dispatch(actions.setLoading(true));
            await delay(2000); // Chờ 2 giây
            const requests = order?.OrderDetails?.map((prod) => {
                let sizeSelected = prod?.product?.Inventories?.find((item) => {
                    return item.size == prod?.size?.replace(/[\[\]"]+/g, '');
                });
                // console.log(sizeSelected);
                sizeSelected.quantity = sizeSelected.quantity + prod.quantity; // Cập nhật quantity thành 13
                // let newData = [...prod?.Inventories, sizeSelected];
                return axios.put(`${url}/inventory/update/${prod.id}`, {
                    listInventory: [...prod?.product?.Inventories, sizeSelected],
                });
            });
            await Promise.all(requests);
            const res = await axios.put(`${url}/order/update/${param.id}`, cancel);
            let dataUpdate = {
                ...res,
            };
            setOrder(dataUpdate);
            toast.success('Huỷ đơn hàng thành công', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            toast.error('Huỷ đơn hàng thất bại!', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            navigator('/user/order');
            dispatch(actions.setLoading(false)); // Kết thúc hiển thị trạng thái loading
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigator = useNavigate();
    const date = (d) => {
        const currentDate = new Date(d);
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

    const expectedDate = (day, shipment) => {
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

        if (shipment === 'save') {
            currentDate.setDate(currentDate.getDate() + 5);
        } else if (shipment === 'fast') {
            currentDate.setDate(currentDate.getDate() + 3);
        }
        // console.log(typeof currentDate);
        // console.log(currentDate.);
        let date = currentDate.getDate();
        let month = currentDate.getMonth();
        const monthAbbreviation = monthNames[month];

        let year = currentDate.getFullYear();
        return `${date} ${monthAbbreviation}, ${year}`;
        // return currentDate;
        // const dv = new Date(`${splitD[2]}-${splitD[1]}-${splitD[0]}`);
        // console.log(dv);

        // let expecDay = new Date(dv);
        // expecDay.setDate(dv.getDate() + 3);

        // expecDay = expecDay.toLocaleDateString().split('/');

        // return `${expecDay[1]}/${expecDay[0]}/${expecDay[2]}`;
    };
    const handleReturn = () => {
        navigator(`/user/order/detail/return/${param.id}`);
    };
    // console.log(param.id);
    useEffect(() => {
        let baseUrl = `${url}/products`;
        const fetchOrder = async () => {
            try {
                let res = await axios.get(`${url}/order/${param.id}`);
                let requests = res.data.OrderDetails.map((prod) =>
                    axios.get(`${baseUrl}/${prod.id_product}`),
                );
                let responses = await Promise.all(requests);
                let products = responses.map((response) => response.data);
                let a = res.data.OrderDetails?.map((item) => {
                    return {
                        ...item,
                        product: products?.find((i) => i.id === item.id_product),
                    };
                });

                setOrder({
                    ...res.data,
                    OrderDetails: a,
                });
                dispatch(actions.setLoading(false));
            } catch (err) {
                console.log(err);
            }
        };
        dispatch(actions.setLoading(true));
        setTimeout(async () => {
            await fetchOrder();
        }, 1000);
    }, [param]);
    // console.log(order?.status);
    return (
        <>
            <div className={cx('wrapper')}>
                <ul className={cx('path')}>
                    <li>
                        <Link to="/user/order">
                            <p>Order</p>
                        </Link>
                    </li>
                    <span> &#62; </span>
                    <li>#2024{param.id}</li>
                </ul>
                <div className={cx('content')}>
                    <div className={cx('message-status')}>
                        <div className="status">
                            {order?.status === 1 && <p>Please Waiting Confirm Your Order</p>}
                            {order?.status === 2 && (
                                <p>
                                    Estimated delivery:{' '}
                                    {expectedDate(order?.createdAt, order?.shipment)}
                                </p>
                            )}
                            {order?.status === 3 && <p>Delivered</p>}
                            {order?.status === 4 && <p>Cancellation requested</p>}
                        </div>
                        <div className={cx('handle-btn')}>
                            {order?.status === 1 && (
                                <button className={cx('cancel')} onClick={showModal}>
                                    Cancel Order
                                </button>
                            )}
                            {order?.status === 2 &&
                                (order?.payed === 2 ? (
                                    <button
                                        className={cx('cancel')}
                                        onClick={() => {
                                            axios
                                                .put(`${url}/order/update/${order?.id}`, {
                                                    payed: 1,
                                                    status: 3,
                                                })
                                                .then((res) => {
                                                    console.log(res);
                                                    // setCheckChange((prev) => !prev);
                                                    toast.success(
                                                        'Đã hoàn tất thanh toán đầy đủ. Cảm ơn quý khách!!',
                                                    );
                                                    navigator('/user/order');
                                                })
                                                .catch((err) => console.log(err));
                                        }}
                                    >
                                        Xác nhận thanh toán
                                    </button>
                                ) : (
                                    <button className={cx('cancel')} onClick={showModal}>
                                        Cancel Order
                                    </button>
                                ))}
                            {order?.status === 3 &&
                                (order?.payed === 2 ? (
                                    <button className={cx('return')} onClick={showModal}>
                                        Cancel Order
                                    </button>
                                ) : (
                                    checkReturnDate() === false &&
                                    order?.id_returns === null && (
                                        <button className={cx('return')} onClick={handleReturn}>
                                            Return Product
                                        </button>
                                    )
                                ))}
                            {/* {order?.status === 1 && <button className={cx('cancel')}>Cancel Order</button>} */}
                        </div>
                    </div>
                    <div className={cx('process-information')}>
                        <div className={cx('left-content')}>
                            <div className={cx('pixelplus-steps-steps')}>
                                <div className={cx('pixelplus-steps-step', 'active')} data-id="0">
                                    <div className={cx('pixelplus-steps-step__number')}></div>
                                    <div className={cx('pixelplus-steps-step__text')}>
                                        <div className={cx('pixelplus-steps-step__title')}>
                                            <strong>Order</strong>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step__excerpt')}
                                            style={{ display: 'block' }}
                                        >
                                            <p>{date(order?.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                {order?.status === 1 && (
                                    <>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="1"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Confirmation</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>
                                                        Please Waiting Confirmation for Your Order
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="2">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Delivering</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p></p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="3">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>Completed</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {order?.status === 2 && (
                                    <>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="1"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Confirmation</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="2"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Delivering</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>
                                                        Estimated{' '}
                                                        {expectedDate(
                                                            order?.createdAt,
                                                            order?.shipment,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="3">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>Completed</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {order?.status === 3 && (
                                    <>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="1"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Confirmation</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="2"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Delivering</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="3"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>Completed</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {order?.status === 4 && (
                                    <>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="1"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Confirmation</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="2"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Cancel Order</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>Your Order Have Been Canceled</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* <div className={cx('pixelplus-steps-step')} data-id="1">
                                    <div className={cx('pixelplus-steps-step__number')}></div>
                                    <div className={cx('pixelplus-steps-step__text')}>
                                        <div className={cx('pixelplus-steps-step__title')}>
                                            <strong>Confirmation</strong>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step__excerpt')}
                                            style={{ display: 'block' }}
                                        >
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('pixelplus-steps-step')} data-id="2">
                                    <div className={cx('pixelplus-steps-step__number')}></div>
                                    <div className={cx('pixelplus-steps-step__text')}>
                                        <div className={cx('pixelplus-steps-step__title')}>
                                            <strong>Delivering</strong>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step__excerpt')}
                                            style={{ display: 'block' }}
                                        >
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('pixelplus-steps-step')} data-id="3">
                                    <div className={cx('pixelplus-steps-step__number')}></div>
                                    <div className={cx('pixelplus-steps-step__text')}>
                                        <div className={cx('pixelplus-steps-step__title')}>
                                            {' '}
                                            <strong>Completed</strong>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step__excerpt')}
                                            style={{ display: 'block' }}
                                        >
                                            <p></p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('first-name')}>
                                    <p className={cx('label')}>Name:</p>
                                    <p>{order?.name}</p>
                                </div>
                            </div>
                            <div className={cx('address')}>
                                <p className={cx('label')}>Shipping Address: </p>
                                <p>{order?.address}</p>
                            </div>
                            <div className={cx('ship-method')}>
                                <p className={cx('label')}>Note: </p>
                                <p>{order?.note ? order?.note : 'None of note'}</p>
                            </div>
                            {/* <div className={cx('ship-method')}>
                                <p className={cx('label')}>Ship Method: </p>
                                <p>
                                    {order?.shipment === 'save'
                                        ? 'Vận chuyển tiết kiệm'
                                        : 'Vận chuyển nhanh'}
                                </p>
                            </div> */}
                            {/* <div className={cx('payment-method')}>
                                <p className={cx('label')}>Payment Method: </p>
                                <p>{order?.payment === 'cod' ? 'COD - Cash On Delivery' : ''}</p>
                            </div> */}
                            {/* <div className={cx('order-date')}>
                                <p className={cx('label')}>Order Date: </p>
                                <p>{date(order?.createdAt)}</p>
                            </div> */}
                        </div>
                        <div className={cx('right-content')}>
                            <div className={cx('order-wrapper')}>
                                <div className={cx('title-order')}>
                                    <p className={cx('order-code')}>Order #2024{order?.id}</p>
                                </div>
                                <div className={cx('body-order')}>
                                    <Order_Item product={order?.OrderDetails}></Order_Item>
                                </div>
                                <div className={cx('payment-wrapper-modal')}>
                                    {/* <div className={cx('payment-display-modal')}>
                                        <p className={cx('label-modal')}>Subtotal</p>
                                        <p className={cx('price-modal')}>{formatPrice(subtotal)}</p>
                                    </div>
                                    <div className={cx('payment-display-modal')}>
                                        <p className={cx('label-modal')}>Discount</p>
                                        <p className={cx('discount-price-modal')}>
                                            - {formatPrice(discount)}
                                        </p>
                                    </div>
                                    <div className={cx('payment-display-modal')}>
                                        <p className={cx('label-modal')}>Shipping Costs</p>
                                        <p className={cx('discount-price-modal')}>
                                            + {formatPrice(50000)}
                                        </p>
                                    </div> */}
                                    <div className={cx('payment-display-modal', 'total-wrapper')}>
                                        <p className={cx('label-modal', 'total')}>Total</p>
                                        <p className={cx('discount-price-modal')}>
                                            {formatPrice(order?.total)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn huỷ đơn hàng này không?</p>
            </Modal>
        </>
    );
}

export default DetailOrder;

function Order_Item({ product }) {
    const [prod, setProd] = useState();
    console.log(prod);
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
