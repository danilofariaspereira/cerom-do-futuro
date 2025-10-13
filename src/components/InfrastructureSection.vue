<template>
  <section class="infrastructure-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Infraestrutura</span> Futurista
        </h2>
        <p class="section-subtitle">
          Espaços inteligentes que se adaptam ao aprendizado
        </p>
      </div>
      
      <!-- Grid de infraestrutura -->
      <div class="infrastructure-grid">
        <div 
          v-for="(item, index) in infrastructureItems" 
          :key="index"
          class="infrastructure-card animate-on-scroll"
          :style="{ animationDelay: `${index * 0.2}s` }"
          @mouseenter="onCardHover(index)"
          @mouseleave="onCardLeave(index)"
        >
          <!-- Imagem da infraestrutura -->
          <div class="card-image-container">
            <img 
              :src="item.image" 
              :alt="item.title"
              class="card-image"
            >
            <div class="image-overlay" :class="{ 'active': activeCard === index }">
              <div class="overlay-content">
                <div class="overlay-icon">{{ item.icon }}</div>
                <h3 class="overlay-title">{{ item.title }}</h3>
              </div>
            </div>
            
            <!-- Efeitos visuais -->
            <div class="card-effects">
              <div class="effect-glow" :class="{ 'active': activeCard === index }"></div>
              <div class="effect-particles">
                <div class="particle" v-for="n in 6" :key="n"></div>
              </div>
            </div>
          </div>
          
          <!-- Conteúdo do card -->
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">{{ item.description }}</p>
            
            <!-- Acordeão de características -->
            <div class="card-accordion">
              <div class="accordion-item">
                <button 
                  class="accordion-header"
                  @click="toggleAccordion(index)"
                  :class="{ 'active': activeAccordion === index }"
                >
                  <span class="accordion-title">Características</span>
                  <span class="accordion-icon">{{ activeAccordion === index ? '−' : '+' }}</span>
                </button>
                <div 
                  class="accordion-content"
                  :class="{ 'active': activeAccordion === index }"
                  :style="{ display: activeAccordion === index ? 'block' : 'none' }"
                >
                  <div class="card-features">
                    <div 
                      v-for="feature in item.features" 
                      :key="feature"
                      class="feature-item"
                    >
                      <span class="feature-icon">✓</span>
                      <span class="feature-text">{{ feature }}</span>
                    </div>
                  </div>
                  
                  <div class="card-technologies">
                    <h4>Tecnologias:</h4>
                    <div class="tech-tags">
                      <span 
                        v-for="tech in item.technologies" 
                        :key="tech"
                        class="tech-tag"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Botão de ação -->
            <button 
              class="btn-primary btn-small"
              @click="showInfrastructureDetails(item)"
            >
              Explorar Espaço
            </button>
          </div>
        </div>
      </div>
      
      <!-- Timeline de evolução -->
      <div class="evolution-timeline animate-on-scroll">
        <h3 class="timeline-title">Evolução da Infraestrutura</h3>
        <div class="timeline-container">
          <div 
            v-for="(phase, index) in evolutionPhases" 
            :key="index"
            class="timeline-phase"
            :class="{ 'active': activePhase === index }"
            @click="setActivePhase(index)"
          >
            <div class="phase-marker">
              <div class="marker-dot"></div>
              <div class="marker-line"></div>
            </div>
            <div class="phase-content">
              <div class="phase-year">{{ phase.year }}</div>
              <div class="phase-title">{{ phase.title }}</div>
              <div class="phase-description">{{ phase.description }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal de detalhes -->
      <div 
        v-if="selectedInfrastructure" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          
          <div class="modal-header">
            <div class="modal-image">
              <img :src="selectedInfrastructure.image" :alt="selectedInfrastructure.title">
            </div>
            <div class="modal-info">
              <h3 class="modal-title">{{ selectedInfrastructure.title }}</h3>
              <p class="modal-subtitle">{{ selectedInfrastructure.subtitle }}</p>
            </div>
          </div>
          
          <div class="modal-body">
            <div class="modal-section">
              <h4>Visão Geral</h4>
              <p>{{ selectedInfrastructure.detailedDescription }}</p>
            </div>
            
            <div class="modal-section">
              <h4>Recursos Avançados</h4>
              <div class="resources-grid">
                <div 
                  v-for="resource in selectedInfrastructure.resources" 
                  :key="resource.name"
                  class="resource-item"
                >
                  <div class="resource-icon">{{ resource.icon }}</div>
                  <div class="resource-info">
                    <h5>{{ resource.name }}</h5>
                    <p>{{ resource.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="modal-section">
              <h4>Benefícios para os Alunos</h4>
              <ul class="benefits-list">
                <li v-for="benefit in selectedInfrastructure.benefits" :key="benefit">
                  {{ benefit }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfrastructureSection',
  data() {
    return {
      activeCard: null,
      activePhase: 0,
      activeAccordion: null,
      selectedInfrastructure: null,
      infrastructureItems: [
        {
          title: 'Laboratório de Realidade Virtual',
          subtitle: 'Imersão Total no Aprendizado',
          description: 'Espaço equipado com tecnologia VR de última geração para experiências educacionais imersivas.',
          image: '/images/lab-vr-futuro.jpg',
          icon: '🥽',
          features: [
            'Headsets VR de alta resolução',
            'Sensores de movimento precisos',
            'Ambientes virtuais educacionais',
            'Sistema de rastreamento corporal'
          ],
          technologies: ['VR', 'AR', 'IA', 'Sensores'],
          detailedDescription: 'Nosso laboratório de realidade virtual oferece experiências de aprendizado completamente imersivas. Os alunos podem explorar o sistema solar, caminhar pela Roma antiga, ou dissecar um coração humano em escala real, tudo em um ambiente virtual seguro e controlado.',
          resources: [
            { icon: '🎮', name: 'Headsets VR', description: 'Equipamentos de última geração com resolução 4K' },
            { icon: '🖐️', name: 'Controles Hapticos', description: 'Feedback tátil para interações realistas' },
            { icon: '🌍', name: 'Ambientes Virtuais', description: 'Mais de 100 cenários educacionais' },
            { icon: '📊', name: 'Analytics', description: 'Monitoramento de progresso em tempo real' }
          ],
          benefits: [
            'Aprendizado mais envolvente e memorável',
            'Experiências impossíveis no mundo real',
            'Desenvolvimento de habilidades espaciais',
            'Redução de custos com materiais físicos'
          ]
        },
        {
          title: 'Biblioteca Digital Inteligente',
          subtitle: 'Conhecimento ao Alcance dos Dedos',
          description: 'Biblioteca equipada com IA para pesquisa instantânea e recomendações personalizadas.',
          image: '/images/biblioteca-digital.jpg',
          icon: '📚',
          features: [
            'IA para pesquisa avançada',
            'Recomendações personalizadas',
            'Livros digitais interativos',
            'Sistema de empréstimo automático'
          ],
          technologies: ['IA', 'ML', 'NLP', 'Cloud'],
          detailedDescription: 'Nossa biblioteca digital utiliza inteligência artificial para revolucionar a forma como os alunos pesquisam e consomem conhecimento. O sistema aprende com as preferências de cada usuário e sugere conteúdos relevantes automaticamente.',
          resources: [
            { icon: '🤖', name: 'Assistente IA', description: 'Pesquisa inteligente e respostas instantâneas' },
            { icon: '📖', name: 'Livros Interativos', description: 'Conteúdo multimídia e interativo' },
            { icon: '🔍', name: 'Busca Avançada', description: 'Algoritmos de busca semântica' },
            { icon: '📱', name: 'App Mobile', description: 'Acesso completo via smartphone' }
          ],
          benefits: [
            'Acesso instantâneo a milhões de recursos',
            'Pesquisa mais eficiente e precisa',
            'Conteúdo sempre atualizado',
            'Personalização do aprendizado'
          ]
        },
        {
          title: 'Quadra Esportiva Inteligente',
          subtitle: 'Performance e Saúde Monitoradas',
          description: 'Quadra com sensores biométricos e IA para otimização de treinos e prevenção de lesões.',
          image: '/images/quadra-inteligente.jpg',
          icon: '🏃',
          features: [
            'Sensores biométricos integrados',
            'IA para análise de performance',
            'Piso inteligente adaptativo',
            'Monitoramento de saúde em tempo real'
          ],
          technologies: ['IoT', 'IA', 'Biometria', 'Sensores'],
          detailedDescription: 'Nossa quadra esportiva inteligente monitora continuamente a performance e saúde dos alunos. Sensores integrados no piso e equipamentos coletam dados que são analisados por IA para fornecer feedback personalizado e prevenir lesões.',
          resources: [
            { icon: '📊', name: 'Analytics', description: 'Análise detalhada de performance' },
            { icon: '💓', name: 'Monitor Cardíaco', description: 'Acompanhamento de frequência cardíaca' },
            { icon: '🏃', name: 'Análise de Movimento', description: 'Detecção de padrões de movimento' },
            { icon: '⚕️', name: 'Prevenção de Lesões', description: 'Alertas de risco de lesão' }
          ],
          benefits: [
            'Melhoria contínua da performance',
            'Prevenção proativa de lesões',
            'Treinos personalizados e eficazes',
            'Motivação através de gamificação'
          ]
        },
        {
          title: 'Sala de Aula Adaptativa',
          subtitle: 'Ambiente que se Molda ao Aprendizado',
          description: 'Sala com mobiliário inteligente e sistemas de iluminação que se adaptam às necessidades dos alunos.',
          image: '/images/sala-adaptativa.jpg',
          icon: '🎓',
          features: [
            'Mobiliário inteligente ajustável',
            'Iluminação adaptativa',
            'Sistema de climatização inteligente',
            'Mesas interativas touch'
          ],
          technologies: ['IoT', 'Sensores', 'IA', 'Touch'],
          detailedDescription: 'Nossa sala de aula adaptativa utiliza tecnologia IoT para criar o ambiente ideal de aprendizado. O mobiliário se ajusta automaticamente, a iluminação se adapta ao tipo de atividade e as mesas interativas respondem ao toque dos alunos.',
          resources: [
            { icon: '🪑', name: 'Mobiliário IoT', description: 'Cadeiras e mesas que se ajustam automaticamente' },
            { icon: '💡', name: 'Iluminação Smart', description: 'Luzes que se adaptam à atividade' },
            { icon: '🌡️', name: 'Clima Inteligente', description: 'Controle automático de temperatura' },
            { icon: '📱', name: 'Mesas Touch', description: 'Superfícies interativas multitouch' }
          ],
          benefits: [
            'Conforto otimizado para cada aluno',
            'Ambiente sempre adequado à atividade',
            'Maior concentração e produtividade',
            'Acessibilidade universal'
          ]
        }
      ],
      evolutionPhases: [
        {
          year: '2024',
          title: 'Fundação Digital',
          description: 'Implementação das primeiras tecnologias digitais básicas'
        },
        {
          year: '2029',
          title: 'Integração IA',
          description: 'Introdução de sistemas de inteligência artificial educacional'
        },
        {
          year: '2034',
          title: 'Realidade Imersiva',
          description: 'Adoção massiva de VR e AR para experiências de aprendizado'
        },
        {
          year: '2039',
          title: 'Ambientes Adaptativos',
          description: 'Espaços físicos que se moldam às necessidades dos alunos'
        },
        {
          year: '2044',
          title: 'Conectividade Total',
          description: 'Integração completa entre mundo físico e digital'
        },
        {
          year: '2074',
          title: 'Escola do Futuro',
          description: 'Visão completa da escola Seron em 50 anos'
        }
      ]
    }
  },
  methods: {
    onCardHover(index) {
      this.activeCard = index
    },
    
    onCardLeave(index) {
      this.activeCard = null
    },
    
    setActivePhase(index) {
      this.activePhase = index
    },
    
    toggleAccordion(index) {
      this.activeAccordion = this.activeAccordion === index ? null : index
    },
    
    showInfrastructureDetails(item) {
      this.selectedInfrastructure = item
      document.body.style.overflow = 'hidden'
    },
    
    closeModal() {
      this.selectedInfrastructure = null
      document.body.style.overflow = 'auto'
    }
  },
  
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
.infrastructure-section {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%);
}

.infrastructure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
}

.infrastructure-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
  position: relative;
}

.infrastructure-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-blue);
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.card-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.infrastructure-card:hover .card-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.8), rgba(139, 92, 246, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: 2;
}

