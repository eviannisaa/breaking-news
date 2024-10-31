import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProductsProvider } from './context/ProductsContext.tsx'
import Router from './Router.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <Router />
    </ProductsProvider>
  </StrictMode>,
)
