import { useState } from "react"
import axios from '../utils/axios'
import { useMessage } from "../context/message"
import { useNavigate, NavLink } from "react-router"
import { useUser } from "../context/User"




const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('customer')

    const {setUser}=useUser()

    const {topUp}=useMessage();
    const navigate=useNavigate();


    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();

           const res= await axios.post('/auth/register',{name,email,role,password},{withCredentials:true});
           setUser(res.data.user);


           topUp(res.data.message,"success");
           navigate('/');



        } catch (error) {
             if (error.response && error.response.data && error.response.data.message) {
                topUp(error.response.data.message, "error");
            } else {
                topUp(error.message, "error");
            }
            
        }
    }


    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-[url('/public/bgimage.png')] bg-cover bg-center">
                <div className="max-w-lg px-4 py-4 border border-white/10 bg-white/30 flex flex-col rounded-2xl shadow-xl">
                    <h1 className=" px-6 py-6  text-3xl mb-6 font-medium  tracking-wide ">Register</h1>


                    <form onSubmit={handleSubmit}>
                        <input type="text" className="bg-transparent w-md px-4 py-2 border-b-2 outline-none font-medium text-xl mb-8  focus:border-sky-400 focus:border-b-4" placeholder="Fullname" required value={name} onChange={(e)=>setName(e.target.value)} />

                        <input className="bg-transparent w-md px-4 py-2 border-b-2 outline-none font-medium text-xl mb-8  focus:border-sky-400 focus:border-b-4" type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />

                        <select   className="bg-transparent w-md px-4 py-2 border-b-2 outline-none font-medium text-xl mb-8  focus:border-sky-400 focus:border-b-4" name="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>



                        <input className="bg-transparent w-md px-4 py-2 border-b-2 outline-none font-medium text-xl mb-8  focus:border-sky-400 focus:border-b-4" type="password" placeholder="Password" minLength={5} maxLength={12} value={password} required onChange={(e) => setPassword(e.target.value)} />

                        <div className="flex justify-center flex-col items-center">
                            <p className="font-medium p-2">Already registered? <NavLink to={'/login'} className="text-blue-400" >login</NavLink></p>
                            <button type="submit" className="p-4 w-92 rounded-xl bg-orange-500 text-white font-semibold text-xl hover:bg-orange-400 ">Register</button>
                        </div>
                    </form>

                </div>

            </div>



        </>
    )
}


export default Register;