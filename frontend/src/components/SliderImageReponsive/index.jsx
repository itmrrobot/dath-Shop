import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';
import styles from './SliderImageReponsive.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function SliderImageReponsive({ images = [], video = [] }) {
    let imgs = JSON.parse(images);
    let videoFile = JSON.parse(video);
    console.log(videoFile);
    return (
        <>
            <div className={cx('wrapper')}>
                <LightGallery
                    plugins={[lgZoom]}
                    speed={500}
                    elementClassNames={'gallery'}
                    className={cx('wrapper-img')}
                >
                    {imgs !== undefined &&
                        imgs.length > 0 &&
                        imgs.map((img, index) => {
                            console.log(img[index]);
                            return (
                                // <a href={img}>

                                // </a>
                                <img className={cx('img-responsive')} src={`${img}`} />
                            );
                        })}
                </LightGallery>
            </div>
            {videoFile !== undefined && videoFile.length > 0 && (
                <div>
                    <video controls style={{ width: '100%' }}>
                        <source src={videoFile[0]} type={videoFile[0].type} />
                    </video>
                </div>
            )}
        </>
    );
}

export default SliderImageReponsive;
