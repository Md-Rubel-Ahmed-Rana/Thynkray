/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDiscussionStore } from "@/modules/discussion/provider";
import { Box, MenuItem, Pagination, Select } from "@mui/material";
import { useState } from "react";

type Props = {
  total: number;
  page?: number;
  limit: number;
};

const PaginationTopics = ({ total, limit, page }: Props) => {
  const pageCount = Math.ceil(total / limit);
  const [limitCount, setLimitCount] = useState(limit || 10);

  const { getAllDiscussion } = useDiscussionStore((state) => state);

  const handleChangePagination = async (_: any, value: number) => {
    await getAllDiscussion(value);
  };

  const handleChangeLimit = async (value: any) => {
    setLimitCount(Number(value));
    await getAllDiscussion(page, Number(value));
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
        value={limitCount}
        displayEmpty
        size="small"
        sx={{ minWidth: { xs: "100%", md: 140 } }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </Box>
  );
};

export default PaginationTopics;
