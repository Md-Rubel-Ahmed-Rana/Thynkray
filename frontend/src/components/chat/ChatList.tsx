import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { chats } from "./dummy";
import Link from "next/link";

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
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={`/chat-ai/${contact.id}`}
              passHref
            >
              <Typography noWrap>{contact.content}</Typography>
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
