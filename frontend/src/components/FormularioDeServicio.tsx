import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';

interface Propiedades {
  tipo: string;
}

interface Pedido {
  name: string;
  coment: string;
  tipo_pedido: string;
  tipo_pago: string;
  telefono: string;
}

interface FieldErrors {
  name: string;
  telefono: string;
  comentario: string;
  tipo_pedido: string;
  tipo_pago: string;
}

export default function FormularioDeServicio({ tipo }: Propiedades) {
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [comentario, setComentario] = useState<string>('');
  const [pago, setPago] = useState<string>('transferencia');
  const [asuntoGmail, setAsuntoGmail] = useState<string>('');
  const [correoDestino, setCorreoDestino] = useState<string>('');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    name: '', telefono: '', comentario: '', tipo_pedido: '', tipo_pago: ''
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const resetErrors = () => {
    setFieldErrors({ name: '', telefono: '', comentario: '', tipo_pedido: '', tipo_pago: '' });
    setErrorMsg('');
  };

  const extractFieldErrors = (errors: Array<{ path: string; message: string }>) => {
    const mapped: FieldErrors = { name: '', telefono: '', comentario: '', tipo_pedido: '', tipo_pago: '' };
    for (const err of errors) {
      const field = err.path.replace(/^body\./, '');
      if (field === 'name') mapped.name = err.message;
      else if (field === 'telefono') mapped.telefono = err.message;
      else if (field === 'coment') mapped.comentario = err.message;
      else if (field === 'tipo_pedido') mapped.tipo_pedido = err.message;
      else if (field === 'tipo_pago') mapped.tipo_pago = err.message;
    }
    return mapped;
  };

  const validarCampos = (): boolean => {
    resetErrors();
    let valid = true;
    const errors = { name: '', telefono: '', comentario: '', tipo_pedido: '', tipo_pago: '' };

    if (nombre.trim().length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
      valid = false;
    }
    if (telefono.trim().length < 5) {
      errors.telefono = 'El teléfono debe tener al menos 5 dígitos';
      valid = false;
    }
    if (comentario.trim().length < 10) {
      errors.comentario = 'El comentario debe tener al menos 10 caracteres';
      valid = false;
    }

    setFieldErrors(errors);
    if (!valid) setErrorMsg('Por favor corrige los campos marcados en rojo');
    return valid;
  };

  const enviarPedidoBackend = async (): Promise<boolean> => {
    const pedido: Pedido = {
      name: nombre,
      coment: comentario,
      tipo_pedido: tipo,
      tipo_pago: pago,
      telefono: telefono,
    };

    try {
      await axios.post('/api/orders', pedido);
      return true;
    } catch (err: any) {
      if (err.response?.status === 400) {
        const data = err.response.data;
        if (data.errors) {
          const fieldErrs = extractFieldErrors(data.errors);
          setFieldErrors(fieldErrs);
          setErrorMsg(data.message || 'Datos inválidos. Revisa los campos marcados.');
        } else {
          setErrorMsg(data.message || 'Datos de entrada inválidos');
        }
      } else if (err.response?.status === 429) {
        setErrorMsg('Has hecho demasiadas solicitudes. Espera unos minutos.');
      } else {
        setErrorMsg(err.response?.data?.message || 'Error al registrar el pedido. Intenta de nuevo.');
      }
      return false;
    }
  };

  const sendWhatsAppMessage = (): void => {
    const cleanNumber = telefono.replace(/\D/g, '');
    if (!cleanNumber) {
      setErrorMsg('El número de teléfono es requerido para enviar por WhatsApp');
      return;
    }

    const message = `Hola, soy *${nombre}*.\n\n` +
      `Me interesa el servicio de *${tipo}*.\n\n` +
      `*Especificaciones:*\n${comentario}\n\n` +
      `*Forma de pago:* ${pago}\n` +
      `*Teléfono:* ${telefono}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+51366196?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const ProcessPedidoWhatsApp = async (): Promise<void> => {
    if (!validarCampos()) return;
    setSubmitting(true);
    const saved = await enviarPedidoBackend();
    setSubmitting(false);
    if (!saved) return;
    sendWhatsAppMessage();
  };

  const openGmailWebComposer = (
    toEmail: string,
    subject: string = '',
    body: string = ''
  ): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
      setErrorMsg('El correo electrónico no es válido');
      return;
    }

    const encodedTo = encodeURIComponent('francislopez0507@gmail.com');
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const ProcessPedidoGmail = async (): Promise<void> => {
    if (!validarCampos()) return;

    if (!asuntoGmail.trim()) {
      setErrorMsg('Por favor escriba un asunto para el correo de Gmail');
      return;
    }

    if (!correoDestino.trim()) {
      setErrorMsg('Por favor ingrese un correo de destino');
      return;
    }

    const emailBody = `Hola,\n\n` +
      `Soy ${nombre} y me interesa el servicio de ${tipo}.\n\n` +
      `Especificaciones:\n${comentario}\n\n` +
      `Forma de pago: ${pago}\n` +
      `Teléfono de contacto: ${telefono}\n\n` +
      `Saludos.`;

    setSubmitting(true);
    const saved = await enviarPedidoBackend();
    setSubmitting(false);
    if (!saved) return;
    openGmailWebComposer(correoDestino, asuntoGmail, emailBody);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => { e.preventDefault(); ProcessPedidoWhatsApp(); }}
      >
        <h2 style={{ marginBottom: '10px', color: '#0f1a3d' }}>
          Solicitud de Servicio: {tipo}
        </h2>

        <TextField
          onChange={(e) => { setNombre(e.target.value); if (fieldErrors.name) setFieldErrors(f => ({...f, name: ''})); }}
          value={nombre}
          id="nombre"
          label="Nombre completo"
          variant="outlined"
          fullWidth
          error={!!fieldErrors.name}
          helperText={fieldErrors.name || 'Mínimo 3 caracteres'}
        />

        <TextField
          onChange={(e) => {
            const soloNumeros = e.target.value.replace(/\D/g, '');
            setTelefono(soloNumeros);
            if (fieldErrors.telefono) setFieldErrors(f => ({...f, telefono: ''}));
          }}
          value={telefono}
          id="telefono"
          label="Número de teléfono"
          variant="outlined"
          fullWidth
          error={!!fieldErrors.telefono}
          helperText={fieldErrors.telefono || 'Mínimo 5 dígitos'}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />

        <TextField
          onChange={(e) => { setComentario(e.target.value); if (fieldErrors.comentario) setFieldErrors(f => ({...f, comentario: ''})); }}
          value={comentario}
          id="comentario"
          label="Especificaciones de la página"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          error={!!fieldErrors.comentario}
          helperText={fieldErrors.comentario || 'Mínimo 10 caracteres'}
        />

        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
            Forma de Pago:
          </label>
          <select
            className="select-star"
            onChange={(e) => setPago(e.target.value)}
            value={pago}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              fontSize: '16px',
            }}
          >
            <option value="transferencia">Pago por Transferencia</option>
            <option value="fisico">Pago Físico</option>
          </select>
        </div>
      </Box>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2, mt: 1 }} onClose={() => setErrorMsg('')}>
          {errorMsg}
        </Alert>
      )}

      <Box
        sx={{
          border: '2px solid #25D366',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          backgroundColor: '#f0fff4',
        }}
      >
        <h3 style={{ color: '#25D366', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💬</span> Enviar por WhatsApp
        </h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
          Se abrirá WhatsApp Web con un mensaje predefinido con tus datos.
        </p>
        <Button
          variant="contained"
          size="large"
          onClick={ProcessPedidoWhatsApp}
          disabled={submitting}
          sx={{
            backgroundColor: '#25D366',
            '&:hover': { backgroundColor: '#128C7E' },
            width: '100%',
          }}
        >
          {submitting ? 'Enviando...' : '📱 Enviar Pedido por WhatsApp'}
        </Button>
      </Box>

      <Box
        sx={{
          border: '2px solid #0f1a3d',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          backgroundColor: '#fff5f5',
        }}
      >
        <h3 style={{ color: '#0f1a3d', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✉️</span> Enviar por Gmail
        </h3>

        <TextField
          onChange={(e) => setCorreoDestino(e.target.value)}
          value={correoDestino}
          id="correo-destino"
          label="Correo de destino"
          variant="outlined"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          onChange={(e) => setAsuntoGmail(e.target.value)}
          value={asuntoGmail}
          id="asunto-gmail"
          label="Asunto del correo"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
          Se abrirá Gmail con un mensaje predefinido con tus datos.
        </p>

        <Button
          variant="contained"
          size="large"
          onClick={ProcessPedidoGmail}
          disabled={submitting}
          sx={{
            backgroundColor: '#0f1a3d',
            '&:hover': { backgroundColor: '#C5221F' },
            width: '100%',
          }}
        >
          {submitting ? 'Enviando...' : '📧 Enviar Pedido por Gmail'}
        </Button>
      </Box>

    </div>
  );
}
