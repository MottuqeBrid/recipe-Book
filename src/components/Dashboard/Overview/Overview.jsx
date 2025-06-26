import { useEffect, useState } from "react";
import useAuth from "../../../providers/useAuth";
import MyItems from "../MyItems/MyItems";

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { title: "Total Recipes", count: 0 },
    { title: "My Recipes", count: 0 },
    { title: "Pending Approvals", count: 0 },
  ]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/count/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats((prevStats) =>
          prevStats.map((stat) => {
            if (stat.title === "Total Recipes") {
              return { ...stat, count: data.totalRecipes };
            } else if (stat.title === "My Recipes") {
              return { ...stat, count: data.userTotalRecipes };
            } else if (stat.title === "Pending Approvals") {
              return { ...stat, count: data.pendingRecipes };
            }
            return stat;
          })
        );
      })
      .catch((err) => console.error(err));
  }, [user?.email]);

  return (
    <div className="w-full p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="card w-full bg-base-200 shadow">
            <div className="card-body w-full">
              <h3 className="text-lg">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <MyItems />

      <div className="text-sm">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Overview;
