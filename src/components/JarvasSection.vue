<template>
  <section class="jarvas-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Cíntia IA</span>
        </h2>
        <p class="section-subtitle">
          A Inteligência Artificial da Escola Cerom
        </p>
      </div>
      
      <!-- Conteúdo principal -->
      <div class="jarvas-content">
        <!-- Apresentação visual -->
        <div class="jarvas-visual animate-on-scroll">
          <div class="jarvas-container">
            <!-- Foto real da diretora -->
            <div class="director-photo">
              <img 
                src="/images/diretora-cintia.jpg" 
                alt="Diretora Cíntia"
                class="photo-real"
                @error="onPhotoError"
              >
              <div class="photo-frame"></div>
            </div>
            
            <!-- Versão digital IA -->
            <div class="ai-hologram">
              <div class="hologram-container">
                <div class="hologram-effect"></div>
                <div class="ai-avatar">
                  <div class="avatar-face">
                    <div class="eye left-eye"></div>
                    <div class="eye right-eye"></div>
                    <div class="mouth"></div>
                  </div>
                </div>
                <div class="hologram-particles">
                  <div class="particle" v-for="n in 20" :key="n"></div>
                </div>
              </div>
            </div>
            
            <!-- Efeitos de conexão -->
            <div class="connection-lines">
              <div class="line line-1"></div>
              <div class="line line-2"></div>
              <div class="line line-3"></div>
            </div>
          </div>
        </div>
        
        <!-- Interface de conversa -->
        <div class="chat-interface animate-on-scroll">
          <div class="chat-header">
            <div class="chat-title">
              <h3>Cíntia IA</h3>
              <span class="status-indicator">
                <span class="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          
          <!-- Mensagem de boas-vindas -->
          <div class="welcome-message">
            <div class="message-bubble ai-message">
              <div class="message-avatar">
                <div class="ai-icon">🤖</div>
              </div>
              <div class="message-content">
                <p>
                  Olá! Sou Cíntia, a IA da Escola Cerom. Estou aqui para te guiar na escola do futuro. 
                  Como posso ajudá-lo hoje?
                </p>
                <span class="message-time">{{ getCurrentTime() }}</span>
              </div>
            </div>
          </div>
          
          <!-- Histórico de mensagens -->
          <div class="chat-messages" ref="chatMessages">
            <div 
              v-for="(message, index) in messages" 
              :key="index"
              class="message-bubble"
              :class="message.type"
            >
              <div class="message-avatar" v-if="message.type === 'ai-message'">
                <div class="ai-icon">🤖</div>
              </div>
              <div class="message-content">
                <p>{{ message.text }}</p>
                <span class="message-time">{{ message.time }}</span>
              </div>
            </div>
          </div>
          
          <!-- Input de mensagem -->
          <div class="chat-input">
            <div class="input-container">
              <input 
                v-model="currentMessage"
                type="text"
                placeholder="Digite sua pergunta..."
                @keypress.enter="sendMessage"
                :disabled="isTyping"
              >
              <button 
                class="send-button"
                @click="sendMessage"
                :disabled="!currentMessage.trim() || isTyping"
              >
                <span v-if="!isTyping">Enviar</span>
                <span v-else class="typing-indicator">Digitando...</span>
              </button>
            </div>
            
            <!-- Perguntas rápidas -->
            <div class="quick-questions">
              <button 
                v-for="question in quickQuestions" 
                :key="question"
                class="quick-question-btn"
                @click="askQuickQuestion(question)"
                :disabled="isTyping"
              >
                {{ question }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Informações sobre a IA -->
      <div class="ai-info animate-on-scroll">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">🧠</div>
            <h4>Inteligência Avançada</h4>
            <p>Capacidade de processar informações educacionais e fornecer respostas personalizadas</p>
          </div>
          <div class="info-card">
            <div class="info-icon">📚</div>
            <h4>Conhecimento Educacional</h4>
            <p>Base de dados completa sobre metodologias pedagógicas e inovações educacionais</p>
          </div>
          <div class="info-card">
            <div class="info-icon">🎯</div>
            <h4>Orientadora Personalizada</h4>
            <p>Adapta-se às necessidades individuais de cada aluno e educador</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JarvasSection',
  data() {
    return {
      currentMessage: '',
      messages: [],
      isTyping: false,
      quickQuestions: [
        'Como será a escola no futuro?',
        'Quais tecnologias vocês usam?',
        'Como posso me preparar?',
        'Conte sobre a diretora Cíntia'
      ],
      aiResponses: {
        'como será a escola no futuro?': 'A escola do futuro será um ambiente completamente interativo, com realidade aumentada, inteligência artificial personalizada e espaços adaptáveis que se moldam às necessidades de cada aluno.',
        'quais tecnologias vocês usam?': 'Utilizamos tecnologias de ponta como IA, realidade aumentada, hologramas, sensores biométricos e sistemas de aprendizado adaptativo para criar uma experiência educacional única.',
        'como posso me preparar?': 'Para se preparar para o futuro, desenvolva habilidades como pensamento crítico, criatividade, colaboração e adaptabilidade. A tecnologia é uma ferramenta, mas as habilidades humanas são fundamentais.',
        'conte sobre a diretora cíntia': 'A diretora Cíntia é uma visionária da educação, sempre buscando inovações para melhorar o aprendizado dos alunos. Ela inspirou a criação desta IA para continuar sua missão educacional.',
        'default': 'Essa é uma excelente pergunta! A educação está evoluindo rapidamente e estamos sempre buscando novas formas de tornar o aprendizado mais eficaz e envolvente. Como posso ajudá-lo de outra forma?'
      }
    }
  },
  methods: {
    sendMessage() {
      if (!this.currentMessage.trim() || this.isTyping) return
      
      const userMessage = {
        type: 'user-message',
        text: this.currentMessage,
        time: this.getCurrentTime()
      }
      
      this.messages.push(userMessage)
      this.scrollToBottom()
      
      const message = this.currentMessage.toLowerCase()
      this.currentMessage = ''
      
      // Simular digitação da IA
      this.isTyping = true
      setTimeout(() => {
        this.generateAIResponse(message)
        this.isTyping = false
      }, 1500)
    },
    
    askQuickQuestion(question) {
      this.currentMessage = question
      this.sendMessage()
    },
    
    generateAIResponse(userMessage) {
      let response = this.aiResponses.default
      
      // Buscar resposta específica
      for (const [key, value] of Object.entries(this.aiResponses)) {
        if (userMessage.includes(key)) {
          response = value
          break
        }
      }
      
      const aiMessage = {
        type: 'ai-message',
        text: response,
        time: this.getCurrentTime()
      }
      
      this.messages.push(aiMessage)
      this.scrollToBottom()
    },
    
    getCurrentTime() {
      return new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight
        }
      })
    },
    
    onPhotoError() {
      console.log('Foto da diretora não encontrada, usando placeholder')
    }
  }
}
</script>

