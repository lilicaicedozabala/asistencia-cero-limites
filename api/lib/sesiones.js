// Las 10 sesiones · fuente: Plan de Ejecución Sugar · CCC
module.exports.SESIONES = [
  { id: "live-15jul",   nombre: "Live de soporte técnico",  fecha: "Mié 15 jul" },
  { id: "despertar",    nombre: "El Despertar",              fecha: "21–30 jul" },
  { id: "sinlimites-c1",nombre: "Sin Límites · Cohorte 1",   fecha: "Lun 3 ago" },
  { id: "sinlimites-c2",nombre: "Sin Límites · Cohorte 2",   fecha: "Jue 6 ago" },
  { id: "sinlimites-c3",nombre: "Sin Límites · Cohorte 3",   fecha: "Lun 10 ago" },
  { id: "sinlimites-c4",nombre: "Sin Límites · Cohorte 4",   fecha: "Jue 13 ago" },
  { id: "legado-c1",    nombre: "El Legado · Cohorte 1",     fecha: "Jue 20 ago" },
  { id: "legado-c2",    nombre: "El Legado · Cohorte 2",     fecha: "Vie 21 ago" },
  { id: "legado-c3",    nombre: "El Legado · Cohorte 3",     fecha: "Lun 24 ago" },
  { id: "legado-c4",    nombre: "El Legado · Cohorte 4",     fecha: "Mar 25 ago" },
];

module.exports.adminOk = (req) => {
  const clave = process.env.ASISTENCIA_CLAVE || "piloto";
  const auth = req.headers.authorization || "";
  return auth === `Bearer ${clave}`;
};
