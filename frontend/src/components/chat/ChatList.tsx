import {
  Box,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getChatListByUser } from "@/modules/chat/api";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { Chat } from "@/modules/chat/types";
import NoDataFound from "../common/NoDataFound";
import ChatActions from "./ChatActions";

const ChatList = () => {
  const { user } = useGetCurrentUser();
  const { data, isLoading } = useQuery({
    queryKey: ["chats-messages", user?.id],
    queryFn: getChatListByUser,
    refetchOnWindowFocus: false,
  });

  const chatList = (data || []) as Chat[];

  return (
    <List
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 150px)",
      }}
    >
      {isLoading ? (
        <Box>
          {Array.from({ length: 15 }).map((_, index) => (
            <ListItem key={index}>
              <ListItemText>
                <Skeleton variant="text" width="100%" />
              </ListItemText>
            </ListItem>
          ))}
        </Box>
      ) : (
        <>
          {chatList?.length <= 0 ? (
            <NoDataFound message="No chats found"></NoDataFound>
          ) : (
            <>
              {chatList.map((chat) => (
                <ListItem key={chat.id || chat._id}>
                  <ListItemText>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      href={`/chat-ai/${chat?._id || chat?.id}?title=${
                        chat.title
                      }`}
                      passHref
                    >
                      <Typography noWrap>{chat.title}</Typography>
                    </Link>
                  </ListItemText>
                  <ChatActions chat={chat} />
                </ListItem>
              ))}
            </>
          )}
        </>
      )}
    </List>
  );
};

export default ChatList;
