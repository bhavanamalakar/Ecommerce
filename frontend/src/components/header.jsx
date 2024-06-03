import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Btn from "./Btn";
import ThemeToggle from "./ToggleBtn";

function Check() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <a onClick={() => signOut()} href="#">
          Logout
        </a>
      </>
    );
  }
  return (
    <>
      <a onClick={() => signIn()} href="#">
        Signin
      </a>
    </>
  );
}

function Header() {
  return (
    <>
      <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
          <nav className="classy-navbar" id="essenceNav">
            <Link className="nav-brand" href="/" passHref>
              <Image
                width={50}
                height={50}
                src="/img/core-img/logo.png"
                alt="Bestglobeshop"
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
                    <div className="megamenu">
                      <ul className="single-mega cn-col-4">
                        <li className="title">Women Collection</li>
                        <li>
                          <Link href="/shop">Dresses</Link>
                        </li>
                        <li>
                          <Link href="/shop">Blouses &amp; Shirts</Link>
                        </li>
                        <li>
                          <Link href="/shop">T-shirts</Link>
                        </li>
                        <li>
                          <Link href="/shop">Rompers</Link>
                        </li>
                        <li>
                          <Link href="/shop">Bras &amp; Panties</Link>
                        </li>
                      </ul>
                      <ul className="single-mega cn-col-4">
                        <li className="title">Men Collection</li>
                        <li>
                          <Link href="/shop">T-Shirts</Link>
                        </li>
                        <li>
                          <Link href="/shop">Polo</Link>
                        </li>
                        <li>
                          <Link href="/shop">Shirts</Link>
                        </li>
                        <li>
                          <Link href="/shop">Jackets</Link>
                        </li>
                        <li>
                          <Link href="/shop">Trench</Link>
                        </li>
                      </ul>
                      <ul className="single-mega cn-col-4">
                        <li className="title">Kids Collection</li>
                        <li>
                          <Link href="/shop">Dresses</Link>
                        </li>
                        <li>
                          <Link href="/shop">Shirts</Link>
                        </li>
                        <li>
                          <Link href="/shop">T-shirts</Link>
                        </li>
                        <li>
                          <Link href="/shop">Jackets</Link>
                        </li>
                        <li>
                          <Link href="/shop">Trench</Link>
                        </li>
                      </ul>
                      <div className="single-mega cn-col-4">
                        <Image
                          src="/img/bg-img/bg-6.jpg"
                          alt="Mega Menu Image"
                          width={300}
                          height={200}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#">More</a>
                    <ul className="dropdown">
                      <Btn name="Home" url="/" />
                      <Btn name="Product" url="/product" />
                      <Btn name="Announcement" url="/announcement" />
                    </ul>
                  </li>
                  <Btn name="Blog" url="/Blog" />
                  <Btn name="Contact" url="/contact" />
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
              <Link href="/wishlist" passHref>
                <Image
                  width={25}
                  height={25}
                  src="/img/core-img/heart.svg"
                  alt="Wishlist"
                />
              </Link>
            </div>
            <div className="user-login-info">
              <Link href="/registration/Login">Signin</Link>
           
            </div>
            <div className="cart-area">
              <Link href="/cart/cart_detail" passHref>
                <div id="essenceCartBtn">
                  <Image
                    src="/img/core-img/bag.svg"
                    width={25}
                    height={25}
                    alt="Cart"
                  />
                  <span>•</span>
                </div>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* CSS */}
      <style jsx>{`
        .custom-dropdown {
          list-style: none;
          padding: 0;
        }
      `}</style>
    </>
  );
}

export default Header;
