import { createContext } from "react";

export const LoginContext = createContext({loggedIn: !!sessionStorage.getItem("token")?.trim().length,loginStatus:()=>{}});


export const UserSelectContext = createContext({value:false,change:()=>{}});
