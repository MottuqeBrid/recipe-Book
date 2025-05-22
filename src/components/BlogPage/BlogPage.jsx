import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../providers/useAuth";
import NoBlog from "./NoBlog";
import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

const BlogPage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => toast.error("Failed to load blogs"));
  }, []);

  const handleOpenComments = (blog) => {
    // console.log(blog);
    setSelectedBlog(blog);
    fetch(`${import.meta.env.VITE_API_URL}/recipes/blogs/comments/${blog._id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments([...data]);
      })
      .catch(() => toast.error("Failed to load comments"));
  };
  // console.log(selectedBlog);
  const handleAddComment = async (e, selectedBlog) => {
    e.preventDefault();
    console.log(selectedBlog);
    console.log(newComment);
    const commentData = {
      blogId: selectedBlog._id,
      commentId: uuidv4(),
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: newComment,
      createdAt: new Date(),
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/blogs/${
        selectedBlog._id
      }/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      }
    );

    if (res.ok) {
      setComments([...selectedBlog.comments, commentData]);
      setNewComment("");
      setSelectedBlog(null);
    } else {
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId, blogId) => {
    console.log(commentId, blogId);
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/recipes/blogs/${blogId}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data, comments);
      setComments(comments.filter((c) => c.commentId !== commentId));
    } else {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-3xl font-bold mb-6">Blogs</h2>
        {user && (
          <Link to="/create-blog">
            <button className="btn btn-primary">Create Blog</button>
          </Link>
        )}
      </div>
      {blogs.length === 0 && <NoBlog />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="card shadow-lg bg-base-100">
            <img
              src={blog.image}
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
              <p>
                {blog.content.length > 100
                  ? blog.content.slice(0, 100) + "..."
                  : blog.content}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleOpenComments(blog)}
                >
                  View Comments
                </button>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="btn btn-primary mt-2"
                >
                  View more...
                </Link>
              </div>
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
              {comments.map((comment, i) => (
                <div
                  key={i}
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
                      onClick={() =>
                        handleDeleteComment(comment.commentId, selectedBlog._id)
                      }
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => handleAddComment(e, selectedBlog)}
              className="flex gap-2"
            >
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
