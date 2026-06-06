import { useState, useEffect, FormEvent } from 'react';

import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Fade
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  Login as LoginIcon
} from '@mui/icons-material';
import axios from 'axios';

// Configuración de axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

const API_URL = '/api/admin/auth/login';
const REDIRECT_URL = '/LoginPanelPrincipal';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  // ============================================
  // VERIFICACIÓN AUTOMÁTICA AL MONTAR
  // ============================================
  useEffect(() => {
    const verifySession = async () => {
      try {
        // Intenta acceder a un endpoint protegido
        // Si la cookie JWT es válida, redirige automáticamente
        await axios.get('/api/admin/auth/dashboard', { withCredentials: true });
        
        // Si llega aquí, el token es válido → redirigir al panel
        window.location.href = REDIRECT_URL;
      } catch (err: any) {
        // 401 = no hay sesión o token inválido → mostrar login
        setCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  // ============================================
  // MANEJO DEL LOGIN
  // ============================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        { password },
        {
          withCredentials: true, // CRUCIAL: recibe la cookie HttpOnly del backend
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Login exitoso → redirigir al panel principal
        window.location.href = REDIRECT_URL;
      }
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        if (status === 401) {
          setError(data?.error || 'Credenciales incorrectas');
        } else if (status === 429) {
          setError(data?.message || 'Demasiados intentos. Intenta de nuevo en 15 minutos.');
        } else {
          setError(data?.message || data?.error || 'Error del servidor');
        }
      } else if (err.request) {
        setError('Error de conexión. Verifica tu red.');
      } else {
        setError('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CIERRE DE SESIÓN
  // ============================================
  const handleLogout = async () => {
    try {
      await axios.post('/api/admin/auth/logout', {}, { withCredentials: true });
    } catch {
      // Silently ignore logout errors
    } finally {
      window.location.reload();
    }
  };

  // Pantalla de carga mientras verifica la sesión
  if (checkingAuth) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f1a3d',
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  // Si no está autenticado, mostrar el formulario de login
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 5 },
              width: '100%',
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            {/* TÍTULO PRINCIPAL */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Bienvenido a CiberDev
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                Hacemos crecer tu negocio
              </Typography>
            </Box>

            {/* FORMULARIO */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* INPUT DE PASSWORD */}
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderWidth: 2,
                    },
                  },
                }}
              />

              {/* MENSAJE DE ERROR */}
              {error && (
                <Fade in>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              {/* BOTÓN DE LOGIN */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !password}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LoginIcon />
                  )
                }
                sx={{
                  py: 1.8,
                  borderRadius: 2.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    boxShadow: '0 6px 20px 0 rgba(0,118,255,0.23)',
                    background: 'linear-gradient(135deg, #5568d3 0%, #653e91 100%)',
                  },
                  '&:disabled': {
                    background: 'rgba(0,0,0,0.12)',
                    color: 'rgba(0,0,0,0.26)',
                  },
                }}
              >
                {loading ? 'Verificando...' : 'Iniciar Sesión'}
              </Button>
            </Box>

            {/* FOOTER OPCIONAL */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 3,
                color: 'text.disabled',
              }}
            >
              CiberDev © {new Date().getFullYear()}
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;