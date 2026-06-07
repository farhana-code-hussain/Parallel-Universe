import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import InputPage from './InputPage.jsx'
import CareerPage from "./CareerPage.jsx"
import CareerResults from "./CareerResults.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/career-results" element={<CareerResults />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)