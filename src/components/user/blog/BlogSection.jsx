import BlogCard from "./BlogCard";

function BlogSection({ limit }) {
  const blogs = [
    {
      id: 1,
      image: "/assets/images/post-1.jpg",
      title: "First Time Home Owner Ideas",
      author: "Kristin Watson",
      date: "Dec 19, 2021",
    },
    {
      id: 2,
      image: "/assets/images/post-2.jpg",
      title: "How To Keep Your Furniture Clean",
      author: "Robert Fox",
      date: "Dec 15, 2021",
    },
    {
      id: 3,
      image: "/assets/images/post-3.jpg",
      title: "Small Space Furniture Apartment Ideas",
      author: "Kristin Watson",
      date: "Dec 12, 2021",
    },
    {
      id: 4,
      image: "/assets/images/post-1.jpg",
      title: "Modern Furniture Trends",
      author: "John Smith",
      date: "Jan 10, 2022",
    },
    {
      id: 5,
      image: "/assets/images/post-2.jpg",
      title: "Best Living Room Designs",
      author: "Emma Watson",
      date: "Jan 15, 2022",
    },
    {
      id: 6,
      image: "/assets/images/post-3.jpg",
      title: "Furniture Care Guide",
      author: "Robert Fox",
      date: "Jan 20, 2022",
    },
    {
      id: 7,
      image: "/assets/images/post-1.jpg",
      title: "Wooden Chair Collection",
      author: "David Miller",
      date: "Jan 25, 2022",
    },
    {
      id: 8,
      image: "/assets/images/post-2.jpg",
      title: "Home Decoration Ideas",
      author: "Sophia Lee",
      date: "Feb 01, 2022",
    },
    {
      id: 9,
      image: "/assets/images/post-3.jpg",
      title: "Furniture Care Guide",
      author: "Robert Fox",
      date: "Jan 20, 2022",
    }
  ];

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