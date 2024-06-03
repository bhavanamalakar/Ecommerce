import React from 'react';

const CheckoutPage = () => {
    return (
        <div>
            {/* Header Area */}
            <header className="header_area">
                {/* Header Content */}
                {/* Your header content goes here */}
            </header>

            {/* Right Side Cart */}
            <div className="cart-bg-overlay"></div>
            <div className="right-side-cart-area">
                {/* Your right side cart content goes here */}
            </div>

            {/* Breadcumb Area */}
            <div className="breadcumb_area bg-img" style={{backgroundImage: "url(img/bg-img/breadcumb.jpg)"}}>
                {/* Your breadcumb content goes here */}
            </div>

            {/* Checkout Area */}
            <div className="checkout_area section-padding-80">
                <div className="container">
                    <div className="row">
                        {/* Billing Address Form */}
                        <div className="col-12 col-md-6">
                            {/* Your billing address form goes here */}
                        </div>
                        {/* Order Summary */}
                        <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                            {/* Your order summary content goes here */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Area */}
            <footer className="footer_area clearfix">
                {/* Your footer content goes here */}
            </footer>
        </div>
    );
}

export default CheckoutPage;
