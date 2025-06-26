import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion as Motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import useAuth from "../../../providers/useAuth";
import { ThemeContext } from "../../../providers/ThemeContext";

const DashboardProfile = () => {
  const { auth } = useAuth();
  const currentUser = auth.currentUser;
  const [themeData, setThemeData] = useState("light");
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    setThemeData(theme);
  }, [theme]);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    photoURL: currentUser?.photoURL || "",
  });
  const [formData, setFormData] = useState(user);

  const handleUpdate = async () => {
    try {
      await updateProfile(currentUser, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      setUser({
        ...user,
        name: formData.name,
        photoURL: formData.photoURL,
      });
      setIsOpen(false);
      console.log("Firebase profile updated successfully!");
    } catch (error) {
      console.error("Error updating Firebase profile:", error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-2xl mx-auto  p-6 rounded-2xl shadow-lg ${
          themeData === "dark" ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
        <div className="text-center mb-4">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
        </div>
        <div className="text-lg space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-2 btn-primary btn font-semibold rounded-xl shadow"
          >
            Update Profile
          </button>
        </div>
      </Motion.div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`w-full max-w-md  rounded-xl p-6 shadow-xl `}
          >
            <Dialog.Title className="text-xl font-bold mb-4">
              Update Profile
            </Dialog.Title>

            <div className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                placeholder="Display Name"
              />
              <input
                type="text"
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                placeholder="Photo URL"
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 btn-primary btn"
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default DashboardProfile;
