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
              <h3 class="card-title">Escola Cerom</h3>
              <p class="card-subtitle">Teresópolis, RJ - Bairro São Pedro</p>
            </div>
            
            <div class="contact-details">
              <div class="detail-item">
                <div class="detail-icon">📍</div>
                <div class="detail-content">
                  <h4>Endereço</h4>
                  <p>R. São Pedro, 190 - Bairro da São Pedro</p>
                  <p>Teresópolis, RJ - CEP: 25956-280</p>
                </div>
              </div>
              
              
              <div class="detail-item">
                <div class="detail-icon">🌐</div>
                <div class="detail-content">
                  <h4>Website</h4>
                  <p>cerom-do-futuro.netlify.app</p>
                </div>
              </div>
            </div>
            
            <!-- Horários de funcionamento -->
            <div class="opening-hours">
              <h4>Horários de Funcionamento</h4>
              <div class="hours-grid">
                <div class="hours-item">
                  <span class="day">Segunda - Sexta</span>
                  <span class="time">7:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mapa interativo -->
        <div class="map-container animate-on-scroll">
          <div class="map-header">
            <h3>Nossa Localização</h3>
            <p>Escola Cerom no coração de Teresópolis</p>
          </div>
          
          <!-- Mapa real do Google Maps -->
          <div class="map-iframe-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.1234567890123!2d-42.9789!3d-22.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI1JzAwLjEiUyA0MsKwNTgnNDQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style="border:0; border-radius: 15px;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Localização da Escola Seron - R. São Pedro, 190, Teresópolis, RJ"
            ></iframe>
            
            <!-- Botão para abrir no Google Maps -->
            <div class="map-actions">
              <button class="btn-primary" @click="openInMaps">
                <span>📍</span>
                Abrir no Google Maps
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
  name: 'ContactSection',
  methods: {
    openInMaps() {
      // Abrir Google Maps com o endereço exato da escola
      const address = 'R. São Pedro, 190 - Bairro da São Pedro, Teresópolis - RJ, 25956-280'
      const encodedAddress = encodeURIComponent(address)
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
    }
  }
}
</script>

<style scoped>
.contact-section {
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

.map-iframe-container {
  background: var(--card-bg);
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px;
  overflow: hidden;
}

.map-iframe-container iframe {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.map-actions {
  margin-top: 20px;
  text-align: center;
}

.map-actions .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(90deg, var(--primary-blue), var(--accent-purple));
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-smooth);
  cursor: pointer;
}

.map-actions .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.4);
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

/* Responsividade melhorada */
/* Tablets e dispositivos médios */
@media (max-width: 1024px) {
  .contact-content {
    gap: 50px;
  }
  
  .info-card,
  .contact-form-container,
  .virtual-tour {
    padding: 35px;
  }
  
  .tour-content {
    gap: 35px;
  }
  
  .tour-features {
    gap: 25px;
  }
}

/* Tablets pequenos e dispositivos móveis grandes */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .info-card,
  .contact-form-container,
  .virtual-tour {
    padding: 30px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .btn-large {
    width: 100%;
    max-width: 300px;
  }
  
  .tour-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .tour-info h3 {
    font-size: 1.8rem;
  }
  
  .tour-features {
    flex-direction: column;
    gap: 20px;
  }
  
  .feature-item {
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }
  
  .feature-icon {
    font-size: 1.8rem;
  }
  
  .feature-text {
    font-size: 0.95rem;
  }
  
  .map-coordinates {
    position: static;
    margin-top: 20px;
  }
  
  .preview-placeholder {
    padding: 30px;
  }
  
  .preview-icon {
    font-size: 3rem;
  }
}

/* Dispositivos móveis pequenos */
@media (max-width: 480px) {
  .contact-content {
    gap: 30px;
  }
  
  .info-card,
  .contact-form-container,
  .virtual-tour {
    padding: 25px;
  }
  
  .card-title {
    font-size: 1.6rem;
  }
  
  .card-subtitle {
    font-size: 0.9rem;
  }
  
  .detail-item {
    gap: 12px;
  }
  
  .detail-icon {
    font-size: 1.5rem;
  }
  
  .detail-content h4 {
    font-size: 1rem;
  }
  
  .detail-content p {
    font-size: 0.9rem;
  }
  
  .form-header h3,
  .tour-info h3 {
    font-size: 1.6rem;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    font-size: 0.9rem;
  }
  
  .form-input,
  .form-textarea {
    padding: 12px 15px;
    font-size: 0.9rem;
  }
  
  .form-textarea {
    min-height: 100px;
  }
  
  .btn-large {
    padding: 12px 25px;
    font-size: 1rem;
  }
  
  .tour-info p {
    font-size: 0.9rem;
  }
  
  .tour-features {
    gap: 15px;
  }
  
  .feature-item {
    gap: 12px;
  }
  
  .feature-icon {
    font-size: 1.5rem;
  }
  
  .feature-text {
    font-size: 0.85rem;
  }
  
  .preview-placeholder {
    padding: 25px;
  }
  
  .preview-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  .preview-placeholder h4 {
    font-size: 1.2rem;
  }
  
  .preview-placeholder p {
    font-size: 0.9rem;
  }
}

/* Dispositivos muito pequenos */
@media (max-width: 360px) {
  .info-card,
  .contact-form-container,
  .virtual-tour {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.4rem;
  }
  
  .card-subtitle {
    font-size: 0.85rem;
  }
  
  .detail-item {
    gap: 10px;
  }
  
  .detail-icon {
    font-size: 1.3rem;
  }
  
  .detail-content h4 {
    font-size: 0.95rem;
  }
  
  .detail-content p {
    font-size: 0.85rem;
  }
  
  .form-header h3,
  .tour-info h3 {
    font-size: 1.4rem;
  }
  
  .form-group {
    margin-bottom: 18px;
  }
  
  .form-label {
    font-size: 0.85rem;
  }
  
  .form-input,
  .form-textarea {
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  
  .form-textarea {
    min-height: 90px;
  }
  
  .btn-large {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
  
  .tour-info p {
    font-size: 0.85rem;
  }
  
  .feature-icon {
    font-size: 1.3rem;
  }
  
  .feature-text {
    font-size: 0.8rem;
  }
  
  .preview-placeholder {
    padding: 20px;
  }
  
  .preview-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  
  .preview-placeholder h4 {
    font-size: 1.1rem;
  }
  
  .preview-placeholder p {
    font-size: 0.85rem;
  }
}

/* Orientação landscape em mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .contact-content {
    gap: 20px;
  }
  
  .info-card,
  .contact-form-container,
  .virtual-tour {
    padding: 20px;
  }
  
  .tour-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .tour-features {
    flex-direction: row;
    gap: 15px;
  }
  
  .feature-item {
    flex-direction: column;
    gap: 8px;
  }
  
  .feature-icon {
    font-size: 1.2rem;
  }
  
  .feature-text {
    font-size: 0.75rem;
  }
  
  .preview-placeholder {
    padding: 15px;
  }
  
  .preview-icon {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  .preview-placeholder h4 {
    font-size: 1rem;
  }
  
  .preview-placeholder p {
    font-size: 0.8rem;
  }
}
</style>
