import styles from "./AddProduct.module.scss";
import classNames from "classnames/bind";
import uploadIcon from "../../assets/img/Upload icon.svg";
import { useState } from "react";
import axios from "axios";
import { url } from "../../constants";
import ModalMessage from "../ModalMessage";

const cx = classNames.bind(styles);

function AddProduct() {
  const [file,setFile] = useState();
  const initialValues = { name: "", quantity: "",price:"",description:"",category:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSuccess,setIsSuccess] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleCreate = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img",file);
    formData.append("ten_san_pham",formValues.name);
    formData.append("so_luong_nhap",formValues.quantity);
    formData.append("gia_khuyen_mai",formValues.price);
    formData.append("mo_ta_ngan",formValues.description);
    formData.append("ten_chuyen_muc",formValues.category);
    try {
      const res = await axios.post(url+"/products/create",formData);
      setIsSuccess(true);
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <div className={cx("wrap-manage", "wrap")}>
      <h2 className={cx("title-manage")}>Add New Product</h2>
      <div className={cx("container")}>
        <div className={cx("upload-wrap")}>
          <span className={cx("text")}>Upload</span>
          <div className={cx("area-upload")}>
            <img src={uploadIcon} alt="" className={cx("upload-icon")} />
            <div className={cx("upload-text")}>
              Drag & drop files or{" "}
              <input type='file' name='file' onChange={handleFileChange}></input>
            </div>
            <div className={cx("desc")}>
              Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </div>
          </div>
        </div>
        <form className={cx("form")} onSubmit={handleCreate}>
          <div className={cx("form-row")}>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Name product</label>
              <input
                type="text"
                className={cx("form-input")}
                placeholder="Name product"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Category</label>
              <input
                type="text"
                className={cx("form-input")}
                placeholder="Category"
                name="category"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("form-row")}>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Quantity</label>
              <input
                type="text"
                className={cx("form-input")}
                placeholder="Quantity"
                name="quantity"
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Price</label>
              <input
                type="text"
                className={cx("form-input")}
                placeholder="Price"
                name="price"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("form-row")}>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Color</label>
              <input
                type="text"
                className={cx("form-input")}
                placeholder="Color"
                name="color"
                
              />
            </div>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Size</label>
              <input
                type="text"
                className={cx("form-input")}
                placeholder="Size"
                name="size"
              />
            </div>
          </div>
          <div className={cx("form-row")}>
            <div className={cx("form-group")}>
              <label className={cx("name")}>Description</label>
              <textarea name="description" className={cx("form-input","h-150","text-area")} placeholder="Description" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className={cx("right")}>
          <button className={cx("btn-common","btn-create")}>Create</button>
          </div>
        </form>
      </div>
      {isSuccess&&<ModalMessage setIsSuccess={setIsSuccess} msg={"Created"}/>}
    </div>
  );
}

export default AddProduct;
