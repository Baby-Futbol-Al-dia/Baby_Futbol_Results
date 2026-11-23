// app.js - Lógica para conectar la interfaz y calcular tablas dinámicas

// Los escudos de cada zona vienen de su archivo (data/zona-N-escudos.js -> window.ZONA_EXTRAS).
const ESCUDOS_CLUBES = (window.ZONA_EXTRAS && window.ZONA_EXTRAS.escudosClubes) || {};

// Función auxiliar para obtener el logo o una imagen por defecto
function obtenerEscudo(nombreClub) {
  return ESCUDOS_CLUBES[nombreClub] || "escudos/default.png";
}


const CATEGORIAS_STANDARD = [
  { id: "2020", nombre: "2020" },
  { id: "2019", nombre: "2019" },
  { id: "2018", nombre: "2018" },
  { id: "2017", nombre: "2017" },
  { id: "2016", nombre: "2016" },
  { id: "2015", nombre: "2015" },
  { id: "2014", nombre: "2014" },
  { id: "2013", nombre: "2013" },
];

// Lo que pide la URL (?liga=palermo&serie=...&categoria=...&torneo=...). Se usa una sola vez al cargar.
let PREFERENCIA_URL = {};

function elegirSiExiste(select, valor) {
  if (!select || !valor) return false;
  const existe = Array.from(select.options).some((o) => o.value === valor);
  if (existe) select.value = valor;
  return existe;
}

function inicializarApp() {
  const selectLiga = document.getElementById("select-liga");
  if (!selectLiga) return;

  // Títulos y escudos de ligas según la zona cargada
  document.title = "Baby Fútbol ONFI - " + ZONA_DB.zona;
  const subtitulo = document.getElementById("subtitulo-zona");
  if (subtitulo) subtitulo.textContent = "Ligas " + ZONA_DB.zona + " - ONFI";
  const contEscudosLigas = document.getElementById("escudos-ligas");
  if (contEscudosLigas && window.ZONA_EXTRAS && window.ZONA_EXTRAS.escudosLigas) {
    // Cada escudo puede ser un texto (ruta de la imagen) o { src, liga } con el id de la liga.
    // Si es solo texto, se asocia por orden con las ligas de esta zona en zonas.js.
    const idZona = parseInt(new URLSearchParams(location.search).get("zona"), 10);
    const zonaReg = (window.ZONAS || []).find((z) => z.id === idZona);
    const ligasReg = zonaReg && zonaReg.ligas ? zonaReg.ligas : [];

    contEscudosLigas.innerHTML = window.ZONA_EXTRAS.escudosLigas
      .map((item, i) => {
        const src = typeof item === "string" ? item : item.src;
        const reg = ligasReg[i];
        const idLiga = typeof item === "string" ? (reg && reg.id) : item.liga;
        const ligaDB = ZONA_DB.ligas.find((l) => l.id === idLiga);
        // Si la liga todavía no está cargada en los datos (ej. otra temporada), el escudo queda sin link
        if (!ligaDB) return `<img src="${src}" alt="">`;
        return `<img src="${src}" alt="${ligaDB.nombre}" title="${ligaDB.nombre}" data-liga="${ligaDB.id}" style="cursor:pointer">`;
      })
      .join("");

    // Tocar un escudo = elegir esa liga en el selector
    contEscudosLigas.addEventListener("click", (e) => {
      const img = e.target.closest ? e.target.closest("img[data-liga]") : null;
      if (!img) return;
      const sel = document.getElementById("select-liga");
      if (sel && elegirSiExiste(sel, img.getAttribute("data-liga"))) {
        cambiarLiga();
      }
    });
  }

  selectLiga.innerHTML = "";

  ZONA_DB.ligas.forEach((liga) => {
    const option = document.createElement("option");
    option.value = liga.id;
    option.textContent = liga.nombre;
    selectLiga.appendChild(option);
  });

  // Escuchar cambios en el selector de torneo (si existe en la vista)
  const selectTorneo = document.getElementById("select-torneo");
  if (selectTorneo) {
    selectTorneo.addEventListener("change", actualizarVista);
  }

  // Leer qué liga/serie/categoría/torneo pide la URL
  const params = new URLSearchParams(location.search);
  PREFERENCIA_URL = {
    serie: params.get("serie"),
    categoria: params.get("categoria"),
  };
  if (!elegirSiExiste(selectLiga, params.get("liga"))) {
    // liga inexistente: no aplicar serie ni categoría de otra liga
    PREFERENCIA_URL = {};
  }
  elegirSiExiste(selectTorneo, params.get("torneo"));

  cambiarLiga();
  PREFERENCIA_URL = {}; // a partir de acá manda lo que elija la persona
}

