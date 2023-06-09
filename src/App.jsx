import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Loader from './components/Loader'
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import ProtectedRoutes from './components/ProtectedRoutes'
import React from 'react'

const App = () => {
  
  const isLoading = useSelector((state) => state.isLoading)

  return (
    <HashRouter>
    
      {isLoading && <Loader />} 

      <AppNavbar />
      <Container fluid> {/* el fluid sirve para quitar el espacio de la derecha e izquierda del contenedor*/}
        <Routes>
          {/*element = Nombre del page ---- path = a la direccion puesta en el Navbar*/}
          <Route 
            element = { <Home />}
            path = "/"
            />
          <Route 
            element = { <Login />} 
            path = "/login"
            />
          <Route 
            element = { <ProductDetail />}
            path = "/product/:id"
            />          
          <Route
          element = { <ProtectedRoutes />}
          >
            {/* ruta protegida*/}
            <Route 
              element = { <Purchases />}
              path = "/purchases"
              />
          </Route>            
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
