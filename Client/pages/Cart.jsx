import { useEffect, useState } from "react"
import axios from '../utils/axios'
import { useMessage } from "../context/message";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router";





const Cart = () => {
    const [loading, setLoading] = useState(true);
    
    const { topUp } = useMessage();

    const {cart,setCart}=useCart();
    const navigate=useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/user/cart', { withCredentials: true });
                setCart(res.data.cart);
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
            const res = await axios.post(`/user/cart/${id}`, {}, { withCredentials: true });
            setCart(res.data.cart);
            topUp("removed", "success");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                topUp(error.response.data.message, "error");
            } else {
                topUp(error.message, "error");
            }
        }

    }

    const placeOrder=async(id)=>{
        try {
            const res=await axios.post(`/user/order/${id}`,{},{withCredentials:true});
            topUp(res.data.message,"success");
            navigate('/Order',{state:{count:res.data.Count}});

   
        } catch (error) {
             if (error.response && error.response.data && error.response.data.message) {
                topUp(error.response.data.message, "error");
            } else {
                topUp(error.message, "error");
            }
            
        }
    }


    if (loading) return (<div className="text-3xl text-blue-500 text-center ">Loading...</div>)

    const itemTotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.count), 0);
    const shippingFee = 5;
    const handlingCharge = 2;
    const grandtotal = itemTotal + shippingFee + handlingCharge;





    return (
        <>
            <div className="h-screen  p-4 flex flex-col gap-16">
                {cart.length > 0 ? (
                    cart.map(item => (
                        <div key={item._id} className="flex p-3 border-2 border-amber-400 rounded-2xl justify-evenly items-center">
                            <img className="w-32 rounded-xl " src={item.product.image.url} alt="image" />
                            <p className=" text-xl text-medium">{item.product.name}</p>
                            <p className=" text-xl text-medium">${item.product.price}</p>
                            {item.product.discount !== 0 ? <div>{item.product.discount}</div> : null}
                            <p className=" text-xl text-medium">{item.count}</p>
                            <button className="bg-red-400 text-white text-xl font-medium rounded-xl p-4" onClick={() => removeItem(item._id)}>Remove</button>
                            <button className="bg-green-400 text-white text-xl font-medium rounded-xl p-4" onClick={()=>placeOrder(item.product._id)}>Place order</button>
                        </div>
                    ))


                ) : (<h1 className="text-3xl text-gray-500 font-medium">No items</h1>)}

                {cart.length > 0 ? (
                    <div className=" p-4 flex flex-col gap-4 text-2xl text-medium border-2 rounded-xl  w-72 ">
                        <p><span className=" text-blue-400">shipping-charge:</span> ${shippingFee}</p>
                        <p><span className=" text-blue-400">handlingFee: </span> ${handlingCharge}</p>
                        <p><span className=" text-blue-400">Toatal Bill: </span> ${grandtotal}</p>
                        
                    </div>
                ) : null}



            </div>



        </>
    )
}


export default Cart;