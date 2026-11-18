// zonas.js - Registro de zonas de ONFI
//
// Para ABRIR una zona nueva (por ejemplo la Zona 3):
//   1) Creá  data/zona-3.js          (misma estructura que data/zona-8.js, con "const ZONA_3_DB = { ... }")
//   2) Creá  data/zona-3-escudos.js  (copiá zona-8-escudos.js y cambiá los escudos)
//   3) Cambiá abajo la zona 3 a:  estado: "activa", con "datos", "escudos", "variable" y "ligas"
//      (cada liga como { id, nombre }: el id es el mismo que tiene en data/zona-3.js; la portada arma un link directo a cada una).
// Las zonas con estado "proximamente" aparecen en la portada pero todavía no se pueden abrir.
window.ZONAS = [
  { 
    id: 1,
    nombre: "Zona 1",
    estado: "proximamente",
    // { id, nombre } = liga que ya está en data/zona-1.js (la portada le arma un link directo).
    // Un texto suelto = liga todavía sin cargar en los datos (abre la zona sin elegir liga).
    ligas: [
      { id: "minuana", nombre: "Liga Minuana" },
      { id: "Chuy", nombre: "Liga Chuy" },
      "Liga Dionisio Díaz",
      { id: "fernandina", nombre: "Liga Fernandina" },
      "Liga Rochense",
      "Liga Maldonadense",
      "Liga J. P. Varela",
      "Liga Zona Oeste"
    ],
    datos: "data/fixture_y_resultados/2026/zona-1.js",
    escudos: "data/zona-1-escudos.js",
    variable: "ZONA_1_DB"
  },
  { id: 2, nombre: "Zona 2", 
    estado: "proximamente",
    ligas: [
      { id: "Liga Ansina", nombre: "Liga Ansina" },
      { id: "Liga Melense", nombre: "Liga Melense" },
      { id: "Liga Río Branco", nombre: "Liga Río Branco" },
      { id: "Liga Riverense", nombre: "Liga Riverense " },
      { id: "Liga Tacuarembó", nombre: "Liga Tacuarembó" },
      { id: "Liga San Gregorio de Polanco", nombre: "Liga San Gregorio de Polanco" },
      { id: "Liga Vichadero", nombre: "Liga Vichadero" },
      { id: "Liga Tranqueras", nombre: "Liga Tranqueras" },
     
    ],
    datos: "data/fixture_y_resultados/2026/zona-7.js",
    escudos: "data/zona-7-escudos.js",
    variable: "ZONA_7_DB"
  },
  { id: 3, nombre: "Zona 3", estado: "proximamente" },
  { id: 4, nombre: "Zona 4", estado: "proximamente" },
  { id: 5, nombre: "Zona 5", estado: "proximamente" },
  { id: 6, nombre: "Zona 6", estado: "proximamente" },
  { id: 7, 
    nombre: "Zona 7", 
    estado: "proximamente",
    ligas: [
      { id: "Barros Blancos", nombre: "Liga Barros Blancos" },
      {id: "Liga Costa de Oro", nombre: "Liga Costa de Oro" },
      {id: "Liga Fundadora", nombre: "Liga Fundadora"},
      {id: "Liga Interbalnearia", nombre: "Liga Interbalnearia"},
      {id: "Liga Regional del Sur", nombre: "Liga Regional del Sur"},
      {id: "Liga Noreste", nombre:"Liga Noreste"},
      {id: "Liga Regional Pando", nombre:"Liga Regional Pando"},
    ],
    datos: "data/fixture_y_resultados/2026/zona-7.js",
    escudos: "data/zona-7-escudos.js",
    variable: "ZONA_7_DB"
  },
  {
    id: 8,
    nombre: "Zona 8",
    estado: "activa",
    ligas: [
      { id: "palermo", nombre: "Liga Palermo" },
      { id: "prado", nombre: "Liga Prado" },
      { id: "paso-molino", nombre: "Liga Paso Molino" },
      { id: "piedras-blancas", nombre: "Liga Piedras Blancas" },
      { id: "uruguaya", nombre: "Liga Uruguaya" }
    ],
    datos: "data/fixture_y_resultados/2026/zona-8.js",
    escudos: "data/zona-8-escudos.js",
    variable: "ZONA_8_DB"
  }
];
