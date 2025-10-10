import axios from "axios"


const instance=axios.create({
    baseURL:import.meta.env.VITE_API_URL || "https://localhost:5173",
    withCredentials:true

})


export default instance;
     