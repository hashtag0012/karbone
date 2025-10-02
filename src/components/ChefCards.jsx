import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';
import './ChefCards.css';

// Simplified Chef Card Component
const EnhancedChefCard = ({ chef, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-sm">
        {/* Main card */}
        <div className="relative bg-gradient-to-br from-charcoal/90 via-charcoal to-black rounded-2xl overflow-hidden shadow-xl border border-luxury-gold/20 transition-transform duration-300 hover:scale-105">
          {/* Simple glare effect */}
          <div 
            className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${chef.accentColor}40 50%, transparent 70%)`,
            }}
          />
          
          {/* Chef image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={chef.avatarUrl}
              alt={chef.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            {/* Simple badge */}
            <div className="absolute top-4 right-4 bg-luxury-gold text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
              {chef.experience}
            </div>
          </div>
          
          {/* Content section */}
          <div className="p-6 relative">
            {/* Simple decorative line */}
            <div className="w-12 h-0.5 bg-luxury-gold mb-4" />
            
            <h3 className="font-cinzel text-xl font-bold text-white mb-2 hover:text-luxury-gold transition-colors duration-300">
              {chef.name}
            </h3>
            
            <p className="text-luxury-gold font-semibold mb-3 uppercase tracking-wide text-sm">
              {chef.title}
            </p>
            
            <p className="text-light-gray text-sm mb-4 leading-relaxed">
              {chef.specialty}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-warm-gray">
                <span className="block">Signature:</span>
                <span className="text-white font-medium">{chef.signature}</span>
              </div>
              
              <button
                className="bg-gradient-to-r from-luxury-gold to-copper text-charcoal px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                onClick={() => console.log(`Meeting ${chef.name}`)}
              >
                {chef.contactText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ChefCards = () => {
  const chefs = [
    {
      name: 'Chef Arjun Malik',
      title: 'Executive Chef',
      handle: 'chefArjun',
      status: 'In Kitchen',
      contactText: 'Meet Chef',
      avatarUrl: 'https://images.unsplash.com/photo-1583394293214-28a5b0a9e8e0?w=400&h=600&fit=crop&crop=face',
      specialty: 'Master of authentic Kashmiri cuisine with 15+ years of culinary excellence',
      experience: '15+ Years',
      signature: 'Rogan Josh & Wazwan',
      accentColor: '#D4AF37',
      secondaryColor: '#FFD700'
    },
    {
      name: 'Chef Priya Sharma',
      title: 'Pastry Chef',
      handle: 'chefPriya',
      status: 'Creating Magic',
      contactText: 'Meet Chef',
      avatarUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
      specialty: 'Artisan dessert specialist creating magical sweet experiences',
      experience: '12+ Years',
      signature: 'Saffron Kulfi & Baklava',
      accentColor: '#B8860B',
      secondaryColor: '#DAA520'
    },
    {
      name: 'Chef Rajesh Kumar',
      title: 'Sous Chef',
      handle: 'chefRajesh',
      status: 'Preparing Excellence',
      contactText: 'Meet Chef',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=600&fit=crop&crop=face',
      specialty: 'Modern Indian fusion expert with innovative culinary techniques',
      experience: '10+ Years',
      signature: 'Tandoori Innovations',
      accentColor: '#CD853F',
      secondaryColor: '#DEB887'
    }
  ];

  const handleChefContact = (chef) => {
    console.log(`Contacting ${chef.name}`);
    // You can implement actual contact functionality here
  };

  return (
    <div className="chef-cards-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
        {chefs.map((chef, index) => (
          <EnhancedChefCard key={chef.handle} chef={chef} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ChefCards;
