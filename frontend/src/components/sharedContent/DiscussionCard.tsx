import { Discussion } from "@/modules/discussion/types";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  CardActionArea,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";

type Props = {
  discussion: Discussion;
};

const DiscussionCard = ({ discussion }: Props) => {
  return (
    <Grid key={discussion.id} size={{ xs: 2, sm: 4, md: 4 }}>
      <Link
        href={`/discussion/topic/${discussion?.id || "id"}/${
          discussion?.slug || "slug"
        }?title=${discussion?.title}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          elevation={3}
          sx={{
            height: "100%",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 6,
            },
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom noWrap>
                {discussion.title}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="body2" color="text.secondary">
                  👁 {discussion.views.toLocaleString()} views
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  💬 {discussion.totalAnswer} answers
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={1}>
                {discussion.tags?.length > 0 ? (
                  discussion.tags.map((tag: string, idx: number) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Chip label="No Tags" size="small" disabled />
                )}
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                🕒 Created: {moment(discussion.createdAt).fromNow()}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                🔁 Updated: {moment(discussion.updatedAt).fromNow()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default DiscussionCard;
