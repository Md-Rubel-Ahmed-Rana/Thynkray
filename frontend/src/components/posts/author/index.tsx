import CommonPosts from "@/components/sharedContent/CommonPosts";
import PopularPosts from "@/components/sharedContent/PopularPosts";
import RelatedPosts from "@/components/sharedContent/RelatedPosts";
import { cardData } from "@/constants/cardData";
import { Box, Button, Divider, Typography } from "@mui/material";
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
      <Divider sx={{ margin: "20px 0px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
        my={4}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <RelatedPosts posts={cardData} />
        </Box>
        <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
          <PopularPosts posts={cardData} />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthorPosts;
