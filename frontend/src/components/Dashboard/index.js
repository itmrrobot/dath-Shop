import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const cx = classNames.bind(styles);

function Dashboard() {
  const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    width: 1000,
    height: 600,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'rotate(-90deg) translate(0px, -20px)',
      },
    },
  };
  const dataset = [
    {
      Sell: 59,
      Buy: 57,
      month: 'Jan',
    },
    {
      Sell: 50,
      Buy: 52,
      month: 'Fev',
    },
    {
      Sell: 47,
      Buy: 53,
      month: 'Mar',
    },
    {
      Sell: 54,
      Buy: 56,
      month: 'Apr',
    },
    {
      Sell: 57,
      Buy: 69,
      month: 'May',
    },
    {
      Sell: 60,
      Buy: 63,
      month: 'June',
    },
    {
      Sell: 59,
      Buy: 60,
      month: 'July',
    },
    {
      Sell: 65,
      Buy: 60,
      month: 'Aug',
    },
    {
      Sell: 51,
      Buy: 51,
      month: 'Sept',
    },
    {
      Sell: 60,
      Buy: 65,
      month: 'Oct',
    },
    {
      Sell: 67,
      Buy: 64,
      month: 'Nov',
    },
    {
      Sell: 61,
      Buy: 70,
      month: 'Dec',
    },
  ];
  
  const valueFormatter = (value) => `${value}mm`;
    return (
        <div className={cx("wrap-manage")}>
            <h1 className={cx("title-manage")}>Dashboard</h1>
            <h3 className={cx("title")}>Account Engagement</h3>
            <div className={cx("graph-wrap")}>
              <BarChart
  dataset={dataset}
  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
  series={[
    { dataKey: 'Sell', label: 'Sell', valueFormatter,color: '#D8BC7E'},
    { dataKey: 'Buy', label: 'Buy', valueFormatter,color: '#AFA095'}
  ]}
  {...chartSetting}
/>
            </div>
        </div>
    )
}

export default Dashboard;