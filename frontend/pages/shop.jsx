import React from 'react';

// Assuming necessary imports are already done

const MyComponent = ({ product, category, brand, product_count }) => {
    return (
        <>
            {product.length < 1 ? (
                <div className="container">
                    <br/><br/><br/><br/><br/>
                    <center>
                        <img src="/img/bg-img/404.png" alt=""/>
                        <h1><b>OPPS!</b> We Couldn’t Find this Product</h1>
                        <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
                        <h2><a href="{% url 'index' %}">Bring me back Home</a></h2>
                    </center>
                </div>
            ) : (
                <>
                    {/* Breadcumb Area */}
                    <div className="breadcumb_area bg-img" style={{backgroundImage: "url('/static/img/bg-img/breadcumb.jpg')"}}>
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
                            {/* Rest of your code... */}
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default MyComponent;
