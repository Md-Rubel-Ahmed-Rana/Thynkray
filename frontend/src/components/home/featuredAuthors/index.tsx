import { Typography, Box, Container } from "@mui/material";
import AuthorContainer from "./AuthorContainer";
import { User } from "@/modules/user/types";

type Props = {
  authors: User[];
};

const FeaturedAuthors = ({ authors = [] }: Props) => {
  return (
    <Box sx={{ py: 8, backgroundColor: "background.default" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.3rem",
                sm: "2.2rem",
                md: "2.5rem",
              },
            }}
          >
            Featured Authors
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth="sm"
            mx="auto"
            sx={{
              fontSize: {
                xs: "0.8rem",
              },
            }}
          >
            Meet the brilliant minds sharing ideas, stories, and insights on
            Thynkray.
          </Typography>
        </Box>

        <AuthorContainer authors={authors} />
      </Container>
    </Box>
  );
};

export default FeaturedAuthors;
