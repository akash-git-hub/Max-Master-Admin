import { Stack } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Typography } from "./Typography";

const TablePagination = ({
    currentPage,
    totalPages,
    totalRecord,
    onPageChange,
    numberOfRecordsOnCurrentPage,
    limit
}) => {
    const startRecord = (currentPage - 1) * limit + 1;
    const endRecord = startRecord + numberOfRecordsOnCurrentPage - 1;
    return (<>
        <Stack direction="horizontal" className="justify-content-between align-items-start mt-2" gap={2}>
            <Typography variant={'p'} className={'mb-0 fw-bold ms-2'} size={'0.9em'}>showing {startRecord}-{endRecord} of {totalRecord}</Typography>
            <Pagination className="justify-content-end me-4">
                <Pagination.Prev
                    linkClassName={` border-0   ${currentPage === 1 ? "text-muted bg-light" : "text-dark bg-white"}`}
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                />
                <Pagination.Next
                    linkClassName={` border-0  border-start   ${currentPage === 1 ? "text-muted bg-light" : "text-dark bg-white"}`}
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                />
            </Pagination>
        </Stack>
    </>
    );
};

export default TablePagination;