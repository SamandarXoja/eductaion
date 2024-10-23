import ReactPaginate from "react-paginate";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };
  return (
    <div>
      <ReactPaginate
        className="xs:hidden sm:flex md:flex lg:flex xl:flex 2xl:flex"
        breakLabel="..."
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousLabel=""
        nextLabel=""
      />
      <div className="items-center xs:flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <ReactPaginate
          className="flex	gap-1"
          breakLabel="/"
          onPageChange={handlePageClick}
          pageRangeDisplayed={0}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          breakClassName="flex justify-center items-center"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousLabel=""
          nextLabel=""
        />
      </div>
    </div>
  );
}

export default Pagination;
