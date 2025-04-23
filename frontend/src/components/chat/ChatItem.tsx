import { Avatar, Box, Typography } from "@mui/material";
import { userAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return [message]; // Return the entire message if no code blocks are found
}

function isCodeBlock(str: string) {
  const codeIndicators = ["=", ";", "[", "]", "{", "}", "#", "//"];
  return codeIndicators.some((indicator) => str.includes(indicator));
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = userAuth();

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        bgcolor: "#05101c",
        my: 1,
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter
              key={index} // Add a unique key
              style={coldarkDark}
              language="javascript"
            >
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} fontSize={"20px"}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        bgcolor: "#004d56",
        gap: 2,
        my: 1,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter
              key={index} // Add a unique key
              style={coldarkDark}
              language="javascript"
            >
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} fontSize={"20px"}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
