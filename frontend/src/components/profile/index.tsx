import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditProfileInfo from "./EditProfileInfo";
import { useState } from "react";
import EditProfileImage from "./EditProfileImage";
import { useGetLoggedInUser } from "@/modules/user/hooks";

const Profile = () => {
  const { user } = useGetLoggedInUser();
  console.log(user);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditProfileImage, setIsEditProfileImage] = useState(false);
  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Stack spacing={3} alignItems="center" position="relative">
        {/* Profile Image with Edit Icon */}
        <Box position="relative">
          <Avatar
            src={user?.profile_image}
            alt={user?.name}
            sx={{ width: 100, height: 100 }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bgcolor: "background.paper",
              boxShadow: 1,
              ":hover": { bgcolor: "grey.100" },
            }}
            aria-label="Edit profile image"
            onClick={() => setIsEditProfileImage(true)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Name with Edit Icon */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h4">{user.name}</Typography>
          <IconButton
            size="small"
            aria-label="Edit profile info"
            onClick={() => setIsEditProfile(true)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Typography variant="body1" color="text.secondary">
          {user?.designation || "unknown"}
        </Typography>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack spacing={2}>
        <Typography variant="body1">
          <strong title="Email couldn't be changed!">Email:</strong>{" "}
          {user?.email}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user?.role}
        </Typography>
        <Typography variant="body1">
          <strong>Bio:</strong> {user?.bio || "unknown"}
        </Typography>
        <Typography variant="body1">
          <strong>Account created at:</strong>{" "}
          {new Date(user.created_at).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          <strong>last updated at:</strong>{" "}
          {new Date(user.updated_at).toLocaleString()}
        </Typography>
      </Stack>

      {/* // profile info edit modal  */}
      <EditProfileInfo open={isEditProfile} setOpen={setIsEditProfile} />
      <EditProfileImage
        open={isEditProfileImage}
        setOpen={setIsEditProfileImage}
      />
    </Box>
  );
};

export default Profile;
