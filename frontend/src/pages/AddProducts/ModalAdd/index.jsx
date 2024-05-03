import classNames from 'classnames/bind';
import styles from './ModalAdd.module.scss';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faPlus, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { url } from '../../../constants';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const cx = classNames.bind(styles);
function ModalAdd({ show, handleClose, brands, categories, type = false, handleReRender }) {
    const [showInput, setShowInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [brandId, setBrandId] = useState();
    const [categoryId, setCategoryId] = useState();
    console.log(brandId);
    const [img, setImg] = useState([]);
    const handleCloseModify = () => setShowModal(false);
    const handleShowModify = () => setShowModal(true);
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Bạn cần nhập trường này'),
        })
        .required();
    const defaultValues = {
        // Định nghĩa các giá trị mặc định của form ở đây
        // Ví dụ:
        name: '',
        // ...
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const handleRemoveBrand = async (id) => {
        try {
            await axios.delete(`${url}/brand/delete/${id}`);
            toast.success('Remove Brand Success!', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
            handleReRender();
        } catch (error) {
            console.log(error);
        }
    };
    const handleRemoveCategory = async (id) => {
        try {
            await axios.delete(`${url}/category/delete/${id}`);
            toast.success('Remove Category Success!', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
            handleReRender();
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (data) => {
        const formdata_imgs = new FormData();
        for (let i = 0; i < img.length; i++) {
            formdata_imgs.append('img', img[i]);
        }
        const formdata = new FormData();
        if (type === true) {
            formdata.append('brand_name', data.name);
            formdata.append('status', JSON.stringify(1));
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
                const resPost = await axios.post(`${url}/brand/create`, combinedFormData);
                toast.success('Add Brand Success!');
                setImg([]);
                reset(defaultValues);
                setShowInput(false);
                handleReRender();
            } catch (error) {
                console.log(error);
            }
        } else {
            formdata.append('category_name', data.name);
            formdata.append('status', JSON.stringify(1));
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
                const resPost = await axios.post(`${url}/category/create`, combinedFormData);
                toast.success('Add Category Success!');
                setImg([]);
                reset(defaultValues);
                setShowInput(false);
                handleReRender();
            } catch (error) {
                console.log(error);
            }
        }
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
                        width: '60%',
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
                    {type === true ? (
                        <>
                            <p className={cx('title')}>Brands</p>
                            <div className={cx('btn-modal')}>
                                <Button
                                    primary
                                    leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                                    onClick={() => {
                                        setShowInput((prev) => !prev);
                                    }}
                                >
                                    <p>Add new brand!</p>
                                </Button>
                            </div>
                            {showInput === true && (
                                <div className={cx('infor-add')}>
                                    <div className={cx('input_product')}>
                                        <label className={cx('label-product')}>Brand Name: </label>
                                        <input placeholder="..." {...register('name')} />
                                        {errors.name && (
                                            <p className={cx('form-message')}>
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className={cx('img-add')}>
                                        <label className={cx('label-product')}>
                                            Choose Picture for Brand
                                        </label>
                                        <div className={cx('product_img--sub')}>
                                            {Boolean(img.length) &&
                                                img.map((item, index) => (
                                                    <div className={cx('img_sub')} key={index}>
                                                        <button
                                                            onClick={() => {
                                                                URL.revokeObjectURL(setImg[index]);
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
                                                            X
                                                        </button>
                                                        <img src={item.preview} />
                                                    </div>
                                                ))}
                                            {img?.length < 1 && (
                                                <div className={cx('img_sub')}>
                                                    <label
                                                        className={cx([
                                                            'add_btn-on',
                                                            'img_sub__add',
                                                        ])}
                                                        htmlFor="file_add_brand"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faSquarePlus}
                                                            size="4x"
                                                        />

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
                                            id="file_add_brand"
                                            className={cx('add_imgSub_btn-off')}
                                        />
                                    </div>
                                    <Button
                                        primary
                                        onClick={(e) => {
                                            handleSubmit(onSubmit)(e);
                                        }}
                                    >
                                        <p>Submit</p>
                                    </Button>
                                </div>
                            )}
                            <ul className={cx('responsive-table')}>
                                <li className={cx('table-header')}>
                                    <div className={cx('col', 'col-1')}>ID</div>
                                    <div className={cx('col', 'col-2')}>Brand name</div>
                                    <div className={cx('col', 'col-3')}></div>
                                    <div className={cx('col', 'col-4')}></div>
                                </li>
                                {brands &&
                                    brands.map((item, index) => {
                                        return (
                                            <li key={index} className={cx('table-row')}>
                                                <div
                                                    className={cx('col', 'col-1', 'name')}
                                                    data-label="ID"
                                                >
                                                    {item.id}
                                                </div>
                                                <div
                                                    className={cx('col', 'col-2', 'name')}
                                                    data-label="Product Name"
                                                >
                                                    {item.brand_name}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'col',
                                                        'col-3',
                                                        'name',
                                                        'btn-hover',
                                                    )}
                                                    data-label="Remove"
                                                    onClick={() => handleRemoveBrand(item.id)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    ></FontAwesomeIcon>
                                                    Remove
                                                </div>
                                                <div
                                                    className={cx(
                                                        'col',
                                                        'col-4',
                                                        'name',
                                                        'btn-hover',
                                                    )}
                                                    data-label="Modify"
                                                    onClick={() => {
                                                        setBrandId(item);
                                                        handleShowModify();
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPenNib}
                                                    ></FontAwesomeIcon>
                                                    Modify
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </>
                    ) : (
                        <>
                            <p className={cx('title')}>Categories</p>
                            <div className={cx('btn-modal')}>
                                <Button
                                    primary
                                    leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                                    onClick={() => {
                                        setShowInput((prev) => !prev);
                                    }}
                                >
                                    <p>Add new category!</p>
                                </Button>
                            </div>
                            {showInput === true && (
                                <div className={cx('infor-add')}>
                                    <div className={cx('input_product')}>
                                        <label className={cx('label-product')}>
                                            Category Name:{' '}
                                        </label>
                                        <input placeholder="..." {...register('name')} />
                                        {errors.name && (
                                            <p className={cx('form-message')}>
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className={cx('img-add')}>
                                        <label className={cx('label-product')}>
                                            Choose Picture for Category
                                        </label>
                                        <div className={cx('product_img--sub')}>
                                            {Boolean(img.length) &&
                                                img.map((item, index) => (
                                                    <div className={cx('img_sub')} key={index}>
                                                        <button
                                                            onClick={() => {
                                                                URL.revokeObjectURL(setImg[index]);
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
                                                            X
                                                        </button>
                                                        <img src={item.preview} />
                                                    </div>
                                                ))}
                                            {img?.length < 1 && (
                                                <div className={cx('img_sub')}>
                                                    <label
                                                        className={cx([
                                                            'add_btn-on',
                                                            'img_sub__add',
                                                        ])}
                                                        htmlFor="file_add_brand"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faSquarePlus}
                                                            size="4x"
                                                        />

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
                                            id="file_add_brand"
                                            className={cx('add_imgSub_btn-off')}
                                        />
                                    </div>
                                    <Button
                                        primary
                                        onClick={(e) => {
                                            handleSubmit(onSubmit)(e);
                                        }}
                                    >
                                        <p>Submit</p>
                                    </Button>
                                </div>
                            )}
                            <ul className={cx('responsive-table')}>
                                <li className={cx('table-header')}>
                                    <div className={cx('col', 'col-1')}>ID</div>
                                    <div className={cx('col', 'col-2')}>Category Name</div>
                                    <div className={cx('col', 'col-3')}></div>
                                    <div className={cx('col', 'col-4')}></div>
                                </li>
                                {categories &&
                                    categories.map((item, index) => {
                                        return (
                                            <li key={index} className={cx('table-row')}>
                                                <div
                                                    className={cx('col', 'col-1', 'name')}
                                                    data-label="ID"
                                                >
                                                    {item.id}
                                                </div>
                                                <div
                                                    className={cx('col', 'col-2', 'name')}
                                                    data-label="Product Name"
                                                >
                                                    {item.category_name}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'col',
                                                        'col-3',
                                                        'name',
                                                        'btn-hover',
                                                    )}
                                                    data-label="Remove"
                                                    onClick={() => handleRemoveCategory(item.id)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    ></FontAwesomeIcon>
                                                    Remove
                                                </div>
                                                <div
                                                    className={cx(
                                                        'col',
                                                        'col-4',
                                                        'name',
                                                        'btn-hover',
                                                    )}
                                                    data-label="Modify"
                                                    onClick={() => {
                                                        setCategoryId(item);
                                                        handleShowModify();
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPenNib}
                                                    ></FontAwesomeIcon>
                                                    Modify
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </>
                    )}
                </div>
            </Modal>
            <ModalModify
                show={showModal}
                handleClose={handleCloseModify}
                type={type}
                brand={brandId}
                category={categoryId}
                handleReRender={handleReRender}
            ></ModalModify>
        </>
    );
}

export default ModalAdd;

function ModalModify({ show, handleClose, handleReRender, category, brand, type = false }) {
    // console.log(brandId);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [img, setImg] = useState([]);
    console.log(img.length);
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Bạn cần nhập trường này'),
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
    useEffect(() => {
        let defaultValues;
        if (type) {
            defaultValues = {
                name: brand?.brand_name,
            };
        } else {
            defaultValues = {
                name: category?.category_name,
            };
        }
        reset(defaultValues);
    }, [type, brand, category, reset]);

    const formValues = watch();
    useEffect(() => {
        if (formValues) {
            // Kiểm tra xem có bất kỳ trường nào đã thay đổi (dirty) hay không
            const isFormChanged = Object.keys(dirtyFields).some((fieldName) => {
                let product;
                if (type) {
                    product = brand;
                } else {
                    product = category;
                }
                return formValues[fieldName] != product[fieldName];
            });
            if (isFormChanged === false && img.length < 1) {
                setIsFormDirty(false);
            } else {
                setIsFormDirty(true);
            }
        }
    }, [formValues, type, brand, category, dirtyFields]);
    // const currentValues = {
    //     name: watch('name', defaultValues.name),
    // };
    const onSubmit = async (data) => {
        const formdata_imgs = new FormData();

        for (let i = 0; i < img.length; i++) {
            formdata_imgs.append('img', img[i]);
        }
        if (type === true) {
            if (img.length < 1) {
                const formdata = new FormData();
                formdata.append('brand_name', data.name);
                try {
                    await axios.put(`${url}/brand/update/${brand?.id}`, formdata);
                    toast.success('Change Brand Success!');
                    handleReRender();
                    handleClose();
                } catch (error) {
                    console.log(error);
                }
            } else {
                const formdata = new FormData();
                formdata.append('brand_name', data.name);
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
                    await axios.put(`${url}/brand/update/${brand?.id}`, combinedFormData);
                    toast.success('Add Brand Success!');
                    setImg([]);
                    handleClose();
                    handleReRender();
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            if (img.length < 1) {
                const formdata = new FormData();
                formdata.append('category_name', data.name);
                try {
                    await axios.put(`${url}/category/update/${category?.id}`, formdata);
                    toast.success('Change Category Success!');
                    handleReRender();
                    handleClose();
                } catch (error) {
                    console.log(error);
                }
            } else {
                const formdata = new FormData();
                formdata.append('category_name', data.name);
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
                    await axios.put(`${url}/category/update/${category?.id}`, combinedFormData);
                    toast.success('Change Category Success!');
                    setImg([]);
                    handleClose();
                    handleReRender();
                } catch (error) {
                    console.log(error);
                }
            }
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
                {type ? (
                    <>
                        <div className={cx('input_product')}>
                            <label className={cx('label-product')}>Brand Name: </label>
                            <input id="name" defaultValue={brand?.name} {...register('name')} />
                            {errors.name && (
                                <p className={cx('form-message')}>{errors.name.message}</p>
                            )}
                        </div>
                        <div className={cx('img-add')}>
                            <label className={cx('label-product')}>Choose Picture Change</label>
                            <div className={cx('product_img--sub')}>
                                {Boolean(img.length) &&
                                    img.map((item, index) => (
                                        <div className={cx('img_sub')} key={index}>
                                            <button
                                                onClick={() => {
                                                    URL.revokeObjectURL(setImg[index]);
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
                                {img?.length < 1 && (
                                    <div className={cx('img_sub')}>
                                        <label
                                            className={cx(['add_btn-on', 'img_sub__add'])}
                                            htmlFor="file_add_brand"
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
                                id="file_add_brand"
                                className={cx('add_imgSub_btn-off')}
                            />
                        </div>
                        <div className={cx('btn-change')}>
                            {isFormDirty === true ? (
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
                                            handleSubmit(onSubmit)(e);
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
                    </>
                ) : (
                    <>
                        <div className={cx('input_product')}>
                            <label className={cx('label-product')}>Brand Name: </label>
                            <input id="name" defaultValue={brand?.name} {...register('name')} />
                            {errors.name && (
                                <p className={cx('form-message')}>{errors.name.message}</p>
                            )}
                        </div>
                        <div className={cx('img-add')}>
                            <label className={cx('label-product')}>Choose Picture Change</label>
                            <div className={cx('product_img--sub')}>
                                {Boolean(img.length) &&
                                    img.map((item, index) => (
                                        <div className={cx('img_sub')} key={index}>
                                            <button
                                                onClick={() => {
                                                    URL.revokeObjectURL(setImg[index]);
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
                                {img?.length < 1 && (
                                    <div className={cx('img_sub')}>
                                        <label
                                            className={cx(['add_btn-on', 'img_sub__add'])}
                                            htmlFor="file_add_brand"
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
                                id="file_add_brand"
                                className={cx('add_imgSub_btn-off')}
                            />
                        </div>
                        <div className={cx('btn-change')}>
                            {isFormDirty === true ? (
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
                                            handleSubmit(onSubmit)(e);
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
                    </>
                )}
            </div>
        </Modal>
    );
}
