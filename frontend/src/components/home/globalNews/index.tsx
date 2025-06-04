import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NewsContainer from "./NewsContainer";
import { InternationalPost } from "@/modules/post/types";

type Props = {
  news: InternationalPost[];
};

const GlobalNews = ({ news = [] }: Props) => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{ py: 8 }}
    >
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
        mb={2}
      >
        International Highlights
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{
          mb: 4,
          fontSize: { xs: "0.8rem", md: "1rem" },
        }}
      >
        Explore the latest global stories, ideas, and innovations. Stay
        connected with what&apos;s shaping the world today.
      </Typography>

      <NewsContainer news={news} />
    </Box>
  );
};

export default GlobalNews;
