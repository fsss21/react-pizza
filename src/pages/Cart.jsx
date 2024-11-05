import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { clearItems } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';

const Cart = () => {
    const dispatch = useDispatch();
    const { totalPrice, items } = useSelector(state => state.cart);

    const totalCount = items.reduce((sum, item) => sum + item.count, 0);

    const onClickClearCart = () => {
        if (window.confirm('Очистить корзину?')) {
            dispatch(clearItems());
        }
    };

    if (!totalPrice) {
        return <CartEmpty />;
    }

    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title"> Корзина</h2>
                    <div className="cart__clear">
                        <span onClick={onClickClearCart}>
                            <DeleteOutlineIcon />
                            Очистить корзину
                        </span>
                    </div>
                </div>
                <div className="content__items">
                    {items.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            Всего пицц: <b>{totalCount} шт.</b>
                        </span>
                        <span>
                            Сумма заказа: <b>{totalPrice} ₽</b>
                        </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/home" className="button button--outline button--add go-back-btn">
                            <span>Вернуться назад</span>
                        </Link>
                        <div className="button pay-btn">
                            <span>Оплатить сейчас</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
