import { Post } from "@/modules/post/types";
import { Avatar, Box, Chip, Typography } from "@mui/material";

type PostHeaderProps = {
  post: Post;
};

const PostHeader = ({ post }: PostHeaderProps) => {
  const authorName = post?.author?.name || "Anonymous";

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        component="img"
        src={post?.thumbnail}
        alt={post?.title}
        sx={{
          width: "100%",
          height: { xs: 200, md: 400 },
          objectFit: "cover",
          borderRadius: 2,
          mb: 2,
        }}
      />

      {/* Title */}
      <Typography variant="h3" gutterBottom>
        {post?.title}
      </Typography>

      {/* Author and Date */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar alt={authorName} src={post?.author?.profile_image || ""} />
        <Box>
          <Typography variant="subtitle2">{authorName}</Typography>
          <Typography variant="subtitle2">
            {post?.author?.designation || "Author"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post?.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Category and Tags */}
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip label={post?.category} color="primary" />
        {post?.tags?.map((tag) => (
          <Chip key={tag} label={tag} variant="outlined" />
        ))}
      </Box>
    </Box>
  );
};

export default PostHeader;
