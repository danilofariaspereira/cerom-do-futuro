# 🚀 Seron do Futuro - Guia de Instalação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para controle de versão)

### Verificação das Instalações
```bash
# Verificar versões
node --version    # Deve ser v16+
npm --version     # Qualquer versão recente
git --version     # Qualquer versão recente
```

## 🛠️ Instalação do Projeto

### 1. Clonar o Repositório
```bash
# Clone o repositório (substitua pela URL real)
git clone https://github.com/escola-seron/seron-do-futuro.git

# Navegar para o diretório
cd seron-do-futuro
```

### 2. Instalar Dependências
```bash
# Instalar todas as dependências
npm install

# Ou usando yarn
yarn install
```

### 3. Executar o Projeto
```bash
# Modo desenvolvimento
npm run dev

# O projeto estará disponível em:
# http://localhost:3000
```

## 🎨 Configuração de Assets

### 1. Criar Estrutura de Pastas
```bash
# Criar pastas para assets
mkdir -p public/images
mkdir -p public/videos
```

### 2. Adicionar Imagens
Siga o guia em `ASSETS_GUIDE.md` para adicionar:
- Logo da Escola Seron
- Fotos da diretora Cíntia
- Imagens de comparação (atual/futuro)
- Fotos dos alunos
- Imagens de infraestrutura futurista

### 3. Adicionar Vídeo Institucional
```bash
# Colocar o vídeo principal em:
public/videos/seron-futuro-hero.mp4
```

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm run test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 🏗️ Build para Produção

```bash
# Gerar build de produção
npm run build

# Preview do build local
npm run preview
```

## 📱 Verificação de Funcionalidades

### Checklist de Funcionalidades
- [ ] **Hero Section**: Vídeo carrega e botões funcionam
- [ ] **Comparações**: Hover effects e modais funcionam
- [ ] **Jarvas Cíntia**: Chat interativo responde
- [ ] **Alunos**: Transições de fotos funcionam
- [ ] **Infraestrutura**: Timeline interativa funciona
- [ ] **QR Code**: Geração e download funcionam
- [ ] **Contato**: Formulário envia dados
- [ ] **Responsividade**: Testado em mobile/tablet/desktop

### Testes de Responsividade
```bash
# Abrir DevTools e testar breakpoints:
# - Mobile: 375px
# - Tablet: 768px  
# - Desktop: 1200px
```

## 🔧 Configurações Avançadas

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_APP_TITLE=Seron do Futuro
VITE_APP_URL=https://serondo-futuro.com
VITE_API_URL=https://api.serondo-futuro.com
```

### Configuração do Vite
O arquivo `vite.config.js` já está configurado com:
- Plugin Vue.js
- Servidor de desenvolvimento na porta 3000
- Build otimizado para produção
- Source maps habilitados

## 🚀 Deploy

### Opção 1: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy de produção
vercel --prod
```

### Opção 2: Netlify
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy de produção
netlify deploy --prod
```

### Opção 3: Deploy Manual
```bash
# Gerar build
npm run build

# Upload da pasta 'dist' para seu servidor
```

## 🐛 Solução de Problemas

### Problema: Erro de dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: Porta já em uso
```bash
# Usar porta diferente
npm run dev -- --port 3001
```

### Problema: Assets não carregam
- Verificar se as imagens estão na pasta `public/images/`
- Verificar se os caminhos estão corretos nos componentes
- Verificar se o servidor está rodando

### Problema: QR Code não gera
- Verificar se a biblioteca `qrcode` foi instalada
- Verificar se há erros no console do navegador

## 📞 Suporte

### Contatos Técnicos
- **Tech Leader**: Danilo
- **Desenvolvedor**: [Seu Nome]
- **Escola Seron**: contato@escolaseron.com.br

### Recursos Adicionais
- **Documentação Vue.js**: https://vuejs.org/guide/
- **Documentação Vite**: https://vitejs.dev/guide/
- **Documentação QRCode**: https://github.com/soldair/node-qrcode

## ✅ Checklist Final

Antes de considerar o projeto pronto:

- [ ] Projeto executa sem erros (`npm run dev`)
- [ ] Todos os testes passam (`npm run test`)
- [ ] Build de produção funciona (`npm run build`)
- [ ] Responsividade testada em todos os dispositivos
- [ ] Assets (imagens/vídeos) adicionados
- [ ] Formulário de contato funcional
- [ ] QR Code gera e baixa corretamente
- [ ] Performance aceitável (Lighthouse 90+)
- [ ] Acessibilidade validada

---

## 🎉 Parabéns!

Se você chegou até aqui, o projeto **Seron do Futuro** está pronto para ser usado! 

Agora é só adicionar os assets reais e fazer o deploy para produção.

**Boa sorte com o futuro da educação! 🚀**

---

*Guia atualizado em: Dezembro 2024*
*Versão do projeto: 1.0.0*
