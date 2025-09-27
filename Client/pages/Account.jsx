import { useNavigate } from "react-router";
import { useUser } from "../context/User"





const Account=()=>{
   const  {user}=useUser();
   const navigate=useNavigate();
    return(
        <>
        <div className="p-4 flex flex-col gap-10 ">
            <div className="flex gap-2 items-center">
                <p className="text-3xl text-green-400 font-medium">
                    {user?.name || "Username"} 
                </p>
                <p className="text-gray-300 text-xl text-center">{user?.email}</p>
            </div>
            <div>
                {user?.role==="admin"?(
                    <button className="p-4 rounded-2xl font-medium text-xl border-2" onClick={()=>navigate('/myProduct')}>My Products</button>
                ):(
                    <button className="p-4 rounded-2xl font-medium text-xl border-2" onClick={()=>navigate('/Order')}>My Orders</button>
                )}

            </div>

            


        </div>

        
        </>
    )
}



export default Account