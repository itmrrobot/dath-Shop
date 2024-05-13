import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../theme';
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import axios from 'axios';
import { url } from '../constants';
const { RangePicker } = DatePicker;
function CircleChart() {
    let dataConstructor = [
        {
            id: 'Confirmation',
            status: 1,
            value: 0,
            color: 'hsl(54, 70%, 50%)',
        },
        {
            id: 'Delivering',
            value: 0,
            status: 2,
            color: 'hsl(337, 70%, 50%)',
        },
        {
            id: 'Completed',
            value: 0,
            status: 3,
            color: 'hsl(300, 70%, 50%)',
        },
        {
            id: 'Cancel',
            value: 0,
            status: 4,
            color: 'hsl(236, 70%, 50%)',
        },
    ];
    const [selectedMonthRange, setSelectedMonthRange] = useState(null);
    console.log(selectedMonthRange);
    const [orders, setOrders] = useState([]);
    const [returns, setReturns] = useState([]);
    const [data, setData] = useState([]);

    const handleMonthRangeChange = (dates) => {
        handleSelectedDate(dates);
        setSelectedMonthRange(dates);
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
                let responseReturns = await axios.get(`${url}/returns`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let returnsStatus = {
                    id: 'Returns',
                    value: [...responseReturns.data].filter((i) => i.status === 5).length,
                    status: 5,
                    color: 'hsl(236, 70%, 50%)',
                };
                const statuses = responseOrders.data.map((order) => order.status);

                // Cập nhật giá trị value trong mảng data dựa trên số lần xuất hiện của từng status
                const updatedData = dataConstructor.map((item) => ({
                    ...item,
                    value: statuses.filter((status) => status === item.status).length,
                }));
                console.log([...updatedData, returnsStatus]);
                setData([...updatedData, returnsStatus]);
                setOrders(responseOrders.data);
                setReturns(responseReturns.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const handleSelectedDate = (data) => {
        if (data !== null) {
            const startDate = new Date(data[0].$y, data[0].$M, 1); // Tháng trong JavaScript bắt đầu từ 0
            const endDate = new Date(data[1].$y, data[1].$M + 1, 0); // Lấy ngày cuối cùng của tháng
            console.log(startDate, endDate);
            const ordersInSelectedRange = orders.filter((order) => {
                const orderDate = new Date(order.updatedAt); // Giả sử order.date là ngày của order
                const orderYear = orderDate.getFullYear();
                return (
                    orderDate >= startDate &&
                    orderDate <= endDate &&
                    orderYear >= data[0].$y &&
                    orderYear <= data[1].$y
                );
            });
            const returnsInSelectedRange = returns.filter((rt) => {
                const returnDate = new Date(rt.updatedAt); // Giả sử order.date là ngày của order
                const returnYear = returnDate.getFullYear();
                return (
                    returnDate >= startDate &&
                    returnDate <= endDate &&
                    returnYear >= data[0].$y &&
                    returnYear <= data[1].$y
                );
            });
            let returnsStatus = {
                id: 'Returns',
                value: [...returnsInSelectedRange].filter((i) => i.status === 5).length,
                status: 5,
                color: 'hsl(236, 70%, 50%)',
            };
            const statuses = ordersInSelectedRange.map((order) => order.status);

            // Cập nhật giá trị value trong mảng data dựa trên số lần xuất hiện của từng status
            const updatedData = dataConstructor.map((item) => ({
                ...item,
                value: statuses.filter((status) => status === item.status).length,
            }));
            setData([...updatedData, returnsStatus]);
        } else {
            let returnsStatus = {
                id: 'Returns',
                value: returns.filter((i) => i.status === 5).length,
                status: 5,
                color: 'hsl(236, 70%, 50%)',
            };
            const statuses = orders.map((order) => order.status);

            // Cập nhật giá trị value trong mảng data dựa trên số lần xuất hiện của từng status
            const updatedData = dataConstructor.map((item) => ({
                ...item,
                value: statuses.filter((status) => status === item.status).length,
            }));
            // console.log([...updatedData, returnsStatus]);
            setData([...updatedData, returnsStatus]);
        }
    };

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <RangePicker
                    picker="month"
                    value={selectedMonthRange}
                    onChange={handleMonthRangeChange}
                />
            </div>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                // enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]],
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'c',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'go',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'python',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'scala',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'lisp',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'elixir',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'javascript',
                        },
                        id: 'lines',
                    },
                ]}
                legends={[]}
            />
        </>
    );
}

export default CircleChart;
