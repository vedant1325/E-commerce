/*import React, { useContext } from 'react'
import all_product from '../Components/Assets/all_product'
import Items from '../Components/Items/Items'
import './CSS/LatestCollection.css'
import { ShopContext } from '../Context/ShopContext'

const LatestCollection = (props) => {
  const[all_product]=useContext(ShopContext);

  return (
    <div className='latestcollection'>
        <h1>Latest Collection's</h1>
        <hr/>
<div className="latestcollection-item">
    
        {all_product.map((item,i)=>{
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
</div>
      
    </div>
  )
}

export default LatestCollection
*/

import React, { useContext } from 'react'
import './CSS/LatestCollection.css'
import { ShopContext } from '../Context/ShopContext'

import Items from '../Components/Items/Items'


const LatestCollection = (props) => {
    const{all_product}=useContext(ShopContext)
  return (
    <div className='latestcollection'>
      <h1>Latest Collection's</h1>
      <hr/>

    
      <div className="latestcollection-item">
        {all_product.map((item,i)=>{
          
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          
        })}
      </div>
      </div>
      
  
  )
}

export default LatestCollection
