import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../chartComp/Header';
import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import { formatPrice, priceDiscount } from '../../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import ModalDetailOrder from './ModalDetailOrder';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import { url } from '../../constants';
import { UseContextUser } from '../../hooks/useContextUser';

// import { cx } from '@fullcalendar/core/internal-common';
const cx = classNames.bind(styles);

function ManageOrder() {
    const pagName = ['Confirmating', 'Delivering', 'Completed', 'Canceled'];
    const [pagCurr, setPagCurr] = useState(0);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const state = useContext(UseContextUser);
    console.log(orders);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleOk = async () => {
        const requests = order?.OrderDetails?.map((prod) => {
            let sizeSelected = prod?.Product?.Inventories?.find((item) => {
                return item.size == prod?.size?.replace(/[\[\]"]+/g, '');
            });
            sizeSelected.quantity = sizeSelected.quantity + prod.quantity; // Cập nhật quantity thành 13
            // console.log([...prod.Product.Inventories, sizeSelected]);
            // return sizeSelected;
            return axios.put(`${url}/inventory/update/${prod.id}`, {
                listInventory: [sizeSelected],
            });
        });
        console.log(requests);
        try {
            await Promise.all(requests);
            await axios.put(`${url}/order/update/${order?.id}`, {
                status: 4,
            });
            setCheckChange((prev) => !prev);
            toast.success('Huỷ đơn hàng thành công');
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            toast.error('Huỷ đơn hàng thất bại');
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [checkChange, setCheckChange] = useState(false);
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
    useEffect(() => {
        var accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios
            .get(`${url}/orders`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                let orderUser = [...res.data].reverse();
                console.log(orderUser);
                if (pagCurr === 0) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter((i) => i.status === 1);
                }
                if (pagCurr === 1) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter((i) => i.status === 2);
                }
                if (pagCurr === 2) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter((i) => i.status === 3);
                }
                if (pagCurr === 3) {
                    // orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter((i) => i.status === 4);
                }
                setOrders(orderUser);
            });
    }, [pagCurr, checkChange]);
    return (
        <>
            <Header title="MANAGE ORDER" subtitle="View & Managing Orders!" />
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
                <ul className={cx('responsive-table')}>
                    <li className={cx('table-header')}>
                        <div className={cx('col', 'col-1')}>
                            {/* <FontAwesomeIcon icon={faImage}></FontAwesomeIcon> */}
                            Order ID
                        </div>
                        <div className={cx('col', 'col-2')}>status</div>
                        <div className={cx('col', 'col-3')}>Date Order</div>
                        <div className={cx('col', 'col-4')}>Adrress</div>
                        <div className={cx('col', 'col-5')}>Total</div>
                        <div className={cx('col', 'col-6')}></div>
                        <div className={cx('col', 'col-7')}></div>
                        <div className={cx('col', 'col-8')}></div>
                        {/* <div className={cx('col', 'col-9')}></div> */}
                    </li>
                    {orders.length > 0 ? (
                        orders?.map((order, index) => {
                            return (
                                <li key={index} className={cx('table-row')}>
                                    <div className={cx('col', 'col-1', 'name')} data-label="ID">
                                        #2024{order?.id}
                                    </div>
                                    <div className={cx('col', 'col-2', 'name')} data-label="ID">
                                        {order?.status === 1 && 'Confirmating'}
                                        {order?.status === 2 && 'Delivering'}
                                        {order?.status === 3 && 'Completed'}
                                        {order?.status === 4 && 'Canceled'}
                                    </div>
                                    <div
                                        className={cx('col', 'col-3', 'name')}
                                        data-label="Product Name"
                                    >
                                        {date(order?.createdAt)}
                                    </div>
                                    <div className={cx('col', 'col-4', 'name')} data-label="Price">
                                        {/* {item.price} */}
                                        {/* {formatPrice(order?.amount)} */}
                                        {order.address}, {order?.city}
                                    </div>
                                    <div
                                        className={cx('col', 'col-5', 'name')}
                                        data-label="Discount"
                                    >
                                        {/* {order.id} */}
                                        {formatPrice(order?.total)}
                                    </div>
                                    {/* Comfirm */}
                                    {order?.status === 1 && pagCurr === 0 && (
                                        <>
                                            <Button
                                                primary
                                                managerOrder
                                                onClick={() => {
                                                    axios
                                                        .put(`${url}/order/update/${order?.id}`, {
                                                            status: 2,
                                                        })
                                                        .then((res) => {
                                                            setCheckChange((prev) => !prev);
                                                            toast.success('Xác nhận thành công');
                                                        })
                                                        .catch((err) => console.log(err));
                                                }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                primary
                                                managerOrder
                                                onClick={() => {
                                                    handleShow();
                                                    setOrder(order);
                                                }}
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                primary
                                                managerOrder
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setOrder(order);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                    {/* Delivering */}
                                    {order?.status === 2 && pagCurr === 1 && (
                                        <>
                                            {order?.payed === 2 && (
                                                <Button
                                                    primary
                                                    disabled
                                                    managerOrder
                                                    // onClick={() => {
                                                    //     showModalDelete();
                                                    //     setItemId(item?.id);
                                                    // }}
                                                >
                                                    Accepted!!!
                                                </Button>
                                            )}
                                            {order?.payed === 1 && (
                                                <Button
                                                    primary
                                                    managerOrder
                                                    onClick={() => {
                                                        axios
                                                            .put(
                                                                `${url}/order/update/${order?.id}`,
                                                                {
                                                                    status: 3,
                                                                },
                                                            )
                                                            .then((res) => {
                                                                setCheckChange((prev) => !prev);
                                                                toast.success(
                                                                    'Xác nhận đã giao đơn hàng tới cho khách. Khách hàng đã thanh toán đầy đủ.',
                                                                );
                                                            })
                                                            .catch((err) => console.log(err));
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                            )}
                                            {order?.payed === 0 && (
                                                <Button
                                                    primary
                                                    managerOrder
                                                    onClick={() => {
                                                        axios
                                                            .put(
                                                                `${url}/order/update/${order?.id}`,
                                                                {
                                                                    payed: 2,
                                                                },
                                                            )
                                                            .then((res) => {
                                                                setCheckChange((prev) => !prev);
                                                                toast.success(
                                                                    'Xác nhận đã giao đơn hàng tới cho khách. Chờ khách xác nhận thanh toán',
                                                                );
                                                            })
                                                            .catch((err) => console.log(err));
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                            )}
                                            <Button
                                                primary
                                                managerOrder
                                                onClick={() => {
                                                    handleShow();
                                                    setOrder(order);
                                                }}
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                primary
                                                // disabled
                                                managerOrder
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setOrder(order);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                    {order?.status === 3 && pagCurr === 2 && (
                                        <>
                                            <Button
                                                primary
                                                managerOrder
                                                disabled
                                                // onClick={() => {
                                                //     showModalDelete();
                                                //     setItemId(item?.id);
                                                // }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                primary
                                                managerOrder
                                                onClick={() => {
                                                    handleShow();
                                                    setOrder(order);
                                                }}
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                primary
                                                disabled
                                                managerOrder

                                                // onClick={() => {
                                                //     handleShow();
                                                //     setProdInfor(item);
                                                // }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                    {order?.status === 4 && pagCurr === 3 && (
                                        <>
                                            <Button
                                                primary
                                                manageReturn
                                                disabled
                                                // onClick={() => {
                                                //     showModalDelete();
                                                //     setItemId(item?.id);
                                                // }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                primary
                                                manageReturn
                                                onClick={() => {
                                                    handleShow();
                                                    setOrder(order);
                                                }}
                                            >
                                                Detail
                                            </Button>
                                            <Button primary disabled manageReturn>
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </li>
                            );
                        })
                    ) : (
                        <div className={cx('notification')}>
                            {/* <h1>Xin chao</h1> */}
                            <p>Không có đơn hàng nào nào</p>
                        </div>
                    )}
                </ul>
            </div>
            <ModalDetailOrder
                show={showModal}
                handleClose={handleClose}
                order={order}
            ></ModalDetailOrder>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn huỷ đơn hàng này không?</p>
            </Modal>
        </>
    );
}

export default ManageOrder;
