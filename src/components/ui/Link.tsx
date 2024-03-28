import { PropsWithChildren } from "react"
import { NavLink } from "react-router-dom"

export const Link = ({to, children, className}: PropsWithChildren<{to: string, className?: string}>)=>{
    return <NavLink to={to} className={"underline text-blue-600 hover:text-blue-800 visited:text-purple-600"+ className}>{children}</NavLink>
}

