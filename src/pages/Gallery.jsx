import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ZoomIn, Camera, Utensils, Users, Building } from 'lucide-react'
import CircularGallery from '../components/CircularGallery'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', name: 'All', icon: Camera },
    { id: 'food', name: 'Food', icon: Utensils },
    { id: 'ambiance', name: 'Ambiance', icon: Building },
    { id: 'events', name: 'Events', icon: Users }
  ]

  // Featured gallery items for CircularGallery
  const featuredGalleryItems = [
    { image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Elegant Dining' },
    { image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Signature Rogan Josh' },
    { image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Private Dining' },
    { image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Paneer Tikka Royal' },
    { image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Tandoori Lamb Chops' },
    { image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Premium Bar' },
    { image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Dessert Selection' },
    { image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Wedding Events' },
    { image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Kashmiri Pulao' },
    { image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Terrace Dining' },
    { image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Traditional Kahwa' },
    { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Grand Entrance' }
  ]

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Restaurant Interior',
      category: 'ambiance',
      title: 'Elegant Dining Hall',
      description: 'Our main dining area with luxurious ambiance'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Rogan Josh',
      category: 'food',
      title: 'Signature Rogan Josh',
      description: 'Our famous Kashmiri lamb curry'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
      alt: 'Private Dining',
      category: 'ambiance',
      title: 'Private Dining Room',
      description: 'Intimate setting for special occasions'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Paneer Tikka',
      category: 'food',
      title: 'Paneer Tikka Royal',
      description: 'Perfectly grilled cottage cheese'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Lamb Chops',
      category: 'food',
      title: 'Tandoori Lamb Chops',
      description: 'Succulent lamb with aromatic spices'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Bar Area',
      category: 'ambiance',
      title: 'Premium Bar',
      description: 'Extensive collection of wines and spirits'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Dessert Platter',
      category: 'food',
      title: 'Dessert Selection',
      description: 'Artisanal desserts and traditional sweets'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
      alt: 'Wedding Event',
      category: 'events',
      title: 'Wedding Celebration',
      description: 'Memorable wedding reception at Karborne'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Kashmiri Pulao',
      category: 'food',
      title: 'Kashmiri Pulao',
      description: 'Fragrant rice with dry fruits and saffron'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Outdoor Terrace',
      category: 'ambiance',
      title: 'Terrace Dining',
      description: 'Al fresco dining with mountain views'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Kashmiri Kahwa',
      category: 'food',
      title: 'Traditional Kahwa',
      description: 'Authentic Kashmiri green tea'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1530062845289-9109b2ca2fcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
      alt: 'Corporate Event',
      category: 'events',
      title: 'Business Dinner',
      description: 'Corporate dining and events'
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      alt: 'Chocolate Fondant',
      category: 'food',
      title: 'Chocolate Fondant',
      description: 'Warm chocolate cake with molten center'
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Restaurant Entrance',
      category: 'ambiance',
      title: 'Grand Entrance',
      description: 'Welcome to Karborne experience'
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Tiramisu',
      category: 'food',
      title: 'Tiramisu Kashmir',
      description: 'Italian classic with Kashmiri twist'
    },
    {
      id: 16,
      src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
      alt: 'Anniversary Celebration',
      category: 'events',
      title: 'Anniversary Dinner',
      description: 'Celebrating special moments'
    }
  ]

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-charcoal via-charcoal/90 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container-max relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="luxury-heading text-4xl md:text-6xl lg:text-7xl mb-6 text-gradient">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-light-gray leading-relaxed">
              Step into our world through these carefully captured moments that showcase the essence of Karborne's luxury dining experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Circular Gallery */}
      <section className="section-padding-xl bg-gradient-to-br from-black via-charcoal/80 to-black relative overflow-hidden">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient mega-text-spacing">
              FEATURED   MOMENTS
            </h2>
            <p className="text-xl text-champagne max-w-3xl mx-auto leading-relaxed luxury-text-spacing">
              Experience   our   culinary   artistry   through   this   immersive   3D   gallery   showcase
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[600px] relative"
          >
            <CircularGallery 
              items={featuredGalleryItems}
              bend={3} 
              textColor="#D4AF37" 
              borderRadius={0.05} 
              scrollEase={0.02}
              font="bold 28px Cinzel"
              scrollSpeed={2.5}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-warm-gray luxury-text-spacing">
              Drag   •   Scroll   •   Explore   our   culinary   journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-8 bg-black/30 sticky top-20 z-40 backdrop-blur-sm">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-luxury-gold text-charcoal font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <filter.icon className="w-5 h-5" />
                <span className="uppercase tracking-wide text-sm">{filter.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden rounded-lg glass-effect hover-glow transition-all duration-300 hover:scale-[1.02]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-cinzel text-lg font-semibold text-white mb-1">
                        {image.title}
                      </h3>
                      <p className="text-light-gray text-sm">
                        {image.description}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-black/30">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '50+', label: 'Signature Dishes' },
              { number: '100+', label: 'Events Hosted' },
              { number: '6', label: 'Years of Excellence' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-cinzel text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-light-gray uppercase tracking-wide text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-luxury-gold transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="glass-effect rounded-lg overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h3 className="font-cinzel text-2xl font-semibold text-luxury-gold mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-light-gray leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Gallery
