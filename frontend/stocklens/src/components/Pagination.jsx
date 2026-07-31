function Pagination({ page, setPage, totalPages}){
    return (
        <div className="pagination">

          <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
          > {`⇦`}
          </button>

          <span>
              Page {page} of {totalPages}
          </span>

          <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
          > {`⇨`}
          </button>

      </div>
    )
}

export default Pagination