import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Heart, Leaf, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import ChefCards from '../components/ChefCards'
import StaffCards from '../components/StaffCards'
import Prism from '../components/Prism'
import InfiniteTimeline from '../components/InfiniteTimeline'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every dish is crafted with love and dedication to culinary excellence'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We source locally and support sustainable farming practices'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections through exceptional dining experiences'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in food and service'
    }
  ]


  const milestones = [
    { year: '2018', event: 'Karborne Opens', description: 'Our journey begins in the heart of Srinagar' },
    { year: '2019', event: 'First Award', description: 'Recognized as Best New Restaurant in Kashmir' },
    { year: '2020', event: 'Michelin Recognition', description: 'Featured in Michelin Guide for exceptional cuisine' },
    { year: '2021', event: 'Sustainability Award', description: 'Honored for our commitment to local sourcing' },
    { year: '2022', event: 'Expansion', description: 'Added private dining rooms and event spaces' },
    { year: '2024', event: 'Excellence Award', description: 'Named Kashmir\'s Premier Dining Destination' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-charcoal via-charcoal/90 to-black overflow-hidden py-20">
        {/* Background Image - Lowest Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/60"></div>
        </div>

        {/* Prism Pyramid Background Effect */}
        <div className="absolute inset-0 z-10">
          <Prism
            animationType="rotate"
            timeScale={0.1}
            height={2.0}
            baseWidth={3.0}
            scale={1.2}
            hueShift={0.2}
            colorFrequency={0.2}
            noise={0.1}
            glow={0.3}
            transparent={true}
          />
        </div>
        
        <div className="container-max relative z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="luxury-heading text-4xl md:text-6xl lg:text-7xl mb-6 text-gradient">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-light-gray leading-relaxed">
              A journey of culinary excellence in the heart of Kashmir, where tradition meets innovation to create unforgettable dining experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="luxury-heading text-3xl md:text-4xl mb-6 text-gradient">
                The Beginning
              </h2>
              <p className="text-lg text-light-gray mb-6 leading-relaxed">
                Karborne was born from a dream to create something extraordinary in Srinagar's culinary landscape. Founded in 2018 by a team of passionate food enthusiasts, we set out to honor Kashmir's rich gastronomic heritage while embracing contemporary culinary techniques.
              </p>
              <p className="text-lg text-light-gray mb-6 leading-relaxed">
                Our name "Karborne" reflects our commitment to carrying forward the finest traditions while being born anew with each dish we serve. Every recipe tells a story, every ingredient has been carefully selected, and every dining experience is crafted to create lasting memories.
              </p>
              <p className="text-lg text-light-gray leading-relaxed">
                From our humble beginnings to becoming Kashmir's premier dining destination, our journey has been guided by an unwavering commitment to excellence, sustainability, and the belief that great food brings people together.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-effect">
                <img
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Karborne Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-black/30">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient">
              Our Values
            </h2>
            <p className="text-lg text-light-gray max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do at Karborne
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <value.icon className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                    <h3 className="font-cinzel text-xl font-semibold mb-3 text-luxury-gold">
                      {value.title}
                    </h3>
                    <p className="text-light-gray leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Team Section */}
      <section className="section-padding bg-gradient-to-br from-black via-charcoal/80 to-black relative overflow-hidden">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient mega-text-spacing">
              CULINARY   MASTERS
            </h2>
            <p className="text-xl text-champagne max-w-3xl mx-auto leading-relaxed luxury-text-spacing">
              Meet   the   exceptional   chefs   who   bring   artistry   and   passion   to   every   dish
            </p>
          </motion.div>

          <ChefCards />
        </div>
      </section>

      {/* Staff Team Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient mega-text-spacing">
              HOSPITALITY   EXCELLENCE
            </h2>
            <p className="text-xl text-light-gray max-w-3xl mx-auto leading-relaxed luxury-text-spacing">
              Our   dedicated   team   ensures   every   moment   of   your   dining   experience   is   extraordinary
            </p>
          </motion.div>

          <StaffCards />
        </div>
      </section>

      {/* Timeline Section - Infinite Scroll */}
      <section className="section-padding bg-black/30">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient mega-text-spacing">
              OUR   JOURNEY
            </h2>
            <p className="text-xl text-light-gray max-w-3xl mx-auto leading-relaxed luxury-text-spacing">
              Key   milestones   in   our   pursuit   of   culinary   excellence   •   Hover   to   pause
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <InfiniteTimeline milestones={milestones} speed={40} />
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="luxury-heading text-3xl md:text-4xl mb-6 text-gradient">
                Our Location
              </h2>
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold mb-2">Dal Lake Road, Srinagar</p>
                  <p className="text-light-gray leading-relaxed">
                    Strategically located in the heart of Srinagar, Karborne offers breathtaking views of the iconic Dal Lake. Our prime location provides the perfect backdrop for an unforgettable dining experience, where you can enjoy exquisite cuisine while taking in the natural beauty of Kashmir.
                  </p>
                </div>
              </div>
              <p className="text-light-gray leading-relaxed mb-6">
                The restaurant's design seamlessly blends traditional Kashmiri architecture with contemporary luxury, creating an ambiance that is both elegant and welcoming. Our spacious dining areas, private rooms, and outdoor terrace offer various settings for every occasion.
              </p>
              <p className="text-light-gray leading-relaxed">
                Whether you're celebrating a special occasion, hosting a business dinner, or simply enjoying a romantic evening, Karborne provides the perfect setting for memorable moments.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-effect">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                  alt="Karborne Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
