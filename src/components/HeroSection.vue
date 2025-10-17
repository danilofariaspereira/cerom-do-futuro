<template>
  <section class="hero-section">
    <!-- Imagem de fundo -->
    <div class="video-container">
      <div class="hero-background">
        <img 
          src="/images/ceron-do-futuro.jpeg" 
          alt="Escola Cerom do Futuro"
          class="hero-bg-image"
          onerror="this.onerror=null;this.src='/images/cerom-hoje.jpeg'"
        >
        <div class="bg-overlay"></div>
      </div>
      
      <!-- Canvas removido - efeito desabilitado -->
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
      isLoading: false
    }
  },
  mounted() {
    // Adicionar efeitos de parallax
    this.initParallaxEffects()
  },
  beforeUnmount() {
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
  width: 100vw;
  margin: 0;
  padding: 0;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Canvas removido - estilo desabilitado */

.hero-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) contrast(1.1);
  transition: var(--transition-smooth);
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 212, 255, 0.15) 50%,
    rgba(139, 92, 246, 0.15) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Painel de vidro (frosted glass) ao redor do conteúdo textual */
.hero-text-panel {
  display: block;
  padding: 34px 46px 46px 46px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(20,30,40,0.45), rgba(10,18,28,0.28));
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 14px 60px rgba(2,6,12,0.7);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  z-index: 3;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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

/* Responsividade melhorada */
/* Tablets e dispositivos médios */
@media (max-width: 1024px) {
  .hero-section {
    min-height: 80vh;
  }
  
  .hero-text-panel {
    padding: 30px 40px 40px 40px;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
  }
  
  .hero-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  }
  
  .hero-description {
    font-size: clamp(1rem, 2vw, 1.2rem);
  }
}

/* Tablets pequenos e dispositivos móveis grandes */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
  }
  
  .hero-text-panel {
    padding: 25px 30px 35px 30px;
    margin: 0 15px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .btn-explore,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
  
  .floating-element {
    display: none;
  }
  
  .blob {
    opacity: 0.3;
  }
  
  .scroll-indicator {
    bottom: 20px;
  }
}

/* Dispositivos móveis pequenos */
@media (max-width: 480px) {
  .hero-section {
    min-height: 60vh;
  }
  
  .hero-text-panel {
    padding: 20px 25px 30px 25px;
    margin: 0 10px;
    border-radius: 15px;
  }
  
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: 15px;
  }
  
  .hero-subtitle {
    font-size: clamp(0.9rem, 4vw, 1.2rem);
    margin-bottom: 15px;
  }
  
  .hero-description {
    font-size: clamp(0.9rem, 3vw, 1.1rem);
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  .hero-credits {
    font-size: 0.8rem;
    margin-bottom: 25px;
  }
  
  .btn-explore {
    font-size: 1rem;
    padding: 12px 28px;
  }
  
  .blob {
    display: none;
  }
  
  .scroll-indicator {
    bottom: 15px;
  }
  
  .scroll-arrow {
    font-size: 1.5rem;
  }
  
  .scroll-indicator span {
    font-size: 0.8rem;
  }
}

/* Dispositivos muito pequenos */
@media (max-width: 360px) {
  .hero-text-panel {
    padding: 15px 20px 25px 20px;
    margin: 0 8px;
  }
  
  .hero-title {
    font-size: clamp(1.8rem, 9vw, 2.5rem);
  }
  
  .hero-subtitle {
    font-size: clamp(0.8rem, 4.5vw, 1rem);
  }
  
  .hero-description {
    font-size: clamp(0.85rem, 3.5vw, 1rem);
  }
}

/* Orientação landscape em mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .hero-section {
    min-height: 100vh;
    height: auto;
  }
  
  .hero-text-panel {
    padding: 15px 25px 20px 25px;
  }
  
  .hero-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 10px;
  }
  
  .hero-subtitle {
    font-size: clamp(0.8rem, 2.5vw, 1.2rem);
    margin-bottom: 10px;
  }
  
  .hero-description {
    font-size: clamp(0.8rem, 2vw, 1rem);
    margin-bottom: 20px;
  }
  
  .hero-actions {
    margin-bottom: 30px;
  }
  
  .scroll-indicator {
    display: none;
  }
}
</style>
