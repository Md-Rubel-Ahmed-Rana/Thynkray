import { Box, Skeleton } from "@mui/material";

const CommentLoadingSkeleton = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Box
          width={"100%"}
          key={index}
          display={"flex"}
          gap={"15px"}
          bgcolor={"background.paper"}
          boxShadow={24}
          p={2}
          borderRadius={2}
        >
          <Box>
            <Skeleton width={"60px"} height={"60px"} variant="circular" />
          </Box>
          <Box width={"100%"}>
            <Skeleton
              sx={{
                width: { xs: "95%", sm: "300px" },
              }}
            />
            <Skeleton
              sx={{
                width: "100px",
              }}
            />
            <Skeleton />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CommentLoadingSkeleton;
