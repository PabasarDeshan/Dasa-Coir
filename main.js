document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    // Header scroll effect
    const isHomePage = document.querySelector('.hero-full') !== null;

    const handleScroll = () => {
        if (!isHomePage) {
            header.classList.add('scrolled');
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on load

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Stats Counter Animation
    const statsItems = document.querySelectorAll('.stat-item[data-target]');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const countElement = element.querySelector('.count');
        const duration = 2000; // 2 seconds
        const stepTime = 30; // ms between updates
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                countElement.innerText = target + suffix;
                clearInterval(counter);
            } else {
                countElement.innerText = Math.floor(current) + suffix;
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    statsItems.forEach(item => statsObserver.observe(item));

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    // Get the full-screen overlay element from HTML
    const overlay = document.querySelector('.nav-overlay');

    function openMenu() {
        nav.classList.add('mobile-active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // lock scroll
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    function closeMenu() {
        nav.classList.remove('mobile-active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // restore scroll
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (nav.classList.contains('mobile-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close when clicking the overlay
        overlay.addEventListener('click', closeMenu);

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }
});
