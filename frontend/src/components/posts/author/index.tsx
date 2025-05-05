import CommonPosts from "@/components/sharedContent/CommonPosts";
import { cardData } from "@/constants/cardData";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthorPosts = () => {
  const { query } = useRouter();
  const name = query.name as string;
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5" fontWeight={600}>
          Articles by {name}
        </Typography>
        <Link href={"/authors"}>
          <Button type="button" variant="outlined">
            More Authors
          </Button>
        </Link>
      </Box>
      <CommonPosts posts={cardData} />
    </Box>
  );
};

export default AuthorPosts;
