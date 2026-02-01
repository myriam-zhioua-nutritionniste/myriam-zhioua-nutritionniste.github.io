// Function to inject SEO Structured Data
function injectJSONLD() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Cabinet Nutritionniste Myriam Zhioua",
        "alternateName": "Myriam Zhioua Nutritionniste",
        "image": "https://myriam-zhioua-nutritionniste.github.io/myriam-nutrition/photo.jpeg",
        "url": "https://myriam-zhioua-nutritionniste.github.io/myriam-nutrition/",
        "telephone": "+21620182166",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "84, Avenue de Carthage, Résidence El Hakim",
            "addressLocality": "Les Jardins de Carthage",
            "addressRegion": "Tunis",
            "postalCode": "1090",
            "addressCountry": "TN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.8525,
            "longitude": 10.3233
        },
        "description": "Nutritionniste et Diététicienne à Tunis spécialisée en nutrition thérapeutique et phytothérapie."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Run the function
injectJSONLD();


/* ==============================================
   OPTIMIZED MOBILE-FIRST JAVASCRIPT
   Enhanced UX/UI for excellent phone experience
   ============================================== */

// Wrap everything in IIFE to avoid global scope pollution
(function () {
    'use strict';

    // --- Configuration ---
    const CONFIG = {
        headerScrollThreshold: 50,
        observerThreshold: 0.1,
        smoothScrollOffset: 80,
        debounceDelay: 150
    };

    // --- Utility Functions ---

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check if device is touch-enabled
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    // --- DOM Ready Handler ---
    function initializeApp() {

        // Core UI Functions
        initMobileMenu();
        initFAQAccordion();
        initHeaderScroll();
        initSmoothScroll();
        initFloatingCTA();

        // Animations & Visuals
        initScrollAnimations();
        initCircularProgress(); // Integrated from previous version
        initLazyLoading();

        // Touch optimizations
        if (isTouchDevice()) {
            initTouchOptimizations();
        }

        console.log('✅ Made by Raed Brini');
        console.log('You can contact me via email : raed.brini@gmail.edu ')
    }

    // --- Mobile Menu Toggle ---
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (!hamburger || !navMenu) return;

        function toggleMenu() {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');

            // Update ARIA attribute
            hamburger.setAttribute('aria-expanded', isActive);

            // Prevent body scroll when menu is open
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // --- FAQ Accordion ---
    function initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', function () {
                const answer = this.nextElementSibling;
                const isActive = this.classList.contains('active');

                // Toggle active class
                this.classList.toggle('active');

                // Update ARIA attribute
                this.setAttribute('aria-expanded', !isActive);

                // Animate answer height
                if (!isActive) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });

            // Handle keyboard navigation
            question.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // --- Circular Progress Animation ---
    function initCircularProgress() {
        const circles = document.querySelectorAll('.progress-circle');
        if (circles.length === 0) return;

        const circleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percentage = circle.getAttribute('data-percentage');
                    const progressCircle = circle.querySelector('.progress');
                    const percentageText = circle.querySelector('.percentage');

                    if (!progressCircle || !percentageText) return;

                    // Calculate circumference (2 * PI * r)
                    // r=65 is defined in the SVG
                    const radius = 65;
                    const circumference = 2 * Math.PI * radius;

                    // Set offset
                    const offset = circumference - (percentage / 100) * circumference;
                    progressCircle.style.strokeDashoffset = offset;

                    // Animate number counting
                    let currentPercent = 0;
                    const duration = 2000; // 2 seconds matched with CSS transition
                    const intervalTime = 20;
                    const step = percentage / (duration / intervalTime);

                    const timer = setInterval(() => {
                        currentPercent += step;
                        if (currentPercent >= percentage) {
                            percentageText.textContent = percentage + '%';
                            clearInterval(timer);
                        } else {
                            percentageText.textContent = Math.floor(currentPercent) + '%';
                        }
                    }, intervalTime);

                    observer.unobserve(circle);
                }
            });
        }, { threshold: 0.5 });

        circles.forEach(circle => circleObserver.observe(circle));
    }

    // --- Scroll Animations (Intersection Observer) ---
    function initScrollAnimations() {
        // Check if browser supports Intersection Observer
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            document.querySelectorAll('.service-card, .about-text, .about-image, .testimonial-card, .section-title')
                .forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            return;
        }

        const observerOptions = {
            threshold: CONFIG.observerThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elements to animate
        const fadeElements = document.querySelectorAll(
            '.service-card, .about-text, .about-image, .testimonial-card, .section-title, .result-card, .process-item, .faq-item'
        );

        fadeElements.forEach(el => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        // Add CSS class for animation dynamically if not present
        if (!document.getElementById('scroll-animation-style')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'scroll-animation-style';
            styleSheet.textContent = `
                .in-view {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    // --- Smooth Scroll with Offset ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = CONFIG.smoothScrollOffset;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Focus target for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    }

    // --- Header Scroll Effect ---
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const scrollThreshold = CONFIG.headerScrollThreshold;
        const handleScroll = debounce(() => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, CONFIG.debounceDelay);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // --- Floating CTA Visibility ---
    function initFloatingCTA() {
        const floatingCTA = document.querySelector('.floating-cta');
        if (!floatingCTA) return;

        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const handleScroll = debounce(() => {
            // Show CTA when scrolling past the hero section
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset + window.innerHeight;

            if (scrollPosition > heroBottom + 200) {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.pointerEvents = 'auto';
            } else {
                floatingCTA.style.opacity = '0';
                floatingCTA.style.pointerEvents = 'none';
            }
        }, CONFIG.debounceDelay);

        // Initial state
        floatingCTA.style.transition = 'opacity 0.3s ease';
        floatingCTA.style.opacity = '0';
        floatingCTA.style.pointerEvents = 'none';

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // --- Touch Optimizations ---
    function initTouchOptimizations() {
        document.body.classList.add('touch-device');
        const buttons = document.querySelectorAll('.btn, .nav-link, .faq-question');

        buttons.forEach(button => {
            button.addEventListener('touchstart', function () {
                this.classList.add('touch-active');
            }, { passive: true });

            button.addEventListener('touchend', function () {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });

        if (!document.getElementById('touch-feedback-style')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'touch-feedback-style';
            styleSheet.textContent = `
                .touch-active {
                    opacity: 0.8;
                    transform: scale(0.98);
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    // --- Lazy Loading Images ---
    function initLazyLoading() {
        // Native lazy loading check
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback unique to this script
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.removeAttribute('loading');
                        observer.unobserve(img);
                    }
                });
            });
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // --- Initialize on DOM Ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
})();
