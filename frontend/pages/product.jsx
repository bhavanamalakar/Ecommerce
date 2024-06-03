import React from 'react';
import Link from 'next/link';

const ProductPage = ({ product, category, brand, product_count }) => {
    return (
        <div>
            {/* Load static */}
            <link rel="stylesheet" href="../static/style.css" />
            <link rel="stylesheet" href="../static/css/core-style.css" />

            {/* If product length is less than 1 */}
            {product.length < 1 ? (
                <div className="container">
                    <br /><br /><br /><br /><br />
                    <center>
                        <img src="../static/img/bg-img/404.png" alt="" />
                        <h1><b>OPPS!</b> We Couldn’t Find this Product</h1>
                        <p>Uh... So it looks like you broke something. The page you are looking for has up and Vanished.</p>
                        <h2><Link href="/index">Bring me back Home</Link></h2>
                    </center>
                </div>
            ) : (
                <div>
                    {/* Breadcumb Area */}
                    <div className="breadcumb_area bg-img" style={{ backgroundImage: 'url(/img/bg-img/breadcumb.jpg)' }}>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-12">
                                    <div className="page-title text-center">
                                        <h2>Shop</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop Grid Area */}
                    <section className="shop_grid_area section-padding-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div className="shop_sidebar_area">
                                        {/* Single Widget */}
                                        <div className="widget catagory mb-50">
                                            {/* Widget Title */}
                                            <h6 className="widget-title mb-30">Catagories</h6>
                                            {/* Catagories */}
                                            <div className="catagories-menu">
                                                <ul id="menu-content2" className="menu-content collapse show">
                                                    {category.map(cat => (
                                                        <li key={cat.id} data-toggle="collapse" data-target={`#${cat.name}`}>
                                                            <a href="#">{cat.name}</a>
                                                            <ul className="sub-menu collapse show" id={cat.name}>
                                                                {cat.subcategory_set.all().map(subcat => (
                                                                    <li key={subcat.id}><a href={`/product/?category=${subcat.id}`}>{subcat.name}</a></li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Single Widget */}
                                        <div className="widget price mb-50">
                                            {/* Widget Title */}
                                            <h6 className="widget-title mb-30">Filter by</h6>
                                            {/* Widget Title 2 */}
                                            <p className="widget-title2 mb-30">Price</p>
                                            <div className="widget-desc">
                                                <div className="slider-range">
                                                    <div className="range-price">Range: ₹100.00 - ₹20000.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Single Widget */}
                                        <div className="widget color mb-50">
                                            {/* Widget Title 2 */}
                                            <p className="widget-title2 mb-30">Color</p>
                                            <div className="widget-desc">
                                                <ul className="d-flex">
                                                    <li><a href="#" className="color1"></a></li>
                                                    <li><a href="#" className="color2"></a></li>
                                                    <li><a href="#" className="color3"></a></li>
                                                    <li><a href="#" className="color4"></a></li>
                                                    <li><a href="#" className="color5"></a></li>
                                                    <li><a href="#" className="color6"></a></li>
                                                    <li><a href="#" className="color7"></a></li>
                                                    <li><a href="#" className="color8"></a></li>
                                                    <li><a href="#" className="color9"></a></li>
                                                    <li><a href="#" className="color10"></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Single Widget */}
                                        <div className="widget brands mb-50">
                                            {/* Widget Title 2 */}
                                            <p className="widget-title2 mb-30">Brands</p>
                                            <div className="widget-desc">
                                                <ul>
                                                    {brand.map(brand => (
                                                        <li key={brand.id}><a href={`/product/?brand=${brand.name}`}>{brand.name}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-8 col-lg-9">
                                    <div className="shop_grid_product_area">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="product-topbar d-flex align-items-center justify-content-between">
                                                    {/* Total Products */}
                                                    <div className="total-products">
                                                        <p><span>{product_count}</span> products found</p>
                                                    </div>
                                                    {/* Sorting */}
                                                    <div className="product-sorting d-flex">
                                                        <p>Sort by:</p>
                                                        <form action="#" method="get">
                                                            <select name="select" id="sortByselect">
                                                                <option value="value">Highest Rated</option>
                                                                <option value="value">Newest</option>
                                                                <option value="value">Price: $$ - $</option>
                                                                <option value="value">Price: $ - $$</option>
                                                            </select>
                                                            <input type="submit" className="d-none" value="" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {product.map(prod => (
                                                <div key={prod.id} className="col-12 col-sm-6 col-lg-4">
                                                    <div className="single-product-wrapper">
                                                        {/* Product Image */}
                                                        <div className="product-img">
                                                            <img src={`/media/${prod.image}`} alt="" />
                                                            <img className="hover-img" src={`/media/${prod.image}`} alt="" />
                                                            {/* Product Badge */}
                                                            {prod.discount && prod.new_or_not && (
                                                                <div>
                                                                    <div className="product-badge new-badge">
                                                                        <span>New</span>
                                                                    </div>
                                                                    <div className="product-badge offer-badge">
                                                                        <span>-{prod.discount_percentage}%</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {!prod.discount && (
                                                                <div className="product-badge offer-badge">
                                                                    <span>-{prod.discount_percentage}%</span>
                                                                </div>
                                                            )}
                                                            {!prod.new_or_not && (
                                                                <div className="product-badge new-badge">
                                                                    <span>New</span>
                                                                </div>
                                                            )}
                                                            {/* Favourite */}
                                                            <div className="product-favourite">
                                                                <a href="#" className="favme fa fa-heart"></a>
                                                            </div>
                                                        </div>
                                                        {/* Product Description */}
                                                        <div className="product-description">
                                                            <span>{prod.brand}</span>
                                                            <a href={`/${prod.id}`}>
                                                                <h6>{prod.name}</h6>
                                                            </a>
                                                            {prod.discount ? (
                                                                <p className="product-price">
                                                                    <span className="old-price">₹{prod.price}.00</span>
                                                                    ₹{prod.discount_amt}.00
                                                                </p>
                                                            ) : (
                                                                <p className="product-price">₹{prod.price}.00</p>
                                                            )}
                                                            {/* Hover Content */}
                                                            <div className="hover-content">
                                                                {/* Add to Cart */}
                                                                <div className="add-to-cart-btn">
                                                                    <a href={`/cart_add/${prod.id}`} className="btn essence-btn">Add to Cart</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Pagination */}
                                    <nav aria-label="navigation">
                                        <ul className="pagination mt-50 mb-70">
                                            <li className="page-item"><a className="page-link" href="#"><i className="fa fa-angle-left"></i></a></li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">...</a></li>
                                            <li className="page-item"><a className="page-link" href="#">21</a></li>
                                            <li className="page-item"><a className="page-link" href="#"><i className="fa fa-angle-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default ProductPage;
