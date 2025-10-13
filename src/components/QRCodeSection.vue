<template>
  <section class="qrcode-section section">
    <div class="container">
      <!-- Cabeçalho da seção -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">
          <span class="text-gradient">QR Code</span> Dinâmico
        </h2>
        <p class="section-subtitle">
          Acesso rápido e compartilhamento fácil do Seron do Futuro
        </p>
      </div>
      
      <!-- Conteúdo principal -->
      <div class="qrcode-content">
        <!-- QR Code Display -->
        <div class="qrcode-display animate-on-scroll">
          <div class="qrcode-container">
            <!-- Canvas para o QR Code -->
            <canvas 
              ref="qrCanvas"
              class="qrcode-canvas"
              :width="qrSize"
              :height="qrSize"
            ></canvas>
            
            <!-- Overlay com informações -->
            <div class="qrcode-overlay">
              <div class="overlay-content">
                <div class="overlay-icon">📱</div>
                <h3 class="overlay-title">Escaneie para Acessar</h3>
                <p class="overlay-subtitle">Seron do Futuro</p>
              </div>
            </div>
            
            <!-- Efeitos visuais -->
            <div class="qrcode-effects">
              <div class="effect-ring ring-1"></div>
              <div class="effect-ring ring-2"></div>
              <div class="effect-ring ring-3"></div>
            </div>
          </div>
          
          <!-- Informações do QR Code -->
          <div class="qrcode-info">
            <h3 class="info-title">QR Code Dinâmico</h3>
            <p class="info-description">
              Este QR Code foi gerado dinamicamente e pode ser usado para acesso rápido ao site.
              Perfeito para impressão e compartilhamento físico.
            </p>
            
            <!-- Estatísticas -->
            <div class="qrcode-stats">
              <div class="stat-item">
                <div class="stat-number">{{ qrSize }}px</div>
                <div class="stat-label">Tamanho</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ qrVersion }}</div>
                <div class="stat-label">Versão</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ errorLevel }}</div>
                <div class="stat-label">Correção</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Controles e configurações -->
        <div class="qrcode-controls animate-on-scroll">
          <div class="controls-section">
            <h4>Configurações do QR Code</h4>
            
            <!-- Tamanho -->
            <div class="control-group">
              <label for="size-slider">Tamanho: {{ qrSize }}px</label>
              <input 
                id="size-slider"
                type="range" 
                min="200" 
                max="500" 
                step="50"
                v-model="qrSize"
                @input="generateQRCode"
                class="control-slider"
              >
            </div>
            
            <!-- URL -->
            <div class="control-group">
              <label for="url-input">URL do Site:</label>
              <input 
                id="url-input"
                type="url" 
                v-model="qrUrl"
                @input="generateQRCode"
                class="control-input"
                placeholder="https://serondo-futuro.com"
              >
            </div>
            
            <!-- Nível de correção de erro -->
            <div class="control-group">
              <label for="error-level">Nível de Correção:</label>
              <select 
                id="error-level"
                v-model="errorLevel"
                @change="generateQRCode"
                class="control-select"
              >
                <option value="L">Baixo (7%)</option>
                <option value="M">Médio (15%)</option>
                <option value="Q">Alto (25%)</option>
                <option value="H">Muito Alto (30%)</option>
              </select>
            </div>
            
            <!-- Botões de ação -->
            <div class="control-actions">
              <button 
                class="btn-primary"
                @click="downloadQRCode"
                :disabled="isGenerating"
              >
                <span v-if="!isGenerating">📥 Baixar QR Code</span>
                <span v-else>Gerando...</span>
              </button>
              
              <button 
                class="btn-secondary"
                @click="printQRCode"
              >
                🖨️ Imprimir
              </button>
              
              <button 
                class="btn-secondary"
                @click="shareQRCode"
              >
                📤 Compartilhar
              </button>
            </div>
          </div>
          
          <!-- Instruções de uso -->
          <div class="usage-instructions">
            <h4>Como Usar</h4>
            <div class="instructions-list">
              <div class="instruction-item">
                <div class="instruction-number">1</div>
                <div class="instruction-text">
                  <strong>Personalize:</strong> Ajuste o tamanho e configurações conforme necessário
                </div>
              </div>
              <div class="instruction-item">
                <div class="instruction-number">2</div>
                <div class="instruction-text">
                  <strong>Baixe:</strong> Faça o download da imagem em alta resolução
                </div>
              </div>
              <div class="instruction-item">
                <div class="instruction-number">3</div>
                <div class="instruction-text">
                  <strong>Imprima:</strong> Cole na escola ou distribua para alunos e pais
                </div>
              </div>
              <div class="instruction-item">
                <div class="instruction-number">4</div>
                <div class="instruction-text">
                  <strong>Compartilhe:</strong> Use em redes sociais e materiais promocionais
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Exemplos de uso -->
      <div class="usage-examples animate-on-scroll">
        <h3 class="examples-title">Onde Usar o QR Code</h3>
        <div class="examples-grid">
          <div class="example-item">
            <div class="example-icon">🏫</div>
            <h4>Na Escola</h4>
            <p>Cole em murais, cartazes e portas para acesso rápido</p>
          </div>
          <div class="example-item">
            <div class="example-icon">📱</div>
            <h4>Redes Sociais</h4>
            <p>Compartilhe em posts e stories para engajamento</p>
          </div>
          <div class="example-item">
            <div class="example-icon">📄</div>
            <h4>Materiais Impressos</h4>
            <p>Inclua em folhetos, cartões e documentos oficiais</p>
          </div>
          <div class="example-item">
            <div class="example-icon">🎯</div>
            <h4>Eventos</h4>
            <p>Use em banners e materiais de eventos escolares</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'QRCodeSection',
  data() {
    return {
      qrSize: 300,
      qrUrl: 'https://serondo-futuro.com',
      errorLevel: 'M',
      qrVersion: 1,
      isGenerating: false
    }
  },
  mounted() {
    this.generateQRCode()
  },
  methods: {
    async generateQRCode() {
      if (!this.$refs.qrCanvas) return
      
      this.isGenerating = true
      
      try {
        const canvas = this.$refs.qrCanvas
        const ctx = canvas.getContext('2d')
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Gerar QR Code
        const qrDataURL = await QRCode.toDataURL(this.qrUrl, {
          width: this.qrSize,
          margin: 2,
          color: {
            dark: '#00d4ff',
            light: '#000000'
          },
          errorCorrectionLevel: this.errorLevel
        })
        
        // Criar imagem e desenhar no canvas
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, this.qrSize, this.qrSize)
          this.isGenerating = false
        }
        img.src = qrDataURL
        
        // Atualizar versão do QR Code
        this.qrVersion = this.calculateQRVersion(this.qrUrl.length)
        
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error)
        this.isGenerating = false
      }
    },
    
    calculateQRVersion(length) {
      // Cálculo aproximado da versão baseado no comprimento da URL
      if (length <= 25) return 1
      if (length <= 47) return 2
      if (length <= 77) return 3
      if (length <= 114) return 4
      if (length <= 154) return 5
      return 6
    },
    
    downloadQRCode() {
      if (!this.$refs.qrCanvas) return
      
      const canvas = this.$refs.qrCanvas
      const link = document.createElement('a')
      link.download = `seron-do-futuro-qrcode-${this.qrSize}px.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    },
    
    printQRCode() {
      if (!this.$refs.qrCanvas) return
      
      const canvas = this.$refs.qrCanvas
      const printWindow = window.open('', '_blank')
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - Seron do Futuro</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                text-align: center; 
                font-family: Arial, sans-serif;
                background: white;
              }
              .print-container {
                max-width: 400px;
                margin: 0 auto;
              }
              .print-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #00d4ff;
              }
              .print-subtitle {
                font-size: 16px;
                color: #666;
                margin-bottom: 20px;
              }
              .print-qr {
                border: 2px solid #00d4ff;
                border-radius: 10px;
                padding: 10px;
                display: inline-block;
                margin-bottom: 20px;
              }
              .print-instructions {
                font-size: 14px;
                color: #333;
                line-height: 1.5;
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              <h1 class="print-title">Seron do Futuro</h1>
              <p class="print-subtitle">Escaneie o QR Code para acessar nosso site</p>
              <div class="print-qr">
                <img src="${canvas.toDataURL('image/png')}" alt="QR Code Seron do Futuro" style="max-width: 100%; height: auto;">
              </div>
              <div class="print-instructions">
                <p><strong>Como usar:</strong></p>
                <p>1. Abra a câmera do seu celular</p>
                <p>2. Aponte para o QR Code</p>
                <p>3. Toque na notificação que aparecer</p>
                <p>4. Explore o Seron do Futuro!</p>
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    },
    
    shareQRCode() {
      if (navigator.share) {
        navigator.share({
          title: 'Seron do Futuro - QR Code',
          text: 'Escaneie este QR Code para acessar o site da Escola Seron',
          url: this.qrUrl
        })
      } else {
        // Fallback para copiar URL
        navigator.clipboard.writeText(this.qrUrl).then(() => {
          alert('URL copiada para a área de transferência!')
        })
      }
    }
  }
}
</script>

<style scoped>
.qrcode-section {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
}

.qrcode-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  margin-bottom: 80px;
}

.qrcode-display {
  text-align: center;
}

.qrcode-container {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.qrcode-canvas {
  border-radius: 20px;
  border: 3px solid var(--primary-blue);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
  transition: var(--transition-smooth);
}

.qrcode-canvas:hover {
  transform: scale(1.02);
  box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
}

.qrcode-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(139, 92, 246, 0.9));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: 2;
}

.qrcode-container:hover .qrcode-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.overlay-title {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.overlay-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.qrcode-effects {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  pointer-events: none;
}

.effect-ring {
  position: absolute;
  border: 2px solid var(--primary-blue);
  border-radius: 50%;
  opacity: 0;
  animation: pulse 3s infinite;
}

.ring-1 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation-delay: 0s;
}

.ring-2 {
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  animation-delay: 1s;
}

.ring-3 {
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  animation-delay: 2s;
}

.qrcode-info {
  text-align: center;
}

.info-title {
  font-family: var(--font-futuristic);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
}

.info-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 30px;
}

.qrcode-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-item {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 20px;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 5px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Controles */
.qrcode-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.controls-section,
.usage-instructions {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.controls-section h4,
.usage-instructions h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 25px;
}

.control-group {
  margin-bottom: 25px;
}

.control-group label {
  display: block;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 8px;
}

.control-slider,
.control-input,
.control-select {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: var(--transition-smooth);
}

.control-slider {
  padding: 0;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  outline: none;
}

.control-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--gradient-primary);
  border-radius: 50%;
  cursor: pointer;
}

.control-input:focus,
.control-select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.control-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--primary-blue);
  color: var(--primary-blue);
  padding: 12px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition-smooth);
  font-weight: 600;
}

.btn-secondary:hover {
  background: var(--primary-blue);
  color: white;
  transform: translateY(-2px);
}

/* Instruções */
.instructions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.instruction-number {
  width: 30px;
  height: 30px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.instruction-text {
  color: var(--text-secondary);
  line-height: 1.5;
}

.instruction-text strong {
  color: var(--text-primary);
}

/* Exemplos de uso */
.usage-examples {
  margin-top: 60px;
}

.examples-title {
  font-family: var(--font-futuristic);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-primary);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.example-item {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: var(--transition-smooth);
}

.example-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary-blue);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.example-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.example-item h4 {
  font-family: var(--font-futuristic);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.example-item p {
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Responsividade */
@media (max-width: 768px) {
  .qrcode-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .qrcode-controls {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .qrcode-stats {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .control-actions {
    flex-direction: column;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .qrcode-canvas {
    max-width: 250px;
    height: auto;
  }
  
  .controls-section,
  .usage-instructions {
    padding: 20px;
  }
}
</style>
