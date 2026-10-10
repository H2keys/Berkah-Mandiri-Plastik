const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeToggle = document.querySelector('[data-theme-toggle]');
const navMenuToggle = document.querySelector('[data-nav-toggle]');
const mobileNavPanel = document.querySelector('[data-mobile-nav-panel]');
const root = document.documentElement;
let activeTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';

const closeMobileNav = () => {
    if (!navMenuToggle || !mobileNavPanel) return;
    navMenuToggle.classList.remove('is-open');
    navMenuToggle.setAttribute('aria-expanded', 'false');
    mobileNavPanel.classList.remove('is-open');
    mobileNavPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
};

const toggleMobileNav = () => {
    if (!navMenuToggle || !mobileNavPanel) return;
    const isOpen = navMenuToggle.classList.toggle('is-open');
    navMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNavPanel.classList.toggle('is-open', isOpen);
    mobileNavPanel.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('nav-open', isOpen);
};

const syncThemeToggle = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    const label = `Aktifkan mode ${nextTheme === 'dark' ? 'gelap' : 'terang'}`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
    themeToggle.setAttribute('aria-pressed', String(activeTheme === 'dark'));
};

const applyTheme = theme => {
    activeTheme = theme;
    root.dataset.theme = theme;
    try {
        localStorage.setItem('bmp-theme', theme);
    } catch { }
    syncThemeToggle();
};

syncThemeToggle();

if (navMenuToggle && mobileNavPanel) {
    navMenuToggle.addEventListener('click', toggleMobileNav);
    mobileNavPanel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    document.addEventListener('click', event => {
        const clickedWithinNav = navMenuToggle.contains(event.target) || mobileNavPanel.contains(event.target);
        if (!clickedWithinNav) closeMobileNav();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMobileNav();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMobileNav();
    }, { passive: true });
}

themeToggle.addEventListener('click', () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    if (prefersReducedMotion || typeof document.startViewTransition !== 'function') {
        root.classList.add('theme-switching');
        applyTheme(nextTheme);
        window.setTimeout(() => root.classList.remove('theme-switching'), 500);
        return;
    }

    const buttonBounds = themeToggle.getBoundingClientRect();
    const originX = buttonBounds.left + buttonBounds.width / 2;
    const originY = buttonBounds.top + buttonBounds.height / 2;
    const transition = document.startViewTransition(() => applyTheme(nextTheme));

    transition.ready.then(() => {
        const radius = Math.max(
            Math.hypot(originX, originY),
            Math.hypot(window.innerWidth - originX, originY),
            Math.hypot(originX, window.innerHeight - originY),
            Math.hypot(window.innerWidth - originX, window.innerHeight - originY)
        );
        root.animate({
            clipPath: [`circle(0px at ${originX}px ${originY}px)`, `circle(${radius}px at ${originX}px ${originY}px)`]
        }, {
            duration: 650,
            easing: 'ease-in-out',
            fill: 'both',
            pseudoElement: '::view-transition-new(root)'
        });
    }).catch(() => { });

    transition.finished.finally(() => root.style.removeProperty('--theme-origin'));
});

