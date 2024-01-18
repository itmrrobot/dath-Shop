import { useEffect, useState } from "react";
import styles from "./SideBarFilter.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { url } from "../../constants";
import { FilterState } from "../../store/FilterProvider";

const cx = classNames.bind(styles);

function SideBarFilter() {
    const [data,setData] = useState([]);
    const {filterId,setFilterId} = FilterState();
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async() => {
            try {
                const respone = await axios.get(url+"/category",{
                    signal: controller.signal
                })
                setData(respone.data);
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
        console.log(e.target.checked)
        let newFilterId = [];
        if(e.target.checked) {
            setFilterId([...filterId,e.target.name]);
        } else {
            newFilterId=filterId.filter((i) => i!==e.target.name);
            setFilterId([...newFilterId]);
        }
    }
    console.log(filterId)
    return (
        <div className={cx("sidebar")}>
            <div className={cx("prices")}>
                <h4 className={cx("title")}>PRICES</h4>
                <div className={cx("range")}>
                    <span className={cx("text")}>Range</span>
                    <span className={cx("number")}>$120-$300</span>
                </div>
            </div>
            <div className={cx("check-boxes")}>
                <h4 className={cx("title")}>FILTERS</h4>
                <div className={cx("wrapper")}>
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
            <div className={cx("check-boxes")}>
                <h4 className={cx("title")}>BRANDS</h4>
                <div className={cx("wrapper")}>
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
            <div className={cx("check-boxes")}>
                <h4 className={cx("title")}>CATEGORIES</h4>
                <div className={cx("wrapper")}>
                    {data.category!==null&&data?.category?.map((item,index) => {
                        return(
                            <div className={cx("item")} key={index}>
                                <input type="checkbox" name={item?.id} className={cx("input")} onChange={handleClick}/>
                                <span className={cx("name")}>{item?.ten_chuyen_muc}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={cx("check-boxes")}>
                <h4 className={cx("title")}>SIZE</h4>
                <div className={cx("wrapper")}>
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
    )
}

export default SideBarFilter;