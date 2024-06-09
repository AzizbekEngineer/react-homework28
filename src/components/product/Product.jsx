import React, { useEffect, useState } from "react";

const Product = ({ data }) => {
  let productItem = data?.map((product) => (
    <div key={product.id} className="product__card">
      <div className="product__img">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="product__info">
        <h3>{product.title}</h3>
        <h3>{product.category}</h3>
        <p>{product.price}</p>
        <p>{product.count}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <h2>Product</h2>
      <div className="product__cards">{productItem}</div>
    </div>
  );
};

export default Product;
