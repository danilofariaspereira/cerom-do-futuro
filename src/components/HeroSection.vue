<template>
  <section class="hero-section">
    <!-- Vídeo de fundo -->
    <div class="video-container">
      <video 
        ref="heroVideo"
        class="hero-video"
        autoplay 
        muted 
        loop 
        playsinline
        @loadeddata="onVideoLoaded"
      >
        <source src="/videos/seron-futuro-hero.mp4" type="video/mp4">
        <!-- Fallback para navegadores que não suportam vídeo -->
        <div class="video-fallback">
          <div class="fallback-content">
            <div class="fallback-animation"></div>
          </div>
        </div>
      </video>
      
      <!-- Canvas para partículas e linhas (efeito tipo DeckCode) -->
      <canvas ref="heroCanvas" class="hero-canvas" aria-hidden="true"></canvas>
      
      <!-- Overlay com gradiente -->
      <div class="video-overlay"></div>
    </div>
    
    <!-- Conteúdo principal -->
    <div class="hero-content">
      <div class="container">
        <!-- Painel de vidro para melhorar legibilidade sobre o vídeo -->
        <div class="hero-text-panel">
          <div class="hero-text animate-on-scroll">
          
          <!-- Título principal -->
          <h1 class="hero-title">
            <span class="title-line">Cerom</span>
            <span class="title-line text-gradient">do Futuro</span>
          </h1>
          
          <!-- Subtítulo -->
          <p class="hero-subtitle">
            Hoje, Amanhã e Além
          </p>
          
          <!-- Descrição -->
          <p class="hero-description">
            Descubra como a Escola Cerom está construindo o futuro da educação em Teresópolis, RJ.
            Uma jornada interativa através do tempo, mostrando nossa evolução e visão para os próximos 50 anos.
          </p>
          
          <!-- Créditos -->
          <p class="hero-credits">
            Criado por Danilo Farias Pereira
          </p>
          
          <!-- Botão de ação -->
          <div class="hero-actions">
            <button 
              class="btn-primary btn-explore"
              @click="scrollToNextSection"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Explorar o Futuro</span>
              <span v-else class="loading-spinner">Carregando...</span>
            </button>
          </div>
          </div>
        </div>
        
        <!-- Elementos decorativos -->
        <div class="hero-decorations">
          <div class="floating-element element-1"></div>
          <div class="floating-element element-2"></div>
          <div class="floating-element element-3"></div>
          <!-- Animated background blobs (pure CSS) -->
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
          <div class="blob blob-3"></div>
        </div>
      </div>
    </div>
    
    <!-- Indicador de scroll -->
    <div class="scroll-indicator" @click="scrollToNextSection">
      <div class="scroll-arrow">↓</div>
      <span>Hoje vs Futuro</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    // Simular carregamento inicial
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
    
    // Adicionar efeitos de parallax
    this.initParallaxEffects()
    // Inicializar canvas de partículas
    this.initParticleCanvas()
  },
  beforeUnmount() {
    // limpar animações e listeners do canvas
    this.destroyParticleCanvas()
    window.removeEventListener('scroll', this._parallaxHandler)
  },
  methods: {
    scrollToNextSection() {
      const nextSection = document.querySelector('.comparison-section')
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    
    initParallaxEffects() {
      // armazenar handler para remover depois
      this._parallaxHandler = () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll('.floating-element')
        
        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + (index * 0.1)
          element.style.transform = `translateY(${scrolled * speed}px)`
        })
      }
      window.addEventListener('scroll', this._parallaxHandler)
    }
    ,

    /* --------------------------- Canvas Particles --------------------------- */
    initParticleCanvas() {
      const canvas = this.$refs.heroCanvas
      if (!canvas) return

      this._ctx = canvas.getContext('2d')
      this._particles = []
      this._mouse = { x: null, y: null }
      this._animationId = null

      const resize = () => {
        const dpr = window.devicePixelRatio || 1
        canvas.width = Math.floor(canvas.clientWidth * dpr)
        canvas.height = Math.floor(canvas.clientHeight * dpr)
        this._ctx.scale(dpr, dpr)
      }

      // make canvas cover container
      const parent = canvas.parentElement
      canvas.style.width = '100%'
      canvas.style.height = '100%'

      resize()
      window.addEventListener('resize', resize)
      this._particleResize = resize

      // create a reasonable number of particles proportional to area (denser network look)
      const areaPx = canvas.clientWidth * canvas.clientHeight
      const count = Math.max(60, Math.floor(areaPx / 8000))

      for (let i = 0; i < count; i++) {
        this._particles.push(this._createParticle(canvas))
      }

      // mouse events
      const onMove = (e) => {
        const rect = canvas.getBoundingClientRect()
        this._mouse.x = e.clientX - rect.left
        this._mouse.y = e.clientY - rect.top
      }
      const onLeave = () => { this._mouse.x = null; this._mouse.y = null }

      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseleave', onLeave)

      this._particleListeners = { onMove, onLeave }

      const loop = () => {
        this._animationId = requestAnimationFrame(loop)
        this._drawParticles(canvas)
      }
      loop()
    },

    destroyParticleCanvas() {
      const canvas = this.$refs.heroCanvas
      if (!canvas) return
      if (this._animationId) cancelAnimationFrame(this._animationId)
      if (this._particleResize) window.removeEventListener('resize', this._particleResize)
      if (this._particleListeners) {
        canvas.removeEventListener('mousemove', this._particleListeners.onMove)
        canvas.removeEventListener('mouseleave', this._particleListeners.onLeave)
      }
      this._particles = []
      this._ctx = null
    },

    _createParticle(canvas) {
      const x = Math.random() * canvas.clientWidth
      const y = Math.random() * canvas.clientHeight
      const vx = (Math.random() - 0.5) * 0.6
      const vy = (Math.random() - 0.5) * 0.6
      const r = 1 + Math.random() * 2
      const hue = 190 + Math.random() * 60 // bluish
      return { x, y, vx, vy, r, hue }
    },

    _drawParticles(canvas) {
      const ctx = this._ctx
      if (!ctx) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      // clear with slight transparent fill to produce trailing
      ctx.clearRect(0, 0, w, h)

      // update and draw particles
      for (let p of this._particles) {
        p.x += p.vx
        p.y += p.vy

        // bounce
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // mouse interaction - gentle attraction
        if (this._mouse.x != null) {
          const dx = this._mouse.x - p.x
          const dy = this._mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            p.vx += dx / 10000
            p.vy += dy / 10000
          }
        }

        // draw (small glowing node)
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = `rgba(180,220,255,0.95)`
        ctx.shadowColor = `rgba(120,200,255,0.15)`
        ctx.shadowBlur = 8
        ctx.arc(p.x, p.y, p.r + 0.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      // connect lines (network look)
      const maxDist = 160
      for (let i = 0; i < this._particles.length; i++) {
        for (let j = i + 1; j < this._particles.length; j++) {
          const a = this._particles[i]
          const b = this._particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist
            ctx.beginPath()
            ctx.strokeStyle = `rgba(140,200,255,${alpha * 0.9})`
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto; /* allow mouse interaction for subtle attraction */
  z-index: 1.5; /* sits above video but below overlay (overlay is z-index:2) */
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.video-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fallback-content {
  text-align: center;
}

.fallback-animation {
  width: 100px;
  height: 100px;
  border: 2px solid var(--primary-blue);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 212, 255, 0.1) 50%,
    rgba(139, 92, 246, 0.1) 100%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Painel de vidro (frosted glass) ao redor do conteúdo textual */
.hero-text-panel {
  display: inline-block;
  padding: 34px 46px 46px 46px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(20,30,40,0.45), rgba(10,18,28,0.28));
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 14px 60px rgba(2,6,12,0.7);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  z-index: 3;
}

@media (max-width: 768px) {
  .hero-text-panel {
    padding: 20px;
    margin: 0 12px;
    border-radius: 12px;
  }
}

.hero-credits {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-style: italic;
  opacity: 0.8;
}

.hero-title {
  font-family: var(--font-futuristic);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.1;
}

/* Título principal em branco; segunda linha com gradiente */
.hero-title,
.title-line {
  color: #ffffff;
}

.title-line.text-gradient {
  background: linear-gradient(90deg, #cfefff 0%, #4fc3f7 45%, #6b7bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-shadow: 0 6px 24px rgba(50,70,90,0.2);
}

.title-line {
  display: block;
  animation: fadeInUp 1s ease-out;
}

.title-line:nth-child(2) {
  animation-delay: 0.3s;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.95);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

/* Background blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.55;
  transform: translate3d(0,0,0);
}
.blob-1 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle at 30% 30%, rgba(139,92,246,0.9), rgba(139,92,246,0.25) 40%, transparent 60%);
  top: -10%;
  left: -8%;
  animation: blobMove 12s ease-in-out infinite;
  z-index: 1;
}
.blob-2 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at 70% 40%, rgba(0,212,255,0.85), rgba(0,212,255,0.18) 40%, transparent 60%);
  top: 10%;
  right: -6%;
  animation: blobMove 14s ease-in-out infinite reverse;
  z-index: 1;
}
.blob-3 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle at 40% 70%, rgba(255,200,80,0.75), rgba(255,200,80,0.12) 40%, transparent 60%);
  bottom: -8%;
  left: 20%;
  animation: blobMove 18s ease-in-out infinite;
  z-index: 1;
}

@keyframes blobMove {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(30px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.btn-explore {
  font-size: 1.05rem;
  padding: 14px 34px;
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: linear-gradient(90deg, #36d1dc 0%, #5b4bff 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 20px rgba(90,120,255,0.18);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--primary-blue);
  color: var(--primary-blue);
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover {
  background: var(--primary-blue);
  color: white;
  transform: translateY(-2px);
}

.btn-secondary.muted {
  border-color: var(--text-secondary);
  color: var(--text-secondary);
}

.loading-spinner {
  display: inline-block;
  animation: pulse 1s infinite;
}

.hero-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.element-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.element-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  cursor: pointer;
  text-align: center;
  color: var(--text-secondary);
  transition: var(--transition-smooth);
}

.scroll-indicator:hover {
  color: var(--primary-blue);
}

.scroll-arrow {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 10px;
  animation: float 2s ease-in-out infinite;
  color: var(--primary-blue);
}

.scroll-indicator span {
  font-size: 0.9rem;
  font-weight: 300;
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-section {
    min-height: 500px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-explore,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
  
  .floating-element {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}
</style>
