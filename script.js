// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Accordion functionality
const accordions = document.querySelectorAll('.accordion');
const subAccordions = document.querySelectorAll('.sub-accordion');

function toggleMainAccordion(accordion) {
    const panel = accordion.nextElementSibling;
    const isExpanded = accordion.classList.contains('active');
    
    // Close all main panels first
    accordions.forEach(a => {
        a.classList.remove('active');
        a.nextElementSibling.style.display = 'none';
    });
    
    // If the clicked accordion wasn't expanded, open it
    if (!isExpanded) {
        accordion.classList.add('active');
        panel.style.display = 'block';
    }
}

function toggleSubAccordion(subAccordion) {
    const subPanel = subAccordion.nextElementSibling;
    const isExpanded = subAccordion.classList.contains('active');
    
    // Close all sub-panels within the same main panel
    const parentPanel = subAccordion.closest('.panel');
    parentPanel.querySelectorAll('.sub-accordion').forEach(sa => {
        sa.classList.remove('active');
        if (sa.nextElementSibling) {
            sa.nextElementSibling.style.display = 'none';
        }
    });
    
    // If the clicked sub-accordion wasn't expanded, open it
    if (!isExpanded) {
        subAccordion.classList.add('active');
        subPanel.style.display = 'block';
    }
}

// Add click event listeners
accordions.forEach(accordion => {
    accordion.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMainAccordion(accordion);
    });
});

subAccordions.forEach(subAccordion => {
    subAccordion.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSubAccordion(subAccordion);
    });
});
  