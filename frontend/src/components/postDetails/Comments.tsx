import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import CommentModal from "../common/CommentModal";
import LoginModal from "../common/LoginModal";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import CommentLoadingSkeleton from "@/skeletons/CommentLoadingSkeleton";
import CommentCard from "./CommentCard";
import { getCommentsByPostId } from "@/modules/comment/api";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/modules/comment/types";

type Props = {
  postId: string;
};

const Comments = ({ postId }: Props) => {
  const { user } = useGetLoggedInUser();
  const [isComment, setIsComment] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: getCommentsByPostId,
  });
  const comments = (data || []) as Comment[];

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
