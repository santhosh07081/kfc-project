import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:4000/categories');
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Navigate to the Menu page and pass the category ID securely in state
    navigate('/menu', { state: { scrollToCategory: categoryId } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* HEADER WITH LINE */}
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-[32px] font-black uppercase tracking-tighter text-gray-900">
          Browse Menu Categories
        </h2>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* CSS GRID LAYOUT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, index) => {
          // Make the FIRST category larger
          const isFirst = index === 0;

          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`cursor-pointer group flex flex-col bg-[#f8f7f5] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                isFirst ? 'col-span-2 row-span-2' : 'col-span-1'
              }`}
            >
              {/* Image Container */}
              <div className={`w-full ${isFirst ? 'h-[250px] md:h-[350px]' : 'h-[140px] md:h-[180px]'} overflow-hidden relative`}>
                <img
                  src={cat.image} // Make sure your db.json categories have an "image" URL!
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Title Container */}
              <div className="py-4 px-2 bg-[#f8f7f5] flex-grow flex items-center justify-center">
                <h3 className="font-black uppercase text-sm md:text-[15px] tracking-wide text-gray-900 text-center">
                  {cat.name}
                </h3>
              </div>
            </div>
          );
        })}

        {/* STATIC "VIEW ALL MENU" CARD AT THE END */}
        <div 
          onClick={() => navigate('/menu')}
          className="cursor-pointer group flex flex-col bg-[#f8f7f5] col-span-1 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-[140px] md:h-[180px] flex items-center justify-center p-4 bg-[#f8f7f5]">
             {/* You can replace this text with the "Finger lickin good" image if you have it */}
             <h2 className="text-[#e4002b] text-3xl font-extrabold italic text-center leading-tight font-serif">
               "it's finger <br/> lickin' good"
             </h2>
          </div>
          <div className="py-4 px-2 bg-[#f8f7f5] flex-grow flex items-center justify-center">
             <h3 className="font-black uppercase text-sm md:text-[15px] tracking-wide text-gray-900 flex items-center gap-2">
               View All Menu <span>→</span>
             </h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrowseCategories;