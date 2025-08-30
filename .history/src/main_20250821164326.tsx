
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './data/CartContext.tsx'
import { AuthProvider } from './Auth/AuthContext.tsx'
createRoot(document.getElementById('root')!).render(
   <AuthProvider>
  <BrowserRouter>
  <CartProvider>
     <App />
  </CartProvider>
   
 </BrowserRouter> 
 </AuthProvider>
)
