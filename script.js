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
