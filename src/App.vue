<template>
  <div id="app">
    <!-- Hero Section com vídeo institucional -->
    <HeroSection />
    
    <!-- Comparativo Hoje vs Futuro -->
    <ComparisonSection />
    
    <!-- Jarvas Cíntia - IA da Escola -->
    <JarvasSection />
    
    <!-- Alunos Hoje e Amanhã -->
    <StudentsSection />
    
    <!-- Infraestrutura Futurista -->
    <InfrastructureSection />
    
    <!-- QR Code e Acesso Rápido -->
    <QRCodeSection />
    
    <!-- Contato e Localização -->
    <ContactSection />
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3 class="text-gradient">Seron do Futuro</h3>
            <p>Escola Seron - Teresópolis, RJ</p>
          </div>
          <div class="footer-info">
            <p>&copy; 2024 Escola Seron. Todos os direitos reservados.</p>
            <p>Desenvolvido com ❤️ para o futuro da educação</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import ComparisonSection from './components/ComparisonSection.vue'
import JarvasSection from './components/JarvasSection.vue'
import StudentsSection from './components/StudentsSection.vue'
import InfrastructureSection from './components/InfrastructureSection.vue'
import QRCodeSection from './components/QRCodeSection.vue'
import ContactSection from './components/ContactSection.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    ComparisonSection,
    JarvasSection,
    StudentsSection,
    InfrastructureSection,
    QRCodeSection,
    ContactSection
  },
  mounted() {
    // Adicionar efeitos de scroll suave
    this.initScrollEffects()
  },
  methods: {
    initScrollEffects() {
      // Observer para animações de entrada
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      // Observar todos os elementos com classe 'animate-on-scroll'
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el)
      })
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.1));
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  padding: 40px 0;
  margin-top: 80px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-logo h3 {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.footer-logo p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-info {
  text-align: right;
}

.footer-info p {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-info {
    text-align: center;
  }
}
</style>
