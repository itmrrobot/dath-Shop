import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import api from '../../api';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { url } from '../../constants';
import HeaderBackground from '../../assets/img/Rectangle 27.svg';
import ContainerProfile from '../../assets/img/Rectangle 26.svg';
import Avatar from '../../assets/img/avatar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UseContextUser } from '../../hooks/useContextUser';
import images from '../../assets/img';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
// import AvatarAuto from '../AvatarAuto';
const cx = classNames.bind(styles);

const Profile = () => {
    const navigate = useNavigate();
    const state = useContext(UseContextUser);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = yup
        .object()
        .shape({
            fullname: yup.string().required('Bạn cần nhập trường này'),
            name: yup.string().required('Bạn cần nhập trường này'),
            email: yup
                .string()
                .required('Bạn cần nhập trường này')
                .email('Email không hợp lệ')
                .matches(/@gmail\.com$/, 'Email phải kết thúc bằng @gmail.com'),
            phoneNumber: yup
                .string()
                .required('Bạn cần nhập trường này')
                .length(10, 'Số điện thoại phải có 10 số')
                .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
            address: yup.string().required('Bạn cần nhập trường này'),
        })
        .required();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const defaultValues = {
        fullname: state?.cuser?.value?.fullname,
        name: state?.cuser?.value?.name,
        email: state?.cuser?.value?.email,
        phoneNumber: state?.cuser?.value?.phone,
        address: state?.cuser?.value?.address,
    };

    const currentValues = {
        fullname: watch('fullname', defaultValues.fullname),
        name: watch('name', defaultValues.name),
        email: watch('email', defaultValues.email),
        phoneNumber: watch('phoneNumber', defaultValues.phoneNumber),
        address: watch('address', defaultValues.address),
        // Lấy giá trị của các trường input khác và gán vào đây
    };
    useEffect(() => {
        const isDirty = Object.keys(dirtyFields).some(
            (fieldName) => currentValues[fieldName] !== defaultValues[fieldName],
        );
        setIsFormDirty(isDirty);
    }, [dirtyFields, currentValues, defaultValues]);
    const onSubmit = async (data) => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const dataPost = {
            fullname: data.fullname,
            name: data.name,
            email: data.email,
            phone: data.phoneNumber,
            address: data.address,
        };
        try {
            // console.log(dataPost);
            await delay(2000); // Chờ 2 giây
            const res = await axios.put(
                `${url}/auth/user/update/${state?.cuser?.value?.id}`,
                dataPost,
            );

            let dataUpdate = {
                fullname: res.data.fullname,
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                address: res.data.address,
            };

            let newData = {
                ...state?.cuser?.value,
                ...dataUpdate,
            };
            toast.success('Chỉnh sửa thông tin thành công', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
            state?.cuser?.setCurrentUser(newData);
            localStorage.setItem('user', JSON.stringify(newData));
        } catch (error) {
            // Xử lý lỗi nếu có
            console.log(error);
            toast.error('Chỉnh sửa thông tin thất bại', {
                // autoClose: 2000,
                theme: 'colored',
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <img src={HeaderBackground} alt="" className={cx('header-img')} />
                <div className={cx('avatar-wrapper')}>
                    {/* <img src={state?.cuser?.value?.avatar} alt="avatar" className={cx("avatar")}/>  */}
                    {/* <img src={state?.cuser?.value?.avatar} alt="avatar" className={cx('avatar')} /> */}
                    <AvatarAuto nameU={state?.cuser?.value?.name} />
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('form')}>
                    <div className={cx('name-fullname')}>
                        <div className={cx('form-group', 'name')}>
                            <label className={cx('form-label')}>Name</label>
                            <input
                                // className={cx('unedited')}
                                id="name"
                                name="ten"
                                type="text"
                                className={cx('form-input')}
                                // value={state?.cuser?.value?.fullname}
                                value={currentValues.name}
                                {...register('name')}
                            />
                            {errors.name && (
                                <span className={cx('form-message')}>{errors.name.message}</span>
                            )}
                            {/* <input type="text" className={cx("form-input")} placeholder="Nguyen Ngoc Khanh"/> */}
                        </div>
                        <div className={cx('form-group', 'fullname')}>
                            <label className={cx('form-label')}>Fullname</label>
                            <input
                                id="fullname"
                                name="ten"
                                type="text"
                                className={cx('form-input')}
                                value={currentValues.fullname}
                                {...register('fullname')}
                            />
                            {errors.fullname && (
                                <span className={cx('form-message')}>
                                    {errors.fullname.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')}>Email</label>
                        <input
                            id="email"
                            name="ten"
                            type="text"
                            className={cx('form-input')}
                            value={currentValues.email}
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className={cx('form-message')}>{errors.email.message}</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')}>Phone number</label>
                        <input
                            id="phoneNumber"
                            name="ten"
                            type="text"
                            className={cx('form-input')}
                            value={currentValues.phoneNumber}
                            {...register('phoneNumber')}
                        />
                        {errors.phoneNumber && (
                            <span className={cx('form-message')}>{errors.phoneNumber.message}</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')}>Location</label>
                        <input
                            id="address"
                            name="ten"
                            type="text"
                            className={cx('form-input')}
                            value={currentValues.address}
                            {...register('address')}
                        />
                        {errors.address && (
                            <span className={cx('form-message')}>{errors.address.message}</span>
                        )}
                    </div>

                    <div className={cx('group-btn')}>
                        {/* <button className={cx("btn-common","btn-cancel")} onClick={() => navigate('/')}>Cancel</button> */}
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
                        {/* <button className={cx("btn-common")}>Update</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

function AvatarAuto({ nameU = 'User' }) {
    let bgRand = nameU.lastIndexOf(' ')
        ? nameU[nameU.lastIndexOf(' ') + 1].charCodeAt(0) % 10
        : nameU[0].charCodeAt(0) % 10;
    bgRand = bgRand > 0 ? bgRand : bgRand + 1;
    const sumaryU = () => {
        let n = nameU.lastIndexOf(' ') + 1;
        let splitName = nameU.split(' ');
        // return nameU[n]
        return splitName.length > 1
            ? splitName[splitName.length - 2][0] + splitName[splitName.length - 1][0]
            : nameU[0];
    };

    return (
        <div className={cx(['wrapper_auto', `bgA_${bgRand}`])}>
            <span>{sumaryU()}</span>
        </div>
    );
}
