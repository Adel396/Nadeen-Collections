// Fungsi untuk mengecek elemen dalam viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fungsi untuk menangani animasi scroll
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('active');
        }
    });
}

// Fungsi untuk animasi typing effect
function initTypeWriter() {
    const text = document.querySelector('.hero-content h1');
    if (!text) return;

    const originalText = text.textContent;
    text.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Mulai animasi setelah sedikit delay
    setTimeout(typeWriter, 500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Trigger animasi saat scroll
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Tambahkan animasi untuk header saat scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Tambahkan efek parallax untuk hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Page Transition
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to main content sections
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach(section => {
        section.classList.add('animate-content');
    });

    // Handle page transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip for external links or special links
            if (this.getAttribute('target') === '_blank' || 
                this.getAttribute('href').startsWith('#') ||
                this.getAttribute('href').startsWith('tel:') ||
                this.getAttribute('href').startsWith('mailto:')) {
                return;
            }

            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Fade out
            document.body.style.opacity = 0;
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});

// Ensure content is visible when using browser back/forward
window.onpageshow = function(event) {
    if (event.persisted) {
        document.body.style.opacity = 1;
    }
}; 