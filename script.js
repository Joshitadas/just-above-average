// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const body = document.body;

// Function to close mobile menu
function closeMobileMenu() {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    body.style.overflow = '';
}

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    // Prevent body scroll when menu is open
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        closeMobileMenu();
        
        // Smooth scroll to target after menu closes
        setTimeout(() => {
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
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

// Header scroll effect with throttle
let lastScrollTop = 0;
const header = document.querySelector('header');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class when scrolling down
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header based on scroll direction
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Scrolling down & not at top
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up or at top
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = currentScroll;
            ticking = false;
        });
        ticking = true;
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

// Accordion functionality with improved mobile handling
document.querySelectorAll('.accordion, .sub-accordion').forEach(accordion => {
    accordion.addEventListener('click', (e) => {
        e.preventDefault();
        const panel = accordion.nextElementSibling;
        const isSubAccordion = accordion.classList.contains('sub-accordion');
        const parentPanel = isSubAccordion ? accordion.closest('.panel') : null;

        // Close other accordions at the same level
        const container = isSubAccordion ? parentPanel : accordion.parentElement;
        container.querySelectorAll(isSubAccordion ? '.sub-accordion' : '.accordion').forEach(other => {
            if (other !== accordion) {
                other.classList.remove('active');
                other.nextElementSibling.style.maxHeight = null;
                other.nextElementSibling.classList.remove('active');
            }
        });

        // Toggle current accordion
        accordion.classList.toggle('active');
        panel.classList.toggle('active');

        if (panel.classList.contains('active')) {
            // Always set max-height to scrollHeight to fit all content
            panel.style.maxHeight = panel.scrollHeight + 'px';
            if (isSubAccordion && parentPanel) {
                // Also update parent panel's max-height to fit all open sub-panels
                let totalHeight = 0;
                parentPanel.querySelectorAll('.sub-panel.active').forEach(activeSub => {
                    totalHeight += activeSub.scrollHeight;
                });
                parentPanel.style.maxHeight = parentPanel.scrollHeight + totalHeight + 'px';
            }
            // Scroll into view on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const headerHeight = 70;
                    const accordionTop = accordion.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: accordionTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        } else {
            panel.style.maxHeight = null;
            if (isSubAccordion && parentPanel) {
                parentPanel.style.maxHeight = parentPanel.scrollHeight - panel.scrollHeight + 'px';
            }
        }
    });
});

// Touch feedback for mobile devices
if ('ontouchstart' in window) {
    const addTouchFeedback = (element) => {
        element.addEventListener('touchstart', () => {
            element.classList.add('touch-active');
        });
        
        ['touchend', 'touchcancel'].forEach(event => {
            element.addEventListener(event, () => {
                element.classList.remove('touch-active');
            });
        });
    };

    document.querySelectorAll('.accordion, .sub-accordion, nav a').forEach(addTouchFeedback);
}

// Initialize panels
document.querySelectorAll('.panel, .sub-panel').forEach(panel => {
    panel.style.maxHeight = null;
});
  