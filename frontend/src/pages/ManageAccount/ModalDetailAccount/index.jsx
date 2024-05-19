import classNames from 'classnames/bind';
import styles from './ModalDetailAccount.module.scss';
import { useState, useContext, useEffect } from 'react';
import { UseContextUser } from '../../../hooks/useContextUser';
import axios from 'axios';
import Modal from 'react-modal';
import { formatPrice, priceDiscount } from '../../../common';
import { useNavigate } from 'react-router-dom';
import images from '../../../assets/img';
import { url } from '../../../constants';
// import '/ModalDetailAccount.css';
const cx = classNames.bind(styles);
function ModalDetailAccount({ show, handleClose, accInfor }) {
    const [type, setType] = useState('Orders');

    const tabs = ['Orders', 'Returns'];
    const handleCreateAt = (data) => {
        // console.log(data);
        let dateObject = new Date(data);
        let day = dateObject.getDate();
        let month = dateObject.getMonth() + 1;
        // Lấy năm
        let year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <Modal
            isOpen={show}
            onRequestClose={handleClose}
            style={{
                overlay: {
                    // backgroundColor: 'red',
                    zIndex: '10',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'absolute',
                    // top: '40px',
                    // transform: 'translateY(-50%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    // background: 'red',
                    width: '60%',
                    height: '70%',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '60px',
                },
            }}
            ariaHideApp={false}
        >
            <div className={cx('wrapper')}>
                <p className={cx('title')}>ACCOUNT INFORMATION</p>

                <div className={cx('body_modal')}>
                    <div className={cx('user_info')}>
                        <p>
                            <span>Role</span>:{' '}
                            {accInfor.roleId === 3 || accInfor.roleId === 4 ? 'User' : 'Admin'}
                        </p>
                        <p>
                            <span>Account Name</span>: {accInfor.name}
                        </p>
                        <p>
                            <span>Email</span>: {accInfor.email}
                        </p>
                        <p>
                            <span>Customer Name</span>: {accInfor.fullname}
                        </p>
                        <p>
                            <span>Phone Number</span>: {accInfor.phone}
                        </p>
                        <p>
                            <span>Register Account Date</span>: {handleCreateAt(accInfor.createdAt)}
                        </p>
                    </div>
                    <ul className={cx('product-info-menu')}>
                        {tabs.map((tab, i) => {
                            return (
                                <li
                                    style={
                                        type === tab
                                            ? {
                                                  color: '#AB8A37',
                                                  //   backgroundColor: '#333',
                                              }
                                            : {}
                                    }
                                    key={i}
                                    className={cx('p-info-list')}
                                    onClick={() => setType(tab)}
                                >
                                    {tab}
                                </li>
                            );
                        })}
                    </ul>
                    <UserOrder userID={accInfor.id} type={type} />
                </div>
                <button onClick={handleClose} className={cx('close_btn')}>
                    &times;
                </button>
            </div>
        </Modal>
    );
}

export default ModalDetailAccount;

function UserOrder({ userID, type }) {
    const pagNameOrders = ['All', 'Confirmating', 'Delivering', 'Completed', 'Canceled'];
    const pagNameReturns = [
        'All',
        'Confirmating',
        'Pick up',
        'Received',
        'Refund',
        'Returned',
        'Cancel',
    ];
    const [pagCurrOrders, setPagCurrOrders] = useState(0);
    const [pagCurrReturns, setPagCurrReturns] = useState(0);
    const [orders, setOrders] = useState([]);
    const [response, setResponse] = useState([]);

    // console.log();
    let [deliAmount, setDeliAmount] = useState();
    useEffect(() => {
        // Get ra được tất cả những dữ liệu đơn hàng
        const fetchDataOrders = async () => {
            try {
                let res = await axios.get(`${url}` + `/orders/${userID}`);
                console.log(res);
                // Sau đó đảo lộn response từ dưới đầu lên trên
                let orderUser = [...res.data].reverse();
                // Kiểm tra trang hiện tại là ở đâu
                // Nếu là ở trang 1 - Tất cả
                // => Lọc ra toàn bộ những phần tử con mà có status đơn hàng là 1
                if (pagCurrOrders === 1) {
                    orderUser = orderUser.filter((i) => i.status === 1);
                } else if (pagCurrOrders === 2) {
                    orderUser = orderUser.filter((i) => i.status === 2);
                } else if (pagCurrOrders === 3) {
                    orderUser = orderUser.filter((i) => i.status === 3);
                } else if (pagCurrOrders === 4) {
                    orderUser = orderUser.filter((i) => i.status === 4);
                }
                setOrders(orderUser);
                setDeliAmount(res.data.filter((i) => i.status === 2).length);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchDataReturns = async () => {
            try {
                let res = await axios.get(`${url}/list/returns/${userID}`);
                let returnOrder = [...res.data].reverse();
                if (pagCurrReturns === 1) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 1);
                } else if (pagCurrReturns === 2) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 2);
                } else if (pagCurrReturns === 3) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 3);
                } else if (pagCurrReturns === 4) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    returnOrder = returnOrder.filter((i) => i.status === 4);
                } else if (pagCurrReturns === 5) {
                    returnOrder = returnOrder.filter((i) => i.status === 5);
                } else if (pagCurrReturns === 6) {
                    returnOrder = returnOrder.filter((i) => i.status === 6);
                }
                // setOrders(orderUser);
                setResponse(returnOrder);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataOrders();
        fetchDataReturns();
    }, [pagCurrOrders, pagCurrReturns]);
    return (
        <div className={cx('wrapper-order')}>
            <ul className={cx('navigate')}>
                {type === 'Orders'
                    ? pagNameOrders.map((item, index) => (
                          <li
                              key={item}
                              className={cx({ li_active: index === pagCurrOrders })}
                              onClick={() => {
                                  setPagCurrOrders(index);
                              }}
                          >
                              {item}
                          </li>
                      ))
                    : pagNameReturns.map((item, index) => (
                          <li
                              key={item}
                              className={cx({ li_active: index === pagCurrReturns })}
                              onClick={() => {
                                  setPagCurrReturns(index);
                              }}
                          >
                              {item}
                          </li>
                      ))}
            </ul>
            <div className={cx('table')}>
                {orders.length === 0 && response.length === 0 ? (
                    <div className={cx('notification')}>
                        {/* <h1>Xin chao</h1> */}
                        <p>Không có đơn hàng nào</p>
                    </div>
                ) : type === 'Orders' ? (
                    <Orders orders={orders} userID={userID} />
                ) : (
                    <Return response={response} userID={userID} />
                )}
            </div>
        </div>
    );
}
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

function Orders({ orders, userID }) {
    const navigator = useNavigate();
    const handleChangePage = (id) => {
        navigator(`/user/order/detail/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const state = useContext(UseContextUser);
    // console.log();
    // console.log();
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
            {orders.map((order, i) => {
                console.log(order);

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
                                            <button
                                                onClick={() => {
                                                    if (state?.cuser?.value?.id === userID.userID) {
                                                        handleChangePage(order.id);
                                                    }
                                                }}
                                            >
                                                See Detail
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('body-bill')}>
                                <div className={cx('message-status')}>
                                    {order.status === 1 && <p>Please Waiting Confirm Your Order</p>}
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
                            </div>
                        </div>
                    )
                );
            })}
        </>
    );
}

function Order_Item({ product }) {
    const [prod, setProd] = useState();
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
