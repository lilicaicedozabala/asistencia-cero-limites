const { kv } = require("@vercel/kv");

module.exports = async (req, res) => {
  const activa = (await kv.get("activa")) || null;
  res.status(200).json({ activa });
};
