import { Box, useMediaQuery, useTheme, Typography } from '@mui/material';
import TypingAnim from '../components/typer/TypingAnim';
import Footer from '../components/footer/Footer';
import { IoMdInformationCircleOutline } from 'react-icons/io';

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
            my: 10,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "60%",
            padding: "15px", // Reduced padding
            borderRadius: "20px",
            backgroundColor: "rgb(17, 29, 39)",
            boxShadow: "0px 3px 13px rgba(255, 248, 255, 0.5)",
            marginTop: 5, // Reduced margin-top
            marginBottom: 5, // Reduced margin-bottom
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "white", fontWeight: "600", mb: 2 }}
          >
            Welcome to Our AI Chatbot Application!
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "white", fontSize: "18px", lineHeight: "1.8" }}
          >
            This app is powered by cutting-edge AI technology to assist you with
            all your queries and provide real-time, insightful responses. Enjoy
            a seamless and interactive user experience!
          </Typography>

          {/* Note Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              backgroundColor: "rgb(23, 35, 45)",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px rgba(153, 146, 146, 0.66)",
            }}
          >
            <IoMdInformationCircleOutline
              size={20}
              color="yellow"
              style={{ marginRight: "8px" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "15px" }}
            >
              Note: The API key has expired, so the chatbot cannot provide
              information at the moment. Please check back later!
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
