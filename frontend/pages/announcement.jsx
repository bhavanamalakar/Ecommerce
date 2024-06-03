import React from 'react';
import Image from 'next/image';

const BlogPost = () => {
    return (
        <div className="single-blog-wrapper">
            <div className="single-blog-post-thumb">
                <Image src= '/img/bg-img/bg-8.jpg' alt="" width="100" height="100"/>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="regular-page-content-wrapper section-padding-80">
                            <div className="regular-page-text">
                                <h2>Vivamus sed nunc in arcu cursus mollis quis et orci. Interdum et malesuada</h2>
                                <p>Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin. Praesent at tempus lectus, eleifend blandit felis. Fusce augue arcu, consequat a nisl aliquet, consectetur elementum turpis. Donec iaculis lobortis nisl, et viverra risus imperdiet eu. Etiam mollis posuere elit non sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu a magna sodales venenatis. Integer non diam sit amet magna luctus mollis ac eu nisi. In accumsan tellus ut dapibus blandit.</p>

                                <blockquote>
                                    <h6><i className="fa fa-quote-left" aria-hidden="true"></i> Quisque sagittis non ex eget vestibulum. Sed nec ultrices dui. Cras et sagittis erat. Maecenas pulvinar, turpis in dictum tincidunt, dolor nibh lacinia lacus.</h6>
                                    <span>Liam Neeson</span>
                                </blockquote>

                                <p>Praesent ac magna sed massa euismod congue vitae vitae risus. Nulla lorem augue, mollis non est et, eleifend elementum ante. Nunc id pharetra magna. Praesent vel orci ornare, blandit mi sed, aliquet nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;
