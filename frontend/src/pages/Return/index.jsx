import styles from './Return.module.scss';
import classNames from 'classnames/bind';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useContext } from 'react';
import { formatPrice, priceDiscount } from '../../common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Button from '../../components/Button';
import { Modal } from 'antd';
import images from '../../assets/img';
import { toast } from 'react-toastify';
import { url } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { UseContextUser } from '../../hooks/useContextUser';
import moment from 'moment';
// import { UseContextUser } from '../../hooks/useContextUser';
const cx = classNames.bind(styles);
function Return() {
    const param = useParams();
    const navigator = useNavigate();
    const [order, setOrder] = useState([]);
    const [datePicker, setDatePicker] = useState();
    const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);
    const [isModalOpenFalse, setIsModalOpenFalse] = useState(false);
    const [img, setImg] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const state = useContext(UseContextUser);
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setVideoFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    // const state = useContext(UserContext);
    // console.log();
    const showModal = () => {
        setIsModalOpenCancel(true);
    };
    const handleCancel = () => {
        setIsModalOpenCancel(false);
        // setIsModalOpen(false);
    };
    const handleOkCancel = () => {
        navigator(`/user/order/detail/${param.id}`);
    };
    const handleCancelFalse = () => {
        setIsModalOpenFalse(false);
        // setIsModalOpen(false);
    };
    // console.log(datePicker);
    // console.log(datePicker);
    const tabs = ['USPS', 'Home'];
    const [method, setMethod] = useState('USPS');
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = yup
        .object()
        .shape({
            address: yup.string().required('Trường này là bắt buộc'),
            city: yup.string().required('Trường này là bắt buộc'),
            // brand: yup.string().required('Bạn cần lựa chọn thành phố'),
            additional: yup.string().nullable(),
            district: yup.string().required('Trường này là bắt buộc'),
            ward: yup.string().required('Trường này là bắt buộc'),
            country: yup.string().required('Trường này là bắt buộc'),
            phoneNumber: yup
                .string()
                .required('Trường này là bắt buộc')
                .length(10, 'Số điện thoại phải có 10 số')
                .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
            description: yup.string().required('Trường này là bắt buộc'),
        })
        .required();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const date = (nextDate) => {
        if (nextDate) {
            const currentDate = new Date();
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
            let date = currentDate.getDate() + nextDate;
            let month = currentDate.getMonth();
            let year = currentDate.getFullYear();
            // let test = new Date(year, month + 1, 0).getDate();
            // console.log(date, test);
            if (date > new Date(year, month + 1, 0).getDate()) {
                date -= new Date(year, month + 1, 0).getDate();
                month++;
                // Kiểm tra nếu tháng vượt quá 11 (tháng 12), tăng thêm năm
                if (month > 11) {
                    month = 0;
                    year++;
                }
            }
            const monthAbbreviation = monthNames[month];

            return `${date} ${monthAbbreviation}, ${year}`;
        } else {
            const currentDate = new Date();
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
        }
    };

    useEffect(() => {
        axios.get(`${url}/order/${param.id}`).then((res) => {
            // console.log(res.data.createdAt);
            // let order = [...res.data]
            // order[createAt] =
            setOrder(res.data);
        });
    }, []);
    // const formatDate = (data) => {};
    const onSubmit = async (data) => {
        // console.log(data);
        // const dateObj = new Date(datePicker);
        // console.log(datePicker);
        var dateObj = new Date(datePicker);
        var date = moment(dateObj.getTime()).toISOString();
        var imgVideoData = [...img, videoFile];
        const formdata_imgs = new FormData();
        for (let i = 0; i < imgVideoData.length; i++) {
            formdata_imgs.append('imgVideo', imgVideoData[i]);
        }

        const formdata = new FormData();
        formdata.append('id_user', JSON.stringify(state?.cuser?.value?.id));
        formdata.append(
            'address',
            JSON.stringify(
                `${data.address}, ${data.ward}, ${data.district}, ${data.city}, ${data.country}`,
            ),
        );
        formdata.append('additional', JSON.stringify(data.additional));
        formdata.append('phone', JSON.stringify(data.phoneNumber));
        formdata.append('description', JSON.stringify(data.description));
        formdata.append('date_pickup', date);
        formdata.append('status', JSON.stringify(1));
        formdata.append(
            'orders',
            JSON.stringify([
                {
                    id: order?.id,
                },
            ]),
        );
        const combinedFormData = new FormData();

        // Thêm dữ liệu từ formdata_imgs vào combinedFormData
        for (let pair of formdata_imgs.entries()) {
            combinedFormData.append(pair[0], pair[1]);
        }

        // Thêm dữ liệu từ formdata khác vào combinedFormData
        for (let pair of formdata.entries()) {
            combinedFormData.append(pair[0], pair[1]);
        }
        // const postData = {
        //     id_user: state?.cuser?.value?.id,
        //     address: `${data.address}, ${data.ward}, ${data.district}, ${data.city}, ${data.country}`,
        //     additional: data.additional,
        //     phone: data.phoneNumber,
        //     description: data.description,
        //     date_pickup: date,
        //     status: 1,
        //     imgVideo: [],
        //     orders: [
        //         {
        //             id: order?.id,
        //         },
        //     ],
        // };
        let dataPut = {
            ...order,
            status: 5,
        };
        // console.log(dataPut);
        try {
            const resPut = await axios.put(`${url}/order/update/${param.id}`, dataPut);
            const resPost = await axios.post(`${url}/create/returns/`, combinedFormData);
            toast.success(
                'Hoàn thành thông tin trả hàng. Vui lòng vào mục Returns để kiểm tra đơn hàng hoàn trả',
            );
            navigator('/user/order');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <ul className={cx('path')}>
                    <li>
                        <Link to="/user/order">
                            <p>Order</p>
                        </Link>
                    </li>
                    <span> &#62; </span>
                    <li>#2024{param.id}</li>
                    <span> &#62; </span>
                    <li>Return</li>
                </ul>
                <div className={cx('content')}>
                    <div className={cx('order-reason')}>
                        <div className={cx('left-content')}>
                            <div className={cx('title')}>
                                <p className={cx('span-number')}>1</p>
                                <p className={cx('title-line')}>Your Order You Want Return</p>
                            </div>

                            <div className={cx('order-wrapper')}>
                                <div className={cx('title-order')}>
                                    <p className={cx('order-code')}>Order #2024{order?.id}</p>
                                </div>
                                <div className={cx('body-order')}>
                                    <Order_Item product={order}></Order_Item>
                                </div>
                                <div className={cx('payment-wrapper-modal')}>
                                    <div className={cx('payment-display-modal', 'total-wrapper')}>
                                        <p className={cx('label-modal', 'total')}>Total</p>
                                        <p className={cx('discount-price-modal')}>
                                            {formatPrice(order.total)}
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('pickup-date')}>
                                    <label className={cx('label-product')}>Pickup Date </label>
                                    <div className={cx('date-wrapper')}>
                                        <div
                                            className={cx(
                                                'date',
                                                datePicker === date() && 'active',
                                            )}
                                            onClick={() => setDatePicker(date())}
                                        >
                                            <p>{date()}</p>
                                        </div>
                                        <div
                                            className={cx(
                                                'date',
                                                datePicker === date(1) && 'active',
                                            )}
                                            onClick={() => setDatePicker(date(1))}
                                        >
                                            <p>{date(1)}</p>
                                        </div>
                                        <div
                                            className={cx(
                                                'date',
                                                datePicker === date(2) && 'active',
                                            )}
                                            onClick={() => setDatePicker(date(2))}
                                        >
                                            <p>{date(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('img-video-wrapper')}>
                                    <label className={cx('label-product')}>
                                        Select Broken Products Images and Video
                                    </label>
                                    <div className={cx('product_img--sub')}>
                                        {Boolean(img.length) &&
                                            img.map((item, index) => (
                                                <div className={cx('img_sub')} key={index}>
                                                    <button
                                                        onClick={() => {
                                                            URL.revokeObjectURL(img[index]);
                                                            setImg((e) => {
                                                                let arr = [...e];
                                                                return arr.filter(
                                                                    (item2, index2) => {
                                                                        return index2 !== index;
                                                                    },
                                                                );
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
                                                    htmlFor="file2"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faSquarePlus}
                                                        size="4x"
                                                    />
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
                                            file.preview = URL.createObjectURL(file);
                                            setImg((pre) => [...pre, file]);
                                        } catch {
                                            console.log('Error');
                                        }
                                    }}
                                    id="file2"
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
                                                Drop a video file here, or click to select a video
                                                file
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
                        <div className={cx('right-content')}>
                            <div className={cx('title')}>
                                <p className={cx('span-number')}>2</p>
                                <p className={cx('title-line')}>Return method</p>
                            </div>
                            <div className={cx('method-return')}>
                                {/* <div className=''></div> */}
                                <div
                                    className={cx('method', method === 'USPS' && 'active')}
                                    onClick={() => setMethod('USPS')}
                                >
                                    <p className={cx('mtd-title')}>Drop off at USPS point</p>
                                    <p className={cx('mtd-content')}>
                                        Return through your local USPS post office in over 35,000
                                        locations
                                    </p>
                                    <p className={cx('mtd-content')}>Find the nearest USPS point</p>
                                </div>
                                <div
                                    className={cx('method', method === 'Home' && 'active')}
                                    onClick={() => setMethod('Home')}
                                >
                                    <p className={cx('mtd-title')}>Home pick up</p>
                                    <p className={cx('mtd-content')}>
                                        A courier will pick up the parcel from the indicated address
                                        $5,75
                                    </p>
                                </div>
                            </div>
                            <div className={cx('form-wrapper')}>
                                {tabs && method === 'Home' ? (
                                    <>
                                        <div className={cx('input_product')}>
                                            <label className={cx('label-product')}>address: </label>
                                            <input placeholder="..." {...register('address')} />
                                            {errors.address && (
                                                <p className={cx('form-message')}>
                                                    {errors.address.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className={cx('input_product')}>
                                            <label className={cx('label-product')}>
                                                additional information (e.g. Company):{' '}
                                            </label>
                                            <input placeholder="..." {...register('additional')} />
                                            {errors.additional && (
                                                <p className={cx('form-message')}>
                                                    {errors.additional.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className={cx('city-district', 'section-location')}>
                                            <div className={cx('input_product')}>
                                                <label className={cx('label-product')}>
                                                    city:{' '}
                                                </label>
                                                <input placeholder="..." {...register('city')} />
                                                {errors.city && (
                                                    <p className={cx('form-message')}>
                                                        {errors.city.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className={cx('input_product')}>
                                                <label className={cx('label-product')}>
                                                    district:{' '}
                                                </label>
                                                <input
                                                    placeholder="..."
                                                    {...register('district')}
                                                />
                                                {errors.district && (
                                                    <p className={cx('form-message')}>
                                                        {errors.district.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('ward-country', 'section-location')}>
                                            <div className={cx('input_product')}>
                                                <label className={cx('label-product')}>
                                                    ward:{' '}
                                                </label>
                                                <input placeholder="..." {...register('ward')} />
                                                {errors.ward && (
                                                    <p className={cx('form-message')}>
                                                        {errors.ward.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className={cx('input_product')}>
                                                <label className={cx('label-product')}>
                                                    country:{' '}
                                                </label>
                                                <input placeholder="..." {...register('country')} />
                                                {errors.country && (
                                                    <p className={cx('form-message')}>
                                                        {errors.country.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className={cx('input_product')}>
                                            <label className={cx('label-product')}>
                                                phone number:{' '}
                                            </label>
                                            <input placeholder="..." {...register('phoneNumber')} />
                                            {errors.phoneNumber && (
                                                <p className={cx('form-message')}>
                                                    {errors.phoneNumber.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className={cx('input_product')}>
                                            <label
                                                style={{ display: 'block' }}
                                                className={cx('label-product')}
                                            >
                                                Reason why return (Need detail about Defective
                                                product)
                                            </label>
                                            <textarea
                                                className={cx('input_textarea')}
                                                {...register('description')}
                                                // {...register("description", { required: true })}
                                            ></textarea>
                                            {errors.description && (
                                                <span className={cx('form-message')}>
                                                    {errors.description.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={cx('btn-handle')}>
                                            <button className={cx('cancel')} onClick={showModal}>
                                                Cancel
                                            </button>
                                            <Button
                                                primary
                                                onClick={(e) => {
                                                    if (
                                                        datePicker === '' ||
                                                        datePicker === undefined
                                                    ) {
                                                        setIsModalOpenFalse(true);
                                                    } else {
                                                        handleSubmit(onSubmit)(e);
                                                    }
                                                }}
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={cx('comming-img')}>
                                            <div className={cx('comming-img-wrapper')}>
                                                <img src={images.comming} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Thông báo"
                open={isModalOpenCancel}
                onOk={handleOkCancel}
                onCancel={handleCancel}
            >
                <p>Bạn có muốn huỷ hoàn trả hàng không?</p>
                {/* <p>Bạn chưa dán ảnh đầy đủ!!</p> */}
                {/* <ul>
                    <li>Tối thiểu 1 ảnh chính (Khuyến khích ảnh đã được removeBackground)</li>
                    <li>Tối thiểu 3 ảnh phụ</li>
                </ul> */}
            </Modal>
            <Modal
                title="Thông báo"
                open={isModalOpenFalse}
                onOk={handleCancelFalse}
                onCancel={handleCancelFalse}
            >
                <p>Bạn chưa chọn ngày lấy hàng!</p>
                {/* <p>Bạn chưa dán ảnh đầy đủ!!</p> */}
                {/* <ul>
                    <li>Tối thiểu 1 ảnh chính (Khuyến khích ảnh đã được removeBackground)</li>
                    <li>Tối thiểu 3 ảnh phụ</li>
                </ul> */}
            </Modal>
        </>
    );
}

export default Return;

function Order_Item({ product }) {
    const [prod, setProd] = useState();
    useEffect(() => {
        let product_id = product?.OrderDetails?.map((i) => i.id_product);
        const fetchProducts = async () => {
            try {
                const requests = product_id?.map((id) => axios.get(`${url}/products/${id}`));
                const responses = await Promise.all(requests);
                const products = responses.map((response) => response.data);
                let a = product?.OrderDetails?.map((item) => {
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
