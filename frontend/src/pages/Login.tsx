import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/Shared/CustomizedInput";
import { AiOutlineLogin } from "react-icons/ai";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { userAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = userAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box
        padding={8}
        mt={8}
        display={{
          md: "flex",
          sm: "none",
          xs: "none",
        }}
      >
        <img
          src="airobot.png"
          alt="Robot"
          style={{ width: "400px", marginLeft: "150px" }}
        />
      </Box>

      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "12px 8px 20px #490287",
            borderRadius: "10px",
            border: "none",
            marginRight: "180px",
            marginBottom: "135px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>

            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />

            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#490287",
                ":hover": { bgcolor: "#7b30bc", color: "white" },
              }}
              disableRipple
              endIcon={<AiOutlineLogin />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
