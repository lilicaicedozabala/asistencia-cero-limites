const { kv } = require("@vercel/kv");
const CORREOS = require("./correos-nombres.json");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const activa = await kv.get("activa");
  if (!activa) {
    return res.status(403).json({ ok: false,
      mensaje: "No hay ninguna sesión activa en este momento." });
  }

  const correo = String((req.body && req.body.correo) || "").trim().toLowerCase();
  const nombre = CORREOS[correo];
  if (!nombre) {
    return res.status(403).json({ ok: false,
      mensaje: "Ese correo no está en la lista de participantes. " +
               "Verifica que sea tu correo institucional (@ccc.org.co)." });
  }

  const clave = `reg:${activa}:${correo}`;
  const yaExiste = await kv.get(clave);
  if (yaExiste) {
    return res.status(200).json({ ok: true, ya: true,
      mensaje: `Ya estabas registrado, ${nombre.split(" ")[0]}.` });
  }

  const hora = new Date().toISOString().replace("T", " ").slice(0, 19);
  const registro = { sesion: activa, correo, nombre, hora };

  // Guardamos por clave única (evita duplicados) y en una lista de la sesión (para leer todo junto).
  await kv.set(clave, registro);
  await kv.rpush(`lista:${activa}`, JSON.stringify(registro));
  await kv.sadd("sesiones-con-registros", activa);

  res.status(200).json({ ok: true,
    mensaje: `¡Listo, ${nombre.split(" ")[0]}! Asistencia registrada.` });
};
