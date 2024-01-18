import styles from "./Products.module.scss";
import classNames from "classnames/bind";
import arrowDown from "../../assets/img/Vector 9.png";
import SideBarFilter from "../SideBarFilter";
import Rectangle53 from "../../assets/img/Rectangle53.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../constants";
import { FilterState } from "../../store/FilterProvider";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Products() {
  const [data, setData] = useState([]);
  const [loading,setIsLoading] = useState(false);
  const {filterId,searchContent} = FilterState();
  let newProducts = filterId.length!==0?data.products?.filter((p) => filterId?.find(f=>parseInt(f)===p.categoryId)):data.products;
  if(searchContent) {
    newProducts=newProducts?.filter((p) =>{
      return p.ten_san_pham.toLowerCase()===searchContent.toLowerCase().trim()
      ||p.ten_san_pham.toLowerCase().includes(searchContent.toLowerCase().trim())
      ||p.mo_ta_ngan.toLowerCase().includes(searchContent.toLowerCase().trim());
    });
    //newProducts=data.products?.filter((p) => filterId?.find(f=>parseInt(f)===p.id));
  }
  useEffect(() => {
    const control = new AbortController();
    const fetchData = async () => {
      try {
        const respone = await axios.get(url + "/products", {
          signal: control.signal,
        });
        setData(respone.data);
        setIsLoading(true);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      control.abort();
    };
  }, []);
  console.log(data);
  return (
    <div className={cx("wrap")}>
      <div className={cx("wrapper")}>
        <div className={cx("number-wrap")}>
          <span className={cx("pages")}>Showing 1 - 20 </span>
          <span className={cx("products")}>out of 2,356 Products</span>
        </div>
        <div className={cx("sort-wrap")}>
          <span className={cx("text")}>Sort by:</span>
          <div className={cx("category")}>
            <span className={cx("name")}>New Arrivals</span>
            <img src={arrowDown} alt="arrow-down" className={cx("icon")} />
            <div className={cx("drop-down")}>
              <div className={cx("item")}></div>
              <div className={cx("item")}></div>
              <div className={cx("item")}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("container")}>
        <SideBarFilter />
        <div className={cx("wrap-products")}>
          <div className={cx("products-list")}>
            {loading&&newProducts?.map((product,index) => {
                let imgs = JSON.parse(product?.hinh_anh);
                return (
                    product!==null&&<div className={cx("product")} key={index}>
              <Link to={`/product/${product.id}`} className={cx("product-link")}>
                <img src={`${url}/img/${imgs[0]}`} alt="product" className={cx("img")} />
                <p className={cx("desc")}>
                  {product.ten_san_pham}
                </p>
                <div className={cx("wrap-all")}>
                  <div className={cx("wrap-price")}>
                    <span className={cx("price")}>{product?.gia_khuyen_mai?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    <span className={cx("unused-price")}>{product?.gia_ban?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                  </div>
                  <div className={cx("wrap-orders-category")}>
                    <span className={cx("order-number")}>24 Orders</span>
                    <span className={cx("category-name")}>New Arrivals</span>
                  </div>
                </div>
                <div className={cx("icon-like")}></div>
              </Link>
            </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
