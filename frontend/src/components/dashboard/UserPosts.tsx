import { Box } from "@mui/material";
import UserPostCard from "./UserPostCard";
import { Post } from "@/modules/post/types";

type Props = {
  posts: Post[];
};

const UserPosts = ({ posts }: Props) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
      gap={3}
      mt={5}
    >
      {posts.map((post) => (
        <UserPostCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default UserPosts;
