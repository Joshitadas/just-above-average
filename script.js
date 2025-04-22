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

// Function to update parent panel height
function updateParentPanelHeight(parentPanel) {
    if (parentPanel.classList.contains('active')) {
        const parentHeight = Array.from(parentPanel.children)
            .reduce((height, child) => {
                if (child.classList.contains('sub-panel') && child.classList.contains('active')) {
                    return height + child.scrollHeight;
                }
                return height + (child.offsetHeight || 0);
            }, 0);
        parentPanel.style.maxHeight = parentHeight + 'px';
    }
}

// Accordion functionality
document.querySelectorAll('.accordion').forEach(accordion => {
    accordion.addEventListener('click', () => {
        const panel = accordion.nextElementSibling;
        const wasActive = panel.classList.contains('active');
        
        // Close all other main panels
        document.querySelectorAll('.accordion').forEach(otherAccordion => {
            if (otherAccordion !== accordion) {
                otherAccordion.classList.remove('active');
                const otherPanel = otherAccordion.nextElementSibling;
                otherPanel.style.maxHeight = null;
                otherPanel.classList.remove('active');
            }
        });

        // Toggle current panel
        accordion.classList.toggle('active');
        if (wasActive) {
            panel.style.maxHeight = null;
            panel.classList.remove('active');
        } else {
            panel.classList.add('active');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
});

// Sub-accordion functionality
document.querySelectorAll('.sub-accordion').forEach(subAccordion => {
    subAccordion.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const subPanel = subAccordion.nextElementSibling;
        const parentPanel = subAccordion.closest('.panel');
        const wasActive = subPanel.classList.contains('active');

        // Ensure parent panel is open
        if (!parentPanel.classList.contains('active')) {
            const parentAccordion = parentPanel.previousElementSibling;
            parentAccordion.classList.add('active');
            parentPanel.classList.add('active');
        }

        // Close other sub-panels in the same parent
        parentPanel.querySelectorAll('.sub-accordion').forEach(otherSubAccordion => {
            if (otherSubAccordion !== subAccordion) {
                otherSubAccordion.classList.remove('active');
                const otherSubPanel = otherSubAccordion.nextElementSibling;
                otherSubPanel.style.maxHeight = null;
                otherSubPanel.classList.remove('active');
            }
        });

        // Toggle current sub-panel
        subAccordion.classList.toggle('active');
        if (wasActive) {
            subPanel.style.maxHeight = null;
            subPanel.classList.remove('active');
        } else {
            subPanel.classList.add('active');
            subPanel.style.maxHeight = subPanel.scrollHeight + 'px';
        }

        // Update parent panel height
        setTimeout(() => {
            updateParentPanelHeight(parentPanel);
        }, 10);
    });
});

// Initialize panels
document.querySelectorAll('.panel, .sub-panel').forEach(panel => {
    panel.style.maxHeight = null;
});
  