const { kv } = require("@vercel/kv");
const { adminOk } = require("./lib/sesiones");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "?" });
  if (!adminOk(req)) return res.status(401).json({ error: "no" });

  const sesion = (req.body && req.body.sesion) || null;
  if (sesion) await kv.set("activa", sesion);
  else await kv.del("activa");

  res.status(200).json({ activa: sesion });
};
