/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, MenuItem, Pagination, Select } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllDiscussions } from "@/modules/discussion/api";

const PaginationTopics = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data } = useQuery({
    queryKey: [
      "getAllDiscussions",
      { page, limit, sortBy: "desc", searchText: "" },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, any];
      return getAllDiscussions(params);
    },
  });

  const pageCount = Math.ceil((data?.totalCount || 0) / limit);

  const handleChangePagination = (_: any, value: number) => {
    setPage(value);
  };

  const handleChangeLimit = (value: any) => {
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
      }}
    >
      <Box display="flex" justifyContent="center">
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
