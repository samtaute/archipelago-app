import { useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import { AppContext } from "../../contexts/realm-context";



const ConfirmationPage = ()=>{

    const app = useContext(AppContext);
    const navigate = useNavigate(); 

    useEffect(()=>{
        (async ()=>{
            let queryString = window.location.search; 
            queryString = queryString.substring(1); 
            const queryParams = queryString.split('&'); 

            const params : any = {}; 
            for (let i = 0; i < queryParams.length; i++) {
                const pair = queryParams[i].split("=");
                const key = decodeURIComponent(pair[0]);
                const value = decodeURIComponent(pair[1] || "");
                params[key] = value;
            }
            console.log(params)
            await app?.emailPasswordAuth.confirmUser(params)
        })(); 
    }, [app])

    const handleNavigateToLogin = ()=>{
        navigate("/auth/login"); 
    }

    return (
        <div className="container flex flex-col">
            <h2 className="font-mono mb-5 text-4xl font-bold">Congratulations your email is confirmed!</h2>
            <button type="button" className="rounded-lg px-4 py-1  bg-cyan-700 shadow-cyan-100  hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 text-white" onClick={handleNavigateToLogin}>
            Go to Login
          </button>
        </div>

    )

}

export default ConfirmationPage; 