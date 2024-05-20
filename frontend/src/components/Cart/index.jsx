import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState, useMemo } from 'react';
import { url } from '../../constants';
import axios from 'axios';
import { formatPrice } from '../../common';
import images from '../../assets/img';
import { Link, useNavigate } from 'react-router-dom';
import { UseContextUser } from '../../hooks/useContextUser';
import Product_Item from './Product_Item';
import Button from '../Button';
import AddressPicker from '../AddressPicker';
import { toast } from 'react-toastify';
import ModalComp from '../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Cart() {
    const state = useContext(UseContextUser);
    const [product, setProduct] = useState([]);
    const [isAddress, setIsAddress] = useState(false);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [shipment, setShipment] = useState('save');
    const [cash, setCash] = useState('COD');
    const [, setCity] = useState('');
    const [noted, setNoted] = useState('');
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const updateState = (newState) => {
        setIsAddress(newState);
    };
    const setAddressToParent = (data) => {
        setAddress(data);
    };
    const schema = yup
        .object()
        .shape({
            select: yup.string().required('Bạn cần lựa chọn thành phố'),
        })
        .required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {},
        resolver: yupResolver(schema),
    });
    // console.log(product);
    const handleCreateOrder = async (data) => {
        let futureDate = moment().add(7, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        let productArr = state?.cart?.value
            .filter((prod) => prod.isChecked === true)
            .map((prod) => {
                return {
                    id_product: prod?.id_product,
                    quantity: prod?.quantity,
                    size: prod?.size,
                    rating: 0,
                };
            });
        console.log(productArr);
        const dataPost = {
            name: address.name,
            address: address.address + ', ' + data.select,
            phone: address.phoneNumber,
            note: noted,
            status: 1,
            payed: 0,
            total: shipment === 'save' ? totalSum : totalSum + 50000,
            id_user: state?.cuser?.value?.id,
            returnDate: futureDate,
            products: productArr,
        };
        console.log(dataPost);

        let prodTicked = state?.cart?.value?.filter((prod) => prod.isChecked === true);
        let dataDelete = JSON.stringify(prodTicked.map((prod) => prod.id));
        let prodTickeds = product.filter((prod) => prod.isChecked === true);
        console.log({
            item_list: {
                items: prodTickeds.map((prod) => {
                    return {
                        name: JSON.stringify(prod.nameProduct),
                        sku: '001',
                        price: JSON.stringify(
                            Math.ceil(
                                ((prod.priceProduct * prod.quantity +
                                    prod.priceProduct * 0.065 * prod.quantity) /
                                    23000) *
                                    100,
                            ) / 100,
                        ),
                        currency: 'USD',
                        quantity: prod.quantity,
                    };
                }),
            },
            total: prodTickeds.reduce((acc, prod) => {
                return (
                    acc +
                    Math.ceil(
                        ((prod.priceProduct * prod.quantity +
                            prod.priceProduct * 0.065 * prod.quantity) /
                            23000) *
                            100,
                    ) /
                        100
                );
            }, 0),
        });
        // console.log({
        //     order: {
        //         ...dataPost,
        //         status: 2,
        //         payed: 1,
        //     },
        //     product: prodTickeds.map((prod) => {
        //         let inventoryUpdate = prod?.product?.Inventories?.find((item) => {
        //             return item.size == prod?.size?.replace(/[\[\]"]+/g, '');
        //         });
        //         return {
        //             cart_id: prod.id,
        //             // quantity: prod.quantity,
        //             Inventories: {
        //                 ...inventoryUpdate,
        //                 quantity: inventoryUpdate.quantity - prod.quantity,
        //             },
        //         };
        //     }),
        // });
        if (cash === 'COD') {
            try {
                const requests = product?.map((prod) => {
                    let sizeSelected = prod?.product?.Inventories?.find((item) => {
                        return item.size == prod?.size?.replace(/[\[\]"]+/g, '');
                    });
                    // console.log(sizeSelected);
                    sizeSelected.quantity = sizeSelected.quantity - prod.quantity; // Cập nhật quantity thành 13
                    // let newData = [...prod?.Inventories, sizeSelected];
                    return axios.put(`${url}/inventory/update/${prod.id}`, {
                        listInventory: [sizeSelected],
                    });
                });
                await Promise.all(requests);
                await axios.post(`${url}/order/create`, dataPost);
                await axios.post(`${url}/cart/delete/product/${state?.cuser?.value?.id}`, {
                    listIds: dataDelete,
                });
                toast.success(`Thành công!`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                state?.render?.setRender((prev) => !prev);
                handleClose();
            } catch (error) {
                console.log(error);
            }
        } else if (cash === 'Vnpay') {
            try {
                const res = await axios.post(url + '/create_payment_url', {
                    amount: shipment === 'save' ? totalSum : totalSum + 50000,
                    bankCode: 'VNBANK',
                    language: 'vn',
                    order: {
                        ...dataPost,
                        payed: 1,
                    },
                    product: prodTickeds.map((prod) => {
                        let inventoryUpdate = prod?.product?.Inventories?.find((item) => {
                            return item.size == prod?.size?.replace(/[\[\]"]+/g, '');
                        });
                        return {
                            cart_id: prod.id,
                            // quantity: prod.quantity,
                            Inventories: {
                                ...inventoryUpdate,
                                quantity: inventoryUpdate.quantity - prod.quantity,
                            },
                        };
                    }),
                });
                if (res) {
                    console.log(res.data);
                    window.location.replace(`${res.data}`);
                }
            } catch (e) {
                console.log(e);
            }
        } else if (cash === 'Paypal') {
            setShipment('save');
            try {
                let res = await axios.post(url + '/paypal/payment', {
                    order: {
                        ...dataPost,
                        payed: 1,
                    },
                    product: prodTickeds.map((prod) => {
                        let inventoryUpdate = prod?.product?.Inventories?.find((item) => {
                            return item.size == prod?.size?.replace(/[\[\]"]+/g, '');
                        });
                        return {
                            cart_id: prod.id,
                            // quantity: prod.quantity,
                            Inventories: {
                                ...inventoryUpdate,
                                quantity: inventoryUpdate.quantity - prod.quantity,
                            },
                        };
                    }),
                    item_list: {
                        items: prodTickeds.map((prod) => {
                            return {
                                name: prod.nameProduct,
                                sku: '001',
                                price: JSON.stringify(
                                    Math.ceil(
                                        ((prod.priceProduct + prod.priceProduct * 0.065) / 23000) *
                                            100,
                                    ) / 100,
                                ),
                                currency: 'USD',
                                quantity: prod.quantity,
                            };
                        }),
                    },
                    total: JSON.stringify(
                        prodTickeds.reduce((acc, prod) => {
                            return (
                                acc +
                                Math.ceil(
                                    ((prod.priceProduct * prod.quantity +
                                        prod.priceProduct * 0.065 * prod.quantity) /
                                        23000) *
                                        100,
                                ) /
                                    100
                            );
                        }, 0),
                    ),
                });
                if (res) {
                    window.location = res.data.forwardLink;
                }
                // navigate(`/paypal/payment/success`);
            } catch (e) {
                console.log(e);
            }
        }
    };
    const subtotal = useMemo(() => {
        let check = state?.cart?.value?.filter((prod) => {
            // console.log(prod);
            return prod.isChecked === true;
        });
        // console.log(check);
        let total = check.reduce((cur, acc) => {
            return cur + acc.quantity * acc.priceProduct;
        }, 0);
        return total;
    }, [state?.cart?.value]);
    // console.log(subtotal);
    const tax = useMemo(() => {
        let productArr = state?.cart?.value.filter((prod) => prod.isChecked === true);
        let result_tax = productArr.reduce((current, value) => {
            return current + value.priceProduct * 0.065 * value.quantity;
        }, 0);
        return result_tax;
        // return total;
    }, [state?.cart?.value]);
    const totalSum = useMemo(() => {
        return subtotal + tax;
    }, [subtotal, tax]);
    useEffect(() => {
        let product_id = state.cart.value.map((i) => i.id_product);
        const fetchProducts = async () => {
            try {
                const baseUrl = `${url}/products`;
                const requests = product_id?.map((id) => axios.get(`${baseUrl}/${id}`));
                const responses = await Promise.all(requests);
                const products = responses.map((response) => response.data);
                let product_cart = state?.cart?.value;
                let a = product_cart?.map((item) => {
                    return {
                        ...item,
                        product: products?.find((i) => i.id === item.id_product),
                    };
                });
                setProduct(a);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };
        // Gọi hàm lấy danh sách sản phẩm
        fetchProducts();
    }, [state.cart.value]);

    const handleCheckAll = (e) => {
        let newCart = product?.map((prod) => {
            return {
                ...prod,
                isChecked: e.target.checked,
            };
        });
        state?.cart?.setCart(newCart);
    };
    const handleRemoveProdTicked = () => {
        console.log('Hello');
        let prodTicked = state?.cart?.value?.filter((prod) => prod.isChecked === true);
        if (prodTicked.length > 0) {
            let dataDelete = JSON.stringify(prodTicked.map((prod) => prod.id));
            axios
                .post(`${url}/cart/delete/product/${state?.cuser?.value?.id}`, {
                    listIds: dataDelete,
                })
                .then((res) => {
                    toast.success(`${res.data.msg}!`, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    state?.render?.setRender((prev) => !prev);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('header-title')}>
                        <p>Cart</p>
                        {state?.cuser?.value?.Role?.id === 4 && (
                            <p className={cx('total-product')}>(Your account is blocked)</p>
                        )}
                    </div>
                    <AddressPicker
                        isAddress={updateState}
                        setAddressToParent={setAddressToParent}
                    ></AddressPicker>
                    <div className={cx('select-remove')}>
                        <div className={cx('select')}>
                            <input
                                type="checkbox"
                                checked={
                                    state?.cart?.value.find((prod) => prod.isChecked === false) ===
                                        undefined && state?.cart?.value.length > 0
                                }
                                onChange={handleCheckAll}
                            />
                            <p>Select All</p>
                        </div>
                        <div className={cx('remove')} onClick={handleRemoveProdTicked}>
                            <img src={images.clear} alt="" />
                            <p>Delete</p>
                        </div>
                    </div>
                    <div className={cx('product')}>
                        {product?.length > 0 ? (
                            product?.map((item, i) => {
                                return <Product_Item item={item} key={i} index={i}></Product_Item>;
                            })
                        ) : (
                            <div className={cx('notification')}>
                                {/* <h1>Xin chao</h1> */}
                                <p>Không có sản phẩm nào trong giỏ hàng</p>
                                <div
                                    className={cx('return_to_store')}
                                    onClick={() => {
                                        navigate('/products?page=1&limit=9');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                                    <p className={cx('return')}>Return to Store!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('payment')}>
                    <div className={cx('payment-wrapper')}>
                        <div className={cx('payment-title')}>
                            <p>Summary</p>
                        </div>
                        <div className={cx('payment-display')}>
                            <p className={cx('label')}>Subtotal</p>
                            <p className={cx('price')}>{formatPrice(subtotal)}</p>
                        </div>
                        <div className={cx('payment-display')}>
                            <p className={cx('label')}>Sales tax (6.5%)</p>
                            <p className={cx('price')}>{formatPrice(tax)}</p>
                        </div>
                        <div className={cx('payment-display')}>
                            <p className={cx('label')}>Shipping Fee</p>
                            <p className={cx('discount-price')}>Free</p>
                        </div>
                        <div className={cx('payment-display')}>
                            <p className={cx('label')}>Total Due</p>
                            <p className={cx('discount-price')}>{formatPrice(totalSum)}</p>
                        </div>
                        {state?.cart?.value.find((prod) => prod.isChecked === true) !== undefined &&
                        product.length > 0 &&
                        state?.cuser?.value?.Role?.id !== 4 &&
                        isAddress === true ? (
                            <Button
                                // className={cx('btn_payment')}

                                onClick={() => handleShow()}
                                payment
                                // rounded
                                // onClick={(e) => {
                                //     const user = JSON.parse(localStorage.getItem("tokens"))
                                //     if(!user.status) {
                                //         alert("Hãy đăng nhập để mua hàng")
                                //         navigate("/signin")
                                //     }

                                //     handleSubmit(handleOrder)(e)

                                // }}
                            >
                                {/* Checkout - {formatPrice(totalSum)} */}
                                Checkout
                            </Button>
                        ) : (
                            <Button payment disabled>
                                Checkout
                            </Button>
                        )}

                        <Link to={`/products?page=1&limit=9`}>
                            <button className={cx('btn_continue_shopping')}>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                    <div className={cx('delivery')}>
                        <div className={cx('delivery-wrapper')}>
                            <div className={cx('delivery-promotion')}>
                                <div className={cx('icon-delivery')}>
                                    <img src={images.truck} alt="" />
                                </div>
                                <div className={cx('content-delivery-promotion')}>
                                    <p className={cx('delivery-title')}>Free Delivery</p>
                                    <p className={cx('delivery-sub-title')}>
                                        Enter your Postal code for Delivery Availability
                                    </p>
                                </div>
                            </div>

                            <div className={cx('refund-delivery-detail')}>
                                <div className={cx('icon-delivery')}>
                                    <img src={images.cart_red} alt="" />
                                </div>
                                <div className={cx('content-delivery-promotion')}>
                                    <p className={cx('delivery-title')}>Return Delivery</p>
                                    <p className={cx('delivery-sub-title')}>
                                        7 days to return it to us for a refund. We have made returns
                                        SO EASY - you can now return your order to a store or send
                                        it with FedEx FOR FREE
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalComp showModal={showModal} handleClose={handleClose}>
                <div className={cx('modal-wrapper')}>
                    <div className={cx('left-modal')}>
                        <div className={cx('left-title')}>
                            <p>Product</p>
                        </div>
                        <div className={cx('product-modal')}>
                            <div className={cx('product-frame')}>
                                {product
                                    .filter((prod) => prod.isChecked === true)
                                    .map((item, i) => {
                                        return (
                                            <div key={i} className={cx('item-modal')}>
                                                <div className={cx('img-item')}>
                                                    <img src={`${item?.img}`} alt="" />
                                                </div>
                                                <div className={cx('item-infor')}>
                                                    <p className={cx('name-prod')}>
                                                        {item?.product?.name}
                                                    </p>
                                                    <p className={cx('price-prod')}>
                                                        {formatPrice(item.priceProduct)}
                                                    </p>
                                                    <div className={cx('size-quantity-prod')}>
                                                        <div className={cx('size-wrapper')}>
                                                            <p>
                                                                Size:{' '}
                                                                <span>
                                                                    {item?.size?.replace(
                                                                        /[\[\]"]+/g,
                                                                        '',
                                                                    )}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <p>
                                                            x<span>{item?.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        <div className={cx('payment-wrapper-modal')}>
                            <div className={cx('payment-display-modal')}>
                                <p className={cx('label-modal')}>Subtotal</p>
                                <p className={cx('price-modal')}>{formatPrice(subtotal)}</p>
                            </div>
                            <div className={cx('payment-display-modal')}>
                                <p className={cx('label-modal')}>Sales tax (6.5%)</p>
                                <p className={cx('discount-price-modal')}>{formatPrice(tax)}</p>
                            </div>
                            <div className={cx('payment-display-modal')}>
                                <p className={cx('label-modal')}>Shipping Fee</p>
                                <p className={cx('discount-price-modal')}>
                                    {shipment === 'save' ? 'Free' : formatPrice(50000)}
                                </p>
                            </div>
                            <div className={cx('payment-display-modal', 'total-wrapper')}>
                                <p className={cx('label-modal', 'total')}>Total</p>
                                <p className={cx('discount-price-modal')}>
                                    {shipment === 'save'
                                        ? formatPrice(totalSum)
                                        : formatPrice(totalSum + 50000)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-modal')}>
                        <p className={cx('modal-title')}>Shipping Detail</p>
                        <div className={cx('content-right')}>
                            <div className={cx('customer-name')}>
                                <div className={cx('first-name')}>
                                    <label htmlFor="firstname" className="form-label">
                                        Name: *
                                    </label>
                                    <input
                                        id="name"
                                        name="ho"
                                        type="text"
                                        className="form-control"
                                        disabled
                                        value={address?.name}
                                    />
                                </div>
                                {/* <div className={cx('last-name')}>
                                    <label htmlFor="lastname" className="form-label">
                                        Name: *
                                    </label>
                                    <input
                                        id="lastname"
                                        name="ten"
                                        type="text"
                                        className="form-control"
                                        {...register('lastname')}
                                    />
                                    {errors.lastname && (
                                        <span className={cx('form-message')}>
                                            {errors.lastname.message}
                                        </span>
                                    )}
                                </div> */}
                            </div>
                            <div className={cx('phone-number')}>
                                <label htmlFor="phoneNumber" className="form-label">
                                    Phone Number:
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={address.phoneNumber}
                                />
                            </div>
                            <div className={cx('city')}>
                                <label htmlFor="ten" className="form-label">
                                    City: *
                                </label>

                                <select
                                    onChange={(e) => {
                                        // setCity(e.target.value);
                                        setCity(e.target.value);
                                    }}
                                    className={cx('city-dropdown')}
                                    {...register('select')}
                                >
                                    <option value="">---Chọn Thành phố---</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="Quảng Nam">Quảng Nam</option>
                                    <option value="Huế">Huế</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    <option value="Hải Phòng">Hải Phòng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Đà Lạt">Đà Lạt</option>
                                    <option value="Nha Trang">Nha Trang</option>
                                    <option value="Vũng Tàu">Vũng Tàu</option>
                                    <option value="Phan Thiết">Phan Thiết</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="Quy Nhơn">Quy Nhơn</option>
                                    <option value="Pleiku">Pleiku</option>
                                </select>
                                {errors.select && (
                                    <span className={cx('form-message')}>
                                        {errors.select.message}
                                    </span>
                                )}
                            </div>
                            <div className={cx('address')}>
                                <label htmlFor="address" className="form-label">
                                    Address: *
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={address?.address}
                                />
                            </div>
                            <div className={cx('input_product')}>
                                <label style={{ display: 'block' }} className={cx('label-product')}>
                                    Noted:{' '}
                                </label>
                                <textarea
                                    className={cx('input_textarea')}
                                    placeholder="Please Comment!"
                                    onChange={(e) => setNoted(e.target.value)}
                                    // {...register("description", { required: true })}
                                ></textarea>
                            </div>
                            {/* <button onClick={() => callAPI()}>Click me!</button> */}
                        </div>
                        <p className={cx('modal-title')}>Shipment Method</p>
                        <ul className={cx('shipment-method')}>
                            <li className={cx('method')}>
                                <input
                                    type="radio"
                                    id="save"
                                    checked={shipment === 'save'}
                                    onChange={() => {
                                        setShipment('save');
                                    }}
                                />
                                <label htmlFor="save">Vận chuyển Tiết kiệm (từ 3 - 5 ngày)</label>
                            </li>
                            <li className={cx('method')}>
                                <input
                                    type="radio"
                                    id="fast"
                                    checked={shipment === 'fast' && cash !== 'Paypal'}
                                    onChange={() => {
                                        if (cash !== 'Paypal') {
                                            setShipment('fast');
                                        }
                                    }}
                                />
                                <label htmlFor="fast">Vận chuyển Nhanh (từ 2 - 3 ngày)</label>
                            </li>
                        </ul>
                        <p className={cx('modal-title')}>Payment Method</p>
                        <ul className={cx('payment-method')}>
                            <li className={cx('method')}>
                                <input
                                    type="radio"
                                    id="cod"
                                    checked={cash === 'COD'}
                                    onChange={() => {
                                        setCash('COD');
                                    }}
                                />
                                <label htmlFor="cod">COD (Cash On Delivery)</label>
                            </li>
                            <li className={cx('method')}>
                                <input
                                    type="radio"
                                    id="paypal"
                                    checked={cash === 'Paypal'}
                                    onChange={() => {
                                        setCash('Paypal');
                                        setShipment('save');
                                    }}
                                />
                                <label htmlFor="paypal">Paypal</label>
                            </li>
                            <li className={cx('method')}>
                                <input
                                    type="radio"
                                    id="vnpay"
                                    checked={cash === 'Vnpay'}
                                    onChange={() => {
                                        setCash('Vnpay');
                                    }}
                                />
                                <label htmlFor="vnpay">VNPAY</label>
                            </li>
                        </ul>
                        <div className={cx('btn-pay')}>
                            <Button
                                onClick={(e) => {
                                    const user = JSON.parse(localStorage.getItem('user'));
                                    if (!user) {
                                        alert('Hãy đăng nhập để mua hàng');
                                        navigate('/login');
                                    } else {
                                        handleSubmit(handleCreateOrder)(e);
                                    }
                                }}
                                primary
                                // rounded
                                order
                            >
                                Xác nhận đặt hàng
                            </Button>
                        </div>
                    </div>

                    <button className={cx('modal-close')} onClick={handleClose}>
                        &times;
                    </button>
                </div>
            </ModalComp>
        </>
    );
}

export default Cart;