<style scoped>
.jarvas-section {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
}

.jarvas-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  margin-bottom: 80px;
}

.jarvas-visual {
  position: relative;
}

.jarvas-container {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.director-photo {
  position: relative;
  z-index: 2;
}

.photo-real {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-blue);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
  transition: var(--transition-smooth);
}

.photo-real:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(0, 212, 255, 0.8);
}

.photo-frame {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid var(--accent-purple);
  border-radius: 50%;
  animation: pulse 3s infinite;
}

.ai-hologram {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.hologram-container {
  position: relative;
  width: 250px;
  height: 250px;
}

.hologram-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    rgba(0, 212, 255, 0.3) 0%, 
    rgba(139, 92, 246, 0.3) 50%, 
    rgba(0, 255, 255, 0.3) 100%
  );
  border-radius: 50%;
  animation: float 4s ease-in-out infinite;
  filter: blur(1px);
}

.ai-avatar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 212, 255, 0.5);
}

.avatar-face {
  position: relative;
  width: 80px;
  height: 80px;
}

.eye {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--primary-blue);
  border-radius: 50%;
  top: 25px;
  animation: blink 3s infinite;
}

.left-eye {
  left: 20px;
}

.right-eye {
  right: 20px;
}

.mouth {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 10px;
  border: 2px solid var(--primary-blue);
  border-top: none;
  border-radius: 0 0 20px 20px;
}

.hologram-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-blue);
  border-radius: 50%;
  animation: particleFloat 6s linear infinite;
}

.particle:nth-child(odd) {
  background: var(--accent-purple);
  animation-duration: 8s;
}

.particle:nth-child(3n) {
  background: var(--secondary-cyan);
  animation-duration: 10s;
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-blue), transparent);
  animation: lineFlow 3s linear infinite;
}

.line-1 {
  top: 30%;
  left: 0;
  width: 100%;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  left: 0;
  width: 100%;
  animation-delay: 1s;
}

.line-3 {
  top: 70%;
  left: 0;
  width: 100%;
  animation-delay: 2s;
}

/* Chat Interface */
.chat-interface {
  background: var(--card-bg);
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.chat-header {
  background: var(--gradient-primary);
  padding: 20px;
  color: white;
}

.chat-title h3 {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  margin-bottom: 5px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.welcome-message {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-messages {
  height: 300px;
  overflow-y: auto;
  padding: 20px;
}

.message-bubble {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
  gap: 10px;
}

.ai-message {
  flex-direction: row;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  flex-shrink: 0;
}

.ai-icon {
  font-size: 1.2rem;
}

.message-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 15px;
  max-width: 80%;
  position: relative;
}

.user-message .message-content {
  background: var(--gradient-primary);
  color: white;
}

.message-content p {
  margin: 0 0 5px 0;
  line-height: 1.4;
}

/* Mensagens da IA com melhor contraste (texto em branco) */
.ai-message .message-content p {
  color: #ffffff;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
}

.chat-input {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.input-container input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 25px;
  padding: 12px 20px;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.input-container input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.send-button {
  background: var(--gradient-primary);
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  transition: var(--transition-smooth);
  font-weight: 600;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-question-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 8px 16px;
  color: #ffffff;
  cursor: pointer;
  transition: var(--transition-smooth);
  font-size: 0.8rem;
}

.quick-question-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.25);
  color: #ffffff;
  transform: translateY(-2px);
}

.quick-question-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* AI Info */
.ai-info {
  margin-top: 60px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.info-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-blue);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.info-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.info-card h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
}

.info-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Animações */
@keyframes blink {
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes lineFlow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .jarvas-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .jarvas-container {
    height: 300px;
  }
  
  .photo-real {
    width: 150px;
    height: 150px;
  }
  
  .hologram-container {
    width: 200px;
    height: 200px;
  }
  
  .ai-avatar {
    width: 120px;
    height: 120px;
  }
  
  .chat-messages {
    height: 250px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .jarvas-container {
    height: 250px;
  }
  
  .photo-real {
    width: 120px;
    height: 120px;
  }
  
  .hologram-container {
    width: 150px;
    height: 150px;
  }
  
  .quick-questions {
    flex-direction: column;
  }
  
  .quick-question-btn {
    text-align: center;
  }
}
</style>
