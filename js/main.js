// Smooth scrolling para links de navegação
document.querySelectorAll('nav a').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        
        // Se for um link interno da página, faz scroll suave
        if (href.startsWith('#')) {
            var targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Caso contrário, navega normalmente
            window.location.href = href;
        }
    });
});

// Intersection Observer para animações ao entrar na tela
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os elementos que devem ser animados
document.querySelectorAll('.card, .timeline-item, .team-member, .game-badge').forEach(function(el) {
    observer.observe(el);
});

// Detecção de página atual para destacar nav link
document.addEventListener('DOMContentLoaded', function() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('nav a').forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.background = 'rgba(139, 92, 246, 0.2)';
            link.style.color = '#e879f9';
        }
    });
});

// Efeito de glow em elementos específicos
document.querySelectorAll('.game-badge, .card-icon, .team-avatar').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        this.style.animation = 'glow 0.6s ease-in-out';
    });
});

// Scroll reveal para seções
window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY;
    var elements = document.querySelectorAll('section');
    
    elements.forEach(function(el) {
        var elPos = el.getBoundingClientRect().top;
        if (elPos < window.innerHeight * 0.75) {
            el.style.opacity = Math.min(1, 1 - ((window.innerHeight - elPos) / -200));
        }
    });
});

// Preload de imagens para melhor performance
function preloadImages(urls) {
    urls.forEach(function(url) {
        var img = new Image();
        img.src = url;
    });
}

// Menu mobile responsivo
function createMobileMenu() {
    var header = document.querySelector('header');
    var nav = document.querySelector('nav');
    
    // Verifica se a tela é pequena
    if (window.innerWidth <= 768) {
        var hamburger = document.createElement('div');
        hamburger.innerHTML = '≡';
        hamburger.style.cssText = 'font-size: 28px; cursor: pointer; color: #c084fc;';
        
        hamburger.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(10, 5, 25, 0.95)';
            nav.style.padding = '20px';
        });
    }
}

// Debug info
console.log('GameCube website loaded successfully');
console.log('Current page:', window.location.pathname);
