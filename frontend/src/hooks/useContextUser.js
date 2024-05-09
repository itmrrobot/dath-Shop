import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../service/AuthService';
// import isAh
import { url } from '../constants';
// Khoi tao UserContext bang createContext
const UseContextUser = createContext();
// Khoi tao Provider
const UserProvider = ({ children }) => {
    // Khoi tao bien State de luu tru trang thai nguoi dung
    const [currentUser, setCurrentUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [render, setRender] = useState(false);

    // console.log(currentUser);
    console.log(currentUser);
    console.log(cart);
    // console.log(currentUser?.id);
    // const {setUser,setIsLogin,user} = AuthState();
    const state = {
        cart: {
            value: cart,
            setCart,
        },
        cuser: {
            value: currentUser,
            setCurrentUser,
        },
        wishlist: {
            value: wishlist,
            setWishlist,
        },
        render: {
            value: render,
            setRender,
        },
    };
    useEffect(() => {
        const checkedLogin = async () => {
            // tien hanh kiem tra de cap quyen truy cap
            // Ham isAuthenticated co the tra ve hai gia tri: null (trong truong hop ko co token)
            // va tra ve 1 token da duoc parse(da duoc xu ly ben ham isAuthenticated)
            let cuser = isAuthenticated();
            // console.log(cuser);
            // Neu cuser tra ve null =>
            if (cuser === null) {
                // Tien hanh lam rong lai localStorage
                localStorage.removeItem('user');
                cuser = '';
            }
            // Set lai state cho currentUser
            setCurrentUser(cuser);
        };
        checkedLogin();
    }, [render]);
    useEffect(() => {
        const getData = async () => {
            let cuser = isAuthenticated();
            if (cuser === null) {
                setCart([]);
            } else {
                try {
                    const res = await axios.get(`${url}/cart/${currentUser?.id}`);
                    console.log(res.data);
                    let a = res?.data?.map((item) => {
                        // console.log(products);
                        // console.log(products?.find((i) => i.id == item.id_product));
                        return {
                            ...item,
                            isChecked: false,
                        };
                    });
                    // console.log(a);
                    setCart(a);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            }
        };
        getData();
    }, [currentUser, render]);
    useEffect(() => {
        const getData = async () => {
            let cuser = isAuthenticated();
            if (cuser === null) {
                setWishlist([]);
            } else {
                try {
                    const res = await axios.get(`${url}/wishlist/${currentUser?.id}`);
                    // console.log(res.data);
                    // let a = res?.data?.map((item) => {
                    //     // console.log(products);
                    //     // console.log(products?.find((i) => i.id == item.id_product));
                    //     return {
                    //         ...item,
                    //         isChecked: false,
                    //     };
                    // });
                    // // console.log(a);
                    setWishlist(res.data);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            }
        };
        getData();
    }, [currentUser, render]);
    // useEffect(() => {
    //     if(user) {
    //       const fetchData = async () => {
    //         try {
    //           // Get tới api cart => lấy ra được thông tin của tất cả những mặt hàng mà khách hàng đã đặt
    //           const respone = await axios.get(`${url}/cart/${user?.id}`);
    //         //   console.log(respone);
    //           setCart(respone?.data);
    //         // console.log(cart);

    //         //   setData(respone.data);
    //         } catch (e) {
    //           console.log(e);
    //         }
    //       };
    //       fetchData();
    //     } else {
    //       setCart([])
    //     }
    // }, []);
    return (
        <UseContextUser.Provider value={state}>
            {children}
            {/* Logic: 
            + Neu nhu ton tai token thi no se duoc Routes, con neu khong se bat buoc phai Login truoc khi duoc quyen truy cap
            {currentUser ? children : <Login/>}
        */}
        </UseContextUser.Provider>
    );
};

export { UseContextUser, UserProvider };
