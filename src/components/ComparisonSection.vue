<template>
  <section class="comparison-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Hoje</span> vs 
          <span class="text-gradient">Futuro</span>
        </h2>
        <p class="section-subtitle">
          Veja como nossa escola está evoluindo ao longo dos anos
        </p>
      </div>
      
      <!-- Grid de comparações -->
      <div class="comparison-grid">
        <div 
          v-for="(item, index) in comparisonItems" 
          :key="index"
          class="comparison-item animate-on-scroll"
          :style="{ animationDelay: `${index * 0.2}s` }"
          @mouseenter="onItemHover(index)"
          @mouseleave="onItemLeave(index)"
        >
          <!-- Imagem atual -->
          <div class="comparison-image-container">
            <img 
              :src="item.currentImage" 
              :alt="`${item.title} - Atual`"
              class="comparison-image current-image"
              :class="{ 'active': activeItem === index }"
            >
            
            <!-- Imagem futura -->
            <img 
              :src="item.futureImage" 
              :alt="`${item.title} - Futuro`"
              class="comparison-image future-image"
              :class="{ 'active': activeItem === index }"
            >
            
            <!-- Overlay de transição -->
            <div class="image-overlay" :class="{ 'active': activeItem === index }">
              <div class="overlay-content">
                <span class="overlay-text">{{ activeItem === index ? 'Futuro' : 'Hoje' }}</span>
              </div>
            </div>
          </div>
          
          <!-- Conteúdo textual -->
          <div class="comparison-content">
            <h3 class="comparison-title">{{ item.title }}</h3>
            <p class="comparison-description">{{ item.description }}</p>
            
            
            <!-- Botão de ação -->
            <button 
              class="btn-primary btn-small"
              @click="showDetails(item)"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
      
      <!-- Modal de detalhes -->
      <div 
        v-if="selectedItem" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          
          <div class="modal-header">
            <h3 class="modal-title">{{ selectedItem.title }}</h3>
          </div>
          
          <div class="modal-body">
            <div class="modal-images">
              <div class="modal-image-group">
                <h4>Hoje</h4>
                <img :src="selectedItem.currentImage" :alt="`${selectedItem.title} - Atual`">
                <p class="image-description">{{ selectedItem.currentFeatures }}</p>
              </div>
              <div class="modal-image-group">
                <h4>Futuro</h4>
                <img :src="selectedItem.futureImage" :alt="`${selectedItem.title} - Futuro`">
                <p class="image-description">{{ selectedItem.futureFeatures }}</p>
              </div>
            </div>
            
            <div class="modal-description">
              <h4>Descrição Detalhada</h4>
              <p>{{ selectedItem.detailedDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ComparisonSection',
  data() {
    return {
      activeItem: null,
      selectedItem: null,
      comparisonItems: [
        {
          title: 'Sala de Aula',
          description: 'O ambiente de aprendizado está sendo transformado',
          currentImage: '/images/sala-atual.jpg',
          futureImage: '/images/sala-futuro.jpg',
          currentFeatures: 'Quadro tradicional, carteiras fixas, livros físicos',
          futureFeatures: 'Realidade aumentada, mesas interativas, IA personalizada',
          detailedDescription: 'Nossa sala de aula tradicional está evoluindo para um espaço completamente interativo, onde os alunos podem aprender através de realidade aumentada, mesas inteligentes que respondem ao toque e sistemas de IA que adaptam o conteúdo às necessidades individuais de cada estudante.'
        },
        {
          title: 'Laboratório de Informática',
          description: 'Tecnologia avançada para o aprendizado digital',
          currentImage: '/images/lab-atual.jpg',
          futureImage: '/images/lab-futuro.jpg',
          currentFeatures: 'Computadores desktop, internet básica, software educacional',
          futureFeatures: 'Computação quântica, hologramas, programação neural',
          detailedDescription: 'O laboratório de informática será equipado com computadores quânticos, permitindo que os alunos explorem conceitos avançados de programação e visualizem dados complexos através de hologramas interativos.'
        },
        {
          title: 'Quadra Esportiva',
          description: 'Esportes do futuro com tecnologia integrada',
          currentImage: '/images/quadra-atual.jpg',
          futureImage: '/images/quadra-futuro.jpg',
          currentFeatures: 'Quadra tradicional, equipamentos básicos, cronometragem manual',
          futureFeatures: 'Piso inteligente, sensores biométricos, treinamento com IA',
          detailedDescription: 'Nossa quadra esportiva terá um piso inteligente que monitora performance, sensores biométricos que acompanham a saúde dos alunos e sistemas de IA que personalizam treinos baseados nas capacidades individuais.'
        },
        {
          title: 'Corredores da Escola',
          description: 'Espaços de convivência e aprendizado contínuo',
          currentImage: '/images/corredor-atual.jpg',
          futureImage: '/images/corredor-futuro.jpg',
          currentFeatures: 'Corredores simples, quadros informativos, iluminação básica',
          futureFeatures: 'Corredores interativos, projeções holográficas, jardins verticais',
          detailedDescription: 'Os corredores se tornarão espaços de aprendizado contínuo, com projeções holográficas que mostram informações educacionais, jardins verticais que purificam o ar e sistemas de iluminação inteligente que se adaptam ao humor e energia dos alunos.'
        }
      ]
    }
  },
  methods: {
    onItemHover(index) {
      this.activeItem = index
    },
    
    onItemLeave(index) {
      this.activeItem = null
    },
    
    showDetails(item) {
      this.selectedItem = item
      document.body.style.overflow = 'hidden'
    },
    
    closeModal() {
      this.selectedItem = null
      document.body.style.overflow = 'auto'
    }
  },
  
  beforeUnmount() {
    // Garantir que o overflow seja restaurado
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
.comparison-section {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: var(--font-futuristic);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.comparison-item {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.comparison-item:hover {
  transform: translateY(-10px);
  border-color: var(--primary-blue);
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.comparison-image-container {
  position: relative;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 25px;
}

.comparison-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
  opacity: 1;
}

.future-image {
  opacity: 0;
}

.comparison-item:hover .current-image {
  opacity: 0;
}

.comparison-item:hover .future-image {
  opacity: 1;
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

.comparison-item:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-text {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.comparison-content {
  text-align: center;
}

.comparison-title {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
}

.comparison-description {
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
}

.comparison-features {
  margin-bottom: 25px;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-label {
  font-weight: 600;
  color: var(--primary-blue);
  font-size: 0.9rem;
}

.feature-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: right;
  flex: 1;
  margin-left: 15px;
}

.btn-small {
  padding: 10px 20px;
  font-size: 0.9rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.modal-content {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  max-width: 800px;
  width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  border: 1px solid rgba(0, 212, 255, 0.3);
  position: relative;
  margin: auto;
  box-sizing: border-box;
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
  margin-bottom: 25px;
}

.modal-title {
  font-family: var(--font-futuristic);
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: var(--text-primary);
}

.modal-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
}

.modal-image-group {
  text-align: center;
}

.modal-image-group h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--primary-blue);
}

.modal-image-group img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid rgba(0, 212, 255, 0.3);
  margin-bottom: 10px;
}

.image-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  font-style: italic;
  padding: 10px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 8px;
  border-left: 3px solid var(--primary-blue);
}

.modal-description {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .comparison-item {
    padding: 20px;
  }
  
  .comparison-title {
    font-size: 1.3rem;
  }
  
  .comparison-description {
    font-size: 0.9rem;
  }
  
  .comparison-image-container {
    height: 200px;
  }
  
  .modal-images {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .modal-image-group img {
    height: 150px;
  }
  
  .image-description {
    font-size: 0.8rem;
    padding: 8px;
  }
  
  .modal-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .comparison-grid {
    gap: 20px;
  }
  
  .comparison-item {
    padding: 15px;
  }
  
  .comparison-title {
    font-size: 1.2rem;
  }
  
  .comparison-description {
    font-size: 0.85rem;
  }
  
  .comparison-image-container {
    height: 150px;
  }
  
  .modal-content {
    padding: 20px;
    margin: 10px;
    max-height: calc(100vh - 20px);
    width: calc(100vw - 20px);
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-image-group img {
    height: 120px;
  }
  
  .image-description {
    font-size: 0.75rem;
    padding: 6px;
  }
  
  .modal-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 15px;
    margin: 5px;
    max-height: calc(100vh - 10px);
    width: calc(100vw - 10px);
    border-radius: 15px;
  }
  
  .modal-title {
    font-size: 1.3rem;
  }
  
  .modal-images {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .modal-image-group img {
    height: 100px;
  }
  
  .image-description {
    font-size: 0.7rem;
    padding: 4px;
  }
  
  .modal-description {
    font-size: 0.75rem;
  }
}

@media (max-width: 360px) {
  .modal-content {
    padding: 10px;
    margin: 2px;
    max-height: calc(100vh - 4px);
    width: calc(100vw - 4px);
    border-radius: 10px;
  }
  
  .modal-title {
    font-size: 1.1rem;
  }
  
  .modal-image-group img {
    height: 80px;
  }
}
</style>
