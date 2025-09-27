import { useEffect, useState } from "react"
import axios from '../utils/axios'
import { useMessage } from "../context/message";
import { useNavigate } from "react-router";




const MyProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const { topUp } = useMessage();
    const navigate=useNavigate();



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
            <div className="h-screen p-4">
                {products.length > 0 ? (
                    products.map(item => (
                        <div key={item._id} className="flex p-3 border-2 border-amber-400 rounded-2xl justify-evenly items-center">
                            <img className="w-32 rounded-xl " src={item.image.url} alt="image" />
                            <p className=" text-xl text-medium">{item.name}</p>
                            <p className=" text-xl text-medium">${item.price}</p>
                            {item.discount !== 0 ? <div>{item.discount}</div> : null}

                            <button className="bg-red-400 text-white text-xl font-medium rounded-xl p-4" onClick={() => handleDel(item._id)} >Delete</button>
                            <button className="bg-green-400 text-white text-xl font-medium rounded-xl p-4" onClick={() => navigate(`/update/${item._id}`)}>Update</button>

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