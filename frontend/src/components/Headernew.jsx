import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Btn from "./btn";
import ThemeToggle from "./ToggleBtn";
import Categories from "./cat";


// when user is not logged in this will appear on the landing page-mihika
function Header() {

  return (
    <>
      <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
          <nav className="classy-navbar" id="essenceNav">
            <Link className="nav-brand" href="/">
              <Image
                width={50}
                height={50}
                src="/img/core-img/logo.png"
                alt=""
              />
              Bestglobeshop
            </Link>
            <div className="classy-navbar-toggler">
              <span className="navbarToggler">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div className="classy-menu">
              <div className="classycloseIcon">
                <div className="cross-wrap">
                  <span className="top" />
                  <span className="bottom" />
                </div>
              </div>
              <div className="classynav">
                <ul>
                  <li id="shop_nav">
                    <a href="#">Shop</a>
                    {/* <Categories /> */}
                  </li>
                  <li>
                    <a>More</a>
                    <ul className="dropdown">
                      <Btn name={"Home"} url={"/"} />
                      <Btn name={"Product"} url={"/product"} />
                      <Btn name={"Announcement"} url={"/announcement"} />
                    </ul>
                  </li>
                  <Btn name={"Blog"} url={"/Blog"} />
                  <Btn name={"Contact"} url={"/contact"} />
                </ul>
              </div>
            </div>
          </nav>
          <div className="header-meta d-flex clearfix justify-content-end">
            <div className="search-area">
              <form method="get" action="/search/">
                <input
                  type="search"
                  name="query"
                  id="headerSearch"
                  placeholder="Type for search"
                />
                <button type="submit">
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </form>
            </div>
            <div className="favourite-area">
              <Link href="/wishlist">
                <Image
                  width={25}
                  height={25}
                  src="/img/core-img/heart.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="user-login-info">
              <Link href="/UserProfile">
                Hi User!
                <img
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" , marginLeft:"10px"}}
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />{" "}
              </Link>
            </div>
            <div className="cart-area">
              {/* fixed the path to cart */}
              <Link href="/cart/cart_detail/" id="essenceCartBtn">
                <Image
                  src="/../img/core-img/bag.svg"
                  width={25}
                  height={25}
                  alt=""
                />
                <span>•</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
