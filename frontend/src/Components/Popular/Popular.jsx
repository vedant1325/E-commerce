import React, { useEffect, useState } from 'react'
import './Popular.css'

import Items from '../Items/Items'

const Popular = () => {
  const url="https://backend-p5n2.onrender.com"
  const[women_popular,setWomen_Popular]=useState([]);
  useEffect(()=>{
    fetch(url+'/popularinwomen')
    .then((response)=>response.json()).then((data)=>{setWomen_Popular(data)})
  },[])
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {women_popular.map((item,i)=>{
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        } )}
      </div>
    </div>
  )
}

export default Popular
