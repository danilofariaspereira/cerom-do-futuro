<template>
  <section class="teachers-section section">
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
      
      <!-- Grid de professores -->
      <div class="teachers-grid">
        <div 
          v-for="(teacher, index) in teachers" 
          :key="index"
          class="teacher-card animate-on-scroll"
          :style="{ animationDelay: `${index * 0.2}s` }"
          @mouseenter="onTeacherHover(index)"
          @mouseleave="onTeacherLeave(index)"
        >
          <!-- Container do ícone -->
          <div class="teacher-icon-container">
            <!-- Ícone atual -->
            <div class="teacher-icon current-icon" :class="{ 'active': activeTeacher === index }">
              {{ teacher.icon }}
            </div>
            
            <!-- Ícone futura -->
            <div class="teacher-icon future-icon" :class="{ 'active': activeTeacher === index }">
              🤖
            </div>
            
            <!-- Overlay de transição -->
            <div class="icon-overlay" :class="{ 'active': activeTeacher === index }">
              <div class="overlay-content">
                <span class="overlay-text">{{ activeTeacher === index ? 'Futuro' : 'Hoje' }}</span>
              </div>
            </div>
            
            <!-- Efeitos visuais -->
            <div class="icon-effects">
              <div class="effect-ring"></div>
            </div>
          </div>
          
          <!-- Conteúdo do professor -->
          <div class="teacher-content">
            <h3 class="teacher-name">{{ teacher.name }}</h3>
            <p class="teacher-subject">{{ teacher.subject }}</p>
            <p class="teacher-grades">{{ teacher.grades.join(', ') }}</p>
            
            <!-- Depoimento -->
            <div class="teacher-testimonial">
              <blockquote>
                "{{ teacher.testimonial }}"
              </blockquote>
            </div>
            
            <!-- Botão de ação -->
            <button 
              class="btn-primary btn-small"
              @click="showTeacherDetails(teacher)"
            >
              Ver Turmas
            </button>
          </div>
        </div>
      </div>
      
      <!-- Estatísticas dos professores -->
      <div class="teachers-stats animate-on-scroll">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ totalTeachers }}</div>
            <div class="stat-label">Professores Ativos</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ totalClasses }}</div>
            <div class="stat-label">Turmas</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ totalStudents }}</div>
            <div class="stat-label">Alunos</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Preparados para o Futuro</div>
          </div>
        </div>
      </div>
      
      <!-- Modal de detalhes do professor -->
      <div 
        v-if="selectedTeacher" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          
          <div class="modal-header">
            <div class="modal-teacher-icon">
              <div class="teacher-icon-large">{{ selectedTeacher.icon }}</div>
            </div>
            <div class="modal-teacher-info">
              <h3 class="modal-title">{{ selectedTeacher.name }}</h3>
              <p class="modal-subject">{{ selectedTeacher.subject }}</p>
              <p class="modal-grades">{{ selectedTeacher.grades.join(', ') }}</p>
            </div>
          </div>
          
          <div class="modal-body">
            <div class="modal-section">
              <h4>Visão de Futuro</h4>
              <p>{{ selectedTeacher.futureVision }}</p>
            </div>
            
            <div class="modal-section">
              <h4>Habilidades</h4>
              <div class="skills-grid">
                <div 
                  v-for="skill in selectedTeacher.skills" 
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
              <h4>Turmas</h4>
              <ul class="classes-list">
                <li v-for="classItem in selectedTeacher.classes" :key="classItem">
                  {{ classItem }}
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
  name: 'TeachersSection',
  data() {
    return {
      activeTeacher: null,
      selectedTeacher: null,
      totalTeachers: 0,
      totalClasses: 0,
      totalStudents: 0,
      teachers: [
        {
          name: 'Ana Silva',
          subject: 'Matemática',
          grades: ['9º Ano', '2º Ano', '3º Ano'],
          icon: '👩‍🏫',
          testimonial: 'A matemática é a linguagem do universo. Preparo meus alunos para resolver os desafios do futuro.',
          futureVision: 'Ensinarei matemática através de realidade aumentada e inteligência artificial personalizada.',
          skills: [
            { name: 'Matemática', level: 98 },
            { name: 'Pedagogia', level: 95 },
            { name: 'Tecnologia', level: 85 },
            { name: 'Liderança', level: 90 }
          ],
          classes: [
            'Turma A - 9º Ano (32 alunos)',
            'Turma B - 2º Ano (28 alunos)',
            'Turma C - 3º Ano (30 alunos)'
          ]
        },
        {
          name: 'Carlos Mendes',
          subject: 'Ciências',
          grades: ['8º Ano', '7º Ano'],
          icon: '👨‍🔬',
          testimonial: 'A ciência nos permite entender e transformar o mundo. Meus alunos serão os cientistas do futuro.',
          futureVision: 'Laboratórios virtuais e experimentos em realidade aumentada serão minha nova sala de aula.',
          skills: [
            { name: 'Biologia', level: 95 },
            { name: 'Química', level: 92 },
            { name: 'Física', level: 88 },
            { name: 'Pesquisa', level: 90 }
          ],
          classes: [
            'Turma A - 8º Ano (30 alunos)',
            'Turma B - 7º Ano (28 alunos)'
          ]
        },
        {
          name: 'Marina Costa',
          subject: 'Artes',
          grades: ['6º Ano', '7º Ano', '8º Ano'],
          icon: '👩‍🎨',
          testimonial: 'A arte é expressão da alma. Ensino meus alunos a criar e se expressar através da tecnologia.',
          futureVision: 'Arte digital, realidade virtual e inteligência artificial serão minhas ferramentas de ensino.',
          skills: [
            { name: 'Arte Digital', level: 95 },
            { name: 'Design', level: 92 },
            { name: 'Criatividade', level: 98 },
            { name: 'Tecnologia', level: 85 }
          ],
          classes: [
            'Turma A - 6º Ano (25 alunos)',
            'Turma B - 7º Ano (27 alunos)',
            'Turma C - 8º Ano (26 alunos)'
          ]
        },
        {
          name: 'Pedro Santos',
          subject: 'Informática',
          grades: ['6º Ano', '7º Ano', '8º Ano', '9º Ano'],
          icon: '👨‍💻',
          testimonial: 'A programação é o futuro. Preparo meus alunos para criar soluções tecnológicas inovadoras.',
          futureVision: 'Robótica, inteligência artificial e programação quântica serão parte do currículo.',
          skills: [
            { name: 'Programação', level: 98 },
            { name: 'Robótica', level: 92 },
            { name: 'IA', level: 88 },
            { name: 'Inovação', level: 95 }
          ],
          classes: [
            'Turma A - 6º Ano (24 alunos)',
            'Turma B - 7º Ano (26 alunos)',
            'Turma C - 8º Ano (28 alunos)',
            'Turma D - 9º Ano (30 alunos)'
          ]
        }
      ]
    }
  },
  mounted() {
    this.calculateStats()
  },
  methods: {
    onTeacherHover(index) {
      this.activeTeacher = index
    },
    
    onTeacherLeave(index) {
      this.activeTeacher = null
    },
    
    showTeacherDetails(teacher) {
      this.selectedTeacher = teacher
      document.body.style.overflow = 'hidden'
    },
    
    closeModal() {
      this.selectedTeacher = null
      document.body.style.overflow = 'auto'
    },
    
    calculateStats() {
      this.totalTeachers = this.teachers.length
      this.totalClasses = this.teachers.reduce((total, teacher) => total + teacher.classes.length, 0)
      this.totalStudents = this.teachers.reduce((total, teacher) => {
        return total + teacher.classes.reduce((classTotal, classItem) => {
          const match = classItem.match(/\((\d+) alunos\)/)
          return classTotal + (match ? parseInt(match[1]) : 0)
        }, 0)
      }, 0)
    }
  },
  
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
.teachers-section {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
}

