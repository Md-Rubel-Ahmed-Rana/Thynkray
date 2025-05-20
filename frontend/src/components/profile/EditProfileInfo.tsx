/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { updateUser } from "@/modules/user/api";
import { User } from "@/modules/user/types";
import compareFieldsChanges from "@/utils/compareFieldsChanges";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const EditProfileInfo = ({ open, setOpen }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useGetCurrentUser();

  const [isChanged, setIsChanged] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>(user);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (updatedData: Partial<User>) =>
      updateUser(user?.id as string, updatedData),
    onSuccess: () => {
      toast.success("Profile info updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user", "users"] });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update user profile image."
      );
    },
  });

  const handleChangeValues = (field: string, value: string) => {
    const newValues = { ...user, [field]: value };
    setUpdatedUser(newValues);
    setIsChanged(compareFieldsChanges(user, newValues));
  };

  const handleUpdateUserInfo = async () => {
    mutate({
      name: updatedUser?.name,
      designation: updatedUser?.designation,
      bio: updatedUser?.bio,
    });
  };

  return (
    <Modal
      aria-labelledby="Edit Profile"
      aria-describedby="edit your profile information"
      open={open}
      onClose={() => setOpen(false)}
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
          border: "2px solid gray",
          borderRadius: "10px",
          boxShadow: 24,
          p: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography id="spring-modal-title" variant="h6" component="h2">
          Edit Profile info
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            id="name"
            defaultValue={user?.name}
            label="Name"
            name="name"
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            id="designation"
            name="designation"
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
            defaultValue={user?.designation}
            label="Designation"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
            id="bio"
            name="bio"
            defaultValue={user?.bio}
            label="Bio"
            variant="outlined"
            size="small"
          />
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
            onClick={() => setOpen(false)}
            type="button"
            variant="outlined"
            size="small"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            disabled={!isChanged || isLoading}
            size="small"
            type="button"
            onClick={handleUpdateUserInfo}
            variant="contained"
            loading={isLoading}
            loadingPosition="start"
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileInfo;
