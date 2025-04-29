import { categories } from "@/constants/categories";
import { Box, Chip, IconButton, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Categories = () => {
  const [active, setActive] = useState(categories[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const fadeGradientLeft = `linear-gradient(to right, ${theme.palette.background.default} 60%, transparent)`;
  const fadeGradientRight = `linear-gradient(to left, ${theme.palette.background.default} 60%, transparent)`;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: "56px",
      }}
    >
      <IconButton
        onClick={() => scroll(-200)}
        sx={{
          position: "absolute",
          left: 0,
          zIndex: 2,
          height: "100%",
          background: fadeGradientLeft,
          opacity: 0.6,
          "&:hover": { opacity: 1 },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          gap: 2,
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          px: 6,
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          alignItems: "center",
        }}
      >
        {categories.map((category, index) => (
          <Chip
            key={index}
            onClick={() => setActive(category)}
            size="medium"
            label={category}
            sx={{
              backgroundColor:
                category === active
                  ? theme.palette.primary.main
                  : "transparent",
              color: category === active ? "#fff" : theme.palette.text.primary,
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              height: "40px",
            }}
          />
        ))}
      </Box>

      <IconButton
        onClick={() => scroll(200)}
        sx={{
          position: "absolute",
          right: 0,
          zIndex: 2,
          height: "100%",
          background: fadeGradientRight,
          opacity: 0.6,
          "&:hover": { opacity: 1 },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default Categories;
