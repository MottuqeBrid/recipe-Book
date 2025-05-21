import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../providers/useAuth";

const CreateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    keyword: "",
    image: "",
    posterImage: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      ...formData,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      createdAt: new Date(),
    };
    console.log(blogData);

    try {
      const res = await fetch("http://localhost:5000/recipes/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        toast.success("Blog created successfully");
        navigate("/blogs");
      } else {
        toast.error("Failed to create blog");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="keyword"
          value={formData.keyword}
          onChange={handleChange}
          placeholder="Keyword"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />

        {/* <input
          type="text"
          name="posterImage"
          value={formData.posterImage}
          onChange={handleChange}
          placeholder="Poster Image URL"
          className="input input-bordered w-full"
        /> */}

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog content here..."
          className="textarea textarea-bordered w-full h-40"
          required
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
