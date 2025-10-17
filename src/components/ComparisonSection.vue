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
                onerror="this.onerror=null;this.src='/images/placeholder.svg'"
              >
            
            <!-- Imagem futura -->
            <img 
              :src="item.futureImage" 
              :alt="`${item.title} - Futuro`"
              class="comparison-image future-image"
              :class="{ 'active': activeItem === index }"
                onerror="this.onerror=null;this.src='/images/placeholder.svg'"
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
          
          <!-- Título do Modal -->
          <div class="modal-title-section">
            <h3 class="modal-title">{{ selectedItem.title }}</h3>
            <p class="modal-subtitle">{{ selectedItem.description }}</p>
          </div>
          
          <div class="modal-body">
            <!-- Seção Hoje -->
            <div class="modal-section">
              <h4 class="section-title">Hoje</h4>
              <div class="modal-image-container">
                <img :src="selectedItem.currentImage" :alt="`${selectedItem.title} - Atual`" class="modal-image" onerror="this.onerror=null;this.src='/images/placeholder.svg'">
              </div>
              <div class="feature-description">
                <p>{{ selectedItem.currentFeatures }}</p>
              </div>
            </div>
            
            <!-- Seção Futuro -->
            <div class="modal-section">
              <h4 class="section-title">Futuro</h4>
              <div class="modal-image-container">
                <img :src="selectedItem.futureImage" :alt="`${selectedItem.title} - Futuro`" class="modal-image" onerror="this.onerror=null;this.src='/images/placeholder.svg'">
              </div>
              <div class="feature-description">
                <p>{{ selectedItem.futureFeatures }}</p>
              </div>
            </div>
            
            <!-- Descrição Detalhada -->
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
          currentImage: '/images/sala-hoje.jpeg',
          futureImage: '/images/sala-do-futuro.jpeg',
          currentFeatures: 'Quadro tradicional, carteiras fixas, livros físicos',
          futureFeatures: 'Realidade aumentada, mesas interativas, IA personalizada',
          detailedDescription: 'Nossa sala de aula tradicional está evoluindo para um espaço completamente interativo, onde os alunos podem aprender através de realidade aumentada, mesas inteligentes que respondem ao toque e sistemas de IA que adaptam o conteúdo às necessidades individuais de cada estudante.'
        },
        {
          title: 'Biblioteca',
          description: 'Centro de conhecimento e aprendizado digital',
          currentImage: '/images/biblioteca.jpeg',
          futureImage: '/images/biblioteca.png',
          currentFeatures: 'Livros físicos, mesas de estudo, computadores básicos',
          futureFeatures: 'Realidade virtual, livros digitais interativos, IA de pesquisa',
          detailedDescription: 'Nossa biblioteca será transformada em um centro de conhecimento digital, com livros em realidade virtual, sistemas de IA que ajudam na pesquisa e espaços de estudo imersivos que transportam os alunos para diferentes épocas e lugares.'
        },
        {
          title: 'Quadra Esportiva',
          description: 'Esportes do futuro com tecnologia integrada',
          currentImage: '/images/quadra-hoje.jpeg',
          futureImage: '/images/quadra do futuro.jpeg',
          currentFeatures: 'Quadra tradicional, equipamentos básicos, cronometragem manual',
          futureFeatures: 'Piso inteligente, sensores biométricos, treinamento com IA',
          detailedDescription: 'Nossa quadra esportiva terá um piso inteligente que monitora performance, sensores biométricos que acompanham a saúde dos alunos e sistemas de IA que personalizam treinos baseados nas capacidades individuais.'
        },
        {
          title: 'Corredores da Escola',
          description: 'Espaços de convivência e aprendizado contínuo',
          currentImage: '/images/escada-hoje.jpeg',
          futureImage: '/images/escada-futuro.jpg',
          currentFeatures: 'Corredores simples, quadros informativos, iluminação básica',
          futureFeatures: 'Corredores interativos, projeções holográficas, jardins verticais',
          detailedDescription: 'Os corredores se tornarão espaços de aprendizado contínuo, com projeções holográficas que mostram informações educacionais, jardins verticais que purificam o ar e sistemas de iluminação inteligente que se adaptam ao humor e energia dos alunos.'
        },
        {
          title: 'Refeitório',
          description: 'Espaço de alimentação e convivência',
          currentImage: '/images/fereitorio-hoje.jpeg',
          futureImage: '/images/refeitorio.jpg',
          currentFeatures: 'Mesas tradicionais, cardápio fixo, atendimento manual',
          futureFeatures: 'IA da Tia Ana, cardápio personalizado, robôs de atendimento',
          detailedDescription: 'Nosso refeitório será transformado com a IA da Tia Ana, que personaliza cardápios baseados nas preferências e necessidades nutricionais de cada aluno, além de robôs que auxiliam no atendimento e distribuição das refeições.'
        },
        {
          title: 'Cozinha',
          description: 'Preparação de refeições com tecnologia avançada',
          currentImage: '/images/cozinha.jpeg',
          futureImage: '/images/cozinha-do-futuro.jpg',
          currentFeatures: 'Equipamentos básicos, preparação manual, cardápio limitado',
          futureFeatures: 'Robôs chef, impressão 3D de alimentos, IA nutricional',
          detailedDescription: 'Nossa cozinha terá robôs chef que preparam refeições com precisão, impressoras 3D que criam alimentos personalizados e sistemas de IA que garantem o equilíbrio nutricional perfeito para cada aluno.'
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

/* Modal - Tema Escuro */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(15px);
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  padding: 0;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid #00d4ff;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
  position: relative;
  margin: 0 auto;
}

