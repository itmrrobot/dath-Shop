import classNames from 'classnames/bind';
import styles from './AddProducts.module.scss';
import { toast } from 'react-toastify';
import {
    faClose,
    faCross,
    faCloudArrowUp,
    faFileImage,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Modal } from 'antd';
import Button from '../../components/Button';
// import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box } from '@mui/material';
import Header from '../../chartComp/Header';
import axios from 'axios';
import { url } from '../../constants';
import ModalAdd from './ModalAdd';
const cx = classNames.bind(styles);
function AddProducts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [typeAdd, setTypeAdd] = useState(false);
    const [typeSize, setTypeSize] = useState('');
    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();
    const [render, setRender] = useState(false);
    const navigator = useNavigate();
    const showModall = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleReRender = () => {
        setRender((prev) => !prev);
    };
    useEffect(() => {
        let fetchData = async () => {
            const responseBrand = await axios.get(`${url}/brand`);
            const responseCategory = await axios.get(`${url}/category`);
            setBrands(responseBrand.data.brand);
            setCategories(responseCategory.data.category);
        };
        fetchData();
    }, [render]);
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Bạn cần nhập trường này'),
            brand: yup.string().required('Bạn cần lựa chọn Thương hiệu'),
            category: yup.string().required('Bạn cần lựa chọn Loại giày'),
            // brand: yup.string().required('Bạn cần lựa chọn thành phố'),
            price: yup.string().required('Trường này là bắt buộc'),
            description: yup.string().required('Trường này là bắt buộc'),
            short_description: yup.string().required('Trường này là bắt buộc'),
        })
        .required();
    const defaultValues = {
        name: '',
        brand: '',
        category: '',
        price: '',
        description: '',
        short_description: '',
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [img, setImg] = useState('');
    const [imgs_v2, setImgs_v2] = useState([]);
    const [price, setPrice] = useState(0);
    const formatCurr = (number) => {
        let curr = Number(number.replaceAll('.', '')).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
        return curr.slice(0, curr.length - 2);
    };
    const formatNum = (str) => {
        return str.replaceAll('.', '');
    };
    // console.log(price);
    const sizeValues_shoes = ['36', '37', '38', '39', '40', '41', '42', '43'];
    const sizeValues_jewelry = ['size1', 'size2', 'size3'];
    const sizeValues_watch = ['40mm', '50mm', '60mm', '90mm'];
    const sizeValues_clothes = ['S', 'SL', 'X', 'XL', 'XXL', '3XL'];

    const [inventory, setInventory] = useState();
    const handleChangeSizeInput = () => {};
    const handleChange = (e, item) => {
        let tmpList = [...inventory];
        let newList = tmpList.map((item2, index2) => {
            if (item.size === item2.size)
                return { ...item2, quantity: +e.target.value.replace(/[^0-9]/g, '') };
            return item2;
        });
        setInventory(newList);
        console.log(newList);
    };
    const handleKeyDownSize = (e) => {
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
        const key = e.key;
        if (!allowedKeys.includes(key)) {
            e.preventDefault();
        }
    };
    const onSubmit = async (data) => {
        // console.log(data);
        if (imgs_v2.length !== 4) {
            // console.log('Hello');
            showModall();
        } else {
            const formdata_imgs = new FormData();
            let inventory_sum = inventory.reduce((acc, inven) => {
                return acc + inven?.quantity;
            }, 0);
            // console.log(inventory_sum);
            for (let i = 0; i < imgs_v2.length; i++) {
                formdata_imgs.append('img', imgs_v2[i]);
            }

            const formdata = new FormData();

            formdata.append('name', data.name);
            formdata.append('sell_quantity', 0);
            formdata.append('id_partner', 1);
            formdata.append('status', 0);
            formdata.append('short_description', data.short_description);
            formdata.append('detail_description', data.description);
            formdata.append('price', +data.price);
            formdata.append('discount_price', +data.price);
            formdata.append('CategoryId', +data.category);
            formdata.append('BrandId', +data.brand);
            formdata.append('import_quantity', inventory_sum);
            formdata.append('listInventory', JSON.stringify(inventory));

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
                const resPost = await axios.post(`${url}/products/create`, combinedFormData);
                toast.success('Create Product Success!');
                reset(defaultValues);
                setInventory('');
                setTypeSize('');
                setImgs_v2([]);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ADD PRODUCT" subtitle="" />
            </Box>
            <div className={cx('wrapper')}>
                <div className={cx('right_side')}>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>Brands: </label>
                        <select {...register('brand')}>
                            {
                                // atri_prod?.brands?.map(i => <option key={i.brand_id} value={i.brand_id}>{i.brand_id}</option>)
                            }
                            <option value="">---Choose Brand---</option>
                            {brands &&
                                brands?.map((bra) => {
                                    return <option value={bra.id}>{bra.brand_name}</option>;
                                })}
                        </select>
                        <Button
                            primary
                            onClick={() => {
                                handleShow();
                                setTypeAdd(true);
                            }}
                        >
                            <p>Add Brand</p>
                        </Button>
                        {/* <FontAwesomeIcon
                            className={cx('addAtribute_btn')}
                            icon={faPlus}
                            // onClick={() => {
                            //     // setAtribName("brands")
                            //     // handleShow()
                            // }}
                        /> */}
                        {errors.brand && (
                            <p className={cx('form-message')}>{errors.brand.message}</p>
                        )}
                    </div>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>Categories: </label>
                        <select {...register('category')}>
                            <option value="">---Choose Catelogue---</option>
                            {categories &&
                                categories?.map((cate) => {
                                    return <option value={cate.id}>{cate.category_name}</option>;
                                })}
                        </select>
                        <Button
                            primary
                            onClick={() => {
                                handleShow();
                                setTypeAdd(false);
                            }}
                        >
                            <p>Add Category</p>
                        </Button>
                        {errors.category && (
                            <p className={cx('form-message')}>{errors.category.message}</p>
                        )}
                    </div>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>name: </label>
                        <input {...register('name')} />
                        {errors.name && <p className={cx('form-message')}>{errors.name.message}</p>}
                    </div>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>price: </label>
                        <input
                            onChange={(e) => {
                                setPrice(e.target.value);
                                console.log(price);
                            }}
                            onKeyDown={handleKeyDownSize}
                            {...register('price')}
                        />
                        {errors.price && (
                            <span className={cx('form-message')}>{errors.price.message}</span>
                        )}
                    </div>

                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>size: </label>
                        <div className={cx('type-size')}>
                            <div
                                className={cx(
                                    'type-size-comp',
                                    typeSize === 'Shoes' ? 'active' : '',
                                )}
                                onClick={() => {
                                    setTypeSize('Shoes');
                                    let size = sizeValues_shoes.map((item, index) => {
                                        return {
                                            size: item,
                                            quantity: 0,
                                        };
                                    });
                                    setInventory(size);
                                }}
                            >
                                <p className={cx('type-size-name')}>Shoes</p>
                            </div>
                            <div
                                className={cx(
                                    'type-size-comp',
                                    typeSize === 'Clothes' ? 'active' : '',
                                )}
                                onClick={() => {
                                    setTypeSize('Clothes');
                                    let size = sizeValues_clothes.map((item, index) => {
                                        return {
                                            size: item,
                                            quantity: 0,
                                        };
                                    });
                                    setInventory(size);
                                }}
                            >
                                <p className={cx('type-size-name')}>Clothes</p>
                            </div>
                            <div
                                className={cx(
                                    'type-size-comp',
                                    typeSize === 'Jewelry' ? 'active' : '',
                                )}
                                onClick={() => {
                                    setTypeSize('Jewelry');
                                    let size = sizeValues_jewelry.map((item, index) => {
                                        return {
                                            size: item,
                                            quantity: 0,
                                        };
                                    });
                                    setInventory(size);
                                }}
                            >
                                <p className={cx('type-size-name')}>Jewelry</p>
                            </div>
                            <div
                                className={cx(
                                    'type-size-comp',
                                    typeSize === 'Watch' ? 'active' : '',
                                )}
                                onClick={() => {
                                    setTypeSize('Watch');
                                    let size = sizeValues_watch.map((item, index) => {
                                        return {
                                            size: item,
                                            quantity: 0,
                                        };
                                    });
                                    setInventory(size);
                                }}
                            >
                                <p className={cx('type-size-name')}>Watch</p>
                            </div>
                        </div>
                        <div className={cx('size-wrapper')}>
                            {inventory &&
                                inventory?.map((item, i) => {
                                    return (
                                        <div key={i} className={cx('size-section')}>
                                            {item.size}
                                            <input
                                                placeholder="0"
                                                id="quantity"
                                                // value={item.quantity}
                                                pattern="[0-9]*"
                                                type="numeric"
                                                // type="text"
                                                onChange={(e) => {
                                                    handleChange(e, item);
                                                }}
                                                onKeyDown={handleKeyDownSize}
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
                                {Boolean(imgs_v2.length) &&
                                    imgs_v2.map((item, index) => (
                                        <div className={cx('img_sub')} key={index}>
                                            <button
                                                onClick={() => {
                                                    URL.revokeObjectURL(imgs_v2[index]);
                                                    setImgs_v2((e) => {
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
                                {imgs_v2.length < 4 && (
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
                                        setImgs_v2((pre) => [...pre, file]);
                                    } catch (error) {
                                        console.log('Error: ' + error);
                                    }
                                }}
                                id="file2"
                                className={cx('add_imgSub_btn-off')}
                            />
                        </div>
                    </div>
                    <div className={cx('input_product')}>
                        <label style={{ display: 'block' }} className={cx('label-product')}>
                            Short Description:{' '}
                        </label>
                        <textarea
                            className={cx('input_textarea')}
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
                            {...register('description')}
                            // {...register("description", { required: true })}
                        ></textarea>
                        {errors.description && (
                            <span className={cx('form-message')}>{errors.description.message}</span>
                        )}
                    </div>
                    <div className={cx('btn-submit')}>
                        <Button
                            onClick={(e) => {
                                handleSubmit(onSubmit)(e);
                            }}
                            primary
                        >
                            Click me!
                        </Button>
                    </div>
                </div>
            </div>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
                <p>Bạn chưa dán ảnh đầy đủ!!</p>
                {/* <p>Bạn chưa dán ảnh đầy đủ!!</p> */}
                <ul>
                    <li>Phải có 4 ảnh </li>
                </ul>
            </Modal>
            <ModalAdd
                show={showModal}
                handleClose={handleClose}
                type={typeAdd}
                brands={brands}
                categories={categories}
                handleReRender={handleReRender}
            ></ModalAdd>
        </>
    );
}

export default AddProducts;
