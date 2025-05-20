/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPopularPosts } from "@/modules/post/api";
import { Post } from "@/modules/post/types";
import PopularPostLoadingSkeleton from "@/skeletons/PopularPostLoadingSkeleton";
import makePostDetailsUrl from "@/utils/makePostDetailsUrl";
import { Box, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import NoDataFound from "../common/NoDataFound";

const PopularContainer = styled("div")(({ theme }: any) => ({
  padding: "1rem",
  borderRadius: "10px",
  backgroundColor: (theme?.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.14)`,
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

type Props = {
  posts?: Post[];
};

const PopularPosts = ({}: Props) => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPopularPosts,
  });

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

        {isLoading ? (
          <PopularPostLoadingSkeleton />
        ) : (
          <>
            {posts?.length <= 0 ? (
              <NoDataFound message="No popular posts found!">
                <Typography marginBottom={2}>
                  We didn&apos;t find popular posts
                </Typography>
                <Button variant="contained">Explore more</Button>
              </NoDataFound>
            ) : (
              <>
                {posts?.map((post, index) => {
                  const day = new Date(post?.createdAt)
                    .getDate()
                    .toString()
                    .padStart(2, "0");
                  const month = new Date(post?.createdAt).toLocaleString(
                    "default",
                    {
                      month: "short",
                    }
                  );
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
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

                      <Box>
                        <Link href={makePostDetailsUrl(post)}>
                          <Typography
                            style={{ textDecoration: "none" }}
                            variant="subtitle2"
                            className="hover-underline"
                            fontWeight="bold"
                            sx={{
                              lineHeight: 1.2,
                              cursor: "pointer",
                              color: "text.primary",
                            }}
                          >
                            {post?.title}
                          </Typography>
                        </Link>
                        <Typography
                          display={"block"}
                          variant="caption"
                          color="text.secondary"
                        >
                          By {post?.author?.name}
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })}
              </>
            )}
          </>
        )}
      </Stack>
    </PopularContainer>
  );
};

export default PopularPosts;
