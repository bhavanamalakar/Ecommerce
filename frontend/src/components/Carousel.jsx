import React from 'react';

const Carousel = ({products}) => {

  return (
    <div className="carousel">
    {products.map((product, index) => (
      <div className="carousel-item" key={index}>
        <img src={product.images[0]} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        {/* You can add more product details or actions here */}
      </div>
    ))}
  </div>
  )
};

export default Carousel;
