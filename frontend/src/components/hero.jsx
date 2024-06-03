import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero({collection_brand, collection_name, collection_url, image_url}) {
  return(
    <section className="welcome_area bg-img background-overlay" style={{backgroundImage: `url(${image_url})`}}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div className="hero-content">
              <h6>{collection_brand}</h6>
              <h2>{collection_name}</h2>
              <Link href={collection_url} className="btn essence-btn">view collection</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
