import React from "react";

const ScrollToTopButton = ({ showScrollTop, scrollToTop }) => {
  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-40 z-50 bg-gray-400 hover:bg-red-500 text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;