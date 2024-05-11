import Cart from '../components/Cart';
import ChangePassword from '../components/ChangePassword';
import Dashboard from '../components/Dashboard';
import ForgotPassword from '../components/ForgotPassword';
import Login from '../components/Login/Login';
import ManageProducts from '../components/ManageProducts';
import ManageUsers from '../components/ManageUsers';
import PartnerManage from '../components/PartnerManage';
import Product from '../components/Product';
import Products from '../components/Products';
import Profile from '../components/Profile';
import PurchaseOrder from '../components/PurchaseOrder';
import Register from '../pages/Signup';
import Home from '../pages/Home';

export const publicAccountRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot', component: ForgotPassword },
    { path: '/change-password', component: ChangePassword },
];

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/product/:id', component: Product },
    { path: '/cart', component: Cart },
    // { path: '/purchase/order', component: PurchaseOrder },
];

export const privateRoutes = [
    { path: '/admin', component: ManageUsers },
    { path: '/admin/products', component: ManageProducts },
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/partner', component: PartnerManage },
];
