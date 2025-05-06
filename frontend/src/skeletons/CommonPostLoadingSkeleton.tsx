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
              <Skeleton height={28} />
              <Skeleton width="60%" height={24} />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={40}
                  width={40}
                  variant="circular"
                />
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommonPostLoadingSkeleton;
