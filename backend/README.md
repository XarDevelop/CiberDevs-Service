# Documentación de la API (Backend CiberDevs)

Este documento detalla los endpoints disponibles actualmente en el backend, su propósito y la estructura exactas de sus respuestas.

## Base URL
`/api/v1`

---

## 📌 Reseñas (Reviews)

### 1. Obtener todas las reseñas activas
- **Endpoint:** `/reviews`
- **Método:** `GET`
- **Descripción:** Devuelve una lista de todas las reseñas que actualmente están marcadas como activas en el sistema, ordenadas por la fecha de creación (de la más reciente a la más antigua).

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "author_name": "Juan Perez",
      "author_role": "CEO",
      "avatar_url": "https://ejemplo.com/avatar.jpg",
      "content": "Excelente servicio, lo recomiendo mucho.",
      "rating": 5,
      "is_active": true,
      "created_at": "2024-05-16T12:00:00.000Z"
    }
  ]
}
```

### 2. Crear una nueva reseña
- **Endpoint:** `/reviews`
- **Método:** `POST`
- **Descripción:** Crea una nueva reseña en la base de datos y la retorna. Incluye validaciones previas de formato.
- **Cuerpo esperado de la petición (JSON):**
```json
{
  "author_name": "Ana García",
  "author_role": "Freelancer",
  "content": "Muy buen trabajo, rápido y eficiente.",
  "rating": 4,
  "avatar_url": "https://ejemplo.com/avatar.jpg" // Opcional
}
```

**Estructura de la respuesta (Éxito - 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "author_name": "Ana García",
    "author_role": "Freelancer",
    "avatar_url": "https://ejemplo.com/avatar.jpg",
    "content": "Muy buen trabajo, rápido y eficiente.",
    "rating": 4,
    "is_active": true,
    "created_at": "2024-05-16T12:30:00.000Z"
  }
}
```

**Estructura de la respuesta (Error de Validación Zod - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Datos de entrada inválidos",
  "errors": [
    {
      "path": "rating",
      "message": "La calificación máxima es 5"
    }
  ]
}
```

---

## 📌 Autenticación (Authentication)

### 1. Iniciar sesión como administrador
- **Endpoint:** `/admin/auth/login`
- **Método:** `POST`
- **Descripción:** Permite a un administrador iniciar sesión proporcionando la contraseña correcta. Devuelve un token JWT si las credenciales son válidas.
- **Cuerpo esperado de la petición (JSON):**
```json
{
  "password": "admin"
}
```
- **Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "message": "Login successful"
}
```
- **Estructura de la respuesta (Error - 401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Portafolio (Portfolio)

### 1. Obtener todos los proyectos activos
- **Endpoint:** `/portfolio`
- **Método:** `GET`
- **Descripción:** Devuelve una lista de todos los proyectos de portafolio que están marcados como activos, ordenados desde el más reciente.

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "E-commerce Moda",
      "description": "Tienda online con pasarela de pagos",
      "icon": "🌐",
      "image_url": null,
      "project_url": "https://midominio.com",
      "is_active": true,
      "created_at": "2024-05-16T15:00:00.000Z"
    }
  ]
}
```

---

## �🛑 Estructura Global de Errores del Servidor
Cualquier error inesperado en el lado del servidor o en base de datos será capturado y devolverá esta estructura genérica.

**Estructura de la respuesta (Error Interno - 500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error interno del servidor"
}
```