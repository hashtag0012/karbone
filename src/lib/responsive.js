import React, { useState, useEffect } from 'react';

// Responsive breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Device type detection
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < parseInt(breakpoints.md);
};

export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth >= parseInt(breakpoints.md) &&
    window.innerWidth < parseInt(breakpoints.lg)
  );
};

// Get device dimensions and ratio
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {
      width: 1920,
      height: 1080,
      ratio: 1920 / 1080,
      isPortrait: false,
      isMobile: false,
      isTablet: false,
      isDesktop: true
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = width / height;
  const isMobile = width < parseInt(breakpoints.md);
  const isTablet = width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg);
  const isDesktop = width >= parseInt(breakpoints.lg);

  return {
    width,
    height,
    ratio,
    isPortrait: ratio < 1,
    isLandscape: ratio >= 1,
    isMobile,
    isTablet,
    isDesktop,
    isSquare: ratio >= 0.9 && ratio <= 1.1
  };
};

// Responsive scaling based on device ratio and size
export const getResponsiveScale = (baseScale = 1, options = {}) => {
  const device = getDeviceInfo();
  const { minScale = 0.3, maxScale = 1.5 } = options;

  let scale = baseScale;

  // Adjust for mobile
  if (device.isMobile) {
    scale *= 0.6; // 40% smaller on mobile

    // Further adjust for very small screens
    if (device.width < 380) {
      scale *= 0.8;
    }

    // Adjust for portrait vs landscape
    if (device.isPortrait) {
      scale *= 0.9;
    }
  }
  // Adjust for tablet
  else if (device.isTablet) {
    scale *= 0.8; // 20% smaller on tablet
  }

  // Adjust for device ratio (wider screens get slightly larger scale)
  if (device.isLandscape && device.ratio > 1.5) {
    scale *= 1.1;
  } else if (device.isPortrait && device.ratio < 0.7) {
    scale *= 0.9;
  }

  return Math.max(minScale, Math.min(maxScale, scale));
};

// Responsive font scaling
export const getResponsiveFontSize = (baseSize, options = {}) => {
  const device = getDeviceInfo();
  const { minSize = 12, maxSize = 200, scaleFactor = 1 } = options;

  let size = baseSize;

  // Mobile adjustments
  if (device.isMobile) {
    size *= 0.7;

    if (device.width < 380) {
      size *= 0.9;
    }

    if (device.isPortrait) {
      size *= 0.95;
    }
  }
  // Tablet adjustments
  else if (device.isTablet) {
    size *= 0.85;
  }

  // Very small screens
  if (device.width < 360) {
    size *= 0.85;
  }

  return Math.max(minSize, Math.min(maxSize, size));
};

// Responsive spacing
export const getResponsiveSpacing = (baseSpacing, options = {}) => {
  const device = getDeviceInfo();
  const { minSpacing = 4, maxSpacing = 100 } = options;

  let spacing = baseSpacing;

  if (device.isMobile) {
    spacing *= 0.7;

    if (device.width < 380) {
      spacing *= 0.8;
    }
  } else if (device.isTablet) {
    spacing *= 0.85;
  }

  return Math.max(minSpacing, Math.min(maxSpacing, spacing));
};

// Hook for responsive values that update on resize
export const useResponsiveValue = (value, options = {}) => {
  const [responsiveValue, setResponsiveValue] = useState(value);

  useEffect(() => {
    const updateValue = () => {
      if (typeof value === 'function') {
        setResponsiveValue(value());
      } else {
        setResponsiveValue(value);
      }
    };

    updateValue();
    window.addEventListener('resize', updateValue);
    return () => window.removeEventListener('resize', updateValue);
  }, [value]);

  return responsiveValue;
};
