import React from 'react'
import '../style/Testimonio.css'
import './TestimonioGrid'
import TestimonioGrid from './TestimonioGrid'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

interface InfoTestimonio{
    id: number,
    author_name: string,
    author_role: string,
    avatar_url: string,
    content: string,
    rating: number,
    is_active: boolean,
    created_at: string
}

interface RespuestaTestimonio{
  success: boolean,
  data:InfoTestimonio[];
}

export default function Testimonio() {
    const [hayTestimonios,setHayTestimonios]=useState<boolean>(false);
    const [mostrarForm,setMostrarForm]=useState<boolean>(false)
    const [listaTestimonios,setListaTestimonios]=useState<InfoTestimonio[]>([]);

    useEffect(()=>{
        const TraerTestimonios=async ()=>{
            try {
                const response=await axios.get<RespuestaTestimonio>('/api/reviews');
                const data=response.data.data;
                setListaTestimonios(data);
                setHayTestimonios(response.data.succes);
                
            } catch (error) {
                console.log(error)
            }
        }
        TraerTestimonios();
    },[])

    const MostrarTestimonios=listaTestimonios.map((testimonio:InfoTestimonio)=>(<TestimonioGrid key={testimonio.id} props={testimonio}></TestimonioGrid>))

  return (
    <div>
        <section className="testimonials" id="testimonios">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Testimonios</span>
                <h2 className="section-title">Feedback de nuestros clientes</h2>
                <p className="section-subtitle">Lo que dicen quienes ya confiaron en CiberDev</p>
            </div>
            {hayTestimonios && <div className="testimonials-grid">
                {MostrarTestimonios}
            </div>}
            {!hayTestimonios && <div className='warning-testimonio'><p className='p-warning'>No hay testimonios</p></div>}
        </div>
        <button className="btn btn-outline" onClick={()=>{setMostrarForm(!mostrarForm)}}>{!mostrarForm && <p>Agregar Testimonio</p>}{mostrarForm && <p>Cancelar Testimonio</p>}</button>
        {mostrarForm && <div>

        <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '400px' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-suffix-shrink"
        label="Nombre y Apellidos"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: 0,
                  pointerEvents: 'none',
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        id="outlined-suffix-shrink"
        label="Comentario"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: 0,
                  pointerEvents: 'none',
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
              </InputAdornment>
            ),
          },
        }}
      />
      
      <TextField
        id="outlined-suffix-shrink"
        label="Rol o Trabajo que pertenece"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: 0,
                  pointerEvents: 'none',
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
              </InputAdornment>
            ),
          },
        }}
      />
      <br />
      
      <label htmlFor="">Cantidad de estrellas a otorgar:</label><div>
        <select className='select-star'>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
    </Box>

    <Box sx={{ '& button': { m: 1 } }}>
      <div>
        <Button variant="outlined" size="medium">
          Medium
        </Button>
        
      </div>
    </Box>

        </div>}
        
    </section>
    </div>
  )
}
