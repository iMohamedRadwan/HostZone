// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic header
const header = document.querySelector('.navbar__header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background when scrolling with smooth transition
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll with smooth transition
    if (currentScroll > lastScroll && currentScroll > 500 && !navMenu.classList.contains('active')) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Price cards hover effect
const priceCards = document.querySelectorAll('.price__card');

priceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        priceCards.forEach(c => {
            if (c !== card) {
                c.style.transform = 'scale(0.95)';
                c.style.filter = 'blur(2px)';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        priceCards.forEach(c => {
            if (!c.classList.contains('popular')) {
                c.style.transform = 'scale(1)';
            } else {
                c.style.transform = 'scale(1.05)';
            }
            c.style.filter = 'none';
        });
    });
});

// Service cards animation
const cards = document.querySelectorAll('.card');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-in-out';
    observer.observe(card);
});