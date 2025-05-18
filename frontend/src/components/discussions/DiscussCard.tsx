import { Discussion } from "@/modules/discussion/types";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import Link from "next/link";
import moment from "moment";

type Props = {
  discuss: Discussion;
};

const DiscussCard = ({ discuss }: Props) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid gray",
        py: 2,
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
          justifyContent: { xs: "flex-start", md: "flex-end" },
          alignItems: "flex-end",
          gap: { xs: 2, md: 1 },
          width: { xs: "100%", md: "8%" },
        }}
      >
        <Typography>{discuss?.views || 45} views</Typography>
        <Typography>
          {discuss?._count?.answers || discuss?.totalAnswer || 20} answers
        </Typography>
        <Typography sx={{ display: { xs: "block", md: "none" } }}>
          {moment(new Date(discuss.createdAt)).fromNow()}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", md: "90%" },
        }}
      >
        {/* title  */}
        <Link
          href={`/discussion/topic/${discuss?.id || "id"}/${
            discuss?.slug || "slug"
          }?title=${discuss?.title}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            color="blue"
            sx={{
              fontSize: { xs: "20px", md: "24px" },
            }}
            className="hover-underline"
          >
            {discuss?.title}
          </Typography>
        </Link>
        {/* author info card  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
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
          <Typography sx={{ display: { xs: "none", md: "block" } }}>
            {moment(new Date(discuss.createdAt)).fromNow()}
          </Typography>
        </Box>

        {/* tags  */}
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
