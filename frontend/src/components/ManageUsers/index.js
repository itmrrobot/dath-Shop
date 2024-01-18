import styles from "./ManageUsers.module.scss";
import classNames from "classnames/bind";
import dropDownIcon from "../../assets/img/Vector 9 (1).png";
import arrowDownIcon from "../../assets/img/arrow-down.svg";

const cx = classNames.bind(styles);

function ManageUsers() {
    return (
        <div className={cx("wrap-manage","g-38")}>
            <h2 className={cx("title-manage")}>Admin</h2>
            <div className={cx("wrapper")}>
                <div className={cx("filter")}>
                    <span className={cx("text")}>Sort by: </span>
                    <span className={cx("name")}>Newest</span>
                    <img src={dropDownIcon} alt="icon" className={cx("icon")}/>
                </div>
                <div className={cx("filter")}>
                    <span className={cx("text")}>Filter: </span>
                    <span className={cx("name")}>Select Filter</span>
                    <img src={dropDownIcon} alt="icon" className={cx("icon")}/>
                </div>
            </div>
            <table className={cx("table-users")}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mai Tiến Ngọc</td>
                        <td>tienngocqt@gmail.com</td>
                        <td>+84905989041</td>
                        <td>Việt Nam</td>
                        <td><img src={arrowDownIcon} alt="icon"/></td>
                    </tr>
                    <tr>
                        <td>Mai Tiến Ngọc</td>
                        <td>tienngocqt@gmail.com</td>
                        <td>+84905989041</td>
                        <td>Việt Nam</td>
                        <td><img src={arrowDownIcon} alt="icon"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ManageUsers;