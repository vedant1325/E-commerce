import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Items from "../Components/Items/Items";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategorybanner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <span>Showing 1-12</span> out of 36 products
        <div className="shopcategory-sort">
          Sort by
          <img src={dropdown_icon} alt="Sort dropdown" />
        </div>
      </div>
      <div className="shopcategory-product">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Items
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null; // Explicitly return null if condition is not met
        })}
      </div>
      <Link style={{ textDecoration: "none" }} to="/latest">
        <div className="loadMore">Explore More</div>
      </Link>
    </div>
  );
};

export default ShopCategory;
