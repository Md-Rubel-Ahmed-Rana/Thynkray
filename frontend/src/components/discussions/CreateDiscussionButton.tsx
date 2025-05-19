import { getCurrentUser } from "@/modules/user/api";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreateDiscussionButton = () => {
  const { data: session } = useSession();
  const { data: user } = useQuery({
    queryKey: ["user", session?.user?.email as string],
    queryFn: getCurrentUser,
  });
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
