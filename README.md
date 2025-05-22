# RecipeVerse 🍽️ - Your Ultimate Recipe & Blogging Companion

🌐 **Live Site:** [https://recipe-book-27cb2.web.app/](https://recipe-book-27cb2.web.app/)

## 🔥 Features

- 🔐 **Authentication & Private Routes:** Users must log in to add, edit, or view specific pages like "My Recipes" or "Add Recipe".
- 📖 **Recipe Management:** Users can create, view, update, and delete recipes, complete with images, categories, and cuisine types.
- 💬 **Interactive Comments:** Users can comment on both recipes and blogs, and only authors can delete their own comments.
- 📝 **Blog System:** Users can write blogs with titles, keywords, poster images, and more. Blog comments are also supported.
- 🎨 **Theme Toggle:** Seamlessly switch between light and dark modes for better accessibility and user experience.
- 🔍 **Search & Filter:** Filter recipes by cuisine and search by recipe/blog title for easy navigation.

---

👨‍💻 Built with React, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 🛠️ Tech Stack

- **React** – UI library
- **React Router** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Styled UI components
- **React Toastify** – Notifications
- **Firebase Auth** – User authentication (via context)

---

## 🔐 Authentication & Protected Routes

- Only logged-in users can access:
  - `Add Recipe`
  - `My Recipes`
  - `Create Blog`
- Implemented using `useAuth()` context + `PrivateRoute` wrapper component.

---

## 💡 Main Features

- 🔐 **User Authentication:** Sign in/out with Firebase (email + Google).
- 🧑‍🍳 **Add, Edit, Delete Recipes:** With fields for title, cuisine, prep time, categories, and ingredients.
- ❤️ **Like Button:** Like recipes, count is stored in DB.
- 💬 **Comments:** View/Add/Delete comments for each recipe and blog.
- 📝 **Blog Management:** Users can write blogs with images, keywords, and rich content.
- 🌗 **Dark/Light Theme Toggle:** Seamless switch with persistence.
- 🔍 **Search & Filter:** Filter recipes by cuisine and search by title.
- 🖼️ **Responsive UI:** Fully responsive and mobile-friendly.

---

## 🧪 Installation & Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b11a10-client-side-MottuqeBrid.git
   ```
