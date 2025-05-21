// src/components/Footer.jsx
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold">Recipe Book</h2>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Recipe Book. All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCKHRLhsTdvrczKRbZCpJfLGLvDCKXkGvshwsCkxvSHhclhbLkqlgqDwLZKSpWsJbCdVfkkg"
              target="_blank"
              className="link"
            >
              Sahoreiasorker@gmail.com
            </a>
          </p>
          <p>Phone: +8801308133343</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-red-500">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
