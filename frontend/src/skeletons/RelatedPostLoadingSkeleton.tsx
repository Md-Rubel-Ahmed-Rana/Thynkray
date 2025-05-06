import { Box, Divider, Skeleton } from "@mui/material";

const RelatedPostLoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Box key={index}>
          <Skeleton
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "25px",
              mb: 2,
            }}
            variant="rounded"
          />
          <Skeleton />
          <Skeleton />

          <Skeleton
            sx={{
              mt: 2,
            }}
            variant="rounded"
            height={"20px"}
            width={"120px"}
          />
          {index !== 5 && (
            <Divider
              sx={{
                my: 2,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RelatedPostLoadingSkeleton;
