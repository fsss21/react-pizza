import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index';
import React from 'react';

const Home = ({ searchValue }) => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://655a10ee6981238d054d1578.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(arr => {
                setPizzas(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    const items = pizzas.filter(pizza => pizza.title.toLowerCase().includes(searchValue.toLowerCase())).map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={index => setCategoryId(index)} />
                <Sort value={sortType} onChangeSort={index => setSortType(index)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : items}</div>
        </div>
    );
};

export default Home;
