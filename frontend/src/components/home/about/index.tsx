import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const MiniAbout = () => {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: "1.3rem", md: "2.5rem" },
          }}
        >
          Welcome to Thynkray
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          Thynkray is a home for curious minds. We share deep thoughts,
          practical wisdom, and creative ideas every day.
        </Typography>

        <Button
          component={Link}
          href="/about"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Learn More
        </Button>
      </Container>
    </Box>
  );
};

export default MiniAbout;
