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
        {totalRecord > 0 ?
        <Stack direction="horizontal" className="justify-content-between align-items-start mt-2" gap={2}>
            <Typography variant={'p'} className={'mb-0 fw-bold ms-2'} size={'0.9em'}>showing {startRecord}-{endRecord} of {totalRecord}</Typography>
            <Pagination className="justify-content-end me-4 mb-0">
                <Pagination.Prev
                    linkClassName={` border-0 py-0  bg-light ${currentPage === 1 ? "text-muted" : "text-dark   fw-bold"}`}
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                /> 
                <Pagination.Next
                    linkClassName={` border-0  border-start py-0 bg-light ${currentPage === totalPages ? "text-muted " : "text-primary "}`}
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                /> 
            </Pagination>
        </Stack>
        : <p className="mb-0 mt-4 text-muted">No Records Found</p>}  
    </>
    );
};

export default TablePagination; 