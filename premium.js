// Premium animations and interactions
class PremiumAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createProgressBar();
        this.setupSmoothScroll();
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        this.setupHoverEffects();
        this.setupKeyboardNavigation();
    }

    // Progress bar at top
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--primary-light), var(--primary-lighter));
            z-index: 9999;
            transition: width 0.3s ease;
            box-shadow: 0 2px 10px rgba(124, 58, 237, 0.3);
        `;
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Enhanced smooth scrolling
    setupSmoothScroll() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        let isScrolling = false;

        const smoothScrollTo = (targetSlide) => {
            if (isScrolling) return;
            isScrolling = true;
            
            slides[targetSlide].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add slide transition effect
            slides.forEach((slide, index) => {
                slide.style.transform = index < targetSlide ? 'translateY(-20px)' : 
                                       index > targetSlide ? 'translateY(20px)' : 'translateY(0)';
                slide.style.opacity = index === targetSlide ? '1' : '0.7';
            });

            setTimeout(() => {
                isScrolling = false;
                slides.forEach(slide => {
                    slide.style.transform = 'translateY(0)';
                    slide.style.opacity = '1';
                });
            }, 800);
        };

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                currentSlide = Math.min(currentSlide + 1, slides.length - 1);
                smoothScrollTo(currentSlide);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentSlide = Math.max(currentSlide - 1, 0);
                smoothScrollTo(currentSlide);
            }
        });

        // Click navigation
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.step-content') && !e.target.closest('.cost-card')) {
                currentSlide = Math.min(currentSlide + 1, slides.length - 1);
                smoothScrollTo(currentSlide);
            }
        });
    }

    // Intersection Observer for staggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Staggered animation for cost cards
                    if (element.classList.contains('cost-grid')) {
                        const cards = element.querySelectorAll('.cost-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.transform = 'translateY(0) scale(1)';
                                card.style.opacity = '1';
                                this.animateCounter(card);
                            }, index * 200);
                        });
                    }
                    
                    // Roadmap steps animation
                    if (element.classList.contains('step')) {
                        setTimeout(() => {
                            element.style.transform = 'translateX(0)';
                            element.style.opacity = '1';
                        }, 100);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.cost-grid, .step').forEach(el => {
            observer.observe(el);
        });

        // Initialize cost cards for animation
        document.querySelectorAll('.cost-card').forEach(card => {
            card.style.transform = 'translateY(30px) scale(0.9)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    }

    // Parallax mouse effects
    setupParallaxEffects() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Parallax for cost cards
            document.querySelectorAll('.cost-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - cardCenterX) / 20;
                const deltaY = (e.clientY - cardCenterY) / 20;
                
                card.style.transform += ` perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
            });

            // Background gradient shift
            const slide1 = document.querySelector('.slide-1');
            if (slide1) {
                const gradientX = 135 + (mouseX - 0.5) * 20;
                slide1.style.background = `linear-gradient(${gradientX}deg, var(--primary-color) 0%, var(--primary-light) 100%)`;
            }
        });
    }

    // Typing effect for titles
    setupTypingEffect() {
        const typeWriter = (element, text, speed = 50) => {
            element.innerHTML = '';
            let i = 0;
            
            const type = () => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            element.style.borderRight = '2px solid var(--primary-lighter)';
            element.style.animation = 'blink 1s infinite';
            type();
        };

        // Add blink animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { border-right-color: var(--primary-lighter); }
                51%, 100% { border-right-color: transparent; }
            }
        `;
        document.head.appendChild(style);

        // Apply to problem titles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    const text = entry.target.textContent;
                    entry.target.dataset.typed = 'true';
                    setTimeout(() => {
                        typeWriter(entry.target, text, 30);
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.problem-title, .roadmap-title').forEach(title => {
            observer.observe(title);
        });
    }

    // Counter animations
    setupCounterAnimations() {
        // This will be called from intersection observer
    }

    animateCounter(card) {
        const valueElement = card.querySelector('.cost-value');
        if (!valueElement) return;

        const text = valueElement.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        
        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            valueElement.textContent = Math.floor(current) + suffix;
        }, 50);
    }

    // Enhanced hover effects
    setupHoverEffects() {
        // Cost cards hover
        document.querySelectorAll('.cost-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform += ' translateY(-8px) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3)';
                
                // Shimmer effect
                const shimmer = card.querySelector('::before');
                if (shimmer) {
                    shimmer.style.animationDuration = '0.5s';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = card.style.transform.replace(' translateY(-8px) scale(1.05)', '');
                card.style.boxShadow = '';
            });
        });

        // Step content hover
        document.querySelectorAll('.step-content').forEach(step => {
            step.addEventListener('mouseenter', () => {
                step.style.transform = 'translateY(-4px) scale(1.02)';
                step.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.15)';
            });

            step.addEventListener('mouseleave', () => {
                step.style.transform = 'translateY(-2px)';
                step.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.12)';
            });
        });

        // Quote block pulse on hover
        document.querySelectorAll('.quote-block').forEach(quote => {
            quote.addEventListener('mouseenter', () => {
                quote.style.transform = 'scale(1.02)';
                quote.style.borderLeftColor = 'var(--primary-lightest)';
            });

            quote.addEventListener('mouseleave', () => {
                quote.style.transform = 'scale(1)';
                quote.style.borderLeftColor = 'var(--primary-lighter)';
            });
        });
    }

    // Keyboard navigation enhancements
    setupKeyboardNavigation() {
        // Add visual feedback for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'ArrowUp') {
                document.body.classList.add('keyboard-navigation');
                
                // Show navigation hint
                this.showNavigationHint();
            }
        });

        // Remove keyboard class on mouse use
        document.addEventListener('mousemove', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    showNavigationHint() {
        if (document.querySelector('.nav-hint')) return;

        const hint = document.createElement('div');
        hint.className = 'nav-hint';
        hint.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(124, 58, 237, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.8rem;
            z-index: 1000;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        hint.innerHTML = '⬆️⬇️ Navigate • Space = Next';
        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.opacity = '1';
            hint.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            hint.style.opacity = '0';
            hint.style.transform = 'translateY(20px)';
            setTimeout(() => hint.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumAnimations();
});

// Add some CSS for enhanced effects
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    body.keyboard-navigation *:focus {
        outline: 2px solid var(--primary-lighter);
        outline-offset: 2px;
    }
    
    .cost-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .step-content {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .quote-block {
        transition: all 0.3s ease;
    }
    
    /* Improved shimmer animation */
    .cost-card::before {
        transition: animation-duration 0.3s ease;
    }
    
    /* Smooth slide transitions */
    .slide {
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
    }
`;
document.head.appendChild(enhancedStyles);
