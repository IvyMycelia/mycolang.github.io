// Enhanced JavaScript for Myco Language Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme management
    const themes = ['dark', 'light'];
    let currentThemeIndex = 0;
    
    // Secret trans theme activation
    let secretSequence = '';
    let lastKeyTime = 0;
    
    // Mobile menu state
    let isMobileMenuOpen = false;
    
    // Community posts pagination
    let currentPage = 1;
    const postsPerPage = 1; // Show only one post at a time
    let allPosts = [];
    
    // Initialize theme with smooth transitions
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
    
    // Enhanced mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    if (mobileMenuBtn && navMenu) {
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobileMenuOpen && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize (if switching to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Enhanced mobile menu navigation
        const mobileNavLinks = navMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close mobile menu when a link is clicked
                closeMobileMenu();
                
                // Add active state to clicked link
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        isMobileMenuOpen = true;
        mobileMenuBtn.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        header.classList.add('mobile-menu-open');
        
        // Add focus trap for accessibility
        const firstLink = navMenu.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    }
    
    function closeMobileMenu() {
        isMobileMenuOpen = false;
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        header.classList.remove('mobile-menu-open');
        
        // Return focus to menu button
        mobileMenuBtn.focus();
    }
    
    // Touch-friendly interactions for mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        // Add touch feedback to buttons
        const touchButtons = document.querySelectorAll('.btn, .theme-toggle, .nav-menu a');
        touchButtons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = '';
            });
        });
        
        // Prevent double-tap zoom on buttons
        touchButtons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
        
        // Add swipe gestures for mobile menu (optional enhancement)
        let touchStartX = 0;
        let touchEndX = 0;
        
        navMenu.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        navMenu.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - could be used for additional navigation
                    console.log('Swiped left');
                } else {
                    // Swipe right - close menu
                    closeMobileMenu();
                }
            }
        }
    }
    
    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            cycleTheme();
        });
        
        // Add touch feedback for mobile
        if ('ontouchstart' in window) {
            themeToggle.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            themeToggle.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        }
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
    
    // Smooth scrolling for anchor links with mobile consideration
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const mobileOffset = window.innerWidth <= 768 ? 20 : 40;
                const targetPosition = targetElement.offsetTop - headerHeight - mobileOffset;
                
                // Close mobile menu if open
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
                
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
    
    // Mobile scroll-triggered visibility effects - DISABLED
    // No effects or highlights on mobile - clean and simple
    if (window.innerWidth <= 768) {
        // Remove any existing visible classes
        const mobileElements = document.querySelectorAll('.feature, .example, .step, .docs-content section');
        mobileElements.forEach(el => {
            el.classList.remove('visible');
            el.style.opacity = '';
            el.style.transform = '';
        });
    }
    
    // Theme functions
    function initTheme() {
        // Check for trans theme first (highest priority)
        const transThemeActive = localStorage.getItem('myco-trans-theme') === 'true';
        const savedTheme = localStorage.getItem('myco-theme');
        
        console.log('Initializing theme. Trans theme active:', transThemeActive, 'Saved theme:', savedTheme);
        
        if (transThemeActive) {
            // Trans theme takes precedence over regular theme selection
            console.log('Applying trans theme (overrides regular theme)');
            setTheme('trans');
            // Keep the light theme state if it was previously active
            if (savedTheme === 'light') {
                document.documentElement.classList.add('light-theme');
                document.body.classList.add('light-theme');
            }
            currentThemeIndex = 0; // Reset to dark for next cycle
        } else if (savedTheme && themes.includes(savedTheme)) {
            // Apply saved regular theme
            console.log('Applying saved theme:', savedTheme);
            setTheme(savedTheme);
            currentThemeIndex = themes.indexOf(savedTheme);
        } else {
            // Default to dark theme
            console.log('No saved theme found, defaulting to dark');
            setTheme('dark');
            currentThemeIndex = themes.indexOf('dark');
        }
        updateThemeIcon();
        updateTransToggle();
    }
    
    function cycleTheme() {
        // If trans theme is currently active, cycle between light/dark trans variants
        if (document.body.classList.contains('trans-theme')) {
            if (document.body.classList.contains('light-theme')) {
                // Currently light trans, switch to dark trans
                document.documentElement.classList.remove('light-theme');
                document.body.classList.remove('light-theme');
                localStorage.setItem('myco-theme', 'dark');
            } else {
                // Currently dark trans, switch to light trans
                document.documentElement.classList.add('light-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('myco-theme', 'light');
            }
            updateThemeIcon();
            return;
        }
        
        // Regular theme cycling (dark ↔ light)
        if (document.body.classList.contains('light-theme')) {
            // Currently light theme, switch to dark
            setTheme('dark');
        } else {
            // Currently dark theme, switch to light
            setTheme('light');
        }
    }
    
    function setTheme(theme) {
        console.log('Setting theme to:', theme);
        
        // Remove all theme classes from both html and body elements
        document.documentElement.classList.remove('light-theme', 'trans-theme');
        document.body.classList.remove('light-theme', 'trans-theme');
        
        // Add new theme class to both html and body elements
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.body.classList.add('light-theme');
            console.log('Added light-theme class to html and body');
        } else if (theme === 'trans') {
            document.documentElement.classList.add('trans-theme');
            document.body.classList.add('trans-theme');
            console.log('Added trans-theme class to html and body');
        } else {
            console.log('No theme class added (dark theme)');
        }
        // dark theme is default (no class needed)
        
        // Save theme preference based on type
        if (theme === 'trans') {
            // Trans theme gets its own storage key and overrides regular theme
            localStorage.setItem('myco-trans-theme', 'true');
            console.log('Saved trans theme to localStorage');
        } else {
            // Regular themes (dark/light) are stored normally
            localStorage.setItem('myco-theme', theme);
            // Clear trans theme when regular theme is selected
            localStorage.removeItem('myco-trans-theme');
            console.log('Saved theme to localStorage:', theme, 'and cleared trans theme');
        }
        
        // Force a repaint to ensure theme is applied
        document.body.offsetHeight;
        
        // Add smooth theme change animation
        document.body.style.transition = 'all 0.3s ease';
        document.documentElement.style.transition = 'all 0.3s ease';
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.body.style.transition = '';
            document.documentElement.style.transition = '';
        }, 300);
        
        // Update theme icon and trans toggle
        updateThemeIcon();
        updateTransToggle();
        
        // Log current theme state for debugging
        console.log('Current body classes:', document.body.className);
        console.log('Current theme state - Light:', document.body.classList.contains('light-theme'), 'Trans:', document.body.classList.contains('trans-theme'));
        
        // Check if CSS variables are being applied
        const computedStyle = getComputedStyle(document.body);
        console.log('Background color:', computedStyle.backgroundColor);
        console.log('Text color:', computedStyle.color);
    }
    
    function disableTransTheme() {
        console.log('Disabling trans theme');
        localStorage.removeItem('myco-trans-theme');
        
        // Get the last saved regular theme or default to dark
        const savedTheme = localStorage.getItem('myco-theme') || 'dark';
        setTheme(savedTheme);
        
        // Show notification
        showNotification('Trans theme disabled', 'info');
    }
    
    function updateTransToggle() {
        const navControls = document.querySelector('.nav-controls');
        let transToggle = document.querySelector('.trans-toggle');
        
        if (document.body.classList.contains('trans-theme')) {
            // Create trans toggle button if it doesn't exist
            if (!transToggle) {
                transToggle = document.createElement('button');
                transToggle.className = 'trans-toggle';
                transToggle.innerHTML = '<span class="trans-icon">⚧</span><span class="trans-text">Off</span>';
                transToggle.title = 'Disable Trans Theme';
                transToggle.addEventListener('click', disableTransTheme);
                
                // Insert after theme toggle
                const themeToggle = document.querySelector('.theme-toggle');
                if (themeToggle && themeToggle.parentNode) {
                    themeToggle.parentNode.insertBefore(transToggle, themeToggle.nextSibling);
                }
            }
        } else {
            // Remove trans toggle button if it exists
            if (transToggle) {
                transToggle.remove();
            }
        }
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
        
        if (document.body.classList.contains('trans-theme')) {
            // Trans theme is active - show current variant
            if (document.body.classList.contains('light-theme')) {
                themeIcon.textContent = '☀';
                themeText.textContent = 'Dark Trans';
                themeToggle.title = 'Switch to Dark Trans theme (Ctrl+T)';
            } else {
                themeIcon.textContent = '☾';
                themeText.textContent = 'Light Trans';
                themeToggle.title = 'Switch to Light Trans theme (Ctrl+T)';
            }
        } else if (document.body.classList.contains('light-theme')) {
            // Regular light theme
            themeIcon.textContent = '☾';
            themeText.textContent = 'Dark';
            themeToggle.title = 'Switch to Dark theme (Ctrl+T)';
        } else {
            // Regular dark theme (default)
            themeIcon.textContent = '☀';
            themeText.textContent = 'Light';
            themeToggle.title = 'Switch to Light theme (Ctrl+T)';
        }
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-primary);
            border-radius: 8px;
            padding: 12px 20px;
            box-shadow: 0 4px 15px var(--shadow-medium);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: notificationSlideIn 0.3s ease;
            max-width: 300px;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'notificationSlideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
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
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'secret-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 9999;
            animation: overlayFadeIn 0.3s ease;
        `;
        
        // Create message container
        const message = document.createElement('div');
        message.className = 'secret-message';
        message.innerHTML = `
            <div class="secret-content">
                <div class="secret-header">
                    <span class="secret-icon">✨</span>
                    <h3>Secret Trans Theme Discovered!</h3>
                    <span class="secret-icon">✨</span>
                </div>
                <div class="secret-body">
                    <p class="secret-text">You found the hidden "I V Y" sequence!</p>
                    <p class="secret-description">This special theme celebrates the creator and the Queer and Trans community in Myco.</p>
                    <div class="secret-heart">
                        <span>💖</span>
                        <p><i>With love from <strong>Ivy Mycelia</strong></i></p>
                        <span>💖</span>
                    </div>
                </div>
                <button class="secret-close-btn">Continue</button>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--accent-primary-trans), var(--accent-secondary-trans));
            color: var(--text-primary-trans);
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 100px rgba(255, 105, 180, 0.3);
            z-index: 10000;
            animation: secretReveal 0.8s var(--elastic);
            text-align: center;
            max-width: 450px;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        
        // Add close button functionality
        const closeBtn = message.querySelector('.secret-close-btn');
        closeBtn.addEventListener('click', () => {
            overlay.style.animation = 'overlayFadeOut 0.3s ease forwards';
            message.style.animation = 'secretHide 0.5s ease forwards';
            setTimeout(() => {
                overlay.remove();
                message.remove();
            }, 500);
        });
        
        // Add click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.animation = 'overlayFadeOut 0.3s ease forwards';
                message.style.animation = 'secretHide 0.5s ease forwards';
                setTimeout(() => {
                    overlay.remove();
                    message.remove();
                }, 500);
            }
        });
        
        // Add to DOM
        document.body.appendChild(overlay);
        document.body.appendChild(message);
        
        // Auto-remove after 8 seconds if not manually closed
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'overlayFadeOut 0.3s ease forwards';
                message.style.animation = 'secretHide 0.5s ease forwards';
                setTimeout(() => {
                    if (overlay.parentNode) overlay.remove();
                    if (message.parentNode) message.remove();
                }, 500);
            }
        }, 8000);
    }
    
    // Show subtle notification when trans theme is loaded from localStorage
    function showTransThemeNotification() {
        const notification = document.createElement('div');
        notification.className = 'trans-theme-notification';
        notification.innerHTML = `
            <span class="notification-icon">✨</span>
            <span class="notification-text">Trans theme active</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-primary-trans), var(--accent-secondary-trans));
            color: var(--text-primary-trans);
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
            z-index: 9998;
            animation: notificationSlideIn 0.5s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.5s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 500);
        }, 3000);
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
                transform: translate(-50%, -50%) scale(0.5) rotate(-5deg);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
        }
        
        @keyframes secretHide {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(-5deg);
            }
        }
        
        @keyframes overlayFadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        
        @keyframes overlayFadeOut {
            0% {
                opacity: 1;
            }
            100% {
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

// Community posts pagination functionality
function initCommunityPagination() {
    const postsContainer = document.getElementById('posts-container');
    const pagination = document.querySelector('.pagination');
    
    if (!postsContainer || !pagination) return;
    
    // Get all posts (now using content-section instead of .post class)
    allPosts = Array.from(postsContainer.querySelectorAll('.content-section'));
    
    // Initialize pagination
    updatePagination();
    showPage(1);
    
    // Add event listeners
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => changePage(currentPage + 1));
    
    pageNumbers.forEach(number => {
        number.addEventListener('click', () => {
            const page = parseInt(number.dataset.page);
            changePage(page);
        });
    });
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(allPosts.length / postsPerPage)) return;
    
    currentPage = page;
    showPage(page);
    updatePagination();
    
    // Update URL hash for direct linking
    const activePost = allPosts[(page - 1) * postsPerPage];
    if (activePost) {
        window.location.hash = activePost.id;
    }
}

function showPage(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    console.log(`Showing page ${page}, posts ${startIndex} to ${endIndex - 1}`); // Debug log
    
    allPosts.forEach((post, index) => {
        if (index >= startIndex && index < endIndex) {
            post.style.display = 'block';
            post.style.visibility = 'visible';
            post.style.opacity = '1';
            console.log(`Showing post ${index + 1}: ${post.querySelector('h3').textContent}`); // Debug log
        } else {
            post.style.display = 'none';
            post.style.visibility = 'hidden';
            post.style.opacity = '0';
            console.log(`Hiding post ${index + 1}: ${post.querySelector('h3').textContent}`); // Debug log
        }
    });
}

function updatePagination() {
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const paginationNumbers = document.querySelector('.pagination-numbers');
    
    // Update button states
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    
    // Clear existing page numbers
    paginationNumbers.innerHTML = '';
    
    // Create page numbers dynamically
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.className = 'page-number';
        pageNumber.dataset.page = i;
        pageNumber.textContent = i;
        pageNumber.classList.toggle('active', i === currentPage);
        
        // Add click event listener
        pageNumber.addEventListener('click', () => changePage(i));
        
        paginationNumbers.appendChild(pageNumber);
    }
}

// Initialize community pagination when page loads
if (document.getElementById('posts-container')) {
    initCommunityPagination();
}

// Share post functionality
function sharePost(postId, postTitle) {
    const postUrl = `${window.location.origin}${window.location.pathname}#${postId}`;
    
    // Try to use native sharing if available (mobile)
    if (navigator.share) {
        navigator.share({
            title: `${postTitle} - Myco Community`,
            text: `Check out this post from the Myco Community: ${postTitle}`,
            url: postUrl
        }).catch(err => {
            // Fallback to clipboard if sharing fails
            copyToClipboard(postUrl, postTitle);
        });
    } else {
        // Fallback for desktop - copy to clipboard
        copyToClipboard(postUrl, postTitle);
    }
}

function copyToClipboard(url, title) {
    navigator.clipboard.writeText(url).then(() => {
        // Show success message
        showShareMessage('Link copied to clipboard!');
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showShareMessage('Link copied to clipboard!');
    });
}

function showShareMessage(message) {
    // Create or update message element
    let messageEl = document.getElementById('share-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'share-message';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: var(--bg-primary);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px var(--shadow-medium);
            z-index: 1000;
            font-size: 0.9rem;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.opacity = '1';
    messageEl.style.transform = 'translateX(0)';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
    }, 3000);
}
