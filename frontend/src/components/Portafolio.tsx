import { useState, useEffect } from 'react'
import '../style/Portafolio.css'
import axios from 'axios'
import PortafolioElement from './PortafolioElement'

 interface PortafolioProps{
    id: number,
    title: string,
    description: string,
    icon: string,
    image_url:string | null,
    project_url: string,
    is_active: boolean,
    created_at:string
}

 interface RespuestaPortafolio{
    success: boolean,
    data: PortafolioProps[]
}

export default function Portafolio() {
    const [listaProyectos,setListaProyectos]=useState<PortafolioProps[]>([]);
    const [hayProyectos,setHayProyectos]=useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(()=>{
        const TraerProyectos=async ()=>{
            try{
            setLoading(true);
            const response=await axios.get<RespuestaPortafolio>('/api/portfolio');
            const data= response.data.data;
            setHayProyectos(response.data.success)
            setListaProyectos(data);
            }catch(e){
                setError('Error al cargar proyectos. Intenta de nuevo.');
            }finally{
                setLoading(false);
            }
        }

        TraerProyectos();
    },[])

    const MostrarPortafolios= listaProyectos.map((element:PortafolioProps)=>(<PortafolioElement key={element.id} props={element}></PortafolioElement>))

  return (
    <div>
        <section className="portfolio" id="portafolio">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Portafolio</span>
                <h2 className="section-title">Muestra de proyectos</h2>
                <p className="section-subtitle">Algunos de los proyectos que hemos desarrollado para nuestros clientes</p>
            </div>
            {loading && (<p style={{ textAlign: 'center', color: '#666' }}>Cargando proyectos...</p>)}
            {error && (<p style={{ textAlign: 'center', color: '#c62828' }}>{error}</p>)}
            {!loading && !error && hayProyectos && (<div className="portfolio-grid">
                {MostrarPortafolios}
            </div>)}
            {!loading && !error && !hayProyectos && (<div className='warning-portfolio'>
                <p className='p-warning'>
                    No hay proyectos visibles
                </p>
            </div>
            )}
        </div>
    </section>
    </div>
  )
}
