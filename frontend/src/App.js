import DefaultLayout from './components/Layout/DefaultLayout';
import AccountLayout from './components/Layout/AccountLayout';
import PannelLayout from './components/Layout/PannelLayout';
import { publicAccountRoutes, publicRoutes, privateRoutes } from './routes/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import AddNewProduct from './pages/AddNewProduct';
// const {    } = antd;
import { FloatButton } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbox from './components/Chatbox';
import { useContext, useState } from 'react';
import { UseContextUser } from './hooks/useContextUser';
import LayoutUserInfor from '../src/components/Layout/LayoutUserInfor';
import LoginGoogle from './pages/LoginGoogle';
import ChangePasswordUser from './pages/ChangePasswordUser';
import HasSidebar from './components/Layout/HasSidebar';
import WishList from './pages/WishList';
function App() {
    const [chat, setChat] = useState(false);
    const state = useContext(UseContextUser);
    console.log(state?.cuser?.value);
    return (
        <>
            {/* Toast Dialog */}
            <ToastContainer />
            {/* Chatbox Floater */}
            <>
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{ right: 24 }}
                    icon={<CustomerServiceOutlined />}
                >
                    <FloatButton
                        icon={<CommentOutlined />}
                        onClick={() => {
                            setChat((prev) => !prev);
                        }}
                        // style={{position: 'relative'}}
                    />
                    {chat === true && <Chatbox></Chatbox>}
                </FloatButton.Group>
            </>
            <Router>
                <div className="App">
                    <Routes>
                        {state?.cuser?.value?.Role?.id === 3 && (
                            <>
                                <Route
                                    path="/user/profile"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'User Profile'}
                                                title={'Personal Information'}
                                                profile={true}
                                            >
                                                <Profile></Profile>
                                            </LayoutUserInfor>
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/user/password"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'Password'}
                                                title={'Password'}
                                                password={true}
                                            >
                                                <ChangePasswordUser></ChangePasswordUser>
                                            </LayoutUserInfor>
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/user/wishlist/:id"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'Wish List'}
                                                title={'Wish List'}
                                                wishlist={true}
                                            >
                                                <WishList></WishList>
                                            </LayoutUserInfor>
                                        </DefaultLayout>
                                    }
                                />
                            </>
                        )}
                        {publicAccountRoutes.map((route, index) => {
                            const Layout = AccountLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {publicRoutes.map((route, index) => {
                            const Layout = DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            const Layout = PannelLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {/* <Route path={"/account/profile"} element={<Profile/>}/> */}
                        <Route path="/admin/products/add" element={<AddNewProduct />} />
                        <Route path="/auth/oauth2/login" element={<LoginGoogle />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
