import { useGetInternationalPosts } from "@/modules/post/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import React from "react";
import CommonPostLoadingSkeleton from "../../loadingSkeletons/CommonPostLoadingSkeleton";

const InternationalPosts = () => {
  const { news, isLoading } = useGetInternationalPosts();
  return (
    <>
      {isLoading ? (
        <CommonPostLoadingSkeleton />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
          gap={2}
        >
          {news.map((post) => (
            <Card
              key={post.url}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                height: "100%",
                boxShadow: 3,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "background.paper",
              }}
            >
              <CardMedia
                component="img"
                image={post.urlToImage || ""}
                alt={post.title}
                sx={{
                  width: { xs: "100%", sm: "40%" },
                  height: { xs: 200, sm: "100%" },
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    component={"a"}
                    href={post.url}
                    variant="h6"
                    fontWeight="bold"
                    className="hover-underline"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        md: "1rem",
                      },
                      textDecoration: "none",
                      color: "text.primary",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {post.description}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      <strong>Source:</strong> {post.source.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" ml={1}>
                      <strong>Author:</strong> {post.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" ml={1}>
                      {dayjs(post.publishedAt).format("MMM DD, YYYY")}
                    </Typography>
                  </Box>

                  <Button
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    variant="outlined"
                  >
                    Read More
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default InternationalPosts;
