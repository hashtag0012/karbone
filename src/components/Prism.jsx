import { useEffect, useRef, useState, useCallback } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import { isMobile, isTablet } from '../lib/responsive';
import './Prism.css';

// Performance optimization for mobile devices
    const getPerformanceSettings = () => {
      if (isMobile()) {
        return {
          dpr: Math.min(1, window.devicePixelRatio || 1),
          antialias: false,
          powerPreference: 'low-power',
          maxSteps: 60,  // Reduced steps for mobile
          quality: 0.8   // Lower quality for better performance
        };
      }
      if (isTablet()) {
        return {
          dpr: Math.min(1.5, window.devicePixelRatio || 1),
          antialias: true,
          powerPreference: 'default',
          maxSteps: 80,
          quality: 0.9
        };
      }
      return {
        dpr: Math.min(2, window.devicePixelRatio || 1),
        antialias: true,
        powerPreference: 'high-performance',
        maxSteps: 100,
        quality: 1.0
      };
    };

const Prism = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  maxSteps = 100,
  quality = 1.0,
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = true, // Default to true for better performance
  timeScale = 0.5,
  className = ''
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const animationRef = useRef();
  const lastUpdateTime = useRef(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });

  // Responsive scaling based on viewport size
  const getResponsiveScale = useCallback(() => {
    if (typeof window === 'undefined') return scale;
    const width = window.innerWidth;
    if (width < 480) return scale * 0.6; // Mobile
    if (width < 768) return scale * 0.8; // Small tablets
    if (width < 1024) return scale * 0.9; // Tablets
    return scale; // Desktop
  }, [scale]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      handleResize();
    }

    return () => observer.disconnect();
  }, []);

  // Handle visibility changes for performance
  useEffect(() => {
    if (!suspendWhenOffscreen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [suspendWhenOffscreen]);

  // Initialize and animate the 3D effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isVisible) return;

    // Get responsive settings
    const settings = getPerformanceSettings();
    const { dpr, antialias, powerPreference } = settings;
    
    // Calculate responsive scale
    const responsiveScale = getResponsiveScale();
    
    // Initialize renderer with optimized settings
    const renderer = new Renderer({
      dpr,
      alpha: true,
      antialias: settings.antialias,
      powerPreference,
      premultipliedAlpha: true,
      stencil: false,
      depth: false,
      preserveDrawingBuffer: false,
      autoClear: true,
      autoResize: true
    });
    
    // Set pixel ratio for better performance on mobile
    renderer.setPixelRatio(settings.dpr);
    
    const gl = renderer.gl;
    
    // Set up WebGL context
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Ensure canvas fills container
    const resizeCanvas = () => {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      if (width > 0 && height > 0) {
        renderer.setSize(width, height);
        if (program) {
          program.uniforms.iResolution.value.set(width, height);
        }
      }
    };
    
    // Initial resize
    resizeCanvas();
    
    // Handle window resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);

    // Set canvas styles
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'block',
      pointerEvents: 'none'
    });
    
    // Add canvas to container if not already added
    if (!container.contains(gl.canvas)) {
      container.appendChild(gl.canvas);
    }

    // Vertex shader
    const vertex = /* glsl */ `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader with optimized effects
    const fragment = /* glsl */ `
      precision highp float;
      
      #define PI 3.14159265359
      #define TAU 6.28318530718
      
      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uNoise;
      uniform float uGlow;
      uniform float uColorFreq;
      
      varying vec2 vUv;
      
      // Simplex noise function
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      // Helper functions
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      // Main shader
      void main() {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = vUv;
        
        // Aspect ratio correction
        float aspect = iResolution.x / iResolution.y;
        vec2 p = (uv - 0.5) * 2.0;
        p.x *= aspect;
        
        // Distance from center
        float d = length(p) * uScale;
        
        // Base color with hue shift
        float hue = iTime * 0.1 + uHueShift;
        vec3 color = hsv2rgb(vec3(
          fract(hue * 0.1), // Hue
          0.7, // Saturation
          0.9 // Value
        ));
        
        // Glow effect
        float a = smoothstep(0.8, 0.0, d) * uGlow;
        
        // Add noise for organic feel
        float n = snoise(uv * 10.0 + iTime * 0.5) * 0.1 * uNoise;
        a = clamp(a + n, 0.0, 1.0);
        
        // Apply color and alpha
        gl_FragColor = vec4(color * a, a);
      }

      // Helper function for smooth transitions
      float smootha(float a, float b, float t) {
        t = clamp(t, 0.0, 1.0);
        return mix(a, b, t * t * (3.0 - 2.0 * t));
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;

    const geometry = new Triangle(gl);
    const iResBuf = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: iResBuf },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: 1 },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uGlow: { value: GLOW },
        uOffsetPx: { value: offsetPxBuf },
        uNoise: { value: NOISE },
        uSaturation: { value: SAT },
        uScale: { value: SCALE },
        uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: {
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)
        },
        uTimeScale: { value: TS }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      iResBuf[0] = gl.drawingBufferWidth;
      iResBuf[1] = gl.drawingBufferHeight;
      offsetPxBuf[0] = offX * dpr;
      offsetPxBuf[1] = offY * dpr;
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const rotBuf = new Float32Array(9);
    const setMat3FromEuler = (yawY, pitchX, rollZ, out) => {
      const cy = Math.cos(yawY),
        sy = Math.sin(yawY);
      const cx = Math.cos(pitchX),
        sx = Math.sin(pitchX);
      const cz = Math.cos(rollZ),
        sz = Math.sin(rollZ);
      const r00 = cy * cz + sy * sx * sz;
      const r01 = -cy * sz + sy * sx * cz;
      const r02 = sy * cx;

      const r10 = cx * sz;
      const r11 = cx * cz;
      const r12 = -sx;

      const r20 = -sy * cz + cy * sx * sz;
      const r21 = sy * sz + cy * sx * cz;
      const r22 = cy * cx;

      out[0] = r00;
      out[1] = r10;
      out[2] = r20;
      out[3] = r01;
      out[4] = r11;
      out[5] = r21;
      out[6] = r02;
      out[7] = r12;
      out[8] = r22;
      return out;
    };

    const NOISE_IS_ZERO = NOISE < 1e-6;
    let raf = 0;
    let lastFrameTime = 0;
    const frameInterval = 1000 / (isMobile() ? 30 : 60); // Target 30fps on mobile, 60fps on desktop
    
    const startRAF = () => {
      if (raf) return;
      lastFrameTime = performance.now();
      raf = requestAnimationFrame(render);
    };
    
    const stopRAF = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    
    // Throttle animation frame rate for better performance
    const shouldSkipFrame = () => {
      if (isMobile()) {
        const now = performance.now();
        const delta = now - lastFrameTime;
        return delta < frameInterval;
      }
      return false;
    };

    const rnd = () => Math.random();
    const wX = (0.3 + rnd() * 0.6) * RSX;
    const wY = (0.2 + rnd() * 0.7) * RSY;
    const wZ = (0.1 + rnd() * 0.5) * RSZ;
    const phX = rnd() * Math.PI * 2;
    const phZ = rnd() * Math.PI * 2;

    let yaw = 0,
      pitch = 0,
      roll = 0;
    let targetYaw = 0,
      targetPitch = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const pointer = { x: 0, y: 0, inside: true };
    const onMove = e => {
      const ww = Math.max(1, window.innerWidth);
      const wh = Math.max(1, window.innerHeight);
      const cx = ww * 0.5;
      const cy = wh * 0.5;
      const nx = (e.clientX - cx) / (ww * 0.5);
      const ny = (e.clientY - cy) / (wh * 0.5);
      pointer.x = Math.max(-1, Math.min(1, nx));
      pointer.y = Math.max(-1, Math.min(1, ny));
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onBlur = () => {
      pointer.inside = false;
    };

    let onPointerMove = null;
    if (animationType === 'hover') {
      onPointerMove = e => {
        onMove(e);
        startRAF();
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('blur', onBlur);
      program.uniforms.uUseBaseWobble.value = 0;
    } else if (animationType === '3drotate') {
      program.uniforms.uUseBaseWobble.value = 0;
    } else {
      program.uniforms.uUseBaseWobble.value = 1;
    }

    const render = t => {
      if (shouldSkipFrame()) {
        raf = requestAnimationFrame(render);
        return;
      }
      
      lastFrameTime = t;
      const time = (t - t0) * 0.001;
      program.uniforms.iTime.value = time * timeScale;
      
      // Adjust quality settings based on performance
      const targetSteps = isMobile() ? 
        Math.max(30, settings.maxSteps * (1 - Math.min(1, time * 0.001))) : 
        settings.maxSteps;

      let continueRAF = true;

      if (animationType === 'hover') {
        const maxPitch = 0.6 * HOVSTR;
        const maxYaw = 0.6 * HOVSTR;
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;
        const prevYaw = yaw;
        const prevPitch = pitch;
        const prevRoll = roll;
        yaw = lerp(prevYaw, targetYaw, INERT);
        pitch = lerp(prevPitch, targetPitch, INERT);
        roll = lerp(prevRoll, 0, 0.1);
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);

        if (NOISE_IS_ZERO) {
          const settled =
            Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;
          if (settled) continueRAF = false;
        }
      } else if (animationType === '3drotate') {
        const tScaled = time * TS;
        yaw = tScaled * wY;
        pitch = Math.sin(tScaled * wX + phX) * 0.6;
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
        if (TS < 1e-6) continueRAF = false;
      } else {
        rotBuf[0] = 1;
        rotBuf[1] = 0;
        rotBuf[2] = 0;
        rotBuf[3] = 0;
        rotBuf[4] = 1;
        rotBuf[5] = 0;
        rotBuf[6] = 0;
        rotBuf[7] = 0;
        rotBuf[8] = 1;
        program.uniforms.uRot.value = rotBuf;
        if (TS < 1e-6) continueRAF = false;
      }

      renderer.render({ scene: mesh });
      if (continueRAF) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    if (suspendWhenOffscreen) {
      const io = new IntersectionObserver(entries => {
        const vis = entries.some(e => e.isIntersecting);
        if (vis) startRAF();
        else stopRAF();
      });
      io.observe(container);
      startRAF();
      container.__prismIO = io;
    } else {
      startRAF();
    }

    return () => {
      stopRAF();
      ro.disconnect();
      if (animationType === 'hover') {
        if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('blur', onBlur);
      }
      if (suspendWhenOffscreen) {
        const io = container.__prismIO;
        if (io) io.disconnect();
        delete container.__prismIO;
      }
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
    };
  }, [
    height,
    baseWidth,
    animationType,
    glow,
    noise,
    offset?.x,
    offset?.y,
    scale,
    transparent,
    hueShift,
    colorFrequency,
    timeScale,
    hoverStrength,
    inertia,
    bloom,
    suspendWhenOffscreen
  ]);

  return <div className="prism-container" ref={containerRef} />;
};

export default Prism;
