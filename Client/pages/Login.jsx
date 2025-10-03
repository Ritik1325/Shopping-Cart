import { useState } from "react"
import { useNavigate, NavLink } from "react-router";
import axios from '../utils/axios'
import { useMessage } from "../context/message";
import { useUser } from "../context/User";





const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {user,setUser}=useUser();

    const { topUp } = useMessage();
    const navigate=useNavigate();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(user) {
                topUp('Logout First','error');
                return;
            }
            const res = await axios.post('/auth/login', { email, password }, { withCredentials: true });
            setUser(res.data.user);

            topUp(res.data.message, "success");
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
            <div className="h-screen w-screen flex  justify-center items-center bg-[url('/public/bgimage.png')] bg-cover bg-center" >
            
                <div className="max-w-md w-full px-6 py-8 border border-white/10 bg-white/10  flex flex-col rounded-2xl shadow-xl mx-4">
                    <h1 className=" text-center  text-3xl mb-6 font-medium text-blue-400 tracking-wide ">Login</h1>
                    
                    

                    <form onSubmit={handleSubmit}>
                        <input className="bg-transparent w-full px-4 py-2 border-b-2 outline-none font-medium text-xl mb-8 focus:border-sky-400 focus:border-b-4 " type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input className="bg-transparent w-full px-4 py-2 border-b-2 outline-none font-medium text-xl mb-8  focus:border-sky-400 focus:border-b-4" type="password" placeholder="Password" minLength={5} maxLength={12} value={password} required onChange={(e) => setPassword(e.target.value)} />

                        <div className="flex justify-center flex-col items-center">
                            <p className="font-medium p-2">Not register? <NavLink to={'/register'} className="text-blue-400" >Register</NavLink></p>
                            <button type="submit" className="p-4 w-full rounded-xl bg-orange-500 text-white font-semibold text-xl hover:bg-orange-400 ">Login</button>
                        </div>
                    </form>

                </div>

            </div>



        </>
    )
}


export default Login