function cambiarLiga() {
  const idLiga = document.getElementById("select-liga").value;
  const ligaSeleccionada = ZONA_DB.ligas.find((l) => l.id === idLiga);
  const selectSerie = document.getElementById("select-serie");

  selectSerie.innerHTML = "";

  if (ligaSeleccionada && ligaSeleccionada.series) {
    ligaSeleccionada.series.forEach((serie) => {
      const option = document.createElement("option");
      option.value = serie.id;
      option.textContent = serie.nombre;
      selectSerie.appendChild(option);
    });
  }

  elegirSiExiste(selectSerie, PREFERENCIA_URL.serie);
  cambiarSerie();
}

function cambiarSerie() {
  const idLiga = document.getElementById("select-liga").value;
  const idSerie = document.getElementById("select-serie").value;
  const selectCat = document.getElementById("select-categoria");

  selectCat.innerHTML = "";

  // 1. Opción "Tabla General" al inicio del selector
  const optionGeneral = document.createElement("option");
  optionGeneral.value = "general";
  optionGeneral.textContent = "Tabla General (Acumulado)";
  selectCat.appendChild(optionGeneral);

  const liga = ZONA_DB.ligas.find((l) => l.id === idLiga);
  const serie = liga ? liga.series.find((s) => s.id === idSerie) : null;

  // 2. Opciones de categorías individuales
  if (serie && serie.categorias && serie.categorias.length > 0) {
    serie.categorias.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = `Categoría ${cat.id}`;
      selectCat.appendChild(option);
    });
  } else {
    CATEGORIAS_STANDARD.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = `Categoría ${cat.nombre}`;
      selectCat.appendChild(option);
    });
  }

  elegirSiExiste(selectCat, PREFERENCIA_URL.categoria);
  actualizarVista();
}

/**
 * Devuelve el número de fechas que abarca el Apertura según la cantidad de clubes
 */
function obtenerLimiteApertura(serie) {
  if (!serie || !serie.clubes) return 0;
  const n = serie.clubes.length;
  return n % 2 === 0 ? n - 1 : n;
}

/**
 * true si la serie es un torneo único (sin Apertura/Clausura): en los datos, serie.torneoUnico = true
 */
function esTorneoUnico(serie) {
  return !!(serie && serie.torneoUnico);
}

/**
 * Devuelve el nombre legible del torneo
 */
function obtenerNombreTorneo(torneoKey) {
  switch (torneoKey) {
    case "apertura":
      return "Apertura";
    case "clausura":
      return "Clausura";
    default:
      return "Tabla Anual";
  }
}

/**
 * Calcula la tabla de posiciones combinando categoría ('general' o id específico)
 * y fase del torneo ('apertura', 'clausura' o 'anual')
 */
/**
 * Calcula la tabla de posiciones combinando categoría ('general' o id específico)
 * y fase del torneo ('apertura', 'clausura' o 'anual')
 */
