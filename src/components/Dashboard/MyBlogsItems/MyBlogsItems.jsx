import { useEffect, useState } from "react";
import useAuth from "../../../providers/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyBlogsItems = () => {
  const { user } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/recipes/blogsByUser/${user.email}`
        );
        const data = await res.json();
        setMyBlogs(data);
      } catch (err) {
        toast.error("Failed to fetch your blogs.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchMyBlogs();
  }, [user]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">My Blog Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : myBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
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
            {myBlogs.map((item, i) => (
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
                    to={`/blogs/${item._id}`}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    See Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBlogsItems;
//
