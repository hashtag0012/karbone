import { useState, useEffect, useRef, useCallback } from 'react'
import { performanceManager, createPerformanceMonitor } from '../lib/performanceUtils'

// Hook for using the global performance manager
export const usePerformanceManager = () => {
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const componentId = useRef(`component_${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    const initializePerformance = async () => {
      await performanceManager.initialize()
      setDeviceInfo(performanceManager.getDeviceInfo())
      setIsInitialized(true)
    }

    initializePerformance()

    return () => {
      performanceManager.unregisterComponent(componentId.current)
    }
  }, [])

  const registerComponent = useCallback((updateCallback) => {
    if (isInitialized) {
      performanceManager.registerComponent(componentId.current, {
        updateSettings: updateCallback
      })
    }
  }, [isInitialized])

  return {
    deviceInfo,
    isInitialized,
    registerComponent,
    getSettings: () => performanceManager.getSettings()
  }
}

// Hook for component-specific performance monitoring
export const usePerformanceMonitor = (componentName = 'unknown') => {
  const [fps, setFps] = useState(60)
  const [performanceGrade, setPerformanceGrade] = useState('good')
  const [memoryUsage, setMemoryUsage] = useState(0)
  const monitorRef = useRef(null)
  const isActiveRef = useRef(true)

  useEffect(() => {
    monitorRef.current = createPerformanceMonitor()
    
    const updateLoop = () => {
      if (isActiveRef.current && monitorRef.current) {
        const currentFps = monitorRef.current.update()
        setFps(currentFps)
        setPerformanceGrade(monitorRef.current.getPerformanceGrade())
        setMemoryUsage(monitorRef.current.getMemoryUsage())
      }
      
      if (isActiveRef.current) {
        requestAnimationFrame(updateLoop)
      }
    }

    requestAnimationFrame(updateLoop)

    return () => {
      isActiveRef.current = false
    }
  }, [])

  const shouldReduceQuality = useCallback(() => {
    return monitorRef.current?.shouldReduceQuality() || false
  }, [])

  const shouldIncreaseQuality = useCallback(() => {
    return monitorRef.current?.shouldIncreaseQuality() || false
  }, [])

  const getAverageFPS = useCallback(() => {
    return monitorRef.current?.getAverageFPS() || fps
  }, [fps])

  return {
    fps,
    performanceGrade,
    memoryUsage,
    shouldReduceQuality,
    shouldIncreaseQuality,
    getAverageFPS
  }
}

// Hook for adaptive quality settings
export const useAdaptiveQuality = (initialQuality = 'medium') => {
  const [currentQuality, setCurrentQuality] = useState(initialQuality)
  const { deviceInfo, isInitialized, getSettings } = usePerformanceManager()
  const { shouldReduceQuality, shouldIncreaseQuality, performanceGrade } = usePerformanceMonitor()
  const lastAdjustment = useRef(Date.now())

  useEffect(() => {
    if (!isInitialized) return

    const adjustQuality = () => {
      const now = Date.now()
      const timeSinceLastAdjustment = now - lastAdjustment.current

      // Only adjust quality every 5 seconds to avoid thrashing
      if (timeSinceLastAdjustment < 5000) return

      const qualityLevels = ['potato', 'low', 'medium', 'high', 'ultra']
      const currentIndex = qualityLevels.indexOf(currentQuality)

      if (shouldReduceQuality() && currentIndex > 0) {
        setCurrentQuality(qualityLevels[currentIndex - 1])
        lastAdjustment.current = now
        console.log(`Quality reduced to: ${qualityLevels[currentIndex - 1]}`)
      } else if (shouldIncreaseQuality() && currentIndex < qualityLevels.length - 1) {
        setCurrentQuality(qualityLevels[currentIndex + 1])
        lastAdjustment.current = now
        console.log(`Quality increased to: ${qualityLevels[currentIndex + 1]}`)
      }
    }

    const interval = setInterval(adjustQuality, 1000)
    return () => clearInterval(interval)
  }, [isInitialized, currentQuality, shouldReduceQuality, shouldIncreaseQuality])

  // Set initial quality based on device capability
  useEffect(() => {
    if (deviceInfo && deviceInfo.capability) {
      setCurrentQuality(deviceInfo.capability)
    }
  }, [deviceInfo])

  return {
    currentQuality,
    settings: getSettings(),
    deviceInfo,
    performanceGrade,
    setQuality: setCurrentQuality
  }
}

// Hook for visibility-based optimization
export const useVisibilityOptimization = (elementRef) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isIntersecting, setIsIntersecting] = useState(true)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        setIsVisible(entry.intersectionRatio > 0.1)
      },
      { 
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '50px'
      }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [elementRef])

  // Page visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden && isIntersecting)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isIntersecting])

  return { isVisible, isIntersecting }
}
