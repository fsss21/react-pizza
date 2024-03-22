import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const Cart = () => {
    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title"> Корзина</h2>
                    <div className="cart__clear">
                        <span>
                            <DeleteOutlineIcon />
                            Очистить корзину
                        </span>
                    </div>
                </div>
                <div className="content__items">
                    <div className="cart__item">
                        <div className="cart__item-img">
                            <img
                                className="pizza-block__image"
                                src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                                alt="Pizza"
                            />
                        </div>
                        <div className="cart__item-info">
                            <h3>Сырный цыпленок</h3>
                            <p>тонкое тесто, 26 см.</p>
                        </div>
                        <div className="cart__item-count">
                            <div className="button button--outline button--circle cart__item-count-minus">-</div>
                            <b>2</b>
                            <div className="button button--outline button--circle cart__item-count-plus">+</div>
                        </div>
                        <div className="cart__item-price">
                            <b>770 ₽</b>
                        </div>
                        <div className="cart__item-remove">
                            <div className="button button--outline button--circle">X</div>
                        </div>
                    </div>
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            Всего пицц: <b>3 шт.</b>
                        </span>
                        <span>
                            Сумма заказа: <b>900 ₽</b>
                        </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/" className="button button--outline button--add go-back-btn">
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
