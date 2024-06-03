import React, { useState } from "react";
import Header from "@/components/header";
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });
      // Also store the username and password in cookies for further use
      Cookies.set('username', username);
      Cookies.set('password', password);
      router.push('/indexnew');
      alert('Logging you in')
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Header />
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/img/product-img/product-3.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form method="post" onSubmit={handleLogin}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i style={{ color: "#ff6219" }}> </i>
                          <span className="h1 fw-bold mb-0">
                            <img src="/img/core-img/logo.png" alt="" />
                          </span>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                          Login to your account
                        </h5>
                        <label htmlFor="username">Username:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Login
                          </button>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <a className="small text-muted" href="/registration/Password_reset_from">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Do not have an account? &rarr; <a href="Signup" style={{ color: "black" }}>Register here</a>
                        </p>
                        <a href="#!" className="small text-muted">Terms of use.</a>
                        <a href="#!" className="small text-muted">Privacy policy</a>
                      </form>
                      {/* <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

axios.interceptors.request.use(
  config => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default Login;