// Smooth scroll untuk navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    if (this.matches('.nav-links a') && target.matches('main section[id]')) {
                        navigationTargetId = target.id;
                        updateScrollState();
                    }
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Keep scroll work to one animation frame and reveal content as it approaches the viewport.
        const nav = document.querySelector('nav');
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        const navLinks = document.querySelectorAll('.nav-links a');
        let scrollUpdatePending = false;
        let navigationTargetId = null;

        const updateScrollState = () => {
            scrollUpdatePending = false;
            nav.classList.toggle('scrolled', window.scrollY > 50);

            let current = '';
            if (navigationTargetId) {
                const target = document.getElementById(navigationTargetId);
                if (!target || Math.abs(target.getBoundingClientRect().top) <= 200) navigationTargetId = null;
                else current = navigationTargetId;
            }

            if (!current) {
                sections.forEach(section => {
                    if (section.getBoundingClientRect().top <= 200) current = section.id;
                });
            }

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        };

        const clearNavigationTarget = () => {
            if (!navigationTargetId) return;
            navigationTargetId = null;
            updateScrollState();
        };

        window.addEventListener('scroll', () => {
            if (scrollUpdatePending) return;
            scrollUpdatePending = true;
            window.requestAnimationFrame(updateScrollState);
        }, { passive: true });
        window.addEventListener('resize', updateScrollState, { passive: true });
        window.addEventListener('wheel', clearNavigationTarget, { passive: true });
        window.addEventListener('touchstart', clearNavigationTarget, { passive: true });
        window.addEventListener('keydown', event => {
            if (['ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', ' '].includes(event.key)) {
                clearNavigationTarget();
            }
        });
        updateScrollState();

        const revealTargets = document.querySelectorAll('.reveal, .blur-reveal');
        if ('IntersectionObserver' in window && !prefersReducedMotion) {
            const revealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                });
            }, { rootMargin: '0px 0px -50px 0px' });

            revealTargets.forEach(target => revealObserver.observe(target));
        } else {
            revealTargets.forEach(target => target.classList.add('active'));
        }

        // Product image lightbox
        const productLightbox = document.querySelector('[data-product-lightbox]');
        const lightboxImage = productLightbox.querySelector('[data-lightbox-image]');
        const lightboxClose = productLightbox.querySelector('[data-lightbox-close]');
        let lightboxReturnFocus = null;

        const closeProductLightbox = () => {
            productLightbox.classList.remove('is-open');
            productLightbox.setAttribute('aria-hidden', 'true');
            productLightbox.setAttribute('inert', '');
            document.body.style.overflow = '';
            lightboxReturnFocus?.focus();
        };

        const openProductLightbox = image => {
            lightboxReturnFocus = image;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            productLightbox.removeAttribute('inert');
            productLightbox.classList.add('is-open');
            productLightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            lightboxClose.focus();
        };

        document.querySelectorAll('.apple-img-container img').forEach(image => {
            image.addEventListener('click', () => openProductLightbox(image));
            image.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                openProductLightbox(image);
            });
        });

        productLightbox.addEventListener('click', event => {
            if (event.target === productLightbox) closeProductLightbox();
        });
        lightboxClose.addEventListener('click', closeProductLightbox);
        document.addEventListener('keydown', event => {
            if (!productLightbox.classList.contains('is-open')) return;
            if (event.key === 'Escape') closeProductLightbox();
            if (event.key === 'Tab') {
                event.preventDefault();
                lightboxClose.focus();
            }
        });

        // Sablon Cup Showcase carousel
        document.querySelectorAll('[data-carousel]').forEach(carousel => {
            const track = carousel.querySelector('[data-carousel-track]');
            const cards = Array.from(track.children);
            const previousButton = carousel.querySelector('[data-carousel-prev]');
            const nextButton = carousel.querySelector('[data-carousel-next]');
            const dotsContainer = carousel.querySelector('[data-carousel-dots]');
            let currentIndex = 0;
            let visibleCards = 3;
            let startX = 0;

            const getVisibleCards = () => window.matchMedia('(max-width: 900px)').matches ? 1 : 3;

            const updateCarousel = () => {
                visibleCards = getVisibleCards();
                const maximumIndex = Math.max(0, cards.length - visibleCards);
                currentIndex = Math.min(currentIndex, maximumIndex);
                const cardWidth = cards[0].getBoundingClientRect().width;
                const gap = parseFloat(getComputedStyle(track).gap) || 0;
                track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

                dotsContainer.replaceChildren();
                for (let index = 0; index <= maximumIndex; index += 1) {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = `carousel-dot${index === currentIndex ? ' is-active' : ''}`;
                    dot.setAttribute('aria-label', `Pilih slide ${index + 1}`);
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                    });
                    dotsContainer.append(dot);
                }

                previousButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex === maximumIndex;
                previousButton.setAttribute('aria-disabled', String(currentIndex === 0));
                nextButton.setAttribute('aria-disabled', String(currentIndex === maximumIndex));
            };

            previousButton.addEventListener('click', () => {
                currentIndex = Math.max(0, currentIndex - 1);
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                const maximumIndex = Math.max(0, cards.length - getVisibleCards());
                currentIndex = Math.min(maximumIndex, currentIndex + 1);
                updateCarousel();
            });

            track.addEventListener('touchstart', event => {
                startX = event.touches[0].clientX;
            }, { passive: true });

            track.addEventListener('touchend', event => {
                const distance = event.changedTouches[0].clientX - startX;
                if (Math.abs(distance) < 40) return;
                currentIndex += distance < 0 ? 1 : -1;
                updateCarousel();
            }, { passive: true });

            window.addEventListener('resize', updateCarousel);
            updateCarousel();
        });
