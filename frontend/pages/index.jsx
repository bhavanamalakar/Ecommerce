import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
      axios
        .get('http://localhost:8000/api/cart/')
        .then(response => setCartItems(response.data))
        .catch(error => console.error('Error fetching cart:', error));
    }
  }, []);

  const addToCart = item => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert('Please log in to add items to the cart');
      router.push('/registration/Login');
      return;
    }

    axios
      .post('http://localhost:8000/api/cart/', { price: item.price })
      .then(response => {
        if (response.status === 200) {
          setCartItems(prevCartItems => [...prevCartItems, item]);
        
        }
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
        alert("Please log in to continue adding items to car")
      });
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
              <div className="col-12 col-sm-6 col-md-4">
                <div
                  className="single_catagory_area d-flex align-items-center justify-content-center bg-img"
                  style={{ backgroundImage: "url('/img/bg-img/bg-2.jpg')" }}
                >
                  <div className="catagory-content">
                    <a href="#">Clothing</a>
                  </div>
                </div>
              </div>
              {/* Single Category */}
              <div className="col-12 col-sm-6 col-md-4">
                <div
                  className="single_catagory_area d-flex align-items-center justify-content-center bg-img"
                  style={{ backgroundImage: "url('/img/bg-img/bg-3.jpg')" }}
                >
                  <div className="catagory-content">
                    <a href="#">Shoes</a>
                  </div>
                </div>
              </div>
              {/* Single Category */}
              <div className="col-12 col-sm-6 col-md-4">
                <div
                  className="single_catagory_area d-flex align-items-center justify-content-center bg-img"
                  style={{ backgroundImage: "url('/ img/bg-img/bg-4.jpg')" }}
                >
                  <div className="catagory-content">
                    <a href="#">Accessories</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Area */}
        <div className="cta-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="cta-content bg-img background-overlay"
                  style={{ backgroundImage: "url('img/bg-img/bg-5.jpg')" }}
                >
                  <div className="h-100 d-flex align-items-center justify-content-end">
                    <div className="cta--text">
                      <h6>-60%</h6>
                      <h2>Global Sale</h2>
                      <a href="#" className="btn essence-btn">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  {products.map(product => (
                    <div key={product.id} className="single-product-wrapper">
                      <div className="product-img">
                        <img src={product.image} alt={product.name} width="100" height='100' />
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
          <div className="single-brands-logo">
            <Image src="/img/core-img/brand1.png" alt="" width={500} height={300} />
          </div>
          <div className="single-brands-logo">
          <Image src="/img/core-img/brand2.png" alt="" width={500} height={300} />

          </div>
          <div className="single-brands-logo">
            <Image src="/img/core-img/brand3.png" alt="" width={500} height={300} />
          </div>
          <div className="single-brands-logo">
            <Image src="/img/core-img/brand4.png" alt="" width={500} height={300} />
          </div>
          <div className="single-brands-logo">
            <Image src="/img/core-img/brand5.png" alt="" width={500} height={300} />
          </div>
          <div className="single-brands-logo">
            <Image src="/img/core-img/brand6.png" alt="" width={500} height={300} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
