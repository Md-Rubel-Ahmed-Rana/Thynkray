import { Box, Skeleton } from "@mui/material";

const DiscussionsLoadingSkeleton = () => {
  return (
    <Box>
      {Array.from({ length: 10 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            mt: 2,
            borderRadius: "10px",
            p: 3,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "10%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Skeleton width={"70%"} />
            <Skeleton width={"100%"} />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "80%" },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* title  */}
            <Skeleton />
            {/* author card  */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Skeleton variant="circular" width={60} height={60} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    width: "80%",
                  }}
                >
                  <Skeleton
                    sx={{
                      width: { xs: "100%", md: 300 },
                    }}
                  />
                  <Skeleton
                    sx={{
                      width: { xs: "100%", md: 300 },
                    }}
                  />
                </Box>
              </Box>
              <Skeleton width={"10%"} height={"30px"} />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton variant="rounded" width={70} key={index} />
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DiscussionsLoadingSkeleton;
