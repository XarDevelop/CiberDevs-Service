import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'

const Login = lazy(() => import('./pages/LoginPanelDeAdministracion'))
const PanelAdministracion = lazy(() => import('./pages/PanelAdministracion'))

function App() {
  return (
    <Suspense fallback={<div className="page-loader" />}>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/LoginPanelAdministracion2026" element={<Login />} />
        <Route path="/LoginPanelPrincipal" element={<PanelAdministracion />} />
      </Routes>
    </Suspense>
  )
}

export default App
