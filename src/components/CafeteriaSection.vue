<template>
  <section class="cafeteria-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Tia Ana IA</span>
        </h2>
        <p class="section-subtitle">
          A Inteligência Artificial do Refeitório da Escola Cerom
        </p>
      </div>
      
      <!-- Conteúdo principal -->
      <div class="cafeteria-content">
        <!-- Apresentação visual -->
        <div class="cafeteria-visual animate-on-scroll">
          <div class="cafeteria-container">
            <!-- Foto real da Tia Ana Maria -->
            <div class="ana-photo">
              <img 
                src="/images/tia-ana.png" 
                alt="Tia Ana Maria"
                class="photo-real"
                @error="onPhotoError"
                onerror="this.onerror=null;this.src='/images/placeholder.svg'"
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
              <h3>Tia Ana IA</h3>
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
                <div class="ai-icon">👵</div>
              </div>
              <div class="message-content">
                <p>
                  Olá! Sou Tia Ana, a IA do refeitório da Escola Cerom. 
                  Estou aqui para te ajudar com o cardápio e informações sobre nossa cozinha. 
                  O que você gostaria de saber hoje?
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
                <div class="ai-icon">👵</div>
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
                placeholder="Pergunte sobre o cardápio..."
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
    </div>
  </section>
</template>

<script>
export default {
  name: 'CafeteriaSection',
  data() {
    return {
      currentMessage: '',
      messages: [],
      isTyping: false,
      quickQuestions: [
        'Cardápio de segunda',
        'Cardápio de terça',
        'Cardápio de quarta',
        'Cardápio de quinta',
        'Cardápio de sexta'
      ],
      menu: {
        'segunda': 'Arroz, feijão, frango assado, salada de alface e tomate, suco de laranja.',
        'terça': 'Macarronada, carne moída, brócolis no vapor, salada de cenoura ralada, suco de abacaxi.',
        'quarta': 'Feijoada (light), arroz, couve refogada, farofa, suco de limão.',
        'quinta': 'Escondidinho de carne seca, arroz, purê de abóbora, salada de pepino, suco de maracujá.',
        'sexta': 'Peixe empanado, arroz integral, legumes salteados, salada mista, suco de melancia.',
        'default': 'Desculpe, não entendi. Por favor, pergunte sobre o cardápio de um dia específico da semana (segunda a sexta).'
      }
    }
  },
  methods: {
    onPhotoError(event) {
      event.target.src = '/images/placeholder.svg'
    },
    
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
      let response = this.menu.default

      if (userMessage.includes('segunda')) {
        response = this.menu.segunda
      } else if (userMessage.includes('terça')) {
        response = this.menu.terça
      } else if (userMessage.includes('quarta')) {
        response = this.menu.quarta
      } else if (userMessage.includes('quinta')) {
        response = this.menu.quinta
      } else if (userMessage.includes('sexta')) {
        response = this.menu.sexta
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
    }
  }
}
</script>

<style scoped>
.cafeteria-section {
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%);
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

.cafeteria-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: center;
}

.cafeteria-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.cafeteria-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ana-photo {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 2;
  border: 5px solid rgba(255, 165, 0, 0.5);
}

.photo-real {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-frame {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid #ffa500;
  border-radius: 50%;
  animation: pulse-border 2s infinite alternate;
  z-index: 1;
}

.ai-hologram {
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.hologram-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hologram-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 165, 0, 0.4) 0%,
    rgba(255, 215, 0, 0.2) 50%,
    transparent 70%
  );
  animation: hologram-pulse 3s infinite ease-in-out;
}

.ai-avatar {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ffa500, #ffd700);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  animation: float 4s infinite ease-in-out;
  z-index: 3;
}

.avatar-face {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.eye {
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 8px #fff;
  animation: blink 5s infinite;
}

.left-eye {
  top: 25px;
  left: 15px;
}

.right-eye {
  top: 25px;
  right: 15px;
}

.mouth {
  position: absolute;
  width: 40px;
  height: 10px;
  background: white;
  border-radius: 0 0 10px 10px;
  top: 55px;
  animation: smile 4s infinite alternate;
}

.hologram-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffa500;
  border-radius: 50%;
  animation: particle-float 6s infinite linear;
}

.particle:nth-child(odd) {
  background: #ffd700;
  animation-duration: 8s;
}

.particle:nth-child(3n) {
  animation-duration: 10s;
}

.connection-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #ffa500, transparent);
  height: 2px;
  animation: line-flow 3s infinite linear;
}

.line-1 {
  top: 20%;
  left: 10%;
  width: 80%;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  left: 5%;
  width: 90%;
  animation-delay: 1s;
}

.line-3 {
  top: 80%;
  left: 15%;
  width: 70%;
  animation-delay: 2s;
}

