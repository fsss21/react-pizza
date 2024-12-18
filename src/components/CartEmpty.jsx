import { Link } from 'react-router-dom';
import CartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
    return (
        <>
            <div class="content">
                <div class="container container--cart">
                    <div class="cart cart--empty">
                        <h2>
                            Корзина пустая <icon>😕</icon>
                        </h2>
                        <p>
                            Вероятней всего, вы не заказывали ещё пиццу.
                            <br />
                            Для того, чтобы заказать пиццу, перейди на главную страницу.
                        </p>
                        <img src={CartEmptyImg} alt="Empty cart" />
                        <Link to="/home" class="button button--black">
                            <span>Вернуться назад</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartEmpty;
