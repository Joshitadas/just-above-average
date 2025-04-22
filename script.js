// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Accordion functionality
const accordions = document.querySelectorAll('.accordion, .sub-accordion');

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        const panel = accordion.nextElementSibling;
        const isSubAccordion = accordion.classList.contains('sub-accordion');
        
        // Close all other panels at the same level
        const parentPanel = isSubAccordion ? 
            accordion.closest('.panel') : 
            document.querySelector('.accordion-container');
            
        const otherPanels = parentPanel.querySelectorAll(`.${isSubAccordion ? 'sub-' : ''}panel`);
        otherPanels.forEach(otherPanel => {
            if (otherPanel !== panel) {
                otherPanel.style.maxHeight = null;
                otherPanel.previousElementSibling.classList.remove('active');
            }
        });

        // Toggle current panel
        accordion.classList.toggle('active');
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// Initialize panels
document.querySelectorAll('.panel, .sub-panel').forEach(panel => {
    panel.style.maxHeight = null;
});
  