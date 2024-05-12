import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { formatPrice } from '../../common';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel_Detail_Product';
import images from '../../assets/img';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../Button';
import Slider from '../Carousel/Slider';
import { toast } from 'react-toastify';
import { UseContextUser } from '../../hooks/useContextUser';
import AvatarAuto from '../AvatarAuto';
import { expectedDate } from '../../utils';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import SliderImageReponsive from '../SliderImageReponsive';
import { StoreContext } from '../PageLoading/store';
import { actions } from '../PageLoading/store';
import { Modal } from 'antd';

const cx = classNames.bind(styles);

function Product() {
    const { id } = useParams();
    const param = useParams();
    console.log(param);
    const navigator = useNavigate();
    const [product, setProduct] = useState({});
    const [checked, setChecked] = useState();
    const [size, setSize] = useState([]);
    const [type, setType] = useState('Description');
    const [image, setImage] = useState([]);
    // console.log(image);
    const [quantity_Order, setQuantity_Order] = useState(1);
    const [reviews, setReviews] = useState([]);

    const tabs = ['Description', 'Reviews'];
    const state = useContext(UseContextUser);
    const [isLoading, dispatch] = useContext(StoreContext);

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        navigator(`/login`);
    };
    const size_quantity_select = product?.Inventories?.find(
        (obj) => obj?.size === checked,
    )?.quantity;
    const ratingsCount = Array.from(
        { length: 5 },
        (_, i) => reviews.filter((review) => review.rating === i + 1).length,
    );
    const ratingPercentages = ratingsCount.map((count) => (count / reviews.length) * 100);
    const sortedRatingPercentages = ratingPercentages.slice().reverse();
    const averageRating = useMemo(() => {
        let result = 0;
        if (reviews.length > 0) {
            result =
                reviews.map((review) => review.rating).reduce((acc, curr) => acc + curr, 0) /
                reviews.length;
        }

        return result;
    }, [reviews]);
    // console.log(product?.Inventories?.find((obj) => obj?.size === checked)?.quantity);
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(`${url}/products/${id}`, {
                    signal: controller.signal,
                });
                const reviews = await axios.get(`${url}/reviews/${id}`, {
                    signal: controller.signal,
                });
                setReviews(reviews.data.reviews);
                setProduct(respone.data);
                setSize(respone.data.Inventories);
                setImage(respone?.data?.img);
                dispatch(actions.setLoading(false));
            } catch (e) {
                console.log(e);
            }
        };
        dispatch(actions.setLoading(true));
        setTimeout(async () => {
            await fetchData();
        }, 3000);
    }, [id]);

    const handleAddToCart = async () => {
        if (state?.cuser?.value === '') {
            setIsModalOpen(true);
        } else {
            let sizeToString = JSON.stringify([checked]);
            // const wishlistObj = state?.cart?.value.find((item) => item.id_product === id);
            let indexProd = state?.cart?.value?.findIndex((i) => {
                return i.id_product + i.size === Number(id) + JSON.stringify([checked]);
            });
            if (indexProd !== -1) {
                if (
                    state?.cart?.value[indexProd].quantity + quantity_Order >
                    size_quantity_select
                ) {
                    toast.info('Sản phẩm này đã vượt quá số lượng cho phép đặt', {
                        // autoClose: 2000,
                        theme: 'colored',
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    // newCart = [...product_list];
                    // state.cart.setCart(newCart);
                } else {
                    try {
                        let data = {
                            id_user: state?.cuser?.value?.id,
                            id_product: Number(id),
                            quantity: quantity_Order,
                            nameProduct: product?.name,
                            priceProduct: product?.discount_price,
                            size: sizeToString,
                            img: `${image[0]}`,
                        };
                        // console.log(data);
                        await axios.post(url + '/cart/create', data);
                        toast.success(`Add product to cart success`, {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            // theme: 'light',
                            theme: 'colored',
                        });
                        state?.render?.setRender((prev) => !prev);
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                try {
                    let data = {
                        id_user: state?.cuser?.value?.id,
                        id_product: Number(id),
                        quantity: quantity_Order,
                        nameProduct: product?.name,
                        priceProduct: product?.discount_price,
                        size: sizeToString,
                        img: `${image[0]}`,
                    };
                    // console.log(data);
                    await axios.post(url + '/cart/create', data);
                    toast.success(`Add product to cart success`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        // theme: 'light',
                        theme: 'colored',
                    });
                    state?.render?.setRender((prev) => !prev);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('product-first')}>
                    <Carousel images={image} product={product} reset={id}></Carousel>
                    <div className={cx('product-option')}>
                        <ul className={cx('path')}>
                            <li>
                                <Link to="/">Products</Link>
                            </li>

                            <span> &#62; </span>
                            <li>
                                <Link to={`/products?brandId=${product?.Brand?.id}`}>
                                    {product?.Brand?.brand_name}
                                </Link>
                            </li>
                            <span> &#62; </span>
                            <li>
                                <Link to={`/products?categoryId=${product?.Category?.id}`}>
                                    {product?.Category?.category_name}
                                </Link>
                            </li>
                            <span> &#62; </span>
                            <li>
                                <Link to={`/product/${product?.id}`}>
                                    <strong>{product?.name}</strong>
                                </Link>
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
                                    {product?.discount_price === product?.price ? (
                                        <>
                                            <p className={cx('price')}>
                                                {formatPrice(product?.price)}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className={cx('price')}>
                                                {formatPrice(product?.discount_price)}
                                            </p>
                                            <p className={cx('price-old')}>
                                                {formatPrice(product?.price)}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className={cx('assess-wrapper')}>
                                    <div className={cx('star-reviews')}>
                                        <div className={cx('star')}>
                                            <img src={images.star} alt="" />
                                            <span>{averageRating}</span>
                                        </div>
                                        <div className={cx('previews')}>
                                            <img src={images.reviews} alt="" />
                                            <span>{reviews.length} Reviews</span>
                                        </div>
                                        {/* <div className={cx('heart')}>
                                            <img src={images.heart} alt="" />
                                            <span>109</span>
                                        </div> */}
                                    </div>
                                    {/* <div className={cx('ratio-wrapper')}>
                                        <p>
                                            <span>93%</span> of buyers have recommended this
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className={cx('product-size')}>
                            <div className={cx('product-size-wrapper')}>
                                <div className={cx('title-size')}>
                                    <p>Choose a Size</p>
                                    {checked &&
                                        (size_quantity_select && size_quantity_select > 0 ? (
                                            <p className={cx('status')}>
                                                {size_quantity_select} products left
                                            </p>
                                        ) : (
                                            <p className={cx('sold-out')}>Sold out</p>
                                        ))}
                                </div>

                                {size.map((size, index) => {
                                    return (
                                        <label className={cx('size')} key={index}>
                                            <input
                                                type="radio"
                                                name="radio"
                                                // type="radio"
                                                // value={}
                                                checked={checked === size.size} //logic neu nhu checked === "size" thi no se check
                                                onChange={() => setChecked(size.size)}
                                            />
                                            <span>{size.size}</span>
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
                                            if (prev + 1 > size_quantity_select) {
                                                toast.info(`Vượt quá số lượng còn lại trong kho`, {
                                                    position: 'top-right',
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    // theme: 'light',
                                                    theme: 'colored',
                                                });
                                                return prev;
                                            } else {
                                                return prev + 1;
                                            }
                                        })
                                    }
                                >
                                    +
                                </span>
                            </div>

                            {size_quantity_select > 0 &&
                            quantity_Order - 1 < size_quantity_select ? (
                                <Button
                                    primary
                                    rounded
                                    shopping
                                    leftIcon={
                                        <img
                                            className={cx('shopping-img')}
                                            src={images.shopping}
                                            alt=""
                                        />
                                    }
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart!
                                </Button>
                            ) : (
                                <Button
                                    primary
                                    rounded
                                    shopping
                                    leftIcon={
                                        <img
                                            className={cx('shopping-img')}
                                            src={images.shopping}
                                            alt=""
                                        />
                                    }
                                    disabled
                                >
                                    Add to Cart!
                                </Button>
                            )}

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
                                            Free 7 days Delivery Return
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
                                    <p>{product.detail_description}</p>
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
                                </div>
                            </>
                        ) : (
                            <>
                                {reviews && reviews.length > 0 ? (
                                    <>
                                        <div className={cx('review-total')}>
                                            <div className={cx('left-review-total')}>
                                                <div className={cx('average-wrapper')}>
                                                    <p className={cx('average-title')}>
                                                        Employee Reviews
                                                    </p>
                                                    <p className={cx('average-number')}>
                                                        {averageRating.toFixed(1)}
                                                    </p>
                                                    <AverageStar
                                                        stars={averageRating.toFixed(1)}
                                                        reviews={reviews}
                                                    />
                                                    <p>({reviews.length} Reviews)</p>
                                                </div>
                                            </div>
                                            <div className={cx('right-review-total')}>
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <RatingBar
                                                        key={i + 1}
                                                        stars={5 - i}
                                                        ratingPercent={sortedRatingPercentages[i]}
                                                        reviews={reviews}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className={cx('reviews-wrapper')}>
                                            <Review reviews={reviews} />
                                        </div>
                                    </>
                                ) : (
                                    <div className={cx('notification')}>
                                        {/* <h1>Xin chao</h1> */}
                                        <p>Chưa có reviews nào về sản phẩm này</p>
                                    </div>
                                )}
                            </>
                        )}

                        <div className={cx('infor-container-description')}>
                            <h1>Also You Like</h1>
                            <Slider
                                param={param}
                                images={image}
                                nameProduct={product?.name}
                            ></Slider>
                        </div>
                    </div>
                </div>
                <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>You need to login</p>
                </Modal>
            </div>
        </>
    );
}

export default Product;

function Review({ reviews }) {
    return (
        <>
            <div className={cx('reviews-sort-wrapper')}></div>
            <div className={cx('reviews')}>
                {reviews.map((review, index) => {
                    console.log(review);
                    console.log(review?.img === '[]');
                    return (
                        <div className={cx('review')}>
                            <p className={cx('review-date-create')}>
                                {expectedDate(review.createdAt)}
                            </p>
                            <AverageStar stars={review.rating} />
                            <div className={cx('review-performace')}>
                                {/* <SliderImageReponsive
                                    images={review?.img}
                                ></SliderImageReponsive> */}
                            </div>
                            <div className={cx('review-infor')}>
                                <AvatarAuto nameU={review?.User?.fullname} />
                                <p>{review?.User?.fullname}</p>
                            </div>
                            {review.img !== '[]' && (
                                <SliderImageReponsive
                                    reviews
                                    images={review?.img}
                                    video={review?.video}
                                ></SliderImageReponsive>
                            )}
                            {/* <SliderImageReponsive
                                reviews
                                images={review?.img}
                                video={review?.video}
                            ></SliderImageReponsive> */}
                            {review?.content !== '""' && (
                                <p className={cx('review-comment')}>{review.content}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function RatingBar({ stars, ratingPercent, reviews }) {
    let quantity = reviews.filter((review) => review.rating === stars).length;
    return (
        <div className={cx('rating-bar')}>
            <label>{stars} stars</label>
            <progress className={cx('progress')} value={ratingPercent} max="100">
                {ratingPercent}%
            </progress>
            <label>{quantity}</label>
        </div>
    );
}

function AverageStar({ stars }) {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <FaStar size={30} className={cx('star-click')} color="#E7B66B" />
                ) : stars >= number ? (
                    <FaStarHalfAlt className={cx('star-click')} color="#E7B66B" size={30} />
                ) : (
                    <AiOutlineStar className={cx('star-click')} size={34} />
                )}
            </span>
        );
    });
    return <div className={cx('rating-left-star')}>{ratingStar}</div>;
}
