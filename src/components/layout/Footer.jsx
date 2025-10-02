import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="bg-black/50 border-t border-white/10">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <img 
                src="/501490171_17844598002496629_2822133791654360682_n.jpg" 
                alt="Karborne Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <h3 className="text-3xl font-cinzel font-bold text-gradient tracking-wide">
                KARBORNE
              </h3>
            </div>
            <p className="text-light-gray leading-relaxed">
              Experience luxury dining in the heart of Srinagar. Where culinary excellence meets elegant ambiance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, color: '#D4AF37' }}
                  className="text-light-gray hover:text-luxury-gold transition-colors p-2 rounded-full hover:bg-white/5"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-cinzel font-semibold text-luxury-gold uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-light-gray hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-cinzel font-semibold text-luxury-gold uppercase tracking-wide">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-luxury-gold mt-1 flex-shrink-0" />
                <p className="text-light-gray">
                  Rajbagh Bund, Srinagar<br />
                  Jammu & Kashmir, 190008
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <p className="text-light-gray">+91 194 2501234</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <p className="text-light-gray">info@karborne.com</p>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-cinzel font-semibold text-luxury-gold uppercase tracking-wide">
              Opening Hours
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div className="text-light-gray">
                  <p className="font-medium">Monday - Sunday</p>
                  <p>11:00 AM - 11:00 PM</p>
                  <p className="text-sm mt-2">Kitchen closes at 10:30 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-light-gray text-sm">
            © 2024 Karborne. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-light-gray hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-light-gray hover:text-luxury-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
