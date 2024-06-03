import React from "react";

const Wishlist = () => {
  return (
    <div className="container">
      <h2 className="my-4">My Wishlist</h2>
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card h-100" style={{ maxWidth: "250px" }}>
            <img
              className="card-img-top"
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt="Product 1"
              style={{ maxHeight: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">Canon EOS M50 Mirrorless Camera</h5>
              <h5>$910.00</h5>
              <p className="card-text">
                Availability: <span className="text-success">In Stock</span>
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100" style={{ maxWidth: "250px" }}>
            <img
              className="card-img-top"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt="Product 2"
              style={{ maxHeight: "200px" }}
            />
            <div className="card-body">
              <h4 className="card-title">Apple iPhone X 256 GB Space Gray</h4>
              <h5>$1,450.00</h5>
              <p className="card-text">
                Availability: <span className="text-warning">2 - 3 Weeks</span>
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100" style={{ maxWidth: "250px" }}>
            <img
              className="card-img-top"
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              alt="Product 3"
              style={{ maxHeight: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">HP LaserJet Pro Laser Printer</h5>
              <h5>$188.50</h5>
              <p className="card-text">
                Availability: <span className="text-success">In Stock</span>
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div className="form-check mt-4">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="inform-me"
        />
        <label className="form-check-label" htmlFor="inform-me">
          Inform me when item from my wishlist is available
        </label>
      </div>
    </div>
  );
};

export default Wishlist;
