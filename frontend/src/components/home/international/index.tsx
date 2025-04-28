import { internationalNews } from "@/constants/international";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const InternationalNewsSection = () => {
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

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
        gap={2}
      >
        {internationalNews.map((news) => (
          <Card
            key={news.url}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              height: "100%",
              boxShadow: 3,
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "background.paper",
            }}
          >
            <CardMedia
              component="img"
              image={news.urlToImage}
              alt={news.title}
              sx={{
                width: { xs: "100%", sm: "40%" },
                height: { xs: 200, sm: "100%" },
                objectFit: "cover",
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://drive.google.com/file/d/1ASIHNPBRDyNL0bkUXpsxp1_NPE1W2omA/view?usp=sharing";
              }}
            />
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="hover-underline"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  {news.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {news.description}
                </Typography>
              </Box>

              <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    <strong>Source:</strong> {news.source.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" ml={1}>
                    <strong>Author:</strong> {news.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" ml={1}>
                    {dayjs(news.publishedAt).format("MMM DD, YYYY")}
                  </Typography>
                </Box>

                <Button
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="outlined"
                >
                  Read More
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default InternationalNewsSection;
