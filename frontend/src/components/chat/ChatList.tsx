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
      {chats.map((chat) => (
        <ListItem key={chat.id}>
          <ListItemText>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={`/chat-ai/${chat.id}?title=${chat.title}`}
              passHref
            >
              <Typography noWrap>{chat.title}</Typography>
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
