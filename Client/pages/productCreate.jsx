import { useState } from "react";
import axios from '../utils/axios'
import { useMessage } from "../context/message";
import { useNavigate } from "react-router";





const ProductCreate = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(Number);
    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState(Number);
    const [bgcolor, setBgcolor] = useState('');
    const [panelcolor, setPanelcolor] = useState('');
    const [textcolor, setTextcolor] = useState('');
    const [image, setImage] = useState(null);

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()


    const { topUp } = useMessage();



    const handleSubmit = async (e) => {
        if(loading) return;
        setLoading(true);
        try {
            e.preventDefault();


            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("discount", discount);
            formData.append("bgcolor", bgcolor);
            formData.append("panelcolor", panelcolor);
            formData.append("textcolor", textcolor);
            formData.append("image", image);

            const res = await axios.post('/product/create',  formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });

            topUp(res.data.message, "success");
            navigate('/');


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                topUp(error.response.data.message, "error");
            } else {
                topUp(error.message, "error");
            }

        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className="h-screen w-screen  bg-[url('/public/bgimage.png')] bg-cover bg-center flex justify-center items-center px-4  "  >
                <div className="w-full max-w-3xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 ">
                    <h1 className="text-center text-2xl font-semibold mb-6 text-blue-500 ">
                        Post Your Product
                        </h1>
                   
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />

                            <input type="Number" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />

                            <input type="Number" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />

                            <input type="file" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required name="image" onChange={(e) => setImage(e.target.files[0])} />

                            <select name="category" className="w-full  text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl" required value={category} onChange={(e) => setCategory(e.target.value)}>
                                < option className="text-sm"  value="">Select category</ option >
                                < option className="text-sm" value="electronics">Electronics</ option >
                                < option className="text-sm"  value="clothes">Clothing</ option >
                                < option className="text-sm"  value="furniture">Furniture</ option >
                                < option className="text-sm"  value="accessories">Accessories</ option >
                                < option className="text-sm"  value="home">Home</ option >
                            </select>

                            <div className="col-span-1 md:col-span-2 flex flex-col gap-4 ">
                                <h1 className="text-xl font-semibold text-center mb-2 ">Color Pallete</h1>
                                <input type="text" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required placeholder="Bg-color" value={bgcolor} onChange={(e) => setBgcolor(e.target.value)} />

                                <input type="text" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required placeholder="text-color" value={textcolor} onChange={(e) => setTextcolor(e.target.value)} />

                                <input type="text" className=" w-full text-xl font-medium p-3 border-2 border-amber-300 rounded-2xl outline-none focus:border-2 focus:border-blue-400 focus:shadow-2xl " required placeholder="Panel-color" value={panelcolor} onChange={(e) => setPanelcolor(e.target.value)} />

                                <button disabled={loading} type="submit" className="p-3 w-full rounded-xl bg-orange-500 text-white font-semibold text-xl hover:bg-orange-400 disabled:opacity-50 ">{loading?"Posting...":"Post"}</button>
                            </div>



                        </form>

                    
                </div>
            </div>


        </>
    )
}


export default ProductCreate;