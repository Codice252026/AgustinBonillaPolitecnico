// ========== MENÚ HAMBURGUESA ==========
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== CERRAR MENÚ AL HACER CLIC EN UN ENLACE ==========
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// ========== ACTIVE NAV HIGHLIGHT ==========
const navItems = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
        item.classList.add('active-nav');
    } else {
        item.classList.remove('active-nav');
    }
});

// ========== ANIMACIÓN SUAVE PARA ENLACES INTERNOS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== VALIDACIÓN FORMULARIO ADMISIÓN ==========
const formAdmision = document.getElementById('formAdmision');
const feedbackAdmision = document.getElementById('formFeedback');

if (formAdmision && feedbackAdmision) {
    formAdmision.addEventListener('submit', function(e) {
        const tutorNombre = document.getElementById('tutor_nombre');
        if (tutorNombre) {
            const nombreValue = tutorNombre.value.trim();
            if (!nombreValue.includes('Madre') && !nombreValue.includes('Padre') && !nombreValue.includes('Tutor') && 
                !nombreValue.includes('madre') && !nombreValue.includes('padre') && !nombreValue.includes('tutor')) {
                e.preventDefault();
                feedbackAdmision.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Por favor, especifique el parentesco en el nombre del tutor (Ej: Madre - María Pérez).</div>';
                setTimeout(() => feedbackAdmision.innerHTML = '', 5000);
            }
        }
    });
}

// ========== MENSAJE DE ÉXITO FORMULARIO ==========
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('enviado') && urlParams.get('enviado') === 'ok') {
    if (feedbackAdmision) {
        feedbackAdmision.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> ¡Solicitud enviada con éxito! Pronto recibirás respuesta.</div>';
        setTimeout(() => feedbackAdmision.innerHTML = '', 8000);
    }
}

// ========== AVISO TEST PSICOLÓGICO ==========
const cursoSelect = document.getElementById('curso');
const avisoPsicologico = document.getElementById('avisoPsicologico');

if (cursoSelect && avisoPsicologico) {
    function verificarCurso() {
        avisoPsicologico.style.display = cursoSelect.value === '4to de Bachiller' ? 'block' : 'none';
    }
    cursoSelect.addEventListener('change', verificarCurso);
    verificarCurso();
}

// ========== BOTÓN FLOTANTE "ATRÁS" ==========
const btnAtras = document.getElementById('btnAtras');
if (btnAtras) {
    btnAtras.addEventListener('click', () => window.history.back());
}

// ========== LIGHTBOX PARA GALERÍA ==========
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

