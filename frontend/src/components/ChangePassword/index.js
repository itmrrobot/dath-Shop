import styles from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
import { url } from "../../constants";
import { validate } from "../../utils";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ChangePassword() {
  const initialValue = {password:''};
    const [rePassword,setRePassword] = useState('');
    const [formValues,setFormValues] = useState(initialValue);
    const navigate = useNavigate();
    const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
    }
    const handleCancel = () => {
      navigate('/account/profile');
    }
  const handleUpdate = async() => {
    try {
      if(formValues.password===rePassword&&formValues.password&&rePassword) {
        // await axios.put(url+`/auth/user/update/${user.id}`,formValues)
        // setUser(null);
        localStorage.setItem('user',null);
        // setIsLogin(false);
        navigate('/login');
      }
    } catch(e) {
      console.log(e);
    }
  }
    return(
        <div className={cx("wrap-login")}>
      <div className={cx("wrapper")}>
        <h4 className={cx("logo")}>Luxury</h4>
        <h1 className={cx("title")}>Change Password</h1>
        <form className={cx("form")}>
          <div className={cx("form-group")}>
          <label className={cx("name")}>New Password</label>
            <input
              type="password"
              className={cx("form-input")}
              placeholder="*****************"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("name")}>Confirm Password</label>
            <input
              type="password"
              className={cx("form-input")}
              placeholder="*****************"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <button className={cx("btn-common")} onClick={handleUpdate}>Next</button>
          <button className={cx("btn-common","btn-cancel")} onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
    )
}

export default ChangePassword;