import { Answer } from "@/modules/discussion/types";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  answers: Answer[];
};

const AnswerHeader = ({ answers }: Props) => {
  const [sort, setSort] = useState("newest");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography fontSize={{ xs: "auto", md: "24px" }}>
        {answers?.length} Answers{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body2">Sorted by: </Typography>
        <Select
          value={sort}
          displayEmpty
          size="small"
          onChange={(e) => setSort(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default AnswerHeader;
