// components/PostContent.tsx
import { ContentItem } from "@/modules/post/types";
import { Box, Typography } from "@mui/material";

type PostContentProps = {
  content: ContentItem[];
};

const PostContent = ({ content }: PostContentProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      {content.map((item) => (
        <Box key={item.id} sx={{ mb: 6 }}>
          {/* Section Title */}
          <Typography variant="h5" gutterBottom>
            {item?.title}
          </Typography>

          {/* Images */}
          {item?.images?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                my: 2,
              }}
            >
              {item?.images?.map((src, index) => (
                <Box
                  key={index}
                  component="img"
                  src={src || ""}
                  alt={`Image ${index + 1}`}
                  sx={{
                    width: { xs: "100%", sm: "48%", md: "32%" },
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              ))}
            </Box>
          )}

          {/* Rich HTML Description */}
          <Box
            sx={{
              "& p": { mb: 2, lineHeight: 1.6 },
              "& h1, & h2, & h3": { mt: 3, mb: 1 },
            }}
            dangerouslySetInnerHTML={{ __html: item?.description }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostContent;
