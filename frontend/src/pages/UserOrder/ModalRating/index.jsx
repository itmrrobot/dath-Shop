import classNames from 'classnames/bind';
import styles from './ModalRating.module.scss';
import { useState, useContext, useEffect } from 'react';
import { UseContextUser } from '../../../hooks/useContextUser';
import axios from 'axios';
import Modal from 'react-modal';
import { formatPrice, priceDiscount } from '../../../common';
import { useNavigate } from 'react-router-dom';
import images from '../../../assets/img';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
// Rating Component
import { FaStar } from 'react-icons/fa';
import { url } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
const cx = classNames.bind(styles);
function ModalRating({ show, handleClose, orderId, handleReRender }) {
    const [order, setOrder] = useState();
    const [render, setRender] = useState(false);
    const navigator = useNavigate();
    const handleChangePage = (id) => {
        navigator(`/user/order/detail/${orderId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleReRenderModal = (render) => {
        setRender(render);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/order/${orderId}`);
                console.log(response);
                setOrder(response.data);
            } catch (error) {}
        };
        fetchData();
    }, [orderId, render]);
    const expectedDate = (day, shipment) => {
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
                    zIndex: '10',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    width: '50%',
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
                <p className={cx('title')}>RATINGS YOUR ORDER #2024{orderId}</p>
                <div className={cx('wrapper_modal')}>
                    <div className={cx('header-bill')}>
                        <ul className={cx('title-bill')}>
                            <li>
                                <div className={cx('status')}>
                                    <p className={cx('row-title')}>Status</p>
                                    {order?.status === 1 && <p>Confirmating</p>}
                                    {order?.status === 2 && <p>Delivering</p>}
                                    {order?.status === 3 && <p>Completed</p>}
                                    {order?.status === 4 && <p>Canceled</p>}
                                </div>
                            </li>
                            <li>
                                <div className={cx('order-id')}>
                                    <p className={cx('row-title')}>Order ID</p>
                                    <p>#2024{orderId}</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('total')}>
                                    <p className={cx('row-title')}>Total</p>
                                    <p>{formatPrice(order?.total)}</p>
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
                        {/* <div className={cx('message-status')}>
                            {order?.status === 1 && <p>Please Waiting Confirm Your Order</p>}
                            {order?.status === 2 && (
                                <p>Estimated delivery: {expectedDate(order.createdAt, order?.shipment)}</p>
                            )}
                            {order?.status === 3 && <p>Delivered</p>}
                            {order?.status === 4 && <p>Cancellation requested</p>}
                        </div> */}
                        <Order_Item
                            product={order?.OrderDetails}
                            render={handleReRenderModal}
                            orderId={orderId}
                        ></Order_Item>
                    </div>
                </div>
                <button onClick={handleClose} className={cx('close_btn')}>
                    &times;
                </button>
            </div>
        </Modal>
    );
}

export default ModalRating;

