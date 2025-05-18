/* eslint-disable react-hooks/exhaustive-deps */
import { Answer } from "@/modules/discussion/types";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  answers: Answer[];
  setSortedAnswers: (answers: Answer[]) => void;
};

const AnswerHeader = ({ answers, setSortedAnswers }: Props) => {
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    sortAnswers(sort);
  }, [answers, sort]);

  const sortAnswers = (value: string) => {
    const sorted = [...answers].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return value === "newest" ? dateB - dateA : dateA - dateB;
    });
    setSortedAnswers(sorted);
  };

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
