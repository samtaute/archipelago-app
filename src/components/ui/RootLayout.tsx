import { NavLink, Outlet } from "react-router-dom"
import { HomeIcon } from "./HomeIcon"

const RootLayout = ()=>{
    return (
        <>
            <div className="flex justify-between w-full h-12 p-1 border-b-[1px] border-gray-300">
                <NavLink to="/" className="w-32 h-full flex justify-end items-center">
                    <HomeIcon/>
                </NavLink>
            </div>
            <Outlet/>
        </>
    )
}

export default RootLayout