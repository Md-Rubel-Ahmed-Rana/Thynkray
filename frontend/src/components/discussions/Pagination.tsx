import { Box, MenuItem, Pagination, Select } from "@mui/material";

type Props = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (page: number) => void;
  totalCount: number;
};

const PaginationTopics = ({
  limit,
  page,
  setLimit,
  setPage,
  totalCount,
}: Props) => {
  const pageCount = Math.ceil((totalCount ?? 0) / limit);

  const handleChangePagination = (_: unknown, value: number) => {
    setPage(value);
  };

  const handleChangeLimit = (value: unknown) => {
    setLimit(Number(value));
    setPage(1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        mt: 4,
        gap: 2,
      }}
    >
      <Box display="flex" justifyContent="center">
        {pageCount > 0 && (
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
        )}
      </Box>

      <Select
        onChange={(e) => handleChangeLimit(e.target.value)}
        value={limit}
        displayEmpty
        size="small"
        sx={{ minWidth: { xs: "100%", md: 140 } }}
      >
        {[10, 15, 20, 30, 40, 50].map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default PaginationTopics;
