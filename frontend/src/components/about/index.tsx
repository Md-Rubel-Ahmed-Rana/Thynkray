import {
  Box,
  Typography,
  Avatar,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import {
  Email,
  GitHub,
  LinkedIn,
  Facebook,
  Twitter,
} from "@mui/icons-material";

const AboutUs = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Stack spacing={3} alignItems="center">
        <Avatar
          alt="Md Rubel Ahmed Rana"
          src="https://ozdfjxhqdgcddulnrscf.supabase.co/storage/v1/object/public/portfolio/personal/Md-Rubel-Ahmed-Rana-1745142808400-Profile_short.jpeg"
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h4" component="h1" align="center">
          Md Rubel Ahmed Rana
        </Typography>
        <Typography variant="subtitle1" align="center">
          Full Stack Developer
        </Typography>
        <Typography variant="body1" align="center">
          I am a passionate Full Stack Developer with over 3 years of experience
          in designing, developing, and maintaining scalable web applications.
          My expertise spans frontend frameworks like Next.js and React, backend
          solutions with NestJS and Express, and efficient data handling with
          MongoDB and PostgreSQL. I thrive on breaking down complex systems into
          modular components, ensuring performance, scalability, and
          maintainability.
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          Skills
        </Typography>
        <Typography variant="body2" align="center">
          Tailwind CSS, Bootstrap, TypeScript, React.js, Redux.js, Next.js, REST
          API, Express.js, Nest.js, Prisma ORM, MongoDB, PostgreSQL, Docker,
          AWS, Redis, RabbitMQ, JWT, Google OAuth, Passport.js, Firebase, MVC
          Pattern, Microservices, System Design.
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          Contact & Socials
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton
            component={Link}
            href="mailto:your-email@example.com"
            target="_blank"
            rel="noopener"
          >
            <Email />
          </IconButton>
          <IconButton
            component={Link}
            href="https://github.com/Md-Rubel-Ahmed-Rana"
            target="_blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.linkedin.com/in/md-rubel-ahmed-rana"
            target="_blank"
            rel="noopener"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.facebook.com/mdrubel.ahmed.rana.98"
            target="_blank"
            rel="noopener"
          >
            <Facebook />
          </IconButton>
          <IconButton
            component={Link}
            href="https://twitter.com/MdRubelAhmed521"
            target="_blank"
            rel="noopener"
          >
            <Twitter />
          </IconButton>
        </Stack>
        <Typography variant="body2" align="center">
          📍 Sylhet, Bangladesh
        </Typography>
      </Stack>
    </Box>
  );
};

export default AboutUs;
