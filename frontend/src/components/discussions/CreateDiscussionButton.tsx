import { useGetLoggedInUser } from "@/modules/user/hooks";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreateDiscussionButton = () => {
  const { user } = useGetLoggedInUser();
  const router = useRouter();

  const handleNavigate = () => {
    if (user?.id) {
      router.push("/discussion/create");
    } else {
      toast.warn(
        "You are not a logged in user. Please login first then create discussion"
      );
      return;
    }
  };

  return (
    <Button
      onClick={handleNavigate}
      variant="contained"
      sx={{
        mt: 2,
      }}
    >
      Ask Question
    </Button>
  );
};

export default CreateDiscussionButton;
