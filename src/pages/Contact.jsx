import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Calendar, Users, MessageSquare } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      occasion: '',
      message: ''
    })
    
    setIsSubmitting(false)
    alert('Thank you! Your reservation request has been submitted. We will contact you shortly to confirm.')
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Rajbagh Bund, Srinagar', 'Jammu & Kashmir, 190008', 'India']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 194 2501234', '+91 194 2501235']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['reservations@karborne.com', 'info@karborne.com']
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Monday - Sunday', '11:00 AM - 11:00 PM', 'Kitchen closes at 10:30 PM']
    }
  ]

  const occasions = [
    'Birthday Celebration',
    'Anniversary',
    'Business Dinner',
    'Date Night',
    'Family Gathering',
    'Special Occasion',
    'Casual Dining'
  ]

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-charcoal via-charcoal/90 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container-max relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="luxury-heading text-4xl md:text-6xl lg:text-7xl mb-6 text-gradient">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-light-gray leading-relaxed">
              Reserve your table for an unforgettable dining experience at Karborne. We look forward to welcoming you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Reservation Form */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="luxury-heading text-3xl md:text-4xl mb-8 text-gradient">
                Get In Touch
              </h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="font-cinzel text-xl font-semibold text-luxury-gold mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-light-gray leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="aspect-video rounded-lg overflow-hidden glass-effect"
              >
                <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-copper/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                    <p className="text-luxury-gold font-cinzel text-lg">
                      Interactive Map
                    </p>
                    <p className="text-light-gray text-sm mt-2">
                      Rajbagh Bund, Srinagar
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Reservation Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="luxury-heading text-2xl md:text-3xl text-gradient">
                    Make a Reservation
                  </CardTitle>
                  <p className="text-light-gray">
                    Fill out the form below and we'll confirm your reservation within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-luxury-gold mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white placeholder-light-gray"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-luxury-gold mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white placeholder-light-gray"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-luxury-gold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white placeholder-light-gray"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-luxury-gold mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-luxury-gold mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Preferred Time *
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white"
                        >
                          <option value="" className="bg-charcoal">Select time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-charcoal">
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Guests and Occasion */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-luxury-gold mb-2">
                          <Users className="w-4 h-4 inline mr-2" />
                          Number of Guests *
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white"
                        >
                          <option value="" className="bg-charcoal">Select guests</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-charcoal">
                              {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                          <option value="12+" className="bg-charcoal">12+ Guests</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-luxury-gold mb-2">
                          Occasion
                        </label>
                        <select
                          name="occasion"
                          value={formData.occasion}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white"
                        >
                          <option value="" className="bg-charcoal">Select occasion</option>
                          {occasions.map(occasion => (
                            <option key={occasion} value={occasion} className="bg-charcoal">
                              {occasion}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-sm font-medium text-luxury-gold mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Special Requests
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-luxury-gold focus:outline-none text-white placeholder-light-gray resize-none"
                        placeholder="Any dietary restrictions, special arrangements, or other requests..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="luxury"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Reservation
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-light-gray text-center">
                      * Required fields. We'll contact you within 24 hours to confirm your reservation.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section-padding bg-black/30">
        <div className="container-max">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="luxury-heading text-3xl md:text-5xl mb-6 text-gradient">
              Important Information
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Reservation Policy',
                content: [
                  'Reservations recommended for dinner service',
                  'Tables held for 15 minutes past reservation time',
                  'Cancellations accepted up to 2 hours before',
                  'Large parties (8+) require advance notice'
                ]
              },
              {
                title: 'Dress Code',
                content: [
                  'Smart casual to formal attire preferred',
                  'No shorts or flip-flops for dinner service',
                  'Jacket recommended for gentlemen',
                  'We maintain an elegant dining atmosphere'
                ]
              },
              {
                title: 'Special Services',
                content: [
                  'Private dining rooms available',
                  'Custom menus for special occasions',
                  'Wine pairing consultations',
                  'Valet parking service available'
                ]
              }
            ].map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-xl text-luxury-gold">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {info.content.map((item, i) => (
                        <li key={i} className="text-light-gray text-sm leading-relaxed flex items-start">
                          <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
              Questions?
            </h2>
            <p className="text-lg text-light-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              Our team is here to help make your dining experience perfect. Don't hesitate to reach out with any questions or special requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="luxury" size="xl">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </Button>
              <Button variant="outline" size="xl">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
