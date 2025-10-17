<template>
  <section class="teachers-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Professores</span> do Futuro
        </h2>
        <p class="section-subtitle">
          Conheça nossa equipe de educadores que moldam o amanhã
        </p>
      </div>
      
      
      <!-- Grid de professores -->
      <div class="teachers-grid">
        <div 
          v-for="(teacher, index) in teachers" 
          :key="index"
          class="teacher-card animate-on-scroll"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="openModal(teacher)"
        >
          <!-- Foto do professor -->
          <div class="teacher-photo-container">
            <img 
              :src="teacher.photo" 
              :alt="teacher.name"
              class="teacher-photo"
              onerror="this.onerror=null;this.src='/images/placeholder.svg'"
            >
          </div>
          
          <!-- Informações do professor -->
          <div class="teacher-info">
            <h3 class="teacher-name">{{ teacher.name }}</h3>
            <p class="teacher-subject">{{ teacher.subject }}</p>
            </div>
            
            <!-- Botão de ação -->
          <button class="btn-saiba-mais">
            <span>Saiba Mais</span>
            <div class="btn-icon">→</div>
            </button>
        </div>
      </div>
      
      <!-- Modal do professor -->
      <div 
        v-if="selectedTeacher" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          
          <!-- Título do Modal -->
          <div class="modal-title-section">
            <h3 class="modal-title">{{ selectedTeacher.name }}</h3>
            <p class="modal-subtitle">{{ selectedTeacher.subject }}</p>
          </div>
          
          <div class="modal-body">
            <!-- Seção Hoje -->
            <div class="modal-section">
              <h4 class="section-title">Hoje</h4>
              <div class="modal-photo-container">
                <img 
                  :src="selectedTeacher.photo" 
                  :alt="selectedTeacher.name"
                  class="modal-photo"
                  onerror="this.onerror=null;this.src='/images/placeholder.svg'"
                >
              </div>
              <div class="feature-description">
                <p>Professor tradicional com métodos convencionais de ensino</p>
              </div>
            </div>
            
            <!-- Seção Futuro -->
            <div class="modal-section">
              <h4 class="section-title">Futuro</h4>
              <div class="modal-photo-container">
                <img 
                  :src="selectedTeacher.photo" 
                  :alt="selectedTeacher.name"
                  class="modal-photo"
                  onerror="this.onerror=null;this.src='/images/placeholder.svg'"
                >
              </div>
              <div class="feature-description">
                <p>{{ selectedTeacher.futureVision }}</p>
              </div>
            </div>
            
            <!-- Descrição Detalhada -->
            <div class="modal-description">
              <h4>Descrição Detalhada</h4>
              <p>{{ selectedTeacher.futureVision }}</p>
              <div class="teacher-joke">
                <h5>Piada do Professor</h5>
                <p>{{ selectedTeacher.joke }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TeachersSection',
  data() {
    return {
      totalTeachers: 9,
      totalClasses: 42,
      totalStudents: 2100,
      selectedTeacher: null,
      teachers: [
        {
          name: 'Cistiane',
          subject: 'Matemática',
          photo: '/images/cistiane-matematica.png',
          futureVision: 'Acredito que a matemática será ensinada através de realidade virtual, onde os alunos poderão visualizar equações em 3D e resolver problemas em ambientes imersivos.',
          joke: 'Por que o matemático sempre leva um lápis extra? Porque ele nunca sabe quando vai precisar de mais um! 📐'
        },
        {
          name: 'Nathacha',
          subject: 'Matemática',
          photo: '/images/nathacha-matematica.png',
          futureVision: 'No futuro, usaremos IA para personalizar o ensino de matemática, adaptando a dificuldade em tempo real conforme o progresso de cada aluno.',
          joke: 'Por que a matemática é como uma música? Porque tem ritmo, harmonia e sempre termina em uma nota alta! 🎵'
        },
        {
          name: 'Paulo',
          subject: 'Português',
          photo: '/images/paulo-portugues.png',
          futureVision: 'Imagino um futuro onde os alunos escrevem com assistência de IA, mas mantendo a criatividade e autenticidade humana na expressão literária.',
          joke: 'Por que o professor de português sempre sorri? Porque ele adora ver as palavras "feliz" nos textos dos alunos! 😊'
        },
        {
          name: 'Danielle',
          subject: 'Português',
          photo: '/images/danielle-portugues.png',
          futureVision: 'Acredito que no futuro teremos livros digitais interativos que respondem às dúvidas dos alunos em tempo real, criando uma experiência de leitura única.',
          joke: 'Por que o professor de português sempre tem um dicionário? Porque ele quer que todos os alunos tenham as palavras certas! 📚'
        },
        {
          name: 'Rafael',
          subject: 'Português',
          photo: '/images/rafael-portugues.png',
          futureVision: 'No futuro, usaremos realidade aumentada para ensinar literatura, permitindo que os alunos "entrem" nas histórias e interajam com os personagens.',
          joke: 'Por que o professor de português ama o verão? Porque é a estação mais "calorosa" para aprender novas palavras! ☀️'
        },
        {
          name: 'Vitor',
          subject: 'Educação Física',
          photo: '/images/vitor-educacao-fisica.png',
          futureVision: 'No futuro, usaremos sensores de movimento e realidade aumentada para criar exercícios personalizados e jogos educativos que tornam a educação física mais divertida e eficaz.',
          joke: 'Por que o professor de educação física nunca fica doente? Porque ele tem muita "resistência"! 💪'
        },
        {
          name: 'Gabriel',
          subject: 'Geografia',
          photo: '/images/gabriel-geografia.png',
          futureVision: 'Imagino um futuro onde os alunos exploram o mundo através de mapas interativos em 3D, podendo "voar" sobre países e explorar diferentes culturas em realidade virtual.',
          joke: 'Por que o professor de geografia é sempre pontual? Porque ele nunca perde a "orientação"! 🗺️'
        },
        {
          name: 'Alcir',
          subject: 'Geografia',
          photo: '/images/alcir-geografia.png',
          futureVision: 'Acredito que no futuro teremos simuladores climáticos e de ecossistemas que permitem aos alunos experimentar diferentes ambientes e entender melhor a geografia do planeta.',
          joke: 'Por que o professor de geografia adora escalar montanhas? Porque ele sempre quer chegar ao "topo" do conhecimento! ⛰️'
        },
        {
          name: 'Livia',
          subject: 'Artes',
          photo: '/images/livia-artes.jpeg',
          futureVision: 'No futuro, usaremos pincéis digitais e esculturas em 3D, criando obras de arte que poderão ser expostas em galerias virtuais e interagir com o público.',
          joke: 'Por que o artista nunca fica triste? Porque ele sempre pinta um sorriso no rosto! 🎨'
        }
      ]
    }
  },
  methods: {
    openModal(teacher) {
      this.selectedTeacher = teacher
      document.body.style.overflow = 'hidden'
    },
    
    closeModal() {
      this.selectedTeacher = null
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
.teachers-section {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  padding: 80px 0;
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

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: var(--card-bg);
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: var(--transition-smooth);
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.stat-number {
  font-family: var(--font-futuristic);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.teacher-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: var(--transition-smooth);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.teacher-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
  border-color: rgba(0, 212, 255, 0.4);
}

.teacher-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.teacher-card:hover::before {
  transform: scaleX(1);
}

.teacher-photo-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(0, 212, 255, 0.3);
  transition: var(--transition-smooth);
}

.teacher-card:hover .teacher-photo-container {
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.teacher-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 212, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
}

.teacher-card:hover .photo-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: 2rem;
  color: white;
}

.teacher-info {
  text-align: center;
  margin-bottom: 20px;
}

.teacher-name {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.teacher-subject {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-saiba-mais {
  width: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border: none;
  border-radius: 15px;
  padding: 12px 20px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-saiba-mais:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.4);
}

.btn-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.btn-saiba-mais:hover .btn-icon {
  transform: translateX(3px);
}

/* Modal Styles - Tema Escuro */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(15px);
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid #00d4ff;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
  margin: 0 auto;
}

/* Mobile first - modais menores e sem box-shadow */
@media (max-width: 768px) {
  .modal-content {
    max-width: 95%;
    width: 95%;
    max-height: 95vh;
    margin: 15px;
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
  
  .teacher-card {
    box-shadow: none !important;
  }
  
  .teacher-card:hover {
    box-shadow: none !important;
  }
}

@media (max-width: 480px) {
  .modal-content {
    max-width: 98%;
    width: 98%;
    max-height: 95vh;
    margin: 8px;
    border-radius: 15px;
    overflow-y: auto;
  }
  
  .modal-photo {
    width: 80px;
    height: 80px;
  }
  
  .modal-name {
    font-size: 1.3rem;
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
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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

.modal-photo-container {
  text-align: center;
  margin-bottom: 15px;
}

.modal-photo {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  object-fit: cover;
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

.modal-body {
  padding: 0;
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
  margin-bottom: 20px;
}

.teacher-joke {
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid #00d4ff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.teacher-joke h5 {
  color: #00d4ff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.teacher-joke p {
  color: #ffffff;
  font-size: 0.9rem;
  line-height: 1.5;
  font-style: italic;
  margin: 0;
}

/* Responsividade */
@media (max-width: 1024px) {
  .teachers-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .modal-content {
    max-width: 500px;
  }
  
  .modal-header {
    padding: 30px 30px 15px;
  }
  
  .modal-body {
    padding: 25px 30px 30px;
  }
}

@media (max-width: 768px) {
  .teachers-section {
    padding: 60px 0;
  }
  
  .section-header {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .section-subtitle {
    font-size: clamp(0.9rem, 4vw, 1.2rem);
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 40px;
  }
  
  .stat-item {
    padding: 20px 15px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .teachers-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .teacher-card {
    padding: 20px;
  }
  
  .teacher-photo-container {
    width: 100px;
    height: 100px;
  }
  
  .modal-content {
    margin: 10px;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 25px 25px 15px;
  }
  
  .modal-photo {
    width: 120px;
    height: 120px;
  }
  
  .modal-name {
    font-size: 1.6rem;
  }
  
  .modal-body {
    padding: 20px 25px 25px;
  }
  
  .teacher-joke {
    padding: 20px;
  }
}

/* Responsividade para tablets - removida duplicação */

@media (max-width: 480px) {
  .teachers-section {
    padding: 50px 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .stats-container {
    margin-bottom: 30px;
  }
  
  .stat-item {
    padding: 15px 10px;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  
  .teacher-card {
    padding: 15px;
  }
  
  .teacher-photo-container {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
  }
  
  .teacher-name {
    font-size: 1.1rem;
  }
  
  .teacher-subject {
    font-size: 0.8rem;
  }
  
  .btn-saiba-mais {
    padding: 10px 15px;
    font-size: 0.8rem;
  }
  
  .modal-header {
    padding: 20px 20px 10px;
  }
  
  .modal-photo {
    width: 100px;
    height: 100px;
  }
  
  .modal-name {
    font-size: 1.4rem;
  }
  
  .modal-subject {
    font-size: 1rem;
  }
  
  .modal-body {
    padding: 15px 20px 20px;
  }
  
  .detail-section {
    margin-bottom: 20px;
  }
  
  .detail-section h4 {
    font-size: 1rem;
  }
  
  .detail-section p {
    font-size: 0.9rem;
  }
  
  .teacher-joke {
    padding: 15px;
  }
  
  .joke-icon {
    font-size: 2rem;
  }
  
  .teacher-joke h4 {
    font-size: 1.1rem;
  }
  
  .joke-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .teacher-photo-container {
    width: 70px;
    height: 70px;
  }
  
  .teacher-name {
    font-size: 1rem;
  }
  
  .modal-content {
    max-width: 100%;
    width: 100%;
    max-height: 95vh;
    margin: 5px;
    border-radius: 12px;
    overflow-y: auto;
  }
  
  .modal-photo {
    width: 70px;
    height: 70px;
  }
  
  .modal-name {
    font-size: 1.2rem;
  }
  
  .modal-subtitle {
    font-size: 0.9rem;
  }
  
  .modal-title-section {
    padding: 10px 10px 8px;
  }
  
  .modal-section {
    padding: 10px 10px;
  }
  
  .modal-description {
    padding: 10px 10px 15px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .teachers-section {
    padding: 40px 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .stats-container {
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .stat-item {
    padding: 15px 10px;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
  
  .teachers-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .teacher-card {
    padding: 15px;
  }
  
  .teacher-photo-container {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
  
  .teacher-name {
    font-size: 0.9rem;
  }
  
  .teacher-subject {
    font-size: 0.7rem;
  }
  
  .btn-saiba-mais {
    padding: 8px 12px;
    font-size: 0.7rem;
  }
  
  .modal-content {
    max-height: 95vh;
    max-width: 90%;
    width: 90%;
    margin: 10px;
  }
  
  .modal-header {
    padding: 20px 20px 10px;
  }
  
  .modal-photo {
    width: 80px;
    height: 80px;
  }
  
  .modal-name {
    font-size: 1.2rem;
  }
  
  .modal-subject {
    font-size: 0.9rem;
  }
  
  .modal-body {
    padding: 15px 20px 20px;
  }
  
  .detail-section {
    margin-bottom: 15px;
  }
  
  .detail-section h4 {
    font-size: 0.9rem;
  }
  
  .detail-section p {
    font-size: 0.8rem;
  }
  
  .teacher-joke {
    padding: 15px;
  }
  
  .joke-icon {
    font-size: 1.5rem;
  }
  
  .teacher-joke h4 {
    font-size: 1rem;
  }
  
  .joke-text {
    font-size: 0.8rem;
  }
}
</style>