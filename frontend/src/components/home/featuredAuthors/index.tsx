import Grid from "@mui/material/Grid";
import { authors } from "@/constants/authors";
import { Typography, Box, Container } from "@mui/material";
import AuthorCard from "../../sharedContent/AuthorCard";

const FeaturedAuthors = () => {
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

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {authors.map((author) => (
            <Grid key={author?.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <AuthorCard author={author} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedAuthors;
