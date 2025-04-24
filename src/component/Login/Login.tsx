
import { GoogleLogin } from '@react-oauth/google';



function Login() {
    const responseMessage = (response: any) => {
        console.log("You are logged in",response);
    };
    const errorMessage = (error: any) => {
        console.log(error);
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
    )
}

export default Login