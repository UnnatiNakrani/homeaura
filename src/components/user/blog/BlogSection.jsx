import BlogCard from "./BlogCard";
import { blogs } from "./blogdata";

function BlogSection({ limit }) {
  const displayBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="blog-section">
      <div className="container">
        <div className="row">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default BlogSection;