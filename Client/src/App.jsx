import React, { useState } from "react";
import Login from "../pages/Login";
import { NavLink, Route, Routes } from "react-router";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProductCreate from "../pages/productCreate";
import Cart from "../pages/Cart";
import MyProduct from "../pages/myProduct";
import UpdateProduct from "../pages/Updateproduct";
import Account from "../pages/Account";
import Order from "../pages/Order";



const App = () => {
  


  return (
    <>
      <div className="bg-stone-400 shadow-xl flex justify-between  items-center  fixed left-0 right-0 p-6 z-10">
        <h1 className="font-medium text-2xl sm:text-4xl text-orange-400">thecart</h1>
        <div className="flex gap-12">
          <NavLink className='text-white font-medium sm:text-xl' to={'/'}>Home</NavLink>
          <NavLink className='text-white font-medium sm:text-xl' to={'/login'}>Login</NavLink>


        </div>
      </div>

      <div className="min-h-screen pt-20 sm:pt-22  w-full">
        <Routes>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<ProductCreate />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/myProduct" element={<MyProduct/>}></Route>
          <Route path="/update/:id" element={<UpdateProduct/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/Order" element={<Order />}></Route>

        </Routes>

      </div>






    </>
  )
}



export default App