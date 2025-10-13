<template>
  <section class="students-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Professores</span> Hoje e Amanhã
        </h2>
        <p class="section-subtitle">
          Conheça nossos educadores e suas turmas
        </p>
      </div>
      
      <!-- Grid de alunos -->
      <div class="students-grid">
        <div 
          v-for="(student, index) in students" 
          :key="index"
          class="student-card animate-on-scroll"
          :style="{ animationDelay: `${index * 0.2}s` }"
          @mouseenter="onStudentHover(index)"
          @mouseleave="onStudentLeave(index)"
        >
          <!-- Container da imagem -->
          <div class="student-image-container">
            <!-- Foto atual -->
            <img 
              :src="student.currentPhoto" 
              :alt="`${student.name} - Atual`"
              class="student-photo current-photo"
              :class="{ 'active': activeStudent === index }"
            >
            
            <!-- Foto futura -->
            <img 
              :src="student.futurePhoto" 
              :alt="`${student.name} - Futuro`"
              class="student-photo future-photo"
              :class="{ 'active': activeStudent === index }"
            >
            
            <!-- Overlay de transição -->
            <div class="photo-overlay" :class="{ 'active': activeStudent === index }">
              <div class="overlay-content">
                <span class="overlay-text">{{ activeStudent === index ? 'Futuro' : 'Hoje' }}</span>
                <div class="overlay-icon">{{ activeStudent === index ? '🚀' : '👨‍🎓' }}</div>
              </div>
            </div>
            
            <!-- Efeitos visuais -->
            <div class="photo-effects">
              <div class="effect-ring"></div>
              <div class="effect-particles">
                <div class="particle" v-for="n in 8" :key="n"></div>
              </div>
            </div>
          </div>
          
          <!-- Informações do aluno -->
          <div class="student-info">
            <h3 class="student-name">{{ student.name }}</h3>
            <p class="student-grade">{{ student.grade }}</p>
            <p class="student-age">{{ student.age }} anos</p>
            
            <!-- Aspirações -->
            <div class="student-aspirations">
              <h4>Aspirações:</h4>
              <ul class="aspirations-list">
                <li v-for="aspiration in student.aspirations" :key="aspiration">
                  {{ aspiration }}
                </li>
              </ul>
            </div>
            
            <!-- Depoimento -->
            <div class="student-testimonial">
              <blockquote>
                "{{ student.testimonial }}"
              </blockquote>
            </div>
            
            <!-- Botão de ação -->
            <button 
              class="btn-primary btn-small"
              @click="showStudentDetails(student)"
            >
              Ver Perfil Completo
            </button>
          </div>
        </div>
      </div>
      
      <!-- Estatísticas dos alunos -->
      <div class="students-stats animate-on-scroll">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ totalStudents }}</div>
            <div class="stat-label">Alunos Ativos</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ averageAge }}</div>
            <div class="stat-label">Idade Média</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ futureCareers }}</div>
            <div class="stat-label">Carreiras Futuras</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Preparados para o Futuro</div>
          </div>
        </div>
      </div>
      
      <!-- Modal de detalhes do aluno -->
      <div 
        v-if="selectedStudent" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          
          <div class="modal-header">
            <div class="modal-student-photo">
              <img :src="selectedStudent.currentPhoto" :alt="selectedStudent.name">
            </div>
            <div class="modal-student-info">
              <h3 class="modal-title">{{ selectedStudent.name }}</h3>
              <p class="modal-grade">{{ selectedStudent.grade }} • {{ selectedStudent.age }} anos</p>
            </div>
          </div>
          
          <div class="modal-body">
            <div class="modal-section">
              <h4>Visão de Futuro</h4>
              <p>{{ selectedStudent.futureVision }}</p>
            </div>
            
            <div class="modal-section">
              <h4>Habilidades Desenvolvidas</h4>
              <div class="skills-grid">
                <div 
                  v-for="skill in selectedStudent.skills" 
                  :key="skill.name"
                  class="skill-item"
                >
                  <div class="skill-name">{{ skill.name }}</div>
                  <div class="skill-bar">
                    <div 
                      class="skill-progress" 
                      :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                  <div class="skill-percentage">{{ skill.level }}%</div>
                </div>
              </div>
            </div>
            
            <div class="modal-section">
              <h4>Projetos Futuros</h4>
              <ul class="projects-list">
                <li v-for="project in selectedStudent.projects" :key="project">
                  {{ project }}
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
  name: 'StudentsSection',
  data() {
    return {
      activeStudent: null,
      selectedStudent: null,
      totalStudents: 0,
      averageAge: 0,
      futureCareers: 0,
      students: [
        {
          name: 'Ana Silva',
          grade: '9º Ano',
          age: 14,
          currentPhoto: '/images/aluno-ana-atual.jpg',
          futurePhoto: '/images/aluno-ana-futuro.jpg',
          aspirations: ['Engenharia Espacial', 'Pesquisa Científica', 'Inovação Tecnológica'],
          testimonial: 'Quero ser uma engenheira espacial e contribuir para a exploração do universo. A Escola Seron me prepara para esse futuro incrível!',
          futureVision: 'Vejo-me trabalhando na NASA ou SpaceX, desenvolvendo tecnologias para colonização de outros planetas.',
          skills: [
            { name: 'Matemática', level: 95 },
            { name: 'Física', level: 90 },
            { name: 'Programação', level: 85 },
            { name: 'Liderança', level: 80 }
          ],
          projects: [
            'Projeto de Foguete Amador',
            'Simulação de Missão Espacial',
            'Robótica Avançada'
          ]
        },
        {
          name: 'Carlos Mendes',
          grade: '8º Ano',
          age: 13,
          currentPhoto: '/images/aluno-carlos-atual.jpg',
          futurePhoto: '/images/aluno-carlos-futuro.jpg',
          aspirations: ['Medicina Digital', 'Inteligência Artificial', 'Saúde Preventiva'],
          testimonial: 'Sonho em usar a tecnologia para salvar vidas. Quero desenvolver sistemas de IA que ajudem médicos a diagnosticar doenças.',
          futureVision: 'Trabalharei em hospitais inteligentes, onde a IA e a medicina se unem para criar tratamentos personalizados.',
          skills: [
            { name: 'Biologia', level: 92 },
            { name: 'Química', level: 88 },
            { name: 'IA', level: 75 },
            { name: 'Empatia', level: 95 }
          ],
          projects: [
            'App de Diagnóstico Médico',
            'Sistema de Monitoramento de Saúde',
            'IA para Análise de Exames'
          ]
        },
        {
          name: 'Marina Costa',
          grade: '7º Ano',
          age: 12,
          currentPhoto: '/images/aluno-marina-atual.jpg',
          futurePhoto: '/images/aluno-marina-futuro.jpg',
          aspirations: ['Arte Digital', 'Design de Jogos', 'Realidade Virtual'],
          testimonial: 'Amo criar mundos virtuais onde as pessoas podem aprender e se divertir. A tecnologia é minha tela em branco!',
          futureVision: 'Serei uma designer de experiências imersivas, criando jogos educacionais que transformam o aprendizado.',
          skills: [
            { name: 'Arte Digital', level: 90 },
            { name: 'Design', level: 85 },
            { name: 'Programação', level: 70 },
            { name: 'Criatividade', level: 98 }
          ],
          projects: [
            'Jogo Educacional VR',
            'Mundo Virtual Interativo',
            'Arte Generativa com IA'
          ]
        },
        {
          name: 'Pedro Santos',
          grade: '6º Ano',
          age: 11,
          currentPhoto: '/images/aluno-pedro-atual.jpg',
          futurePhoto: '/images/aluno-pedro-futuro.jpg',
          aspirations: ['Robótica', 'Automação', 'Inovação Industrial'],
          testimonial: 'Robôs são fascinantes! Quero criar máquinas que ajudem as pessoas e tornem o trabalho mais eficiente.',
          futureVision: 'Desenvolverei robôs assistentes para ajudar pessoas com deficiência e automatizar tarefas domésticas.',
          skills: [
            { name: 'Robótica', level: 88 },
            { name: 'Eletrônica', level: 82 },
            { name: 'Programação', level: 78 },
            { name: 'Inovação', level: 90 }
          ],
          projects: [
            'Robô Assistente Doméstico',
            'Sistema de Automação',
            'Prototipagem 3D'
          ]
        }
      ]
    }
  },
  mounted() {
    this.calculateStats()
  },
  methods: {
    onStudentHover(index) {
      this.activeStudent = index
    },
    
    onStudentLeave(index) {
      this.activeStudent = null
    },
    
    showStudentDetails(student) {
      this.selectedStudent = student
      document.body.style.overflow = 'hidden'
    },
    
    closeModal() {
      this.selectedStudent = null
      document.body.style.overflow = 'auto'
    },
    
    calculateStats() {
      this.totalStudents = this.students.length
      this.averageAge = Math.round(
        this.students.reduce((sum, student) => sum + student.age, 0) / this.totalStudents
      )
      this.futureCareers = new Set(
        this.students.flatMap(student => student.aspirations)
      ).size
    }
  },
  
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
.students-section {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
}

