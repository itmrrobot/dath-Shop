import DefaultLayout from "./components/Layout/DefaultLayout";
import AccountLayout from "./components/Layout/AccountLayout";
import PannelLayout from "./components/Layout/PannelLayout";
import {publicAccountRoutes, publicRoutes,privateRoutes} from "./routes/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import AddNewProduct from "./pages/AddNewProduct";
// const {    } = antd;
import { FloatButton } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer />
      <>
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{ right: 24 }}
          icon={<CustomerServiceOutlined />}
        >
          <FloatButton />
          <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
      </>
    <Router>
      <div className="App">
        <Routes>
          {publicAccountRoutes.map((route,index) => {
            const Layout = AccountLayout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout>
              <Page/>
            </Layout>}/>
          })}
          {publicRoutes.map((route,index) => {
            const Layout = DefaultLayout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout>
              <Page/>
            </Layout>}/>
          })}
          {privateRoutes.map((route,index) => {
            const Layout = PannelLayout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout>
              <Page/>
            </Layout>}/>
          })}
          <Route path={"/account/profile"} element={<Profile/>}/>
          <Route path="/admin/products/add" element={<AddNewProduct/>}/>
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
