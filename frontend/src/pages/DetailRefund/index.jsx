import classNames from 'classnames/bind';
import styles from './DetailRefund.module.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useContext } from 'react';
import { formatPrice, priceDiscount } from '../../common';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { url } from '../../constants';
const cx = classNames.bind(styles);
function DetailRefund() {
    const param = useParams();
    const [returnOrder, setReturnOrder] = useState([]);
    console.log(returnOrder);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    useEffect(() => {
        axios.get(`${url}/returns/${param.id}`).then((res) => {
            // console.log(res.data.createdAt);
            // let order = [...res.data]
            // order[createAt] =
            setReturnOrder(res.data);
            console.log(res.data);
        });
    }, [param.id]);
    return (
        <>
            <div className={cx('wrapper')}>
                <ul className={cx('path')}>
                    <li>
                        <Link to="/user/return">
                            <p>Return</p>
                        </Link>
                    </li>
                    <span> &#62; </span>
                    <li>RT_#2024{param.id}</li>
                </ul>
                <div className={cx('content')}>
                    <div className={cx('message-status')}>
                        <div className="status">
                            {returnOrder?.status === 1 && (
                                <p>Your return is waiting for check by Admin</p>
                            )}
                            {returnOrder?.status === 2 && (
                                <p>
                                    Drop off the items by {expectedDate(returnOrder?.date_pickup)}
                                </p>
                            )}
                            {returnOrder?.status === 3 && (
                                <p>
                                    Receiving to us
                                    {/* {expectedDate(returnOrder.createdAt, returnOrder?.shipment)} */}
                                </p>
                            )}
                            {returnOrder?.status === 4 && (
                                <p>Refund sent within a week after we get the items</p>
                            )}
                            {returnOrder?.status === 5 && <p>Completed</p>}
                            {returnOrder?.status === 6 && <p>Cancel your Return by Admin</p>}
                        </div>
                    </div>
                    <div className={cx('process-information')}>
                        <div className={cx('left-content')}>
                            <div className={cx('pixelplus-steps-steps')}>
                                <div className={cx('pixelplus-steps-step', 'active')} data-id="0">
                                    <div className={cx('pixelplus-steps-step__number')}></div>
                                    <div className={cx('pixelplus-steps-step__text')}>
                                        <div className={cx('pixelplus-steps-step__title')}>
                                            <strong>Return started</strong>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step__excerpt')}
                                            style={{ display: 'block' }}
                                        >
                                            <p>{expectedDate(returnOrder?.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                {returnOrder?.status === 1 && (
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
                                                    <strong>
                                                        Please Waiting for your confirmation return
                                                    </strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p>{expectedDate(returnOrder?.datePickup)}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="2">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Drop off the items</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p>{expectedDate(returnOrder?.datePickup)}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="3">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Items was shipping to us</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p></p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="4">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>
                                                        Refund sent within a week after we get the
                                                        items
                                                    </strong>
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
                                {returnOrder?.status === 2 && (
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
                                                    <strong>Your Return was checked</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p>{expectedDate(returnOrder?.datePickup)}</p> */}
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
                                                    <strong>Drop off the items</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>{expectedDate(returnOrder?.date_pickup)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="3">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    <strong>Items was shipping to us</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p></p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="4">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>
                                                        Refund sent within a week after we get the
                                                        items
                                                    </strong>
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
                                {returnOrder?.status === 3 && (
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
                                                    <strong>Your Return was checked</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p>{expectedDate(returnOrder?.datePickup)}</p> */}
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
                                                    <strong>Drop off the items</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>{expectedDate(returnOrder?.date_pickup)}</p>
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
                                                    <strong>Items was shipping to us</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p></p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('pixelplus-steps-step')} data-id="4">
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>
                                                        Refund sent within a week after we get the
                                                        items
                                                    </strong>
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
                                {returnOrder?.status === 4 && (
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
                                                    <strong>Your Return was checked</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p>{expectedDate(returnOrder?.datePickup)}</p> */}
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
                                                    <strong>Drop off the items</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>{expectedDate(returnOrder?.date_pickup)}</p>
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
                                                    <strong>Items was shipping to us</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    {/* <p></p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('pixelplus-steps-step', 'active')}
                                            data-id="4"
                                        >
                                            <div
                                                className={cx('pixelplus-steps-step__number')}
                                            ></div>
                                            <div className={cx('pixelplus-steps-step__text')}>
                                                <div className={cx('pixelplus-steps-step__title')}>
                                                    {' '}
                                                    <strong>
                                                        Refund sent within a week after we get the
                                                        items
                                                    </strong>
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
                                {returnOrder?.status === 5 && (
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
                                                    <strong>Drop off the items</strong>
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
                                                    <strong>Completed Refund</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>Sorry about proplem about product</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {returnOrder?.status === 6 && (
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
                                                    <strong>
                                                        Wating for your Returns confirmation
                                                    </strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>Not valid</p>
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
                                                    <strong>Cancel Return</strong>
                                                </div>
                                                <div
                                                    className={cx('pixelplus-steps-step__excerpt')}
                                                    style={{ display: 'block' }}
                                                >
                                                    <p>
                                                        Your Returns is invalid, due to other
                                                        problems with images, videos or the Returns
                                                        you sent to the shop different with your
                                                        Orders
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('first-name')}>
                                    <p className={cx('label')}>Description:</p>
                                    <p>{returnOrder?.description}</p>
                                </div>
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('first-name')}>
                                    <p className={cx('label')}>Phone Number:</p>
                                    <p>{returnOrder?.phone?.replace(/[\[\]"]+/g, '')}</p>
                                </div>
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('first-name')}>
                                    <p className={cx('label')}>Address:</p>
                                    <p>{returnOrder?.address?.replace(/[\[\]"]+/g, '')}</p>
                                </div>
                            </div>
                            <div className={cx('name')}>
                                <div className={cx('first-name')}>
                                    <p className={cx('label')}>Refund method:</p>
                                    <p>Visa ending in 4242</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('right-content')}>
                            <div className={cx('order-wrapper')}>
                                <div className={cx('title-order')}>
                                    {/* {returnOrder.length > 0 && (
                                        <p className={cx('order-code')}>
                                            Order #2024{returnOrder?.Orders[0]?.id}
                                        </p>
                                    )} */}
                                    {returnOrder?.Orders?.map((order) => (
                                        <p className={cx('order-code')}>Order #2024{order?.id}</p>
                                    ))}
                                </div>
                                <div className={cx('body-order')}>
                                    {returnOrder?.Orders?.map((order) => (
                                        <Order_Item product={order.OrderDetails}></Order_Item>
                                    ))}
                                </div>
                                <div className={cx('payment-wrapper-modal')}>
                                    <div className={cx('payment-display-modal', 'total-wrapper')}>
                                        <p className={cx('label-modal', 'total')}>Total</p>
                                        <p className={cx('discount-price-modal')}>
                                            {returnOrder?.Orders?.map((order) =>
                                                formatPrice(returnOrder?.Orders[0]?.total),
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailRefund;

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
