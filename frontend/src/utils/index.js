export const validate = (values) => {
    const msg = {};
    const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.fullname) {
        msg.fullname = 'Họ tên là bắt buộc';
    }
    if (!values.email) {
        msg.email = 'Email là bắt buộc';
    } else if (!regex.test(values.email)) {
        msg.email = 'Email ko hợp lệ';
    }
    if (!values.password) {
        msg.password = 'Mật khẩu là bắt buộc';
    }
    if (!values.name) {
        msg.name = 'Tên là bắt buộc';
    }
    if (!values.phone) {
        msg.phone = 'Số điện thoại là bắt buộc';
    }
    if (!values.rePassword) {
        msg.rePassword = 'Nhập lại mật khẩu là bắt buộc';
    }
    return msg;
};

export const expectedDate = (day) => {
    // const splitD = d.split('/');
    // const D = 1706322872160;
    const currentDate = new Date(day);
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    const monthAbbreviation = monthNames[month];

    let year = currentDate.getFullYear();
    return `${date} ${monthAbbreviation}, ${year}`;
};
