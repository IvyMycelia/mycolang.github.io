// Main JavaScript for Myco Language Website
class MycoWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupCodeCopy();
        this.setupSmoothScrolling();
        this.setupTypingEffect();
        this.setupParallaxEffects();
        this.setupSearchFunctionality();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        // DOM ready event
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('load', () => this.handlePageLoad());
    }

    onDOMReady() {
        console.log('🍄 Myco Website initialized');
        this.setupIntersectionObserver();
        this.initializeCounters();
        this.setupTooltips();
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Animate hamburger to X
                const spans = mobileToggle.querySelectorAll('span');
                if (mobileToggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                });
            });
        }
    }

    setupScrollEffects() {
        let ticking = false;
        
        const updateHeader = () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-animate');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    initializeAnimations() {
        // Add entrance animations
        this.addEntranceAnimations();
        
        // Add hover animations
        this.addHoverAnimations();
        
        // Add loading animations
        this.addLoadingAnimations();
    }

    addEntranceAnimations() {
        const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    addHoverAnimations() {
        // Feature cards hover effect
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }

    addLoadingAnimations() {
        // Add loading state to buttons
        const buttons = document.querySelectorAll('.btn[data-loading]');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('loading');
                btn.disabled = true;
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    btn.classList.remove('loading');
                    btn.disabled = false;
                }, 2000);
            });
        });
    }

    setupCodeCopy() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const codeBlock = btn.closest('.code-container').querySelector('pre code');
                const text = codeBlock.textContent;
                
                try {
                    await navigator.clipboard.writeText(text);
                    this.showCopySuccess(btn);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    this.showCopyError(btn);
                }
            });
        });
    }

    showCopySuccess(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓</span> Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }

    showCopyError(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✗</span> Failed';
        btn.style.background = '#dc3545';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--accent)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            // Start typing when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (searchInput && searchResults) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                
                searchTimeout = setTimeout(() => {
                    const query = e.target.value.trim();
                    if (query.length > 2) {
                        this.performSearch(query);
                    } else {
                        searchResults.style.display = 'none';
                    }
                }, 300);
            });
        }
    }

    async performSearch(query) {
        // This would typically call an API or search through indexed content
        // For now, we'll simulate search results
        const results = this.simulateSearch(query);
        this.displaySearchResults(results);
    }

    simulateSearch(query) {
        // Simulate search results based on common Myco terms
        const searchData = [
            { title: 'Variables', content: 'Learn about let declarations and dynamic typing', url: '#variables' },
            { title: 'Functions', content: 'Function syntax and arrow functions', url: '#functions' },
            { title: 'Control Flow', content: 'If statements, loops, and switch cases', url: '#control-flow' },
            { title: 'Data Structures', content: 'Lists, maps, and object manipulation', url: '#data-structures' },
            { title: 'Error Handling', content: 'Try-catch blocks and error management', url: '#error-handling' }
        ];
        
        return searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );
    }

    displaySearchResults(results) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            const resultsHTML = results.map(result => `
                <div class="search-result">
                    <h4><a href="${result.url}">${result.title}</a></h4>
                    <p>${result.content}</p>
                </div>
            `).join('');
            
            searchResults.innerHTML = resultsHTML;
        }
        
        searchResults.style.display = 'block';
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                
                // Update toggle button
                themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            });
            
            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '☀️';
            }
        }
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start counter when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            element.addEventListener('mouseenter', (e) => {
                tooltip.style.display = 'block';
                this.positionTooltip(tooltip, e);
            });
            
            element.addEventListener('mousemove', (e) => {
                this.positionTooltip(tooltip, e);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }

    positionTooltip(tooltip, event) {
        const rect = tooltip.getBoundingClientRect();
        const x = event.clientX + 10;
        const y = event.clientY - rect.height - 10;
        
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }

    handleScroll() {
        // Additional scroll-based animations
        this.updateProgressBars();
        this.updateScrollIndicators();
    }

    handleResize() {
        // Handle responsive behavior
        this.updateMobileMenu();
        this.updateLayout();
    }

    handlePageLoad() {
        // Page load animations
        this.animatePageLoad();
        this.preloadImages();
    }

    updateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const progress = bar.dataset.progress || 0;
                bar.style.width = `${progress}%`;
            }
        });
    }

    updateScrollIndicators() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = `${scrolled}%`;
        }
    }

    updateMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
        }
    }

    updateLayout() {
        // Update layout based on screen size
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
    }

    animatePageLoad() {
        // Add entrance animations for page elements
        const elements = document.querySelectorAll('.page-load-animate');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 100);
        });
    }

    preloadImages() {
        // Preload important images
        const images = [
            '/images/hero-bg.jpg',
            '/images/features-bg.jpg',
            '/images/docs-bg.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    new MycoWebsite();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MycoWebsite;
}
