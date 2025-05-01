import { ImageRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

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
  image: File | null;
  setImage: (image: File | null) => void;
};

const UploadThumbnail = ({ image, setImage }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0] as File;
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography>Thumbnail</Typography>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<ImageRounded />}
        sx={{
          width: image && imageUrl ? "225px" : { xs: "100%", md: "200px" },
          height: image && imageUrl ? "30px" : "100px",
        }}
      >
        {image && imageUrl ? "Re-Upload " : "Upload "}
        thumbnail
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple={false}
          accept="image/*"
        />
      </Button>
      {image && imageUrl && (
        <Image
          style={{ border: "1px solid blue", borderRadius: "10px" }}
          width={225}
          height={150}
          src={imageUrl}
          alt="profile image"
        />
      )}
    </Box>
  );
};

export default UploadThumbnail;