function calcularTabla(serie, idCat, puntosPG = 2, torneo = "anual") {
  if (!serie || !serie.clubes) return [];

  // Estructura inicial de acumulados por club
  const tabla = {};
  serie.clubes.forEach((club) => {
    tabla[club] = {
      nombre: club,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      dg: 0,
      pts: 0,
    };
  });

  if (!serie.categorias) return Object.values(tabla);

  const limiteApertura = obtenerLimiteApertura(serie);

  // Si idCat es "general", procesamos todas las categorías; de lo contrario, solo la seleccionada
  const categoriasAProcesar =
    idCat === "general"
      ? serie.categorias
      : serie.categorias.filter((c) => c.id === idCat);

  categoriasAProcesar.forEach((catData) => {
    if (!catData || !catData.fechas) return;

    // Filtrar fechas según la fase de torneo solicitada
    const fechasTorneo = catData.fechas.filter((fecha) => {
      if (torneo === "apertura") return fecha.num <= limiteApertura;
      if (torneo === "clausura") return fecha.num > limiteApertura;
      return true; // "anual"
    });

    // Sumar partidos jugados
    fechasTorneo.forEach((fecha) => {
      fecha.partidos.forEach((p) => {
        const local = tabla[p.local];
        const visitante = tabla[p.visitante];

        if (local && visitante && p.gl !== null && p.gv !== null) {
          local.pj++;
          visitante.pj++;

          local.gf += p.gl;
          local.gc += p.gv;
          visitante.gf += p.gv;
          visitante.gc += p.gl;

          if (p.gl > p.gv) {
            local.pg++;
            local.pts += puntosPG;
            visitante.pp++;
          } else if (p.gl < p.gv) {
            visitante.pg++;
            visitante.pts += puntosPG;
            local.pp++;
          } else {
            local.pe++;
            local.pts += 1;
            visitante.pe++;
            visitante.pts += 1;
          }

          local.dg = local.gf - local.gc;
          visitante.dg = visitante.gf - visitante.gc;
        }
      });
    });
  });

// APLICAR SANCIONES / QUITA DE PUNTOS SEGÚN EL TORNEO
categoriasAProcesar.forEach((catData) => {
    // 1. Definimos qué diccionarios de sanciones incluir según el torneo seleccionado
    let dictsASumar = [];

    if (torneo === "apertura" && catData.sancionesApertura) {
      dictsASumar.push(catData.sancionesApertura);
    } else if (torneo === "clausura" && catData.sancionesClausura) {
      dictsASumar.push(catData.sancionesClausura);
    } else if (torneo === "anual") {
      // Si es Anual, acumulamos tanto apertura como clausura si existen
      if (catData.sancionesApertura) dictsASumar.push(catData.sancionesApertura);
      if (catData.sancionesClausura) dictsASumar.push(catData.sancionesClausura);
    }

    // 2. Procesar cada diccionario de penalizaciones aplicable acumulando los valores
    dictsASumar.forEach((sancionesDict) => {
      Object.keys(sancionesDict).forEach((clubNombre) => {
        if (tabla[clubNombre]) {
          const penalizacion = Math.abs(sancionesDict[clubNombre]);
          
          // Descontamos los puntos de la tabla general de posiciones
          tabla[clubNombre].pts -= penalizacion;
          
          // Acumulamos todas las sanciones sumando los valores negativos
          tabla[clubNombre].ptsInf = (tabla[clubNombre].ptsInf || 0) + (-penalizacion);
        }
      });
    });
  });

  // Asegurar que los clubes sin sanción tengan 0 en esa propiedad
  Object.values(tabla).forEach((club) => {
    if (club.ptsInf === undefined) {
      club.ptsInf = 0;
    }
  });

  // 👇 ¡ESTO ES LO QUE FALTABA! Retornar la tabla convertida en array ordenable
// Convertir el objeto a un array y ordenarlo por Puntos, Diferencia de Goles y Goles a Favor
  return Object.values(tabla).sort((a, b) => {
    if (b.pts !== a.pts) {
      return b.pts - a.pts; // Mayor cantidad de puntos
    }
    if (b.dg !== a.dg) {
      return b.dg - a.dg; // Mayor diferencia de goles
    }
    return b.gf - a.gf; // Mayor cantidad de goles a favor
  });
}
/*
 * Obtiene las fechas disputadas para la vista de fixture (solo categorías individuales)
 */
function obtenerFechasDisputadas(serie, idCat, torneo = "anual") {
  if (!serie || !serie.categorias || idCat === "general") return [];

  const catData = serie.categorias.find((c) => c.id === idCat);
  if (!catData || !catData.fechas) return [];

  const limiteApertura = obtenerLimiteApertura(serie);

  return catData.fechas.filter((fecha) => {
    if (torneo === "apertura" && fecha.num > limiteApertura) return false;
    if (torneo === "clausura" && fecha.num <= limiteApertura) return false;

    return true;

    /*return fecha.partidos.some((p) => p.gl !== null && p.gv !== null);*/
  });
}

/**
 * Renderiza el fixture de partidos
 */

/**
 * Renderiza el fixture de partidos y muestra el total de goles de la fecha
 */