/* Mobile first - modais menores e sem box-shadow */
@media (max-width: 768px) {
  .modal-content {
    padding: 0;
    margin: 15px;
    max-width: 95%;
    width: 95%;
    max-height: 95vh;
    border-radius: 20px;
    overflow-y: auto;
  }
  
  .modal-title-section {
    padding: 20px 20px 15px;
  }
  
  .modal-section {
    padding: 20px 20px;
  }
  
  .modal-description {
    padding: 20px 20px 25px;
  }
  
  .comparison-item {
    box-shadow: none !important;
  }
  
  .comparison-item:hover {
    box-shadow: none !important;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 0;
    margin: 8px;
    max-width: 98%;
    width: 98%;
    max-height: 95vh;
    border-radius: 15px;
    overflow-y: auto;
  }
  
  .modal-title-section {
    padding: 15px 15px 10px;
  }
  
  .modal-section {
    padding: 15px 15px;
  }
  
  .modal-description {
    padding: 15px 15px 20px;
  }
  
  .modal-image {
    height: 150px;
  }
  
  .modal-title {
    font-size: 1.4rem;
  }
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  color: #00d4ff;
  font-size: 2rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #ffffff;
  transform: rotate(90deg);
}

.modal-title-section {
  padding: 30px 30px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
}

.modal-title {
  font-family: var(--font-futuristic);
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.modal-subtitle {
  color: #00d4ff;
  font-size: 1.1rem;
  font-weight: 600;
}

.modal-body {
  padding: 0;
}

.modal-section {
  padding: 25px 30px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
}

.section-title {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 15px;
  text-align: center;
}

.modal-image-container {
  text-align: center;
  margin-bottom: 15px;
}

.modal-image {
  width: 100%;
  max-width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  border: 2px solid #00d4ff;
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
}

.feature-description {
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid #00d4ff;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
}

.feature-description p {
  color: #ffffff;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.modal-description {
  padding: 25px 30px 30px;
}

.modal-description h4 {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 15px;
}

.modal-description p {
  color: #ffffff;
  line-height: 1.6;
  font-size: 0.95rem;
}

.modal-images {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  max-width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid rgba(0, 212, 255, 0.3);
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .modal-images {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .modal-content {
    padding: 20px;
    margin: 10px;
    max-height: 90vh;
    overflow-y: auto;
    width: 95%;
  }
  
  .modal-title {
    font-size: 1.6rem;
  }
  
  .modal-image-group img {
    height: 200px;
  }
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

/* Responsividade melhorada */
/* Tablets e dispositivos médios */
@media (max-width: 1024px) {
  .comparison-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }
  
  .comparison-image-container {
    height: 220px;
  }
  
  .modal-images {
    gap: 15px;
  }
}

/* Tablets pequenos e dispositivos móveis grandes */
@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .comparison-item {
    padding: 20px;
  }
  
  .comparison-title {
    font-size: 1.4rem;
  }
  
  .comparison-description {
    font-size: 0.95rem;
  }
  
  .comparison-image-container {
    height: 200px;
  }
  
  .modal-images {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .modal-image-group img {
    height: 250px;
  }
  
  .image-description {
    font-size: 0.85rem;
    padding: 10px;
  }
  
  .modal-description {
    font-size: 1rem;
  }
}

/* Dispositivos móveis pequenos */
@media (max-width: 480px) {
  .comparison-grid {
    gap: 20px;
  }
  
  .comparison-item {
    padding: 18px;
  }
  
  .comparison-title {
    font-size: 1.3rem;
  }
  
  .comparison-description {
    font-size: 0.9rem;
  }
  
  .comparison-image-container {
    height: 180px;
  }
  
  .modal-content {
    padding: 20px;
    margin: 10px;
    max-height: 90vh;
  }
  
  .modal-title {
    font-size: 1.6rem;
  }
  
  .modal-image-group img {
    height: 200px;
  }
  
  .image-description {
    font-size: 0.8rem;
    padding: 8px;
  }
  
  .modal-description {
    font-size: 0.95rem;
  }
  
  .btn-small {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    display: block;
  }
}

/* Dispositivos muito pequenos */
@media (max-width: 360px) {
  .comparison-grid {
    gap: 15px;
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
    height: 160px;
  }
  
  .modal-content {
    padding: 15px;
    margin: 5px;
  }
  
  .modal-title {
    font-size: 1.4rem;
  }
  
  .modal-image-group img {
    height: 180px;
  }
  
  .image-description {
    font-size: 0.75rem;
    padding: 6px;
  }
  
  .modal-description {
    font-size: 0.9rem;
  }
}

/* Orientação landscape em mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .comparison-image-container {
    height: 120px;
  }
  
  .modal-image-group img {
    height: 150px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
}
</style>
