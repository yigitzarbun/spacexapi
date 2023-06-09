import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LaunchPhotos() {
  const location = useLocation();
  const navigate = useNavigate();
  const propsData = location.state ? location.state.launch : null;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleNextIndex = () => {
    setCarouselIndex(
      (carouselIndex + 1) % propsData.links.flickr.original.length
    );
  };
  const handlePrevIndex = () => {
    setCarouselIndex(
      (carouselIndex + propsData.links.flickr.original.length - 1) %
        propsData.links.flickr.original.length
    );
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h2 className="text-center text-2xl font-bold md:text-center">
        {propsData && propsData.name}
      </h2>
      {propsData && propsData.links.flickr.original.length > 0 ? (
        <div className="w-1/2 mx-auto lg:w-2/3 md:w-full">
          <div className="flex justify-between mb-4 md:my-8">
            <button
              onClick={handlePrevIndex}
              className="font-bold border-2 border-blue-400 rounded-md p-2 hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:border-slate-950"
            >
              Previous
            </button>
            <button
              onClick={handleNextIndex}
              className="font-bold border-2 border-blue-400 rounded-md p-2 hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:border-slate-950"
            >
              Next
            </button>
          </div>
          <img
            src={propsData && propsData.links.flickr.original[carouselIndex]}
            alt="launch-image"
            className="rounded-md"
          />
        </div>
      ) : (
        <div className="text-center mt-4">
          <p>
            No images available for launch
            <span className="text-blue-400 italic font-bold ml-2">
              {propsData && propsData.name}
            </span>
          </p>
          <button
            onClick={handleBack}
            className="mt-4 font-bold border-2 border-blue-400 rounded-md p-2 hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:border-none"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default LaunchPhotos;
