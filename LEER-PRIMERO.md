# Asistencia Cero Límites · versión Vercel + KV

Adaptada para desplegar directo en Vercel. Misma app que el piloto de Python, pero
guarda los registros en **Vercel KV** en vez de un archivo local (Vercel no tiene
disco persistente entre peticiones).

## Desplegar (una vez)

1. Sube esta carpeta a un repo de GitHub (o usa `vercel` CLI directo desde aquí).
2. En vercel.com → **Add New Project** → importa el repo.
3. Antes de desplegar, en el proyecto: **Storage → Create Database → KV**.
   Vercel conecta las variables solas — no hay que copiar ninguna llave a mano.
4. En **Settings → Environment Variables**, agrega:
   - `ASISTENCIA_CLAVE` = (la clave que quieras para el panel — cámbiala del "piloto" de prueba)
5. **Deploy.**

## URLs resultantes

- **Registro (el QR apunta aquí):** `https://tu-proyecto.vercel.app/`
- **Panel:** `https://tu-proyecto.vercel.app/panel`

Si conectas un dominio propio (Settings → Domains), puede quedar como
`asistencia.sugarvalley.co`.

## Cómo se usa

Igual que el piloto: activas la sesión en el panel, proyectas el QR (la URL de arriba,
convertida a código QR), la gente escribe su correo, se valida contra la lista de los 50,
y queda registrada con hora. El panel se refresca solo cada 5 s y tiene botón de descarga CSV.

## Qué cambia vs. el piloto de Python

| | Piloto (Python) | Esta versión (Vercel) |
|---|---|---|
| Dónde corre | Tu máquina | Internet, siempre disponible |
| Dónde guarda | `asistencia.json` (disco local) | Vercel KV (base de datos) |
| Estructura | 1 backend + 2 HTML | Funciones en `/api` + 2 HTML en `/public` |
| Lógica | Idéntica | Idéntica (validación de correo, anti-duplicados, sesión activa) |

## Los 50 correos

`api/correos-nombres.json` — correo → nombre, fuente: listado de Ángela (CCC).
Si corrige el duplicado (lcaicedo@ccc.org.co), editar este archivo y volver a desplegar
(Vercel redespliega solo al hacer push si está conectado a GitHub).

## Las 10 sesiones

Definidas en `api/lib/sesiones.js` (fuente de verdad para el backend) y repetidas en
`public/panel.html` (para pintar las tarjetas). Si cambian fechas, editar en los dos lugares.

## Antes de la sesión real

Prueba primero en la URL de Vercel: activa una sesión, regístrate con un correo de prueba
de la lista, confirma que aparece en el panel. Así no descubres un problema en vivo.
