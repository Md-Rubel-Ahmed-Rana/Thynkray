import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FormEvent } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Your message has been sent successfully. Thank you!");
  };
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          We would love to hear from you! Fill out the form below and we&apos;ll
          get back to you shortly.
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            label="Your Name"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Your Email"
            type="email"
            variant="outlined"
            fullWidth
            name="email"
            required
          />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            name="message"
            rows={4}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Send Message
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
