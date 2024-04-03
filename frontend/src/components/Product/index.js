import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import share from '../../assets/img/share.png';
import bookmark from '../../assets/img/book-mark.png';
import love from '../../assets/img/love.png';
import star from '../../assets/img/star.png';
import message from '../../assets/img/message.png';
import cart from '../../assets/img/icon-cart.png';
import deliveryIcon from '../../assets/img/delivery.png';
import returnIcon from '../../assets/img/return.png';
import color1 from '../../assets/img/Group 5.png';
import color2 from '../../assets/img/Group 6.png';
import color3 from '../../assets/img/Group 7.png';
import color4 from '../../assets/img/Group 8.png';
import color5 from '../../assets/img/Group 9.png';
import RelatedProduct from '../RelatedProduct';
import prevIcon from '../../assets/img/prev.png';
import nextIcon from '../../assets/img/Frame (8).png';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { formatPrice, priceDiscount } from '../../common';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel_Detail_Product';
import images from '../../assets/img';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../Button';
import Slider from '../Carousel/Slider';
import { toast } from 'react-toastify';
import { UseContextUser } from '../../hooks/useContextUser';

const cx = classNames.bind(styles);

function Product() {
    const { id } = useParams();
    const param = useParams();
    const [product, setProduct] = useState({});
    const [checked, setChecked] = useState();
    const [size, setSize] = useState(['Small', 'Medium', 'Large', 'Extra Large', 'XXL']);
    const [type, setType] = useState('Description');
    const [image, setImage] = useState([]);
    console.log(image);
    const [quantity_Order, setQuantity_Order] = useState(1);
    console.log(product);
    const tabs = ['Description', 'Reviews'];
    const state = useContext(UseContextUser);
    const benefits = [
        'Durable leather is easily cleanable so you can keep your look fresh.',
        'Water-repellent finish and internal membrane help keep your feet dry.',
        'Toe piece with star pattern adds durability.',
        'Synthetic insulation helps keep you warm.',
        'Originally designed for performance hoops, the Air unit delivers lightweight cushioning.',
        'Plush tongue wraps over the ankle to help keep out the moisture and cold.',
    ];
    const details = [
        'Not intended for use as Personal Protective Equipment (PPE)',
        'Water-repellent finish and internal membrane help keep your feet dry.',
        'Lunarlon midsole delivers ultra-plush responsiveness',
        'Encapsulated Air-Sole heel unit for lightweight cushioning',
        'Colour Shown: Ale Brown/Black/Goldtone/Ale Brown',
        'Style: 805899-202',
    ];
    // const [imgSelectedIndex,setImgSelectedIndex] = useState(0);
    // const [count,setCount] = useState(1);
    // const {cartState:{products,total,quantity,isCheckOut},cartDispatch,increment} = CartState();
    // const {user} = AuthState();
    // let prevCount =0;
    // data.qty = count;
    // //const [imgs,setImgs] = useState([]);
    // let imgs = data.hinh_anh ? JSON.parse(data?.hinh_anh):[];
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(`${url}/products/${id}`, {
                    signal: controller.signal,
                });
                setProduct(respone.data);
                console.log(respone.data);
                // setImage(respone?.data?.hinh_anh);
                // const cleanedString = respone?.data?.hinh_anh.slice(1, -1);
                // // Tách chuỗi thành mảng sử dụng dấu phẩy làm dấu phân cách
                // const arrayWithoutQuotes = cleanedString.split(',');
                // // Xóa dấu ngoặc kép và khoảng trắng ở đầu và cuối mỗi phần tử trong mảng
                // const finalArray = arrayWithoutQuotes.map(item => item.replace(/"/g, '').trim());
                setImage(respone?.data?.img);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, [id]);
    // console.log(imgs);
    // const handleIncrease = () => {
    //     setCount(count+1);
    // }

    // const handleDecrease =() => {
    //     if(count>1) {
    //         setCount(count-1);
    //     }
    // }
    // console.log(count)
    const handleAddToCart = async () => {
        try {
            // console.log(state?.cuser?.value);
            // console.log(product);
            // await axios.post(url+"/cart/create",{id_user:user.id,id_product:Number(id),so_luong:count,nameProduct:data?.ten_san_pham,priceProduct:data?.gia_khuyen_mai,img:`${url}/img/${imgs?.[0]}`})
            let data = {
                id_user: state?.cuser?.value?.id,
                id_product: Number(id),
                quantity: quantity_Order,
                nameProduct: product?.name,
                priceProduct: product?.discount_price,
                img: `${url}/img/${image[0]}`,
            };
            await axios.post(url + '/cart/create', data);
            state?.render?.setRender((prev) => !prev);
            // console.log(duma)
        } catch (e) {
            console.log(e);
        }
    };
    //`${url}/img/${imgs.current?.[imgSelectedIndex]}`
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('product-first')}>
                    <Carousel images={image} product={product} reset={id}></Carousel>
                    <div className={cx('product-option')}>
                        <ul className={cx('path')}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <span> &#62; </span>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <span> &#62; </span>
                            <li>
                                <Link to="#">{product?.type}</Link>
                            </li>
                            <span> &#62; </span>
                            <li>
                                <a href="#">
                                    <strong>{product?.name}</strong>
                                </a>
                            </li>
                        </ul>
                        <div className={cx('product-header')}>
                            <div className={cx('product-title')}>
                                <p>{product?.name}</p>
                                <span>Mã sản phẩm: {product?.id}</span>
                            </div>
                        </div>
                        <div className={cx('product-price-assess')}>
                            <div className={cx('product-price-assess-wrapper')}>
                                <div className={cx('price-wrapper')}>
                                    <p className={cx('price')}>
                                        {formatPrice(product?.discount_price)}
                                    </p>
                                    <p className={cx('price-old')}>{formatPrice(product?.price)}</p>
                                </div>
                                <div className={cx('assess-wrapper')}>
                                    <div className={cx('star-reviews')}>
                                        <div className={cx('star')}>
                                            <img src={images.star} alt="" />
                                            <span>4.8</span>
                                        </div>
                                        <div className={cx('previews')}>
                                            <img src={images.reviews} alt="" />
                                            <span>67 Reviews</span>
                                        </div>
                                        <div className={cx('heart')}>
                                            <img src={images.heart} alt="" />
                                            <span>109</span>
                                        </div>
                                    </div>
                                    <div className={cx('ratio-wrapper')}>
                                        <p>
                                            <span>93%</span> of buyers have recommended this
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('product-size')}>
                            <div className={cx('product-size-wrapper')}>
                                <div className={cx('title-size')}>
                                    <p>Choose a Size</p>
                                    {/* {checked &&
                                        (size_quantity_select && size_quantity_select > 0 ? (
                                            <p className={cx('status')}>{size_quantity_select} products left</p>
                                        ) : (
                                            <p className={cx('sold-out')}>Sold out</p>
                                        ))} */}
                                    {/* {size_quantity_select && size_quantity_select > 0 ? (
                                        <p className={cx('status')}>{size_quantity_select} products left</p>
                                    ) : (
                                        <p className={cx('sold-out')}>Sold out</p>
                                    )} */}
                                </div>

                                {size.map((size, index) => {
                                    return (
                                        <label className={cx('size')} key={index}>
                                            <input
                                                type="radio"
                                                name="radio"
                                                // type="radio"
                                                // value={}
                                                checked={checked === size} //logic neu nhu checked === "size" thi no se check
                                                onChange={() => setChecked(size)}
                                            />
                                            <span>{size}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={cx('quantity_product')}>
                            {/* <p className={cx('quantity')}>Số Lượng: </p> */}
                            <div className={cx('wrapper-quantity')}>
                                <span
                                    className={cx('minus')}
                                    onClick={() =>
                                        setQuantity_Order((prev) => (prev === 1 ? prev : prev - 1))
                                    }
                                >
                                    -
                                </span>
                                <span className={cx('num')}>{quantity_Order}</span>
                                <span
                                    className={cx('plus')}
                                    onClick={() =>
                                        setQuantity_Order((prev) => {
                                            // if (prev + 1 > size_quantity_select) {
                                            //     toast.info(`Vượt quá số lượng còn lại trong kho`, {
                                            //         position: 'top-right',
                                            //         autoClose: 5000,
                                            //         hideProgressBar: false,
                                            //         closeOnClick: true,
                                            //         pauseOnHover: true,
                                            //         draggable: true,
                                            //         progress: undefined,
                                            //         // theme: 'light',
                                            //         theme: 'colored',
                                            //     });
                                            //     return prev;
                                            // } else {
                                            //     return prev + 1;
                                            // }
                                            return prev + 1;
                                        })
                                    }
                                >
                                    +
                                </span>
                            </div>
                            <Button
                                primary
                                rounded
                                shopping
                                leftIcon={
                                    <img className={cx('shopping-img')} src={images.shopping} />
                                }
                                onClick={handleAddToCart}
                                // onClick={() => {
                                //     handleAddProductToCart(product?.id);
                                // }}
                            >
                                Add to Cart!
                            </Button>
                            {/* {size_quantity_select > 0 && quantity_Order - 1 < size_quantity_select ? (
                                <Button
                                    primary
                                    rounded
                                    shopping
                                    leftIcon={<img className={cx('shopping-img')} src={images.shopping} />}
                                    onClick={() => {
                                        handleAddProductToCart(product?.id);
                                    }}
                                >
                                    Add to Cart!
                                </Button>
                            ) : (
                                <Button
                                    primary
                                    rounded
                                    shopping
                                    leftIcon={<img className={cx('shopping-img')} src={images.shopping} />}
                                    disabled
                                >
                                    Add to Cart!
                                </Button>
                            )} */}

                            {/* <img className={cx('cart-img')} src={images.cart} alt="logo-cart" /> */}
                            {/* <p className={cx("mess_quantity_prod")}>{size_quantiry_select < quantity_Order ? `Size của sản phẩm này không đủ số lượng mà bạn cần. Hiện có ${product?.inventory?.find(i => i.size === size_Order).quantity} sản phẩm` : ""}</p> */}
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
                                            Free 30 days Delivery Return. Details
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product-second')}>
                    <div className={cx('info-container')}>
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
                        {type === 'Description' && tabs ? (
                            <>
                                <div id="desc" className={cx('infor-container-description')}>
                                    <h1>Product Description</h1>
                                    <p>{product.description}</p>
                                </div>
                                <div className={cx('infor-container-description')}>
                                    <h1>Benefits</h1>
                                    <ul className={cx('list-benefit')}>
                                        {benefits.map((benefit, i) => {
                                            return (
                                                <div key={i} className={cx('benefit')}>
                                                    <img src={images.check_icon} alt="" />
                                                    <li className={cx('benefit-line')}>
                                                        {benefit}
                                                    </li>
                                                </div>
                                            );
                                        })}
                                    </ul>

                                    {/* <p>{product.description}</p> */}
                                </div>
                                <div className={cx('infor-container-description')}>
                                    <h1>Product Details</h1>
                                    <ul className={cx('list-benefit')}>
                                        {details.map((details, i) => {
                                            return (
                                                <div key={i} className={cx('benefit')}>
                                                    <img src={images.check_icon} alt="" />
                                                    <li className={cx('benefit-line')}>
                                                        {details}
                                                    </li>
                                                </div>
                                            );
                                        })}
                                    </ul>

                                    {/* <p>{product.description}</p> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <div></div>
                            </>
                        )}

                        <div className={cx('infor-container-description')}>
                            <h1>Also You Like</h1>
                            <Slider param={param} images={image}></Slider>
                        </div>
                    </div>
                </div>
                <div className={cx('product-third')}></div>
            </div>
        </>
    );
}

export default Product;
