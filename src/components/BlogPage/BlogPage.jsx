import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../providers/useAuth";
import NoBlog from "./NoBlog";
import { Link } from "react-router";

const BlogPage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipes/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => toast.error("Failed to load blogs"));
  }, []);

  const handleOpenComments = (blog) => {
    // console.log(blog);
    setSelectedBlog(blog);
    fetch(`http://localhost:5000/recipes/blogs/comments?blogId=${blog._id}`)
      .then((res) => res.json())
      .then((data) => setComments([...data]))
      .catch(() => toast.error("Failed to load comments"));
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log(newComment);
    const commentData = {
      blogId: selectedBlog._id,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: newComment,
      createdAt: new Date(),
    };

    const res = await fetch("http://localhost:5000/recipes/blogs/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      setComments([...comments, commentData]);
      setNewComment("");
    } else {
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(
      `http://localhost:5000/recipes/blogs/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setComments(comments.filter((c) => c._id !== commentId));
    } else {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-3xl font-bold mb-6">Blogs</h2>
        <Link className="btn btn-primary" to="/create-blog">
          Add Blog
        </Link>
      </div>
      {blogs.length === 0 && <NoBlog />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="card shadow-lg bg-base-100">
            <img
              src={blog.coverImage}
              alt="cover"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p>
                <strong>Author:</strong> {blog.userName}
              </p>
              <p>
                <strong>Keywords:</strong> {blog.keywords.join(", ")}
              </p>
              <img
                src={blog.posterImage}
                alt="poster"
                className="w-full h-32 object-cover my-2"
              />
              <p>{blog.content}</p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => handleOpenComments(blog)}
              >
                View Comments
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">
              Comments for {selectedBlog.title}
            </h3>
            <div className="max-h-64 overflow-y-auto mt-3 mb-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start justify-between gap-2 border-b py-2"
                >
                  <div className="flex gap-2">
                    {comment.userPhoto && (
                      <img
                        src={comment.userPhoto}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-bold">{comment.userName}</p>
                      <p>{comment.text}</p>
                      <small>
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                  {comment.userEmail === user.email && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="input input-bordered flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>

            <div className="modal-action">
              <button onClick={() => setSelectedBlog(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
