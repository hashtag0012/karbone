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

// Responsive font sizes
export const fontSizes = {
  h1: 'clamp(2rem, 5vw, 4rem)',
  h2: 'clamp(1.5rem, 4vw, 3rem)',
  h3: 'clamp(1.25rem, 3vw, 2rem)',
  body: 'clamp(1rem, 1.2vw, 1.125rem)',
  small: 'clamp(0.875rem, 1vw, 1rem)',
};

// Responsive spacing
export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
};

// Animation durations
export const durations = {
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
};

// Z-index management
export const zIndex = {
  base: 1,
  content: 10,
  overlay: 20,
  modal: 30,
  tooltip: 40,
};

// Optimized image loading
export const getOptimizedImage = (src, options = {}) => {
  if (typeof window === 'undefined') return src;
  
  const { width, quality = 75 } = options;
  const isRetina = window.devicePixelRatio > 1;
  const imgSrc = src.split('?')[0];
  
  let params = [];
  if (width) params.push(`w=${width * (isRetina ? 2 : 1)}`);
  if (quality) params.push(`q=${quality}`);
  if (isRetina) params.push('dpr=2');
  
  return params.length ? `${imgSrc}?${params.join('&')}` : imgSrc;
};
