# Documentación de la API (Backend CiberDevs)

Este documento detalla los endpoints disponibles actualmente en el backend, su propósito y la estructura exacta de sus respuestas.

## Base URL
`/api/v1`

---

## 📌 Autenticación (Authentication)

### 1. Iniciar sesión como administrador
- **Endpoint:** `/admin/auth/login`
- **Método:** `POST`
- **Descripción:** Permite a un administrador iniciar sesión proporcionando la contraseña correcta. Devuelve un token JWT en cookie (`HttpOnly`, `Secure`, `SameSite=Strict`) y acepta también `Authorization: Bearer <token>`.
- **Rate limit:** 5 intentos cada 15 minutos por IP.
- **Auth:** No requiere
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
- **Estructura de la respuesta (Rate Limit - 429 Too Many Requests):**
```json
{
  "success": false,
  "message": "Demasiados intentos de inicio de sesión. Intenta de nuevo en 15 minutos."
}
```

---

## 📌 Reseñas (Reviews)

### 1. Obtener todas las reseñas activas
- **Endpoint:** `/reviews`
- **Método:** `GET`
- **Descripción:** Devuelve una lista de todas las reseñas marcadas como activas, ordenadas por fecha de creación descendente.
- **Rate limit:** 100 requests cada 15 minutos.
- **Auth:** No requiere

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
- **Descripción:** Crea una nueva reseña. Incluye validación Zod previa.
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** No requiere
- **Cuerpo esperado de la petición (JSON):**
```json
{
  "author_name": "Ana García",
  "author_role": "Freelancer",
  "content": "Muy buen trabajo, rápido y eficiente.",
  "rating": 4,
  "avatar_url": "https://ejemplo.com/avatar.jpg"
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

---

## 📌 Portafolio (Portfolio)

### 1. Obtener todos los proyectos activos
- **Endpoint:** `/portfolio`
- **Método:** `GET`
- **Descripción:** Devuelve una lista de todos los proyectos activos, ordenados desde el más reciente.
- **Rate limit:** 100 requests cada 15 minutos.
- **Auth:** No requiere

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

### 2. Obtener un proyecto por ID
- **Endpoint:** `/portfolio/:id`
- **Método:** `GET`
- **Descripción:** Devuelve un proyecto específico por su ID (incluye activos e inactivos).
- **Rate limit:** 100 requests cada 15 minutos.
- **Auth:** No requiere

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-commerce Moda",
    "description": "Tienda online con pasarela de pagos",
    "icon": "🌐",
    "image_url": null,
    "project_url": "https://midominio.com",
    "is_active": true,
    "created_at": "2024-05-16T15:00:00.000Z"
  }
}
```

**Estructura de la respuesta (No encontrado - 404 Not Found):**
```json
{
  "success": false,
  "message": "Proyecto no encontrado"
}
```

### 3. Crear un nuevo proyecto
- **Endpoint:** `/portfolio`
- **Método:** `POST`
- **Descripción:** Crea un nuevo proyecto en el portafolio. Todos los proyectos se crean como activos por defecto.
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)
- **Cuerpo esperado de la petición (JSON):**
```json
{
  "title": "E-commerce Moda",
  "description": "Tienda online con pasarela de pagos integrada",
  "icon": "🌐",
  "image_url": "https://ejemplo.com/imagen.jpg",
  "project_url": "https://midominio.com"
}
```

**Estructura de la respuesta (Éxito - 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-commerce Moda",
    "description": "Tienda online con pasarela de pagos integrada",
    "icon": "🌐",
    "image_url": "https://ejemplo.com/imagen.jpg",
    "project_url": "https://midominio.com",
    "is_active": true,
    "created_at": "2024-05-16T15:00:00.000Z"
  }
}
```

### 4. Actualizar un proyecto
- **Endpoint:** `/portfolio/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza los campos enviados de un proyecto existente. Solo se actualizan los campos incluidos en el cuerpo; los omitidos no se modifican.
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)
- **Cuerpo esperado de la petición (JSON) — todos los campos son opcionales:**
```json
{
  "title": "E-commerce Moda V2",
  "description": "Nueva descripción del proyecto",
  "icon": "🛒",
  "image_url": "https://ejemplo.com/nueva-imagen.jpg",
  "project_url": "https://nuevo-dominio.com"
}
```

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-commerce Moda V2",
    "description": "Nueva descripción del proyecto",
    "icon": "🛒",
    "image_url": "https://ejemplo.com/nueva-imagen.jpg",
    "project_url": "https://nuevo-dominio.com",
    "is_active": true,
    "created_at": "2024-05-16T15:00:00.000Z"
  }
}
```

### 5. Activar / Desactivar un proyecto
- **Endpoint:** `/portfolio/:id/toggle`
- **Método:** `PATCH`
- **Descripción:** Invierte el estado `is_active` del proyecto (si está activo lo desactiva y viceversa).
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)
- **Cuerpo:** No requiere

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-commerce Moda",
    "description": "Tienda online con pasarela de pagos",
    "icon": "🌐",
    "image_url": null,
    "project_url": "https://midominio.com",
    "is_active": false,
    "created_at": "2024-05-16T15:00:00.000Z"
  }
}
```

---

## 📌 Pedidos (Orders)

### 1. Crear un nuevo pedido (público)
- **Endpoint:** `/orders`
- **Método:** `POST`
- **Descripción:** Crea un nuevo pedido desde la landing page. No requiere autenticación. El estado por defecto es `en espera` y la etapa por defecto es `pendiente`.
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** No requiere
- **Cuerpo esperado de la petición (JSON):**
```json
{
  "identifier": "Empresa Ejemplo SRL",
  "contact": "empresa@mail.com",
  "description": "Quiero una pagina web corporativa con secciones de inicio, servicios, contacto y blog."
}
```

