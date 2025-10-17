<template>
  <section class="adriana-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Adriana IA</span> - Sua Guia do Futuro
        </h2>
        <p class="section-subtitle">
          Converse comigo sobre a escola do futuro
        </p>
      </div>

      <!-- Chat Interface -->
      <div class="chat-container animate-on-scroll">
        <!-- Avatar da Adriana -->
        <div class="adriana-avatar">
          <div class="avatar-container">
            <img 
              src="/images/adriana.jpg" 
              alt="Adriana - Orientadora IA"
              class="avatar-image"
              onerror="this.onerror=null;this.src='/images/placeholder.svg'"
            >
            <div class="avatar-glow"></div>
            <div class="connection-lines">
              <div class="line line-1"></div>
              <div class="line line-2"></div>
              <div class="line line-3"></div>
            </div>
          </div>
          <div class="avatar-info">
            <h3>Adriana</h3>
            <p>Orientadora Educacional IA</p>
            <div class="status-indicator">
              <div class="status-dot"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages" ref="chatMessages">
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="message"
            :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }"
          >
            <div class="message-content">
              <div class="message-text">{{ message.text }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
          
          <!-- Typing indicator -->
          <div v-if="isTyping" class="message bot-message typing-message">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="chat-input">
          <div class="input-container">
            <input 
              v-model="userInput"
              @keypress.enter="sendMessage"
              type="text"
              placeholder="Pergunte sobre a escola do futuro..."
              class="message-input"
              :disabled="isTyping"
            >
            <button 
              @click="sendMessage"
              class="send-button"
              :disabled="!userInput.trim() || isTyping"
            >
              <span>→</span>
            </button>
          </div>
          <div class="quick-actions">
            <button 
              v-for="action in quickActions" 
              :key="action"
              @click="sendQuickMessage(action)"
              class="quick-action-btn"
              :disabled="isTyping"
            >
              {{ action }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdrianaSection',
  data() {
    return {
      userInput: '',
      isTyping: false,
      messages: [
        {
          text: '👋 Olá! Eu sou a Adriana, sua orientadora educacional virtual. Estou aqui para te guiar pela Escola do Futuro! Como posso te ajudar hoje?',
          isUser: false,
          time: this.getCurrentTime()
        }
      ],
      quickActions: [
        '🏫 Escola do Futuro',
        '📚 Biblioteca',
        '👨‍🎓 Alunos',
        '🎯 Metodologias',
        '🤖 Tecnologias',
        '🌟 Visão Geral'
      ],
      responses: {
        'escola': '🏫 A Escola do Futuro será um ambiente completamente transformado! Teremos realidade virtual e aumentada em todas as salas, assistentes de IA personalizados para cada estudante, dispositivos inteligentes integrados e espaços flexíveis que se adaptam às atividades. A sustentabilidade será nosso pilar fundamental!',
        'biblioteca': '📚 Nossa biblioteca será um centro de conhecimento digital incrível! Livros digitais interativos que respondem às suas perguntas, realidade virtual para "entrar" nas histórias, IA de pesquisa avançada e viagens virtuais para explorar diferentes culturas e épocas.',
        'alunos': '👨‍🎓 Os alunos do futuro serão verdadeiros cidadãos digitais! Desenvolverão pensamento crítico, colaboração global, criatividade e inovação, cidadania digital responsável e adaptabilidade para mudanças constantes.',
        'metodologias': '🎯 As metodologias do futuro serão completamente personalizadas! Aprendizado adaptativo que se ajusta ao ritmo de cada aluno, gamificação envolvente, projetos práticos conectados à realidade e colaboração internacional.',
        'tecnologias': '🤖 As tecnologias que usaremos incluem IA personalizada, realidade virtual e aumentada, dispositivos inteligentes, análise de dados para otimizar o aprendizado e plataformas de colaboração global.',
        'visão': '🌟 Nossa visão é criar uma escola onde cada aluno desenvolve seu potencial máximo através de tecnologias inovadoras, metodologias personalizadas e um ambiente que se adapta às necessidades individuais. O futuro da educação começa aqui!',
        'default': 'Interessante pergunta! Como orientadora educacional, posso te ajudar com informações sobre a escola do futuro, biblioteca digital, alunos do futuro, metodologias inovadoras ou tecnologias educacionais. O que mais te interessa?'
      }
    }
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    sendMessage() {
      if (!this.userInput.trim() || this.isTyping) return
      
      const userMessage = {
        text: this.userInput,
        isUser: true,
        time: this.getCurrentTime()
      }
      
      this.messages.push(userMessage)
      this.userInput = ''
      this.scrollToBottom()
      
      // Simular digitação
      this.isTyping = true
      setTimeout(() => {
        this.generateResponse(userMessage.text)
        this.isTyping = false
        this.scrollToBottom()
      }, 1500)
    },
    
    sendQuickMessage(action) {
      if (this.isTyping) return
      
      const userMessage = {
        text: action,
        isUser: true,
        time: this.getCurrentTime()
      }
      
      this.messages.push(userMessage)
      this.scrollToBottom()
      
      this.isTyping = true
      setTimeout(() => {
        this.generateResponse(action)
        this.isTyping = false
        this.scrollToBottom()
      }, 1000)
    },
    
    generateResponse(input) {
      const lowerInput = input.toLowerCase()
      let response = this.responses.default
      
      if (lowerInput.includes('escola') || lowerInput.includes('🏫')) {
        response = this.responses.escola
      } else if (lowerInput.includes('biblioteca') || lowerInput.includes('📚')) {
        response = this.responses.biblioteca
      } else if (lowerInput.includes('aluno') || lowerInput.includes('👨‍🎓')) {
        response = this.responses.alunos
      } else if (lowerInput.includes('metodologia') || lowerInput.includes('🎯')) {
        response = this.responses.metodologias
      } else if (lowerInput.includes('tecnologia') || lowerInput.includes('🤖')) {
        response = this.responses.tecnologias
      } else if (lowerInput.includes('visão') || lowerInput.includes('🌟')) {
        response = this.responses.visão
      } else if (lowerInput.includes('olá') || lowerInput.includes('oi') || lowerInput.includes('bom dia') || lowerInput.includes('boa tarde') || lowerInput.includes('boa noite')) {
        response = '👋 Olá! Que bom te ver aqui! Estou animada para te mostrar como será a educação do futuro. Por onde gostaria de começar nossa conversa?'
      } else if (lowerInput.includes('obrigado') || lowerInput.includes('obrigada') || lowerInput.includes('valeu')) {
        response = '😊 De nada! Fico feliz em ajudar! Se tiver mais alguma dúvida sobre a escola do futuro, estarei sempre aqui para conversar com você.'
      } else if (lowerInput.includes('tchau') || lowerInput.includes('até logo') || lowerInput.includes('até mais')) {
        response = '👋 Até logo! Foi um prazer conversar com você sobre o futuro da educação. Volte sempre que quiser saber mais sobre nossa escola!'
      }
      
      const botMessage = {
        text: response,
        isUser: false,
        time: this.getCurrentTime()
      }
      
      this.messages.push(botMessage)
    },
    
    getCurrentTime() {
      const now = new Date()
      return now.toLocaleTimeString('pt-BR', { 
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
    }
  }
}
</script>

<style scoped>
.adriana-section {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
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

/* Chat Container */
.chat-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  background: var(--card-bg);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(20px);
  min-height: 600px;
}

/* Avatar Section */
.adriana-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-blue);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
}

.avatar-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-blue), var(--accent-purple));
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.connection-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.line {
  position: absolute;
  background: linear-gradient(45deg, var(--primary-blue), var(--accent-purple));
  border-radius: 2px;
  opacity: 0.6;
  animation: rotate 10s linear infinite;
}

