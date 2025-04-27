/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const data = [
  {
    title: "Computer Filters Noise To Make You A Better Listener",
    createdAt: new Date("2025-08-20"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Ultimate Guide To Planning Your First Overseas Trip",
    createdAt: new Date("2025-08-06"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Exploring New Trends In Home Decor And Interior Design",
    createdAt: new Date("2025-08-05"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Computer Filters Noise To Make You A Better Listener",
    createdAt: new Date("2025-08-20"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Ultimate Guide To Planning Your First Overseas Trip",
    createdAt: new Date("2025-08-06"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Exploring New Trends In Home Decor And Interior Design",
    createdAt: new Date("2025-08-05"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Computer Filters Noise To Make You A Better Listener",
    createdAt: new Date("2025-08-20"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Ultimate Guide To Planning Your First Overseas Trip",
    createdAt: new Date("2025-08-06"),
    author: {
      name: "Jessica Smith",
    },
  },
  {
    title: "Exploring New Trends In Home Decor And Interior Design",
    createdAt: new Date("2025-08-05"),
    author: {
      name: "Jessica Smith",
    },
  },
];

const PopularContainer = styled("div")(({ theme }: any) => ({
  backgroundColor: (theme?.vars || theme).palette.background.paper,
}));

const RightPopularPosts = () => {
  return (
    <PopularContainer>
      <Stack spacing={2}>
        {/* Section title */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#FF5B79",
            }}
          />
          <Typography fontWeight="bold" fontSize="18px">
            Popular Posts
          </Typography>
        </Stack>

        {/* Posts list */}
        {data.map((post, index) => {
          const day = post.createdAt.getDate().toString().padStart(2, "0");
          const month = post.createdAt.toLocaleString("default", {
            month: "short",
          });

          return (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              {/* Date Box */}
              <Box
                sx={{
                  width: 60,
                  height: 50,
                  borderRadius: 2,
                  border: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {day}
                </Typography>
                <Typography variant="caption" fontSize="11px">
                  {month}
                </Typography>
              </Box>

              {/* Post Info */}
              <Box>
                <Typography
                  variant="subtitle2"
                  className="hover-underline"
                  fontWeight="bold"
                  sx={{ lineHeight: 1.2, cursor: "pointer" }}
                >
                  {post.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  By {post.author.name}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </PopularContainer>
  );
};

export default RightPopularPosts;
