import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Leaf, Flame, Award } from 'lucide-react';

const FlipbookMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hoverSide, setHoverSide] = useState(null);
  const bookRef = useRef(null);

  // Menu data organized by pages
  const menuPages = [
    // Cover Page
    {
      type: 'cover',
      content: {
        title: 'KARBORNE',
        subtitle: 'BISTRO & CAFE',
        location: 'SRINAGAR',
        decorativeText: 'Fine Dining Experience'
      }
    },
    // Starters Page 1
    {
      type: 'menu',
      category: 'STARTERS',
      icon: Star,
      items: [
        {
          name: 'Kashmiri Seekh Kebab',
          description: 'Tender lamb seekh infused with traditional spices, served with mint chutney',
          price: '₹850',
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: false
        },
        {
          name: 'Paneer Tikka Royal',
          description: 'Marinated cottage cheese with bell peppers in tandoor spices',
          price: '₹650',
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: true
        },
        {
          name: 'Saffron Chicken Wings',
          description: 'Succulent wings marinated in saffron and aromatic spices',
          price: '₹750',
          image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: false
        }
      ]
    },
    // Starters Page 2
    {
      type: 'menu',
      category: 'STARTERS',
      icon: Star,
      items: [
        {
          name: 'Mushroom Galouti',
          description: 'Melt-in-mouth mushroom patties with traditional spices',
          price: '₹550',
          image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: true
        },
        {
          name: 'Fish Amritsari',
          description: 'Crispy fish fillets with traditional Punjabi spices',
          price: '₹950',
          image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: false
        },
        {
          name: 'Stuffed Mushrooms',
          description: 'Button mushrooms stuffed with herbed cream cheese',
          price: '₹450',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: true
        }
      ]
    },
    // Main Course Page 1
    {
      type: 'menu',
      category: 'MAIN COURSE',
      icon: Award,
      items: [
        {
          name: 'Wazwan Special Rogan Josh',
          description: 'Traditional Kashmiri lamb curry with aromatic spices and yogurt',
          price: '₹1,450',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: false
        },
        {
          name: 'Paneer Makhani',
          description: 'Creamy tomato-based curry with cottage cheese and butter',
          price: '₹850',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: true
        },
        {
          name: 'Kashmiri Pulao',
          description: 'Fragrant basmati rice with dry fruits, saffron, and aromatic spices',
          price: '₹750',
          image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: true
        }
      ]
    },
    // Main Course Page 2
    {
      type: 'menu',
      category: 'MAIN COURSE',
      icon: Award,
      items: [
        {
          name: 'Butter Chicken',
          description: 'Tender chicken in rich tomato and cream sauce',
          price: '₹1,150',
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: false
        },
        {
          name: 'Dal Karborne',
          description: 'Mixed lentils tempered with ghee and aromatic spices',
          price: '₹550',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: true
        },
        {
          name: 'Fish Curry Kashmir',
          description: 'Fresh fish in traditional Kashmiri spices and yogurt gravy',
          price: '₹1,250',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: false
        }
      ]
    },
    // Grills Page
    {
      type: 'menu',
      category: 'GRILLS',
      icon: Flame,
      items: [
        {
          name: 'Tandoori Lamb Chops',
          description: 'Succulent lamb chops marinated in yogurt and spices',
          price: '₹1,650',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: false
        },
        {
          name: 'Tandoori Chicken Full',
          description: 'Whole chicken marinated in traditional tandoori spices',
          price: '₹1,350',
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: false,
          vegetarian: false
        },
        {
          name: 'Grilled Salmon',
          description: 'Fresh salmon fillet with herbs and lemon butter',
          price: '₹1,550',
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: false
        }
      ]
    },
    // Desserts & Beverages Page
    {
      type: 'menu',
      category: 'DESSERTS & BEVERAGES',
      icon: Star,
      items: [
        {
          name: 'Saffron Kulfi',
          description: 'Traditional Indian ice cream infused with saffron and pistachios',
          price: '₹350',
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: true
        },
        {
          name: 'Kashmiri Kahwa',
          description: 'Traditional green tea with saffron, cardamom, and almonds',
          price: '₹250',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: true
        },
        {
          name: 'Tiramisu Kashmir',
          description: 'Italian classic with a Kashmiri twist of saffron and cardamom',
          price: '₹550',
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialty: true,
          vegetarian: true
        }
      ]
    }
  ];

  const totalPages = menuPages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const CoverPage = ({ content }) => (
    <div className="h-full flex flex-col justify-center items-center text-center p-12 bg-gradient-to-br from-amber-50 to-amber-100 relative overflow-hidden">
      {/* Decorative Border */}
      <div className="absolute inset-4 border-4 border-amber-600 rounded-lg">
        <div className="absolute inset-2 border-2 border-amber-500 rounded-lg"></div>
      </div>
      
      {/* Ornamental Design */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-24 h-8 bg-amber-600 rounded-full opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-6xl font-bold text-amber-800 mb-4 tracking-wider"
        >
          {content.title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-32 h-px bg-amber-600 mx-auto mb-6"
        ></motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-cinzel text-2xl text-amber-700 mb-2 tracking-wide"
        >
          {content.subtitle}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-cinzel text-lg text-amber-600 mb-8"
        >
          {content.location}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-amber-700 italic text-lg"
        >
          {content.decorativeText}
        </motion.div>
      </div>
      
      {/* Bottom Ornament */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-24 h-8 bg-amber-600 rounded-full opacity-20"></div>
      </div>
    </div>
  );

  const MenuPage = ({ category, icon: Icon, items }) => (
    <div className="h-full p-8 bg-gradient-to-br from-amber-50 to-amber-100 relative overflow-hidden">
      {/* Page Border */}
      <div className="absolute inset-4 border-2 border-amber-300 rounded-lg opacity-50"></div>
      
      {/* Category Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-amber-600 mr-3" />
          <h2 className="font-cinzel text-3xl font-bold text-amber-800 tracking-wider">
            {category}
          </h2>
        </div>
        <div className="w-24 h-px bg-amber-600 mx-auto"></div>
      </div>
      
      {/* Menu Items */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-cinzel text-lg font-semibold text-amber-800">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {item.specialty && (
                    <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Special
                    </span>
                  )}
                  {item.vegetarian && (
                    <div className="bg-green-600 text-white p-1 rounded-full">
                      <Leaf className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-amber-700 text-sm mb-2 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-current" />
                  ))}
                </div>
                <span className="font-cinzel text-lg font-bold text-amber-800">
                  {item.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Page Number */}
      <div className="absolute bottom-6 right-8 page-indicator">
        Page {Math.floor(currentPage / 2) + 1}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal/90 to-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="luxury-heading text-4xl md:text-6xl mb-6 text-gradient">
            Our Menu
          </h1>
          <p className="text-xl text-light-gray">
            Discover our culinary journey through the pages of flavor
          </p>
        </motion.div>

        {/* Flipbook Container */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Book Shadow */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-black/20 rounded-lg blur-xl"></div>
            
            {/* Main Book */}
            <motion.div
              ref={bookRef}
              className="relative w-[800px] h-[600px] bg-amber-100 rounded-lg shadow-2xl overflow-hidden book-container transition-all duration-500"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
              whileHover={{ y: -5 }}
            >
              {/* Book Spine */}
              <div className="absolute left-0 top-0 w-8 h-full book-binding rounded-l-lg shadow-inner"></div>
              
              {/* Page Content */}
              <div className="ml-8 h-full relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ 
                      rotateY: isFlipping ? (currentPage > 0 ? -90 : 90) : 0,
                      opacity: 0 
                    }}
                    animate={{ 
                      rotateY: 0,
                      opacity: 1 
                    }}
                    exit={{ 
                      rotateY: isFlipping ? (currentPage < totalPages - 1 ? 90 : -90) : 0,
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    className="h-full"
                    style={{
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {menuPages[currentPage].type === 'cover' ? (
                      <CoverPage content={menuPages[currentPage].content} />
                    ) : (
                      <MenuPage
                        category={menuPages[currentPage].category}
                        icon={menuPages[currentPage].icon}
                        items={menuPages[currentPage].items}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Page Navigation Hover Areas */}
              <div 
                className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10 transition-all duration-300"
                onClick={prevPage}
                onMouseEnter={() => setHoverSide('left')}
                onMouseLeave={() => setHoverSide(null)}
                style={{ 
                  background: hoverSide === 'left' && currentPage > 0 
                    ? 'linear-gradient(to right, rgba(212, 175, 55, 0.1), transparent)' 
                    : 'transparent'
                }}
              ></div>
              <div 
                className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10 transition-all duration-300"
                onClick={nextPage}
                onMouseEnter={() => setHoverSide('right')}
                onMouseLeave={() => setHoverSide(null)}
                style={{ 
                  background: hoverSide === 'right' && currentPage < totalPages - 1 
                    ? 'linear-gradient(to left, rgba(212, 175, 55, 0.1), transparent)' 
                    : 'transparent'
                }}
              ></div>

              {/* Page Corner Curl Effect */}
              {currentPage < totalPages - 1 && (
                <motion.div
                  className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-transparent to-amber-200 rounded-tl-full cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  onClick={nextPage}
                  style={{
                    clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
                  }}
                ></motion.div>
              )}

              {/* Hover Navigation Indicators */}
              <AnimatePresence>
                {hoverSide === 'left' && currentPage > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-luxury-gold text-charcoal px-3 py-2 rounded-full shadow-lg pointer-events-none"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.div>
                )}
                
                {hoverSide === 'right' && currentPage < totalPages - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-luxury-gold text-charcoal px-3 py-2 rounded-full shadow-lg pointer-events-none"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0 || isFlipping}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  currentPage === 0 || isFlipping
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-luxury-gold text-charcoal hover:bg-luxury-gold/90'
                }`}
                whileHover={currentPage > 0 && !isFlipping ? { scale: 1.05 } : {}}
                whileTap={currentPage > 0 && !isFlipping ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-semibold">Previous</span>
              </motion.button>

              <div className="text-white font-cinzel">
                {currentPage + 1} / {totalPages}
              </div>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 || isFlipping}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  currentPage === totalPages - 1 || isFlipping
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-luxury-gold text-charcoal hover:bg-luxury-gold/90'
                }`}
                whileHover={currentPage < totalPages - 1 && !isFlipping ? { scale: 1.05 } : {}}
                whileTap={currentPage < totalPages - 1 && !isFlipping ? { scale: 0.95 } : {}}
              >
                <span className="font-semibold">Next</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipbookMenu;
