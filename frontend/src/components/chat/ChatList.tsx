import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { chats } from "./dummy";

const ChatList = () => {
  return (
    <List
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 150px)",
      }}
    >
      {chats.map((contact) => (
        <ListItem key={contact.id}>
          <ListItemText>
            <Typography noWrap>{contact.content}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
