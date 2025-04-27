import { Box, Chip } from "@mui/material";
import React, { useState } from "react";

const categories = [
  "All categories",
  "Company",
  "Product",
  "Design",
  "Engineering",
];

const Categories = () => {
  const [active, setActive] = useState(categories[0]);

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        gap: 3,
        overflow: "auto",
      }}
    >
      {categories.map((category, index: number) => (
        <Chip
          key={index}
          onClick={() => setActive(category)}
          size="medium"
          label={category}
          sx={{
            backgroundColor: category === active ? "blue" : "transparent",
            border: "none",
            color: category === active ? "white" : "",
          }}
        />
      ))}
    </Box>
  );
};

export default Categories;
