import { Button, Stack } from "@mui/material";

const UserPostsActions = () => {
  return (
    <Stack justifyContent={"space-between"} direction="row" spacing={1} mt={3}>
      <Button size="small" variant="outlined" color="primary">
        Edit
      </Button>
      <Button size="small" variant="outlined" color="error">
        Delete
      </Button>
    </Stack>
  );
};

export default UserPostsActions;
