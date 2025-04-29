import { Post } from "@/modules/post/types";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import React from "react";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const CommonPosts = ({ posts }: Props) => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid
        container
        spacing={4}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
        gap={2}
      >
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              height="180"
              image={post.thumbnail}
              alt={post.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={1} mb={1}>
                <Chip label={post.category} color="primary" size="small" />
              </Stack>

              <Link href={`/posts/${post.slug}`} passHref>
                <Typography
                  variant="h6"
                  component="a"
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {post.title}
                </Typography>
              </Link>

              <Typography variant="body2" color="text.secondary" mt={1}>
                {post.description.slice(0, 100)}...
              </Typography>

              <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                {post.author?.name && (
                  <>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {post.author.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="caption">
                      {post.author.name}
                    </Typography>
                  </>
                )}
                <Typography variant="caption" color="text.secondary">
                  · {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default CommonPosts;
