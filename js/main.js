const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

lenis.on('scroll', updateActiveNav);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            lenis.scrollTo(targetSection, {
                offset: 0,
                duration: 1.2,
            });
        }
    });
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
    });
    
    const hiddenIframe = document.getElementById('hidden_iframe');
    if (hiddenIframe) {
        hiddenIframe.addEventListener('load', () => {
            if (contactForm) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }
        });
    }
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.tech-card, .project-card, .education-item, .certification-card').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
});

const heroElements = document.querySelectorAll('.hero-tag, .hero-title, .hero-description, .hero-buttons');

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, { threshold: 0.1 });

heroElements.forEach((el, index) => {
    el.classList.add('animate-ready');
    el.style.transitionDelay = `${index * 0.15}s`;
    heroObserver.observe(el);
});

const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, { threshold: 0.2 });

sectionHeaders.forEach(el => {
    el.classList.add('animate-ready');
    headerObserver.observe(el);
});