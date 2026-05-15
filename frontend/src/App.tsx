import './App.css'
import {Routes,Route} from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'
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
   * </Routes>
    </div>
  )
}

export default App
