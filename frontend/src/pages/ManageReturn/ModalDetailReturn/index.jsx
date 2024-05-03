import classNames from 'classnames/bind';
import styles from './ModalDetailReturn.module.scss';
import { formatPrice, priceDiscount } from '../../../common';
import { useState, useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { url } from '../../../constants';
import SliderImageReponsive from '../../../components/SliderImageReponsive';
const cx = classNames.bind(styles);
function ModalDetailReturn({ show, handleClose, returnOrder, handleReRender }) {
    console.log(returnOrder);
    // let images = JSON.parse(returnOrder?.img);
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
            <>
                <div className={cx('wrapper')}>
                    <ul className={cx('path')}>
                        <li>
                            <Link to="/user/return">
                                <p>Return</p>
                            </Link>
                        </li>
                        <span> &#62; </span>
                        <li>RT_#2024{returnOrder?.id}</li>
                    </ul>
                    <div className={cx('content')}>
                        <div className={cx('message-status')}>
                            <div className="status">
                                {returnOrder?.status === 1 && (
                                    <p>Your return is waiting for check by Admin</p>
                                )}
                                {returnOrder?.status === 2 && (
                                    <p>
                                        Drop off the items by{' '}
                                        {expectedDate(returnOrder?.date_pickup)}
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
                                {returnOrder?.status === 6 && <p>Cancel</p>}
                            </div>
                        </div>
                        <div className={cx('process-information')}>
                            <div className={cx('left-content')}>
                                <div className={cx('pixelplus-steps-steps')}>
                                    <div
                                        className={cx('pixelplus-steps-step', 'active')}
                                        data-id="0"
                                    >
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>
                                                            Please Waiting for your confirmation
                                                            return
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Drop off the items</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Items was shipping to us</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        {' '}
                                                        <strong>
                                                            Refund sent within a week after we get
                                                            the items
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Your Return was checked</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Drop off the items</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
                                                        style={{ display: 'block' }}
                                                    >
                                                        <p>
                                                            {expectedDate(returnOrder?.date_pickup)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('pixelplus-steps-step')} data-id="3">
                                                <div
                                                    className={cx('pixelplus-steps-step__number')}
                                                ></div>
                                                <div className={cx('pixelplus-steps-step__text')}>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Items was shipping to us</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        {' '}
                                                        <strong>
                                                            Refund sent within a week after we get
                                                            the items
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Your Return was checked</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Drop off the items</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
                                                        style={{ display: 'block' }}
                                                    >
                                                        <p>
                                                            {expectedDate(returnOrder?.date_pickup)}
                                                        </p>
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Items was shipping to us</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        {' '}
                                                        <strong>
                                                            Refund sent within a week after we get
                                                            the items
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Your Return was checked</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Drop off the items</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
                                                        style={{ display: 'block' }}
                                                    >
                                                        <p>
                                                            {expectedDate(returnOrder?.date_pickup)}
                                                        </p>
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Items was shipping to us</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        {' '}
                                                        <strong>
                                                            Refund sent within a week after we get
                                                            the items
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Drop off the items</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Completed Refund</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Drop off the items</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
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
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__title',
                                                        )}
                                                    >
                                                        <strong>Cancellation for Returns</strong>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'pixelplus-steps-step__excerpt',
                                                        )}
                                                        style={{ display: 'block' }}
                                                    >
                                                        <p></p>
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
                                        <p>{returnOrder?.phone.replace(/[\[\]"]+/g, '')}</p>
                                    </div>
                                </div>
                                <div className={cx('name')}>
                                    <div className={cx('first-name')}>
                                        <p className={cx('label')}>Address:</p>
                                        <p>{returnOrder?.address.replace(/[\[\]"]+/g, '')}</p>
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
                                        {returnOrder?.Orders.map((product) => {
                                            return (
                                                <p className={cx('order-code')}>
                                                    Order #2024{product?.id}
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <div className={cx('body-order')}>
                                        {returnOrder?.Orders.map((product) => {
                                            return (
                                                <Order_Item
                                                    product={product?.OrderDetails}
                                                ></Order_Item>
                                            );
                                        })}
                                    </div>
                                    <div className={cx('payment-wrapper-modal')}>
                                        <div
                                            className={cx('payment-display-modal', 'total-wrapper')}
                                        >
                                            <p className={cx('label-modal', 'total')}>Total</p>
                                            {returnOrder?.Orders.map((product) => {
                                                return (
                                                    <p className={cx('discount-price-modal')}>
                                                        {formatPrice(product?.total)}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('broken-img-video')}>
                                        <label className={cx('broken-title')}>
                                            Images and Video About Broken Product
                                        </label>
                                        <SliderImageReponsive
                                            images={returnOrder?.img}
                                            video={returnOrder?.video}
                                        ></SliderImageReponsive>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Modal>
    );
}

export default ModalDetailReturn;

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
