
import React, { useEffect, useState } from 'react';

import {commerce} from './lib/commerce';

import Products from './components/products/products';

import NavBar from './components/Navbar/Navbar';

import Cart from './components/Cart/Cart';

import Checkout from './components/Checkout/Checkout';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {

  const [products, setProducts] = useState([]);

  const [cart,setCart]= useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {

    
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId,quantity) => {

    const item = await commerce.cart.add(productId,quantity);

    setCart(item.cart);
  }

  const handleCartQuantity = async (productId,quantity) => {

    const {cart}= await commerce.cart.update(productId,{quantity});

    setCart(cart);
  }

  const handleRemove = async (productId) => {

    const {cart} = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmpty = async () => {


    const {action} = await commerce.cart.empty();

    setCart(action);
  }

  useEffect(() => {
    
    fetchProducts();

    fetchCart();

  },[]);



   console.log(cart)
  return (

    <Router>
       <div >
           <Routes>
              <Route  path="/" element= {

                <>
                 <NavBar totalItems={cart.total_items} />
                 <Products products= {products} onAddToCart = {handleAddToCart} />
                 </>
              }/>

              <Route path="/cart" element={
                <>
                  <NavBar totalItems={cart.total_items} />

                  <Cart cart={cart} 
                  handleRemove={handleRemove}
                  handleEmpty={handleEmpty}    
                  handleCartQuantity={handleCartQuantity}
                  /> 
                </>
              }/>
               

              <Route path="/checkout" element={
                  <>
                   <NavBar totalItems={cart.total_items}/>

                   <Checkout/>

                   </>
              }/>
           </Routes>
       </div>
    </Router>
  )
}

export default App