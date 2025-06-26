import { useEffect, useState } from "react";
import useAuth from "../../../providers/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyItems = () => {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/email/${user.email}`
      );
      const data = await res.json();
      setMyRecipes(data);
    };

    if (user?.email) fetchMyRecipes();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMyRecipes(myRecipes.filter((r) => r._id !== id));
      toast.success("Recipe deleted successfully.");
    } else {
      toast.error("Failed to delete recipe.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Recipes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myRecipes &&
              myRecipes.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-14 h-14 mask mask-squircle">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td className="flex gap-2 justify-center">
                    <Link
                      to={`/recipes/${item._id}`}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      See Details
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyItems;
