import { useContext, useState } from "react";
import { AppContext } from "../contexts/realm-context";
import { Credentials } from "realm-web";
import {useNavigate} from 'react-router-dom'

const WelcomePage = () => {
  const [isExistingUser, setIsExistinguser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false)

  const navigate = useNavigate(); 

  const app = useContext(AppContext);

  const handleSignup = async () => {
    
    if(isExistingUser){
      try{
        await app?.logIn(Credentials.emailPassword(email,password)); 
        navigate('/')
      }catch(error){
        setError(true)
      }
 
    }else{
      if(confirmPassword !== password){
        setError(true); 
        return; 
      }
      await app?.emailPasswordAuth.registerUser({ email, password });
    }
  };

  const handleToggleUserStatus = () => {
    setIsExistinguser((prev) => {
      return !prev;
    });
  };

  return (
    <div className="container mx-auto flex p-6 justify-center items-center gap-2 mt-[90px]">
      <div className="flex flex-col p-2 w-80 items-center gap-2">
        <h1 className="font-mono mb-5 text-4xl font-bold w-full text-center">
          Organize Your Brain
        </h1>
        <div className="flex flex-col items-center w-full">
          <label
            htmlFor="email"
            className="font-sans font-bold w-full text-left"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="border-gray-300 border-2 rounded-md placeholder:font-light p-1 mx-1 w-full"
            placeholder="Enter Your Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <label
            htmlFor="password"
            className="font-sans font-bold w-full text-left"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-gray-300 border-2 rounded-md placeholder:font-light p-1 mx-1 w-full"
            placeholder="Enter Your Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {isExistingUser ? (
          ""
        ) : (
          <div className="flex flex-col items-center w-full">
            <label
              htmlFor="confirm-password"
              className="font-sans font-bold w-full text-left"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="border-gray-300 border-2 rounded-md placeholder:font-light p-1 mx-1 w-full"
              placeholder="Re-enter Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        )}
        {error ? <div>Check your credentials and try again.</div> : ''}

        <button
          type="button"
          className="rounded-lg px-4 py-1  bg-cyan-700 shadow-cyan-100  hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 text-white"
          onClick={handleSignup}
        >
          {isExistingUser ? "Login" : "Sign Up"}
        </button>
        <p
          onClick={handleToggleUserStatus}
          className="font-sans font-bold w-full text-left"
        >
          {isExistingUser
            ? <span>Don't have an account? <b className="cursor-pointer">Sign up</b></span>
            : <span>Already have an account? <b className="cursor-pointer">Login</b></span>}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
