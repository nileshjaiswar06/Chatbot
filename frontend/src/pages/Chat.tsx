import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { userAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = userAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [conversationTitle, setConversationTitle] = useState("New Conversation");

  const location = useLocation();

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content || content.trim() === "") return;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    
    try {
      const chatData = await sendChatRequest(content);
      const lastMessage = chatData.chats[chatData.chats.length - 1];
      setChatMessages((prev) => [...prev, lastMessage]);

      if (conversationTitle === "New Conversation" && chatMessages.length === 0) {
        const shortTitle = content.length > 30 ? content.substring(0, 30) + "..." : content;
        setConversationTitle(shortTitle);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending message");
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      setConversationTitle("New Conversation");
      toast.success("Deleted Chats successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats...", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          if (data.chats.length > 0) {
            const firstUserMessage = data.chats.find((chat: Message) => chat.role === 'user');
            if (firstUserMessage) {
              const shortTitle = firstUserMessage.content.length > 30 
                ? firstUserMessage.content.substring(0, 30) + "..."
                : firstUserMessage.content;
              setConversationTitle(shortTitle);
            }
          }
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            sm: "none",
            xs: "none",
          },
          flex: 0.2,
          flexDirection: "column",
          minHeight: "70vh",
          maxHeight: "80vh",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            mx: 3,
            px: 3,
            py: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Top Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
            >
              {auth?.user?.name[0]}
            </Avatar>
            <Typography
              sx={{
                fontFamily: "work sans",
                mb: 1,
                textAlign: "center",
                width: "100%",
                color: "white",
                fontSize: "1.1rem",
                maxWidth: "220px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: 500,
              }}
            >
              {conversationTitle}
            </Typography>
            <Box sx={{ width: "80%", borderBottom: "1px solid #4a5b6a", my: 1 }} />
            <Typography
              sx={{
                fontFamily: "work sans",
                my: 2,
                p: 2,
                color: "rgb(211, 211, 211)",
                fontSize: "1rem",
                borderRadius: 2,
                bgcolor: "rgba(0,0,0,0.2)",
                width: "90%",
                textAlign: "center",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Your chats will appear here
            </Typography>
          </Box>
          {/* Bottom Section */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", mb: 1 }}>
            <Button
              onClick={handleDeleteChats}
              sx={{
                width: "100%",
                color: "white",
                fontWeight: "700",
                borderRadius: 3,
                bgcolor: red[300],
                boxShadow: 2,
                ":hover": {
                  bgcolor: red.A400,
                  transform: "scale(1.04)",
                  boxShadow: 4,
                  transition: "all 0.2s ease"
                },
                transition: "all 0.2s ease",
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Clear Conversation
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - 3.5 TURBO
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        <div
          style={{
            width: "100%",
            borderRadius: "8px",
            backgroundColor: "rgb(17,29,39)",
            display: "flex",
            margin: "20px auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "20px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
            placeholder="Send a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ 
              mx: 2,
              color: "white",
              "&:hover": {
                color: "primary.main",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
