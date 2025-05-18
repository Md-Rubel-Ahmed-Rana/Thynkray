/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Pagination } from "@mui/material";

type Props = {
  total: number;
  page: number;
  limit: number;
};

const PaginationTopics = ({ total, limit, page }: Props) => {
  const pageCount = Math.ceil(total / limit);

  const handleChangePagination = (_: any, value: number) => {
    console.log(value);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChangePagination}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        size="medium"
      />
    </Box>
  );
};

export default PaginationTopics;
