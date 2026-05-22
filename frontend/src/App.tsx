import './App.css'
import {Routes,Route} from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'
import Login from './pages/LoginPanelDeAdministracion'
import PanelAdministracion from './pages/PanelAdministracion'
function App() {

  /**
   * Para context 
   * 
   * import { useContext } from 'react';

// Hook personalizado con validación de seguridad
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  
  return context;
}
   */
  
  /**
   * <Routes>
   *    <Route path="" element={}></Route>
   * </Routes>
   */

  return (
    <div>
      <Routes>
   *    <Route path="/" element={<PaginaPrincipal></PaginaPrincipal>}></Route>
   *    <Route path="/LoginPanelAdministracion2026" element={<Login></Login>}></Route>
   *    <Route path="/LoginPanelPrincipal" element={<PanelAdministracion></PanelAdministracion>}></Route>
   * </Routes>
    </div>
  )
}

export default App
