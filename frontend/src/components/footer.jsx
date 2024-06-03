import React from "react";
import Image from "next/image";


export default function Footer(){
    return(
        <>
        <footer className="footer_area clearfix">
  <div className="container">
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="single_widget_area d-flex mb-30">
          <div className="footer-logo mr-50">
            <a href="#">
              <Image src="/img/core-img/logo.png" alt="" width={100} height={100}/>
            </a>
          </div>
          <div className="footer_menu">
            <ul>
              <li>
                <a href="{% url 'product' %}">Shop</a>
              </li>
              <li>
                <a href="{% url 'blog' %}">Blog</a>
              </li>
              <li>
                <a href="{% url 'contact_page' %}">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="single_widget_area mb-30">
          <ul className="footer_widget_menu">
            <li>
              <a href="#">Order Status</a>
            </li>
            <li>
              <a href="#">Payment Options</a>
            </li>
            <li>
              <a href="#">Shipping and Delivery</a>
            </li>
            <li>
              <a href="#">Guides</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row align-items-end">
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
                <i className="fa fa-long-arrow-right" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="single_widget_area">
          <div className="footer_social_area">
            <a
              href="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Facebook"
            >
              <i className="fa fa-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/bestglobeshop?igshid=ZDdkNTZiNTM="
              data-toggle="tooltip"
              data-placement="top"
              title="Instagram"
            >
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/Bestglobeshop"
              data-toggle="tooltip"
              data-placement="top"
              title="Twitter"
            >
              <i className="fa fa-twitter" aria-hidden="true" />
            </a>
            <a
              href="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Pinterest"
            >
              <i className="fa fa-pinterest" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC9wKLWmjG9DUImnlfqoY0KA"
              data-toggle="tooltip"
              data-placement="top"
              title="Youtube"
            >
              <i className="fa fa-youtube-play" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-12 text-center">
        <p>
        </p>
      </div>
    </div>
  </div>
</footer>

        </>
    )
}