import classNames from 'classnames/bind';
import styles from './UserOrder.module.scss';
import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '~/hooks/UserContext';
import { UseContextUser } from '../../hooks/useContextUser';
import axios from 'axios';
import { formatPrice, priceDiscount } from '../../common';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import ModalRating from './ModalRating';
import { url } from '../../constants';
const cx = classNames.bind(styles);

function UserOrder() {
    const pagName = ['All', 'Confirmating', 'Delivering', 'Completed', 'Canceled'];
    const [pagCurr, setPagCurr] = useState(0);
    const state = useContext(UseContextUser);
    const [orders, setOrders] = useState([]);
    let [deliAmount, setDeliAmount] = useState();

    useEffect(() => {
        axios.get(url + `/orders/${state?.cuser?.value?.id}`).then((res) => {
            let orderUser = [...res.data].reverse();
            if (pagCurr === 1) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                orderUser = orderUser.filter((i) => i.status === 1);
            } else if (pagCurr === 2) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                orderUser = orderUser.filter((i) => i.status === 2);
            } else if (pagCurr === 3) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                orderUser = orderUser.filter((i) => i.status === 3);
            } else if (pagCurr === 4) {
                // orderUser = res.data.filter(i => i.id_client === user._id)
                orderUser = orderUser.filter((i) => i.status === 4);
            }
            setOrders(orderUser);
            setDeliAmount(res.data.filter((i) => i.status === 2).length);
        });
    }, [pagCurr]);
    return (
        <>
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
                            {item} {index === 2 && <span>({deliAmount})</span>}
                        </li>
                    ))}
                </ul>
                <div className={cx('table')}>
                    <Orders orders={orders} userID={state?.cuser?.value?.id} />
                </div>
            </div>
        </>
    );
}

export default UserOrder;

function Orders({ orders, userID }) {
    // console.log(orders?.products);
    const navigator = useNavigate();
    const [render, setRender] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState();
    // Modal Detail
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleReRender = () => {
        setRender((prev) => !prev);
    };
    const handleChangePage = (id) => {
        navigator(`/user/order/detail/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // console.log(expectedDate());
    return (
        <>
            {orders?.length > 0 ? (
                orders.map((order, i) => {
                    return (
                        order.status !== 5 && (
                            <div className={cx('order')} key={i}>
                                <div className={cx('header-bill')}>
                                    <ul className={cx('title-bill')}>
                                        <li>
                                            <div className={cx('status')}>
                                                <p className={cx('row-title')}>Status</p>
                                                {order.status === 1 && <p>Confirmating</p>}
                                                {order.status === 2 && <p>Delivering</p>}
                                                {order.status === 3 && <p>Completed</p>}
                                                {order.status === 4 && <p>Canceled</p>}
                                            </div>
                                        </li>
                                        <li>
                                            <div className={cx('order-id')}>
                                                <p className={cx('row-title')}>Order ID</p>
                                                <p>#2024{order.id}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={cx('total')}>
                                                <p className={cx('row-title')}>Total</p>
                                                <p>{formatPrice(order.total)}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={cx('detail')}>
                                                <button onClick={() => handleChangePage(order.id)}>
                                                    See Detail
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('body-bill')}>
                                    <div className={cx('message-status')}>
                                        {order.status === 1 && (
                                            <p>Please Waiting Confirm Your Order</p>
                                        )}
                                        {order.status === 2 && (
                                            <p>
                                                Estimated delivery:{' '}
                                                {expectedDate(order.createdAt, order?.shipment)}
                                            </p>
                                        )}
                                        {order.status === 3 && <p>Delivered</p>}
                                        {order.status === 4 && <p>Cancellation requested</p>}
                                    </div>
                                    <Order_Item product={order?.OrderDetails}></Order_Item>
                                    <div className={cx('received')}>
                                        {order?.status === 2 && order?.payed === 2 && (
                                            <Button
                                                primary
                                                onClick={() => {
                                                    axios
                                                        .put(`${url}/order/update/${order?.id}`, {
                                                            payed: 1,
                                                            status: 3,
                                                        })
                                                        .then((res) => {
                                                            // setCheckChange((prev) => !prev);
                                                            toast.success(
                                                                'Đã hoàn tất thanh toán đầy đủ. Cảm ơn quý khách!!',
                                                            );
                                                            navigator('/user/order');
                                                        })
                                                        .catch((err) => console.log(err));
                                                }}
                                            >
                                                Received
                                            </Button>
                                        )}
                                        {order?.status === 2 && order?.payed === 0 && (
                                            <Button primary disabled>
                                                Received
                                            </Button>
                                        )}
                                        {order?.status === 2 && order?.payed === 1 && (
                                            <Button primary disabled>
                                                Have already payment!
                                            </Button>
                                        )}
                                        {/* Rating */}
                                        {/* {order?.status === 3 && order?.isPay === 1 && order?.rating === 0 ? (
                                            <Button
                                                primary
                                                onClick={() => {
                                                    console.log('Hello');
                                                }}
                                            >
                                                Rating your Order!
                                            </Button>
                                        ) : (
                                            <Button primary disabled>
                                                Rated!
                                            </Button>
                                        )} */}
                                        {order?.status === 3 &&
                                            order?.payed === 1 &&
                                            (order?.OrderDetails?.some(
                                                (prod) => prod.rating === 0,
                                            ) ? (
                                                <Button
                                                    primary
                                                    onClick={() => {
                                                        setOrderId(order?.id);
                                                        handleShow();
                                                    }}
                                                >
                                                    Rating your Order!
                                                </Button>
                                            ) : (
                                                <Button primary disabled>
                                                    Rated!
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )
                    );
                    // console.log();
                })
            ) : (
                <div className={cx('notification')}>
                    {/* <h1>Xin chao</h1> */}
                    <p>Không có đơn hàng nào</p>
                </div>
            )}
            <ModalRating
                show={showModal}
                handleClose={handleClose}
                handleReRender={handleReRender}
                orderId={orderId}
            ></ModalRating>
        </>
    );
}

function Order_Item({ product }) {
    const [prod, setProd] = useState();
    useEffect(() => {
        let product_id = product.map((i) => i.id_product);
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
