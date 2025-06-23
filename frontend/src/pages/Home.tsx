import { Box, useMediaQuery, useTheme } from '@mui/material';
import TypingAnim from '../components/typer/TypingAnim';
import Footer from '../components/footer/Footer';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box width={"100%"} height={"100%"} flex={"flex"} mx={'auto'}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <TypingAnim />

        <Box
          sx={{
            width: isBelowMd ? "80%" : "60%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 5,
          }}
        >
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "70px", margin: "auto" }}
          />
        </Box>

        <Box
          sx={{
            width: isBelowMd ? "85%" : "70%",
            height: isBelowMd ? "auto" : "55%",
            border: "1.5px solid #4a5b6a",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(74,91,106,0.15)",
            mx: "auto",
            mb: 0,
            background: "rgba(17,29,39,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img 
            className='chat-page'
            src='chat-page.png'
            alt='chat-page'
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
