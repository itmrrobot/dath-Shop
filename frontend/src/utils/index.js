export const validate = (values) => {
    const msg = {};
    const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.fullname) {
        msg.fullname = 'Họ tên là bắt buộc';
    } 
    if(!values.email) {
        msg.email = 'Email là bắt buộc';
    } else if(!regex.test(values.email)) {
        msg.email = 'Email ko hợp lệ';
    }
    if(!values.password) {
        msg.password = 'Mật khẩu là bắt buộc';
    } 
    if(!values.name) {
        msg.name = 'Tên là bắt buộc';
    } 
    if(!values.phone) {
        msg.phone = 'Số điện thoại là bắt buộc';
    } 
    if(!values.rePassword) {
        msg.rePassword = 'Nhập lại mật khẩu là bắt buộc';
    } 
    return msg;
}