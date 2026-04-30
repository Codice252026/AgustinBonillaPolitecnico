// ========== MENÚ MÓVIL ==========
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// ========== CERRAR MENÚ MÓVIL AL HACER CLIC EN UN ENLACE ==========
const navItems = document.querySelectorAll('.nav-item');
if (navItems.length > 0) {
    navItems.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// ========== ACTIVE NAV HIGHLIGHT (marca la página actual) ==========
if (navItems.length > 0) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(function(item) {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active-nav');
        } else {
            item.classList.remove('active-nav');
        }
    });
}

// ========== ANIMACIÓN SUAVE PARA ENLACES INTERNOS ==========
const internalLinks = document.querySelectorAll('a[href^="#"]');
if (internalLinks.length > 0) {
    internalLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// ========== PESTAÑAS DE MATERIAS (para página de técnicos) ==========
const especialidades = document.querySelectorAll('.especialidad');
if (especialidades.length > 0) {
    especialidades.forEach(function(especialidad) {
        const tabs = especialidad.querySelectorAll('.tab-btn');
        const contents = especialidad.querySelectorAll('.tab-content');
        
        if (tabs.length > 0 && contents.length > 0) {
            tabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-tab');
                    
                    tabs.forEach(function(t) {
                        t.classList.remove('active');
                    });
                    contents.forEach(function(c) {
                        c.classList.remove('active');
                    });
                    
                    this.classList.add('active');
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }
    });
}

// ========== VALIDACIÓN DEL FORMULARIO DE ADMISIÓN (parentesco) ==========
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
                setTimeout(function() {
                    feedbackAdmision.innerHTML = '';
                }, 5000);
            }
        }
    });
}

// ========== MOSTRAR MENSAJE DE ÉXITO AL VOLVER DE FORMSUBMIT ==========
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('enviado') && urlParams.get('enviado') === 'ok') {
    if (feedbackAdmision) {
        feedbackAdmision.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> ¡Solicitud enviada con éxito! Pronto recibirás respuesta. Gracias por contactarnos.</div>';
        setTimeout(function() {
            if (feedbackAdmision) feedbackAdmision.innerHTML = '';
        }, 8000);
    }
}

// ========== MOSTRAR AVISO DE TEST PSICOLÓGICO PARA 4TO DE BACHILLER ==========
const cursoSelect = document.getElementById('curso');
const avisoPsicologico = document.getElementById('avisoPsicologico');

if (cursoSelect && avisoPsicologico) {
    // Función para mostrar/ocultar el aviso según el valor seleccionado
    function verificarCurso() {
        if (cursoSelect.value === '4to de Bachiller') {
            avisoPsicologico.style.display = 'block';
        } else {
            avisoPsicologico.style.display = 'none';
        }
    }
    
    // Escuchar cambios en el select
    cursoSelect.addEventListener('change', verificarCurso);
    
    // Verificar al cargar la página (por si ya estaba seleccionado)
    verificarCurso();
}
// ========== CIERRE DE MENÚ EN HISTORIA (ya está cubierto por el código general) ==========
// No se necesita código adicional, el menú ya funciona.
// Solo asegúrate de que la clase active-nav se aplique correctamente

// ========== BOTÓN FLOTANTE "ATRÁS" ==========
const btnAtras = document.getElementById('btnAtras');

if (btnAtras) {
    btnAtras.addEventListener('click', function() {
        // Retrocede a la página anterior en el historial del navegador
        window.history.back();
    });
}
// ========== SUBMENÚ PARA MÓVIL ==========
const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

