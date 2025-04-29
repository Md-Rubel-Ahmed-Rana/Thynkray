import { Post } from "@/modules/post/types";
import makePostDetailsUrl from "@/utils/makePostDetailsUrl";
import { Box, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const RelatedPosts = ({ posts }: Props) => {
  return (
    <Box component="section" mt={4}>
      <Typography variant="h5" component="h3" mb={2}>
        Related Posts
      </Typography>

      <Stack spacing={3}>
        {posts.map((post) => (
          <Box
            key={post.id}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              component={Link}
              href={makePostDetailsUrl(post)}
              color="primary"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {post.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {post.description.slice(0, 100)}...
            </Typography>

            <Button
              component={Link}
              href={makePostDetailsUrl(post)}
              variant="text"
              size="small"
              sx={{ mt: 1, textTransform: "none" }}
            >
              Read More →
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RelatedPosts;
