import { Box, Grid, Skeleton } from "@mui/material";

const GlobalNewsLoadingSkeleton = () => {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      columns={{ xs: 2, sm: 8, md: 8 }}
      mt={3}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              border: "1px solid gray",
              p: 1,
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "30%" },
              }}
            >
              <Skeleton
                sx={{
                  borderRadius: "5px",
                }}
                width="100%"
                height={"160px"}
                variant="rectangular"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: { xs: "100%", md: "70%" },
              }}
            >
              <Skeleton width={"80%"} />
              <Skeleton width={"90%"} />
              <Skeleton />
              <Skeleton
                width={"150px"}
                height={30}
                sx={{
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default GlobalNewsLoadingSkeleton;
