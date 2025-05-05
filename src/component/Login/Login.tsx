import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
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
  const { login, user } = useAuth();

  const responseMessage = async (response: CredentialResponse) => {
    console.log("Google Login successful:", response);

    if (response.credential) {
      try {
        const idToken = response.credential;

        // Fetch user profile data using Axios
        const googleUser = await fetchUserData(idToken);

        const userData: GoogleUserData = {
          id: googleUser.sub,
          name: googleUser.name,
          email: googleUser.email,
        };

        login(userData);
      } catch (error) {
        console.error("Error fetching user data from Google:", error);
      }
    }
  };

  const errorMessage = () => {
    console.log("Login failed or was cancelled");
  };

  const fetchUserData = async (idToken: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data from Google API:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User already logged in, navigating to dashboard...");
      navigate("/dashboard");
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
