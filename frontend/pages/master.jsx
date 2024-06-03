import React from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

const MyComponent = () => {
  return (
    <html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Title */}
        <title>Bestglobeshop</title>
        {/* Favicon */}
        <link rel="icon" href="../static/img/core-img/favicon.ico" />
        {/* Core Style CSS */}
        <link rel="stylesheet" href="../static/css/core-style.css" />
        <link rel="stylesheet" href="../static/style.css" />
      </Head>
      <body>
        <header className="header_area">
          <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            {/* Classy Menu */}
            <nav className="classy-navbar" id="essenceNav">
              {/* Logo */}
              <Link className="nav-brand" href="/index">
                <img
                  style={{
                    height: "25%",
                    width: "25%",
                    maxHeight: "fit-content",
                    maxWidth: "fit-content",
                  }}
                  src="../static/img/core-img/logo.png"
                  alt="Bestglobeshop"
                />
                Bestglobeshop
              </Link>
              {/* Navbar Toggler */}
              <div className="classy-navbar-toggler">
                <span className="navbarToggler">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              {/* Menu */}
              <div className="classy-menu">
                {/* close btn */}
                <div className="classycloseIcon">
                  <div className="cross-wrap">
                    <span className="top"></span>
                    <span className="bottom"></span>
                  </div>
                </div>
                {/* Nav Start */}
                <div className="classynav">
                  <ul>
                    <li id="shop_nav">
                      <a href="#">Shop</a>
                      <div className="megamenu">
                        {/* Dynamically generated menu items */}
                        {/* {category.map(cat => (
                                                    <ul key={cat.id} className="single-mega cn-col-4">
                                                        <li className="title"><a href={`#${cat.id}`}>{cat.name}</a></li>
                                                        {cat.subcategory_set.all().map(subcat => (
                                                            <div key={subcat.id} id={cat.id}>
                                                                <li><a href={`/product/?category=${subcat.id}`}>{subcat.name}</a></li>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                ))} */}
                        {/* Static example */}
                        {/* <div className="single-mega cn-col-4">
                                                    <img src="../static/img/bg-img/bg-6.jpg" alt="" />
                                                </div> */}
                      </div>
                    </li>
                    <li>
                      <Link href="#">More</Link>
                      <ul className="dropdown">
                        <li>
                          <Link href="/index">Home</Link>
                        </li>
                        <li>
                          <Link href="/product">Shop</Link>
                        </li>
                        <li>
                          <Link href="/announcement">Announcements</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/blog">Blog</a>
                    </li>
                    <li>
                      <a href="/contact_page">Contact</a>
                    </li>
                  </ul>
                </div>
                {/* Nav End */}
              </div>
            </nav>
            {/* Header Meta Data */}
            <div className="header-meta d-flex clearfix justify-content-end">
              {/* Search Area */}
              <div className="search-area">
                <form method="get" action="/search/">
                  <input
                    type="search"
                    name="query"
                    id="headerSearch"
                    placeholder="Type for search"
                  />
                  <button type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
              {/* Favourite Area */}
              <div className="favourite-area">
                {/* Conditionally render based on user authentication */}
                {/* {user.is_authenticated ? (
                                    <a href="#"><img src="../static/img/core-img/heart.svg" alt="" /></a>
                                ) : (
                                    <a href="/login"><img src="../static/img/core-img/heart.svg" alt="" /></a>
                                )} */}
              </div>
              {/* User Login Info */}
              <div className="user-login-info">
                {/* Conditionally render based on user authentication */}
                {/* {user.is_authenticated ? (
                                    <a href="/logout">Logout</a>
                                ) : (
                                    <a href="/login">Login</a>
                                )} */}
              </div>
              {/* Cart Area */}
              <div className="cart-area">
                <Link href="/cart/cart-detail/" id="essenceCartBtn">
                  <img src="../static/img/core-img/bag.svg" alt="" />
                  <span>&bull;</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        {/* Content Block */}
        <div>
          {/* Render block body content */}
          {/* {children} */}
        </div>
        {/* Footer */}
        <footer className="footer_area clearfix">
          <div className="container">
            <div className="row">
              {/* Single Widget Area */}
              <div className="col-12 col-md-6">
                <div className="single_widget_area d-flex mb-30">
                  {/* Logo */}
                  <div className="footer-logo mr-50">
                    <Link href="#">
                      <img src="../static/img/core-img/logo.png" alt="" />
                    </Link>
                  </div>
                  {/* Footer Menu */}
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <Link href="/product">Shop</Link>
                      </li>
                      <li>
                        <Link href="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link href="/contact_page">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Single Widget Area */}
              <div className="col-12 col-md-6">
                <div className="single_widget_area mb-30">
                  <ul className="footer_widget_menu">
                    <li>
                      <Link href="#">Order Status</Link>
                    </li>
                    <li>
                      <Link href="#">Payment Options</Link>
                    </li>
                    <li>
                      <Link href="#">Shipping and Delivery</Link>
                    </li>
                    <li>
                      <Link href="#">Guides</Link>
                    </li>
                    <li>
                      <Link href="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="#">Terms of Use</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              {/* Single Widget Area */}
              <div className="col-12 col-md-6">
                <div className="single_widget_area">
                  <div className="footer_heading mb-30">
                    <h6>Subscribe</h6>
                  </div>
                  <div className="subscribtion_form">
                    <form action="#" method="post">
                      <input
                        type="email"
                        name="mail"
                        className="mail"
                        placeholder="Your email here"
                      />
                      <button type="submit" className="submit">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Single Widget Area */}
              <div className="col-12 col-md-6">
                <div className="single_widget_area">
                  <div className="footer_social_area">
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Facebook"
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a
                      href="https://instagram.com/bestglobeshop?igshid=ZDdkNTZiNTM="
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Instagram"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a
                      href="https://twitter.com/Bestglobeshop"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Twitter"
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Pinterest"
                    >
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UC9wKLWmjG9DUImnlfqoY0KA"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Youtube"
                    >
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 text-center">
                <p>
                  {/* Link back to Bestglobeshop can't be removed. Template is licensed under Bestglobeshop Org */}
                  Copyright &copy;{" "}
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved | Made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
                  <a href="https://bestglobeshop.com" target="_blank">
                    Bestglobeshop
                  </a>
                  , distributed by Bestglobeshop Team.
                  {/* Link back to Bestglobeshop can't be removed. Template is licensed under Bestglobeshop Org */}
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* JavaScript */}
        <Script
          src="../static/js/jquery/jquery-2.2.4.min.js"
          strategy="lazyOnload"
        />
        <Script src="../static/js/popper.min.js" strategy="lazyOnload" />
        <Script src="../static/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="../static/js/plugins.js" strategy="lazyOnload" />
        <Script src="../static/js/classy-nav.min.js" strategy="lazyOnload" />
        <Script src="../static/js/active.js" strategy="lazyOnload" />
      </body>
    </html>
  );
};

export default MyComponent;
