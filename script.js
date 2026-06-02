// 1. PRELOADER TIME ENGINE
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 2000); // Luxury branding showcase delay
});

// 2. STICKY NAV & ACTIVE LINKS CONTROLLER
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Dynamic Navbar adjustment
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // Tracking viewport location for link activation
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Back to top floating indicator visibility
    const btt = document.querySelector('.back-to-top');
    if (window.scrollY > 600) {
        btt.classList.add('show');
    } else {
        btt.classList.remove('show');
    }
});

// Smooth Scroll to top command
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3. MOBILE INTERFACE EXPANSION NAV TOGGLE
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Safe menu fold-away when hitting section routes
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('open');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// 4. HERO BACKGROUND CROSS-FADE ANIMATION
const slides = document.querySelectorAll('.hero-slider .slide');
let activeSlideIndex = 0;

function advanceHeroSlider() {
    slides[activeSlideIndex].classList.remove('active');
    activeSlideIndex = (activeSlideIndex + 1) % slides.length;
    slides[activeSlideIndex].classList.add('active');
}
setInterval(advanceHeroSlider, 5000);

// 5. SCROLL REVEAL VIEWPORT ENGINE
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120; // Trigger threshold offset

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealElements);
revealElements(); // Initial execution run

// 6. LIGHTBOX MEDIA VIEWER SYSTEM
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetImgSrc = item.querySelector('img').getAttribute('src');
        lightboxImg.setAttribute('src', targetImgSrc);
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Freeze viewport parsing behind overlay
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if(e.target !== lightboxImg) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 7. CAROUSEL TESTIMONIAL LOOPER
const testSlides = document.querySelectorAll('.testimonial-slide');
let currentTestimonialIndex = 0;

function runTestimonialSlider() {
    testSlides[currentTestimonialIndex].classList.remove('active');
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testSlides.length;
    testSlides[currentTestimonialIndex].classList.add('active');
}
setInterval(runTestimonialSlider, 6000);

// 8. LUXURY CONTACT SUBMISSION INTERACTION
const form = document.getElementById('hotelContactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.btn-luxury');
    const originalText = btn.innerHTML;
    
    btn.style.width = `${btn.offsetWidth}px`;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Registered';
        btn.style.background = '#25D366';
        btn.style.borderColor = '#25D366';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            form.reset();
            btn.innerHTML = originalText;
            btn.style.background = 'transparent';
            btn.style.borderColor = 'var(--accent-primary)';
            btn.style.color = 'var(--text-primary)';
            btn.style.pointerEvents = 'auto';
        }, 3000);
    }, 2000);
});
