/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ImageRounded, Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState, useEffect } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Props = {
  images: File[] | null;
  setImages: (images: File[] | null) => void;
};

const UploadSectionImages = ({ images, setImages }: Props) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    imageUrls.forEach((url) => URL.revokeObjectURL(url));
    if (images) {
      const urls = images.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
    } else {
      setImageUrls([]);
    }
  }, [images]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const updatedFiles = images ? [...images, ...fileArray] : fileArray;

    setImages(updatedFiles);
  };

  const handleRemoveImage = (index: number) => {
    if (!images) return;

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages.length ? updatedImages : null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        mt: 2,
      }}
    >
      <Typography variant="body1">Images</Typography>

      <Button
        component="label"
        variant="contained"
        startIcon={<ImageRounded />}
        sx={{ width: "200px" }}
      >
        Upload Images
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
      </Button>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {imageUrls.map((url, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: 120,
              height: 120,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #ccc",
            }}
          >
            <img
              src={url}
              alt={`preview-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              size="small"
              onClick={() => handleRemoveImage(index)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UploadSectionImages;
