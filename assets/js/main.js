// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // Change icon based on menu state
        if (navLinks.classList.contains('nav-active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('nav-active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Close mobile menu if open
            navLinks.classList.remove('nav-active');
            menuToggle.classList.remove('toggle');
        }
    });
});

// Parallax effect on hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (hero) {
        const scroll = window.pageYOffset;
        hero.style.backgroundPositionY = `${scroll * 0.5}px`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.benefit-card, .testimonial-card, .pricing-card, .hero-content, h2').forEach((el) => {
    observer.observe(el);
});

// Pricing hover effect
const pricingCard = document.querySelector('.pricing-card');
if (pricingCard) {
    pricingCard.addEventListener('mousemove', (e) => {
        const rect = pricingCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        pricingCard.style.setProperty('--mouse-x', `${x}px`);
        pricingCard.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Add smooth scroll-behavior to html
document.documentElement.style.scrollBehavior = 'smooth';

// Background glow effect that follows the mouse
let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isReducedMotion) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    });
}

// Performance optimization: Defer non-critical operations
window.addEventListener('load', () => {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
