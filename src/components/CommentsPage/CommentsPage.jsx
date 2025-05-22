import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../providers/useAuth";

const CommentsPage = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch all recipes
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch(() => toast.error("Failed to load recipes"));
  }, []);

  // Fetch comments for selected recipe
  useEffect(() => {
    if (!selectedRecipe) return;
    fetch(
      `${import.meta.env.VITE_API_URL}/recipes/comments?recipeId=${
        selectedRecipe._id
      }`
    )
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => toast.error("Failed to load comments"));
  }, [selectedRecipe]);

  // Add a comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      recipeId: selectedRecipe._id,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: newComment.trim(),
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        }
      );

      if (res.ok) {
        setComments([...comments, commentData]);
        setNewComment("");
        toast.success("Comment added!");
      } else {
        toast.error("Failed to add comment.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  // Filter recipes by search term (title)
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setComments(comments.filter((c) => c._id !== commentId));
        toast.success("Comment deleted.");
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting comment.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        All Recipes & Comments
      </h1>

      <input
        type="text"
        placeholder="Search recipes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full max-w-md mb-8 mx-auto block"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="card bg-base-100 shadow-lg rounded-lg"
          >
            <figure>
              <img
                src={recipe.image || "/placeholder.png"}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
              <p>
                <strong>Preparation Time:</strong> {recipe.prepTime} mins
              </p>
              <p className="truncate">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>

              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="btn btn-sm btn-primary mt-3"
              >
                Comments
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {selectedRecipe && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-xl mb-4">
              Comments for: {selectedRecipe.title}
            </h3>

            <div className="max-h-64 overflow-y-auto mb-4">
              {comments.length === 0 && <p>No comments yet. Be the first!</p>}

              {comments.map((comment, i) => (
                <div
                  key={i}
                  className="border-b border-gray-300 dark:border-gray-700 py-2 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    {comment.userPhoto && (
                      <img
                        src={comment.userPhoto}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{comment.userName}</p>
                      <p>{comment.text}</p>
                      <small className="text-gray-500 dark:text-gray-400 block">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>

                  {comment.userEmail === user?.email && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex space-x-2">
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
              <button onClick={() => setSelectedRecipe(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
