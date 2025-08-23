// Enhanced JavaScript for Myco Language Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme management
    const themes = ['light', 'dark'];
    let currentThemeIndex = 0;
    
    // Secret trans theme activation
    let secretSequence = '';
    let lastKeyTime = 0;
    
    // Initialize theme
    initTheme();
    
    // Secret trans theme detection
    document.addEventListener('keydown', function(e) {
        const currentTime = Date.now();
        
        // Reset sequence if too much time has passed
        if (currentTime - lastKeyTime > 3000) {
            secretSequence = '';
        }
        
        lastKeyTime = currentTime;
        
        // Check for "I V Y" sequence
        if (e.key.toLowerCase() === 'i' && secretSequence === '') {
            secretSequence = 'i';
        } else if (e.key.toLowerCase() === 'v' && secretSequence === 'i') {
            secretSequence = 'iv';
        } else if (e.key.toLowerCase() === 'y' && secretSequence === 'iv') {
            secretSequence = 'ivy';
            // Activate secret trans theme!
            setTheme('trans');
            showSecretMessage();
            secretSequence = '';
        } else if (e.key.toLowerCase() === 'i' && secretSequence === 'ivy') {
            // Keep the sequence going for fun
            secretSequence = 'ivyi';
        } else {
            // Reset if wrong key
            secretSequence = '';
        }
    });
    
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
    
    // Add copy functionality to code blocks
    initCodeCopy();
    
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
        
        const themeIcon = themeToggle.querySelector('.theme-icon');
        const themeText = themeToggle.querySelector('.theme-text');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.textContent = '☀';
            themeText.textContent = 'Light';
            themeToggle.title = 'Switch to Light theme (Ctrl+T)';
        } else if (document.body.classList.contains('trans-theme')) {
            themeIcon.textContent = '★';
            themeText.textContent = 'Secret';
            themeToggle.title = 'Secret Trans theme active!';
        } else {
            themeIcon.textContent = '☾';
            themeText.textContent = 'Dark';
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
    
    // Code copy functionality
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('.code-block');
        
        codeBlocks.forEach(block => {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = 'Copy';
            copyBtn.title = 'Copy code';
            
            copyBtn.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: var(--accent-primary);
                color: var(--bg-primary);
                border: none;
                border-radius: 4px;
                padding: 0.25rem 0.5rem;
                cursor: pointer;
                font-size: 0.75rem;
                opacity: 0;
                transition: all var(--transition-normal);
                z-index: 10;
                font-weight: 500;
            `;
            
            block.style.position = 'relative';
            block.appendChild(copyBtn);
            
            // Show copy button on hover
            block.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });
            
            block.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });
            
            // Copy functionality
            copyBtn.addEventListener('click', async () => {
                const code = block.querySelector('code');
                if (code) {
                    try {
                        await navigator.clipboard.writeText(code.textContent);
                        copyBtn.innerHTML = 'Copied!';
                        copyBtn.style.background = 'var(--accent-tertiary)';
                        
                        setTimeout(() => {
                            copyBtn.innerHTML = 'Copy';
                            copyBtn.style.background = 'var(--accent-primary)';
                        }, 2000);
                    } catch (err) {
                        copyBtn.innerHTML = 'Error';
                        copyBtn.style.background = 'var(--accent-secondary)';
                        
                        setTimeout(() => {
                            copyBtn.innerHTML = 'Copy';
                            copyBtn.style.background = 'var(--accent-primary)';
                        }, 2000);
                    }
                }
            });
        });
    }
    
    // Add CSS for new animations
    addAnimationCSS();

    // Show secret message
    function showSecretMessage() {
        const message = document.createElement('div');
        message.className = 'secret-message';
        message.innerHTML = `
            <div class="secret-content">
                <h3>Secret Trans Theme Activated!</h3>
                <p>You discovered the hidden "I V Y" sequence!</p>
                <p>This theme celebrates the creator, as well as the other Queer and Trans people in the Myco community.<br><br><i>With love from <strong>Ivy Mycelia</strong></i></p>
            </div>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--accent-primary-trans), var(--accent-secondary-trans));
            color: var(--text-primary-trans);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            z-index: 10000;
            animation: secretReveal 0.8s var(--elastic);
            text-align: center;
            max-width: 400px;
        `;
        
        document.body.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.style.animation = 'secretHide 0.5s ease forwards';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }
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
        
        @keyframes secretReveal {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes secretHide {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
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

// Community page functionality
function initializeCommunityPage() {
    if (!document.querySelector('.community-main')) return;
    
    // Filter functionality
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            filterSections(selectedCategory);
        });
    }
    
    // Category navigation
    const categoryLinks = document.querySelectorAll('.community-nav a[href^="#"]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Filter sections by category
            const category = this.getAttribute('href').substring(1);
            filterSections(category);
        });
    });
    
    // Section hover effects and animations
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
        
        // Enhanced hover effects
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
            this.style.boxShadow = '0 16px 40px var(--shadow-medium)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 12px 30px var(--shadow-medium)';
        });
    });
    
    // Empty state hover effects
    const emptyStates = document.querySelectorAll('.empty-state');
    emptyStates.forEach(emptyState => {
        emptyState.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.borderColor = 'var(--accent-primary)';
        });
        
        emptyState.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'var(--border-primary)';
        });
    });
}

function filterSections(category) {
    const sections = document.querySelectorAll('.content-section');
    const filterSelect = document.querySelector('.filter-select');
    
    // Update filter select if called from navigation
    if (filterSelect && filterSelect.value !== category) {
        filterSelect.value = category;
    }
    
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        
        if (category === 'all' || category === '') {
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else if (category === sectionId) {
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            section.style.display = 'none';
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        }
    });
    
    // Add smooth animation to visible sections
    const visibleSections = Array.from(sections).filter(section => section.style.display !== 'none');
    visibleSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Initialize community page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCommunityPage();
});
