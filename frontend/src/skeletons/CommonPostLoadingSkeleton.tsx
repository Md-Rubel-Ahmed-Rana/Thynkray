import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CommonPostLoadingSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
      mt={3}
    >
      {skeletonCards.map((_, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Box
            sx={{
              width: "100%",
              border: "1px solid rgb(103, 107, 103)",
              p: 1,
              borderRadius: "5px",
            }}
          >
            <Skeleton variant="rounded" height={180} />
            <Box sx={{ pt: 1 }}>
              <Skeleton
                sx={{
                  width: { xs: "70%", md: "80%" },
                }}
                height={28}
              />
              <Skeleton
                sx={{
                  width: { xs: "80%", md: "90%" },
                }}
                height={24}
              />
              <Skeleton height={24} />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: "10px",
                p: 1,
              }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={20}
                  width={"100%"}
                  variant="rounded"
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                mt: 3,
              }}
            >
              <Skeleton width={30} height={30} variant="circular" />
              <Skeleton width={"50%"} />
              <Skeleton width={"30%"} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommonPostLoadingSkeleton;
