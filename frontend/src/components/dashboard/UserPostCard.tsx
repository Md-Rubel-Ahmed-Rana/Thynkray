import { Post } from "@/modules/post/types";
import makePostDetailsUrl from "@/utils/makePostDetailsUrl";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import UserPostsActions from "./UserPostsActions";

type Props = {
  post: Post;
};

const UserPostCard = ({ post }: Props) => {
  return (
    <Card
      key={post.id}
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <CardMedia
        component="img"
        height="180"
        image={post.thumbnail}
        alt={post.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label={post.category} color="primary" size="small" />
          <Typography variant="caption" color="text.secondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Stack>

        <Link
          style={{
            textDecoration: "none",
            color: "black",
          }}
          href={makePostDetailsUrl(post)}
          passHref
        >
          <Typography variant="h6" component="h2">
            {post.title}
          </Typography>
        </Link>

        <Typography variant="body2" color="text.secondary" mt={1}>
          {post.description.slice(0, 100)}...
        </Typography>

        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" />
          ))}
        </Stack>

        <UserPostsActions />
      </CardContent>
    </Card>
  );
};

export default UserPostCard;