/*
function renderizarFechas(
  serie,
  idCat,
  contenedorId = "contenedor-fechas",
  torneo = "anual",
) {
  const contenedorFechas = document.getElementById(contenedorId);
  if (!contenedorFechas) return;

  contenedorFechas.innerHTML = "";

  // En Tabla General no mostramos el desglose de fixture
  if (idCat === "general") return;

  const fechasDisputadas = obtenerFechasDisputadas(serie, idCat, torneo);

  if (fechasDisputadas.length === 0) {
    contenedorFechas.innerHTML =
      "<p>No hay fechas disputadas en este torneo/categoría.</p>";
    return;
  }

  const limiteApertura = obtenerLimiteApertura(serie);

  fechasDisputadas.forEach((fecha) => {
    const cardFecha = document.createElement("div");
    cardFecha.className = "card-fecha";

    let numMostrar = fecha.num;
    if (torneo === "clausura" || fecha.num > limiteApertura) {
      if (torneo === "clausura") {
        numMostrar = fecha.num - limiteApertura;
      }
    }

    // NUEVO: Calcular la suma de goles de todos los partidos de esta fecha
    let totalGolesFecha = 0;
    let partidosHTML = "";
    
    fecha.partidos.forEach((p) => {
      const gl = p.gl !== null ? p.gl : "-";
      const gv = p.gv !== null ? p.gv : "-";
      
      // Sumamos si los goles son números válidos
      if (p.gl !== null && p.gv !== null) {
        totalGolesFecha += p.gl + p.gv;
      }

      partidosHTML += `
        <tr>
          <td class="equipo-local">${p.local}</td>
          <td class="resultado"><strong>${gl} - ${gv}</strong></td>
          <td class="equipo-visitante">${p.visitante}</td>
        </tr>
      `;
    });

    const labelTorneoFijo = torneo === "clausura" ? " (Clausura)" : "";
    
    // NUEVO: Texto integrado en el summary con el total de goles de la fecha
    const labelFecha = `Fecha ${numMostrar}${labelTorneoFijo} — ⚽ Goles de la fecha: ${totalGolesFecha} ▾`;

    cardFecha.innerHTML = `
      <details>
        <summary>${labelFecha}</summary>
        <table class="tabla-partidos">
          <tbody>
            ${partidosHTML}
          </tbody>
        </table>
      </details>
    `;

    contenedorFechas.appendChild(cardFecha);
  });
}
*/


/**
 * Suma los goles de todos los partidos de una fecha específica en todas las categorías
 */
function calcularGolesTotalesPorFecha(serie, numeroFecha, torneo = "anual") {
  let golesTotalesFecha = 0;
  
  if (!serie || !serie.categorias) return 0;

  // Recorremos todas las categorías de la serie (ej: Sub-8, Sub-9, etc.)
  Object.values(serie.categorias).forEach(catData => {
    if (!catData.fechas) return;

    // Buscamos la fecha correspondiente en esta categoría
    const fechaObj = catData.fechas.find(f => f.num === numeroFecha);
    if (!fechaObj || !fechaObj.partidos) return;

    // Sumamos los goles de cada partido de la categoría en esta fecha
    fechaObj.partidos.forEach(p => {
      if (p.gl !== null && p.gv !== null) {
        golesTotalesFecha += Number(p.gl) + Number(p.gv);
      }
    });
  });

  return golesTotalesFecha;
}

/**
 * Renderiza las fechas mostrando el total global de goles de esa fecha (todas las categorías)
 */
