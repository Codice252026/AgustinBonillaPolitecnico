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
