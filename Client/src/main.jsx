import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MessageProvider } from '../context/message.jsx'
import { UserProvider } from '../context/User.jsx'
import { BrowserRouter } from 'react-router'
import { CartProvider } from '../context/cart.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MessageProvider>
      <UserProvider>
        <CartProvider>
          <StrictMode>
            <App />
          </StrictMode>,
        </CartProvider>
      </UserProvider>
    </MessageProvider>
  </BrowserRouter>

)