.teacher-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.teacher-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-blue);
  box-shadow: 0 15px 30px rgba(0, 212, 255, 0.2);
}

.teacher-icon-container {
  position: relative;
  height: 80px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.teacher-icon {
  position: absolute;
  font-size: 3rem;
  transition: var(--transition-smooth);
  opacity: 1;
}

.future-icon {
  opacity: 0;
}

.teacher-card:hover .current-icon {
  opacity: 0;
}

.teacher-card:hover .future-icon {
  opacity: 1;
}

.icon-overlay {
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
  border-radius: 50%;
}

.teacher-card:hover .icon-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-text {
  font-family: var(--font-futuristic);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.icon-effects {
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
  border-radius: 50%;
  opacity: 0;
  transition: var(--transition-smooth);
}

.teacher-card:hover .effect-ring {
  opacity: 1;
  animation: pulse 2s infinite;
}

.teacher-content {
  text-align: center;
}

.teacher-name {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.teacher-subject {
  color: var(--primary-blue);
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.teacher-grades {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 15px;
}

.teacher-testimonial {
  margin-bottom: 20px;
}

.teacher-testimonial blockquote {
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.85rem;
  position: relative;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid var(--primary-blue);
}

/* Estatísticas */
.teachers-stats {
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
  font-size: 2.5rem;
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

.teacher-icon-large {
  font-size: 4rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 50%;
  border: 3px solid var(--primary-blue);
}

.modal-title {
  font-family: var(--font-futuristic);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.modal-subject {
  color: var(--primary-blue);
  font-weight: 500;
  margin-bottom: 5px;
}

.modal-grades {
  color: var(--text-secondary);
  font-size: 0.9rem;
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

.classes-list {
  list-style: none;
  padding: 0;
}

.classes-list li {
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 8px;
  color: var(--text-secondary);
  border-left: 3px solid var(--primary-blue);
}

/* Responsividade */
@media (max-width: 768px) {
  .teachers-grid {
    grid-template-columns: 1fr;
    gap: 25px;
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
