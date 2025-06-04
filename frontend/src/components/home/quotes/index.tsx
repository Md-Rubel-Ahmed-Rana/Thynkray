import { Box, Grid, Typography } from "@mui/material";
import QuoteCard from "./QuoteCard";
import { Quote } from "@/modules/quote/types";

type Props = {
  quotes: Quote[];
};

const DailyQuote = ({ quotes = [] }: Props) => {
  return (
    <Box sx={{ my: 8, px: { xs: 2, md: 6 } }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" } }}
          variant="h4"
          component="h2"
          fontWeight="bold"
          mb={2}
        >
          Words of Wisdom
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Inspire your day with thoughts from great minds across the world.
        </Typography>
      </Box>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {quotes.map((quote, index) => (
          <QuoteCard key={index} quote={quote} />
        ))}
      </Grid>
    </Box>
  );
};

export default DailyQuote;
