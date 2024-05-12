import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './SliderHome.module.scss';
import classNames from 'classnames/bind';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './styleSlider.css';
import { Link } from 'react-router-dom';
import images from '../../../assets/img';
import { formatPrice } from '../../../common';
import { url } from '../../../constants';
import { UseContextUser } from '../../../hooks/useContextUser';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function SliderHome({ brand_id = false, catalogue_id = false, children }) {
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const state = useContext(UseContextUser);
    useEffect(() => {
        if (brand_id) {
            axios.get(`${url}/products?brandId=${brand_id}`).then((res) => {
                // Trả về 1 mảng [sản phẩm]
                setBrand(res.data.brands);
            });
        } else if (catalogue_id) {
            axios.get(`${url}/products?categoryId=${catalogue_id}`).then((res) => {
                // Trả về 1 mảng [sản phẩm]
                console.log(res);
                // setCategory(res.data);
            });
        }
    }, [brand_id, catalogue_id]);
    const handleRemoveWishList = (id) => {
        const wishlistObj = state?.wishlist?.value.find((item) => item.id_product === id);
        // console.log(wishlistObj);
        const fetchData = async () => {
            try {
                await axios.delete(`${url}/wishlist/delete/${wishlistObj.id}`);
                state?.render?.setRender((prev) => !prev);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };
    const handleAddWishList = (payload) => {
        const data = {
            id_user: state?.cuser?.value?.id,
            id_product: payload.id,
            nameProduct: payload.name,
            priceProduct: payload.discount_price,
            img: `${payload.img[0]}`,
        };
        const fetchData = async () => {
            try {
                await axios.post(`${url}/wishlist/create`, data);
                // toast.success(`Add product ${payload.name} to wishlist success`, {
                //     position: 'top-right',
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     // theme: 'light',
                //     theme: 'colored',
                // });
                state?.render?.setRender((prev) => !prev);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 6000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />
        );
    }
    return (
        <div className={cx('slider-container')}>
            <Slider {...settings}>{children}</Slider>
        </div>
    );
}

export default SliderHome;
