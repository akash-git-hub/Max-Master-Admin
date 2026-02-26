
import Pagination from "react-bootstrap/Pagination";

const TablePagination = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}) => {
    if (totalPages <= 1) return null;

    const pages = [];

    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    return (
        <div className="d-flex justify-content-end mt-2">
            <Pagination className="mb-0 custom-pagination">
                <Pagination.Prev
                    className="border-0 fw-bold"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                <Pagination.Item
                    active={currentPage === 1}
                    onClick={() => onPageChange(1)}
                >
                    1
                </Pagination.Item>

                {startPage > 2 && <Pagination.Ellipsis disabled />}

                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Pagination.Item
                        key={page}
                        active={currentPage === page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}

                {endPage < totalPages - 1 && <Pagination.Ellipsis disabled />}

                {totalPages > 1 && (
                    <Pagination.Item
                        active={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </Pagination.Item>
                )}

                <Pagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default TablePagination;
