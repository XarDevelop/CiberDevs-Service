import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

export default function FormularioDeServicio({ tipo }: Propiedades) {
  // ─── Estados del formulario ─────────────────────────────────────────
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [comentario, setComentario] = useState<string>('');
  const [pago, setPago] = useState<string>('transferencia');
  const [asuntoGmail, setAsuntoGmail] = useState<string>('');
  const [correoDestino, setCorreoDestino] = useState<string>('');

  // ─── Estado de validación ───────────────────────────────────────────
  const [estanRellenas, setEstanRellenas] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // ─── Validación de campos ──────────────────────────────────────────
  const validarCampos = (): boolean => {
    if (nombre.trim() === '' || comentario.trim() === '' || telefono.trim() === '') {
      setEstanRellenas(false);
      setErrorMsg('Por favor rellene correctamente el formulario (nombre, teléfono y comentario son obligatorios)');
      return false;
    }
    setEstanRellenas(true);
    setErrorMsg('');
    return true;
  };

  // ─── Enviar pedido al backend ──────────────────────────────────────
  const enviarPedidoBackend = async (): Promise<void> => {
    const pedido: Pedido = {
      name: nombre,
      coment: comentario,
      tipo_pedido: tipo,
      tipo_pago: pago,
      telefono: telefono,
    };

    try {
      const response = await axios.post('/api/orders', pedido);
      console.log('Pedido guardado:', response.data.message);
    } catch (error) {
      console.error('Error al guardar pedido:', error);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  //  APARTADO WHATSAPP
  // ═══════════════════════════════════════════════════════════════════

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
    const whatsappUrl = `https://wa.me/${'+51366196'}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const ProcessPedidoWhatsApp = async (): Promise<void> => {
    if (!validarCampos()) return;
    sendWhatsAppMessage();
    await enviarPedidoBackend();
  };

  // ═══════════════════════════════════════════════════════════════════
  //  APARTADO GMAIL
  // ═══════════════════════════════════════════════════════════════════

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
      setEstanRellenas(false);
      return;
    }

    if (!correoDestino.trim()) {
      setErrorMsg('Por favor ingrese un correo de destino');
      setEstanRellenas(false);
      return;
    }

    const emailBody = `Hola,\n\n` +
      `Soy ${nombre} y me interesa el servicio de ${tipo}.\n\n` +
      `Especificaciones:\n${comentario}\n\n` +
      `Forma de pago: ${pago}\n` +
      `Teléfono de contacto: ${telefono}\n\n` +
      `Saludos.`;

    openGmailWebComposer(correoDestino, asuntoGmail, emailBody);
    await enviarPedidoBackend();
  };

  // ═══════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      {/* ═══════════════════════ DATOS COMUNES ═══════════════════════ */}
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

        {/* Nombre */}
        <TextField
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
          id="nombre"
          label="Nombre completo"
          variant="outlined"
          fullWidth
        />

        {/* Teléfono */}
        <TextField
          onChange={(e) => {
            const soloNumeros = e.target.value.replace(/\D/g, '');
            setTelefono(soloNumeros);
          }}
          value={telefono}
          id="telefono"
          label="Número de teléfono"
          variant="outlined"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          fullWidth
        />

        {/* Comentario / Especificaciones */}
        <TextField
          onChange={(e) => setComentario(e.target.value)}
          value={comentario}
          id="comentario"
          label="Especificaciones de la página"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
        />

        {/* Forma de Pago */}
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

      {/* Mensaje de error */}
      {estanRellenas === false && (
        <p className="alert-form" style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          {errorMsg}
        </p>
      )}

      {/* ═══════════════════════ APARTADO WHATSAPP ═══════════════════════ */}
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
          sx={{
            backgroundColor: '#25D366',
            '&:hover': { backgroundColor: '#128C7E' },
            width: '100%',
          }}
        >
          📱 Enviar Pedido por WhatsApp
        </Button>
      </Box>

      {/* ═══════════════════════ APARTADO GMAIL ═══════════════════════ */}
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

        {/* Correo destino */}
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

        {/* Asunto de Gmail */}
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
          sx={{
            backgroundColor: '#0f1a3d',
            '&:hover': { backgroundColor: '#C5221F' },
            width: '100%',
          }}
        >
          📧 Enviar Pedido por Gmail
        </Button>
      </Box>

    </div>
  );
}