import { Box, Grid, Skeleton } from "@mui/material";

const LatestDiscussionLoadingSkeleton = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 4, md: 12 }}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <Grid key={index} size={{ xs: 2, md: 4 }}>
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: "1px solid gray",
              borderRadius: "10px",
              p: 2,
            }}
          >
            <Skeleton width={"100%"} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} width={100} />
              ))}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} width={60} />
              ))}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} width={"50%"} />
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default LatestDiscussionLoadingSkeleton;
