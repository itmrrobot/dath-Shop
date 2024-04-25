import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState, useMemo } from 'react';
import { url } from '../../constants';
import axios from 'axios';
import { formatPrice, priceDiscount } from '../../common';
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
const cx = classNames.bind(styles);

function Cart() {
    const state = useContext(UseContextUser);
    const [product, setProduct] = useState([]);
    const [isAddress, setIsAddress] = useState(false);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [shipment, setShipment] = useState('save');
    const [city, setCity] = useState('');
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
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
        let futureDate = moment().add(30, 'days').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
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
        let prodTicked = state?.cart?.value?.filter((prod) => prod.isChecked === true);
        let dataDelete = JSON.stringify(prodTicked.map((prod) => prod.id));
        console.log(dataPost);
        try {
            await axios.post(`${url}/order/create`, dataPost);
            await axios.post(`${url}/cart/delete/product/${state?.cuser?.value?.id}`, {
                listIds: dataDelete,
            });
            toast.success(`thành công!`, {
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
    };
    const totalProduct = useMemo(() => {
        return product.reduce((acc, cur) => {
            // console.log(cur.quantity);
            return acc + Number(cur?.quantity);
        }, 0);
    }, [product]);
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
    }, [product, state?.cart?.value]);
    // console.log(subtotal);
    const tax = useMemo(() => {
        return (subtotal * 6.5) / 100;
        // return total;
    }, [product, subtotal]);
    const totalSum = useMemo(() => {
        return subtotal + tax - ((subtotal + tax) * 20) / 100;
    }, [product, subtotal]);
    useEffect(() => {
        let product_id = state.cart.value.map((i) => i.id_product);
        const fetchProducts = async () => {
            try {
                const baseUrl = 'http://localhost:4000/products';
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
        let prodTicked = state?.cart?.value?.filter((prod) => prod.isChecked === true);
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
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('header-title')}>
                        <h1>Cart</h1>
                        {/* <p className="total-product">
                        ( <span>{totalProduct}</span> Products )
                    </p> */}
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
                            <img src={images.clear} />
                            <p>Delete</p>
                        </div>
                    </div>
                    <div className={cx('product')}>
                        {product?.map((item, i) => {
                            return <Product_Item item={item} key={i} index={i}></Product_Item>;
                        })}
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
                            <p className={cx('label')}>Voucher</p>
                            <p className={cx('discount-price')}>-20%</p>
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
                            <Button
                                // className={cx('btn_payment')}
                                // onClick={() => handleShow()}
                                payment
                                disabled
                            >
                                Checkout
                            </Button>
                        )}

                        <Link to={`/product?_page=1&_limit=9`}>
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
                                        30 days to return it to us for a refund. We have made
                                        returns SO EASY - you can now return your order to a store
                                        or send it with FedEx FOR FREE
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
                                <p className={cx('label-modal')}>Voucher</p>
                                <p className={cx('discount-price-modal')}>-20%</p>
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
                                    name=""
                                    id="fast"
                                    checked={shipment === 'fast'}
                                    onChange={() => {
                                        setShipment('fast');
                                    }}
                                />
                                <label htmlFor="fast">Vận chuyển Nhanh (từ 2 - 3 ngày)</label>
                            </li>
                        </ul>
                        <p className={cx('modal-title')}>Payment Method</p>
                        <ul className={cx('payment-method')}>
                            <li className={cx('method')}>
                                <input type="radio" id="cod" defaultChecked />
                                <label htmlFor="cod">COD (Cash On Delivery)</label>
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
