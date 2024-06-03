import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";

const CartPage = () => {
  const [cartData, setCartData] = useState({ length: 0, items: [], grandTotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartData = async () => {
    try {
      const username = Cookies.get('username'); 
      const password = Cookies.get('password'); 
      const response = await axios.get(`http://localhost:8000/api/carts/`, {
        auth: {
          username: username,
          password: password,
        },
      });
      
      const cart = response.data[0]; 
      const cartItems = cart.items.map(item => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subTotal: item.sub_total,
        image: item.product.image_url || "/placeholder_image.jpg", 
      }));

      setCartData({
        length: cartItems.length,
        items: cartItems,
        grandTotal: cart.grand_total,
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading cart data: {error.message}</p>;
  }

  const { length: cartLength, items: cartItems, grandTotal } = cartData;

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cartLength} items</h5>
              </div>
              <div className="card-body">
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <Image
                            src={item.image}
                            className="w-100"
                            alt={item.name}
                            width={100}
                            height={100}
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                        <p>Price: ₹{item.price}</p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm mb-2"
                        >
                          <i className="fa fa-heart"></i>
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <button className="btn btn-primary px-3 me-2">
                            <i className="fa fa-minus"></i>
                          </button>
                          <div className="form-outline">
                            <input
                              readOnly
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control"
                            />
                            <br />
                            <label className="form-label" htmlFor="form1">
                              Quantity
                            </label>
                          </div>
                          <button className="btn btn-primary px-3 ms-2">
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>₹{item.subTotal}</strong>
                        </p>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                {/* Payment method images can be added here */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>₹{grandTotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>₹{grandTotal}</strong>
                    </span>
                  </li>
                </ul>
                <Link href="/checkout">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Go to checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
