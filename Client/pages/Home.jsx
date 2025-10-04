import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router"
import axios from '../utils/axios'
import { useState } from "react"
import { useMessage } from '../context/message'
import { Menu, ShoppingCart } from "lucide-react"
import { useUser } from "../context/User"
import { useCart } from "../context/cart"







const Home = () => {
  const { user,setUser } = useUser();
  const { cart, setCart } = useCart();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true)


  const [count, setCount] = useState([])
  const [isopen, setIsopen] = useState(false);
  const [filter, setFilter] = useState('');

  const navigate=useNavigate();





  const { topUp } = useMessage();

  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await axios.get('/product', { withCredentials: true });
        setProduct(res.data.Products);

        setCount(new Array(res.data.Products.length).fill(0));


      }
      catch (error) {
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

  }, []);


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





  useEffect(() => {
    if (product.length > 0) {
      const counts = new Array(product.length).fill(0);
      cart.forEach(item => {
        const idx = product.findIndex(p => p._id === item.product._id);
        if (idx !== -1) counts[idx] = item.count;
      });
      setCount(counts);
    }
  }, [cart, product]);





  const handleCount = async (id, type) => {
    try {
      const res = await axios.post(`/user/cart/${id}/${type}`, {}, { withCredentials: true });

      const updatedCart = res.data.cart;
      setCart(updatedCart);


      const counts = new Array(product.length).fill(0);
      updatedCart.forEach(item => {
        const idx = product.findIndex(p => p._id === item.product._id);
        if (idx !== -1) counts[idx] = item.count;
      });
      setCount(counts);


    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        topUp(error.response.data.message, "error");
      } else {
        topUp(error.message, "error");
      }
    }

  }

  const sideMenu = () => {
    setIsopen(prev => !prev);
  }

  const Logout = async () => {
    try {

      const res=await axios.post('/auth/logout', {}, { withCredentials: true });
      setUser(res.data.user);
      navigate(0);
      
      topUp(res.data.message, "success");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        topUp(error.response.data.message, "error");
      } else {
        topUp(error.message, "error");
      }

    }

  }

  if (loading) return <p className="pt-28 text-center text-3xl font-bold text-blue-500">Loading...</p>

  const filteredProduct = filter
    ? product.filter(item => item.category === filter)
    : product;







  return (
    <>
      <div className="h-screen flex flex-col overflow-y-auto " style={{ backgroundColor: "beige " }}>
        {isopen ? <div className="flex flex-col gap-4 items-center fixed p-2 z-10  left-0 top-35 shadow-2xl w-42 sm:w-72 bg-stone-300/10 border-r-2">
          {user?.role==="admin"?<NavLink to={'/create'}>Post Product</NavLink>:null}
          {user?.role==="admin"?<NavLink to={'/myProduct'}>My Product</NavLink>:null}

          {user ? <button className="w-72" onClick={Logout}>Logout</button> : null}
          {user ? <NavLink to={'/Account'}>Account</NavLink>:null}

        </div> : null}

        <div className="flex justify-between p-4">

          <Menu onClick={sideMenu} className="sm:w-8 h-8 cursor-pointer" />

          <div className="flex  items-center">
            <p className="text-xl font-medium">filter:</p>
            <select name="filter" className="outline-none " value={filter} onChange={(e) => setFilter(e.target.value)} >
              <option  value="">None</option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="flex">
            <NavLink to={'/cart'}> <ShoppingCart className="sm:w-8 h-8 cursor-pointer" /></NavLink>
            {cart.length > 0 ? <h1 className="text-white text-xl h-8 px-2 ml-[-6px] mt-[-6px] bg-blue-500 rounded-2xl">{cart.length}</h1> : null}
          </div>



        </div>





        <div className={`h-screen flex flex-wrap box-border justify-center gap-12 md:gap-12 sm:gap-24 p-4 w-full ${isopen ? "pointer-events-none blur-xs" : "pointer-events-auto blur-none"} `}>
          {product.length > 0 && filteredProduct ? (

            filteredProduct.map((p, index) => (
              <div key={p._id} className="max-w-md sm:w-72 h-42 sm:h-62 rounded-2xl box-border  flex gap-4 items-center flex-col  shadow-2xl" style={{ backgroundColor: p.bgcolor, color: p.textcolor }}>

                <img src={p.image.url} alt={p.name} className="object-cover sm:w-58 w-38  box-border mt-2 sm:mt-4 h-28 sm:h-42 " />
                <div className=" h-full w-full rounded-b-xl sm:rounded-b-2xl sm:p-3 p-2 flex justify-between" style={{ backgroundColor: p.panelcolor }}>
                  <div>
                    <h1 className="sm:text-2xl font-medium">{p.name}</h1>
                    <h2 className="sm:text-xl ">${p.price}</h2>

                  </div>
                  {count[index] === 0 ? (
                    <button onClick={() => handleCount(p._id, "inc")} className="sm:py-2 cursor-pointer sm:px-4 px-2 rounded-md bg-orange-400 text-white sm:text-2xl font-medium">+</button>
                  ) : (
                    <div className="flex sm:w-22 w-14 py-2 px-2 rounded-md bg-green-400 cursor-pointer  text-white text-xl font-medium items-center justify-center gap-2">
                      <button className="sm:text-3xl cursor-pointer font-medium" onClick={() => handleCount(p._id, "dec")}>-</button>
                      <p>{count[index]}</p>
                      <button className="sm:text-3xl cursor-pointer font-medium" onClick={() => handleCount(p._id, "inc")}>+</button>
                    </div>

                  )}

                </div>




              </div>
            ))
          ) : filteredProduct.length === 0 ? (<div className="flex text-3xl text-amber-300 text-center">No products yet..</div>) : (
            <div className="flex text-3xl text-amber-300 text-center">No products yet..</div>
          )}



        </div>

      </div>



    </>
  )
}



export default Home;