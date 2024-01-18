import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import imgProduct from "../../assets/img/img-in-cart.png";
import TotalOrder from "../TotalOrder";
import ModalPayment from "../ModalPayment";
import { useEffect, useState } from "react";
import { CartState } from "../../store/CartProvider";
import { url } from "../../constants";
import axios from "axios";
import { AuthState } from "../../store/AuthProvider";

const cx = classNames.bind(styles);

function Cart() {
    const {
        cartState: { quantity, products,isCheckOut,allProducts},
        cartDispatch,
        increment,
        decrement,
        removeProduct
      } = CartState();
      console.log(quantity, products,allProducts)
    const [isClickPlaceOrder,setIsClickPlaceOrder] = useState(false);
    const [isLessOne,setIsLessOne] = useState(false);
    const [data,setData] = useState([]);
    const {user} = AuthState();
    const total = data&&data?.reduce((acc,curr) => {return acc+Number(curr?.so_luong)*Number(curr?.priceProduct)},0)
    const qty = data&&data?.reduce((acc,curr) => {return acc+curr?.so_luong},0)
  console.log(data)
  useEffect(() => {
    const control = new AbortController();
    const fetchData = async () => {
      try {
        const respone = await axios.get(`${url}/cart/${user.id}`, {
          signal: control.signal,
        });
        setData(respone.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      control.abort();
    };
  },[user?.id])  

  const handleDecrese = async(id_user,id_product,so_luong) => {
    cartDispatch({type:"TOTALPRODUCTDECREASE"})
    let count;
    if(so_luong>1) {
      count = so_luong-1;
    }
    try {
      const res = await axios.put(url+'/cart/update',{id_user,id_product,so_luong:count})
      setData(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  const handleIncrese = async(id_user,id_product,so_luong) => {
    setIsLessOne(false);
    cartDispatch({type:"TOTALPRODUCTINCREASE"});
    let count = so_luong+1;
    try {
      const res = await axios.put(url+'/cart/update',{id_user,id_product,so_luong:count})
      setData(res.data);
    } catch(e) {
      console.log(e);
    }
  }
  console.log(total);
    return(
        <div className={cx("wrap")}>
            <h3 className={cx("title")}>Cart</h3>
            <div className={cx("list")}>
                {data&&data?.map((item,index) => {
                    console.log(item.ten_hinh_anh)
                    return <div className={cx("item")} key={index}>
                    <img src={`${item?.img}`} alt="" className={cx("img")}/>
                    <div className={cx("wrapper")}>
                        <div className={cx("wrap-name-desc")}>
                            <h5 className={cx("name")}>{item?.nameProduct}</h5>
                            <span className={cx("category")}>Men’s Shoes</span>
                            <span className={cx("desc")}>1 Colour</span>
                        </div>
                        <div className={cx("wrap-price-button")}>
                            <span className={cx("price")}>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item?.priceProduct)}</span>
                            <div className={cx("btn-quantity")}>
                                <span className={cx("btn-decrease")} onClick={() => {item.so_luong>1?decrement(item?.id_product):setIsLessOne(true);handleDecrese(item?.id_user,item?.id_product,item.so_luong);}}>-</span>
                                <span className={cx("quantity-number")}>{item.so_luong}</span>
                                <span className={cx("btn-increase")} onClick={() => {increment(item?.id_product);handleIncrese(item?.id_user,item?.id_product,item.so_luong)}}>+</span>
                            </div>
                        </div>
                    </div>
                </div>
                })}
            </div>
            {isClickPlaceOrder&&<ModalPayment setIsClickPlaceOrder={setIsClickPlaceOrder} total={total}/>}
            <TotalOrder setIsClickPlaceOrder={setIsClickPlaceOrder} total={total} qty={qty}/>
        </div>
    )
}

export default Cart;