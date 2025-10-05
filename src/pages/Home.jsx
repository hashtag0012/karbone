import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Award, Users, Clock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import Model3D from '../components/Model3D'
import Prism from '../components/Prism'
import Particles from '../components/Particles'

const Home = () => {
  const features = [
    {
      icon: Award,
      emoji: '🏆',
      title: 'Award Winning',
      description: 'Recognized for culinary excellence and exceptional service'
    },
    {
      icon: Users,
      emoji: '👨‍🍳',
      title: 'Expert Chefs',
      description: 'Internationally trained chefs crafting exquisite dishes'
    },
    {
      icon: Star,
      emoji: '⭐',
      title: 'Premium Quality',
      description: 'Only the finest ingredients sourced locally and globally'
    },
    {
      icon: Clock,
      emoji: '⏰',
      title: 'Perfect Timing',
      description: 'Every dish prepared to perfection at the right moment'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'An absolutely divine dining experience. The ambiance and food quality exceeded all expectations.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      text: 'Karborne has redefined luxury dining in Srinagar. Every visit is a memorable experience.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      text: 'The perfect blend of traditional Kashmiri flavors with modern culinary techniques.',
      rating: 5
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Image - Lowest Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-charcoal/50"></div>
        </div>

        {/* 3D Model - Responsive scaling */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center pb-5 h-4/5">
          <div className="w-full h-full max-w-none transform scale-75 md:scale-100 transition-transform duration-300">
            <Model3D className="opacity-100" />
          </div>
        </div>

        {/* Prism Effect - Responsive */}
        <div className="absolute inset-0 z-19">
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={window.innerWidth < 768 ? 1.5 : 2.5}
            hueShift={0.8}
            colorFrequency={0.8}
            noise={0.3}
            glow={window.innerWidth < 768 ? 0.8 : 1.2}
            transparent={true}
            className="transition-all duration-300"
          />
        </div>

        {/* Particles Effect - Above Everything */}
        <div className="absolute inset-0 z-30">
          <Particles
            particleColors={['#D4AF37', '#FFD700', '#B8860B']}
            particleCount={150}
            particleSpread={12}
            speed={0.08}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        {/* Text Content - Foreground */}
        <div className="relative z-40 container-max px-6">
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-5xl"
            >
              <h1 className="luxury-heading-xl text-5xl md:text-7xl lg:text-9xl mb-12 text-gradient-alt">
                KARBORNE
              </h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-champagne luxury-text-spacing"
              >
                LUXURY   CAFE   &   BISTRO
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed text-warm-gray luxury-text-spacing"
              >
                Experience   the   finest   culinary   journey   in   the   heart   of   Srinagar,   where   traditional   Kashmiri   flavors   meet   contemporary   elegance
              </motion.p>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Button variant="luxury" size="xl" asChild>
                  <Link to="/contact">
                    Reserve Your Table
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/menu">
                    Explore Menu
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-luxury-gold rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding-xl gradient-bg-2">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-22"
          >
            <h2 className="luxury-heading text-4xl md:text-6xl mb-10 text-gradient mega-text-spacing">
              WHY   CHOOSE   KARBORNE
            </h2>
            <p className="text-xl md:text-2xl text-champagne max-w-3xl mx-auto leading-relaxed luxury-text-spacing">
              Discover   what   makes   us   Srinagar's   premier   dining   destination
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow glass-effect-dark transition-all duration-500 hover:scale-110 tilt-card">
                  <CardContent className="p-10 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <span className="text-6xl mr-4">{feature.emoji}</span>
                      <feature.icon className="w-16 h-16 text-gradient" />
                    </div>
                    <h3 className="font-cinzel text-2xl font-semibold mb-6 text-gradient luxury-text-spacing">
                      {feature.title}
                    </h3>
                    <p className="text-champagne leading-relaxed text-lg luxury-text-spacing">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding-xl gradient-bg-3">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-22 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="luxury-heading text-4xl md:text-6xl mb-10 text-gradient-alt mega-text-spacing">
                OUR   STORY
              </h2>
              <p className="text-xl text-champagne mb-8 leading-relaxed luxury-text-spacing">
                Nestled   in   the   heart   of   Srinagar,   Karborne   represents   the   perfect   fusion   of   Kashmir's   rich   culinary   heritage   with   contemporary   fine   dining   excellence.   Our   journey   began   with   a   simple   vision:   to   create   an   extraordinary   dining   experience   that   celebrates   both   tradition   and   innovation.
              </p>
              <p className="text-xl text-warm-gray mb-12 leading-relaxed luxury-text-spacing">
                Every   dish   tells   a   story,   every   ingredient   is   carefully   selected,   and   every   moment   is   crafted   to   create   memories   that   last   a   lifetime.
              </p>
              <Button variant="luxury" size="lg" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden glass-effect">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Karborne Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-charcoal" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-black/30">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient">
              What Our Guests Say
            </h2>
            <p className="text-lg text-light-gray max-w-2xl mx-auto leading-relaxed">
              Hear from those who have experienced the Karborne difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-light-gray mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <p className="font-cinzel font-semibold text-luxury-gold">
                      — {testimonial.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center glass-effect rounded-2xl p-12 lg:p-16"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-lg text-light-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              Join us at Karborne and discover why we're Srinagar's most celebrated dining destination. Reserve your table today.
            </p>
            <Button variant="luxury" size="xl" asChild>
              <Link to="/contact">
                Make a Reservation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
