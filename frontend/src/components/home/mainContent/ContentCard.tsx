import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Post } from "@/modules/post/types";
import Author from "./Author";
import Link from "next/link";
import makePostDetailsUrl from "@/utils/makePostDetailsUrl";

type CardProps = {
  post: Post;
  index: number;
  shouldShowThumbnail?: boolean;
};

const ContentCard = ({ post, shouldShowThumbnail = true }: CardProps) => {
  return (
    <Card
      key={post?.id}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 0,
        height: "100%",
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor: "transparent",
          cursor: "pointer",
        },
        "&:focus-visible": {
          outline: "3px solid",
          outlineColor: "hsla(210, 98%, 48%, 0.5)",
          outlineOffset: "2px",
        },
      }}
    >
      {shouldShowThumbnail && (
        <CardMedia
          component="img"
          alt={post?.title}
          image={post?.thumbnail || ""}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
      )}

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          flexGrow: 1,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Typography variant="caption" gutterBottom>
          {post?.category}
        </Typography>

        <Link
          href={makePostDetailsUrl(post)}
          style={{ textDecoration: "none" }}
          className="hover-underline"
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: "text.primary",
            }}
          >
            {post?.title}
          </Typography>
        </Link>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post?.description || ""}
        </Typography>
      </CardContent>

      <Author author={post?.author} publishedAt={post?.createdAt} />
    </Card>
  );
};

export default ContentCard;
