
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { CartProvider } from './data/CartContext'
import { AuthProvider } from './Auth/AuthContext'
createRoot(document.getElementById('root')!).render(
   <AuthProvider>
  <BrowserRouter>
  <CartProvider>
     <App />
  </CartProvider>
   
 </BrowserRouter> 
 </AuthProvider>
)
