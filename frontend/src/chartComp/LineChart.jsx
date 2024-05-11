import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockLineData as dataInitial } from '../data/mockData';
import { useEffect, useMemo, useState } from 'react';
import { url } from '../constants';
import axios from 'axios';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { formatPrice } from '../common';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState([]);
    const [dataa, setDataa] = useState([]);
    console.log(dataa);
    const [year, setYear] = useState('2024');
    const yearArr = [
        {
            id: '2020',
            color: tokens('dark').blueAccent[300],
        },
        {
            id: '2021',
            color: tokens('dark').greenAccent[200],
        },
        {
            id: '2022',
            color: tokens('dark').redAccent[200],
        },
        {
            id: '2023',
            color: tokens('dark').primary[400],
        },
        {
            id: '2024',
            color: tokens('dark').greenAccent[500],
        },
    ];
    useEffect(() => {
        const fetchData = async () => {
            var accessToken = JSON.parse(localStorage.getItem('accessToken'));
            try {
                let responseOrders = await axios.get(`${url}/orders`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let orderUser = [...responseOrders.data].filter((i) => i.status === 3);
                let orderYear = [...responseOrders.data]
                    .filter((i) => i.status === 3)
                    ?.filter((order) => {
                        return new Date(order.updatedAt).getFullYear() == new Date().getFullYear();
                    });
                let monthNames = [
                    '',
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
                let dataLineChart = {
                    id: JSON.stringify(new Date().getFullYear()),
                    color: tokens('dark').greenAccent[500],
                    data: [],
                };

                for (let i = 1; i <= 12; i++) {
                    let ordersByMonth = orderYear?.filter((order) => {
                        // console.log(order);
                        return new Date(order.updatedAt).getMonth() + 1 === i;
                    });
                    // console.log();
                    let totalQuantity = ordersByMonth.reduce((total) => total + 1, 0);
                    dataLineChart.data.push({ x: monthNames[i], y: totalQuantity });
                }
                setOrders(orderUser);
                setDataa((prev) => [...prev, dataLineChart]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const yearData = useMemo(() => {
        let dataForYear = (year, color) => {
            console.log(year);
            let orderYear = orders.filter(
                (order) => new Date(order.updatedAt).getFullYear() === year,
            );
            let monthNames = [
                '',
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
            let dataLineChart = {
                id: JSON.stringify(year),
                color,
                data: [],
            };

            for (let i = 1; i <= 12; i++) {
                let ordersByMonth = orderYear.filter((order) => {
                    // console.log(order);
                    return new Date(order.updatedAt).getMonth() + 1 === i;
                });
                // console.log();
                let totalQuantity = ordersByMonth.reduce((total) => total + 1, 0);
                dataLineChart.data.push({ x: monthNames[i], y: totalQuantity });
            }
            // console.log(dataLineChart);
            return dataLineChart;
        };
        return dataForYear;
    }, [orders]);
    const handleLegendClick = (legend) => {
        let index = dataa.findIndex((element) => {
            return element.id === legend.id;
        });
        if (index !== -1) {
            setDataa((prev) => {
                const newDataa = [...prev]; // Tạo một bản sao của mảng ban đầu
                newDataa.splice(index, 1); // Xoá phần tử tại vị trí index
                return newDataa; // Trả về mảng mới đã được cập nhật
            });
        }
    };
    const handleAddYear = (year) => {
        let yearChoose = yearArr.find((y) => y.id === year);
        let checkYear = dataa.some((data) => {
            return data.id === yearChoose.id;
        });
        if (checkYear === false) {
            setDataa((prev) => [...prev, yearData(+yearChoose.id, yearChoose.color)]);
        }
    };
    // const revenueGenerated = useMemo(() => {
    //     let sum = dataa.reduce((acc, data) => {
    //         let orderYear = orders.filter(
    //             (order) => new Date(order.updatedAt).getFullYear() == data.id,
    //         );
    //         let sumOfOrderMonth = 0;
    //         for (let i = 1; i <= 12; i++) {
    //             let ordersByMonth = orderYear.filter((order) => {
    //                 // console.log(order);
    //                 return new Date(order.updatedAt).getMonth() + 1 === i;
    //             });
    //             // console.log(ordersByMonth);
    //             let totalQuantity = ordersByMonth.reduce((total, order) => {
    //                 // console.log(order);
    //                 return total + order.total;
    //             }, 0);
    //             sumOfOrderMonth = sumOfOrderMonth + totalQuantity;
    //         }
    //         return acc + sumOfOrderMonth;
    //     }, 0);
    // }, [dataa]);
    const revenueGenerated = useMemo(() => {
        // Khởi tạo một đối tượng để theo dõi tổng số tiền cho từng năm
        let yearlyRevenue = {};

        // Lặp qua mảng `dataa` để tính tổng số tiền của từng năm
        dataa.forEach((data) => {
            let orderYear = orders.filter(
                (order) => new Date(order.updatedAt).getFullYear() == data.id,
            );

            let sumOfOrderYear = 0;

            // Tính tổng số tiền của từng tháng trong năm
            for (let i = 1; i <= 12; i++) {
                let ordersByMonth = orderYear.filter(
                    (order) => new Date(order.updatedAt).getMonth() + 1 === i,
                );
                let totalQuantity = ordersByMonth.reduce((total, order) => total + order.total, 0);
                sumOfOrderYear += totalQuantity;
            }

            // Lưu tổng số tiền của năm vào đối tượng yearlyRevenue
            yearlyRevenue[data.id] = sumOfOrderYear;
        });

        // Chuyển đổi đối tượng yearlyRevenue thành một mảng các đối tượng với cấu trúc { id: year, total: revenue }
        let revenueArray = Object.keys(yearlyRevenue).map((year) => ({
            id: parseInt(year),
            total: yearlyRevenue[year],
        }));

        return revenueArray;
    }, [dataa, orders]);
    console.log(revenueGenerated);
    return (
        <>
            <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Typography variant="h5" fontWeight="600" color={'#5f4c49'}>
                        Revenue Generated
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" color={'#C5A356'}>
                        {formatPrice(revenueGenerated.reduce((acc, value) => acc + value.total, 0))}
                    </Typography>
                    {revenueGenerated.length > 0 &&
                        revenueGenerated.map((yearly) => {
                            return (
                                <Typography variant="h5" color={'#5f4c49'}>
                                    + {formatPrice(yearly.total)} ({yearly.id})
                                </Typography>
                            );
                        })}
                </Box>
                <Box>
                    <select
                        onChange={(e) => {
                            // setCity(e.target.value);
                            setYear(e.target.value);
                            handleAddYear(e.target.value);
                        }}
                        // {...register('select')}
                    >
                        {yearArr?.map((yearr, index) => {
                            return (
                                <option key={index} selected={yearr.id === year} value={yearr.id}>
                                    {yearr.id}
                                </option>
                            );
                        })}
                    </select>
                </Box>
            </Box>

            <ResponsiveLine
                data={dataa}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    tooltip: {
                        container: {
                            color: colors.primary[500],
                        },
                    },
                }}
                colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }} // added
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    // stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : 'transportation', // added
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    tickValues: 5, // added
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : 'count', // added
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                // enableGridX={false}
                // enableGridY={false}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        onClick: handleLegendClick,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </>
    );
};

export default LineChart;
