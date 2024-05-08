import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '../../assets/img';
import ContentSection from '../../components/ContentSection';
import Slider from '../../components/Carousel/Slider';
// import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import SliderHome from './SliderHome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import ProductSection from './ProductSection';
const cx = classNames.bind(styles);

function Home() {
    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();
    const navigator = useNavigate();
    useEffect(() => {
        let fetchCatalogue = async () => {
            let response = await axios.get(`${url}/category`);
            setCategories(response.data.category);
        };
        let fetchBrand = async () => {
            let response = await axios.get(`${url}/brand`);
            setBrands(response.data.brand);
        };
        try {
            fetchCatalogue();
            fetchBrand();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <img className={cx('thumbnail-1')} src={images.thumbnail1} alt="thumbnail1" />
            <ContentSection name="Catalogues">
                <div className={cx('product-wrapper')}>
                    <SliderHome>
                        {categories &&
                            categories.map((category) => {
                                return (
                                    <div
                                        className={cx('card')}
                                        onClick={() => {
                                            navigator(`/products?categoryId=${category.id}`);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        key={category.id}
                                    >
                                        <img src={JSON.parse(category.img)} alt="" />
                                        <div className={cx('card-body')}>
                                            <p className={cx('card-title')}>Catalogue</p>
                                            <p className={cx('card-sub-title')}>
                                                {category.category_name}
                                            </p>
                                            {/* <p className={cx('card-content')}>Comming Soon!!</p> */}
                                        </div>
                                    </div>
                                );
                            })}
                    </SliderHome>
                </div>
            </ContentSection>

            <img className={cx('thumbnail-1')} src={images.thumbnail2} alt="thumbnail1" />
            <ContentSection name="Brands">
                <div className={cx('product-wrapper')}>
                    <SliderHome>
                        {brands &&
                            brands.map((brand) => {
                                return (
                                    <div
                                        className={cx('card')}
                                        onClick={() => {
                                            navigator(`/products?brandId=${brand.id}`);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        key={brand.id}
                                    >
                                        <img src={JSON.parse(brand.img)} alt="" />
                                        <div className={cx('card-body')}>
                                            <p className={cx('card-title')}>Brand</p>
                                            <p className={cx('card-sub-title')}>
                                                {brand.brand_name}
                                            </p>
                                            {/* <p className={cx('card-content')}>Comming Soon!!</p> */}
                                        </div>
                                    </div>
                                );
                            })}
                    </SliderHome>
                </div>
            </ContentSection>

            <img className={cx('thumbnail-1')} src={images.thumbnail3} alt="thumbnail1" />
            <ContentSection name="PRODUCTS">
                <div className={cx('product-wrapper')}>
                    {brands &&
                        brands.map((brand) => {
                            return (
                                <div className={cx('brand-wrapper')}>
                                    <div className={cx('brand-title')}>
                                        <p>{brand.brand_name}</p>
                                        <Tippy
                                            delay={[0, 50]}
                                            content={`See more product of ${brand.brand_name}`}
                                            placement="bottom"
                                        >
                                            <div className={cx('more-prod')}>
                                                <Link
                                                    to={`/products?page=1&limit=9&brandId=${brand.id}`}
                                                >
                                                    See more!
                                                </Link>
                                            </div>
                                        </Tippy>
                                    </div>
                                    <ProductSection brandId={brand.id} />
                                    {/* <SliderBrand>
                                    
                                </SliderBrand> */}
                                </div>
                            );
                        })}
                </div>
            </ContentSection>
            {/* <ContentSection upper>
                {brands &&
                    brands.map((brand) => {
                        return (
                            <div className={cx('brand-wrapper')}>
                                <div className={cx('brand-title')}>
                                    <div className={cx('product-img')}>
                                        <div className={cx('product-img-wrapper')}>
                                            <img src={brand.img} alt="" />
                                        </div>
                                    </div>
                                    <p>{brand.name}</p>
                                    <Tippy
                                        delay={[0, 50]}
                                        content={`See more product of ${brand.name}`}
                                        placement="bottom"
                                    >
                                        <div className={cx('more-prod')}>
                                            <Link to={`/product?_page=1&_limit=9&brand_id=${brand.name}`}>
                                                See more!
                                            </Link>
                                        </div>
                                    </Tippy>
                                </div>
                                
                                <SliderHome brand_id={brand.name}></SliderHome>
                            </div>
                        );
                    })}

                
            </ContentSection> */}
        </div>
    );
}

export default Home;
