import { Box, Skeleton } from "@mui/material";

const PostDetailsLoadingSkeleton = () => {
  return (
    <Box>
      <Skeleton width={"100%"} height={"300px"} variant="rounded" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 2,
        }}
      >
        <Skeleton
          sx={{
            width: { xs: "100%", md: "70%" },
          }}
          variant="rounded"
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            mt: 2,
            width: "100%",
          }}
        >
          <Box>
            <Skeleton width={"50px"} height={"50px"} variant="circular" />
          </Box>
          <Box width={"100%"}>
            <Skeleton
              sx={{
                width: { xs: "100%", md: "50%" },
              }}
            />
            <Skeleton
              sx={{
                width: { xs: "95%", md: "30%" },
              }}
            />
            <Skeleton
              sx={{
                width: { xs: "90%", md: "20%" },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          gap: "10px",
          mt: 4,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width={"100%"} height={"50px"} />
        ))}
      </Box>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  );
};

export default PostDetailsLoadingSkeleton;
