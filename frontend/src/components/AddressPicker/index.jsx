import classNames from 'classnames/bind';
import styles from './AddressPicker.module.scss';
import { useEffect, useState } from 'react';
import images from '../../assets/img';
import ModalComp from '../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../Button';
const cx = classNames.bind(styles);
function AddressPicker({ isAddress, setAddressToParent }) {
    const [address, setAddress] = useState([]);
    const [addressPicker, setAddressPicker] = useState('');
    // console.log(addressPicker);
    setAddressToParent(addressPicker);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Bạn cần nhập trường này'),
            phoneNumber: yup
                .string()
                .required('Bạn cần nhập trường này')
                .length(10, 'Số điện thoại phải có 10 số')
                .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
            address: yup.string().required('Bạn cần nhập trường này'),
        })
        .required();
    // console.log(address.length);
    // console.log(typeof address);
    const defaultValues = {
        // Định nghĩa các giá trị mặc định của form ở đây
        // Ví dụ:
        name: '',
        phoneNumber: '',
        address: '',
        // ...
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    useEffect(() => {
        let arrAddress = JSON.parse(localStorage.getItem('address'));
        // console.log(arrAddress);
        if (arrAddress === null) {
            localStorage.setItem('address', JSON.stringify([]));
        } else {
            setAddress(arrAddress);
        }
    }, []);
    const handleAddAddress = (data) => {
        // console.log(data);
        const newData = [...address, data];
        setAddress(newData);
        localStorage.setItem('address', JSON.stringify(newData));
        reset(defaultValues);
        handleClose();
    };
    const handlePickAddress = (index) => {
        setAddressPicker(address[index]);
        isAddress(true);
    };
    const handleRemoveAddress = (index) => {
        // console.log(index);
        const oldData = [...address];
        const dataDelete = oldData.splice(index, 1);
        if (dataDelete[index] === addressPicker) {
            console.log('Thoa man dieu kien');
            setAddressPicker('');
            setAddressToParent('');
            isAddress(false);
        }
        setAddress(oldData);
        localStorage.setItem('address', JSON.stringify(oldData));
        // console.log(dataDelete);
        // console.log(addressPicker);
        // console.log(dataDelete === addressPicker);
        // console.log(dataDelete[0] === addressPicker);

        // console.log(address);
    };
    return (
        <>
            <div className={cx('address-wrapper')}>
                <div className={cx('title')}>
                    <img src={images.location_title} alt="" />
                    <p className={cx('line-title')}>Delivery address</p>
                </div>
                <div className={cx('address-picker')}>
                    {address.length > 0 &&
                        address.map((add, index) => {
                            return (
                                <>
                                    <div
                                        className={cx(
                                            'address-child',
                                            addressPicker === address[index] && 'active',
                                        )}
                                        onClick={() => {
                                            handlePickAddress(index);
                                        }}
                                    >
                                        <img
                                            src={
                                                addressPicker === address[index]
                                                    ? images.location_active
                                                    : images.location
                                            }
                                            alt=""
                                        />
                                        <p className={cx('name')}>{add.name}</p>
                                        <p className={cx('phone-number')}>+84 {add.phoneNumber}</p>
                                        <p className={cx('address')}>{add.address}</p>
                                        <span
                                            className={cx('remove-address')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveAddress(index);
                                            }}
                                        >
                                            &times;
                                        </span>
                                    </div>
                                </>
                            );
                        })}

                    <div className={cx('address-child')} onClick={handleShow}>
                        <p className={cx('add')}>Add New Address</p>
                    </div>
                </div>
            </div>
            <ModalComp showModal={showModal} handleClose={handleClose}>
                <div className={cx('wrapper')}>
                    <p className={cx('title')}>ADD ADDRESS</p>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>Name: </label>
                        <input placeholder="Your Full Name" {...register('name')} />
                        {errors.name && <p className={cx('form-message')}>{errors.name.message}</p>}
                    </div>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>phone number: </label>
                        <input placeholder="Your Phone Number" {...register('phoneNumber')} />
                        {errors.phoneNumber && (
                            <p className={cx('form-message')}>{errors.phoneNumber.message}</p>
                        )}
                    </div>
                    <div className={cx('input_product')}>
                        <label className={cx('label-product')}>address: </label>
                        <input placeholder="Your Address" {...register('address')} />
                        {errors.address && (
                            <p className={cx('form-message')}>{errors.address.message}</p>
                        )}
                    </div>
                    <div className={cx('btn-handle')}>
                        <button className={cx('cancel')} onClick={handleClose}>
                            Cancel
                        </button>
                        <Button
                            primary
                            onClick={(e) => {
                                handleSubmit(handleAddAddress)(e);
                            }}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </ModalComp>
        </>
    );
}

export default AddressPicker;
