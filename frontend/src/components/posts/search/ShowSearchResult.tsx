import { Post } from "@/modules/post/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const ShowSearchResult = ({ posts }: Props) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={3}
    >
      {posts.map((post) => (
        <Tooltip placement="top" title={post.title} key={post.id}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              height="180"
              image={post.thumbnail}
              alt={post.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom noWrap>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {post.description.slice(0, 100)}...
              </Typography>
              <Button
                component={Link}
                href={`/posts/${post.slug}`}
                variant="contained"
                size="small"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ShowSearchResult;
