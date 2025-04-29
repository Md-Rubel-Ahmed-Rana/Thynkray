import { categories } from "@/constants/categories";
import { Box, Chip, IconButton, useTheme } from "@mui/material";
import React, { useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";

const Categories = () => {
  const { query, push } = useRouter();
  const activeCategory = (query.category as string) || "All Categories";
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const fadeGradientLeft = `linear-gradient(to right, ${theme.palette.background.default} 60%, transparent)`;
  const fadeGradientRight = `linear-gradient(to left, ${theme.palette.background.default} 60%, transparent)`;

  const handleRedirectToCategory = (newCategory: string) => {
    if (newCategory === "All Categories") {
      push(`/articles`);
    } else {
      push(`/posts/category/${newCategory}`);
    }
  };

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
            onClick={() => handleRedirectToCategory(category)}
            size="medium"
            label={category}
            sx={{
              backgroundColor:
                category === activeCategory
                  ? theme.palette.primary.main
                  : "transparent",
              color:
                category === activeCategory
                  ? "#fff"
                  : theme.palette.text.primary,
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              height: "30px",
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