.infrastructure-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.overlay-title {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  font-weight: 600;
}

.card-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.effect-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid var(--primary-blue);
  border-radius: 20px;
  opacity: 0;
  transition: var(--transition-smooth);
}

.infrastructure-card:hover .effect-glow {
  opacity: 1;
  animation: pulse 2s infinite;
}

.effect-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-blue);
  border-radius: 50%;
  opacity: 0;
  transition: var(--transition-smooth);
}

.infrastructure-card:hover .particle {
  opacity: 1;
  animation: particleFloat 3s ease-in-out infinite;
}

.particle:nth-child(odd) {
  background: var(--accent-purple);
  animation-delay: 0.5s;
}

.particle:nth-child(3n) {
  background: var(--secondary-cyan);
  animation-delay: 1s;
}

.card-content {
  padding: 30px;
}

.card-title {
  font-family: var(--font-futuristic);
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Acordeão */
.card-accordion {
  margin-bottom: 20px;
}

.accordion-item {
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  padding: 15px 20px;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition-smooth);
  font-size: 0.9rem;
  font-weight: 500;
}

.accordion-header:hover {
  background: rgba(0, 212, 255, 0.1);
}

.accordion-header.active {
  background: rgba(0, 212, 255, 0.15);
  color: var(--primary-blue);
}

.accordion-title {
  font-weight: 600;
}

.accordion-icon {
  font-size: 1.2rem;
  font-weight: bold;
  transition: var(--transition-smooth);
}

.accordion-content {
  display: none;
  background: rgba(255, 255, 255, 0.02);
  transition: opacity 0.3s ease-out;
}

.accordion-content.active {
  display: block;
  padding: 20px;
  opacity: 1;
}

.card-features {
  margin-bottom: 25px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.feature-icon {
  color: var(--primary-blue);
  font-weight: bold;
}

.feature-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.card-technologies h4 {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
}

.tech-tag {
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 4px 12px;
  font-size: 0.8rem;
  color: var(--primary-blue);
}

/* Timeline */
.evolution-timeline {
  margin-top: 60px;
}

.timeline-title {
  font-family: var(--font-futuristic);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-primary);
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gradient-primary);
}

.timeline-phase {
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.timeline-phase:hover {
  transform: translateX(10px);
}

.phase-marker {
  position: absolute;
  left: 20px;
  top: 0;
  z-index: 2;
}

.marker-dot {
  width: 20px;
  height: 20px;
  background: var(--gradient-primary);
  border-radius: 50%;
  border: 3px solid var(--dark-bg);
  transition: var(--transition-smooth);
}

.timeline-phase.active .marker-dot {
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
}

.marker-line {
  position: absolute;
  top: 20px;
  left: 9px;
  width: 2px;
  height: 40px;
  background: var(--gradient-primary);
}

.phase-content {
  margin-left: 60px;
  background: var(--card-bg);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
}

.timeline-phase.active .phase-content {
  border-color: var(--primary-blue);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.phase-year {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 5px;
}

.phase-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.phase-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid rgba(0, 212, 255, 0.3);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2rem;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.modal-close:hover {
  color: var(--primary-blue);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-image img {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
  border: 3px solid var(--primary-blue);
}

.modal-title {
  font-family: var(--font-futuristic);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.modal-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.modal-section {
  margin-bottom: 25px;
}

.modal-section h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  color: var(--primary-blue);
  margin-bottom: 15px;
}

.modal-section p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.resource-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.resource-info h5 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.resource-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.benefits-list {
  list-style: none;
  padding: 0;
}

.benefits-list li {
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  padding: 12px 15px;
  margin-bottom: 8px;
  color: var(--text-secondary);
  border-left: 3px solid var(--primary-blue);
}

/* Animações */
@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .infrastructure-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .infrastructure-card {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
  
  .card-description {
    font-size: 0.9rem;
  }
  
  .timeline-container::before {
    left: 15px;
  }
  
  .phase-marker {
    left: 5px;
  }
  
  .phase-content {
    margin-left: 40px;
  }
  
  .modal-header {
    flex-direction: column;
    text-align: center;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .accordion-header {
    padding: 12px 15px;
    font-size: 0.85rem;
  }
  
  .accordion-content.active {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .infrastructure-grid {
    gap: 20px;
  }
  
  .infrastructure-card {
    padding: 15px;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
  
  .card-description {
    font-size: 0.85rem;
  }
  
  .phase-content {
    margin-left: 30px;
  }
  
  .modal-content {
    padding: 15px;
    margin: 10px;
  }
  
  .accordion-header {
    padding: 10px 12px;
    font-size: 0.8rem;
  }
  
  .accordion-content.active {
    padding: 12px;
  }
  
  .feature-item {
    font-size: 0.8rem;
  }
  
  .tech-tag {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
}
</style>
