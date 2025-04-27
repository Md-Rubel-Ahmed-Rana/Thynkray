/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Post } from "@/modules/post/types";

const StyledCard = styled(Card)(({ theme }: any) => ({
  height: "240px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "1.5rem 1rem",
  backgroundColor: (theme?.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  borderLeft: "5px solid red",
  borderRadius: "20px 5px 5px 20px",
  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.14)`,
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledContentBody = styled(CardContent)(({ theme }: any) => ({
  height: "100%",
  display: "flex",
  gap: "10px",
  padding: 0,
  backgroundColor: (theme?.vars || theme).palette.background.paper,
}));

const StyledCardContent = styled(CardContent)(({ theme }: any) => ({
  height: "100%",
  backgroundColor: (theme?.vars || theme).palette.background.paper,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0px 10px",
}));

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <StyledCard>
      <StyledContentBody>
        <CardMedia
          component="img"
          alt="green iguana"
          image={post?.thumbnail}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
            width: "15%",
            height: "150px",
            borderRadius: "10px",
          }}
        />
        <StyledCardContent>
          <Typography className="hover-underline" variant="h6" component="h2">
            {post?.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="subtitle2" component="p">
              {post?.author?.name}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {post?.comments?.length || 0} comments
            </Typography>
          </Box>
          <Typography variant="body2" component="p">
            {post?.description}
          </Typography>
        </StyledCardContent>
      </StyledContentBody>
      <Divider sx={{ padding: "0px", margin: "0px" }} />
      <Box
        sx={{
          padding: "0px",
          marginTop: "-10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {post.tags.map((tag, index: number) => (
          <Typography key={index} variant="body2" component="p">
            #{tag}
          </Typography>
        ))}
      </Box>
    </StyledCard>
  );
};

export default PostCard;
