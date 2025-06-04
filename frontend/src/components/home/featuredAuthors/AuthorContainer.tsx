import { User } from "@/modules/user/types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  authors: User[];
};

const AuthorContainer = ({ authors }: Props) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meet Our Authors
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Explore the talented writers behind our content. Each author brings
        unique perspectives and expertise to the platform.
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {authors.map((author) => (
          <Grid key={author?.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  alt={author.name}
                  src={author.profile_image}
                  sx={{ width: 80, height: 80, boxShadow: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {author.name}
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                  {author?.designation || "Author"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, mb: 1.5 }}
                >
                  {author.bio}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Articles: <b>{author?.posts || 0}</b>
                </Typography>
              </Box>

              <CardActions sx={{ justifyContent: "center", mt: 3 }}>
                <Link
                  href={`/posts/author/${author?.id}?name=${
                    author?.name
                  }&designation=${author?.designation || "author"}&bio=${
                    author?.bio
                  }`}
                >
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 20,
                      textTransform: "none",
                      px: 3,
                      py: 1,
                      fontWeight: "medium",
                    }}
                  >
                    Explore Articles
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AuthorContainer;
