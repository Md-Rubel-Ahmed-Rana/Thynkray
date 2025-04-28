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

const StyledCard = styled(Card)<{ bordercolor: string }>(
  ({ theme, bordercolor }: any) => ({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "1.5rem 1rem",
    backgroundColor: (theme?.vars || theme).palette.background.paper,
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "pointer",
    },
    borderLeft: `5px solid ${bordercolor}`,
    borderRadius: "20px 5px 5px 20px",
    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.14)`,
    "&:focus-visible": {
      outline: "3px solid",
      outlineColor: "hsla(210, 98%, 48%, 0.5)",
      outlineOffset: "2px",
    },
  })
);

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
  gap: "5px",
}));

const borderColors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "pink",
  "brown",
  "cyan",
  "magenta",
  "limegreen",
  "gold",
  "tomato",
  "violet",
  "indigo",
  "deeppink",
];

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const randomColor =
    borderColors[Math.floor(Math.random() * borderColors.length)];

  return (
    <StyledCard bordercolor={randomColor}>
      <StyledContentBody sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <CardMedia
          component="img"
          alt={post?.title}
          image={post?.thumbnail}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
            borderRadius: "10px",
            width: { xs: "100%", md: "200px" },
            height: { xs: "200px", md: "150px" },
          }}
        />
        <StyledCardContent>
          <Typography
            className="hover-underline"
            variant="h6"
            component="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
          >
            {post?.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="subtitle2" component="p">
              By {post?.author?.name}
            </Typography>
            |
            <Typography variant="subtitle2" component="p">
              {post?.comments?.length || 0} comments
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
            variant="body2"
            component="p"
          >
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
