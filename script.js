const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        let current = 0;
        const increment = target / 50;
        const update = () => {
            current += increment;
            if (current < target) {
                if (el.innerText.includes('лет')) {
                    el.innerHTML = Math.floor(current) + ' <span>лет</span>';
                } else {
                    el.innerText = Math.floor(current);
                }
                requestAnimationFrame(update);
            } else {
                if (el.innerText.includes('лет')) {
                    el.innerHTML = target + ' <span>лет</span>';
                } else {
                    el.innerText = target;
                }
            }
        };
        update();
    });
}

const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(statsSection);
        }
    });
}, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);

const catalogBtn = document.getElementById('catalogBtn');
const projectsSection = document.querySelector('.projects');
if (catalogBtn && projectsSection) {
    catalogBtn.addEventListener('click', () => {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

const fadeElements = document.querySelectorAll('.hero-text, .hero-3d, .stat-item, .gallery-item');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});