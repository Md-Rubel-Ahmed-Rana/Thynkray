/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Post } from "@/modules/post/types";
import Author from "./Author";

const StyledCard = styled(Card)(({ theme }: any) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme?.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

type CardProps = {
  post: Post;
  index: number;
};

const ContentCard = ({ post }: CardProps) => {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  return (
    <>
      <StyledCard
        variant="outlined"
        onFocus={() => handleFocus(0)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === 0 ? "Mui-focused" : ""}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={post.thumbnail}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {post?.category}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {post?.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {post?.description}
          </StyledTypography>
        </StyledCardContent>
        <Author author={post?.author} publishedAt={post?.createdAt} />
      </StyledCard>
    </>
  );
};

export default ContentCard;