/*
function renderizarFechasGeneral(serie, contenedorId = "contenedor-fechas", torneo = "anual") {
  const contenedorFechas = document.getElementById(contenedorId);
  if (!contenedorFechas || !serie || !serie.categorias) return;

  contenedorFechas.innerHTML = "";

  // Tomamos las fechas de la primera categoría disponible como referencia de números de fecha
  const primeraCat = Object.values(serie.categorias)[0];
  if (!primeraCat || !primeraCat.fechas) return;

  primeraCat.fechas.forEach(fRef => {
    const numFecha = fRef.num;
    
    // Obtenemos el total global de goles para esta fecha sumando todas las categorías
    const totalGolesGlobal = calcularGolesTotalesPorFecha(serie, numFecha, torneo);

    const cardFecha = document.createElement("div");
    cardFecha.className = "card-fecha-global";

    const labelFecha = `Fecha ${numFecha} — ⚽ Goles Totales (Todas las categorías): ${totalGolesGlobal} ▾`;

    cardFecha.innerHTML = `
      <details>
        <summary><strong>${labelFecha}</strong></summary>
        <div class="detalle-fecha-info">
          <p>Esta fecha acumuló <strong>${totalGolesGlobal} goles</strong> sumando las diferentes categorías de la serie.</p>
        </div>
      </details>
    `;

    contenedorFechas.appendChild(cardFecha);
  });
}
*/
/**
 * Separa los partidos reales de los descansos ("libre") de una fecha.
 * Un club libre se detecta de 3 formas (en este orden):
 *  1) Campo explícito en la fecha:   { num: 3, libre: "Club", partidos: [...] }
 *  2) Formato viejo: un partido contra "Fecha Libre" (se muestra como descanso)
 *  3) Deducido: serie con cantidad IMPAR de clubes y fecha completa
 *     -> el único club que no aparece en los partidos es el que descansa.
 *     (Si la fecha está incompleta no se deduce nada, para no marcar a un club por error.)
 */
function obtenerPartidosYLibres(serie, fechaObj) {
  const partidos = (fechaObj && fechaObj.partidos) || [];
  const libres = [];
  const reales = [];
  const agregarLibre = (n) => { if (n && !libres.includes(n)) libres.push(n); };

  if (fechaObj && fechaObj.libre) [].concat(fechaObj.libre).forEach(agregarLibre);

  partidos.forEach((p) => {
    if (p.local === "Fecha Libre") agregarLibre(p.visitante);
    else if (p.visitante === "Fecha Libre") agregarLibre(p.local);
    else reales.push(p);
  });

  const n = serie && serie.clubes ? serie.clubes.length : 0;
  if (libres.length === 0 && n % 2 === 1 && reales.length === (n - 1) / 2) {
    const juegan = new Set();
    reales.forEach((p) => { juegan.add(p.local); juegan.add(p.visitante); });
    const faltan = serie.clubes.filter((c) => !juegan.has(c));
    if (faltan.length === 1) agregarLibre(faltan[0]);
  }

  return { reales, libres };
}

/**
 * Renderiza el fixture de partidos y calcula los goles según la categoría seleccionada (individual o general)
 */
