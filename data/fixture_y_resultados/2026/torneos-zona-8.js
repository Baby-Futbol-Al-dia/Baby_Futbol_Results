// data/fixture_y_resultados/2026/torneos-zona-8.js
// Torneos de la Zona 8 que agrupan clubes de varias ligas (se leen aparte de zona-8.js).
// Un torneo aparece en el selector cuando tiene al menos una serie.

const TORNEOS_ZONA_8 = {
  torneos_fifi: [
    // ================= COPA DE CAMPEONES (por categorías) =================
    {
      id: "copa-campeones",
      nombre: "Copa de Campeones",
      puntosPG: 2,
      ultimaActualizacion: "",
      // Cada categoría tiene sus propios clubes y grupos: cada serie pertenece a UNA categoría
      // (campo "categoria") y trae directamente sus "fechas". No lleva "categorias".
      // Para sumar otra categoría (ej. 2019) se agregan sus series acá con id "2019-serie-1", etc.
      porCategoria: true,
      series: [
        // ---- 2020 · FASE DE GRUPOS ----
        {
          id: "2020-serie-1",
          nombre: "Serie 1",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Aviación Lezica",
            "Pablan",
            "Independiente Lezica",
            "3 de Abril",
            "Santa Catalina",
          ],
          categoria: "2020",
          fechas: [
                  
                {
                  num: 1,
                  partidos: [
                    {
                      local: "Santa Catalina",
                      visitante: "Pablan",
                      gl: 2,
                      gv: 0,
                    },
                    {
                      local: "3 de Abril",
                      visitante: "Independiente Lezica",
                      gl: 0,
                      gv: 3,
                    },

                  ]
                },
                {
                  num: 2,
                  partidos: [
                    {
                      local: "Aviación Lezica",
                      visitante: "Independiente Lezica",
                      gl: null,
                      gv: null,
                    },
                    {
                      local: "Santa Catalina",
                      visitante: "3 de Abril",
                      gl: null,
                      gv: null,
                    },

                  ]
                },
                {
                  num: 3,
                  partidos: [
                    {
                      local: "Pablan",
                      visitante: "3 de Abril",
                      gl: null,
                      gv: null,
                    },
                    {
                      local: "Aviación Lezica",
                      visitante: "Santa Catalina",
                      gl: null,
                      gv: null,
                    },

                  ]
                },
                {
                  num: 4,
                  partidos: [
                    {
                      local: "Independiente Lezica",
                      visitante: "Santa Catalina",
                      gl: 5,
                      gv: 0,
                    },
                    {
                      local: "Pablan",
                      visitante: "Aviación Lezica",
                      gl: 3,
                      gv: 2,
                    },

                  ]
                },
                {
                  num: 5,
                  partidos: [
                    {
                      local: "3 de Abril",
                      visitante: "Aviación Lezica",
                      gl: null,
                      gv: null,
                    },
                    {
                      local: "Independiente Lezica",
                      visitante: "Pablan",
                      gl: null,
                      gv: null,
                    },

                  ]
                },
          ]
        },
        {
          id: "2020-serie-2",
          nombre: "Serie 2",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Urreta",
            "Euskal Erria",
            "Enrique López",
            "Terremoto",
            "Maeso",
          ],
          categoria: "2020",
          fechas: [
                  
                {
                  num: 1,
                  partidos: [
                    {
                      local: "Santa Catalina",
                      visitante: "Pablan",
                      gl: 2,
                      gv: 0,
                    },
                    {
                      local: "3 de Abril",
                      visitante: "Independiente Lezica",
                      gl: 0,
                      gv: 3,
                    },

                  ]
                },
                {
                  num: 2,
                  partidos: [
                    {
                      local: "Aviación Lezica",
                      visitante: "Independiente Lezica",
                      gl: null,
                      gv: null,
                    },
                    {
                      local: "Santa Catalina",
                      visitante: "3 de Abril",
                      gl: null,
                      gv: null,
                    },

                  ]
                },
                {
                  num: 3,
                  partidos: [
                    {
                      local: "Pablan",
                      visitante: "3 de Abril",
                      gl: null,
                      gv: null,
                    },
                    {
                      local: "Aviación Lezica",
                      visitante: "Santa Catalina",
                      gl: null,
                      gv: null,
                    },

                  ]
                },
                {
                  num: 4,
                  partidos: [
                    {
                      local: "Independiente Lezica",
                      visitante: "Santa Catalina",
                      gl: 5,
                      gv: 0,
                    },
                    {
                      local: "Pablan",
                      visitante: "Aviación Lezica",
                      gl: 3,
                      gv: 2,
                    },

                  ]
                },
                {
                  num: 5,
                  partidos: [
                    {
                      local: "3 de Abril",
                      visitante: "Aviación Lezica",
                      gl: null,
                      gv: null,
                    },
                    {
                      local: "Independiente Lezica",
                      visitante: "Pablan",
                      gl: null,
                      gv: null,
                    },

                  ]
                },
          ]
        },
        {
          id: "2020-serie-3",
          nombre: "Serie 3",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Ciclón del Cerrito",
            "Cosmos Corinto",
            "Carabelas",
            "Dep. Oriental",
            "Nuevo Juventud",
          ],
          categoria: "2020",
          fechas: [
            // Pendiente: cargar el fixture de cada fecha, por ejemplo
            // sede = club en cuya cancha se juega toda la fecha ("local" es solo el orden de los partidos).
            // { num: 1, sede: "Club A", partidos: [ { local: "Club A", visitante: "Club B", gl: null, gv: null } ] },
          ],
        },
        {
          id: "2020-serie-4",
          nombre: "Serie 4",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Celtic Jrs.",
            "La Tentación",
            "Toledo Chico",
            "Juana de América",
            "Ombú Jrs.",
          ],
          categoria: "2020",
          fechas: [
            // Pendiente: cargar el fixture de cada fecha, por ejemplo
            // sede = club en cuya cancha se juega toda la fecha ("local" es solo el orden de los partidos).
            // { num: 1, sede: "Club A", partidos: [ { local: "Club A", visitante: "Club B", gl: null, gv: null } ] },
          ],
        },
        {
          id: "2020-serie-5",
          nombre: "Serie 5",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Estrella del Norte",
            "Covicenova",
            "Zorzal",
            "Holanda",
            "Los Magos",
          ],
          categoria: "2020",
          fechas: [
            // Pendiente: cargar el fixture de cada fecha, por ejemplo
            // sede = club en cuya cancha se juega toda la fecha ("local" es solo el orden de los partidos).
            // { num: 1, sede: "Club A", partidos: [ { local: "Club A", visitante: "Club B", gl: null, gv: null } ] },
          ],
        },
        {
          id: "2020-serie-6",
          nombre: "Serie 6",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Est. del Sur",
            "Mirador",
            "La Escalinata",
            "Alas Rojas",
            "Don Bosco",
            "Exploradores",
          ],
          categoria: "2020",
          fechas: [
            // Pendiente: cargar el fixture de cada fecha, por ejemplo
            // sede = club en cuya cancha se juega toda la fecha ("local" es solo el orden de los partidos).
            // { num: 1, sede: "Club A", partidos: [ { local: "Club A", visitante: "Club B", gl: null, gv: null } ] },
          ],
        },
        {
          id: "2020-serie-7",
          nombre: "Serie 7",
          torneoUnico: true, // grupo único: sin Apertura/Clausura
          clubes: [
            "Siete Estrellas",
            "La Lata",
            "La Rinconada",
            "La Picada",
            "Dryco",
          ],
          categoria: "2020",
          fechas: [
            // Pendiente: cargar el fixture de cada fecha, por ejemplo
            // sede = club en cuya cancha se juega toda la fecha ("local" es solo el orden de los partidos).
            // { num: 1, sede: "Club A", partidos: [ { local: "Club A", visitante: "Club B", gl: null, gv: null } ] },
          ],
        },
        
        // ---- 2020 · FASE FINAL: Copa Oro y Copa Plata (llaves) ----
        // Pendiente: se agregan cuando esté definido el formato.
      ],
    },

    // ================= METROPOLITANO =================
    { id: "metropolitano", nombre: "Metropolitano", series: [] },
  ],
};
