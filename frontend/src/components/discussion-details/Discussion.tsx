import { Discussion } from "@/modules/discussion/types";
import { Box, Button, Chip, Typography } from "@mui/material";
import moment from "moment";
import Link from "next/link";

type Props = {
  discuss: Discussion;
};

const DiscussionSection = ({ discuss }: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: 2,
          }}
        >
          <Typography variant="h4">{discuss?.title}</Typography>
          <Link href={"/discussion/create"}>
            <Button variant="contained">Ask Question</Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography>
            Asked <b>{moment(discuss.createdAt).fromNow()}</b>
          </Typography>
          <Typography>
            Modified <b>{moment(discuss.updatedAt).fromNow()}</b>
          </Typography>
          <Typography>
            Viewed <b>{discuss.views || 0} times</b>
          </Typography>
        </Box>
        <Box
          component={"div"}
          dangerouslySetInnerHTML={{ __html: discuss?.description || "" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {[...(discuss?.tags || []), "Javascript", "Reactjs"]?.map((tag) => (
            <Chip
              key={tag}
              aria-label={tag}
              label={`#${tag}`}
              variant="filled"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiscussionSection;
