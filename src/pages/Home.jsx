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
import axios from 'axios';
import { menu } from '../utils/Arrays';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const { searchValue } = React.useContext(SearchContext);
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = id => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    const fetchPizzas = () => {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(`https://e8fbf1aa7519b5a2.mokky.dev/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => {
                setPizzas(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
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
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, sort, searchValue, currentPage]);

    const items = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{isLoading ? skeletons : items}</div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
            <Analytics />
        </>
    );
};

export default Home;