function renderizarFechas(serie, idCat, contenedorId = "contenedor-fechas", torneo = "anual") {
  const contenedorFechas = document.getElementById(contenedorId);
  if (!contenedorFechas || !serie || !serie.categorias) return;

  contenedorFechas.innerHTML = "";

  // 1. Tomamos las fechas de referencia utilizando la primera categoría disponible en la serie
  const primeraCat = Object.values(serie.categorias)[0];
  if (!primeraCat || !primeraCat.fechas) return;

  const limiteApertura = obtenerLimiteApertura(serie);

  primeraCat.fechas.forEach((fRef) => {
    const numFecha = fRef.num;

    // Filtros de fase (Apertura / Clausura)
    if (torneo === "apertura" && numFecha > limiteApertura) return;
    if (torneo === "clausura" && numFecha <= limiteApertura) return;

    const cardFecha = document.createElement("div");
    cardFecha.className = "card-fecha";

    let numMostrar = numFecha;
    if (torneo === "clausura") {
      numMostrar = numFecha - limiteApertura;
    }
    const labelTorneoFijo = torneo === "clausura" ? " (Clausura)" : "";

    // 2. Si el usuario seleccionó "Tabla General (Acumulado)"
    if (idCat === "general") {
      let golesTotalesGlobal = 0;

      Object.values(serie.categorias).forEach((catData) => {
        if (!catData.fechas) return;
        const fechaCat = catData.fechas.find((f) => f.num === numFecha);
        if (fechaCat && fechaCat.partidos) {
          fechaCat.partidos.forEach((p) => {
            if (p.gl !== null && p.gv !== null) {
              golesTotalesGlobal += Number(p.gl) + Number(p.gv);
            }
          });
        }
      });

      cardFecha.innerHTML = `
        <details>
          <summary>Fecha ${numMostrar}${labelTorneoFijo} — ⚽ Goles Totales (Todas las categorías): ${golesTotalesGlobal} ▾</summary>
          <div class="detalle-general-info" style="padding: 10px; font-size: 0.9rem; color: #334155;">
            <p>Total de goles convertidos en la fecha ${numMostrar} sumando todas las categorías: <strong>${golesTotalesGlobal}</strong></p>
          </div>
        </details>
      `;
    } else {
      // 3. Si se seleccionó una Categoría Específica (desglose de partidos y goles de esa categoría)
      const catData = serie.categorias.find((c) => c.id === idCat);
      const fechaObj = catData?.fechas.find((f) => f.num === numFecha);

      if (!fechaObj || !fechaObj.partidos) return;

      let golesFechaCat = 0;
      let partidosHTML = "";

      const { reales, libres } = obtenerPartidosYLibres(serie, fechaObj);

      reales.forEach((p) => {
        const gl = p.gl !== null ? p.gl : "-";
        const gv = p.gv !== null ? p.gv : "-";
        if (p.gl !== null && p.gv !== null) {
          golesFechaCat += Number(p.gl) + Number(p.gv);
        }

        // Obtener rutas de los escudos
      const imgLocal = obtenerEscudo(p.local);
      const imgVisitante = obtenerEscudo(p.visitante);
        partidosHTML += `
          <tr>
            <td class="equipo-local">
              <span>${p.local}</span>
              <img src="${imgLocal}" alt="${p.local}" class="escudo-equipo" />
            </td>
            <td class="resultado"><strong>${gl} - ${gv}</strong></td>
            <td class="equipo-visitante">
              <img src="${imgVisitante}" alt="${p.visitante}" class="escudo-equipo" />
              <span>${p.visitante}</span>
            </td>
          </tr>
        `;
      });

      const labelFecha = `Fecha ${numMostrar}${labelTorneoFijo} — ⚽ Goles: ${golesFechaCat} ▾`;

      const libreHTML = libres.length
        ? `<div class="libre-fecha">💤 Libre: ${libres
            .map((c) => `<img src="${obtenerEscudo(c)}" alt="${c}" class="escudo-equipo" /> <strong>${c}</strong>`)
            .join(" · ")}</div>`
        : "";

      cardFecha.innerHTML = `
        <details>
          <summary>${labelFecha}</summary>
          <table class="tabla-partidos">
            <tbody>${partidosHTML}</tbody>
          </table>
          ${libreHTML}
        </details>
      `;
    }

    contenedorFechas.appendChild(cardFecha);
  });
}


/**
 * Renderiza los datos calculados dentro del <tbody>
 */
