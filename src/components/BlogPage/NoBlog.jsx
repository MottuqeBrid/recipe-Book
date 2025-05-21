const NoBlog = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-center px-4">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          No Blogs Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          It looks like there are no blog posts available at the moment. Please
          check back later or create a new blog post.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/create-blog")}
        >
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default NoBlog;