.chat-interface {
  background: var(--card-bg);
  border-radius: 20px;
  border: 1px solid rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background: linear-gradient(90deg, #ffa500, #ffd700);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title h3 {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  margin: 0;
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
  border-bottom: 1px solid rgba(255, 165, 0, 0.2);
}

.chat-messages {
  height: 300px;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-bubble {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.ai-message {
  flex-direction: row;
}

.user-message {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #ffa500, #ffd700);
  flex-shrink: 0;
}

.ai-icon {
  font-size: 1.2rem;
}

.message-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 70%;
  position: relative;
}

.user-message .message-content {
  background: linear-gradient(90deg, #ffa500, #ffd700);
  color: white;
}

.message-content p {
  margin: 0 0 5px 0;
  line-height: 1.4;
  font-size: 0.95rem;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: right;
  display: block;
}

.chat-input {
  padding: 20px;
  border-top: 1px solid rgba(255, 165, 0, 0.2);
}

.input-container {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
}

.input-container input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.3);
  border-radius: 25px;
  padding: 12px 18px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: var(--transition-smooth);
}

.input-container input:focus {
  outline: none;
  border-color: #ffa500;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.3);
}

.send-button {
  background: linear-gradient(90deg, #ffa500, #ffd700);
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  color: white;
  cursor: pointer;
  transition: var(--transition-smooth);
  font-weight: 600;
  font-size: 0.9rem;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.quick-question-btn {
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.3);
  border-radius: 20px;
  padding: 8px 16px;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-size: 0.8rem;
}

.quick-question-btn:hover:not(:disabled) {
  background: rgba(255, 165, 0, 0.2);
  border-color: rgba(255, 165, 0, 0.5);
  transform: translateY(-2px);
}

.quick-question-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Keyframe Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes blink {
  0%, 20%, 40%, 60%, 80%, 100% {
    transform: scaleY(1);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: scaleY(0.1);
  }
}

@keyframes smile {
  0%, 100% {
    border-radius: 0 0 10px 10px;
    height: 10px;
  }
  50% {
    border-radius: 10px 10px 0 0;
    height: 5px;
  }
}

@keyframes hologram-pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.8;
  }
}

@keyframes particle-float {
  0% {
    transform: translateY(0px) rotate(0deg);
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

@keyframes line-flow {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes pulse-border {
  0% {
    border-color: rgba(255, 165, 0, 0.5);
  }
  50% {
    border-color: rgba(255, 215, 0, 0.8);
  }
  100% {
    border-color: rgba(255, 165, 0, 0.5);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .cafeteria-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .cafeteria-visual {
    height: 400px;
  }

  .ana-photo {
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
}

@media (max-width: 768px) {
  .cafeteria-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .cafeteria-visual {
    height: 300px;
  }

  .ana-photo {
    width: 180px;
    height: 180px;
  }

  .ai-avatar {
    width: 100px;
    height: 100px;
  }

  .chat-messages {
    height: 200px;
  }

  .input-container {
    flex-direction: column;
  }

  .send-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .cafeteria-section {
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

  .cafeteria-content {
    gap: 20px;
  }

  .cafeteria-visual {
    height: 250px;
  }

  .ana-photo {
    width: 150px;
    height: 150px;
  }

  .ai-avatar {
    width: 80px;
    height: 80px;
  }

  .chat-messages {
    height: 180px;
    padding: 15px;
  }

  .message-content p {
    font-size: 0.85rem;
  }

  .message-time {
    font-size: 0.65rem;
  }

  .chat-input {
    padding: 15px;
  }

  .input-container input,
  .send-button {
    font-size: 0.8rem;
    padding: 10px 15px;
  }

  .quick-question-btn {
    font-size: 0.7rem;
    padding: 6px 12px;
  }
}

@media (max-width: 360px) {
  .cafeteria-visual {
    height: 200px;
  }

  .ana-photo {
    width: 120px;
    height: 120px;
  }

  .ai-avatar {
    width: 70px;
    height: 70px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .chat-messages {
    height: 150px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .cafeteria-section {
    padding: 40px 0;
  }

  .cafeteria-content {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .cafeteria-visual {
    height: 180px;
  }

  .ana-photo {
    width: 100px;
    height: 100px;
  }

  .ai-avatar {
    width: 60px;
    height: 60px;
  }

  .chat-messages {
    height: 120px;
    padding: 10px;
  }

  .message-content p {
    font-size: 0.75rem;
  }

  .message-time {
    font-size: 0.6rem;
  }

  .chat-input {
    padding: 10px;
  }

  .input-container input,
  .send-button {
    font-size: 0.7rem;
    padding: 8px 12px;
  }

  .quick-question-btn {
    font-size: 0.65rem;
    padding: 5px 10px;
  }
}
</style>
