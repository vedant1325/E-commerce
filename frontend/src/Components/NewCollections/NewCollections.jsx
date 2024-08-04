import React, { useEffect, useState } from 'react'
import './NewCollections.css'

import Items from '../Items/Items'

const NewCollections = () => {
  const url="https://backend-p5n2.onrender.com"
  let [new_collection,setNew_Collection]=useState([]);
  useEffect(()=>{
 fetch(url+'/newcollection')
 .then((response)=>response.json())
 .then((data)=>{setNew_Collection(data)})

  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        {new_collection.map((item,i)=>{
            return<Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

        })}
      </div>
    </div>
  )
}

export default NewCollections
