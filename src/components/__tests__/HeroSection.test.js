import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HeroSection from '@/components/HeroSection.vue'

describe('HeroSection', () => {
  it('renders correctly', () => {
    const wrapper = mount(HeroSection)
    
    // Verifica se o título principal está presente
    expect(wrapper.find('.hero-title').exists()).toBe(true)
    
    // Verifica se o subtítulo está presente
    expect(wrapper.find('.hero-subtitle').exists()).toBe(true)
    
    // Verifica se o botão principal está presente
    expect(wrapper.find('.btn-explore').exists()).toBe(true)
  })

  it('displays correct title text', () => {
    const wrapper = mount(HeroSection)
    
    const titleLines = wrapper.findAll('.title-line')
    expect(titleLines).toHaveLength(2)
    expect(titleLines[0].text()).toBe('Seron')
    expect(titleLines[1].text()).toBe('do Futuro')
  })

  it('has correct subtitle', () => {
    const wrapper = mount(HeroSection)
    
    const subtitle = wrapper.find('.hero-subtitle')
    expect(subtitle.text()).toBe('Hoje, Amanhã e Além')
  })

  it('button has correct text', () => {
    const wrapper = mount(HeroSection)
    
    const button = wrapper.find('.btn-explore')
    expect(button.text()).toBe('Explorar o Futuro')
  })

  it('handles video mute toggle', async () => {
    const wrapper = mount(HeroSection)
    
    // Simula clique no botão de mute
    const muteButton = wrapper.find('.btn-secondary')
    await muteButton.trigger('click')
    
    // Verifica se o estado foi alterado
    expect(wrapper.vm.isVideoMuted).toBe(false)
  })

  it('scrolls to next section when button clicked', async () => {
    const wrapper = mount(HeroSection)
    
    // Mock do scrollIntoView
    const mockScrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = mockScrollIntoView
    
    // Cria um elemento mock para a próxima seção
    const mockElement = document.createElement('div')
    mockElement.className = 'comparison-section'
    document.body.appendChild(mockElement)
    
    // Simula clique no botão
    const button = wrapper.find('.btn-explore')
    await button.trigger('click')
    
    // Verifica se scrollIntoView foi chamado
    expect(mockScrollIntoView).toHaveBeenCalled()
    
    // Cleanup
    document.body.removeChild(mockElement)
  })
})
