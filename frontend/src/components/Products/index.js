import styles from "./Products.module.scss";
import classNames from "classnames/bind";
import arrowDown from "../../assets/img/Vector 9.png";
import SideBarFilter from "../SideBarFilter";
import Rectangle53 from "../../assets/img/Rectangle53.png";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { url } from "../../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import images from "../../assets/img";
import ReactPaginate from 'react-paginate';
import './pagination.css';
const cx = classNames.bind(styles);

function Products() {
  const [data, setData] = useState([]);
  // console.log(data);
  const [loading,setIsLoading] = useState(false);
  const navigate = useNavigate();
    const location = useLocation();
    // const [isLoading, dispatch] = useContext(StoreContext);
    const [selected, setSelected] = useState('All');
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const brand = searchParams.get('brand_id');
    const type = searchParams.get('type');
    const price_gte = searchParams.get('price_gte');
    const price_lte = searchParams.get('price_lte');
    const filter = searchParams.get('order');
    const sort = searchParams.get('sort');
    const [productsPerPage, setProductPerPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    console.log(totalPages);
    const [display, setDisplay] = useState(false);
    const numPages = (n) => {
      const arrPage = Math.ceil(+n / 9);
      return arrPage;
  };
  // const {filterId,searchContent} = FilterState();
  // let newProducts = filterId.length!==0?data.products?.filter((p) => filterId?.find(f=>parseInt(f)===p.categoryId)):data.products;
  // if(searchContent) {
  //   newProducts=newProducts?.filter((p) =>{
  //     return p.ten_san_pham.toLowerCase()===searchContent.toLowerCase().trim()
  //     ||p.ten_san_pham.toLowerCase().includes(searchContent.toLowerCase().trim())
  //     ||p.mo_ta_ngan.toLowerCase().includes(searchContent.toLowerCase().trim());
  //   });
  //   //newProducts=data.products?.filter((p) => filterId?.find(f=>parseInt(f)===p.id));
  // }
  useEffect(() => {
    const control = new AbortController();
    const fetchData = async () => {
      try {
        const respone = await axios.get(url + "/products", {
          signal: control.signal,
        });
        console.log(respone);
        setData(respone.data.products);
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
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/products`, {
                params: {
                    page: page,
                    limit: limit,
                    brand_id: brand,
                    type: type,
                    price_gte: price_gte,
                    price_lte: price_lte,
                    sort: sort,
                    order: filter,
                },
            });
            // response.headers('X-Total-Count', )
            console.log(response);
            const xTotalCount = response.headers['x-total-count'];
            // console.log(response);
            setTotalPages(numPages(Number(+xTotalCount)));
            setProductPerPage(response.data);
            setDisplay(false);
            {
                sort ? setSelected((prev) => prev) : setSelected('All');
            }
            // dispatch(actions.setLoading(false));
        } catch (error) {
            console.error(error);
        }
    };
    setTimeout(async () => {
        await fetchData();
    }, 2000);
  }, [brand, page, type, price_gte, price_lte, filter, sort]);
  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
    searchParams.set('page', +e.selected + 1);
    searchParams.set('limit', '9');
    navigate(`/products?${searchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className={cx("wrap")}>
      <div className={cx("wrapper")}>
        {/* <div className={cx("number-wrap")}>
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
        </div> */}
      </div>
      <div className={cx("container")}>
        <SideBarFilter />
        <div className={cx("wrap-products")}>
          <div className={cx("products-list")}>
            {loading&&data?.map((product,index) => {
                let imgs = product?.img;
                return (
                    product!==null&&<div className={cx("product")} key={index}>
              <Link to={`/product/${product.id}`} className={cx("product-link")}>
                <div className={cx('product-img')}>
                  <div className={cx('product-img-wrapper')}>
                    <img src={`${url}/img/${imgs[0]}`} alt="product" className={cx("img")} />
                    <img src={`${url}/img/${imgs[1]}`} alt="rear product image" className={cx('rear-img')}/>
                  </div>
                </div>
                <p className={cx("desc")}>
                  {product.name}
                </p>
                <div className={cx("wrap-all")}>
                  <div className={cx("wrap-price")}>
                    <span className={cx("price")}>{product?.discount_price?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    <span className={cx("unused-price")}>{product?.price?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                  </div>
                  <div className={cx("wrap-orders-category")}>
                    <span className={cx("order-number")}>24 Orders</span>
                    <span className={cx("category-name")}>New Arrivals</span>
                  </div>
                </div>
                <div className={cx('loved')}>
                                    <img src={images.unheart} alt="" />
                                </div>
              </Link>
            </div>
                )
            })}
          </div>
        </div>
      </div>
      <div className={cx('pagination')}>
                {/* {console.log('Hello')} */}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    // pageRangeDisplayed={10}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    pageClassName={cx('page-item')}
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
    </div>
  );
}

export default Products;
