import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ImageRounded } from "@mui/icons-material";
import {
  useGetLoggedInUser,
  useUpdateProfileImage,
} from "@/modules/user/hooks";
import { toast } from "react-toastify";

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
  open: boolean;
  setOpen: (value: boolean) => void;
};

const EditProfileImage = ({ open, setOpen }: Props) => {
  const { user } = useGetLoggedInUser();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { updateProfileImage, isLoading } = useUpdateProfileImage();

  const handleUpdateProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile_image", image as File);
    await updateProfileImage({ id: user.id, formData });

    toast.success("Profile picture updated successfully!");

    setOpen(false);
    setImage(null);
    setImageUrl("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0] as File;
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  const handleCloseModal = () => {
    setImage(null);
    setImageUrl("");
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="Edit Profile"
      aria-describedby="edit your profile information"
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      sx={{ padding: "0px" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 400 },
          bgcolor: "background.paper",
          border: "1px solid gray",
          boxShadow: 24,
          p: { xs: 1, md: 2 },
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography id="spring-modal-title" variant="h6" component="h2">
          Update Profile image
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<ImageRounded />}
            sx={{
              padding: image && imageUrl ? "" : "2.5rem",
              textAlign: "centers",
            }}
          >
            {image && imageUrl ? "Re-Upload" : "Upload"} image
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
              width={200}
              height={150}
              src={imageUrl}
              alt="profile image"
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            onClick={handleCloseModal}
            type="button"
            variant="outlined"
            size="small"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            disabled={!image || isLoading}
            sx={{
              cursor: image ? "pointer" : "not-allowed",
            }}
            size="small"
            type="button"
            variant="contained"
            onClick={handleUpdateProfileImage}
          >
            {isLoading ? "Saving..." : " Save changes"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileImage;
