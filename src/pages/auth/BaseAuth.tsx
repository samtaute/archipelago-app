import Card from "../../components/ui/Card";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AppContext } from "../../contexts/realm-context";
import { Credentials } from "realm-web";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "../../components/ui/Link";

export const Signup = () => {
  return (
    <BaseAuth
      googleText="signup_with"
      buttonText="Sign Up"
      linkText="Sign In"
      isExistingUser={false}
    />
  );
};

export const Login = () => {
  return (
    <BaseAuth
      googleText="continue_with"
      buttonText="Sign In"
      linkText="Sign Up"
      isExistingUser={true}
    />
  );
};
const BaseAuth = ({
  googleText,
  buttonText,
  linkText,
  isExistingUser,
}: {
  googleText:
    | "signup_with"
    | "signin_with"
    | "continue_with"
    | "signin"
    | undefined;
  buttonText: string;
  linkText: string;
  isExistingUser: boolean;
}) => {
  const app = useContext(AppContext);
  const navigate = useNavigate();

  //state for email/username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignup = async () => {
    if (isExistingUser) {
      try {
        await app?.logIn(Credentials.emailPassword(email, password));
        navigate("/");
      } catch (error) {
        setError(true);
      }
    } else {
      if (confirmPassword !== password) {
        setError(true);
        return;
      }
      await app?.emailPasswordAuth.registerUser({ email, password });
    }
  };

  const handleSuccess = (response: CredentialResponse) => {
    console.log(response);
    if (response.credential) {
      const credentials = Credentials.google({ idToken: response.credential });
      app?.logIn(credentials).then(() => navigate("/"));
    }
  };
  const handleError = () => {
    console.log("Login failed");
  };
  return (
    <Card>
      <h1 className="font-bold block text-xl m-3">Welcome to Archipelago</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        size="medium"
        text={googleText}
      />
      <div className="items-center flex text-center w-full text-sm">
        <span className="border-t border-gray-400 w-full mt-[8px] pt-[8px] mx-3"></span>
        or
        <span className="border-t border-gray-400 w-full mt-[8px] pt-[8px] mx-3"></span>
      </div>
      <div className="flex flex-col w-full gap-3 items-center">
        <input
          className="w-48 max-w-full border-gray-300 border-2 rounded-md placeholder:font-light placeholder:text-sm p-2 flex"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          className="w-48 max-w-full border-gray-300 border-2 rounded-md placeholder:font-light placeholder:text-sm p-2 flex"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        {isExistingUser ? (
          ""
        ) : (
          <input
            className="w-48 max-w-full border-gray-300 border-2 rounded-md placeholder:font-light placeholder:text-sm p-2 flex"
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          ></input>
        )}
      </div>
      {error ? <div>Check your credentials and try again.</div> : ""}
      <button
        onClick={handleSignup}
        type="button"
        className="rounded-lg px-4 py-1  bg-cyan-700 shadow-cyan-100  hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 text-white"
      >
        {buttonText}
      </button>

      <div className="text-sm">
        {isExistingUser ? "No account yet?": "Already a user?"} <Link to={isExistingUser ? "/auth/signup" : "/auth/login"}>
          {linkText}
        </Link>
      </div>
    </Card>
  );
};

export default BaseAuth;
