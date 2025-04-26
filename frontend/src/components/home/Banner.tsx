/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Box, Typography, Avatar, Stack, Chip } from "@mui/material";
import { demoPostsData } from "@/constants/posts";

const Banner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "80vh", md: "80vh" },
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="coverflow"
        pagination={{ clickable: true }}
        speed={1000}
        style={{ height: "100%", width: "100%" }}
      >
        {demoPostsData.map((post) => (
          <SwiperSlide key={post?.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${post.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.4)",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                  color: "white",
                  px: 2,
                  maxWidth: "800px",
                }}
              >
                {/* Tags */}
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mb={1}
                >
                  {post.tag.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={`#${tag}`}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    />
                  ))}
                </Stack>

                {/* Title */}
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "20px", md: "40px" } }}
                  mb={2}
                >
                  {post.title}
                </Typography>

                {/* Author Info */}
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  mb={4}
                >
                  <Avatar
                    src={post.author.profile_image}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body2">{post.author.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    • August 22, 2024
                  </Typography>
                </Stack>

                {/* Mini Thumbnails */}
                <Stack direction="row" spacing={3} justifyContent="center">
                  {post.content[0]?.images?.slice(0, 3).map((img, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid white",
                        backgroundColor: "white",
                      }}
                    >
                      <img
                        src={img}
                        alt="mini-thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