**Estructura de la respuesta (Éxito - 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "identifier": "Empresa Ejemplo SRL",
    "contact": "empresa@mail.com",
    "description": "Quiero una pagina web corporativa con secciones de inicio, servicios, contacto y blog.",
    "status": "en espera",
    "stage": "pendiente",
    "is_deleted": false,
    "created_at": "2026-05-19T12:00:00.000Z"
  }
}
```

**Estructura de la respuesta (Error de validación - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Datos de entrada inválidos",
  "errors": [
    {
      "path": "body.identifier",
      "message": "El identificador debe tener al menos 3 caracteres"
    }
  ]
}
```

### 2. Obtener todos los pedidos activos
- **Endpoint:** `/orders`
- **Método:** `GET`
- **Descripción:** Devuelve una lista de todos los pedidos no eliminados, ordenados por fecha de creación descendente.
- **Rate limit:** 100 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "identifier": "Empresa Ejemplo SRL",
      "contact": "empresa@mail.com",
      "description": "Quiero una pagina web corporativa",
      "status": "en espera",
      "stage": "pendiente",
      "is_deleted": false,
      "created_at": "2026-05-19T12:00:00.000Z"
    }
  ]
}
```

### 3. Obtener un pedido por ID
- **Endpoint:** `/orders/:id`
- **Método:** `GET`
- **Descripción:** Devuelve un pedido específico por su ID (solo si no está eliminado).
- **Rate limit:** 100 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "identifier": "Empresa Ejemplo SRL",
    "contact": "empresa@mail.com",
    "description": "Quiero una pagina web corporativa",
    "status": "en espera",
    "stage": "pendiente",
    "is_deleted": false,
    "created_at": "2026-05-19T12:00:00.000Z"
  }
}
```

**Estructura de la respuesta (No encontrado - 404 Not Found):**
```json
{
  "success": false,
  "message": "Pedido no encontrado"
}
```

### 4. Actualizar un pedido
- **Endpoint:** `/orders/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza los campos enviados de un pedido existente. Útil para cambiar el `status` (`en espera`, `aceptado`, `rechazado`) y la `stage` (`pendiente`, `en desarrollo`, `en produccion`).
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)
- **Cuerpo esperado de la petición (JSON) — todos los campos son opcionales:**
```json
{
  "status": "aceptado",
  "stage": "en desarrollo",
  "identifier": "Empresa Ejemplo SRL",
  "contact": "nuevo@mail.com",
  "description": "Nueva descripcion del proyecto"
}
```

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "identifier": "Empresa Ejemplo SRL",
    "contact": "nuevo@mail.com",
    "description": "Nueva descripcion del proyecto",
    "status": "aceptado",
    "stage": "en desarrollo",
    "is_deleted": false,
    "created_at": "2026-05-19T12:00:00.000Z"
  }
}
```

### 5. Eliminar un pedido (soft delete)
- **Endpoint:** `/orders/:id`
- **Método:** `DELETE`
- **Descripción:** Marca el pedido como eliminado (`is_deleted = true`). El pedido deja de aparecer en los listados.
- **Rate limit:** 30 requests cada 15 minutos.
- **Auth:** Requiere token JWT (cookie o `Authorization: Bearer`)
- **Cuerpo:** No requiere

**Estructura de la respuesta (Éxito - 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "identifier": "Empresa Ejemplo SRL",
    "contact": "empresa@mail.com",
    "description": "Quiero una pagina web corporativa",
    "status": "en espera",
    "stage": "pendiente",
    "is_deleted": true,
    "created_at": "2026-05-19T12:00:00.000Z"
  }
}
```

---

## 🛑 Errores Globales

### Error de validación (Zod) — 400 Bad Request
```json
{
  "success": false,
  "message": "Datos de entrada inválidos",
  "errors": [
    {
      "path": "body.title",
      "message": "El título es obligatorio"
    }
  ]
}
```

### No autorizado — 401 Unauthorized
```json
{
  "error": "Unauthorized: Missing token"
}
```

### Rate limit excedido — 429 Too Many Requests
```json
{
  "success": false,
  "message": "Has excedido el límite de solicitudes. Intenta de nuevo más tarde."
}
```

### Error interno del servidor — 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error interno del servidor"
}
```

---

## 🛡️ Rate Limiting

La API implementa rate limiting por IP para prevenir abusos:

| Limiter | Límite | Ventana | Endpoints |
|---------|--------|---------|-----------|
| `authLimiter` | 5 requests | 15 min | `POST /admin/auth/login` |
| `writeLimiter` | 30 requests | 15 min | `POST/PUT/PATCH/DELETE` en portfolio, reviews y orders |
| `generalLimiter` | 100 requests | 15 min | `GET` en portfolio, reviews y orders |

Las cabeceras `RateLimit-Remaining`, `RateLimit-Reset` y `RateLimit-Limit` se incluyen en cada respuesta.

---

## 🔐 Autenticación

Los endpoints de escritura (`POST`, `PUT`, `PATCH`) en portfolio requieren autenticación JWT. El token se obtiene mediante `POST /admin/auth/login` y se envía de dos formas:

1. **Cookie** (automática): `token=<jwt>` con flags `HttpOnly`, `Secure`, `SameSite=Strict`
2. **Header**: `Authorization: Bearer <jwt>`

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