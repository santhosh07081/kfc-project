import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FixedLocationBar from '../Content/FixedLocationBar';
import { useLocation } from 'react-router-dom';
import OrderSelector from '../Content/OrderSelector';
import Offercard from './OfferCard';

// REDUX IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../../redux/cartSlice'; // Adjust path if necessary

const Menu = () => {
  const location = useLocation();
  const [menuSections, setMenuSections] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track when to show the "Back to Top" button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const sectionRefs = useRef({});
  
  // REDUX SETUP
  const dispatch = useDispatch();
  // Access the cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get('http://localhost:4000/categories'),
          axios.get('http://localhost:4000/products')
        ]);

        const categoriesData = categoriesRes.data;
        const productsData = productsRes.data;

        const combinedData = categoriesData.map(category => {
          const items = productsData.filter(product => Number(product.categoryId) === Number(category.id));
          return {
            ...category,
            items: items
          };
        }); 

        setMenuSections(combinedData);
        
        if (combinedData.length > 0) {
          setActiveCategory(combinedData[0].id);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load the menu. Check json-server port.");
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = parseInt(entry.target.id.split('-')[1]);
            setActiveCategory(currentId);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [menuSections]);

  useEffect(() => {
    if (!isLoading && menuSections.length > 0 && location.state?.scrollToCategory) {
      const targetId = location.state.scrollToCategory;

      setTimeout(() => {
        scrollToCategory(targetId);
        window.history.replaceState({}, document.title);
      }, 500);
    }
  }, [isLoading, menuSections, location]);

  // REDUX HANDLER
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading Menu...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

  return (
    
    <div className="bg-white min-h-screen w-full relative">
      
      {/* Full-width Location Bar sticky to the top */}
      <div className="sticky top-37 md:top-34  z-50 bg-white shadow-sm">
        <FixedLocationBar  />
      </div>
       
    

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4  pb-32">
        {/* Mobile Header */}
        <div className="md:hidden mt-0 mb-6">
          <div className="flex gap-[12px] mb-4">
            <div className="w-3 h-8 bg-[#e4002b]"></div>
            <div className="w-3 h-8 bg-[#e4002b]"></div>
            <div className="w-3 h-8 bg-[#e4002b]"></div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">KFC MENU</h1>
        </div>

        <div className="flex relative items-start gap-8">
          
          {/* LEFT SIDEBAR (Hidden on mobile) */}
          <aside className="hidden md:block w-1/4 sticky top-51.25 h-[calc(100vh-6rem)] overflow-y-auto pr-4 custom-scrollbar">
            <div className="flex gap-[12px] mb-8 ">
              <div className="w-3 h-8 bg-[#e4002b]"></div>
              <div className="w-3 h-8 bg-[#e4002b]"></div>
              <div className="w-3 h-8 bg-[#e4002b]"></div>
            </div>
            <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">KFC MENU</h1>
            
            <nav className="flex flex-col gap-5">
              {menuSections.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`text-left text-[15px] transition-all duration-200 ${
                    activeCategory === category.id 
                      ? 'font-bold text-black translate-x-1' 
                      : 'font-semibold text-gray-600 hover:text-black'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <main className="w-full md:w-3/4">
          <Offercard />
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
                    section.items.map((item) => {
                      // Find the item in the cart to check its quantity
                      const cartItem = cartItems.find((ci) => ci.id === item.id);
                      const quantityInCart = cartItem ? cartItem.quantity : 0;

                      return (
                        <div key={item.id} className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300">
                          
                          <div className="relative overflow-hidden bg-gray-50 h-64 flex items-center justify-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Conditional Render for button or counter based on cart state */}
                            {quantityInCart === 0 ? (
                              // Product not in cart: Show ADD button
                              <button 
                                onClick={() => handleAddToCart(item)}
                                className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded shadow-md flex items-center justify-center text-2xl font-bold transition-colors"
                              >
                                +
                              </button>
                            ) : (
                              // Product IS in cart: Show counter controls (as requested)
                              <div className="absolute w-32 h-12 bottom-4 right-4 bg-white  flex justify-center items-center gap-0 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                                {/* Minus Button */}
                                <button 
                                  onClick={() => {
                                    if (quantityInCart > 1) {
                                      dispatch(updateQuantity({ id: item.id, quantity: quantityInCart - 1 }));
                                    } else {
                                      // Reduces to 0: Remove from cart state
                                      dispatch(removeFromCart(item.id));
                                    }
                                  }}
                                  className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-lg rounded-xl transition-colors"
                                >
                                  -
                                </button>
                                {/* Quantity Display */}
                                <span className="px-4 font-bold text-black text-base w-10 text-center">
                                  {quantityInCart}
                                </span>
                                {/* Plus Button */}
                                <button 
                                  onClick={() => handleAddToCart(item)} // addToCart handles incrementing if item exists
                                  className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-lg rounded-xl transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-5 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg mb-1 leading-tight line-clamp-2">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                               <span className="font-semibold text-[15px]">₹{item.price}</span>
                            </div>
      
                            <div className="flex items-center gap-1.5 mb-3">
                              <div className={`w-3 h-3 rounded-sm flex items-center justify-center border ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                 <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                              </div>
                              <span className="text-xs text-gray-500 font-medium">
                                {item.isVeg ? 'Veg' : 'Non Veg'}
                              </span>
                            </div>
                            
                            <p className="text-gray-500 text-sm line-clamp-2 mt-auto">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </main>

        </div>
      </div>

      {/* Floating "Back to Top" Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-40 z-50 bg-gray-400 hover:bg-red-500 text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
          aria-label="Scroll to top"
        >
          {/* Simple up arrow SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

    </div>
  
  );
};

export default Menu;