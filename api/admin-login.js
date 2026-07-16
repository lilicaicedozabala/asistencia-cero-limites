module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const clave = process.env.ASISTENCIA_CLAVE || "piloto";
  const ok = (req.body && req.body.password) === clave;
  res.status(ok ? 200 : 401).json({ ok });
};
