import styles from "./CategoryProducts.module.scss";
import classNames from "classnames/bind";
import Rectangle1389 from "../../assets/img/Rectangle1389.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../constants";

const cx = classNames.bind(styles);

function CategoryProducts() {
    const [isBlur,setIsBlur] = useState(false);
    const [data,setData] = useState([]);
    let newData = data.category?.slice(0,4);

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData =async() => {
            try {
                const respone =await axios.get(url+"/category",{
                    signal: controller.signal
                })
                setData(respone.data)
            } catch(e) {
                console.log(e);
            }
        }   
        fetchData();
        return () => {
            controller.abort();
        }
    },[])


    const handleClick = () => {
        
    }

    const handleBlur = (e) => {
        
        setIsBlur(!isBlur);
    }

    
    return (
        <div className={cx("category-products")}>
            <h4 className={cx("title")}>Danh mục sản phẩm</h4>
            <div className={cx("wrap")}>
                {newData!==null&&newData?.map((item,index) => {
                    return (
                        <div className={cx("item")} key={index} onClick={handleClick}>
                    <img src={`${url}/img/${item.hinh_anh}`} onBlur={handleBlur} className={cx("img")} alt="Rectangle 1389"/>
                    <div className={cx("middle")}>
                        <div className={cx("text")}>{item.ten_chuyen_muc}</div>
                    </div>
                </div>
                    )
                })}
            </div>
        </div>  
    )
}

export default CategoryProducts;