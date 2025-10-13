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
      
      <!-- Overlay com gradiente -->
      <div class="video-overlay"></div>
    </div>
    
    <!-- Conteúdo principal -->
    <div class="hero-content">
      <div class="container">
        <div class="hero-text animate-on-scroll">
          <!-- Logo da Escola Seron -->
          <div class="logo-container">
            <img 
              src="/images/logo-seron.png" 
              alt="Logo Escola Seron"
              class="school-logo"
              @error="onLogoError"
            >
            <div class="logo-glow"></div>
          </div>
          
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
            Descubra como a Escola Seron está construindo o futuro da educação em Teresópolis, RJ.
            Uma jornada interativa através do tempo, mostrando nossa evolução e visão para os próximos 50 anos.
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
            
            <!-- Botão secundário para vídeo -->
            <button 
              class="btn-secondary"
              @click="toggleVideoMute"
              :class="{ 'muted': isVideoMuted }"
            >
              <span class="btn-icon">{{ isVideoMuted ? '🔇' : '🔊' }}</span>
              {{ isVideoMuted ? 'Ativar Som' : 'Desativar Som' }}
            </button>
          </div>
        </div>
        
        <!-- Elementos decorativos -->
        <div class="hero-decorations">
          <div class="floating-element element-1"></div>
          <div class="floating-element element-2"></div>
          <div class="floating-element element-3"></div>
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
      isLoading: true,
      isVideoMuted: true,
      videoLoaded: false
    }
  },
  mounted() {
    // Simular carregamento inicial
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
    
    // Adicionar efeitos de parallax
    this.initParallaxEffects()
  },
  methods: {
    onVideoLoaded() {
      this.videoLoaded = true
      console.log('Vídeo carregado com sucesso')
    },
    
    onLogoError() {
      console.log('Logo não encontrado, usando placeholder')
      // Aqui você pode definir uma imagem de fallback
    },
    
    toggleVideoMute() {
      if (this.$refs.heroVideo) {
        this.isVideoMuted = !this.isVideoMuted
        this.$refs.heroVideo.muted = this.isVideoMuted
      }
    },
    
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
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll('.floating-element')
        
        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + (index * 0.1)
          element.style.transform = `translateY(${scrolled * speed}px)`
        })
      })
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

.logo-container {
  position: relative;
  margin-bottom: 30px;
  display: inline-block;
}

.school-logo {
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
  transition: var(--transition-smooth);
}

.school-logo:hover {
  transform: scale(1.05);
}

.logo-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(20px);
  z-index: -1;
  animation: pulse 3s infinite;
}

.hero-title {
  font-family: var(--font-futuristic);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.1;
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
  color: var(--text-secondary);
  margin-bottom: 20px;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.btn-explore {
  font-size: 1.1rem;
  padding: 15px 30px;
  position: relative;
  overflow: hidden;
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