if (dropdownItems.length > 0) {
    dropdownItems.forEach(function(item) {
        const toggle = item.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 850) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
}
// ========== LIGHTBOX PARA GALERÍA ==========
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

const imagenesGaleria = document.querySelectorAll('.galeria-card img');

imagenesGaleria.forEach(img => {
    img.addEventListener('click', (e) => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

const formContacto = document.getElementById('formContacto');
const contactoFeedback = document.getElementById('contactoFeedback');

if (formContacto && contactoFeedback) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('enviado') && urlParams.get('enviado') === 'ok') {
        contactoFeedback.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Pronto te responderemos.</div>';
        setTimeout(() => {
            contactoFeedback.innerHTML = '';
        }, 8000);
    }
}
// ========== MODAL PARA DESCRIPCIONES DE COMPETENCIAS ==========
const modal = document.getElementById('modalDescripcion');
const modalTitulo = document.getElementById('modalTitulo');
const modalTexto = document.getElementById('modalTexto');
const modalClose = document.querySelector('.modal-close');

// Diccionario de descripciones de competencias
const descripciones = {
    // Informática y Telecomunicaciones
    "Programación": "La programación es el proceso de crear instrucciones para que una computadora ejecute tareas específicas. Implica escribir código en lenguajes como Python, Java o JavaScript.",
    "Bases de Datos": "Las bases de datos son sistemas que permiten almacenar, organizar y recuperar información de manera eficiente, como los datos de estudiantes, notas o personal.",
    "Diseño UX/UI": "El diseño UX (Experiencia de Usuario) se enfoca en que un sitio sea fácil y agradable de usar. El UI (Interfaz de Usuario) se encarga de los elementos visuales como botones, colores y tipografía.",
    "Redes": "Las redes de computadoras permiten la comunicación entre dispositivos para compartir información y recursos, como internet o impresoras en red.",
    "Ciberseguridad": "La ciberseguridad protege los sistemas, redes y datos de ataques digitales, accesos no autorizados o daños.",
    "Cloud Computing": "La computación en la nube permite acceder a servicios de almacenamiento, servidores y aplicaciones a través de internet sin necesidad de infraestructura local.",
    
    // Administración y Gestión
    "Contabilidad": "La contabilidad es la disciplina que registra, clasifica y resume las transacciones financieras de una empresa para conocer su situación económica.",
    "Tributación": "La tributación estudia los impuestos y obligaciones fiscales que deben cumplir las personas y empresas ante el Estado.",
    "Gestión RRHH": "La gestión de recursos humanos se encarga de administrar el personal de una empresa, incluyendo contratación, capacitación y desarrollo del talento humano.",
    "Marketing": "El marketing es el conjunto de estrategias para identificar, atraer y fidelizar clientes, promoviendo productos o servicios.",
    "Ventas": "Las ventas son el proceso de intercambiar productos o servicios por dinero, incluyendo la negociación y el cierre de acuerdos con clientes.",
    "Comercio Digital": "El comercio digital o e-commerce consiste en comprar y vender productos o servicios a través de internet.",
    
    // Salud y Bienestar Social
    "Primeros Auxilios": "Los primeros auxilios son las técnicas básicas de emergencia que se aplican a una persona accidentada o enferma antes de recibir atención médica profesional.",
    "Técnicas de Enfermería": "Las técnicas de enfermería incluyen procedimientos como toma de signos vitales, administración de medicamentos y cuidados básicos al paciente.",
    "Cuidados Básicos": "Los cuidados básicos de enfermería incluyen la higiene, alimentación, movilización y confort del paciente durante su estancia en un centro de salud."
};

// Función para normalizar texto (ignora tildes, mayúsculas y caracteres especiales)
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // elimina tildes
        .replace(/[^a-z0-9\s]/g, ''); // elimina caracteres especiales como /, -, etc.
}

// Agregar evento de clic a todas las etiquetas de competencias
function inicializarModalCompetencias() {
    const competencias = document.querySelectorAll('.competencias span');
    
    competencias.forEach(span => {
        let textoCompleto = span.innerText.trim();
        // Limpiar íconos (eliminar cualquier ícono de Font Awesome)
        let nombreCompetencia = textoCompleto.replace(/[^\w\s\/]/g, '').trim();
        
        span.style.cursor = 'pointer';
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Buscar en descripciones usando normalización
            const nombreNormalizado = normalizarTexto(nombreCompetencia);
            const claveEncontrada = Object.keys(descripciones).find(clave => {
                return normalizarTexto(clave) === nombreNormalizado;
            });
            
            if (claveEncontrada) {
                modalTitulo.innerText = nombreCompetencia;
                modalTexto.innerText = descripciones[claveEncontrada];
                modal.style.display = 'flex';
            } else {
                modalTitulo.innerText = nombreCompetencia;
                modalTexto.innerText = `Competencia técnica del área de especialización.`;
                modal.style.display = 'flex';
            }
        });
    });
}

// Cerrar modal al hacer clic en la X
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarModalCompetencias();
});
