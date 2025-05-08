import { Box, Skeleton, Typography } from "@mui/material";

const EditPostLoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography component={"h2"} variant="h6">
        Edit post
      </Typography>
      <Typography>Title:</Typography>
      <Skeleton />
      <Typography>Thumbnail:</Typography>
      <Skeleton width={"200px"} height={"200px"} variant="rounded" />
      <Typography>Tags:</Typography>
      <Skeleton />
      <Typography>Category:</Typography>
      <Skeleton />
      <Typography>Description:</Typography>
      <Skeleton />
      <Typography>Content:</Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        border="1px solid gray"
        borderRadius={"10px"}
        p={2}
      >
        <Typography>Title:</Typography>
        <Skeleton />
        <Typography>Images:</Typography>
        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              width={"200px"}
              height={"200px"}
              variant="rounded"
            />
          ))}
        </Box>
        <Typography>Description:</Typography>
        <Skeleton />
      </Box>
    </Box>
  );
};

export default EditPostLoadingSkeleton;
