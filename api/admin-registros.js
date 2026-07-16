const { kv } = require("@vercel/kv");
const { adminOk } = require("./lib/sesiones");

module.exports = async (req, res) => {
  if (!adminOk(req)) return res.status(401).json({ error: "no" });

  const activa = (await kv.get("activa")) || null;
  const sesionesConDatos = (await kv.smembers("sesiones-con-registros")) || [];

  let registros = [];
  for (const s of sesionesConDatos) {
    const items = (await kv.lrange(`lista:${s}`, 0, -1)) || [];
    registros = registros.concat(items.map(i => (typeof i === "string" ? JSON.parse(i) : i)));
  }
  registros.sort((a, b) => a.hora.localeCompare(b.hora));

  res.status(200).json({ activa, registros });
};
