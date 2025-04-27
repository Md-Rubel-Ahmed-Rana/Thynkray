/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Post } from "@/modules/post/types";
import Author from "./Author";
import Link from "next/link";

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
  shouldShowThumbnail?: boolean;
};

const ContentCard = ({
  post,
  shouldShowThumbnail = true,
  index,
}: CardProps) => {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const handleFocus = (idx: number) => {
    setFocusedCardIndex(idx);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  return (
    <>
      <StyledCard
        variant="outlined"
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        tabIndex={0}
        className={`${focusedCardIndex === 0 ? "Mui-focused" : ""}`}
      >
        {shouldShowThumbnail && (
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
        )}

        <StyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {post?.category}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <Link
              style={{ textDecoration: "none" }}
              href={`/post/${post.slug}`}
              className="hover-underline"
            >
              {post?.title}
            </Link>
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
