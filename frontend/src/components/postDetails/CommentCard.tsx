import { Comment } from "@/modules/comment/types";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import CommentDeleteModal from "./CommentDeleteModal";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  const { user } = useGetCurrentUser();
  const [shouldEdit, setShouldEdit] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  return (
    <Paper
      key={comment.id}
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Avatar
          src={comment.user.profile_image}
          alt={comment.user.name}
          sx={{ width: 48, height: 48 }}
        />
        <Box width={"100%"}>
          <Typography fontWeight={600}>{comment.user.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {moment(new Date(comment.createdAt)).fromNow()}
          </Typography>
          {shouldEdit ? (
            <CommentEditForm comment={comment} setShouldEdit={setShouldEdit} />
          ) : (
            <Typography variant="body1">{comment.content}</Typography>
          )}
        </Box>
      </Box>
      {user?.id === comment?.user?.id && (
        <>
          {!shouldEdit && (
            <Box display="flex" gap={1}>
              <span onClick={() => setShouldEdit(true)}>
                <EditIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  color="primary"
                  titleAccess="Edit comment"
                />
              </span>
              <span onClick={() => setShouldDelete(true)}>
                <DeleteIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  color="error"
                  titleAccess="Delete comment"
                />
              </span>
            </Box>
          )}
        </>
      )}
      {shouldDelete && (
        <CommentDeleteModal
          comment={comment}
          open={shouldDelete}
          setOpen={setShouldDelete}
        />
      )}
    </Paper>
  );
};

export default CommentCard;
