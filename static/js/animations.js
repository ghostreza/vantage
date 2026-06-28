/* ============================================
   ANIMATIONS.JS - Vantage Solutions
   Advanced Scroll-Triggered Animations
   ============================================ */

class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = null;
        this.counters = new Map();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupObserver());
        } else {
            this.setupObserver();
        }
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('[data-animate]').forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = parseInt(element.getAttribute('data-delay') || '0');

        setTimeout(() => {
            element.classList.add('animated');

            // Trigger specific animations based on type
            switch(animationType) {
                case 'problem-card':
                    this.animateProblemCard(element);
                    break;
                    
                case 'service-block':
                    this.animateServiceBlock(element);
                    break;
                    
                case 'case-card':
                    this.animateCaseCard(element);
                    break;
                    
                case 'pricing-card':
                    this.animatePricingCard(element);
                    break;
                    
                case 'contact-section':
                    this.animateContactSection(element);
                    break;
                    
                case 'problem-heading':
                    const heading = element.querySelector('.heading-underline');
                    if (heading) heading.classList.add('animated');
                    break;
            }
        }, delay);
    }

    animateProblemCard(card) {
        // Animate counter
        const counter = card.querySelector('.counter');
        if (counter && !this.counters.has(counter)) {
            this.counters.set(counter, true);
            this.animateCounter(counter);
        }
    }

    animateServiceBlock(block) {
        // Service block animations are handled by CSS
        // Additional JS logic can be added here if needed
    }

    animateCaseCard(card) {
        // Animate progress bars
        const progressBars = card.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        });
    }

    animatePricingCard(card) {
        // Animate price counter
        const priceElement = card.querySelector('.price-value');
        if (priceElement) {
            const targetPrice = parseInt(priceElement.getAttribute('data-price'));
            const counter = priceElement.querySelector('.counter');
            if (counter && !this.counters.has(counter)) {
                this.counters.set(counter, true);
                this.animateCounter(counter, targetPrice, 1500);
            }
        }
    }

    animateContactSection(section) {
        // Contact section animations are handled by CSS
    }

    animateCounter(element, target = null, duration = 2000) {
        if (!target) {
            target = parseInt(element.getAttribute('data-target'));
        }
        
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}

/* ============================================
   ANIMATION.JS - VANTAGE SOLUTIONS
   Berisi semua custom animations:
   - Jam real-time (section masalah)
   - Typing effect (hero)
   - Data particles (hero)
   - Scroll indicator (hero)
   ============================================ */

(function() {
    'use strict';


    /* ==========================================
       1. JAM ANALOG REAL-TIME (Section Masalah)
       ========================================== */
    function updateClock() {
        const now = new Date();
        
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = now.getHours() % 12 + minutes / 60;
        
        const secondDeg = seconds * 6;
        const minuteDeg = minutes * 6;
        const hourDeg = hours * 30;
        
        const hourHand = document.querySelector('.clock-hour');
        const minuteHand = document.querySelector('.clock-minute');
        const secondHand = document.querySelector('.clock-second');
        
        if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        if (secondHand) secondHand.style.transform = `rotate(${secondDeg}deg)`;
        
        requestAnimationFrame(updateClock);
    }


    /* ==========================================
       2. TYPING EFFECT (Hero Section)
       ========================================== */
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-text');
        
        typingElements.forEach(function(el) {
            const fullText = el.getAttribute('data-text') || el.textContent;
            el.textContent = '';
            el.classList.remove('done');
            
            let index = 0;
            const speed = 60;
            
            function type() {
                if (index < fullText.length) {
                    el.textContent += fullText.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    el.classList.add('done');
                }
            }
            
            setTimeout(type, 400);
        });
    }


    /* ==========================================
       3. DATA PARTICLES (Hero Background)
       ========================================== */
    function initDataParticles() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;
        
        if (window.innerWidth < 768) return;
        
        const symbols = ['{ }', '< />', '01', '[ ]', 'Σ', 'λ', 'f(x)', '&&', '||', '0x', '101', '>>', '##'];
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'data-particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            particle.style.left = Math.random() * 100 + '%';
            
            const duration = 15 + Math.random() * 15;
            const delay = Math.random() * 20;
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = '-' + delay + 's';
            
            const size = 10 + Math.random() * 14;
            particle.style.fontSize = size + 'px';
            
            hero.appendChild(particle);
        }
    }


    /* ==========================================
       4. SCROLL INDICATOR (Hero)
       ========================================== */
    function initScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;
        
        indicator.addEventListener('click', function() {
            const target = document.querySelector('#services');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }


    /* ==========================================
       INITIALIZATION
       ========================================== */
    function init() {
        updateClock();
        initTypingEffect();
        initDataParticles();
        initScrollIndicator();
        
        console.log('✓ All animations initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();