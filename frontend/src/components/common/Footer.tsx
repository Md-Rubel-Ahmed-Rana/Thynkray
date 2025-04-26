import Link from "next/link";
import { Box, Container, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        borderTop: "1px solid #e0e0e0",
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; {new Date().getFullYear()} Thynkray. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/privacy-policy" passHref>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ cursor: "pointer" }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/terms" passHref>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ cursor: "pointer" }}
              >
                Terms
              </Typography>
            </Link>
            <Link href="/contact" passHref>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ cursor: "pointer" }}
              >
                Contact
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
