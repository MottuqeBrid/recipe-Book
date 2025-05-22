import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center py-10 text-red-500">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-white">
      {blog.posterImage && (
        <img
          src={blog.posterImage}
          alt="Poster"
          className="w-full h-80 object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        By {blog.userName} | {new Date(blog.createdAt).toLocaleDateString()}
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {blog.keywords?.map((kw, idx) => (
          <span
            key={idx}
            className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
          >
            {kw.trim()}
          </span>
        ))}
      </div>

      {blog.image && (
        <img
          src={blog.image}
          alt="Thumbnail"
          className="w-full h-60 object-cover rounded-lg mb-6"
        />
      )}

      <div className="prose dark:prose-invert max-w-none">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default ViewBlog;
