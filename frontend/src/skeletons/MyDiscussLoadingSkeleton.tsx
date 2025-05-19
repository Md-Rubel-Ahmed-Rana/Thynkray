import { Box, Skeleton } from "@mui/material";

const MyDiscussLoadingSkeleton = () => {
  return (
    <Box>
      {Array.from({ length: 30 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "1px solid gray",
            borderRadius: "5px",
            p: 2,
            mb: 2,
          }}
        >
          <Skeleton />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} width={70} />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} width={"10%"} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MyDiscussLoadingSkeleton;
