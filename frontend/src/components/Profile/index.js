import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import api from '../../api';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { url } from '../../constants';
import HeaderBackground from "../../assets/img/Rectangle 27.svg";
import ContainerProfile from "../../assets/img/Rectangle 26.svg";
import Avatar from "../../assets/img/avatar.svg";
import { Link, useNavigate } from "react-router-dom";
import { CountryDropdown,RegionDropdown } from 'react-country-region-selector';
import { AuthState } from "../../store/AuthProvider";

const cx = classNames.bind(styles);

const Profile = () => {
  const [region, setRegion] = useState('');
  const {user} = AuthState();
  const navigate = useNavigate();
  const cookies = new Cookies();
  console.log(user);
  

  return (
    <div className={cx("wrap")}>
      <div className={cx("header")}>
        <img src={HeaderBackground} alt="" className={cx("header-img")}/>
      </div>
      <div className={cx("container")}>
        <div className={cx("profile")}>
          <img src={user?.avatar} alt="avatar" className={cx("avatar")}/>
          <span className={cx("name")}>{user.fullname}</span>
          <div className={cx("wrapper")}>
            <div className={cx("item")}>
              <span className={cx("number")}>122</span>
              <span className={cx("text")}>Order</span>
            </div>
            <div className={cx("item")}>
              <span className={cx("number")}>67</span>
              <span className={cx("text")}>Orders completed</span>
            </div>
            <div className={cx("item")}>
              <span className={cx("number")}>37K$</span>
              <span className={cx("text")}>Amount spent</span>
            </div>
          </div>
          <div className={cx("wrap-btn")}>
          <button onClick={() => navigate('/change-password')} className={cx("btn-common","btn-change-pasword")}>Change password</button>
          </div>
        </div>
        <form className={cx("form")}>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Name</label>
            <input type="text" className={cx("form-input")} placeholder="Nguyen Ngoc Khanh"/>
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Email</label>
            <input type="text" className={cx("form-input")} placeholder="Nguyen@gmail.com"/>
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Phone number</label>
            <input type="text" className={cx("form-input")} placeholder="0856086269"/>
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Location</label>
            <input type="text" className={cx("form-input")} placeholder="Ho Quy Ly Hoa Minh Lien Chieu"/>
          </div>
          <div className={cx("form-group","w-50")}>
            <label className={cx("form-label")}>Date or birth</label>
            <input type="date" id="birthday" name="birthday" className={cx("form-input","form-input-date")}/>
          </div>
          <div className={cx("form-group","w-50")}>

          <RegionDropdown
          classes={cx("form-input")}
          value={region}
          blankOptionLabel="Viet Nam"
          customOptions={["Viet Nam"]}
          onChange={(val) => setRegion(val)} />
          </div>
          <div className={cx("group-btn")}>
            <button className={cx("btn-common","btn-cancel")} onClick={() => navigate('/')}>Cancel</button>
            <button className={cx("btn-common")}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;