import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage'
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CatalogPage from './pages/CatalogPage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage title='Corte Literario'/>} />
        <Route path='/nosotros' element={<AboutPage title='Nosotros'/>} />
        <Route path='/contacto' element={<ContactPage title='Contacto'/>} />
        <Route path='/catalogo' element={<CatalogPage title='Catálogo'/>} />
        <Route path='/login' element={<LogInPage title='Iniciar sesión'/>} />
        <Route path='/signup' element={<SignUpPage title='Crear cuenta'/>} />
        <Route path="*" element={<HomePage title='Corte Literario'/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
