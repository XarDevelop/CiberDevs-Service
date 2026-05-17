import React from 'react'
import '../style/Portafolio.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
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
    useEffect(()=>{
        const TraerProyectos=async ()=>{
            try{
            const response=await axios.get<RespuestaPortafolio>('/api/portfolio');
            const data= response.data.data;
            setHayProyectos(response.data.success)
            setListaProyectos(data);
            }catch(e){
                alert(e)
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
            {hayProyectos && (<div className="portfolio-grid">
                {MostrarPortafolios}
            </div>)}
            {!hayProyectos && (<div className='warning-portfolio'>
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
