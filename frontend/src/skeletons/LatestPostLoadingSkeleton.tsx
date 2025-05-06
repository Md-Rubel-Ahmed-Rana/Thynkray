import { Box, Divider, Grid, Skeleton } from "@mui/material";

const LatestPostLoadingSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 });
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 2, md: 2 }}
      mt={3}
    >
      {skeletonCards.map((_, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Box
            sx={{
              width: "100%",
              border: "1px solid #D0DDD0",
              p: 1,
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "20px",
              }}
            >
              <Skeleton variant="rounded" height={180} width={180} />
              <Box
                sx={{
                  pt: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Skeleton
                  height={28}
                  sx={{
                    width: { xs: "99%", md: "70%" },
                  }}
                />
                <Skeleton
                  sx={{
                    width: { xs: "95%", md: "50%" },
                  }}
                  height={24}
                />
                <Box>
                  <Skeleton
                    sx={{
                      width: { xs: "95%", md: "80%" },
                    }}
                    height={24}
                  />
                  <Skeleton
                    sx={{
                      width: { xs: "90%", md: "60%" },
                    }}
                    height={24}
                  />
                  <Skeleton
                    sx={{
                      width: { xs: "80%", md: "40%" },
                    }}
                    height={24}
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ height: "10px" }} />
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                mt: 2,
              }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={20}
                  width={100}
                  variant="rounded"
                />
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default LatestPostLoadingSkeleton;
