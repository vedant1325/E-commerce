
import React, { useContext } from 'react'
//import ShopCategory from './ShopCategory'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import all_product from '../Components/Assets/all_product';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Product = () => {
 const{all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const product = all_product.find((e)=>e.id===Number(productId))
  return (
    <div>
      <Breadcrums product={product}/>
    <ProductDisplay product={product}/>
    <Descriptionbox />
    <RelatedProduct product={product}/>
    </div>
  )
}

export default Product
