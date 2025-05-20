import { Box, Grid, Typography } from "@mui/material";
import QuoteCard from "./QuoteCard";
import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "@/modules/quote/api";

const DailyQuote = () => {
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
          <QuoteCard key={index} quote={quote} isLoading={isLoading} />
        ))}
      </Grid>
    </Box>
  );
};

export default DailyQuote;
