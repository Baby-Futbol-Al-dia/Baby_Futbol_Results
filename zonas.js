// zonas.js - Registro de zonas de ONFI
//
// Para ABRIR una zona nueva (por ejemplo la Zona 3):
//   1) Creá  data/zona-3.js          (misma estructura que data/zona-8.js, con "const ZONA_3_DB = { ... }")
//   2) Creá  data/zona-3-escudos.js  (copiá zona-8-escudos.js y cambiá los escudos)
//   3) Cambiá abajo la zona 3 a:  estado: "activa", con "datos", "escudos", "variable" y "ligas"
//      (cada liga como { id, nombre }: el id es el mismo que tiene en data/zona-3.js; la portada arma un link directo a cada una).
// Las zonas con estado "proximamente" aparecen en la portada pero todavía no se pueden abrir.

window.TEMPORADA_ACTUAL = 2026;

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
      { id: "Liga Dionisio Díaz", nombre: "Liga Dionisio Díaz" },
      { id: "Fernandina", nombre: "Liga Fernandina" },
      { id: "Liga Rochense", nombre: "Liga Rochense" },
      { id: "Liga Maldonadense", nombre: "Liga Maldonadense" },
      { id: "Liga J. P. Varela", nombre: "Liga J. P. Varela" },
      { id: "Liga Zona Oeste", nombre: "Liga Zona Oeste" },
    ],
    temporadas: [2026,2025],
    datos: "data/fixture_y_resultados/{temporada}/zona-1.js",
    escudos: "data/zona-1-escudos.js",
    variable: "ZONA_1_DB",
  },
  {
    id: 2,
    nombre: "Zona 2",
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
    temporadas: [2026], // años que tiene cargados esta zona (el más nuevo primero)
    datos: "data/fixture_y_resultados/{temporada}/zona-2.js",
    escudos: "data/zona-2-escudos.js",
    variable: "ZONA_2_DB",
  },
  {
    id: 3,
    nombre: "Zona 3",
    estado: "proximamente",
    ligas: [
      { id: "Liga Artigas", nombre: "Liga Artigas" },
      { id: "Liga Baltazar Brum", nombre: "Liga Baltazar Brum" },
      { id: "Liga Belén", nombre: "Liga Belén" },
      { id: "Liga Bella Unión", nombre: "Liga Bella Unión" },
      { id: "Liga Quebracho", nombre: "Liga Quebracho" },
      { id: "Liga Salteña", nombre: "Liga Salteña" },
      { id: "Liga Sanducera", nombre: "Liga Sanducera" },
      { id: "Liga T. Gomensoro", nombre: "Liga T. Gomensoro" },
      { id: "Liga Villa Constitución", nombre: "Liga Villa Constitución" },
    ],
    temporadas: [2026],
    datos: "data/fixture_y_resultados/{temporada}/zona-3.js",
    escudos: "data/zona-3-escudos.js",
    variable: "ZONA_3_DB",
  },
  {
    id: 4,
    nombre: "Zona 4",
    estado: "proximamente",
    ligas: [
      { id: "Liga Dolores", nombre: "Liga Dolores" },
      { id: "Liga Fray Bentos", nombre: "Liga Fray Bentos" },
      { id: "Liga Guichon", nombre: "Liga Guichon" },
      { id: "Liga José Enrique Rodó", nombre: "Liga José Enrique Rodó" },
      { id: "Liga Mercedes", nombre: "Liga Mercedes" },
      { id: "Liga Trinitaria", nombre: "Liga Trinitaria" },
      { id: "Liga Young", nombre: "Liga Young" },
    ],
    temporadas: [2026],
    datos: "data/fixture_y_resultados/{temporada}/zona-4.js",
    escudos: "data/zona-4-escudos.js",
    variable: "ZONA_4_DB",
  },
  {
    id: 5,
    nombre: "Zona 5",
    estado: "proximamente",
    ligas: [
      { id: "Liga Cerro Chato", nombre: "Liga Cerro Chato" },
      { id: "Liga Durazno", nombre: "Liga Durazno" },
      { id: "Liga Florida", nombre: "Liga Florida" },
      { id: "Liga Isabelina", nombre: "Liga Isabelina" },
      { id: "Liga Rincon C. del Plata", nombre: "Liga Rincon C. del Plata" },
      { id: "Liga San José", nombre: "Liga San José" },
      { id: "Liga Sarandi del YI", nombre: "Liga Sarandi del YI" },
      { id: "Liga Unión Tres Orillas", nombre: "Liga Unión Tres Orillas" },
    ],
    temporadas: [2026],
    datos: "data/fixture_y_resultados/{temporada}/zona-5.js",
    escudos: "data/zona-5-escudos.js",
    variable: "ZONA_5_DB",
  },
  {
    id: 6,
    nombre: "Zona 6",
    estado: "proximamente",
    ligas: [
      { id: "Liga Carmelitana", nombre: "Liga Carmelitana" },
      { id: "Liga Colonia Suiza", nombre: "Liga Colonia Suiza" },
      { id: "Liga Coloniense", nombre: "Liga Coloniense" },
      { id: "Liga Florencio Sanchez Cardona", nombre: "Liga Florencio Sanchez Cardona" },
      { id: "Liga Lacacina", nombre: "Liga Lacacina" },
      { id: "Liga Ombues de Lavalle", nombre: "Liga Ombues de Lavalle" },
      { id: "Liga Palmirense", nombre: "Liga Palmirense" },
      { id: "Liga Rosarina", nombre: "Liga Rosarina" },
      { id: "Liga Tarariras", nombre: "Liga Tarariras" },
    ],
    temporadas: [2026],
    datos: "data/fixture_y_resultados/{temporada}/zona-6.js",
    escudos: "data/zona-6-escudos.js",
    variable: "ZONA_6_DB",
  },
  {
    id: 7,
    nombre: "Zona 7",
    estado: "proximamente",
    ligas: [
      { id: "Barros Blancos", nombre: "Liga Barros Blancos" },
      { id: "Liga Costa de Oro", nombre: "Liga Costa de Oro" },
      { id: "Liga Fundadora", nombre: "Liga Fundadora" },
      { id: "Liga Interbalnearia", nombre: "Liga Interbalnearia" },
      { id: "Liga Regional del Sur", nombre: "Liga Regional del Sur" },
      { id: "Liga Noreste", nombre: "Liga Noreste" },
      { id: "Liga Regional Pando", nombre: "Liga Regional Pando" },
    ],
    temporadas: [2026],
    datos: "data/fixture_y_resultados/{temporada}/zona-7.js",
    escudos: "data/zona-7-escudos.js",
    variable: "ZONA_7_DB",
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
      { id: "uruguaya", nombre: "Liga Uruguaya" },
    ],
    temporadas: [2026, 2025, 2024, 2023], // años que tiene cargados esta zona (el más nuevo primero)
    datos: "data/fixture_y_resultados/{temporada}/zona-8.js",
    escudos: "data/zona-8-escudos.js",
    variable: "ZONA_8_DB",
  },
];
