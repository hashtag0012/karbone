import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import './InfiniteTimeline.css'

const InfiniteTimeline = ({ milestones, speed = 60 }) => {
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate milestones for seamless infinite scroll
  const duplicatedMilestones = [...milestones, ...milestones, ...milestones]
  
  // Calculate animation duration based on speed (faster)
  const animationDuration = `${100 - speed}s`

  return (
    <div className="infinite-timeline-container relative overflow-hidden h-96">
      {/* Gradient fade effects for vertical scroll */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      
      {/* Vertical scrolling container */}
      <div
        className="infinite-timeline-track-vertical flex flex-col gap-6"
        style={{
          animation: isPaused ? 'none' : `infiniteScrollVertical ${animationDuration} linear infinite`,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedMilestones.map((milestone, index) => (
          <motion.div
            key={`${milestone.year}-${index}`}
            className="flex-shrink-0 w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % milestones.length) * 0.03 }}
          >
            <Card className="glass-effect hover-glow transition-all duration-700 hover:scale-105 group relative overflow-hidden">
              {/* Beautiful gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-copper rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-8 h-8 text-charcoal" />
                  </motion.div>
                  <div className="text-right">
                    <span className="font-cinzel text-luxury-gold font-bold text-3xl group-hover:text-white transition-colors duration-500 block leading-none">
                      {milestone.year}
                    </span>
                    <div className="w-12 h-0.5 bg-luxury-gold/50 ml-auto mt-2 group-hover:bg-white transition-colors duration-500"></div>
                  </div>
                </div>
                
                <h3 className="font-cinzel text-2xl font-bold mb-4 text-white group-hover:text-luxury-gold transition-colors duration-500">
                  {milestone.event}
                </h3>
                
                <p className="text-light-gray leading-relaxed text-base group-hover:text-white transition-colors duration-500">
                  {milestone.description}
                </p>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-luxury-gold rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-luxury-gold rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-4 right-4 bg-luxury-gold text-charcoal px-4 py-2 rounded-full text-sm font-semibold z-20 shadow-lg"
        >
          ⏸ Paused
        </motion.div>
      )}
      
      {/* Scroll instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-warm-gray text-sm z-20"
      >
        Hover to pause • Continuous journey
      </motion.div>
    </div>
  )
}

export default InfiniteTimeline
