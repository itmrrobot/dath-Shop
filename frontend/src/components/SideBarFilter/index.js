import { useEffect, useState } from "react";
import styles from "./SideBarFilter.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { url } from "../../constants";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './priceSlider.css';
const cx = classNames.bind(styles);

function SideBarFilter() {
    const [data,setData] = useState([]);
    const [price, setprice] = useState([0, 30000000]);
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async() => {
            try {
                const respone = await axios.get(url+"/category",{
                    signal: controller.signal
                })
                setData(respone.data);
                console.log(respone.data);
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
        return () => {
            controller.abort();
        }
    },[])

    const handleClick = (e) => {
        // let newFilterId = [];
        // if(e.target.checked) {
        //     setFilterId([...filterId,e.target.name]);
        // } else {
        //     newFilterId=filterId.filter((i) => i!==e.target.name);
        //     setFilterId([...newFilterId]);
        // }
    }
    return (
        <>
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-wrapper')}>
                <div className={cx('sidebar-section')}>
                    <p className={cx('title')}>Prices</p>
                    <div className={cx('range')}>
                        <p>Range</p>
                        <div className={cx('number')}>
                            <span>{price[0].toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> -{' '}
                            <span>{price[1].toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                    </div>
                    <RangeSlider
                        id="range-slider-yellow"
                        value={price}
                        onInput={setprice}
                        min={0}
                        max={10000000}
                        step={10000}
                    />
                    <div className={cx('filter-wrapper')}>
                        <button className={cx('filter_price_btn')}
                            // onClick={() => handleFilterPrice()}
                        >
                            Lọc
                        </button>
                    </div>
                </div>
                <div className={cx('sidebar-section')}>
                    <p className={cx('title')}>FILTERS</p>
                    <div className={cx('ckb-wrapper')}>
                        <div className={cx("item")}>
                            <input type="checkbox" className={cx("input")}/>
                            <span className={cx("name")}>Women</span>
                        </div>
                        <div className={cx("item")}>
                            <input type="checkbox" className={cx("input")}/>
                            <span className={cx("name")}>Men</span>
                        </div>
                        <div className={cx("item")}>
                            <input type="checkbox" className={cx("input")}/>
                            <span className={cx("name")}>Women's jewelry</span>
                        </div>
                        <div className={cx("item")}>
                            <input type="checkbox" className={cx("input")}/>
                            <span className={cx("name")}>Men's jewelry</span>
                        </div>
                    </div>
                </div>
                <div className={cx('sidebar-section')}>
                    <p className={cx('title')}>FILTERS</p>
                    <div className={cx('ckb-wrapper')}>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>H&M</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Mark & Spencer</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Victoria’s Secret</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Dior</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Gucci</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Fendi</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Prada</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Versace</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Dolce & Gabbana</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Zara</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Chanel</span>
                    </div>
                    </div>
                </div>
                <div className={cx('sidebar-section')}>
                    <p className={cx('title')}>CATEGORIES</p> 
                    <div className={cx('ckb-wrapper')}>
                    {data?.category!==null&&data?.category?.map((item,index) => {
                        return(
                            <div className={cx("item")} key={index}>
                                <input type="checkbox" name={item?.id} className={cx("input")} onChange={handleClick}/>
                                <span className={cx("name")}>{item?.category_name}</span>
                            </div>
                        )
                    })}
                    </div>   
                </div>
                <div className={cx('sidebar-section')}>
                    <p className={cx('title')}>SIZE</p>  
                    <div className={cx('ckb-wrapper')}>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Medium</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Large</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Plus Size</span>
                    </div>
                    <div className={cx("item")}>
                        <input type="checkbox" className={cx("input")}/>
                        <span className={cx("name")}>Sexy Plus Size</span>
                    </div>
                    </div>  
                </div>
            </div>
        </div>
        
        </>
        
    )
}

export default SideBarFilter;