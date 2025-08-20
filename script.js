// SundaLang Website JavaScript
// Resonating at 128Hz for optimal harmony

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeEcosystemInteractions();
    initializeScrollEffects();
    initializeResonanceEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = navMenu.classList.contains('active') 
                ? `rotate(${index === 0 ? 45 : index === 2 ? -45 : 0}deg) translate(${index === 1 ? '100px' : '0'}, ${index === 0 ? '6px' : index === 2 ? '-6px' : '0'})`
                : 'none';
            bar.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        }
    });
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.pillar-card, .feature-card, .timeline-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // Cosmic particles animation
    createCosmicParticles();
}

// Create floating cosmic particles
function createCosmicParticles() {
    const particlesContainer = document.querySelector('.cosmic-particles');
    if (!particlesContainer) return;

    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(${Math.random() > 0.5 ? '99, 102, 241' : '236, 72, 153'}, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Ecosystem interactions
function initializeEcosystemInteractions() {
    const ecoNodes = document.querySelectorAll('.eco-node');
    const detailCards = document.querySelectorAll('.detail-card');

    ecoNodes.forEach(node => {
        node.addEventListener('click', () => {
            const nodeType = node.getAttribute('data-node');
            
            // Hide all detail cards
            detailCards.forEach(card => {
                card.classList.remove('active');
            });
            
            // Show corresponding detail card
            const targetCard = document.querySelector(`[data-detail="${nodeType}"]`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
            
            // Add visual feedback
            ecoNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            // Create ripple effect
            createRippleEffect(node);
        });
    });
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        left: 50%;
        top: 50%;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Progress indicator (optional)
    createScrollProgress();
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        z-index: 1001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Resonance effects (128Hz simulation)
function initializeResonanceEffects() {
    // Create subtle pulsing effect at 128Hz frequency (simulated)
    const resonanceElements = document.querySelectorAll('.sphere-core, .resonance-frequency');
    
    resonanceElements.forEach(element => {
        // 128Hz = 128 cycles per second, so 1000ms/128 ≈ 7.8ms per cycle
        // We'll use a slower visual representation for better UX
        setInterval(() => {
            element.style.filter = 'brightness(1.1)';
            setTimeout(() => {
                element.style.filter = 'brightness(1)';
            }, 50);
        }, 1000); // 1Hz visual pulse to represent 128Hz resonance
    });

    // Add resonance wave effect to cosmic sphere
    const cosmicSphere = document.querySelector('.cosmic-sphere');
    if (cosmicSphere) {
        setInterval(() => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80px;
                height: 80px;
                border: 2px solid rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                animation: expandWave 2s ease-out forwards;
                pointer-events: none;
            `;
            cosmicSphere.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 2000);
        }, 2000);
    }

    // Add expand wave animation
    if (!document.querySelector('#wave-style')) {
        const style = document.createElement('style');
        style.id = 'wave-style';
        style.textContent = `
            @keyframes expandWave {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function downloadPDF() {
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = 'SundaLang_Public_Document.pdf'; // This would be the actual PDF path
    link.download = 'SundaLang_Dokumentasi_Lengkap.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download feedback
    showNotification('Mengunduh dokumentasi SundaLang...', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(99, 102, 241, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Easter egg: Konami code for special effect
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateAbsurditasMode();
        konamiCode = [];
    }
});

// Absurditas Absoluta mode (Easter egg)
function activateAbsurditasMode() {
    showNotification('🎭 Absurditas Absoluta Mode Activated! 🎭', 'success');
    
    // Add some playful chaos
    const elements = document.querySelectorAll('.pillar-card, .feature-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = 'rotate(360deg) scale(1.1)';
            el.style.transition = 'transform 1s ease-in-out';
            
            setTimeout(() => {
                el.style.transform = 'none';
            }, 1000);
        }, index * 100);
    });
    
    // Change some text temporarily
    const title = document.querySelector('.hero-title .title-main');
    const originalText = title.textContent;
    title.textContent = '🌹 SundaLang.cos 🌹';
    
    setTimeout(() => {
        title.textContent = originalText;
    }, 5000);
    
    // Add temporary cosmic effect
    document.body.style.animation = 'cosmicPulse 0.5s ease-in-out 3';
    
    // Add cosmic pulse animation
    if (!document.querySelector('#cosmic-style')) {
        const style = document.createElement('style');
        style.id = 'cosmic-style';
        style.textContent = `
            @keyframes cosmicPulse {
                0%, 100% { filter: hue-rotate(0deg); }
                50% { filter: hue-rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        document.body.style.animation = 'none';
    }, 1500);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any expensive scroll operations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const mainContent = document.querySelector('#home');
        if (mainContent) {
            mainContent.focus();
            e.preventDefault();
        }
    }
});

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'SundaLang_Public_Document.pdf'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Console message for developers
console.log(`
🌹 SundaLang.cos - A Living Computational Ecosystem 🌹

Resonating at 128Hz for optimal harmony.
Built with love by F12🌹Che🔎 and Manus AI.

"Code once, resonate everywhere"

Try the Konami code for a special surprise! ↑↑↓↓←→←→BA
`);

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for offline capabilities
        console.log('SundaLang.cos ready for cosmic deployment! 🚀');
    });
}