function Rating({ product, key, order, render, prodToRating, orderId }) {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
    const state = useContext(UseContextUser);
    const [img, setImg] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    // console.log('Order: ', order);
    console.log('product: ', product);

    let imgs = product?.product?.img;
    const onDrop = (acceptedFiles) => {
        console.log(product.id);
        const file = acceptedFiles[0];
        setVideoFile(file);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    const handleSubmit = () => {
        const fetchDataToOrder = async () => {
            let productSelect = prodToRating?.find((i) => i.id === product?.id);
            let newData = {
                id_order: orderId,
                rating: rating,
            };
            await axios.put(`${url}/order-detail/update/${productSelect?.id}`, newData);
            render((prev) => !prev);
        };
        const fetchDataToReviews = async () => {
            var imgVideoData = [...img, videoFile];
            let formdata_imgs = new FormData();
            for (let i = 0; i < imgVideoData.length; i++) {
                formdata_imgs.append('img_and_video', imgVideoData[i]);
            }
            let formdata = new FormData();
            formdata.append('id_user', JSON.stringify(state?.cuser?.value?.id));
            formdata.append('id_product', JSON.stringify(product?.id_product));
            formdata.append('rating', JSON.stringify(rating));
            formdata.append('content', JSON.stringify(comment));
            formdata.append('numberLikes', JSON.stringify(0));
            let combinedFormData = new FormData();
            // Thêm dữ liệu từ formdata_imgs vào combinedFormData
            for (let pair of formdata_imgs.entries()) {
                combinedFormData.append(pair[0], pair[1]);
            }

            // Thêm dữ liệu từ formdata khác vào combinedFormData
            for (let pair of formdata.entries()) {
                combinedFormData.append(pair[0], pair[1]);
            }
            // let dataPost = {
            //     id_user: state?.cuser?.value?.id,
            //     id_product: product?.id_product,
            //     rating: rating,
            //     content: comment,
            //     numberLikes: 0,
            //     product: {
            //         id: product?.id,
            //         name: product?.product?.name,
            //         size: product?.size,
            //     },
            // };
            // console.log(dataPost);
            await axios.post(`${url}/reviews/create`, combinedFormData);
        };
        try {
            fetchDataToOrder();
            fetchDataToReviews();
            toast.success('Thành công');
            setImg([]);
            setComment('');
            setVideoFile(null);
            setRating(5);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper-rating')}>
            <div className={cx('product')} key={key}>
                <div className={cx('product-img')}>
                    <div className={cx('product-img-wrapper')}>
                        <img src={`${imgs[0]}`} />
                    </div>
                </div>
                <div className={cx('cart-item-infor')}>
                    <div className={cx('left-infor')}>
                        <p className={cx('cart-item-name')}>{product?.product?.name}</p>

                        <div className={cx('cart-item-quantity')}>
                            <p>
                                Size: <span>{product?.size.replace(/[\[\]"]+/g, '')}</span>
                            </p>
                            <p>
                                x<span>{product?.quantity}</span>
                            </p>
                        </div>
                    </div>
                    <div className={cx('right-infor')}>
                        <span className={cx('cart-item-price')}>
                            {formatPrice(product?.product?.discount_price)}
                        </span>
                    </div>
                </div>
            </div>

            {product?.rating === 0 ? (
                <div className={cx('rating')}>
                    <div className={cx('star')}>
                        {[
                            [...Array(5)].map((star, index) => {
                                const currentRating = index + 1;
                                return (
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={currentRating}
                                            onClick={() => setRating(currentRating)}
                                        />
                                        <FaStar
                                            className={cx('star-click')}
                                            size={30}
                                            color={
                                                currentRating <= (hover || rating)
                                                    ? '#ffc107'
                                                    : '#e4e5e9'
                                            }
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(null)}
                                        ></FaStar>
                                    </label>
                                );
                            }),
                        ]}
                    </div>
                    <div className={cx('comment')}>
                        <textarea
                            className={cx('input_textarea')}
                            // defaultValue={product?.description}
                            placeholder="Please Comment!"
                            onChange={(e) => setComment(e.target.value)}
                            // {...register("description", { required: true })}
                        ></textarea>
                        <div className={cx('location-img-video')}>
                            <div className={cx('img-video-wrapper')}>
                                <div className={cx('product_img--sub')}>
                                    {Boolean(img.length) &&
                                        img.map((item, index) => (
                                            <div className={cx('img_sub')} key={index}>
                                                <button
                                                    onClick={() => {
                                                        URL.revokeObjectURL(img[index]);
                                                        setImg((e) => {
                                                            let arr = [...e];
                                                            return arr.filter((item2, index2) => {
                                                                return index2 !== index;
                                                            });
                                                        });
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                                <img src={item.preview} />
                                            </div>
                                        ))}
                                    {img.length < 4 && (
                                        <div className={cx('img_sub')}>
                                            <label
                                                className={cx(['add_btn-on', 'img_sub__add'])}
                                                htmlFor={`file-${product.id}`}
                                            >
                                                <FontAwesomeIcon icon={faSquarePlus} size="4x" />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <input
                                type="file"
                                onChange={(e) => {
                                    try {
                                        const file = e?.target?.files[0];
                                        // console.log(product.id);
                                        file.preview = URL.createObjectURL(file);
                                        setImg((pre) => [...pre, file]);
                                    } catch {
                                        console.log('Error');
                                    }
                                }}
                                id={`file-${product.id}`}
                                className={cx('add_imgSub_btn-off')}
                            />
                            <div>
                                {videoFile === null && (
                                    <div
                                        {...getRootProps()}
                                        name="video"
                                        style={{
                                            border: '3px dashed #c6b064',
                                            padding: '20px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        <p>
                                            Drop a video file here, or click to select a video file
                                        </p>
                                    </div>
                                )}

                                {videoFile && (
                                    <div>
                                        <video controls style={{ width: '100%' }}>
                                            <source
                                                src={URL.createObjectURL(videoFile)}
                                                type={videoFile.type}
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-rating')}>
                        <Button primary onClick={handleSubmit}>
                            Rating your Order!
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={cx('success-notification')}>
                    <p>
                        Thank you for taking the time to review our product. Your feedback is
                        greatly appreciated and helps us improve our offerings to better serve you
                        and others like you.
                    </p>
                </div>
            )}
        </div>
    );
}

function Order_Item({ product, render, orderId }) {
    const [prod, setProd] = useState();
    const [prodToRating, setProductToRating] = useState();
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
                setProductToRating(product);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };
        fetchProducts();
    }, [product]);
    return (
        <>
            {prod?.map((item, index) => {
                // console.log(item);
                return (
                    <>
                        <Rating
                            product={item}
                            key={item.id}
                            order={product}
                            prodToRating={prodToRating}
                            render={render}
                            orderId={orderId}
                        ></Rating>
                    </>
                );
            })}
        </>
    );
}
