import Link from "next/link";
import { Box, Container, Typography, Stack, IconButton } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Twitter,
  Email,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        borderTop: "1px solid #e0e0e0",
        mt: 12,
        backgroundColor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography variant="h6" color="text.primary">
            Thynkray
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth={600}>
            A blog crafted with passion and precision by Md Rubel Ahmed Rana.
            Sharing knowledge, thoughts, and ideas on full stack development,
            design, and tech trends.
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton
              component="a"
              href="mailto:mdrubelahmedrana521@gmail.com"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <Email />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/Md-Rubel-Ahmed-Rana"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <GitHub />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/md-rubel-ahmed-rana"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/mdrubel.ahmed.rana.98"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com/MdRubelAhmed521"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <Twitter />
            </IconButton>
          </Stack>

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

          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Thynkray. Built by Md Rubel Ahmed
            Rana. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
