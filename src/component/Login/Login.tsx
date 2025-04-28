import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import {
  Wrapper,
  ContainerBox,
  FormBox,
  ImageBox,
  Title,
  Subtitle,
} from "../../styles/loginStyles/loginStyles.styles";

type GoogleUserData = {
  id: string;
  name: string;
  email: string;
};

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // Destructure login function and user from context

  const responseMessage = (response: CredentialResponse) => {
    console.log("Google Login successful:", response); // Debugging log
    if (response.credential) {
      const userData: GoogleUserData = {
        id: response.credential,
        name: "User Name", // Replace with actual data from response
        email: "user@example.com", // Replace with actual data from response
      };

      login(userData); // Update the user context and redirect to dashboard
    }
  };

  const errorMessage = () => {
    console.log("Login failed or was cancelled");
  };

  // Redirect on login (if the user is already logged in)
  useEffect(() => {
    if (user) {
      console.log("User already logged in, navigating to dashboard...");
      navigate("/dashboard"); // Navigate to dashboard if the user is already logged in
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <ContainerBox>
        <FormBox>
          <Title variant="h4">Admin login</Title>
          <Subtitle variant="body1">Welcome back! Please sign in.</Subtitle>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </FormBox>
        <ImageBox />
      </ContainerBox>
    </Wrapper>
  );
}

export default Login;
