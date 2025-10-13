import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import JarvasSection from '@/components/JarvasSection.vue'

describe('JarvasSection', () => {
  it('renders correctly', () => {
    const wrapper = mount(JarvasSection)
    
    // Verifica se o título da seção está presente
    expect(wrapper.find('.section-title').exists()).toBe(true)
    
    // Verifica se a interface de chat está presente
    expect(wrapper.find('.chat-interface').exists()).toBe(true)
    
    // Verifica se o input de mensagem está presente
    expect(wrapper.find('.chat-input').exists()).toBe(true)
  })

  it('displays welcome message', () => {
    const wrapper = mount(JarvasSection)
    
    const welcomeMessage = wrapper.find('.welcome-message')
    expect(welcomeMessage.exists()).toBe(true)
    
    const messageText = welcomeMessage.find('.message-content p')
    expect(messageText.text()).toContain('Olá! Sou Cíntia, a IA Jarvas da Seron')
  })

  it('has quick questions buttons', () => {
    const wrapper = mount(JarvasSection)
    
    const quickQuestions = wrapper.findAll('.quick-question-btn')
    expect(quickQuestions.length).toBeGreaterThan(0)
    
    // Verifica se as perguntas rápidas estão presentes
    const questionTexts = quickQuestions.map(btn => btn.text())
    expect(questionTexts).toContain('Como será a escola no futuro?')
    expect(questionTexts).toContain('Quais tecnologias vocês usam?')
  })

  it('sends message when enter key pressed', async () => {
    const wrapper = mount(JarvasSection)
    
    const input = wrapper.find('input[type="text"]')
    const initialMessageCount = wrapper.vm.messages.length
    
    // Simula digitação e pressionamento de Enter
    await input.setValue('Teste de mensagem')
    await input.trigger('keypress.enter')
    
    // Verifica se a mensagem foi adicionada
    expect(wrapper.vm.messages.length).toBe(initialMessageCount + 1)
    expect(wrapper.vm.messages[wrapper.vm.messages.length - 1].text).toBe('Teste de mensagem')
  })

  it('asks quick question when button clicked', async () => {
    const wrapper = mount(JarvasSection)
    
    const quickQuestionBtn = wrapper.find('.quick-question-btn')
    const initialMessageCount = wrapper.vm.messages.length
    
    await quickQuestionBtn.trigger('click')
    
    // Verifica se a pergunta foi adicionada às mensagens
    expect(wrapper.vm.messages.length).toBe(initialMessageCount + 1)
  })

  it('generates AI response after user message', async () => {
    const wrapper = mount(JarvasSection)
    
    const input = wrapper.find('input[type="text"]')
    const initialMessageCount = wrapper.vm.messages.length
    
    // Simula envio de mensagem
    await input.setValue('Como será a escola no futuro?')
    await input.trigger('keypress.enter')
    
    // Aguarda a resposta da IA (simulada)
    await wrapper.vm.$nextTick()
    
    // Verifica se tanto a mensagem do usuário quanto a resposta da IA foram adicionadas
    expect(wrapper.vm.messages.length).toBe(initialMessageCount + 2)
    
    // Verifica se a última mensagem é da IA
    const lastMessage = wrapper.vm.messages[wrapper.vm.messages.length - 1]
    expect(lastMessage.type).toBe('ai-message')
  })

  it('disables input while AI is typing', async () => {
    const wrapper = mount(JarvasSection)
    
    const input = wrapper.find('input[type="text"]')
    
    // Simula estado de digitação da IA
    wrapper.vm.isTyping = true
    await wrapper.vm.$nextTick()
    
    // Verifica se o input está desabilitado
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('shows correct time format', () => {
    const wrapper = mount(JarvasSection)
    
    const time = wrapper.vm.getCurrentTime()
    
    // Verifica se o formato de tempo está correto (HH:MM)
    expect(time).toMatch(/^\d{2}:\d{2}$/)
  })
})
