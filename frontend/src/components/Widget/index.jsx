import classNames from 'classnames/bind';
import styles from './Widget.module.scss';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { formatPrice } from '../../common';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Widget({ type, isMoney = false, total = false, diff }) {
    let data;
    switch (type) {
        case 'subtotal':
            data = {
                title: 'REVENUES',
                link: '',
                icon: (
                    <MonetizationOnOutlinedIcon
                        className={cx('icon')}
                        style={{
                            color: 'green',
                            backgroundColor: 'rgba(0,128,0,0.2)',
                        }}
                    />
                ),
            };
            break;
        case 'user':
            data = {
                title: 'CLIENTS',
                link: 'See all accounts!',
                url: `/admin/account`,
                icon: (
                    <PersonOutlineOutlinedIcon
                        className={cx('icon')}
                        style={{
                            color: 'crimson',
                            backgroundColor: 'rgba(255,0,0,0.2)',
                        }}
                    />
                ),
            };
            break;
        case 'returns':
            data = {
                title: 'RETURNS',
                link: 'See all returns!',
                url: `/admin/manageReturn`,
                icon: (
                    <KeyboardReturnOutlinedIcon
                        className={cx('icon')}
                        style={{
                            color: 'purple',
                            backgroundColor: 'rgba(128,0,128,0.2)',
                        }}
                    />
                ),
            };
            break;
        case 'orders':
            data = {
                title: 'ORDERS',
                link: 'See all orders!',
                url: `/admin/manageOrder`,

                icon: (
                    <ShoppingCartOutlinedIcon
                        className={cx('icon')}
                        style={{
                            color: 'goldenrod',
                            backgroundColor: 'rgba(218,165,32,0.2)',
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }
    return (
        <div className={cx('widget')}>
            <div className={cx('left')}>
                <span className={cx('title')}>{data.title}</span>
                <span className={cx('counter')}>
                    {isMoney ? formatPrice(isMoney) : total}
                    {/* {data.isMoney && '$'} {amount} */}
                </span>
                {data.url ? (
                    <Link to={data.url}>
                        <span className={cx('link')}>{data.link}</span>
                    </Link>
                ) : (
                    <span className={cx('link')}>{data.link}</span>
                )}
            </div>
            <div className={cx('right')}>
                <div className={cx('percentage', diff > 0 ? 'positive' : 'negative')}>
                    {diff > 0 ? (
                        <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                    ) : (
                        <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                    )}
                    {Number.isInteger(diff) ? diff : diff?.toFixed(2)}%
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
