import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "@/components/Headernew";
import Footer from "@/components/Footer";
import Image from "next/image";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cart/")
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const addToCart = async (item) => {
    try {
      const username = Cookies.get('username'); 
      const password = Cookies.get('password'); 
      const response = await axios.post("http://localhost:8000/api/carts/{cart_id}/items/", {
        product_id: item.id,
        quantity: 1,
      }, {
        auth: {
          username: username,
          password: password,
        }
      });

      if (response.status === 201) {
        setCartItems((prevCartItems) => [...prevCartItems, item]);
        alert("Item has been successfully added to cart!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <Header />
      <div>
        {/* Welcome Area */}
        <section
          className="welcome_area bg-img background-overlay"
          style={{ backgroundImage: "url('/img/bg-img/bg-1.jpg')" }}
        >
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="hero-content">
                  <h6>asoss</h6>
                  <h2>New Collection</h2>
                  <a href="#" className="btn essence-btn">
                    view collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Category Area */}
        <div className="top_catagory_area section-padding-80 clearfix">
          <div className="container">
            <div className="row justify-content-center">
              {/* Single Category */}
              {/* Add your single category JSX here */}
            </div>
          </div>
        </div>

        {/* CTA Area */}
        <div className="cta-area">
          {/* Add your CTA JSX here */}
        </div>

        {/* New Arrivals Area */}
        <section className="new_arrivals_area section-padding-80 clearfix">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Popular Products</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="popular-products-slides owl-carousel">
                  {products.map((product) => (
                    <div key={product.id} className="single-product-wrapper">
                      <div className="product-img">
                        <img src={product.image} alt={product.name} width="100" height='100'/>
                        <Image
                          className="hover-img"
                          src={product.hoverImage}
                          alt={product.name}
                        />
                        <div className="product-favourite">
                          <a href="#" className="favme fa fa-heart"></a>
                        </div>
                      </div>
                      <div className="product-description">
                        <span>{product.brand}</span>
                        <a href="single-product-details.html">
                          <h6>{product.name}</h6>
                        </a>
                        <p className="product-price">${product.price}</p>
                        <div className="hover-content">
                          <div className="add-to-cart-btn">
                            <a
                              className="btn essence-btn"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Area */}
        <div className="brands-area d-flex align-items-center justify-content-between">
          {/* Add your brands JSX here */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
