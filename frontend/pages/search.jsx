import React from 'react';
import Link from 'next/link';

class ProductGrid extends React.Component {
    render() {
        const { product, category, brand, product_count } = this.props;

        return (
            <div>
                {product.length < 1 ? (
                    <div className="container">
                        <br/><br/><br/><br/><br/>
                        <center>
                            <img src="/img/bg-img/404.png" alt=""/>
                            <h1><b>OPPS!</b> We Could not Find this Product</h1>
                            <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
                            <h2><Link href="/">Bring me back Home</Link></h2>
                        </center>
                    </div>
                ) : (
                    <div>
                        {/* Breadcumb Area */}
                        <div className="breadcumb_area bg-img" style={{backgroundImage: `url('/static/img/bg-img/breadcumb.jpg')`}}>
                            <div className="container h-100">
                                <div className="row h-100 align-items-center">
                                    <div className="col-12">
                                        <div className="page-title text-center">
                                            <h2>{query}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Shop Grid Area */}
                        <section className="shop_grid_area section-padding-80">
                            <div className="container">
                                {/* Shop Sidebar */}
                                <div className="row">
                                    {/* Sidebar Widgets */}
                                    <div className="col-12 col-md-4 col-lg-3">
                                        {/* Category Widget */}
                                        <div className="widget catagory mb-50">
                                            {/* Widget Title */}
                                            <h6 className="widget-title mb-30">Categories</h6>
                                            {/* Categories Menu */}
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
                                        {/* Other Widgets */}
                                        {/* Add other sidebar widgets as React components */}
                                    </div>

                                    {/* Main Content */}
                                    <div className="col-12 col-md-8 col-lg-9">
                                        <div className="shop_grid_product_area">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="product-topbar d-flex align-items-center justify-content-between">
                                                        <div className="total-products">
                                                            <p><span>{product_count}</span> products found</p>
                                                        </div>
                                                        {/* Sorting */}
                                                        <div className="product-sorting d-flex">
                                                            <p>Sort by:</p>
                                                            {/* Add your sorting dropdown as a React component */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/* Product Grid */}
                                                {/* Map through product array and render each product */}
                                                {product.map(prod => (
                                                    <div key={prod.id} className="col-12 col-sm-6 col-lg-4">
                                                        {/* Render each product */}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Pagination */}
                                            <nav aria-label="navigation">
                                                {/* Add pagination component */}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        );
    }
}

export default ProductGrid;
