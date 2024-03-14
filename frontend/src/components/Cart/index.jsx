import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect, useState, useMemo } from "react";
import { url } from "../../constants";
import axios from "axios";
import {formatPrice, priceDiscount} from "../../common"
import images from "../../assets/img";
import { Link } from "react-router-dom";
import { UseContextUser } from "../../hooks/useContextUser";
import Product_Item from "./Product_Item";
import Button from "../Button"
const cx = classNames.bind(styles);

function Cart() {
    const state = useContext(UseContextUser)
    const [product, setProduct] = useState([]);
    console.log([product]);
    const totalProduct = useMemo(() => {
        return product.reduce((acc, cur) => {
            // console.log(cur.quantity);
            return acc + Number(cur?.so_luong);
        }, 0);
    }, [product]);
    const subtotal = useMemo(() => {
        let check = state?.cart?.value?.filter((prod) => {
            // console.log(prod);
            return prod.isChecked === true
        })
        // console.log(check);
        let total = check.reduce((cur, acc) => {
            return cur + acc.so_luong * acc.priceProduct;
        }, 0);
        return total;
    }, [product, state?.cart?.value]);
    // console.log(subtotal);
    const tax = useMemo(() => {
        return subtotal * 6.5 / 100
        // return total;
    }, [product, subtotal]);
    const totalSum = useMemo(() => {
        return (subtotal + tax) - ((subtotal + tax)*20/100) ;
    }, [product, subtotal]);
    // console.log(subtotal);
    // console.log(state?.cart?.value);
    // console.log(state?.cart?.value);
    // console.log(product);
    // console.log(state.cart.value);
    // useEffect(() => {
    //     let product_id = state?.cart?.value?.map((i) => i.id);
    //     const fetchProducts = async () => {
    //         try {
    //             const baseUrl = 'http://localhost:4000/products';
    //             const requests = product_id?.map((id) => axios.get(`${baseUrl}/${id}`));
    //             const responses = await Promise.all(requests);
    //             // console.log(responses);
    //             const products = responses.map((response) => response.data);
    //             let product_cart = state?.cart?.value;
    //             console.log(product_cart);
    //             let a = product_cart?.map((item) => {
    //                 // console.log(products);

    //                 return {
    //                     ...item,
    //                 };
    //             });
    //             // console.log(a);
    //             setProduct(a);
    //             // setProduct(products);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    //         }
    //     };

    //     // Gọi hàm lấy danh sách sản phẩm
    //     fetchProducts();
    //     // axios.get(`https://shoesshop-6n6z.onrender.com/shoesList/${product_id}`).then((res) => {
    //     //     let product_cart = state?.cart?.value;
    //     //     // console.log(res.data);
    //     //     let a = product_cart?.map((item) => {
    //     //         return {
    //     //             ...item,
    //     //             product: res.data.find((i) => i.id == item.id),
    //     //         };
    //     //     });
    //     //     setProduct(a);
    //     //     // console.log(a);
    // }, [state.cart.value]);
    // get ra những data bên trong store Cart Provider
  //   const {
  //       // Những giá trị
  //       cartState: { quantity, products,isCheckOut,allProducts},
  //       // Method
  //       cartDispatch,
  //       increment,
  //       decrement,
  //       removeProduct
  //     } = CartState();
  //   console.log(quantity);
  //   const [isClickPlaceOrder,setIsClickPlaceOrder] = useState(false);
  //   const [isLessOne,setIsLessOne] = useState(false);
  //   const [data,setData] = useState([]);
  //   const {user} = AuthState();
  //   // Nếu tồn tại data => 
  //   const total = data&&data?.reduce((acc,curr) => {return acc+Number(curr?.so_luong)*Number(curr?.priceProduct)},0)
  //   const qty = data&&data?.reduce((acc,curr) => {return acc+curr?.so_luong},0)
  // useEffect(() => {
  //   const control = new AbortController();
  //   const fetchData = async () => {
  //     try {
  //       // Get tới api cart => lấy ra được thông tin của tất cả những mặt hàng mà khách hàng đã đặt
  //       const respone = await axios.get(`${url}/cart/${user.id}`, {
  //         signal: control.signal,
  //       });
  //       setData(respone.data);
  //     } catch (e) {   
  //         // console.log(e);
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     control.abort();
  //   };
  // },[user?.id])  

  // const handleDecrese = async(id_user,id_product,so_luong) => {
  //   cartDispatch({type:"TOTALPRODUCTDECREASE"})
  //   let count = so_luong-1;
  //   if(so_luong<=1) {
  //     count = 0
  //   }
  //   try {
  //     const res = await axios.put(url+'/cart/update',{id_user,id_product,so_luong:count})
  //     setData(res.data);
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  // const handleIncrese = async(id_user,id_product,so_luong) => {
  //   setIsLessOne(false);
  //   cartDispatch({type:"TOTALPRODUCTINCREASE"});
  //   // let count = so_luong;
  //   try {
  //     const res = await axios.put(url+'/cart/update',{id_user,id_product,so_luong:so_luong+1})
  //     setData(res.data);
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }
  useEffect(() => {
    let product_id = state.cart.value.map((i) => i.id_product);
    const fetchProducts = async () => {
        try {
            const baseUrl = 'http://localhost:4000/products';
            const requests = product_id?.map((id) => axios.get(`${baseUrl}/${id}`));
            const responses = await Promise.all(requests);
            const products = responses.map((response) => response.data);
            // console.log(products);
            let product_cart = state?.cart?.value;
            // console.log(product_cart);
            let a = product_cart?.map((item) => {
                // console.log(products);
                // console.log(products?.find((i) => i.id == item.id_product));
                return {
                    ...item,
                    product: products?.find((i) => i.id == item.id_product)
                };
            });
            // setCartHeader(a);
            console.log(a);
            // state.cart.setCart(a);
            setProduct(a);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        }
    };
    // Gọi hàm lấy danh sách sản phẩm
    fetchProducts();
}, [state.cart.value]);
    return(
      <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header-title')}>
                    <h1>Cart</h1>
                    <p className="total-product">
                        ( <span>{totalProduct}</span> Products )
                    </p>
                </div>
                <div className={cx('product')}>
                    {product?.map((item, i) => {
                        return <Product_Item item={item} key={i} index={i}></Product_Item>;
                    })}
                </div>
            </div>
            <div className={cx('payment')}>
                <div className={cx('payment-wrapper')}>
                    <div className={cx('payment-title')}>
                        <p>Summary</p>
                    </div>
                    <div className={cx('payment-display')}>
                        <p className={cx('label')}>Subtotal</p>
                        <p className={cx('price')}>{formatPrice(subtotal)}</p>
                    </div>
                    <div className={cx('payment-display')}>
                        <p className={cx('label')}>Sales tax (6.5%)</p>
                        <p className={cx('price')}>{formatPrice(tax)}</p>
                    </div>
                    <div className={cx('payment-display')}>
                        <p className={cx('label')}>Voucher</p>
                        <p className={cx('discount-price')}>-20%</p>
                    </div>
                    <div className={cx('payment-display')}>
                        <p className={cx('label')}>Shipping Fee</p>
                        <p className={cx('discount-price')}>Free</p>
                    </div>
                    <div className={cx('payment-display')}>
                        <p className={cx('label')}>Total Due</p>
                        <p className={cx('discount-price')}>{formatPrice(totalSum)}</p>
                    </div>
                    {state?.cart?.value.find((prod) => prod.isChecked === true) !== undefined && product.length > 0 ? (
                        <Button
                            // className={cx('btn_payment')}

                            // onClick={() => handleShow()}
                            payment
                            // rounded
                            // onClick={(e) => {
                            //     const user = JSON.parse(localStorage.getItem("tokens"))
                            //     if(!user.status) {
                            //         alert("Hãy đăng nhập để mua hàng")
                            //         navigate("/signin")
                            //     }

                            //     handleSubmit(handleOrder)(e)

                            // }}
                        >
                            {/* Checkout - {formatPrice(totalSum)} */}
                            Checkout
                        </Button>
                    ) : (
                        <Button
                            // className={cx('btn_payment')}
                            // onClick={() => handleShow()}
                            payment
                            disabled
                        >
                            Checkout
                        </Button>
                    )}

                    <Link to={`/product?_page=1&_limit=9`}>
                        <button className={cx('btn_continue_shopping')}>Continue Shopping</button>
                    </Link>
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
                                    30 days to return it to us for a refund. We have made returns SO EASY - you can now
                                    return your order to a store or send it with FedEx FOR FREE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Cart;