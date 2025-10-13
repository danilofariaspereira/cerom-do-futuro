// Configuração global para testes
import { vi } from 'vitest'

// Mock de APIs globais
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock do scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// Mock do navigator.share
Object.defineProperty(navigator, 'share', {
  value: vi.fn(() => Promise.resolve()),
  writable: true
})

// Mock do clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(() => Promise.resolve())
  },
  writable: true
})
