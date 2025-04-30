import { cardData } from "@/constants/cardData";
import { Box } from "@mui/material";
import UserPostCard from "./UserPostCard";

const UserPosts = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
      gap={3}
      mt={5}
    >
      {cardData.map((post) => (
        <UserPostCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default UserPosts;
