import styles from './Product_Item.module.scss';
import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useContext, memo } from 'react';
// import { UserContext } from '~/hooks/UserContext';
import { Link } from 'react-router-dom';
// import { formatPrice, priceDiscount } from '~/common';
import { toast } from 'react-toastify';
import { UseContextUser } from '../../../hooks/useContextUser';
import { formatPrice, priceDiscount } from '../../../common';
import images from '../../../assets/img';
import axios from 'axios';
import { url } from '../../../constants';
import ModalComp from '../../Modal';
const cx = classNames.bind(styles);
function Product_Item({ item, index }) {
    console.log(item);
    const [size, setSize] = useState(item?.size);
    const [quantity_Order, setQuantity_Order] = useState();
    const state = useContext(UseContextUser);
    const size_quantity_select = useMemo(() => {
        // console.log('re-render');
        return item?.product?.Inventories?.find(
            (obj) => obj?.size === size.replace(/[\[\]"]+/g, ''),
        )?.quantity;
    }, [quantity_Order]);
    const handleCheckboxChange = (e) => {
        let oldCart = [...state?.cart?.value];
        // console.log(oldCart);
        let check_Prod = oldCart.find((prod) => {
            return item?.id === prod?.id;
        });
        // console.log(check_Prod);
        check_Prod = {
            ...check_Prod,
            isChecked: e.target.checked,
        };
        let index = oldCart.findIndex((prod) => item?.id === prod?.id);
        oldCart[index] = check_Prod;
        state?.cart?.setCart(oldCart);
    };
    const handleRemoveItem = () => {
        console.log(item?.id);
        axios.delete(`${url}/cart/delete/${item?.id}`).then((res) => {
            // console.log(res);
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
        });
    };
    const modifyQuantity = async (click) => {
        let bodyData = {
            id: item.id,
            id_user: state?.cuser?.value?.id,
            quantity: quantity_Order,
        };
        if (click) {
            if (quantity_Order + 1 > size_quantity_select) {
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
            } else {
                console.log(quantity_Order);
                let plus = {
                    ...bodyData,
                    quantity: quantity_Order + 1,
                };
                // console.log(plus);
                await axios.put(`${url}/cart/update`, plus);
                setQuantity_Order((prev) => prev + 1);
                state?.render?.setRender((prev) => !prev);
            }
        } else {
            let minus = {
                ...bodyData,
                quantity: quantity_Order - 1 === 0 ? quantity_Order : quantity_Order - 1,
            };
            await axios.put(`${url}/cart/update`, minus);
            if (quantity_Order === 1) {
                setQuantity_Order((prev) => prev);
            } else if (quantity_Order > 1) {
                setQuantity_Order((pre) => pre - 1);
            }
            state?.render?.setRender((prev) => !prev);
        }
    };
    useEffect(() => {
        setQuantity_Order(item.quantity);
    }, [item]);
    return (
        <>
            <div className={cx('product-item')}>
                <div className={cx('product-check')}>
                    <input
                        type="checkbox"
                        id={cx('checkbox-rect2')}
                        checked={item?.isChecked}
                        // onChange={} // Đặt giá trị checked dựa trên trạng thái của state
                        onChange={handleCheckboxChange} // Xử lý sự kiện khi checkbox thay đổi trạng thái
                    />
                </div>
                <div className={cx('product-img')}>
                    <div className={cx('product-img-wrapper')}>
                        <img
                            src={`${item?.img}`}
                            // alt={prod.name}
                        />
                    </div>
                </div>
                <div className={cx('product-content')}>
                    <div className={cx('product-infor')}>
                        <p className={cx('product-name')}>
                            <Link to={`/product/${item?.id}`}>{item?.nameProduct}</Link>
                        </p>
                        <p className={cx('product-type')}>{size_quantity_select} Products Left</p>
                        <p className={cx('product-type')}>
                            Size: {item?.size.replace(/[\[\]"]+/g, '')}
                        </p>
                    </div>
                    <div className={cx('price-quantity')}>
                        <div className={cx('price')}>
                            <p className={cx('price-discount')}>
                                {formatPrice(item?.product?.discount_price)}
                                {/* {formatPrice(priceDiscount(item?.product?.price, item?.product?.discount_id))} */}
                            </p>
                            <p className={cx('price-origin')}>
                                {formatPrice(item?.product?.price)}
                                {/* {formatPrice(priceDiscount(item?.product?.price, item?.product?.discount_id))} */}
                            </p>
                        </div>

                        <div className={cx('wrapper-quantity')}>
                            <span className={cx('minus')} onClick={() => modifyQuantity(false)}>
                                -
                            </span>
                            <span className={cx('num')}>{quantity_Order}</span>
                            <span className={cx('plus')} onClick={() => modifyQuantity(true)}>
                                +
                            </span>
                        </div>
                    </div>
                </div>

                <span className={cx('remove')} onClick={handleRemoveItem}>
                    <img src={images.remove} alt="" />
                </span>
            </div>
        </>
    );
}
export default memo(Product_Item);