document.querySelectorAll('.galeria-card img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});

lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

// ========== FORMULARIO DE CONTACTO ==========
const formContacto = document.getElementById('formContacto');
const contactoFeedback = document.getElementById('contactoFeedback');

if (formContacto && contactoFeedback) {
    if (urlParams.has('enviado') && urlParams.get('enviado') === 'ok') {
        contactoFeedback.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Pronto te responderemos.</div>';
        setTimeout(() => contactoFeedback.innerHTML = '', 8000);
    }
}

// ========== MODAL PARA DEFINICIONES (SIN TILDES) ==========
document.addEventListener('DOMContentLoaded', function() {
    // Crear modal si no existe
    if (!document.getElementById('modalDescripcion')) {
        const modalHTML = `<div id="modalDescripcion" class="modal"><div class="modal-content"><span class="modal-close">&times;</span><h3 id="modalTitulo"></h3><p id="modalTexto"></p></div></div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    const modal = document.getElementById('modalDescripcion');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalTexto = document.getElementById('modalTexto');
    const modalClose = document.querySelector('.modal-close');
    
    // Función para normalizar texto (quita tildes y convierte ñ en n)
    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u')
            .replace(/ñ/g, 'n');
    }
    
    // Diccionario de definiciones SIN TILDES
    const definiciones = {
        "Programacion": "La programacion es el proceso de crear instrucciones para que una computadora ejecute tareas especificas.",
        "Bases de Datos": "Las bases de datos permiten almacenar, organizar y recuperar informacion de manera eficiente.",
        "Diseno UX/UI": "El diseno UX se enfoca en que un sitio sea facil de usar; el UI se encarga de elementos visuales.",
        "Redes": "Las redes de computadoras permiten la comunicacion entre dispositivos para compartir informacion.",
        "Ciberseguridad": "La ciberseguridad protege los sistemas y datos de ataques digitales.",
        "Cloud Computing": "La computacion en la nube permite acceder a servicios a traves de internet.",
        "Contabilidad": "La contabilidad registra las transacciones financieras de una empresa.",
        "Tributacion": "La tributacion estudia los impuestos y obligaciones fiscales.",
        "Gestion RRHH": "La gestion de recursos humanos administra el personal de una empresa.",
        "Marketing": "El marketing son estrategias para atraer y fidelizar clientes.",
        "Ventas": "Las ventas son el proceso de intercambiar productos por dinero.",
        "Comercio Digital": "El comercio digital consiste en vender productos a traves de internet.",
        "Primeros Auxilios": "Son tecnicas basicas de emergencia antes de atencion medica profesional.",
        "Tecnicas de Enfermeria": "Incluyen toma de signos vitales y administracion de medicamentos.",
        "Cuidados Basicos": "Incluyen higiene, alimentacion y confort del paciente."
    };
    
    // Agregar evento a las competencias
    document.querySelectorAll('.competencias span').forEach(span => {
        let textoOriginal = span.innerText.trim();
        let nombreCompetencia = textoOriginal.replace(/[^\w\s]/g, '').trim();
        span.style.cursor = 'pointer';
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            let nombreNormalizado = normalizarTexto(nombreCompetencia);
            let definicion = null;
            
            for (let clave in definiciones) {
                let claveNormalizada = normalizarTexto(clave);
                if (claveNormalizada === nombreNormalizado) {
                    definicion = definiciones[clave];
                    break;
                }
            }
            
            modalTitulo.innerText = nombreCompetencia;
            modalTexto.innerText = definicion || "Competencia tecnica del area de especializacion.";
            modal.style.display = 'flex';
        });
    });
    
    // Cerrar modal
    if (modalClose) modalClose.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
});
// ========== MINI CALENDARIO DE AVISOS (con pre-avisos automáticos) ==========

// LISTA DE EVENTOS (FÁCIL DE EDITAR)
// Formato: { fecha: "YYYY-MM-DD", texto: "Descripción del evento" }
const eventos = [
    { fecha: "2026-06-03", texto: "🎓 Mérito estudiantil y magisterial" },
    { fecha: "2026-06-10", texto: "🎉 Graduación promoción Blessed 25-26" },
    { fecha: "2026-06-23", texto: "📚 Pruebas nacionales (23 al 26)" },
    // Agrega más eventos aquí cuando quieras
];

// Obtener fecha actual
const hoy = new Date();
const añoActual = hoy.getFullYear();
const mesActual = hoy.getMonth();

// Función para obtener eventos de un mes específico
function obtenerEventosPorMes(año, mes) {
    return eventos.filter(evento => {
        const fechaEvento = new Date(evento.fecha);
        return fechaEvento.getFullYear() === año && fechaEvento.getMonth() === mes;
    });
}

// Función para encontrar el próximo mes con eventos
function obtenerProximoMesConEventos() {
    // Buscar desde el mes actual hacia adelante
    for (let i = 0; i < 12; i++) {
        const mesBuscar = (mesActual + i) % 12;
        let añoBuscar = añoActual;
        
        // Si pasamos a enero, aumentamos el año
        if (mesActual + i >= 12) {
            añoBuscar = añoActual + 1;
        }
        
        const eventosEnMes = obtenerEventosPorMes(añoBuscar, mesBuscar);
        if (eventosEnMes.length > 0) {
            return { año: añoBuscar, mes: mesBuscar };
        }
    }
    return null;
}

// Función para obtener eventos a mostrar
function obtenerEventosAMostrar() {
    let añoMostrar = añoActual;
    let mesMostrar = mesActual;
    let esPreaviso = false;
    
    // Verificar si el mes actual tiene eventos
    const eventosMesActual = obtenerEventosPorMes(añoActual, mesActual);
    
    if (eventosMesActual.length > 0) {
        // El mes actual tiene eventos, mostrarlos normalmente
        return { eventos: eventosMesActual, año: añoActual, mes: mesActual, esPreaviso: false };
    } else {
        // El mes actual no tiene eventos, buscar el próximo mes con eventos
        const proximo = obtenerProximoMesConEventos();
        if (proximo) {
            const eventosProximoMes = obtenerEventosPorMes(proximo.año, proximo.mes);
            return { eventos: eventosProximoMes, año: proximo.año, mes: proximo.mes, esPreaviso: true };
        }
        return { eventos: [], año: añoActual, mes: mesActual, esPreaviso: false };
    }
}

// Función para ordenar eventos por fecha
function ordenarEventos(eventosArray) {
    return eventosArray.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

// Función para formatear fecha (DD/MM)
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
}

// Función para verificar si un evento ya pasó
function eventoPasado(fechaStr) {
    const fechaEvento = new Date(fechaStr);
    fechaEvento.setHours(0, 0, 0, 0);
    const hoyComparar = new Date();
    hoyComparar.setHours(0, 0, 0, 0);
    return fechaEvento < hoyComparar;
}

// Función para obtener nombre del mes en español
function getNombreMes(mes) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes];
}

// Función para obtener el título del bloque
function getTitulo(esPreaviso, año, mes) {
    if (esPreaviso) {
        return `📢 Pre-avisos: ${getNombreMes(mes)} ${año}`;
    }
    return `📅 ${getNombreMes(mes)} ${año}`;
}

// Renderizar eventos en el HTML
function renderizarAvisos() {
    const { eventos: eventosAMostrar, año, mes, esPreaviso } = obtenerEventosAMostrar();
    const eventosOrdenados = ordenarEventos([...eventosAMostrar]);
    const listaContainer = document.getElementById('avisosLista');
    const mesSpan = document.getElementById('mesActual');
    
    if (!listaContainer) return;
    
    // Actualizar el mes en el header
    if (mesSpan) {
        mesSpan.textContent = getTitulo(esPreaviso, año, mes);
    }
    
    if (eventosOrdenados.length === 0) {
        listaContainer.innerHTML = '<div class="aviso-item" style="justify-content: center;"><span class="aviso-texto">No hay eventos programados próximamente</span></div>';
        return;
    }
    
    listaContainer.innerHTML = '';
    eventosOrdenados.forEach(evento => {
        const eventoElemento = document.createElement('div');
        eventoElemento.className = 'aviso-item';
        if (eventoPasado(evento.fecha)) {
            eventoElemento.classList.add('pasado');
        }
        eventoElemento.innerHTML = `
            <span class="aviso-fecha">${formatearFecha(evento.fecha)}</span>
            <span class="aviso-texto">${evento.texto}</span>
        `;
        listaContainer.appendChild(eventoElemento);
    });
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', renderizarAvisos);
