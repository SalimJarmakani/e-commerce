
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

  const [order,setOrder] = useState({});

  const [errorMessage, setErrorMessage]= useState('');

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


    const {cart} = await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async () =>
  {

    const newCart= await commerce.cart.refresh();

    setCart(newCart);
  }
  const handleCaptureCheckout= async (checkoutTokenId, newOrder)=> {
     
    try {
      const incomingOrder= await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

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
                  <NavBar totalItems={0} />

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

                   <Checkout error={errorMessage} onCaptureCheckout={handleCaptureCheckout} order={order} cart={cart}/>

                   </>
              }/>
           </Routes>
       </div>
    </Router>
  )
}

export default App