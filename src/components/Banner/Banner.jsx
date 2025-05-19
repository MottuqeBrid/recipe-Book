// src/components/Banner/Banner.jsx
const Banner = () => {
  return (
    <div className="carousel w-full h-64 mb-8">
      <div id="slide1" className="carousel-item relative w-full">
        <img src="/banner1.jpg" className="w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
          Discover New Recipes Everyday!
        </div>
      </div>
    </div>
  );
};

export default Banner;
