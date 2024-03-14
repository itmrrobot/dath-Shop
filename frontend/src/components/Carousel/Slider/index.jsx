import React, { useRef, useState, useMemo, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { formatPrice, priceDiscount } from '../../../common';
import { url } from "../../../constants";

const cx = classNames.bind(styles);

// import required modules

function Slider({ param, brand_id, images }) {
    // const array = [product];
    // console.log(brand_id);
    const [recommend, setRecommend] = useState([]);
    console.log(recommend);
    const [brand, setBrand] = useState([]);
    console.log(brand);
    const handleImage = respone => {
        const cleanedString = respone.slice(1, -1);
                // Tách chuỗi thành mảng sử dụng dấu phẩy làm dấu phân cách
                const arrayWithoutQuotes = cleanedString.split(',');
                // Xóa dấu ngoặc kép và khoảng trắng ở đầu và cuối mỗi phần tử trong mảng
                const finalArray = arrayWithoutQuotes.map(item => item.replace(/"/g, '').trim());
                // setImage(finalArray);
                return finalArray
    }
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(`${url}/products`,{
                    signal: controller.signal,
                    params: {
                        brand_id: brand_id,
                    },
                })
                if (param) {
                    setRecommend(respone.data.products);
                } else {
                    setBrand(respone.data);
                }
                //setImgs(respone.data.hinh_anh)
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
        return () => {
            controller.abort();
        }
    },[param, brand_id])
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:3000/product`, {
    //             params: {
    //                 brand_id: brand_id,
    //             },
    //         })
    //         .then((res) => {
    //             // Trả về 1 mảng [sản phẩm]
    //             if (param) {
    //                 setRecommend(res.data);
    //             } else {
    //                 setBrand(res.data);
    //             }
    //         });
    // }, [param, brand_id]);
    const randomValues = useMemo(() => {
        const sortedData = [...recommend].sort(() => 0.5 - Math.random());
        return sortedData.slice(0, 9);
    }, [recommend]);
    // console.log(product);
    // console.log();
    // console.log(randomValues);
    // console.log(product);
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                slidesPerView={4}
                spaceBetween={30}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {param &&
                    randomValues.length > 0 &&
                    randomValues?.map((slide, i) => {
                        // console.log(slide[0].name);
                        return (
                            <div key={i}>
                                <SwiperSlide>
                                    <Link to={`http://localhost:3004/product/${slide.id}`}>
                                        <div className={cx('item-slider')}>
                                            <img
                                                // src={'https://shoesshop-6n6z.onrender.com/imgs/' + slide?.img}
                                                src={`${url}/img/${handleImage(slide.hinh_anh)[0]}`}
                                                alt={slide.name}
                                                title={slide.name}
                                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                            />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            </div>
                        );
                    })}
                {brand_id &&
                    (brand.length > 0 ? (
                        brand?.map((slide, i) => {
                            // console.log(slide[0].name);
                            return (
                                <div key={i}>
                                    <SwiperSlide>
                                        <Link to={`http://localhost:3001/product/${slide.id}`}>
                                            <div className={cx('item-slider')}>
                                                <img
                                                src={`${url}/img/${slide.hinh_anh[0]}`}
                                                    // src={'https://shoesshop-6n6z.onrender.com/imgs/' + slide?.img}
                                                    alt={slide.name}
                                                    title={slide.name}
                                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                />
                                                <img
                                                src={`${url}/img/${slide.hinh_anh[1]}`}

                                                    // src={`https://shoesshop-6n6z.onrender.com/imgs/${slide.hinh_anh[1]}`}
                                                    alt="rear product image"
                                                    className={cx('rear-img')}
                                                />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                </div>
                            );
                        })
                    ) : (
                        <div className={cx('notification')}>
                            {/* <h1>Xin chao</h1> */}
                            <p>Không tìm thấy sản phẩm nào của {brand_id}</p>
                        </div>
                    ))}
            </Swiper>
        </>
    );
}
export default memo(Slider);
