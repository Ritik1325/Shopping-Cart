import { useEffect, useState } from "react"
import axios from '../utils/axios'
import { useMessage } from "../context/message";
import { useNavigate } from "react-router";






const Order = () => {
    const [loading, setLoading] = useState(true);
    const { topUp } = useMessage();
    const [order, setOrder] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/user/getOrder', { withCredentials: true });
                setOrder(res.data.Orders || []);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    topUp(error.response.data.message, "error");
                } else {
                    topUp(error.message, "error");
                }

            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    const removeItem = async (id) => {
        try {
            const res = await axios.post(`/user/removeOrder/${id}`, {}, { withCredentials: true });
            setOrder(res.data.Orders);
            topUp(res.data.message, "success");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                topUp(error.response.data.message, "error");
            } else {
                topUp(error.message, "error");
            }
        }

    }



    if (loading) return (<div className="text-3xl text-blue-500 text-center ">Loading...</div>)

    const itemTotal = order.reduce((acc, curr) => acc + (curr.product.discount !== 0 ?
        ((curr.product.price) - (curr.product.discount / 100) * (curr.product.price))
        * (curr.count) : (curr.product.price) * curr.count), 0);
    const shippingFee = 5;
    const handlingCharge = 2;
    const grandtotal = itemTotal + shippingFee + handlingCharge;





    return (
        <>
            <button onClick={() => navigate(-1)} className="px-6 py-3 m-4 rounded-xl text-white text-xl font-medium bg-orange-400">Back</button>
            <div className="h-screen p-2  sm:p-4 flex flex-col gap-16">
                {order.length > 0 ? (
                    order.map((item, index) => (
                        <div key={index} className="flex sm:p-3 py-2 border-2 border-amber-400 rounded-2xl justify-evenly items-center">
                            <img className="sm:w-32 w-16 rounded-xl " src={item.product.image.url} alt="image" />
                            <p className=" sm:text-xl text-medium tracking-tighter">{item.product.name}</p>
                            <p className=" sm:text-xl text-medium tracking-tighter">${item.product.discount !== 0 ?
                                (item.product.price) - (item.product.discount / 100) * (item.product.price)
                                : item.product.price}</p>
                            <p className=" sm:text-xl text-medium tracking-tighter">{item.count}</p>
                            <button className="bg-red-400 text-white sm:text-xl font-medium rounded-xl p-2 sm:p-4 tracking-tighter" onClick={() => removeItem(item.product._id)} >Cancel order</button>
                        </div>
                    ))


                ) : (<h1 className="text-3xl text-gray-500 font-medium">No items</h1>)}

                {order.length > 0 ? (
                    <div className=" p-4 flex flex-col gap-4 text-2xl text-medium border-2 rounded-xl  w-72 ">
                        <p><span className=" text-blue-400">shipping-charge:</span> ${shippingFee}</p>
                        <p><span className=" text-blue-400">handlingFee: </span> ${handlingCharge}</p>
                        <p><span className=" text-blue-400">Total Bill: </span> ${grandtotal}</p>

                    </div>
                ) : null}



            </div>



        </>
    )
}


export default Order;