import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/realm-context";
import { useContext, useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const app = useContext(AppContext);

  useEffect(() => {
    if (app?.currentUser) {
      navigate("/app");
    } else {
      navigate("/auth/signup");
    }
  }, [app, navigate]);
  return <div>Homepage</div>;
};
