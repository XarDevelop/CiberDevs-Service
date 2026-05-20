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

interface Testimonio{
  name:string,
  content:string,
  role:string,
  starts:number
}

export default function Testimonio() {
    const [hayTestimonios,setHayTestimonios]=useState<boolean>(false);
    const [mostrarForm,setMostrarForm]=useState<boolean>(false)
    const [listaTestimonios,setListaTestimonios]=useState<InfoTestimonio[]>([]);

    const [nombre,setNombre]=useState<string>('');
    const [comentario,setComentario]=useState<string>('');
    const [rol,setRol]=useState<string>('');
    const [cantidadEstrellas,setCantidadEstrellas]=useState<number>(1);
    const [estan_rellenas,setEstan_rellenas]=useState<boolean | null>(null);
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

    const validarCampos=()=>{
      if(nombre.trim()!='' || comentario.trim()!='' || rol.trim()!=''){
        setEstan_rellenas(true);
      }else{
        setEstan_rellenas(false);
      }
    }

    const EnviarTestimonio= async(e)=>{
      validarCampos();
      if(!estan_rellenas){
        e.preventDefault();
      }
      else{
        const newTestimonio:Testimonio={
        name:nombre,
        content:comentario,
        role:rol,
        stars:cantidadEstrellas
      }

      try {
        const response=await axios.post('/api/reviews',newTestimonio);
        const data=response.data.message;
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      
      }
    }

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
        <button className="btn btn-outline" onClick={()=>{setMostrarForm(!mostrarForm);setNombre('');setComentario('');setRol('');setCantidadEstrellas(1)}}>{!mostrarForm && <p>Agregar Testimonio</p>}{mostrarForm && <p>Cancelar Testimonio</p>}</button>
        {mostrarForm && <div>

        <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '400px' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
      onChange={(e)=>{setNombre(e.target.value)}}
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
      onChange={(e)=>{
        setComentario(e.target.value)
      }}
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
      onChange={(e)=>{
        setRol(e.target.value);
      }}
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
      
      <div>
        <label htmlFor="">Cantidad de estrellas a otorgar:</label><div>
        <select className='select-star' onChange={(e)=>{setCantidadEstrellas(e.target.value)}}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
      </div>
    </Box>

    <Box sx={{ '& button': { m: 1 } }}>
      <div>
        {estan_rellenas==false?<p className='alert-form'>Por favor rellene correctamente el formulario</p>: <div></div>}
        <Button variant="outlined" size="medium" onClick={EnviarTestimonio}>
          Enviar Testimonio
        </Button>
        
      </div>
    </Box>

        </div>}
        
    </section>
    </div>
  )
}
