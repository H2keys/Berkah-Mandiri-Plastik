const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll untuk navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
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

        const updateScrollState = () => {
            scrollUpdatePending = false;
            nav.classList.toggle('scrolled', window.scrollY > 50);

            let current = '';
            sections.forEach(section => {
                if (section.getBoundingClientRect().top <= 200) current = section.id;
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        };

        window.addEventListener('scroll', () => {
            if (scrollUpdatePending) return;
            scrollUpdatePending = true;
            window.requestAnimationFrame(updateScrollState);
        }, { passive: true });
        window.addEventListener('resize', updateScrollState, { passive: true });
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
