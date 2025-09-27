import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import axios from '../utils/axios'
import { useMessage } from "./message";
import { useContext } from "react";




const UserContext=createContext();

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null);
    const {topUp}=useMessage();

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const res=await axios.get('/user',{withCredentials:true});
                setUser(res.data.User);

            } catch (error) {
                topUp(error.response?.data?.message || "Error fetching","error");
                
            }
        }

        fetchUser();


    },[user])


    return(
        <>
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>

        </>
    )

}


export const useUser=()=>useContext(UserContext);


