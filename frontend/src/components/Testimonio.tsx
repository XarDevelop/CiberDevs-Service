import React from 'react'
import '../style/Testimonio.css'
import TestimonioGrid from './TestimonioGrid'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface InfoTestimonio {
    id: number,
    author_name: string,
    author_role: string,
    avatar_url: string,
    content: string,
    rating: number,
    is_active: boolean,
    created_at: string
}

interface RespuestaTestimonio {
    success: boolean,
    data: InfoTestimonio[];
}

interface Testimonio {
    name: string,
    content: string,
    role: string,
    stars: number
}

export default function Testimonio() {
    const [hayTestimonios, setHayTestimonios] = useState<boolean>(false);
    const [mostrarForm, setMostrarForm] = useState<boolean>(false)
    const [listaTestimonios, setListaTestimonios] = useState<InfoTestimonio[]>([]);

    const [nombre, setNombre] = useState<string>('');
    const [comentario, setComentario] = useState<string>('');
    const [rol, setRol] = useState<string>('');
    const [cantidadEstrellas, setCantidadEstrellas] = useState<number | null>(5);
    const [estanRellenas, setEstanRellenas] = useState<boolean>(true);

    const TraerTestimonios = async () => {
        try {
            const response = await axios.get<RespuestaTestimonio>('/api/reviews');
            const data = response.data.data;
            setListaTestimonios(data);
            setHayTestimonios(response.data.success);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        TraerTestimonios();
    }, [])

    const validarCampos = (): boolean => {
        const isValid = nombre.trim() !== '' && comentario.trim() !== '' && rol.trim() !== '';
        setEstanRellenas(isValid);
        return isValid;
    }

    const EnviarTestimonio = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validarCampos()) {
            return;
        }

        const newTestimonio: Testimonio = {
            name: nombre,
            content: comentario,
            role: rol,
            stars: cantidadEstrellas || 5
        }

        try {
            const response = await axios.post('/api/reviews', newTestimonio);
            const data = response.data.message;
            console.log(data);
            
            setNombre('');
            setComentario('');
            setRol('');
            setCantidadEstrellas(5);
            setMostrarForm(false);
            setEstanRellenas(true);
            TraerTestimonios();
        } catch (error) {
            console.log(error)
        }
    }

    const toggleForm = () => {
        setMostrarForm(!mostrarForm);
        if (mostrarForm) {
            // Al cerrar, resetear
            setNombre('');
            setComentario('');
            setRol('');
            setCantidadEstrellas(5);
            setEstanRellenas(true);
        }
    }

    const MostrarTestimonios = listaTestimonios.map((testimonio: InfoTestimonio) => (
        <TestimonioGrid key={testimonio.id} props={testimonio} />
    ))

    return (
        <div>
            <section className="testimonials" id="testimonios">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Testimonios</span>
                        <h2 className="section-title">Feedback de nuestros clientes</h2>
                        <p className="section-subtitle">Lo que dicen quienes ya confiaron en CiberDev</p>
                    </div>
                    
                    {hayTestimonios ? (
                        <div className="testimonials-grid">
                            {MostrarTestimonios}
                        </div>
                    ) : (
                        <div className='warning-testimonio'>
                            <p className='p-warning'>No hay testimonios</p>
                        </div>
                    )}
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                    <Button
                        variant={mostrarForm ? "outlined" : "contained"}
                        color={mostrarForm ? "error" : "primary"}
                        startIcon={mostrarForm ? <CloseIcon /> : <AddIcon />}
                        onClick={toggleForm}
                        size="large"
                    >
                        {mostrarForm ? "Cancelar" : "Agregar Testimonio"}
                    </Button>
                </Box>

                {mostrarForm && (
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            maxWidth: 500, 
                            mx: 'auto', 
                            p: 4, 
                            mt: 2, 
                            mb: 4,
                            borderRadius: 3 
                        }}
                    >
                        <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ mb: 3 }}>
                            Comparte tu experiencia
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={EnviarTestimonio}
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 2.5 
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                fullWidth
                                required
                                label="Nombre y Apellidos"
                                variant="outlined"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                error={!estanRellenas && nombre.trim() === ''}
                                helperText={!estanRellenas && nombre.trim() === '' ? "Este campo es obligatorio" : ""}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Rol o Trabajo"
                                variant="outlined"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                error={!estanRellenas && rol.trim() === ''}
                                helperText={!estanRellenas && rol.trim() === '' ? "Este campo es obligatorio" : ""}
                            />

                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={4}
                                label="Tu comentario"
                                variant="outlined"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                error={!estanRellenas && comentario.trim() === ''}
                                helperText={!estanRellenas && comentario.trim() === '' ? "Este campo es obligatorio" : ""}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 1 }}>
                                <Typography component="legend" variant="body1" color="text.secondary">
                                    Calificación
                                </Typography>
                                <Rating
                                    name="estrellas-testimonio"
                                    value={cantidadEstrellas}
                                    onChange={(event, newValue) => {
                                        setCantidadEstrellas(newValue);
                                    }}
                                    size="large"
                                    precision={1}
                                />
                            </Box>

                            {!estanRellenas && (
                                <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                                    Por favor completa todos los campos obligatorios
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<SendIcon />}
                                sx={{ mt: 2, py: 1.5 }}
                            >
                                Enviar Testimonio
                            </Button>
                        </Box>
                    </Paper>
                )}
            </section>
        </div>
    )
}