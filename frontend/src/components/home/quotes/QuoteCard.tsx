import { Quote } from "@/modules/quote/types";
import { Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  quote: Quote;
};

const QuoteCard = ({ quote }: Props) => {
  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <Paper
        component={motion.div}
        elevation={3}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: 4,
          backgroundColor: "background.paper",
          textAlign: "center",
          borderRadius: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          fontStyle="italic"
          gutterBottom
          sx={{ flexGrow: 1 }}
        >
          {quote.quote ? `"${quote.quote}"` : "Loading..."}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          {quote?.author ? `— ${quote?.author}` : ""}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default QuoteCard;
