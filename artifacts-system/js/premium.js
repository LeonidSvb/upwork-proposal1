// Scroll-based animations without navigation
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollObserver();
        this.setupCounterAnimations();
        this.setupRoadmapAnimations();
        this.hideElementsInitially();
    }

    // Hide elements initially for reveal animations
    hideElementsInitially() {
        // Hide cost cards
        document.querySelectorAll('.cost-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.8)';
            card.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        // Hide roadmap steps (override CSS animation)
        document.querySelectorAll('.step').forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-50px)';
            step.style.transition = 'all 0.6s ease';
            step.style.animationDelay = 'unset';
            step.style.animation = 'none';
        });

        // Hide quote blocks
        document.querySelectorAll('.quote-block').forEach(quote => {
            quote.style.opacity = '0';
            quote.style.transform = 'translateY(30px)';
            quote.style.transition = 'all 0.6s ease';
            quote.style.animationDelay = 'unset';
            quote.style.animation = 'none';
        });

        // Hide problem reframe
        const problemReframe = document.querySelector('.problem-reframe');
        if (problemReframe) {
            problemReframe.style.opacity = '0';
            problemReframe.style.transform = 'translateY(30px)';
            problemReframe.style.transition = 'all 0.8s ease';
            problemReframe.style.animationDelay = 'unset';
            problemReframe.style.animation = 'none';
        }
    }

    // Main scroll observer
    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Quote blocks
                    if (element.classList.contains('quote-block')) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, 200);
                    }
                    
                    // Problem reframe
                    if (element.classList.contains('problem-reframe')) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, 400);
                    }
                    
                    // Cost grid - animate cards with stagger
                    if (element.classList.contains('cost-grid')) {
                        const cards = element.querySelectorAll('.cost-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                                // Start counter animation
                                this.animateCounter(card);
                            }, index * 200 + 300);
                        });
                    }
                }
            });
        }, observerOptions);

        // Separate observer for roadmap steps
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateX(0)';
                    }, 200);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all animatable elements except steps
        document.querySelectorAll('.quote-block, .problem-reframe, .cost-grid').forEach(el => {
            observer.observe(el);
        });

        // Observe steps separately
        document.querySelectorAll('.step').forEach(step => {
            stepObserver.observe(step);
        });
    }

    // Counter animations for cost cards
    setupCounterAnimations() {
        // Will be called from scroll observer
    }

    animateCounter(card) {
        const valueElement = card.querySelector('.cost-value');
        if (!valueElement) return;

        const originalText = valueElement.textContent;
        
        // Extract number and suffix
        const numberMatch = originalText.match(/(\d+(?:\.\d+)?)/);
        const number = numberMatch ? parseFloat(numberMatch[1]) : 0;
        const prefix = originalText.substring(0, originalText.indexOf(numberMatch ? numberMatch[1] : ''));
        const suffix = originalText.substring((originalText.indexOf(numberMatch ? numberMatch[1] : '') + (numberMatch ? numberMatch[1].length : 0)));
        
        if (number === 0) return;

        let current = 0;
        const increment = number / 60; // 60 frames for smooth animation
        const isDecimal = number % 1 !== 0;
        
        valueElement.textContent = prefix + '0' + suffix;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
            valueElement.textContent = prefix + displayValue + suffix;
        }, 16); // ~60fps
    }

    // Roadmap specific animations
    setupRoadmapAnimations() {
        // Add hover effects for steps (keep the nice interactions)
        document.querySelectorAll('.step-content').forEach(step => {
            step.addEventListener('mouseenter', () => {
                step.style.transform = 'translateY(-4px)';
                step.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.15)';
            });

            step.addEventListener('mouseleave', () => {
                step.style.transform = 'translateY(0)';
                step.style.boxShadow = '0 4px 24px rgba(37, 99, 235, 0.08)';
            });
        });

        // Add subtle hover for cost cards
        document.querySelectorAll('.cost-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// Add enhanced styles for better animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Smooth scrolling for the whole page */
    html {
        scroll-behavior: smooth;
    }
    
    /* Enhanced cost card styling */
    .cost-card {
        will-change: transform, opacity;
    }
    
    /* Enhanced step styling */
    .step {
        will-change: transform, opacity;
    }
    
    /* Improved shimmer effect */
    .cost-card::before {
        will-change: left;
    }
    
    /* Add a subtle glow effect when cards are hovered */
    .cost-card:hover::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, var(--primary-color), var(--primary-light), var(--primary-lighter));
        border-radius: 14px;
        z-index: -1;
        opacity: 0.3;
        filter: blur(8px);
        transition: opacity 0.3s ease;
    }
    
    /* Performance optimizations */
    .slide {
        transform: translateZ(0);
    }
    
    /* Custom scrollbar for better UX */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--background-start);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-light);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-color);
    }
`;
document.head.appendChild(enhancedStyles);
