import { Box, Skeleton } from "@mui/material";

const PopularPostLoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </Box>
  );
};

export default PopularPostLoadingSkeleton;
