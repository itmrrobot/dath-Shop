import styles from "./AddNewProduct.module.scss";
import classNames from "classnames/bind";
import HeaderPannel from "../../components/HeaderPannel";
import AddProduct from "../../components/AddProduct";

const cx = classNames.bind(styles);

function AddNewProduct() {
    return (
        <div className={cx("wrap")}>
            <HeaderPannel/>
            <AddProduct/>
        </div>
    )
}

export default AddNewProduct;