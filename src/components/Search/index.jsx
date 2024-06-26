import React from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
import './SearchModule.scss';

const Search = () => {
    const [value, setValue] = React.useState('');
    const { setSearchValue } = React.useContext(SearchContext);
    const inpurRef = React.useRef();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inpurRef.current.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce(str => {
            setSearchValue(str);
        }, 250),
        []
    );

    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className="box-search">
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.8053 15.8013L21 21M10.5 7.5V13.5M7.5 10.5H13.5M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#000000"
                    strokeWidth="2"
                />
            </svg>
            <input ref={inpurRef} value={value} onChange={onChangeInput} className="search" type="text" placeholder="Поиск пиццы..." />
            {value && (
                <svg onClick={() => onClickClear()} className="icon-delete" viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs></defs>
                    <g fill-rule="evenodd">
                        <g transform="translate(-516.000000, -1144.000000)" fill="#000000">
                            <path d="M538.708,1151.28 C538.314,1150.89 537.676,1150.89 537.281,1151.28 L534.981,1153.58 L532.742,1151.34 C532.352,1150.95 531.718,1150.95 531.327,1151.34 C530.936,1151.73 530.936,1152.37 531.327,1152.76 L533.566,1154.99 L531.298,1157.26 C530.904,1157.65 530.904,1158.29 531.298,1158.69 C531.692,1159.08 532.331,1159.08 532.725,1158.69 L534.993,1156.42 L537.232,1158.66 C537.623,1159.05 538.257,1159.05 538.647,1158.66 C539.039,1158.27 539.039,1157.63 538.647,1157.24 L536.408,1155.01 L538.708,1152.71 C539.103,1152.31 539.103,1151.68 538.708,1151.28 L538.708,1151.28 Z M545.998,1162 C545.998,1163.1 545.102,1164 543.996,1164 L526.467,1164 L518.316,1154.98 L526.438,1146 L543.996,1146 C545.102,1146 545.998,1146.9 545.998,1148 L545.998,1162 L545.998,1162 Z M543.996,1144 L526.051,1144 C525.771,1143.98 525.485,1144.07 525.271,1144.28 L516.285,1154.22 C516.074,1154.43 515.983,1154.71 515.998,1154.98 C515.983,1155.26 516.074,1155.54 516.285,1155.75 L525.271,1165.69 C525.467,1165.88 525.723,1165.98 525.979,1165.98 L525.979,1166 L543.996,1166 C546.207,1166 548,1164.21 548,1162 L548,1148 C548,1145.79 546.207,1144 543.996,1144 L543.996,1144 Z"></path>
                        </g>
                    </g>
                </svg>
            )}
        </div>
    );
};

export default Search;
