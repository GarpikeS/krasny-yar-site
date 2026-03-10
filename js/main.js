/**
 * Parametr Clone - Full Animation Copy
 */

(function() {
    'use strict';

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        document.body.classList.remove('js-loading');

        // Всегда скроллим вверх при загрузке
        window.scrollTo(0, 0);
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        Preloader.init();
        Header.init();
        Dropdown.init();
        Menu.init();
        Slider.init();
        FormatsSlider.init();
        Reveal.init();
        Counter.init();
        Parallax.init();
        SmoothScroll.init();
        Forms.init();
        Modal.init();
        Toggle.init();
        Cookie.init();
    }

    /**
     * Preloader - Only show on first visit
     */
    const Preloader = {
        el: null,
        counter: null,
        progress: null,
        current: 0,
        target: 100,
        duration: 2000,

        init() {
            this.el = document.getElementById('preloader');
            this.counter = document.getElementById('preloader-counter');
            this.progress = document.getElementById('preloader-progress');

            if (!this.el) return;

            // Check if this is the first visit to the site
            const hasVisited = sessionStorage.getItem('site-visited');

            if (hasVisited) {
                // Skip preloader for subsequent page visits
                this.skipPreloader();
                return;
            }

            // Mark as visited
            sessionStorage.setItem('site-visited', 'true');

            this.animate();

            window.addEventListener('load', () => {
                this.target = 100;
            });
        },

        skipPreloader() {
            // Immediately hide preloader and show header
            if (this.el) {
                this.el.style.display = 'none';
                this.el.classList.add('is-hidden');
            }
            document.querySelector('.header')?.classList.add('is-visible');
            document.querySelector('.header__logo')?.classList.add('is-visible');
        },

        animate() {
            const start = performance.now();
            const initialTarget = 85; // Go to 85% first, then wait for load

            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / this.duration, 1);

                // Ease out
                const eased = 1 - Math.pow(1 - progress, 3);

                // Calculate current value based on target
                const targetNow = progress < 0.8 ? initialTarget : this.target;
                this.current = Math.min(Math.floor(eased * targetNow), this.target);

                if (this.counter) {
                    this.counter.textContent = this.current;
                }
                if (this.progress) {
                    this.progress.style.width = this.current + '%';
                }

                if (this.current < this.target) {
                    requestAnimationFrame(tick);
                } else {
                    // Counter reached 100, hide preloader
                    setTimeout(() => this.hide(), 200);
                }
            };

            requestAnimationFrame(tick);
        },

        hide() {
            if (!this.el) return;

            const preloaderLogo = this.el.querySelector('.preloader__logo');
            const headerLogo = document.querySelector('.header__logo');

            if (!preloaderLogo || !headerLogo) {
                this.el.classList.add('is-hidden');
                document.querySelector('.header')?.classList.add('is-visible');
                headerLogo?.classList.add('is-visible');
                return;
            }

            // Step 1: Hide counter and progress bar with smooth fade
            this.el.classList.add('is-completing');

            // Step 2: Calculate target position (header logo position)
            setTimeout(() => {
                const headerRect = headerLogo.getBoundingClientRect();
                const preloaderLogoRect = preloaderLogo.getBoundingClientRect();

                // Calculate scale based on logo sizes
                const scaleX = headerRect.width / preloaderLogoRect.width;
                const scaleY = headerRect.height / preloaderLogoRect.height;
                const scale = Math.min(scaleX, scaleY);

                // Calculate target position
                const targetX = headerRect.left + headerRect.width / 2;
                const targetY = headerRect.top + headerRect.height / 2;

                // Show header first (but logo hidden)
                document.querySelector('.header')?.classList.add('is-visible');

                // Step 3: Animate logo flying to header with smooth spring motion
                preloaderLogo.classList.add('is-flying');

                // Use requestAnimationFrame for smoother start
                requestAnimationFrame(() => {
                    preloaderLogo.style.left = targetX + 'px';
                    preloaderLogo.style.top = targetY + 'px';
                    preloaderLogo.style.transform = `translate(-50%, -50%) scale(${scale})`;
                });

                // Step 4: Fade out background smoothly during flight
                setTimeout(() => {
                    this.el.classList.add('is-fading');
                }, 400);

                // Step 5: Smooth crossfade - hide flying logo, show header logo
                setTimeout(() => {
                    preloaderLogo.classList.add('is-hidden');
                    headerLogo.classList.add('is-visible');
                }, 1300);

                // Step 6: Hide preloader overlay
                setTimeout(() => {
                    this.el.classList.add('is-hidden');
                }, 1500);
            }, 500);
        }
    };

    /**
     * Header - hide/show on scroll
     */
    const Header = {
        el: null,
        lastY: 0,
        threshold: 100,

        init() {
            this.el = document.getElementById('header');
            if (!this.el) return;

            // Check if preloader exists and is being shown
            const preloader = document.getElementById('preloader');
            const hasVisited = sessionStorage.getItem('site-visited');

            if (!preloader || hasVisited) {
                // No preloader - show header immediately
                this.el.classList.add('is-visible');
                const logo = document.querySelector('.header__logo');
                if (logo) logo.classList.add('is-visible');
            } else {
                // Has preloader - wait for animation
                setTimeout(() => {
                    this.el.classList.add('is-visible');
                }, 800);
            }

            window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        },

        onScroll() {
            const y = window.scrollY;

            // Scrolled state
            this.el.classList.toggle('is-scrolled', y > 50);

            // Hide/show based on direction
            if (y > this.threshold) {
                if (y > this.lastY && y - this.lastY > 10) {
                    this.el.classList.add('is-up');
                } else if (y < this.lastY && this.lastY - y > 10) {
                    this.el.classList.remove('is-up');
                }
            } else {
                this.el.classList.remove('is-up');
            }

            this.lastY = y;
        }
    };

    /**
     * Header Dropdowns
     */
    const Dropdown = {
        dropdowns: [],
        activeDropdown: null,

        init() {
            this.dropdowns = document.querySelectorAll('.header__dropdown');

            this.dropdowns.forEach(dropdown => {
                const trigger = dropdown.querySelector('button, .header__link--dropdown');
                const menu = dropdown.querySelector('.header__dropdown-menu');

                if (!trigger || !menu) return;

                // Open on trigger hover/click
                trigger.addEventListener('mouseenter', () => {
                    this.open(dropdown);
                });

                // Keep open when hovering menu
                menu.addEventListener('mouseenter', () => {
                    this.open(dropdown);
                });

                // Close when leaving menu
                menu.addEventListener('mouseleave', () => {
                    this.close(dropdown);
                });

                // Close when leaving dropdown area completely
                dropdown.addEventListener('mouseleave', (e) => {
                    // Check if mouse went to the menu
                    const rect = menu.getBoundingClientRect();
                    if (e.clientY < rect.top || e.clientX < rect.left || e.clientX > rect.right) {
                        // Small delay to allow moving to menu
                        setTimeout(() => {
                            if (!dropdown.matches(':hover') && !menu.matches(':hover')) {
                                this.close(dropdown);
                            }
                        }, 100);
                    }
                });
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (this.activeDropdown && !this.activeDropdown.contains(e.target)) {
                    this.close(this.activeDropdown);
                }
            });
        },

        open(dropdown) {
            // Close other dropdowns
            if (this.activeDropdown && this.activeDropdown !== dropdown) {
                this.close(this.activeDropdown);
            }
            dropdown.classList.add('is-open');
            this.activeDropdown = dropdown;
        },

        close(dropdown) {
            dropdown.classList.remove('is-open');
            if (this.activeDropdown === dropdown) {
                this.activeDropdown = null;
            }
        }
    };

    /**
     * Sidebar Menu
     */
    const Menu = {
        burger: null,
        menu: null,
        overlay: null,
        open: false,

        init() {
            this.burger = document.getElementById('burger');
            this.menu = document.getElementById('menu');
            this.overlay = document.getElementById('menu-overlay');

            if (!this.burger || !this.menu) return;

            this.burger.addEventListener('click', () => this.toggle());

            // Close on overlay click
            this.overlay?.addEventListener('click', () => this.close());

            // Close on link
            this.menu.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => this.close());
            });

            // Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.open) this.close();
            });
        },

        toggle() {
            this.open ? this.close() : this.openMenu();
        },

        openMenu() {
            this.open = true;
            this.burger.classList.add('is-active');
            this.menu.classList.add('is-open');
            this.overlay?.classList.add('is-open');
            document.body.classList.add('no-scroll');
        },

        close() {
            this.open = false;
            this.burger.classList.remove('is-active');
            this.menu.classList.remove('is-open');
            this.overlay?.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }
    };

    /**
     * Projects Slider
     */
    const Slider = {
        track: null,
        slides: [],
        prev: null,
        next: null,
        currentEl: null,
        totalEl: null,

        current: 0,
        total: 0,
        visible: 3,
        width: 0,
        gap: 24,

        dragging: false,
        startX: 0,
        currentX: 0,
        startOffset: 0,

        init() {
            this.track = document.getElementById('projects-track');
            this.prev = document.getElementById('prev-project');
            this.next = document.getElementById('next-project');
            this.currentEl = document.getElementById('current-slide');
            this.totalEl = document.getElementById('total-slides');

            if (!this.track) return;

            this.slides = Array.from(this.track.children);
            this.total = this.slides.length;

            this.calc();
            this.update();
            this.bind();
        },

        calc() {
            const w = window.innerWidth;
            this.visible = w <= 768 ? 1 : w <= 992 ? 2 : 3;

            if (this.slides[0]) {
                this.width = this.slides[0].offsetWidth;
            }
        },

        bind() {
            this.prev?.addEventListener('click', () => this.goPrev());
            this.next?.addEventListener('click', () => this.goNext());

            // Resize
            let timer;
            window.addEventListener('resize', () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.calc();
                    this.current = Math.min(this.current, this.max());
                    this.update();
                }, 150);
            });

            // Drag
            this.track.addEventListener('mousedown', (e) => this.dragStart(e));
            this.track.addEventListener('touchstart', (e) => this.dragStart(e), { passive: true });

            document.addEventListener('mousemove', (e) => this.dragMove(e));
            document.addEventListener('touchmove', (e) => this.dragMove(e), { passive: true });

            document.addEventListener('mouseup', () => this.dragEnd());
            document.addEventListener('touchend', () => this.dragEnd());
        },

        dragStart(e) {
            this.dragging = true;
            this.startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            this.startOffset = -(this.width + this.gap) * this.current;
            this.track.style.transition = 'none';
        },

        dragMove(e) {
            if (!this.dragging) return;
            this.currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diff = this.currentX - this.startX;
            this.track.style.transform = `translateX(${this.startOffset + diff}px)`;
        },

        dragEnd() {
            if (!this.dragging) return;
            this.dragging = false;
            this.track.style.transition = '';

            const diff = this.startX - this.currentX;
            const threshold = this.width / 4;

            if (Math.abs(diff) > threshold) {
                if (diff > 0 && this.current < this.max()) {
                    this.current++;
                } else if (diff < 0 && this.current > 0) {
                    this.current--;
                }
            }

            this.update();
        },

        max() {
            return Math.max(0, this.total - this.visible);
        },

        goPrev() {
            if (this.current > 0) {
                this.current--;
                this.update();
            }
        },

        goNext() {
            if (this.current < this.max()) {
                this.current++;
                this.update();
            }
        },

        update() {
            const offset = -(this.width + this.gap) * this.current;
            this.track.style.transform = `translateX(${offset}px)`;

            if (this.currentEl) this.currentEl.textContent = this.current + 1;
            if (this.totalEl) this.totalEl.textContent = this.total;

            if (this.prev) this.prev.disabled = this.current === 0;
            if (this.next) this.next.disabled = this.current >= this.max();
        }
    };

    /**
     * Formats Slider
     */
    const FormatsSlider = {
        track: null,
        slides: [],
        prev: null,
        next: null,
        currentEl: null,
        totalEl: null,

        current: 0,
        total: 0,
        visible: 4,
        width: 0,
        gap: 24,

        init() {
            this.track = document.getElementById('formats-track');
            this.prev = document.getElementById('prev-format');
            this.next = document.getElementById('next-format');
            this.currentEl = document.getElementById('current-format');
            this.totalEl = document.getElementById('total-formats');

            if (!this.track) return;

            this.slides = Array.from(this.track.children);
            this.total = this.slides.length;

            this.calc();
            this.update();
            this.bind();
        },

        calc() {
            const w = window.innerWidth;
            this.visible = w <= 768 ? 1 : w <= 992 ? 2 : w <= 1200 ? 3 : 4;

            if (this.slides[0]) {
                this.width = this.slides[0].offsetWidth;
            }
        },

        bind() {
            this.prev?.addEventListener('click', () => this.goPrev());
            this.next?.addEventListener('click', () => this.goNext());

            let timer;
            window.addEventListener('resize', () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.calc();
                    this.current = Math.min(this.current, this.max());
                    this.update();
                }, 150);
            });
        },

        max() {
            return Math.max(0, this.total - this.visible);
        },

        goPrev() {
            if (this.current > 0) {
                this.current--;
                this.update();
            }
        },

        goNext() {
            if (this.current < this.max()) {
                this.current++;
                this.update();
            }
        },

        update() {
            const offset = -(this.width + this.gap) * this.current;
            this.track.style.transform = `translateX(${offset}px)`;

            if (this.currentEl) this.currentEl.textContent = this.current + 1;
            if (this.totalEl) this.totalEl.textContent = this.total;

            if (this.prev) this.prev.disabled = this.current === 0;
            if (this.next) this.next.disabled = this.current >= this.max();
        }
    };

    /**
     * Scroll Reveal Animations
     */
    const Reveal = {
        init() {
            const els = document.querySelectorAll('[data-reveal]');
            const staggerEls = document.querySelectorAll('.stagger-children');
            const statEls = document.querySelectorAll('.about__stat');

            if ('IntersectionObserver' in window) {
                // Standard reveal observer
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.15,
                    rootMargin: '0px 0px -60px 0px'
                });

                els.forEach(el => observer.observe(el));
                staggerEls.forEach(el => observer.observe(el));
                statEls.forEach(el => observer.observe(el));
            } else {
                els.forEach(el => el.classList.add('is-visible'));
                staggerEls.forEach(el => el.classList.add('is-visible'));
                statEls.forEach(el => el.classList.add('is-visible'));
            }
        }
    };

    /**
     * Counter Animation - Drum/Slot Machine Style
     */
    const Counter = {
        duration: 2500,

        init() {
            const nums = document.querySelectorAll('.about__stat-num');
            if (!nums.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.createDrum(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            nums.forEach(el => {
                el.dataset.target = el.textContent.trim();
                el.textContent = '';
                el.classList.add('counter-drum');
                observer.observe(el);
            });
        },

        createDrum(el) {
            const target = el.dataset.target;
            const chars = target.split('');

            el.innerHTML = '';

            chars.forEach((char, index) => {
                const digitWrap = document.createElement('span');
                digitWrap.className = 'counter-digit-wrap';

                if (/\d/.test(char)) {
                    // It's a number - create drum
                    const digit = parseInt(char);
                    const drum = document.createElement('span');
                    drum.className = 'counter-digit';

                    // Create numbers 0-9 + final digit (11 total spans)
                    let nums = '';
                    for (let i = 0; i <= 9; i++) {
                        nums += `<span>${i}</span>`;
                    }
                    nums += `<span>${digit}</span>`;
                    drum.innerHTML = nums;

                    digitWrap.appendChild(drum);
                    el.appendChild(digitWrap);

                    // Animate with stagger - move to the 11th element (index 10)
                    const delay = index * 100;
                    const spinDuration = this.duration - delay;

                    setTimeout(() => {
                        drum.style.transition = `transform ${spinDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
                        // Move up by 10em to show the 11th span (each span is 1em tall)
                        drum.style.transform = `translateY(-10em)`;
                    }, delay);
                } else {
                    // It's a space or special char
                    digitWrap.innerHTML = `<span class="counter-char">${char}</span>`;
                    el.appendChild(digitWrap);
                }
            });
        }
    };

    /**
     * Parallax
     */
    const Parallax = {
        hero: null,

        init() {
            this.hero = document.querySelector('.hero__media');
            if (!this.hero) return;

            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.update();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        },

        update() {
            const y = window.scrollY;
            const h = window.innerHeight;

            if (y < h) {
                this.hero.style.transform = `translateY(${y * 0.35}px)`;
            }
        }
    };

    /**
     * Smooth Scroll
     */
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#' || href.length <= 1) return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();

                        let top;
                        if (link.hasAttribute('data-scroll-full')) {
                            // Scroll to show section at the very top
                            top = target.getBoundingClientRect().top + window.scrollY;
                        } else {
                            const headerH = document.getElementById('header')?.offsetHeight || 0;
                            top = target.getBoundingClientRect().top + window.scrollY - headerH - 50;
                        }

                        window.scrollTo({ top, behavior: 'smooth' });

                        // Close menu
                        Menu.close();
                    }
                });
            });
        }
    };

    /**
     * Forms
     */
    const Forms = {
        init() {
            const form = document.getElementById('request-form');
            if (form) {
                form.addEventListener('submit', (e) => this.submit(e));
            }

            // Phone mask
            document.querySelectorAll('input[type="tel"]').forEach(input => {
                input.addEventListener('input', () => this.phone(input));
                input.addEventListener('focus', () => {
                    if (!input.value) input.value = '+7 ';
                });
            });
        },

        submit(e) {
            e.preventDefault();

            const form = e.target;
            const btn = form.querySelector('.request__submit');
            const text = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Отправка...';

            setTimeout(() => {
                btn.textContent = 'Отправлено!';
                btn.style.background = '#22c55e';

                setTimeout(() => {
                    form.reset();
                    btn.textContent = text;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            }, 1500);
        },

        phone(input) {
            let val = input.value.replace(/\D/g, '');

            if (val.length > 0) {
                if (val[0] === '7' || val[0] === '8') val = val.substring(1);

                let result = '+7';
                if (val.length > 0) result += ' ' + val.substring(0, 3);
                if (val.length > 3) result += ' ' + val.substring(3, 6);
                if (val.length > 6) result += ' ' + val.substring(6, 8);
                if (val.length > 8) result += ' ' + val.substring(8, 10);

                input.value = result;
            }
        }
    };

    /**
     * Modal
     */
    const Modal = {
        modals: {},

        init() {
            // Get all modals
            document.querySelectorAll('.modal').forEach(modal => {
                this.modals[modal.id] = modal;
            });

            // Open triggers
            document.querySelectorAll('[data-modal]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(trigger.dataset.modal);
                });
            });

            // Favorites button
            document.querySelector('.header__fav')?.addEventListener('click', () => {
                this.open('favorites-modal');
            });

            // Close triggers
            document.querySelectorAll('[data-close]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const modal = btn.closest('.modal');
                    if (modal) this.close(modal.id);
                });
            });

            // Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    Object.keys(this.modals).forEach(id => {
                        if (this.modals[id].classList.contains('is-open')) {
                            this.close(id);
                        }
                    });
                }
            });
        },

        open(id) {
            const modal = this.modals[id];
            if (!modal) return;

            modal.classList.add('is-open');
            document.body.classList.add('no-scroll');
        },

        close(id) {
            const modal = this.modals[id];
            if (!modal) return;

            modal.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }
    };

    /**
     * Toggle (Rent/Buy)
     */
    const Toggle = {
        init() {
            // Menu toggle
            const menuToggles = document.querySelectorAll('.menu__toggle-btn');
            menuToggles.forEach(btn => {
                btn.addEventListener('click', () => {
                    menuToggles.forEach(b => b.classList.remove('is-active'));
                    btn.classList.add('is-active');
                });
            });

            // Footer toggle
            const footerToggles = document.querySelectorAll('.footer__toggle-btn');
            footerToggles.forEach(btn => {
                btn.addEventListener('click', () => {
                    footerToggles.forEach(b => b.classList.remove('is-active'));
                    btn.classList.add('is-active');
                });
            });

            // Subscribe form
            const subscribeForm = document.getElementById('subscribe-form');
            if (subscribeForm) {
                subscribeForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const btn = subscribeForm.querySelector('.subscribe__btn');
                    const input = subscribeForm.querySelector('.subscribe__input');

                    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10L8 14L16 6"/></svg>';
                    btn.style.background = '#22c55e';

                    setTimeout(() => {
                        input.value = '';
                        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10H16M12 6L16 10L12 14"/></svg>';
                        btn.style.background = '';
                    }, 2500);
                });
            }
        }
    };

    /**
     * Cookie Banner
     */
    const Cookie = {
        banner: null,

        init() {
            this.banner = document.getElementById('cookie-banner');
            if (!this.banner) return;

            // Check if already accepted
            if (localStorage.getItem('cookies-accepted')) return;

            // Show banner after delay
            setTimeout(() => {
                this.banner.classList.add('is-visible');
            }, 2000);

            // Accept button
            document.getElementById('accept-cookies')?.addEventListener('click', () => {
                this.accept();
            });
        },

        accept() {
            localStorage.setItem('cookies-accepted', 'true');
            this.banner.classList.remove('is-visible');
            this.banner.classList.add('is-hidden');
        }
    };

    /**
     * Calculator with Rent/Buy Toggle
     */
    const Calculator = {
        mode: 'rent',

        init() {
            const type = document.getElementById('calc-type');
            const area = document.getElementById('calc-area');
            const term = document.getElementById('calc-term');
            const termField = document.getElementById('calc-term-field');

            if (!type || !area) return;

            const areaValue = document.getElementById('calc-area-value');

            // Mode toggle
            const toggleBtns = document.querySelectorAll('.calculator__toggle-btn');
            toggleBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    toggleBtns.forEach(b => b.classList.remove('is-active'));
                    btn.classList.add('is-active');
                    this.mode = btn.dataset.mode;

                    // Show/hide term field based on mode
                    if (termField) {
                        termField.style.display = this.mode === 'rent' ? 'block' : 'none';
                    }

                    // Update hidden input
                    const modeInput = document.getElementById('calc-mode-input');
                    if (modeInput) modeInput.value = this.mode;

                    this.update();
                });
            });

            const update = () => {
                const areaNum = parseInt(area.value);

                // Update area display
                if (areaValue) areaValue.textContent = areaNum.toLocaleString('ru-RU');

                // Update hidden inputs
                const typeInput = document.getElementById('calc-type-input');
                const areaInput = document.getElementById('calc-area-input');
                const termInput = document.getElementById('calc-term-input');

                if (typeInput) typeInput.value = type.value;
                if (areaInput) areaInput.value = areaNum;
                if (termInput && term) termInput.value = term.value;

                // Track event
                this.track('calculator_update', { mode: this.mode, type: type.value, area: areaNum });
            };

            this.update = update;

            type.addEventListener('change', update);
            area.addEventListener('input', update);
            if (term) term.addEventListener('change', update);

            // Calculator request form
            const calcForm = document.getElementById('calc-request-form');
            if (calcForm) {
                calcForm.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            // Phone mask for calculator input
            const calcPhone = calcForm?.querySelector('input[name="phone"]');
            if (calcPhone) {
                calcPhone.addEventListener('input', () => Forms.phone(calcPhone));
                calcPhone.addEventListener('focus', () => {
                    if (!calcPhone.value) calcPhone.value = '+7 ';
                });
            }

            update();
        },

        handleSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const btn = form.querySelector('.calculator__btn');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Отправка...';

            // Collect form data
            const data = new FormData(form);
            const formData = {};
            data.forEach((value, key) => formData[key] = value);

            setTimeout(() => {
                btn.textContent = 'Отправлено!';
                btn.style.background = '#22c55e';

                // Track goal
                this.track('calculator_request', formData);

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            }, 1500);
        },

        track(event, params = {}) {
            if (typeof ym !== 'undefined') {
                ym(99999999, 'reachGoal', event, params);
            }
        }
    };

    /**
     * Chat Widget
     */
    const ChatWidget = {
        widget: null,
        panel: null,
        isOpen: false,

        init() {
            this.widget = document.getElementById('chat-widget');
            this.panel = document.getElementById('chat-panel');
            if (!this.widget) return;

            const toggle = document.getElementById('chat-toggle');
            toggle?.addEventListener('click', () => this.toggle());

            // Options
            this.widget.querySelectorAll('[data-question]').forEach(btn => {
                btn.addEventListener('click', () => this.handleQuestion(btn.dataset.question));
            });

            // Form
            document.getElementById('chat-form')?.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        },

        toggle() {
            this.isOpen = !this.isOpen;
            this.widget.classList.toggle('is-open', this.isOpen);

            if (this.isOpen && typeof ym !== 'undefined') {
                ym(99999999, 'reachGoal', 'chat_opened');
            }
        },

        handleQuestion(type) {
            const body = this.widget.querySelector('.chat-widget__body');
            const responses = {
                price: 'Стоимость аренды зависит от типа и площади помещения. Производственные — от 500 ₽/м², складские — от 400 ₽/м², офисные — от 800 ₽/м². Воспользуйтесь калькулятором выше для расчёта.',
                available: 'Сейчас доступны помещения от 39 м² до 5 000 м². Для подробной информации оставьте заявку или позвоните нам: +7 (391) 989-99-49',
                tour: 'Отлично! Заполните форму записи на просмотр ниже, и мы свяжемся с вами для подтверждения даты и времени.',
                other: 'Напишите ваш вопрос, и мы свяжемся с вами в ближайшее время. Или позвоните: +7 (391) 989-99-49'
            };

            // Add response
            const msg = document.createElement('div');
            msg.className = 'chat-widget__message chat-widget__message--bot';
            msg.innerHTML = `<p>${responses[type]}</p>`;
            body.appendChild(msg);

            // Enable input
            const input = this.widget.querySelector('.chat-widget__input');
            const send = this.widget.querySelector('.chat-widget__send');
            input.disabled = false;
            send.disabled = false;
            input.placeholder = 'Ваш вопрос...';

            // Track
            if (typeof ym !== 'undefined') {
                ym(99999999, 'reachGoal', 'chat_question', { type });
            }
        }
    };

    /**
     * Forms Handler
     */
    const FormsHandler = {
        init() {
            // Request form
            document.getElementById('request-form')?.addEventListener('submit', (e) => {
                this.handleSubmit(e, 'request_form');
            });

            // Booking form
            document.getElementById('booking-form')?.addEventListener('submit', (e) => {
                this.handleSubmit(e, 'booking_form');
            });

            // Set min date for booking
            const dateInput = document.getElementById('booking-date');
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.min = tomorrow.toISOString().split('T')[0];
                dateInput.value = tomorrow.toISOString().split('T')[0];
            }

        },

        handleSubmit(e, goalName) {
            e.preventDefault();
            const form = e.target;
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Отправка...';

            // Collect form data
            const data = new FormData(form);
            const formData = {};
            data.forEach((value, key) => formData[key] = value);

            setTimeout(() => {
                btn.textContent = 'Отправлено!';
                btn.style.background = '#22c55e';

                // Track goal
                if (typeof ym !== 'undefined') {
                    ym(99999999, 'reachGoal', goalName, formData);
                }

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            }, 1500);
        }
    };

    /**
     * Spaces Catalog Table
     */
    const SpacesCatalog = {
        init() {
            const table = document.querySelector('.spaces-catalog__table');
            if (!table) return;

            const dealFilter = document.getElementById('catalog-deal-filter');
            const typeFilter = document.getElementById('catalog-type-filter');
            const rows = table.querySelectorAll('.spaces-catalog__row');

            // Filter function
            const filterRows = () => {
                const dealValue = dealFilter?.value || '';
                const typeValue = typeFilter?.value || '';

                rows.forEach(row => {
                    const rowDeal = row.dataset.deal || '';
                    const rowType = row.dataset.type || '';

                    const dealMatch = !dealValue || rowDeal === dealValue;
                    const typeMatch = !typeValue || rowType === typeValue;

                    row.style.display = (dealMatch && typeMatch) ? '' : 'none';
                });
            };

            // Attach filter events
            dealFilter?.addEventListener('change', filterRows);
            typeFilter?.addEventListener('change', filterRows);

            // Row click navigation
            rows.forEach(row => {
                row.addEventListener('click', (e) => {
                    // Don't navigate if clicking on the link itself
                    if (e.target.closest('.spaces-catalog__link')) return;

                    const href = row.dataset.href;
                    if (href) {
                        window.location.href = href;
                    }
                });
            });
        }
    };

    /**
     * Interactive Genplan
     */
    const Genplan = {
        init() {
            const points = document.querySelectorAll('.genplan__point');
            const buildings = document.querySelectorAll('.genplan__building');
            const defaultInfo = document.querySelector('.genplan__info-default');

            if (!points.length) return;

            points.forEach(point => {
                point.addEventListener('click', () => {
                    this.showBuilding(point.dataset.building, points, buildings, defaultInfo);
                });
            });

            // Show first building by default
            this.showBuilding('1', points, buildings, defaultInfo);
        },

        showBuilding(buildingId, points, buildings, defaultInfo) {
            // Remove active from all points
            points.forEach(p => p.classList.remove('is-active'));
            const activePoint = document.querySelector('.genplan__point[data-building="' + buildingId + '"]');
            if (activePoint) activePoint.classList.add('is-active');

            // Hide default info
            if (defaultInfo) defaultInfo.style.display = 'none';

            // Hide all buildings, show selected
            buildings.forEach(b => b.classList.remove('is-active'));
            const targetBuilding = document.getElementById('building-' + buildingId);
            if (targetBuilding) {
                targetBuilding.classList.add('is-active');
            }
        }
    };

    /**
     * Initialize new modules
     */
    Calculator.init();
    ChatWidget.init();
    FormsHandler.init();
    SpacesCatalog.init();
    Genplan.init();

})();
