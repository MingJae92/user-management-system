import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

function Login() {
  const responseMessage = (response: CredentialResponse) => {
    console.log("You are logged in:", response.credential);
  };

  const errorMessage = () => {
    console.log("Login failed or was cancelled");
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}

export default Login;
