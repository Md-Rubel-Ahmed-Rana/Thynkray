import { Box, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import ChatTitleEditModal from "./ChatTitleEditModal";
import ChatDeleteModal from "./ChatDeleteModal";
import { Chat } from "@/modules/chat/types";

type Props = {
  chat: Chat;
};

const ChatActions = ({ chat }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleEdit = () => {
    setIsEdit(true);
    handleClose();
  };

  const handleDelete = () => {
    setIsDelete(true);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id=""
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      {isEdit && (
        <ChatTitleEditModal chat={chat} open={isEdit} setOpen={setIsEdit} />
      )}
      {isDelete && (
        <ChatDeleteModal chat={chat} open={isDelete} setOpen={setIsDelete} />
      )}
    </Box>
  );
};

export default ChatActions;
