import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Typography } from "@mui/material";
import {
  Wrapper,
  ContainerBox,
  FormBox,
  ImageBox,
  Title,
  Subtitle,
} from "../../styles/loginStyles/loginStyles.styles";

function Login() {
  const responseMessage = (response: CredentialResponse) => {
    console.log("You are logged in:", response.credential);
  };

  const errorMessage = () => {
    console.log("Login failed or was cancelled");
  };

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
