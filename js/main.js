// Enhanced JavaScript for Myco Language Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme management
    const themes = ['light', 'dark', 'trans'];
    let currentThemeIndex = 0;
    
    // Initialize theme
    initTheme();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            cycleTheme();
        });
    }
    
    // Theme toggle functionality
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + T to cycle themes
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            cycleTheme();
        }
        
        // Ctrl/Cmd + Shift + T for trans theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            setTheme('trans');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation item
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.stagger-animate');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .example, .step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Add floating particles effect
    createFloatingParticles();
    
    // Add magical cursor effect
    initMagicalCursor();
    
    // Add scroll-triggered animations
    initScrollAnimations();
    
    // Theme functions
    function initTheme() {
        const savedTheme = localStorage.getItem('myco-theme');
        if (savedTheme && themes.includes(savedTheme)) {
            setTheme(savedTheme);
        }
        updateThemeIcon();
    }
    
    function cycleTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        setTheme(newTheme);
    }
    
    function setTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('dark-theme', 'trans-theme');
        
        // Add new theme class
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else if (theme === 'trans') {
            document.body.classList.add('trans-theme');
        }
        
        // Save theme preference
        localStorage.setItem('myco-theme', theme);
        
        // Add theme change animation
        document.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
        
        // Update theme indicator if exists
        updateThemeIndicator(theme);
        
        // Update theme icon
        updateThemeIcon();
    }
    
    function updateThemeIndicator(theme) {
        const indicator = document.querySelector('.theme-indicator');
        if (indicator) {
            indicator.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            indicator.className = `theme-indicator theme-${theme}`;
        }
    }
    
    function updateThemeIcon() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.textContent = '☀️';
            themeToggle.title = 'Switch to Trans theme (Ctrl+T)';
        } else if (document.body.classList.contains('trans-theme')) {
            themeToggle.textContent = '🌈';
            themeToggle.title = 'Switch to Light theme (Ctrl+T)';
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.title = 'Switch to Dark theme (Ctrl+T)';
        }
    }
    
    // Floating particles effect
    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            createParticle(particleContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random mystical colors
        const colors = [
            'var(--accent-primary)',
            'var(--accent-secondary)', 
            'var(--accent-tertiary)',
            'var(--accent-primary-dark)',
            'var(--accent-secondary-dark)',
            'var(--accent-tertiary-dark)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${3 + Math.random() * 4}px;
            height: ${3 + Math.random() * 4}px;
            background: ${randomColor};
            border-radius: 50%;
            opacity: 0.4;
            animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            filter: blur(0.5px);
            box-shadow: 0 0 10px ${randomColor};
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle when animation ends
        particle.addEventListener('animationend', () => {
            particle.remove();
            setTimeout(() => createParticle(container), 1000);
        });
    }
    
    // Magical cursor effect
    function initMagicalCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'magical-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-primary), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '0.6';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Smooth cursor following
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
    
    // Scroll-triggered animations
    function initScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Add bounce effect for special elements
                    if (entry.target.classList.contains('bounce-reveal')) {
                        entry.target.style.animation = 'bounce 0.8s var(--bounce)';
                    }
                }
            });
        }, { threshold: 0.1 });
        
        scrollElements.forEach(el => scrollObserver.observe(el));
    }
    
    // Add CSS for new animations
    addAnimationCSS();
});

// Add CSS for new animations
function addAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .floating-particle {
            filter: blur(0.5px);
        }
        
        .stagger-animate {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .bounce-reveal {
            animation: none;
        }
        
        .magical-cursor {
            filter: blur(1px);
        }
        
        /* Enhanced hover effects */
        .feature:hover .feature-icon {
            animation: pulse 1s infinite;
        }
        
        /* Glow effects for interactive elements */
        .nav-menu a:hover,
        .btn:hover,
        .feature:hover {
            filter: drop-shadow(0 0 8px var(--accent-primary));
        }
        
        /* Smooth theme transitions */
        body * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        /* Particle container */
        .particle-container {
            background: transparent;
        }
        
        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--accent-primary);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--accent-secondary);
        }
    `;
    document.head.appendChild(style);
}
