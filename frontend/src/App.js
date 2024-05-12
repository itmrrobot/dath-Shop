import DefaultLayout from './components/Layout/DefaultLayout';
import { publicAccountRoutes, publicRoutes } from './routes/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
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
import WishList from './pages/WishList';
import UserOrder from './pages/UserOrder';
import DetailOrder from './pages/DetailOrder';
import Return from './pages/Return';
import UserReturn from './pages/UserReturn';
import DetailRefund from './pages/DetailRefund';
import Admin from './pages/Admin';
import LayoutAdmin from './components/Layout/LayoutAdmin';
import Team from './pages/ManageAccount';
import ManageProduct from './pages/ManageProduct';
import ManageOrder from './pages/ManageOrder';
import ManageReturn from './pages/ManageReturn';
import AddProducts from './pages/AddProducts';
import LoginSignUp from './components/Layout/LoginSignup/LoginSignup';
import PurchaseOrder from './components/PurchaseOrder';
import PaypalSuccess from './pages/PaypalSuccess';
import PaypalCancel from './pages/PaypalCancel';
import PurchaseOrderCancel from './components/PurchaseOrderCancel';

function App() {
    const [chat, setChat] = useState(false);
    const state = useContext(UseContextUser);
    console.log(state?.cuser?.value);
    return (
        <>
            <ToastContainer />
            {(state?.cuser?.value?.Role?.id === 3 || state?.cuser?.value?.Role?.id === 4) && (
                <>
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
                </>
            )}
            <Router>
                <div className="App">
                    <Routes>
                        {/* {state?.cuser?.value?.Role?.id === 3 && (
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
                                    path="/user/order"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'Order'}
                                                title={'My Orders'}
                                                order={true}
                                            >
                                                <UserOrder></UserOrder>
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
                                <Route
                                    path="/user/order/detail/:id"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'My Orders'}
                                                title={'My Orders'}
                                                order={true}
                                            >
                                                <DetailOrder></DetailOrder>
                                            </LayoutUserInfor>
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/user/order/detail/return/:id"
                                    element={
                                        <DefaultLayout>
                                            <Return></Return>
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/user/return"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'Returns'}
                                                title={'Returns'}
                                                returnn={true}
                                            >
                                                <UserReturn></UserReturn>
                                            </LayoutUserInfor>
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/user/return/detail/:id"
                                    element={
                                        <DefaultLayout>
                                            <LayoutUserInfor
                                                path={'Returns'}
                                                title={'Returns'}
                                                returnn={true}
                                            >
                                                <DetailRefund></DetailRefund>
                                            </LayoutUserInfor>
                                        </DefaultLayout>
                                    }
                                />
                            </>
                        )} */}
                        {(state?.cuser?.value?.Role?.id === 3 ||
                            state?.cuser?.value?.Role?.id === 4) && (
                            <>
                                <>
                                    <Route path="/auth/oauth2/login" element={<LoginGoogle />} />
                                    <Route
                                        path="/vnpay/payment/success"
                                        element={<PurchaseOrder />}
                                    />
                                    <Route
                                        path="/vnpay/payment/cancel"
                                        element={<PurchaseOrderCancel />}
                                    />
                                    <Route
                                        path="/paypal/payment/success"
                                        element={<PaypalSuccess />}
                                    />
                                    <Route path="/cancel" element={<PaypalCancel />} />
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
                                        path="/user/order"
                                        element={
                                            <DefaultLayout>
                                                <LayoutUserInfor
                                                    path={'Order'}
                                                    title={'My Orders'}
                                                    order={true}
                                                >
                                                    <UserOrder></UserOrder>
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
                                    <Route
                                        path="/user/order/detail/:id"
                                        element={
                                            <DefaultLayout>
                                                <LayoutUserInfor
                                                    path={'My Orders'}
                                                    title={'My Orders'}
                                                    order={true}
                                                >
                                                    <DetailOrder></DetailOrder>
                                                </LayoutUserInfor>
                                            </DefaultLayout>
                                        }
                                    />
                                    <Route
                                        path="/user/order/detail/return/:id"
                                        element={
                                            <DefaultLayout>
                                                <Return></Return>
                                            </DefaultLayout>
                                        }
                                    />
                                    <Route
                                        path="/user/return"
                                        element={
                                            <DefaultLayout>
                                                <LayoutUserInfor
                                                    path={'Returns'}
                                                    title={'Returns'}
                                                    returnn={true}
                                                >
                                                    <UserReturn></UserReturn>
                                                </LayoutUserInfor>
                                            </DefaultLayout>
                                        }
                                    />
                                    <Route
                                        path="/user/return/detail/:id"
                                        element={
                                            <DefaultLayout>
                                                <LayoutUserInfor
                                                    path={'Returns'}
                                                    title={'Returns'}
                                                    returnn={true}
                                                >
                                                    <DetailRefund></DetailRefund>
                                                </LayoutUserInfor>
                                            </DefaultLayout>
                                        }
                                    />
                                </>
                            </>
                        )}
                        {state?.cuser?.value?.Role?.id === 1 && (
                            <>
                                <Route
                                    path="/admin"
                                    element={
                                        <LayoutAdmin>
                                            <Admin></Admin>
                                        </LayoutAdmin>
                                    }
                                />
                                <Route
                                    path="/admin/account"
                                    element={
                                        <LayoutAdmin>
                                            <Team></Team>
                                        </LayoutAdmin>
                                    }
                                />
                                <Route
                                    path="/admin/manageProduct"
                                    element={
                                        <LayoutAdmin>
                                            <ManageProduct></ManageProduct>
                                        </LayoutAdmin>
                                    }
                                />
                                <Route
                                    path="/admin/manageOrder"
                                    element={
                                        <LayoutAdmin>
                                            <ManageOrder></ManageOrder>
                                        </LayoutAdmin>
                                    }
                                />
                                <Route
                                    path="/admin/manageReturn"
                                    element={
                                        <LayoutAdmin>
                                            <ManageReturn></ManageReturn>
                                        </LayoutAdmin>
                                    }
                                />
                                <Route
                                    path="/admin/addProduct"
                                    element={
                                        <LayoutAdmin>
                                            <AddProducts></AddProducts>
                                        </LayoutAdmin>
                                    }
                                />
                            </>
                        )}
                        {publicAccountRoutes.map((route, index) => {
                            const Layout = LoginSignUp;
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
                        {/* {privateRoutes.map((route, index) => {
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
                        })} */}
                        {/* <Route path={"/account/profile"} element={<Profile/>}/> */}
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
