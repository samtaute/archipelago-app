import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import { HomeIcon } from "./HomeIcon"
import { useContext } from "react";
import { AppContext } from "../../contexts/realm-context";


const RootLayout = ()=>{
    const {nodeId} = useParams(); 
    const navigate = useNavigate(); 
    const app = useContext(AppContext)

    const handleLogout = async (event: React.MouseEvent)=>{
        event.preventDefault();
        await app?.logOut(); 
        navigate("/auth/login")
    }   


    return (
        <>
            <div className="flex justify-between w-full h-12 p-1 border-b-[1px] border-gray-300 items-center px-8">
                <NavLink to="/app" className={`w-32 h-full flex justify-end items-center ${!nodeId ? "opacity-30":""}`}>
                    <HomeIcon/>
                </NavLink>
                <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer" onClick={handleLogout}>Logout</div>
            </div>
            <Outlet/>
        </>
    )
}

export default RootLayout