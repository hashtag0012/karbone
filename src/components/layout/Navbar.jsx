import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '../ui/button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <img 
                src="/501490171_17844598002496629_2822133791654360682_n.jpg" 
                alt="Karborne Logo" 
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
              />
              <div className="text-2xl lg:text-4xl font-cinzel font-bold text-gradient-alt mega-text-spacing">
                KARBORNE
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-lg uppercase luxury-text-spacing font-medium transition-colors duration-500 hover:text-luxury-gold ${
                  location.pathname === item.path ? 'text-luxury-gold' : 'text-champagne'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="luxury" size="lg" asChild>
              <Link to="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Reserve Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-luxury-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="lg:hidden overflow-hidden bg-charcoal/95 backdrop-blur-md"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm uppercase tracking-wide font-medium transition-colors duration-300 hover:text-luxury-gold ${
                  location.pathname === item.path ? 'text-luxury-gold' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Button variant="luxury" size="lg" className="w-full" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Reserve Now
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
