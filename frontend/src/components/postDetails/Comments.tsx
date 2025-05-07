import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import CommentModal from "../common/CommentModal";
import LoginModal from "../common/LoginModal";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import { useGetCommentsByPostId } from "@/modules/comment/hooks";
import CommentLoadingSkeleton from "@/skeletons/CommentLoadingSkeleton";
import CommentCard from "./CommentCard";

type Props = {
  postId: string;
};

const Comments = ({ postId }: Props) => {
  const { user } = useGetLoggedInUser();
  const [isComment, setIsComment] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);

  const { comments, isLoading } = useGetCommentsByPostId(postId);

  const handleOpenCommentModal = () => {
    if (user?.id) {
      setIsComment(true);
    } else {
      setShouldLogin(true);
    }
  };

  return (
    <Box>
      <Box display={"flex"} gap={2} mb={2}>
        <Typography variant="h6">
          {comments.length} Comment{comments.length > 1 ? "s" : ""}
        </Typography>
        <Button
          onClick={handleOpenCommentModal}
          type="button"
          variant="contained"
          size="small"
        >
          Leave comment
        </Button>
      </Box>

      {isLoading ? (
        <CommentLoadingSkeleton />
      ) : (
        <>
          {comments.length <= 0 ? (
            <Typography color="textSecondary">
              No one comment yet. Be first commenter!
            </Typography>
          ) : (
            <Stack spacing={2}>
              {comments.map((comment) => (
                <CommentCard comment={comment} key={comment?.id} />
              ))}
            </Stack>
          )}
        </>
      )}

      {isComment && (
        <CommentModal postId={postId} open={isComment} setOpen={setIsComment} />
      )}
      {shouldLogin && (
        <LoginModal open={shouldLogin} setOpen={setShouldLogin} />
      )}
    </Box>
  );
};

export default Comments;
