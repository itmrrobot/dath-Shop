import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { mockTransactions } from '../../data/mockData';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../chartComp/Header';
import LineChart from '../../chartComp/LineChart';
// import StatBox from '../../chartComp/StatBox';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import { useEffect, useMemo, useState } from 'react';
import { url } from '../../constants';
import axios from 'axios';
import { formatPrice } from '../../common';
import CircleChart from '../../chartComp/CircleChart';
import Widget from '../../components/Widget';
const cx = classNames.bind(styles);
const Admin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState([]);
    const [returns, setReturns] = useState([]);
    const [users, setUsers] = useState([]);
    console.log(users);
    const [transaction, setTransaction] = useState([]);
    const [rtTransaction, setRtTransaction] = useState([]);
    const revenueGenerated = (year) => {
        let ordersInSelectedYear = orders?.filter((order) => {
            const orderDate = new Date(order.updatedAt);
            return orderDate.getFullYear() === year;
        });

        // Tính tổng số tiền của các đơn hàng trong năm được chọn
        let totalRevenueInSelectedYear = ordersInSelectedYear.reduce(
            (total, order) => total + order.total,
            0,
        );

        return totalRevenueInSelectedYear;
    };
    const userGenerated = (year) => {
        let usersInSelectedYear = users?.filter((user) => {
            let userDate = new Date(user.createdAt);
            return userDate.getFullYear() === year;
        });

        // Tính tổng số tiền của các đơn hàng trong năm được chọn
        let totalRevenueInSelectedYear = usersInSelectedYear.reduce((total) => total + 1, 0);

        return totalRevenueInSelectedYear;
    };
    const orderGenerated = (year) => {
        let ordersInSelectedYear = orders?.filter((order) => {
            let orderDate = new Date(order.updatedAt);
            return orderDate.getFullYear() === year;
        });

        // Tính tổng số tiền của các đơn hàng trong năm được chọn
        let totalRevenueInSelectedYear = ordersInSelectedYear.reduce((total) => total + 1, 0);

        return totalRevenueInSelectedYear;
    };
    const returnGenerated = (year) => {
        let returnsInSelectedYear = returns?.filter((item) => {
            let returnDate = new Date(item.updatedAt);
            return returnDate.getFullYear() === year;
        });

        // Tính tổng số tiền của các đơn hàng trong năm được chọn
        let totalRevenueInSelectedYear = returnsInSelectedYear.reduce((total) => total + 1, 0);

        return totalRevenueInSelectedYear;
    };
    // console.log(revenueGenerated(2024, 6));
    const tinhPhanTramTangGiam = (soLuongHienTai, soLuongTruoc) => {
        if (soLuongTruoc === 0) {
            if (soLuongHienTai === 0) {
                return 0; // Trả về 0 nếu cả hai số lượng đều là 0
            } else {
                return 100; // Trả về Infinity nếu số lượng trước là 0 và số lượng hiện tại khác 0
            }
        }

        let phanTram = ((soLuongHienTai - soLuongTruoc) / soLuongTruoc) * 100;
        return phanTram;
    };

    const date = (d) => {
        const currentDate = new Date(d);
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
    useEffect(() => {
        const fetchData = async () => {
            var accessToken = JSON.parse(localStorage.getItem('accessToken'));
            try {
                let responseOrders = await axios.get(`${url}/orders`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let responseUsers = await axios.get(`${url}/auth/all-user`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let responseReturns = await axios.get(`${url}/returns`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let orderUser = [...responseOrders.data].filter(
                    (i) => i.status === 3 && i.payed === 1,
                );
                let orderTransaction = [...responseOrders.data].filter((i) => i.status === 1);
                let returnTransaction = [...responseReturns.data].filter((i) => i.status === 1);

                let returnUser = [...responseReturns.data].filter((i) => i.status === 5);

                setReturns(returnUser);
                setOrders(orderUser);
                setUsers(responseUsers.data.filter((acc) => acc.RoleId === 3 || acc.RoleId === 4));
                setTransaction(orderTransaction);
                setRtTransaction(returnTransaction);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const totalRevenue = useMemo(() => {
        let total = orders.reduce((cur, order) => {
            return cur + order.total;
        }, 0);
        return total;
    }, [orders]);
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <div className={cx('overView')}>
                <Widget
                    type="subtotal"
                    isMoney={totalRevenue}
                    diff={tinhPhanTramTangGiam(
                        revenueGenerated(new Date().getFullYear()),
                        revenueGenerated(new Date().getFullYear() - 1),
                    )}
                />
                <Widget
                    type="user"
                    total={users?.length}
                    diff={tinhPhanTramTangGiam(
                        userGenerated(new Date().getFullYear()),
                        userGenerated(new Date().getFullYear() - 1),
                    )}
                />
                <Widget
                    type="returns"
                    total={returns?.length}
                    diff={tinhPhanTramTangGiam(
                        returnGenerated(new Date().getFullYear()),
                        returnGenerated(new Date().getFullYear() - 1),
                    )}
                />
                <Widget
                    type="orders"
                    total={orders?.length}
                    diff={tinhPhanTramTangGiam(
                        orderGenerated(new Date().getFullYear()),
                        orderGenerated(new Date().getFullYear() - 1),
                    )}
                />
            </div>
            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                marginBottom={'90px'}
            >
                {/* ROW 2 */}
                <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]}>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    // overflow="auto"
                    display={'flex'}
                    alignItems={'end'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    
                    <Typography
                        color={'#5f4c49'}
                        variant="h5"
                        fontWeight="600"
                        textAlign={'center'}
                        width={'100%'}
                    >
                        Order status statistics
                        <Header subtitle="Status Here!" />
                    </Typography>
                </Box> */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    // overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                        marginBottom={'30px'}
                    >
                        <Typography color={'#5f4c49'} variant="h5" fontWeight="600">
                            Order status statistics
                        </Typography>
                    </Box>
                    <Box height="300px" m="-20px 0 0 0" width={'auto'}>
                        <CircleChart />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={'#5f4c49'} variant="h5" fontWeight="600">
                            New Orders (Haven't Accept Yet)
                        </Typography>
                    </Box>
                    {transaction.length > 0 ? (
                        transaction.map((tran, i) => {
                            return (
                                <Box
                                    key={`${tran.txId}-${i}`}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderBottom={`4px solid ${colors.primary[500]}`}
                                    p="15px"
                                >
                                    <Box>
                                        <Typography color={'#5f4c49'} variant="h5" fontWeight="600">
                                            #2024{tran.id}
                                        </Typography>
                                        <Typography color={colors.grey[100]}>
                                            {tran.name}
                                        </Typography>
                                    </Box>
                                    <Box fontSize={'1.2rem'} color={colors.grey[100]}>
                                        {date(tran.createdAt)}
                                    </Box>
                                    <Box
                                        backgroundColor={'#D8BC7E'}
                                        p="5px 10px"
                                        borderRadius="4px"
                                        color={'white'}
                                    >
                                        {formatPrice(tran.total)}
                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <div className={cx('notification')}>
                            {/* <h1>Xin chao</h1> */}
                            <p>Không có đơn hàng nào</p>
                        </div>
                    )}
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={'#5f4c49'} variant="h5" fontWeight="600">
                            New Returns (Haven't Accept Yet)
                        </Typography>
                    </Box>
                    {rtTransaction.length > 0 ? (
                        rtTransaction.map((tran, i) => {
                            return (
                                <Box
                                    key={`${tran.txId}-${i}`}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderBottom={`4px solid ${colors.primary[500]}`}
                                    p="15px"
                                >
                                    <Box>
                                        <Typography color={'#5f4c49'} variant="h5" fontWeight="600">
                                            #RT_2024{tran.id}
                                        </Typography>
                                        <Typography color={colors.grey[100]}>
                                            {/* {tran.name} */}
                                            {tran.Orders.map((order) => order.name)}
                                        </Typography>
                                    </Box>
                                    <Box fontSize={'1.2rem'} color={colors.grey[100]}>
                                        {date(tran.createdAt)}
                                    </Box>
                                    <Box
                                        backgroundColor={'#D8BC7E'}
                                        p="5px 10px"
                                        borderRadius="4px"
                                        color={'white'}
                                    >
                                        {tran.Orders.map((order) => formatPrice(order.total))}
                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <div className={cx('notification')}>
                            {/* <h1>Xin chao</h1> */}
                            <p>Không có đơn hàng nào</p>
                        </div>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;
