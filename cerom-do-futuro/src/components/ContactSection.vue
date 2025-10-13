<template>
  <section class="contact-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">Contato</span> e Localização
        </h2>
        <p class="section-subtitle">
          Venha conhecer nossa escola e explore o futuro da educação
        </p>
      </div>
      
      <!-- Conteúdo principal -->
      <div class="contact-content">
        <!-- Informações de contato -->
        <div class="contact-info animate-on-scroll">
          <div class="info-card">
            <div class="card-header">
              <h3 class="card-title">Escola Seron</h3>
              <p class="card-subtitle">Teresópolis, RJ - Bairro São Pedro</p>
            </div>
            
            <div class="contact-details">
              <div class="detail-item">
                <div class="detail-icon">📍</div>
                <div class="detail-content">
                  <h4>Endereço</h4>
                  <p>Rua São Pedro, Teresópolis, RJ</p>
                  <p>Brasil - CEP: 25900-000</p>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-icon">📞</div>
                <div class="detail-content">
                  <h4>Telefone</h4>
                  <p>(21) 99999-9999</p>
                  <p>Segunda a Sexta: 8h às 17h</p>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-icon">✉️</div>
                <div class="detail-content">
                  <h4>E-mail</h4>
                  <p>contato@escolaseron.com.br</p>
                  <p>info@serondo-futuro.com</p>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-icon">🌐</div>
                <div class="detail-content">
                  <h4>Website</h4>
                  <p>www.escolaseron.com.br</p>
                  <p>www.serondo-futuro.com</p>
                </div>
              </div>
            </div>
            
            <!-- Horários de funcionamento -->
            <div class="opening-hours">
              <h4>Horários de Funcionamento</h4>
              <div class="hours-grid">
                <div class="hours-item">
                  <span class="day">Segunda - Sexta</span>
                  <span class="time">8:00 - 17:00</span>
                </div>
                <div class="hours-item">
                  <span class="day">Sábado</span>
                  <span class="time">8:00 - 12:00</span>
                </div>
                <div class="hours-item">
                  <span class="day">Domingo</span>
                  <span class="time">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mapa interativo -->
        <div class="map-container animate-on-scroll">
          <div class="map-header">
            <h3>Nossa Localização</h3>
            <p>Escola Seron no coração de Teresópolis</p>
          </div>
          
          <!-- Mapa placeholder (será substituído por mapa real) -->
          <div class="map-placeholder">
            <div class="map-content">
              <div class="map-icon">🗺️</div>
              <h4>Mapa Interativo</h4>
              <p>Visualize nossa localização em Teresópolis, RJ</p>
              <button class="btn-primary" @click="openMap">
                Abrir no Google Maps
              </button>
            </div>
            
            <!-- Coordenadas -->
            <div class="map-coordinates">
              <div class="coordinate-item">
                <span class="coord-label">Latitude:</span>
                <span class="coord-value">-22.4167°</span>
              </div>
              <div class="coordinate-item">
                <span class="coord-label">Longitude:</span>
                <span class="coord-value">-42.9789°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formulário de contato -->
      <div class="contact-form-container animate-on-scroll">
        <div class="form-header">
          <h3>Entre em Contato</h3>
          <p>Envie sua mensagem e entraremos em contato em breve</p>
        </div>
        
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Nome Completo *</label>
              <input 
                type="text" 
                id="name"
                v-model="form.name"
                required
                class="form-input"
                placeholder="Seu nome completo"
              >
            </div>
            
            <div class="form-group">
              <label for="email">E-mail *</label>
              <input 
                type="email" 
                id="email"
                v-model="form.email"
                required
                class="form-input"
                placeholder="seu@email.com"
              >
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="phone">Telefone</label>
              <input 
                type="tel" 
                id="phone"
                v-model="form.phone"
                class="form-input"
                placeholder="(21) 99999-9999"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Assunto</label>
              <select 
                id="subject"
                v-model="form.subject"
                class="form-select"
              >
                <option value="">Selecione um assunto</option>
                <option value="matricula">Matrícula</option>
                <option value="informacoes">Informações Gerais</option>
                <option value="visita">Agendar Visita</option>
                <option value="duvidas">Dúvidas</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Mensagem *</label>
            <textarea 
              id="message"
              v-model="form.message"
              required
              rows="5"
              class="form-textarea"
              placeholder="Escreva sua mensagem aqui..."
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-primary btn-large"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Enviar Mensagem</span>
              <span v-else class="loading-spinner">Enviando...</span>
            </button>
            
            <button 
              type="button" 
              class="btn-secondary"
              @click="resetForm"
            >
              Limpar Formulário
            </button>
          </div>
        </form>
      </div>
      
      <!-- Tour Virtual -->
      <div class="virtual-tour animate-on-scroll">
        <div class="tour-content">
          <div class="tour-info">
            <h3>Tour Virtual Futurista</h3>
            <p>
              Explore nossa escola através de uma experiência virtual imersiva. 
              Veja como será a Escola Seron no futuro e conheça nossos espaços 
              tecnológicos de última geração.
            </p>
            
            <div class="tour-features">
              <div class="feature-item">
                <span class="feature-icon">🥽</span>
                <span class="feature-text">Realidade Virtual</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📱</span>
                <span class="feature-text">Acesso Mobile</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <span class="feature-text">Experiência Interativa</span>
              </div>
            </div>
            
            <button class="btn-primary btn-large" @click="startVirtualTour">
              Iniciar Tour Virtual
            </button>
          </div>
          
          <div class="tour-preview">
            <div class="preview-image">
              <div class="preview-placeholder">
                <div class="preview-icon">🏫</div>
                <h4>Tour Virtual</h4>
                <p>Em breve disponível</p>
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
  name: 'ContactSection',
  data() {
    return {
      isSubmitting: false,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      try {
        // Simular envio do formulário
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Aqui você integraria com um serviço de e-mail real
        console.log('Formulário enviado:', this.form)
        
        // Mostrar mensagem de sucesso
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        
        // Limpar formulário
        this.resetForm()
        
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
        alert('Erro ao enviar mensagem. Tente novamente.')
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    },
    
    openMap() {
      // Coordenadas aproximadas de Teresópolis, RJ
      const latitude = -22.4167
      const longitude = -42.9789
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`
      window.open(url, '_blank')
    },
    
    startVirtualTour() {
      // Simular início do tour virtual
      alert('Tour Virtual Futurista será lançado em breve! Fique atento às novidades.')
    }
  }
}
</script>

<style scoped>
.contact-section {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
}

/* Informações de contato */
.contact-info {
  display: flex;
  justify-content: center;
}

.info-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 500px;
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-family: var(--font-futuristic);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.card-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.contact-details {
  margin-bottom: 40px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

.detail-icon {
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: 5px;
}

.detail-content h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.detail-content p {
  color: var(--text-secondary);
  margin-bottom: 5px;
  line-height: 1.5;
}

.opening-hours {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.opening-hours h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-align: center;
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.day {
  color: var(--text-primary);
  font-weight: 500;
}

.time {
  color: var(--primary-blue);
  font-weight: 600;
}

/* Mapa */
.map-container {
  display: flex;
  flex-direction: column;
}

.map-header {
  text-align: center;
  margin-bottom: 30px;
}

.map-header h3 {
  font-family: var(--font-futuristic);
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.map-header p {
  color: var(--text-secondary);
}

.map-placeholder {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  text-align: center;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.map-content {
  margin-bottom: 30px;
}

.map-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.map-content h4 {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.map-content p {
  color: var(--text-secondary);
  margin-bottom: 25px;
}

.map-coordinates {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 15px;
}

.coordinate-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.coord-label {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.coord-value {
  color: var(--primary-blue);
  font-family: var(--font-futuristic);
  font-weight: 600;
}

/* Formulário */
.contact-form-container {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 60px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h3 {
  font-family: var(--font-futuristic);
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.form-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 8px;
}

.form-input,
.form-select,
.form-textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition-smooth);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.loading-spinner {
  display: inline-block;
  animation: pulse 1s infinite;
}

/* Tour Virtual */
.virtual-tour {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
}

.tour-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.tour-info h3 {
  font-family: var(--font-futuristic);
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.tour-info p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 30px;
}

.tour-features {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-icon {
  font-size: 2rem;
}

.feature-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: center;
}

.tour-preview {
  display: flex;
  justify-content: center;
}

.preview-image {
  width: 100%;
  max-width: 300px;
}

.preview-placeholder {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  border: 2px dashed rgba(0, 212, 255, 0.3);
}

.preview-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.preview-placeholder h4 {
  font-family: var(--font-futuristic);
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.preview-placeholder p {
  color: var(--text-secondary);
}

/* Responsividade */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .tour-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .tour-features {
    flex-direction: column;
    gap: 15px;
  }
  
  .map-coordinates {
    position: static;
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .info-card,
  .contact-form-container,
  .virtual-tour {
    padding: 25px;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .form-header h3,
  .tour-info h3 {
    font-size: 1.5rem;
  }
}
</style>
