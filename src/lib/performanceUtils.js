// Advanced Performance optimization utilities for WebGL components

// GPU Performance Benchmarking
class GPUBenchmark {
  constructor() {
    this.benchmarkScore = null
    this.benchmarkComplete = false
  }

  async runBenchmark() {
    if (this.benchmarkComplete) return this.benchmarkScore

    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    
    if (!gl) return 0

    try {
      const startTime = performance.now()
      
      // Create a simple shader for benchmarking
      const vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `)
      gl.compileShader(vertexShader)

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, `
        precision mediump float;
        uniform float time;
        void main() {
          vec2 uv = gl_FragCoord.xy / 256.0;
          float color = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time);
          gl_FragColor = vec4(color, color, color, 1.0);
        }
      `)
      gl.compileShader(fragmentShader)

      const program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      gl.useProgram(program)

      // Benchmark rendering
      const frames = 60
      for (let i = 0; i < frames; i++) {
        gl.uniform1f(gl.getUniformLocation(program, 'time'), i * 0.1)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }

      gl.finish() // Wait for GPU to complete
      const endTime = performance.now()
      
      this.benchmarkScore = Math.max(0, 1000 - (endTime - startTime))
      this.benchmarkComplete = true
      
      return this.benchmarkScore
    } catch (error) {
      console.warn('GPU benchmark failed:', error)
      return 0
    }
  }
}

const gpuBenchmark = new GPUBenchmark()

export const detectDeviceCapabilities = async () => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  
  if (!gl) return 'potato'
  
  // Basic device info
  const renderer = gl.getParameter(gl.RENDERER) || ''
  const vendor = gl.getParameter(gl.VENDOR) || ''
  const version = gl.getParameter(gl.VERSION) || ''
  
  // Device detection
  const userAgent = navigator.userAgent
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
  const isAndroid = /Android/i.test(userAgent)
  
  // Memory detection
  const memoryInfo = navigator.deviceMemory || 4 // Default to 4GB if not available
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
  const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
  const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
  
  // GPU-specific detection
  const rendererLower = renderer.toLowerCase()
  const isIntegratedGPU = rendererLower.includes('intel') || rendererLower.includes('integrated')
  const isLowEndMobileGPU = rendererLower.includes('adreno 3') || 
                           rendererLower.includes('mali-4') ||
                           rendererLower.includes('powervr sgx')
  const isMidRangeMobileGPU = rendererLower.includes('adreno 5') ||
                             rendererLower.includes('mali-g') ||
                             rendererLower.includes('powervr gt')
  const isHighEndGPU = rendererLower.includes('nvidia') ||
                      rendererLower.includes('amd') ||
                      rendererLower.includes('radeon') ||
                      rendererLower.includes('geforce') ||
                      rendererLower.includes('adreno 6') ||
                      rendererLower.includes('adreno 7')

  // Run GPU benchmark
  const benchmarkScore = await gpuBenchmark.runBenchmark()
  
  // Calculate device power score
  let powerScore = 0
  
  // Memory score (0-25 points)
  powerScore += Math.min(memoryInfo * 3, 25)
  
  // GPU capability score (0-30 points)
  if (maxTextureSize >= 16384) powerScore += 15
  else if (maxTextureSize >= 8192) powerScore += 10
  else if (maxTextureSize >= 4096) powerScore += 5
  
  if (maxRenderbufferSize >= 16384) powerScore += 10
  else if (maxRenderbufferSize >= 8192) powerScore += 5
  
  if (maxVertexAttribs >= 16) powerScore += 5
  
  // GPU type score (0-25 points)
  if (isHighEndGPU) powerScore += 25
  else if (isMidRangeMobileGPU) powerScore += 15
  else if (isIntegratedGPU) powerScore += 10
  else if (isLowEndMobileGPU) powerScore += 5
  
  // Benchmark score (0-20 points)
  powerScore += Math.min(benchmarkScore / 50, 20)
  
  // Device type penalties
  if (isMobile && !isTablet) powerScore *= 0.7 // Mobile penalty
  if (isIOS && powerScore > 60) powerScore = Math.min(powerScore, 75) // iOS optimization limit
  
  // Categorize based on power score
  if (powerScore < 20) return 'potato' // Very low-end devices
  if (powerScore < 40) return 'low'    // Low-end devices
  if (powerScore < 65) return 'medium' // Mid-range devices
  if (powerScore < 85) return 'high'   // High-end devices
  return 'ultra'                       // Ultra high-end devices
}

// Battery and thermal detection
export const getBatteryInfo = async () => {
  try {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery()
      return {
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      }
    }
  } catch (error) {
    console.warn('Battery API not available')
  }
  return { level: 1, charging: true, chargingTime: 0, dischargingTime: Infinity }
}

// Thermal throttling detection
export const detectThermalThrottling = () => {
  // Check for performance degradation indicators
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const saveData = connection?.saveData || false
  const effectiveType = connection?.effectiveType || '4g'
  
  // Estimate thermal state based on available indicators
  const isLowPowerMode = saveData || effectiveType === 'slow-2g' || effectiveType === '2g'
  
  return {
    isThrottled: isLowPowerMode,
    severity: isLowPowerMode ? 'moderate' : 'none',
    recommendation: isLowPowerMode ? 'reduce' : 'normal'
  }
}

export const getOptimizedSettings = (capability = 'medium', batteryLevel = 1, isThrottled = false) => {
  const baseSettings = {
    potato: {
      particleCount: 20,
      particleSize: 40,
      shadowQuality: 256,
      antialias: false,
      pixelRatio: 0.75,
      animationSpeed: 0.3,
      enableShadows: false,
      enableComplexLighting: false,
      enablePostProcessing: false,
      frameRate: 20,
      modelQuality: 'fallback',
      textureQuality: 'low',
      geometryLOD: 'lowest'
    },
    low: {
      particleCount: 50,
      particleSize: 60,
      shadowQuality: 512,
      antialias: false,
      pixelRatio: 1,
      animationSpeed: 0.5,
      enableShadows: false,
      enableComplexLighting: false,
      enablePostProcessing: false,
      frameRate: 30,
      modelQuality: 'low',
      textureQuality: 'low',
      geometryLOD: 'low'
    },
    medium: {
      particleCount: 100,
      particleSize: 80,
      shadowQuality: 1024,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      animationSpeed: 0.75,
      enableShadows: true,
      enableComplexLighting: false,
      enablePostProcessing: false,
      frameRate: 45,
      modelQuality: 'medium',
      textureQuality: 'medium',
      geometryLOD: 'medium'
    },
    high: {
      particleCount: 200,
      particleSize: 100,
      shadowQuality: 2048,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      animationSpeed: 1,
      enableShadows: true,
      enableComplexLighting: true,
      enablePostProcessing: true,
      frameRate: 60,
      modelQuality: 'high',
      textureQuality: 'high',
      geometryLOD: 'high'
    },
    ultra: {
      particleCount: 300,
      particleSize: 120,
      shadowQuality: 4096,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      animationSpeed: 1.2,
      enableShadows: true,
      enableComplexLighting: true,
      enablePostProcessing: true,
      frameRate: 60,
      modelQuality: 'ultra',
      textureQuality: 'ultra',
      geometryLOD: 'highest'
    }
  }
  
  let settings = { ...baseSettings[capability] } || baseSettings.medium
  
  // Battery-based adjustments
  if (batteryLevel < 0.2) {
    settings.particleCount = Math.floor(settings.particleCount * 0.5)
    settings.animationSpeed *= 0.7
    settings.frameRate = Math.min(settings.frameRate, 30)
    settings.enableShadows = false
    settings.enableComplexLighting = false
  } else if (batteryLevel < 0.5) {
    settings.particleCount = Math.floor(settings.particleCount * 0.75)
    settings.animationSpeed *= 0.85
    settings.shadowQuality = Math.min(settings.shadowQuality, 1024)
  }
  
  // Thermal throttling adjustments
  if (isThrottled) {
    settings.particleCount = Math.floor(settings.particleCount * 0.6)
    settings.animationSpeed *= 0.5
    settings.frameRate = Math.min(settings.frameRate, 30)
    settings.enableShadows = false
    settings.enableComplexLighting = false
    settings.enablePostProcessing = false
  }
  
  return settings
}

// Advanced Performance Monitor
export const createPerformanceMonitor = () => {
  let frameCount = 0
  let lastTime = performance.now()
  let fps = 60
  let fpsHistory = []
  let memoryUsage = 0
  let gpuMemoryUsage = 0
  
  return {
    update: () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        fps = frameCount
        fpsHistory.push(fps)
        if (fpsHistory.length > 10) fpsHistory.shift() // Keep last 10 seconds
        
        frameCount = 0
        lastTime = currentTime
        
        // Update memory usage if available
        if (performance.memory) {
          memoryUsage = performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
        }
      }
      
      return fps
    },
    getFPS: () => fps,
    getAverageFPS: () => fpsHistory.length > 0 ? fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length : fps,
    getMemoryUsage: () => memoryUsage,
    shouldReduceQuality: () => {
      const avgFps = fpsHistory.length > 0 ? fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length : fps
      return avgFps < 30 || memoryUsage > 0.8
    },
    shouldIncreaseQuality: () => {
      const avgFps = fpsHistory.length > 0 ? fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length : fps
      return avgFps > 55 && memoryUsage < 0.6
    },
    getPerformanceGrade: () => {
      const avgFps = fpsHistory.length > 0 ? fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length : fps
      if (avgFps < 20) return 'poor'
      if (avgFps < 30) return 'low'
      if (avgFps < 45) return 'medium'
      if (avgFps < 55) return 'good'
      return 'excellent'
    }
  }
}

// Global Performance Manager
class GlobalPerformanceManager {
  constructor() {
    this.components = new Map()
    this.globalSettings = null
    this.batteryInfo = { level: 1, charging: true }
    this.thermalInfo = { isThrottled: false, severity: 'none' }
    this.deviceCapability = 'medium'
    this.isInitialized = false
    this.updateInterval = null
  }

  async initialize() {
    if (this.isInitialized) return

    try {
      // Detect device capabilities
      this.deviceCapability = await detectDeviceCapabilities()
      
      // Get battery info
      this.batteryInfo = await getBatteryInfo()
      
      // Detect thermal throttling
      this.thermalInfo = detectThermalThrottling()
      
      // Calculate global settings
      this.updateGlobalSettings()
      
      // Start monitoring
      this.startMonitoring()
      
      this.isInitialized = true
      console.log(`Performance Manager initialized - Device: ${this.deviceCapability}`)
    } catch (error) {
      console.warn('Performance Manager initialization failed:', error)
      this.deviceCapability = 'medium'
      this.updateGlobalSettings()
    }
  }

  updateGlobalSettings() {
    this.globalSettings = getOptimizedSettings(
      this.deviceCapability,
      this.batteryInfo.level,
      this.thermalInfo.isThrottled
    )
  }

  startMonitoring() {
    // Update battery and thermal info every 60 seconds (reduced frequency)
    this.updateInterval = setInterval(async () => {
      const oldBatteryLevel = this.batteryInfo.level
      const oldThrottled = this.thermalInfo.isThrottled

      this.batteryInfo = await getBatteryInfo()
      this.thermalInfo = detectThermalThrottling()

      // Check if settings need updating
      const batteryChanged = Math.abs(oldBatteryLevel - this.batteryInfo.level) > 0.2
      const throttleChanged = oldThrottled !== this.thermalInfo.isThrottled

      if (batteryChanged || throttleChanged) {
        this.updateGlobalSettings()
        this.notifyComponents()
      }
    }, 60000)
  }

  registerComponent(id, component) {
    this.components.set(id, component)
  }

  unregisterComponent(id) {
    this.components.delete(id)
  }

  notifyComponents() {
    this.components.forEach((component, id) => {
      if (component.updateSettings) {
        component.updateSettings(this.globalSettings)
      }
    })
  }

  getSettings() {
    return this.globalSettings
  }

  getDeviceInfo() {
    return {
      capability: this.deviceCapability,
      battery: this.batteryInfo,
      thermal: this.thermalInfo,
      settings: this.globalSettings
    }
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
    this.components.clear()
    this.isInitialized = false
  }
}

// Export singleton instance
export const performanceManager = new GlobalPerformanceManager()

export const optimizeWebGLContext = (gl) => {
  if (!gl) return
  
  // Disable unnecessary features for performance
  gl.disable(gl.DITHER)
  gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE)
  gl.disable(gl.SAMPLE_COVERAGE)
  
  // Optimize viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  
  // Set optimal clear color
  gl.clearColor(0, 0, 0, 0)
}

export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
