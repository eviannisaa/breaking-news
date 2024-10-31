import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NewsProvider } from './context/NewsContext.tsx'
import Router from './Router.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsProvider>
      <Router />
    </NewsProvider>
  </StrictMode>,
)