function renderizarTablaEnHTML(tbodyElement, datosTabla) {
  if (!tbodyElement) return;
  tbodyElement.innerHTML = "";

  datosTabla.forEach((equipo, index) => {
    const tr = document.createElement("tr");
    const imgEscudo = obtenerEscudo(equipo.nombre);
    
    tr.innerHTML = `
      <td><strong>${index + 1}</strong></td>
      <td class="equipo-nombre" style="display: flex; align-items: center; gap: 8px;">
        <img src="${imgEscudo}" alt="${equipo.nombre}" class="escudo-equipo" />
        <span>${equipo.nombre}</span>
      </td>
      <td><strong>${equipo.pts}</strong></td>
      <td>${equipo.pj}</td>
      <td>${equipo.pg}</td>
      <td>${equipo.pe}</td>
      <td>${equipo.pp}</td>
      <td>${equipo.gf}</td>
      <td>${equipo.gc}</td>
      <td>${equipo.dg > 0 ? "+" + equipo.dg : equipo.dg}</td>
      <td>${equipo.ptsInf}</td>
    `;
    tbodyElement.appendChild(tr);
  });
}
function actualizarVista() {
  const idLiga = document.getElementById("select-liga").value;
  const idSerie = document.getElementById("select-serie").value;
  const idCat = document.getElementById("select-categoria").value;

  const liga = ZONA_DB.ligas.find((l) => l.id === idLiga);
  if (!liga) return;

  const serie = liga.series.find((s) => s.id === idSerie);
  const listaUl = document.getElementById("lista-clubes");
  const tituloH2 = document.getElementById("titulo-liga");

  const selectTorneo = document.getElementById("select-torneo");

  // Series de torneo único (sin Apertura/Clausura): serie.torneoUnico = true en los datos.
  // Ahí se esconde el selector y se usa siempre el cálculo completo ("anual").
  const unico = esTorneoUnico(serie);
  if (selectTorneo) {
    const cajaTorneo = document.getElementById("barra-torneo") || selectTorneo;
    cajaTorneo.style.display = unico ? "none" : "";
  }
  const torneoActual = unico ? "anual" : selectTorneo ? selectTorneo.value : "anual";
  const nombreTorneo = obtenerNombreTorneo(torneoActual);
  const sufijoTorneo = unico ? "" : ` - ${nombreTorneo}`;

  // Titulo dinamico según la categoría y el torneo seleccionado
  if (tituloH2) {
    const etiquetaCategoria =
      idCat === "general"
        ? `Tabla General de Clubes${sufijoTorneo}`
        : `Cat ${idCat}${sufijoTorneo}`;

    tituloH2.textContent = `${liga.nombre} - ${serie ? serie.nombre : ""} (${etiquetaCategoria})`;
  }
// Lista de clubes
  if (listaUl) {
    listaUl.innerHTML = "";
    if (serie && serie.clubes) {
      serie.clubes.forEach((club) => {
        const li = document.createElement("li");
        const imgEscudo = obtenerEscudo(club);

        // Agregamos el escudo y el nombre dentro del <li>
        li.innerHTML = `
          <img src="${imgEscudo}" alt="${club}" class="escudo-lista" onerror="this.src='escudos/default.png';" />
          <span>${club}</span>
        `;
        
        // Estilo flexible para alinearlo bonito
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.gap = "8px";

        listaUl.appendChild(li);
      });
    }
  }

  // 1. Caso de un único selector de torneo (#select-torneo)
  const tbodyPos = document.getElementById("body-tabla-posiciones");
  if (tbodyPos) {
    const datosTabla = calcularTabla(serie, idCat, liga.puntosPG, torneoActual);
    renderizarTablaEnHTML(tbodyPos, datosTabla);
    // 👇 NUEVO: Mostrar la fecha de última actualización de la liga seleccionada
    const divFechaAct = document.getElementById("info-ultima-actualizacion");
    if (divFechaAct) {
      if (liga.ultimaActualizacion) {
        divFechaAct.innerHTML = `<small>📅 Última actualización: ${liga.ultimaActualizacion}</small>`;
      } else {
        divFechaAct.innerHTML = ""; // Si alguna liga no tiene fecha, queda vacío
      }
    }
    if (idCat !== "general") {
      renderizarFechas(serie, idCat, "contenedor-fechas", torneoActual);
    } else {
      const contenedorFechas = document.getElementById("contenedor-fechas");
      if (contenedorFechas) contenedorFechas.innerHTML = "";
    }
  }

  // 2. Caso de tablas separadas simultáneamente en el HTML
  const tbodyApertura = document.getElementById("body-tabla-apertura");
  if (tbodyApertura) {
    renderizarTablaEnHTML(
      tbodyApertura,
      calcularTabla(serie, idCat, liga.puntosPG, "apertura"),
    );
    if (idCat !== "general") {
      renderizarFechas(serie, idCat, "contenedor-fechas-apertura", "apertura");
    } else {
      const cont = document.getElementById("contenedor-fechas-apertura");
      if (cont) cont.innerHTML = "";
    }
  }

  const tbodyClausura = document.getElementById("body-tabla-clausura");
  if (tbodyClausura) {
    renderizarTablaEnHTML(
      tbodyClausura,
      calcularTabla(serie, idCat, liga.puntosPG, "clausura"),
    );
    if (idCat !== "general") {
      renderizarFechas(serie, idCat, "contenedor-fechas-clausura", "clausura");
    } else {
      const cont = document.getElementById("contenedor-fechas-clausura");
      if (cont) cont.innerHTML = "";
    }
  }

  const tbodyAnual = document.getElementById("body-tabla-anual");
  if (tbodyAnual) {
    renderizarTablaEnHTML(
      tbodyAnual,
      calcularTabla(serie, idCat, liga.puntosPG, "anual"),
    );
  }
}

// La página de zona carga app.js DESPUÉS de los datos, así que puede que el DOM ya esté listo.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarApp);
} else {
  inicializarApp();
}