.student-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.student-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-blue);
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.student-image-container {
  position: relative;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 25px;
}

.student-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
  opacity: 1;
}

.future-photo {
  opacity: 0;
}

.student-card:hover .current-photo {
  opacity: 0;
}

.student-card:hover .future-photo {
  opacity: 1;
}

.photo-overlay {
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

.student-card:hover .photo-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-text {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.overlay-icon {
  font-size: 2rem;
}

.photo-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.effect-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid var(--primary-blue);
  border-radius: 15px;
  opacity: 0;
  transition: var(--transition-smooth);
}

.student-card:hover .effect-ring {
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

.student-card:hover .particle {
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

.student-info {
  text-align: center;
}

.student-name {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--text-primary);
}

.student-grade {
  color: var(--primary-blue);
  font-weight: 500;
  margin-bottom: 5px;
}

.student-age {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.student-aspirations {
  margin-bottom: 20px;
}

.student-aspirations h4 {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.aspirations-list {
  list-style: none;
  padding: 0;
}

.aspirations-list li {
  background: rgba(0, 212, 255, 0.1);
  border-radius: 15px;
  padding: 5px 12px;
  margin-bottom: 5px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.student-testimonial {
  margin-bottom: 25px;
}

.student-testimonial blockquote {
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.9rem;
  position: relative;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid var(--primary-blue);
}

/* Estatísticas */
.students-stats {
  margin-top: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-item {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
}

.stat-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary-blue);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.stat-number {
  font-family: var(--font-futuristic);
  font-size: 3rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  max-width: 600px;
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

.modal-student-photo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-blue);
}

.modal-title {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.modal-grade {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.modal-section {
  margin-bottom: 25px;
}

.modal-section h4 {
  font-family: var(--font-futuristic);
  font-size: 1.1rem;
  color: var(--primary-blue);
  margin-bottom: 15px;
}

.modal-section p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.skills-grid {
  display: grid;
  gap: 15px;
}

.skill-item {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 15px;
  align-items: center;
}

.skill-name {
  font-weight: 500;
  color: var(--text-primary);
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 1s ease-out;
}

.skill-percentage {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.projects-list {
  list-style: none;
  padding: 0;
}

.projects-list li {
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  padding: 10px 15px;
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
  .students-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-header {
    flex-direction: column;
    text-align: center;
  }
  
  .skill-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
