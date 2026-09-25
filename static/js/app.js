// Smooth scroll untuk navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation indicator
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Navbar Scrolled Effect
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });


        // Scroll Reveal & Blur Animation
        function reveal() {
            var reveals = document.querySelectorAll(".reveal, .blur-reveal");
            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 50;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                }
            }
        }
        window.addEventListener("scroll", reveal);
        reveal(); // Trigger on load

        // Randomize the opening text sequence without changing its layout order.
        const aboutTextItems = Array.from(document.querySelectorAll('.about-service-content > *'));
        const shuffledAboutItems = [...aboutTextItems].sort(() => Math.random() - 0.5);
        shuffledAboutItems.forEach((item, index) => {
            item.style.setProperty('--about-delay', `${index * 0.14}s`);
        });

        // Product image lightbox
        const productLightbox = document.querySelector('[data-product-lightbox]');
        const lightboxImage = productLightbox.querySelector('[data-lightbox-image]');
        const lightboxClose = productLightbox.querySelector('[data-lightbox-close]');

        const closeProductLightbox = () => {
            productLightbox.classList.remove('is-open');
            productLightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        document.querySelectorAll('.apple-img-container img').forEach(image => {
            image.addEventListener('click', () => {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                productLightbox.classList.add('is-open');
                productLightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        productLightbox.addEventListener('click', closeProductLightbox);
        lightboxClose.addEventListener('click', closeProductLightbox);
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeProductLightbox();
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
