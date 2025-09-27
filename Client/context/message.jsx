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
                    className={`fixed top-20 right-8 px-4 py-4 rounded-2xl shadow-lg text-white
                         font-medium
            ${type === "success" && "bg-green-500"} 
            ${type === "error" && "bg-red-500"} 
            ${type === "info" && "bg-blue-500"} 
          `}
                >
                    <p className="text-xl font-bold font-serif">{message}</p>
                </div>
            )}


        </MessageContext.Provider>


    )
}


export const useMessage = () => useContext(MessageContext);