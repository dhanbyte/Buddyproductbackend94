
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { CartProvider } from './data/CartContext'
import { ClerkProvider } from '@clerk/clerk-react'
import { UserProvider } from './data/UserContext'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </ClerkProvider>
  </BrowserRouter>
)
