import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);
const url="https://backend-p5n2.onrender.com";

const getDedfaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const[all_product,setAll_Product]=useState([]);

  const [cartItems, setCartItems] = useState(getDedfaultCart());

  useEffect(()=>{
    fetch(url+'/allproduct')
    .then((res)=>res.json())
    .then((data)=>setAll_Product(data))
    if(localStorage.getItem('auth-token')){
      fetch(url+'/getcart',{
        method:"POST",
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':"application/json"
        },
        body:"",
      }).then((response)=>response.json())
      .then((data)=>setCartItems(data))
    }
  },[])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]:prev[itemId] + 1,
    }));
    if(localStorage.getItem('auth-token')){
      fetch(url+'/addtocart',{
        method:"POST",
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}) ,
      })
      .then((response)=>response.json())
      .then((data)=>{console.log(data)})
    }
    
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if(localStorage.getItem('auth-token')){
      fetch(url+'/removefromcart',{
        method:"POST",
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}) ,
      })
      .then((response)=>response.json())
      .then((data)=>{console.log(data)})
    }
    
  };

  const getTotalCartAmount = () => {
   let  totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0)
         {
        let itemInfo = all_product.find((product) => product.id===Number(item))
           totalAmount +=itemInfo.new_price*cartItems[item];
  }
};


return totalAmount;
}

const getTotalItems=()=>{
  let totalItem=0;
  for(const item in cartItems)
  {
    if(cartItems[item]>0){
      totalItem+=cartItems[item]
    }
  }
  return totalItem
}


  const contextValue = {getTotalItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {" "}
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
