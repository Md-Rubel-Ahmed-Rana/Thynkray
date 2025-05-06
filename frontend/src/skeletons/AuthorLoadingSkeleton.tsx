import { Box, Grid, Skeleton } from "@mui/material";

const AuthorLoadingSkeleton = () => {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
      mt={3}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              border: "1px solid gray",
              p: { xs: 2, md: 3 },
              borderRadius: "10px",
            }}
          >
            <Box textAlign={"center"}>
              <Skeleton width={"100px"} height={"100px"} variant="circular" />
            </Box>
            <Skeleton
              sx={{
                width: { xs: "95%", md: "80%" },
              }}
              variant="rounded"
            />
            <Skeleton
              sx={{
                width: { xs: "80%", md: "70%" },
              }}
              variant="rounded"
            />
            <Box width={"100%"}>
              <Skeleton />
              <Skeleton />
            </Box>
            <Skeleton width={"150px"} />
            <Skeleton
              width={"200px"}
              height={"30px"}
              variant="rounded"
              sx={{
                borderRadius: "25px",
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default AuthorLoadingSkeleton;
