import React from 'react';
import { categories } from '../utils/Arrays';

const Categories = ({ value, onChangeCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
