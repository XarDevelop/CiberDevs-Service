import React from 'react'
import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {useState} from 'react'

interface Propiedades{
  tipo:string
}

interface Pedido{
  name:string,
  coment:string,
  tipo_pedido:string,
  tipo_pago:string
}

export default function FormularioDeServicio({tipo}:Propiedades) {
  const [estan_rellenas,setEstan_Rellenas]=useState<boolean | null>(null)

  const [nombre,set]=useState<string>('')
  const [comentario,setComentario]=useState<string>('')
  const [pago,tipo_pago]=useState<string>('transferencia')
  
  const validarCampos=()=>{
        if(nombre.trim()!='' || comentario.trim()!=''){
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
          const Pedido:Pedido={
          name:nombre,
          coment:comentario,
          tipo_pedido:tipo,
          tipo_pago:pago
        }
  
        try {
          const response=await axios.post('/api/orders',Pedido);
          const data=response.data.message;
          console.log(data)
        } catch (error) {
          console.log(error)
        }
        
        }
      }

  return (
    <div>
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
          <br />
          <label htmlFor="">Escribe las especificaciones basicas de la pagina</label>
          <textarea name="" id="" cols="300" rows="40"></textarea>
          <br />
          
          <div>
            <label htmlFor="">Forma de Pago:</label><div>
            <select className='select-star' onChange={(e)=>{setCantidadEstrellas(e.target.value)}}>
            <option value="transferencia">Pago por Transferencia</option>
            <option value="fisico">Pago Fisico</option>
          </select>
          </div>
          </div>
        </Box>
    
        <Box sx={{ '& button': { m: 1 } }}>
          <div>
            {estan_rellenas==false?<p className='alert-form'>Por favor rellene correctamente el formulario</p>: <div></div>}
            <Button variant="outlined" size="medium" onClick={EnviarTestimonio}>
              Enviar Pedido(gmail)
            </Button>
            <Button variant="outlined" size="medium" onClick={EnviarTestimonio}>
              Enviar Pedido(WhatsApp)
            </Button>
            
          </div>
        </Box>
        
        </div>
  )
}
