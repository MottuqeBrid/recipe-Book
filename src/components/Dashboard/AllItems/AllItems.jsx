const AllItems = () => {
  const items = [
    {
      id: 1,
      title: "Mango Lassi",
      image: "https://source.unsplash.com/80x80/?mango,lassi",
      author: "Mottuqe",
    },
    {
      id: 2,
      title: "Biryani",
      image: "https://source.unsplash.com/80x80/?biryani,rice",
      author: "Sadia",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Recipes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-14 h-14 mask mask-squircle">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td className="flex gap-2 justify-center">
                  <button className="btn btn-sm btn-outline btn-info">Update</button>
                  <button className="btn btn-sm btn-outline btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllItems;
