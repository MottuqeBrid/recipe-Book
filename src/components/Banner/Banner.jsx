import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";
const Banner = ({ topRecipes }) => {
  return (
    <div className="carousel w-full mb-8 mt-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {topRecipes.map((recipe) => (
          <SwiperSlide key={recipe._id}>
            <div className="bg-base-100 rounded-2xl shadow-xl mb-10 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800e">
                  {recipe.title}
                </h2>
                <Link
                  to={`/recipes/${recipe._id}`}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-xl hover:bg-secondary transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
