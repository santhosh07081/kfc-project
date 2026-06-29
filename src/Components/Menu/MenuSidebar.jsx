import React from "react";

const MenuSidebar = ({ menuSections, activeCategory, scrollToCategory }) => {
  return (
   
    <aside className="hidden md:block w-1/4 sticky top-[136px] h-[calc(100vh-136px)] overflow-y-auto pr-4 custom-scrollbar">
      
      <div className="flex gap-[12px] mb-8 ">
        <div className="w-3 h-8 bg-[#e4002b]"></div>
        <div className="w-3 h-8 bg-[#e4002b]"></div>
        <div className="w-3 h-8 bg-[#e4002b]"></div>
      </div>
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">
        KFC MENU
      </h1>

      <nav className="flex flex-col gap-5">
        {menuSections.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={`text-left text-[15px] transition-all duration-200 ${
              activeCategory === category.id
                ? "font-bold text-black translate-x-1"
                : "font-semibold text-gray-600 hover:text-black"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default MenuSidebar;