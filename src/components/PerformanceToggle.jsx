import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PerformanceToggle = () => {
  const [performanceMode, setPerformanceMode] = useState(() => {
    return localStorage.getItem('performanceMode') || 'auto';
  });

  useEffect(() => {
    localStorage.setItem('performanceMode', performanceMode);
    
    // Apply performance mode to document
    document.documentElement.setAttribute('data-performance-mode', performanceMode);
    
    // Disable animations in low performance mode
    if (performanceMode === 'low') {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.style.removeProperty('--transition-duration');
    }
  }, [performanceMode]);

  const modes = [
    { value: 'low', label: 'Low', icon: '🐌' },
    { value: 'auto', label: 'Auto', icon: '⚡' },
    { value: 'high', label: 'High', icon: '🚀' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 bg-charcoal/90 backdrop-blur-sm border border-luxury-gold/20 rounded-lg p-3 shadow-lg"
    >
      <div className="text-xs text-luxury-gold mb-2 font-semibold">Performance</div>
      <div className="flex gap-2">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => setPerformanceMode(mode.value)}
            className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
              performanceMode === mode.value
                ? 'bg-luxury-gold text-charcoal'
                : 'bg-charcoal/50 text-light-gray hover:bg-luxury-gold/20'
            }`}
          >
            <span className="mr-1">{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default PerformanceToggle;
