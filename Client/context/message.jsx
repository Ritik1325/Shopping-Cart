import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";





const MessageContext = createContext()


export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState()
    const [type, setType] = useState("info");

    const topUp = (message, msgtype = "info") => {
        setMessage(message);
        setType(msgtype);




        setTimeout(() => {
            setMessage(null);
        }, 3000);



    }


    return (
        <MessageContext.Provider value={{ topUp }}>
            {children}

            {message && (
                <div
                    className={`fixed sm:top-20 top-18 sm:right-8 right-4 px-4 sm:py-4  py-2 rounded-xl sm:rounded-2xl shadow-lg text-white
                         
            ${type === "success" && "bg-green-500"} 
            ${type === "error" && "bg-red-500"} 
            ${type === "info" && "bg-blue-500"} 
          `}
                >
                    <p className="sm:text-xl sm:font-bold font-medium font-serif">{message}</p>
                </div>
            )}


        </MessageContext.Provider>


    )
}


export const useMessage = () => useContext(MessageContext);