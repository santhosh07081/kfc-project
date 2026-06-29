import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Components
import FixedLocationBar from "../Components/Layout/Header/FixedLocationBar";
import Offercard from "../Components/Common/OfferCard";
import MenuSidebar from "../Components/Menu/MenuSidebar"; // Adjust path
import MenuItemCard from "../Components/Menu/MenuItemCard"; // Adjust path
import ScrollToTopButton from "../Components/Menu/ScrollToTopButton"; // Adjust path

const Menu = () => {
  const location = useLocation();
  const [menuSections, setMenuSections] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sectionRefs = useRef({});

  // 1. Fetch Data
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:4000/categories"),
          axios.get("http://localhost:4000/products"),
        ]);

        const combinedData = categoriesRes.data.map((category) => {
          return {
            ...category,
            items: productsRes.data.filter(
              (product) => Number(product.categoryId) === Number(category.id)
            ),
          };
        });

        setMenuSections(combinedData);
        if (combinedData.length > 0) setActiveCategory(combinedData[0].id);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load the menu. Check json-server port.");
        setIsLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  // 2. Scroll Handlers
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Intersection Observer (Scroll Spy)
  useEffect(() => {
    if (menuSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = parseInt(entry.target.id.split("-")[1]);
            setActiveCategory(currentId);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [menuSections]);

  // 4. Initial Scroll from Route State
  useEffect(() => {
    if (!isLoading && menuSections.length > 0 && location.state?.scrollToCategory) {
      const targetId = location.state.scrollToCategory;
      setTimeout(() => {
        scrollToCategory(targetId);
        window.history.replaceState({}, document.title);
      }, 500);
    }
  }, [isLoading, menuSections, location]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading Menu...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

  return (
    <div className="bg-white min-h-screen w-full relative">
     
        <FixedLocationBar />
      

      <div className="max-w-7xl mx-auto px-4  pb-32">
        {/* Mobile Header */}
        <div className="md:hidden mt-0 mb-6">
          <div className="flex gap-[12px] mb-4">
            <div className="w-3 h-8 bg-[#e4002b]"></div>
            <div className="w-3 h-8 bg-[#e4002b]"></div>
            <div className="w-3 h-8 bg-[#e4002b]"></div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            KFC MENU
          </h1>
        </div>

        <div className="flex relative items-start gap-8">
          
          {/* Imported Sidebar */}
          <MenuSidebar 
            menuSections={menuSections} 
            activeCategory={activeCategory} 
            scrollToCategory={scrollToCategory} 
          />

          <main className="w-full md:w-3/4">
            <Offercard />
            
            {/* Category Mapping */}
            {menuSections.map((section) => (
              <div
                key={section.id}
                id={`category-${section.id}`}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="mb-16 scroll-mt-[180px] md:scroll-mt-[240px]"
              >
                <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                  {section.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {section.items.length === 0 ? (
                    <p className="text-gray-400 italic">No items in this category yet.</p>
                  ) : (
                    section.items.map((item) => (
                      /* Imported Product Card */
                      <MenuItemCard key={item.id} item={item} />
                    ))
                  )}
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* Imported Scroll Button */}
      <ScrollToTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
    </div>
  );
};

export default Menu;