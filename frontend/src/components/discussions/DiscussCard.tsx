import { Discussion } from "@/modules/discussion/types";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  discuss: Discussion;
};

const DiscussCard = ({ discuss }: Props) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid gray",
        pb: 1,
        pt: 2,
        display: "flex",
        gap: 4,
        alignItems: "center",
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: { xs: 2, md: 1 },
        }}
      >
        <Typography>{discuss?.views || 45} views</Typography>
        <Typography>
          {discuss?._count?.answers || discuss?.totalAnswer || 20} answers
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Link
          href={`/discussion/topic/${discuss?.id}/${
            discuss?.slug || discuss?.title
          }?title=${discuss?.title}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            color="blue"
            sx={{
              fontSize: { xs: "16px", md: "24px" },
            }}
            className="hover-underline"
          >
            {discuss?.title}
          </Typography>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            src={discuss?.user?.profile_image}
            alt={discuss?.user?.name}
          />
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {discuss?.user?.name}
            </Typography>
            <Typography variant="body2">
              {discuss?.user?.designation}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {discuss?.tags
            ? discuss?.tags.map((tag) => <Chip label={tag} key={tag} />)
            : ["Javascript", "ReactJS", "Nextjs", "Material UI"].map((tag) => (
                <Chip label={tag} key={tag} size="small" />
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiscussCard;
