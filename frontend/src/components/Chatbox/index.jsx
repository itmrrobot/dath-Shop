import classNames from "classnames/bind";
import styles from "./Chatbox.module.scss"
import images from "../../assets/img";
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { url } from "../../constants";
const cx = classNames.bind(styles)
function Chatbox() {
    const [conservation, setConservation] = useState([])
    const messagesEndRef = useRef(null); // Tham chiếu đến cuối cùng của container chứa tin nhắn

    const scrollToBottom = () => {
        console.log("Hello");
        console.log(messagesEndRef.current);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom(); // Cuộn xuống dưới cuối cùng khi tin nhắn thay đổi
    }, [conservation]);
    const schema = yup
        .object()
        .shape({
            input: yup.string().required(),
        })
        .required();
        const defaultValues = {
            // Định nghĩa các giá trị mặc định của form ở đây
            // Ví dụ:
            input: ''
            // ...
          };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
        });
    
        const handleSuggest = async (input) => {
            const newQuestion = { text: input, sender: 'user' };
            setConservation(prevConservation => [...prevConservation, newQuestion]);
        
            try {
                const response = await axios.post(`${url}/chatbot`, {
                    input: input
                });
                console.log(response);
                let array = []
                if (typeof response?.data?.answer === 'string') {
                    array = [response?.data?.answer]
                } else {
                    array= [...response?.data?.answer]
                }
                let answer = array.map((mes) => {
                    return { text: mes, sender: 'chatbot' }
                });
                setTimeout(() => {
                    setConservation(prevConservation => [...prevConservation, ...answer]);
                    scrollToBottom();
                }, 3000);
        
                // Đặt thời gian trễ trước khi hiển thị câu trả lời từ chatbot
                 // Thời gian trễ 3 giây (3000 milliseconds)
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    const onSubmit = async (data) => {
            const newQuestion = { text: data.input, sender: 'user' };
            setConservation(prevConservation => [...prevConservation, newQuestion]);
            reset(defaultValues)
            try {
                const response = await axios.post(`${url}/chatbot`, {
                    input: data.input
                });
                let array = []
                if (typeof response?.data?.answer === 'string') {
                    array = [response?.data?.answer]
                } else {
                    array= [...response?.data?.answer]
                }
                let answer = array.map((mes) => {
                    return { text: mes, sender: 'chatbot' }
                });
                setTimeout(() => {
                    setConservation(prevConservation => [...prevConservation, ...answer]);
                    scrollToBottom();
                }, 3000);
        
                // Đặt thời gian trễ trước khi hiển thị câu trả lời từ chatbot
                 // Thời gian trễ 3 giây (3000 milliseconds)
            } catch (error) {
                console.error('Error sending message:', error);
            }
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('main__chatcontent')}>
            <div className={cx('content__header')}>
        <div className={cx('blocks')}>
            <div className={cx('current-chatting-user')}>
                <div className={cx('avatar')}>
                    <div className={cx('avatar-img')}>
                        <img src={images.bot} alt="#"/>
                    </div>
                    <span className={cx('isOnline', 'active')}></span>
                </div>
                <div className={cx('header-title')}>
                    <p className={cx('chat-box-name')}>LuxuryCloset’s Bot</p>
                    <p className={cx('status-line')}>Always active</p>
                </div>

            </div>
        </div>
        {/* <div className={cx('blocks')}>
            <div className={cx('settings')}>
                <button className={cx('btn-nobg')}><i className={cx('fa', 'fa-cog')}></i></button>
            </div>
        </div> */}
            </div>
    <div className={cx('content__body')} >
        <div className={cx('chat__items')} ref={messagesEndRef}>
            <div className={cx('chat__item', 'other')} style={{ animationDelay: '0.8s' }}>
                <div className={cx('chat__item__content')}>
                    <div className={cx('chat__msg')}>Hello, I’m LuxuryCloset’s! 👋 I’m your personal sport assistant. How can I help you?</div>
            </div>
            <div className={cx('avatar')}>
                <div className={cx('avatar-img')}>
                    <img src={images.bot} alt="#"/>                
                </div>
                <span className={cx('isOnline', 'active')}></span>
            </div>
            </div>
            <div className={cx('recommend')} onClick={() => handleSuggest('Làm sao để biết kích cỡ của mình?')}>
                <div className={cx('chat__item__content___recommend')}>
                    <div className={cx('chat__msg')}>Làm sao để biết kích cỡ của mình?</div>
                </div>
            </div>
            <div className={cx('recommend')} onClick={() => handleSuggest('Tôi có thể nhận được lời khuyên về cách phối đồ không?')}>
                <div className={cx('chat__item__content___recommend')}>
                    <div className={cx('chat__msg')}>Tôi có thể nhận được lời khuyên về cách phối đồ không?</div>
                </div>
            </div>
            <div className={cx('recommend')} onClick={() => handleSuggest('Bạn có muốn nhận lời khuyên cá nhân hóa về thời trang không?')}>
                <div className={cx('chat__item__content___recommend')}>
                    <div className={cx('chat__msg')}>Bạn có muốn nhận lời khuyên cá nhân hóa về thời trang không?</div>
                </div>
            </div>
            <div className={cx('recommend')} onClick={() => handleSuggest('Xin chao ni')}>
                <div className={cx('chat__item__content___recommend')}>
                    <div className={cx('chat__msg')}>Xin chao ni</div>
                </div>
            </div>
            {conservation.length > 0 && (
                conservation.map((res, index) => {
                    return <div key={index} className={cx('chat__item', res?.sender === 'user' ? 'me' : 'other')} style={{ animationDelay: '0.8s' }}>
                    <div className={cx('chat__item__content')}>
                        <div className={cx('chat__msg')}>{res?.text}</div>
                </div>
                <div className={cx('avatar', res?.sender === 'user' ? 'disabled' : '')}>
                    <div className={cx('avatar-img')}>
                        <img src={images.bot} alt="#"/>                
                    </div>
                    <span className={cx('isOnline', 'active')}></span>
                </div>
                </div>
                    // if(res?.sender === 'user') {
                    //     return (
                    //         <div className={cx('chat__item', 'me')} key={index} style={{animationDelay: "0.8s"}}>
                    //             <div className={cx('chat__item__content')}>
                    //                 <div className={cx('chat__msg')}>{res?.text}</div>
                    //             </div>
                    //         </div>
                    //     )
                    // } else if (res?.sender === 'chatbox') {
                    //     return (
                    //         <div className={cx('chat__item', 'other')} style={{ animationDelay: '0.8s' }}>
                    //             <div className={cx('chat__item__content')}>
                    //                 <div className={cx('chat__msg')}>{res?.text}</div>
                    //             </div>
                    //             <div className={cx('avatar')}>
                    //                 <div className={cx('avatar-img')}>
                    //                     <img src={images.bot} alt="#"/>                
                    //                 </div>
                    //                 <span className={cx('isOnline', 'active')}></span>
                    //             </div>
                    //         </div>
                    //     )
                    // }
                })
            )}
            {/* <div className={cx('chat__item', 'me')} style={{animationDelay: "0.8s"}}>
                <div className={cx('chat__item__content')}>
                    <div className={cx('chat__msg')}>Hi Tim, How are you?</div>
                </div>
            </div>
            <div className={cx('chat__item', 'other')} style={{ animationDelay: '0.8s' }}>
                <div className={cx('chat__item__content')}>
                    <div className={cx('chat__msg')}>I am fine.</div>
            </div>
            <div className={cx('avatar')}>
                <div className={cx('avatar-img')}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&amp;usqp=CAU" alt="#" />
                </div>
                <span className={cx('isOnline', 'active')}></span>
            </div>
            </div> */}
            
            {/* <!-- More chat items... --> */}
        </div>
    </div>
    <div className={cx('content__footer')}>
        <div className={cx('sendNewMessage')}>
            <button className={cx('addFiles')}><i className={cx('fa', 'fa-plus')}></i></button>
            <input type="text" placeholder="Type a message here" {...register('input')}  />
            <button className={cx('btnSendMsg')} id="sendMsgBtn" onClick={(e) => {
                                // if (datePicker === '' || datePicker === undefined) {
                                //     setIsModalOpenFalse(true);
                                // } else {
                                //     handleSubmit(onSubmit)(e);
                                // }
                                handleSubmit(onSubmit)(e);
                            }}><i className="fa fa-paper-plane"></i></button>
        </div>
    </div>
</div>
        </div>
     );
}

export default Chatbox;