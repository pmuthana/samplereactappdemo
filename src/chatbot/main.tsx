{/* 
 * 
 */}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/shared/index.css'
import ChatbotAgent from '@/chatbot/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatbotAgent />
  </StrictMode>,
)
