import { useEffect, useState } from "react"
import axios from '../utils/axios'
import { useMessage } from "../context/message";
import { useNavigate } from "react-router";




const MyProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const { topUp } = useMessage();
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/product/myproduct', { withCredentials: true });
                setProducts(res.data.Products);

            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    topUp(error.response.data.message, "error");
                } else {
                    topUp(error.message, "error");
                }

            } finally {
                setLoading(false)
            }

        }

        fetchData();
    }, [products])



    const handleDel = async (id) => {
        try {
            const res = await axios.post(`/product/del/${id}`, {}, { withCredentials: true });
            setProducts('');
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



    if (loading) return <div className="text-center pt-12 text-blue-500 text-3xl font-medium">Loading...</div>





    return (
        <>
            <button onClick={() => navigate(-1)} className="px-6 py-3 m-4 rounded-xl text-white text-xl font-medium bg-orange-400">Back</button>
            <div className="h-screen p-2 sm:p-4  flex flex-col gap-16">
                {products.length > 0 ? (
                    products.map(item => (
                        <div key={item._id} className="flex sm:p-3 py-2 border-2 border-amber-400 rounded-2xl justify-evenly items-center">
                            <img className="sm:w-32 w-12 sm:rounded-xl " src={item.image.url} alt="image" />
                            <p className=" sm:text-xl text-medium tracking-tighter">{item.name}</p>
                            <p className=" sm:text-xl text-medium tracking-tighter">${item.price}</p>
                            {item.discount !== 0 ? <div>{item.discount}%</div> : null}

                            <button className="bg-red-400 text-white text-xl font-medium rounded-xl tracking-tighter p-2 sm:p-4" onClick={() => handleDel(item._id)} >Delete</button>
                            <button className="bg-green-400 text-white text-xl font-medium rounded-xl tracking-tighter p-2 sm:p-4" onClick={() => navigate(`/update/${item._id}`)}>Update</button>

                        </div>
                    ))

                ) : (<div className="pt-10 text-3xl text-amber-300 fot-medium">
                    Nothing posted Yet..
                </div>)}



            </div>



        </>
    )
}


export default MyProduct;