.line-1 {
  width: 80px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  animation-delay: 0s;
}

.line-2 {
  width: 60px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  animation-delay: -3s;
}

.line-3 {
  width: 40px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  animation-delay: -6s;
}

.avatar-info {
  text-align: center;
  color: var(--text-primary);
}

.avatar-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin: 0 0 5px 0;
}

.avatar-info p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 10px 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--primary-blue);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--primary-blue);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Chat Messages */
.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.message {
  display: flex;
  flex-direction: column;
}

.user-message {
  align-items: flex-end;
}

.bot-message {
  align-items: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 15px 20px;
  border-radius: 20px;
  position: relative;
}

.user-message .message-content {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
  color: #ffffff;
  border-bottom-right-radius: 5px;
}

.bot-message .message-content {
  background: rgba(0, 0, 0, 0.4);
  color: var(--text-primary);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-bottom-left-radius: 5px;
}

.message-text {
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: right;
}

.bot-message .message-time {
  text-align: left;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 10px 0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: var(--primary-blue);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Chat Input */
.chat-input {
  grid-column: 1 / -1;
  margin-top: 20px;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.message-input {
  flex: 1;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 25px;
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
}

.message-input:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.message-input::placeholder {
  color: var(--text-secondary);
}

.send-button {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-action-btn {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  color: var(--primary-blue);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-btn:hover:not(:disabled) {
  background: rgba(0, 212, 255, 0.1);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
}

.quick-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 212, 255, 0.3);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 212, 255, 0.5);
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

/* Responsividade */
@media (max-width: 768px) {
  .chat-container {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .adriana-avatar {
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }
  
  .avatar-container {
    width: 80px;
    height: 80px;
  }
  
  .connection-lines {
    width: 120px;
    height: 120px;
  }
  
  .avatar-info {
    text-align: left;
  }
  
  .avatar-info h3 {
    font-size: 1.2rem;
  }
  
  .chat-messages {
    max-height: 300px;
    padding: 15px;
  }
  
  .message-content {
    max-width: 90%;
    padding: 12px 16px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .adriana-section {
    padding: 60px 0;
  }
  
  .chat-container {
    padding: 15px;
    gap: 15px;
  }
  
  .adriana-avatar {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar-info {
    text-align: center;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .chat-messages {
    max-height: 250px;
    padding: 10px;
  }
  
  .message-content {
    padding: 10px 14px;
  }
  
  .message-text {
    font-size: 0.9rem;
  }
  
  .quick-actions {
    justify-content: center;
  }
  
  .quick-action-btn {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}
</style>
