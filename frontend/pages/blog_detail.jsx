import React from 'react';
import Image from 'next/image';

const BlogPost = ({ blog }) => {
    return (
        <div className="single-blog-wrapper">
            <div className="single-blog-post-thumb">
                <Image src={`/media/${blog.image}`} alt="" />
            </div>

            <div className="single-blog-content-wrapper d-flex">
                <div className="single-blog--text">
                    <h2>{blog.title}</h2>
                    <p>{blog.short_description}</p>

                    <blockquote>
                        <h6><i className="fa fa-quote-left" aria-hidden="true"></i> Quisque sagittis non ex eget vestibulum. Sed nec ultrices dui. Cras et sagittis erat. Maecenas pulvinar, turpis in dictum tincidunt, dolor nibh lacinia lacus.</h6>
                        <span>Liam Neeson</span>
                    </blockquote>

                    <p>{blog.description}</p>
                </div>

                {blog.o_blog.length > 1 &&
                    <div className="related-blog-post">
                        {blog.o_blog.map(item => (
                            <div key={item.blog_id} className="single-related-blog-post">
                                <Image src={`/media/${item.image}`} alt="" />
                                <a href={`/blog/${item.blog_id}`}>
                                    <h5>{item.short_description}</h5>
                                </a>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default BlogPost;
