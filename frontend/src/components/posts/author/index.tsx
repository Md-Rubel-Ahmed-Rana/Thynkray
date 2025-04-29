import { Box } from "@mui/material";
import { useRouter } from "next/router";

const AuthorPosts = () => {
  const { query } = useRouter();
  const name = query.name as string;
  return <Box>Posts of {name}</Box>;
};

export default AuthorPosts;
