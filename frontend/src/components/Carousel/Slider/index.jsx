import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { url } from '../../../constants';

const cx = classNames.bind(styles);

// import required modules

function Slider({ param, brand_id, images, nameProduct }) {
    // console.log(images);
    // const array = [product];
    // console.log(brand_id);
    const [recommend, setRecommend] = useState([]);
    const [products, setProducts] = useState([]);
    console.log(products);
    console.log(recommend);

    // console.log(recommend);
    const [brand, setBrand] = useState([]);
    // console.log(brand);
    // const handleImage = (respone) => {
    //     console.log(respone);
    //     const cleanedString = respone.slice(1, -1);
    //     // Tách chuỗi thành mảng sử dụng dấu phẩy làm dấu phân cách
    //     const arrayWithoutQuotes = cleanedString.split(',');
    //     // Xóa dấu ngoặc kép và khoảng trắng ở đầu và cuối mỗi phần tử trong mảng
    //     const finalArray = arrayWithoutQuotes.map((item) => item.replace(/"/g, '').trim());
    //     // setImage(finalArray);
    //     return finalArray;
    // };
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const respone = await axios.get(`${url}/products`, {
                    params: {
                        brandId: brand_id,
                    },
                });
                const recommend_res = await axios.post(`${url}/recommend`, {
                    search: nameProduct,
                });
                console.log(recommend_res);
                if (param) {
                    setRecommend(recommend_res.data.recommendations);
                    setProducts(respone.data.products);
                } else {
                    setBrand(respone.data);
                }
                //setImgs(respone.data.hinh_anh)
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, [param, brand_id, nameProduct]);
    const filteredProducts = products?.filter((product) => {
        return recommend?.some((recommendation) => {
            return product.name.toLowerCase().includes(recommendation.toLowerCase());
        });
    });
    console.log(filteredProducts);
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
                    filteredProducts.length > 0 &&
                    filteredProducts?.map((slide, i) => {
                        // console.log(slide[0].name);
                        // console.log(slide);
                        return (
                            <div key={i}>
                                <SwiperSlide>
                                    <Link to={`http://localhost:3000/product/${slide.id}`}>
                                        <div className={cx('item-slider')}>
                                            <img
                                                // src={'https://shoesshop-6n6z.onrender.com/imgs/' + slide?.img}
                                                src={`${slide.img[0]}`}
                                                alt={slide.name}
                                                title={slide.name}
                                                onClick={() =>
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                }
                                            />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            </div>
                        );
                    })}
                {brand_id &&
                    (brand.length > 0 ? (
                        brand?.map((slide, index) => {
                            // console.log(slide[0].name);
                            return (
                                <div key={index}>
                                    <SwiperSlide>
                                        <Link to={`http://localhost:3000/product/${slide.id}`}>
                                            <div className={cx('item-slider')}>
                                                <img
                                                    src={`${slide.img[0]}`}
                                                    // src={'https://shoesshop-6n6z.onrender.com/imgs/' + slide?.img}
                                                    alt={slide.name}
                                                    title={slide.name}
                                                    onClick={() =>
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: 'smooth',
                                                        })
                                                    }
                                                />
                                                <img
                                                    src={`${slide.img[1]}`}
                                                    alt="rear_product_image"
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
