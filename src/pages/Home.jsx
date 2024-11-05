import Categories from '../components/Categories';
import qs from 'qs';
import { Analytics } from '@vercel/analytics/react';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index';
import React from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const menu = [
    { name: 'Популярности(ASC)', sortProperty: '-rating' },
    { name: 'Популярности(DESC)', sortProperty: 'rating' },
    { name: 'Цене(ASC)', sortProperty: '-price' },
    { name: 'Цене(DESC)', sortProperty: 'price' },
    { name: 'Алфавиту(ASC)', sortProperty: '-title' },
    { name: 'Алфавиту(DESC)', sortProperty: 'title' },
];

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const { items, status } = useSelector(state => state.pizza);
    const { searchValue } = React.useContext(SearchContext);

    const onChangeCategory = id => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({ sortProperty: sort.sortProperty, categoryId, currentPage });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, sort, searchValue, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = menu.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(setFilters({ ...params, sort }));
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        getPizzas();
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {status === 'error' ? (
                    <div className="content__error-info">
                        <h2>Произошла ошибка 😕</h2>
                        <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                    </div>
                ) : (
                    <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
                )}
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
            <Analytics />
        </>
    );
};

export default Home;
