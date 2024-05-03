import classNames from 'classnames/bind';
import styles from './ModalDetailProduct.module.scss';
import {
    faClose,
    faCross,
    faCloudArrowUp,
    faFileImage,
    faPlus,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { url } from '../../../constants';
const cx = classNames.bind(styles);
function ModalDetailProduct({ show, handleClose, prodID, handleReRender }) {
    const [product, setProduct] = useState();
    const [showModal, setShowModal] = useState(false);
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [updateInventory, setUpdateInventory] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [index, setIndex] = useState();
    const [render, setRender] = useState(false);
    const handleKeyDownSize = (e) => {
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
        const key = e.key;
        if (!allowedKeys.includes(key)) {
            e.preventDefault();
        }
    };
    const handleRenderModal = () => {
        setRender((prev) => !prev);
    };
    const handleCloseChangeImage = () => setShowModal(false);
    const handleShowChangeImage = () => setShowModal(true);
    useEffect(() => {
        const fetchProd = async () => {
            try {
                const responseProd = await axios.get(`${url}/products/${prodID}`);
                const responseBrand = await axios.get(`${url}/brand`);
                const responseCategory = await axios.get(`${url}/category`);
                setProduct(responseProd.data);
                setBrand(responseBrand.data.brand);
                setCategory(responseCategory.data.category);
                setImgs(responseProd.data.img);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProd();
    }, [prodID, render]);
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Bạn cần nhập trường này'),
            brand: yup.string().required('Bạn cần lựa chọn Thương hiệu'),
            category: yup.string().required('Bạn cần lựa chọn Loại giày'),
            // brand: yup.string().required('Bạn cần lựa chọn thành phố'),
            price: yup.string().required('Trường này là bắt buộc'),
            discount_price: yup.string().required('Trường này là bắt buộc'),
            description: yup.string().required('Trường này là bắt buộc'),
            short_description: yup.string().required('Trường này là bắt buộc'),
        })
        .required();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: yupResolver(schema),
    });
    // const defaultValues = {
    //     name: product?.name,
    //     brand_id: product?.brand_id,
    //     type: product?.type,
    //     discount_id: product?.discount_id,
    //     price: product?.price,
    //     description: product?.description,
    // };
    useEffect(() => {
        const defaultValues = {
            name: product?.name,
            brand: +product?.BrandId,
            type: product?.CategoryId,
            discount_price: product?.discount_price,
            price: product?.price,
            description: product?.detail_description,
            short_description: product?.short_description,
        };
        reset(defaultValues);
    }, [product, reset]);
    useEffect(() => {
        setInventory(
            product?.Inventories?.map((item, index) => {
                return {
                    ...item,
                    size: item?.size,
                    quantity: item?.quantity,
                };
            }),
        );
        setUpdateInventory(
            product?.Inventories?.map((item, index) => {
                return {
                    ...item,
                    size: item?.size,
                    quantity: item?.quantity,
                };
            }),
        );
    }, [product]);
    // const [currentValues, setCurrentValues] = useState(defaultValues);
    // console.log(currentValues);

    // const currentValues = {
    //     name: watch('name', defaultValues.name),
    //     productId: watch('productId', defaultValues.productId),
    //     type: watch('type', defaultValues.type),
    //     discount: watch('discount', defaultValues.discount),
    //     price: watch('price', defaultValues.price),
    //     description: watch('description', defaultValues.description),
    // };
    const formValues = watch();
    useEffect(() => {
        if (formValues) {
            // Kiểm tra xem có bất kỳ trường nào đã thay đổi (dirty) hay không
            const isFormChanged = Object.keys(dirtyFields).some((fieldName) => {
                return formValues[fieldName] !== product[fieldName];
            });
            if (
                isFormChanged === false &&
                JSON.stringify(inventory) === JSON.stringify(updateInventory)
            ) {
                setIsFormDirty(false);
            } else {
                setIsFormDirty(true);
            }
        }
    }, [formValues, product, dirtyFields]);
    const checkIsDirty = (e, item, index) => {
        setUpdateInventory((prev) => {
            let newArr = [...prev];
            newArr[index] = {
                ...newArr[index],
                quantity: Number(e.target.value),
            };
            return newArr;
        });
    };

    // console.log('re-render');
    // console.log(defaultValues);
    // console.log(currentValues);
    // useEffect(() => {
    //     const isDirty = Object.keys(dirtyFields).some(
    //         (fieldName) => currentValues[fieldName] !== defaultValues[fieldName],
    //     );
    //     setIsFormDirty(isDirty);
    // }, [dirtyFields, currentValues, defaultValues]);
    const onSubmit = async (data) => {
        // console.log('Hello' + data);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        let inventory_sum = updateInventory.reduce((acc, inven) => {
            return acc + inven?.quantity;
        }, 0);
        console.log(inventory_sum);
        const infor = {
            name: data.name,
            BrandId: +data.brand,
            CategoryId: +data.category,
            discount_price: +data.discount_price,
            price: +data.price,
            detail_description: data.description,
            short_description: data.short_description,
            import_quantity: inventory_sum,
        };

        const updateInventorys = {
            listInventory: updateInventory,
        };
        // console.log(updateInventorys);
        try {
            await delay(2000); // Chờ 2 giây
            const productUpdate = await axios.put(`${url}/products/update/${product?.id}`, infor);
            const invetoryUpdate = await axios.put(
                `${url}/inventory/update/${product?.id}`,
                updateInventorys,
            );

            handleReRender();
            setRender((prev) => !prev);
            toast.success('Chỉnh sửa thông tin thành công', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error('Chỉnh sửa thông tin thất bại', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        }
        // console.log(infor);
    };
    return (
        <>
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
                        width: '90%',
                        height: '90%',
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
                    <p className={cx('title')}>PRODUCT INFORMATION</p>
                    <div className={cx('wrapper_modal')}>
                        <div className={cx('wrapper-right-side')}>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>Brands: </label>
                                <select {...register('brand')}>
                                    {
                                        // atri_prod?.brands?.map(i => <option key={i.brand_id} value={i.brand_id}>{i.brand_id}</option>)
                                    }
                                    {/* <option value="">---Chọn Thương Hiệu---</option> */}
                                    {brand &&
                                        brand?.map((bra) => {
                                            return (
                                                <option
                                                    value={bra.id}
                                                    selected={product?.BrandId === bra.id}
                                                >
                                                    {bra.brand_name}
                                                </option>
                                            );
                                        })}
                                </select>
                                {errors.brand && (
                                    <p className={cx('form-message')}>{errors.brand.message}</p>
                                )}
                            </div>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>Catalogue: </label>
                                <select {...register('category')}>
                                    {category &&
                                        category?.map((cate) => {
                                            return (
                                                <option
                                                    value={cate.id}
                                                    selected={product?.CategoryId === cate.id}
                                                >
                                                    {cate.category_name}
                                                </option>
                                            );
                                        })}

                                    {/* <option value="">---Chọn Loại Giày---</option> */}
                                </select>
                                {errors.category && (
                                    <p className={cx('form-message')}>{errors.category.message}</p>
                                )}
                            </div>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>name: </label>
                                <input defaultValue={product?.name} {...register('name')} />
                                {errors.name && (
                                    <p className={cx('form-message')}>{errors.name.message}</p>
                                )}
                            </div>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>price (VND): </label>
                                <input
                                    defaultValue={Number(product?.price)}
                                    // onChange={(e) => {
                                    //     setPrice(e.target.value);
                                    //     console.log(price);
                                    // }}
                                    onKeyDown={handleKeyDownSize}
                                    {...register('price')}
                                />
                                {errors.price && (
                                    <span className={cx('form-message')}>
                                        {errors.price.message}
                                    </span>
                                )}
                            </div>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>Price Discount: </label>
                                <input
                                    defaultValue={Number(product?.discount_price)}
                                    // onChange={(e) => {
                                    //     setPrice(e.target.defaultValue);
                                    //     console.log(price);
                                    // }}
                                    onKeyDown={handleKeyDownSize}
                                    {...register('discount_price')}
                                />
                                {errors.discount_price && (
                                    <span className={cx('form-message')}>
                                        {errors.discount_price.message}
                                    </span>
                                )}
                            </div>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>size: </label>
                                <div className={cx('size-wrapper')}>
                                    {product?.Inventories?.map((item, i) => {
                                        // console.log(item?.size + ':' + item?.quantity);
                                        return (
                                            <div key={i} className={cx('size-section')}>
                                                {item?.size}
                                                {/* console.log(item?.); */}
                                                <input
                                                    placeholder="0"
                                                    id="quantity"
                                                    defaultValue={Number(item?.quantity)}
                                                    pattern="[0-9]*"
                                                    type="numeric"
                                                    // type="text"
                                                    onChange={(e) => {
                                                        // console.log('Change');
                                                        checkIsDirty(e, item, i);
                                                    }}
                                                    // onKeyDown={handleKeyDownSize}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* {
                errors.name && <span className={cx('message_err')}>không được bỏ trống mục này</span>
            } */}
                            </div>
                            <div className={cx('input_product')}>
                                <label style={{ display: 'block' }} className={cx('label-product')}>
                                    Choose Images:
                                </label>
                                <div className={cx('img-add')}>
                                    <div className={cx('product_img--sub')}>
                                        {Boolean(product?.img.length) &&
                                            product?.img.map((item, index) => (
                                                <div className={cx('img_sub')} key={index}>
                                                    <div
                                                        className={cx('change-pic')}
                                                        onClick={() => {
                                                            setIndex(index);
                                                            handleShowChangeImage();
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                        ></FontAwesomeIcon>
                                                    </div>
                                                    <img src={item} />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('input_product')}>
                                <label style={{ display: 'block' }} className={cx('label-product')}>
                                    Short Description:{' '}
                                </label>
                                <textarea
                                    className={cx('input_textarea')}
                                    defaultValue={product?.description}
                                    {...register('short_description')}
                                    // {...register("description", { required: true })}
                                ></textarea>
                                {errors.short_description && (
                                    <span className={cx('form-message')}>
                                        {errors.short_description.message}
                                    </span>
                                )}
                            </div>
                            <div className={cx('input_product')}>
                                <label style={{ display: 'block' }} className={cx('label-product')}>
                                    Description:{' '}
                                </label>
                                <textarea
                                    className={cx('input_textarea')}
                                    defaultValue={product?.description}
                                    {...register('description')}
                                    // {...register("description", { required: true })}
                                ></textarea>
                                {errors.description && (
                                    <span className={cx('form-message')}>
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-change')}>
                        {isFormDirty === true ? (
                            <>
                                <Button
                                    primary
                                    type="submit"
                                    onClick={(e) => {
                                        handleSubmit(onSubmit)(e);
                                    }}
                                >
                                    Change
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button primary disabled>
                                    Change
                                </Button>
                            </>
                        )}
                    </div>

                    <button onClick={handleClose} className={cx('close_btn')}>
                        &times;
                    </button>
                </div>
            </Modal>
            <ModalChangeImage
                show={showModal}
                handleClose={handleCloseChangeImage}
                indexImage={index}
                image={product?.img[index]}
                productId={product?.id}
                handleReRender={handleRenderModal}
            ></ModalChangeImage>
        </>
    );
}

export default ModalDetailProduct;

function ModalChangeImage({ show, handleClose, handleReRender, indexImage, image, productId }) {
    // console.log(indexImage);
    // console.log(image);
    const [img, setImg] = useState([]);
    const handleChangeImage = async () => {
        const formdata_imgs = new FormData();

        // console.log(inventory_sum);
        for (let i = 0; i < img.length; i++) {
            formdata_imgs.append('img', img[i]);
        }
        const formdata = new FormData();
        formdata.append('imgsSelectedEdit', JSON.stringify([indexImage]));

        const combinedFormData = new FormData();

        // Thêm dữ liệu từ formdata_imgs vào combinedFormData
        for (let pair of formdata_imgs.entries()) {
            combinedFormData.append(pair[0], pair[1]);
        }

        // Thêm dữ liệu từ formdata khác vào combinedFormData
        for (let pair of formdata.entries()) {
            combinedFormData.append(pair[0], pair[1]);
        }
        try {
            await axios.put(`${url}/products/update/${productId}`, combinedFormData);
            toast.success('Success');
            setImg([]);
            handleReRender();
            handleClose();
        } catch (err) {
            console.log(err);
        }
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
                    width: '50%',
                    height: '60%',
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
                <p className={cx('title')}>CHANGE IMAGES</p>
                <div className={cx('content-change-img')}>
                    <div className={cx('left-content')}>
                        <div className={cx('img_sub')}>
                            <img src={image} />
                        </div>
                        <div className={cx('img_sub_left')}></div>
                    </div>
                    <p>To</p>
                    <div className={cx('img-add-right')}>
                        <div className={cx('product_img_sub')}>
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
                                            X
                                        </button>
                                        <img src={item.preview} />
                                    </div>
                                ))}
                            {img.length < 1 && (
                                <div className={cx('img_sub')}>
                                    <label
                                        className={cx(['add_btn-on', 'img_sub__add'])}
                                        htmlFor="file2"
                                    >
                                        <FontAwesomeIcon icon={faSquarePlus} size="4x" />

                                        {/* Add */}
                                        {/* <AddBoxIcon /> */}
                                    </label>
                                    {/* <div className={'btn-add-sub'}>
                            
                        </div> */}
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            onChange={(e) => {
                                try {
                                    const file = e?.target?.files[0];
                                    file.preview = URL.createObjectURL(file);
                                    setImg((pre) => [...pre, file]);
                                } catch (error) {
                                    console.log('Error: ' + error);
                                }
                            }}
                            id="file2"
                            className={cx('add_imgSub_btn-off')}
                        />
                    </div>
                </div>
                <div className={cx('btn-change')}>
                    {img.length > 0 ? (
                        <>
                            {/* <button className="hello" onClick={() => setEdit((prev) => !prev)}>
                                Cancel
                            </button> */}
                            <Button
                                primary
                                // onClick={(e) => {
                                //     handleSubmit(onSubmit)(e);
                                // }}
                                type="submit"
                                onClick={(e) => {
                                    // console.log('Hello');
                                    handleChangeImage();
                                }}
                            >
                                Change
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* <button onClick={() => setEdit((prev) => !prev)}>Cancel</button> */}
                            <Button primary disabled>
                                Change
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
