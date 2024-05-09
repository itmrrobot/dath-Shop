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
const cx = classNames.bind(styles);
const Admin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState([]);
    const [returns, setReturns] = useState([]);
    const [users, setUsers] = useState(0);
    const [transaction, setTransaction] = useState([]);
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
                let returnUser = [...responseReturns.data].filter((i) => i.status === 5);
                setReturns(returnUser);
                setOrders(orderUser);
                setUsers(responseUsers.data.filter((acc) => acc.RoleId === 3));
                setTransaction(orderTransaction);
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
                <div className={cx(['item_sumary'])}>
                    <div className={cx('item_header')}>
                        <AccountBalanceOutlinedIcon sx={{ color: 'white', fontSize: '36px' }} />
                        <p>Revenue</p>
                    </div>
                    <div className={cx('sub-title')}>{formatPrice(totalRevenue)}</div>
                </div>

                <div className={cx(['item_sumary'])}>
                    <div className={cx('item_header')}>
                        <PeopleAltOutlinedIcon sx={{ color: 'white', fontSize: '36px' }} />
                        <p>Clients</p>
                    </div>
                    <div className={cx('sub-title')}>{users?.length} Accounts</div>
                </div>

                <div className={cx(['item_sumary'])}>
                    <div className={cx('item_header')}>
                        <AssignmentReturnOutlinedIcon sx={{ color: 'white', fontSize: '36px' }} />
                        <p>Returns</p>
                    </div>
                    <div className={cx('sub-title')}>{returns?.length} Returns Success</div>
                </div>

                <div className={cx(['item_sumary'])}>
                    <div className={cx('item_header')}>
                        <LocalMallOutlinedIcon sx={{ color: 'white', fontSize: '36px' }} />
                        <p>Orders</p>
                    </div>
                    <div className={cx('sub-title')}>{orders?.length} Orders Success</div>
                </div>
            </div>
            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1
                <Box
                    gridColumn="span 3"
                    backgroundColor="#C5A356"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                >
                    <StatBox
                        title={<span style={{ color: 'white' }}>32,441</span>}
                        subtitle={<span style={{ color: 'white' }}>Revenue (~month)</span>}
                        progress="0.75"
                        increase="+14%"
                        icon={<EmailIcon sx={{ color: 'white', fontSize: '26px' }} />}
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#C5A356"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                >
                    <StatBox
                        title={<span style={{ color: 'white' }}>32,441</span>}
                        subtitle={<span style={{ color: 'white' }}>Sales Obtained</span>}
                        progress="0.60"
                        increase="+21%"
                        icon={<PointOfSaleIcon sx={{ color: 'white', fontSize: '26px' }} />}
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#C5A356"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="12px"
                >
                    <StatBox
                        title={<span style={{ color: 'white' }}>32,441</span>}
                        subtitle={<span style={{ color: 'white' }}>New Clients</span>}
                        // progress="0.30"
                        // increase="+5%"
                        icon={<PersonAddIcon sx={{ color: 'white', fontSize: '26px' }} />}
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#C5A356"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    // flexDirection="column"
                    borderRadius="12px"
                    // padding={'20px'}
                >
                    <StatBox
                        title={<span style={{ color: 'white' }}>1,325,134</span>}
                        subtitle={<span style={{ color: 'white' }}>Traffic Received</span>}
                        progress="0.80"
                        increase="+43%"
                        icon={<TrafficIcon sx={{ color: 'white', fontSize: '26px' }} />}
                    />
                </Box> */}

                {/* ROW 2 */}
                <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} />
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
                    {transaction.map((tran, i) => {
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
                                    <Typography color={colors.grey[100]}>{tran.name}</Typography>
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
                    })}
                </Box>

                {/* ROW 3 */}
                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Campaign
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: '15px' }}
                        >
                            $48,352 revenue generated
                        </Typography>
                        <Typography>Includes extra misc expenditures and costs</Typography>
                    </Box>
                </Box>
                <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
                    <Typography variant="h5" fontWeight="600" sx={{ padding: '30px 30px 0 30px' }}>
                        Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box> */}
            </Box>
        </Box>
    );
};

export default Admin;
