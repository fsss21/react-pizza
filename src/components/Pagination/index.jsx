import ReactPaginate from 'react-paginate';
import './PaginationModule.scss';

const Pagination = ({ currentPage, onChangePage }) => {
    return (
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
