/*====================================================
    GREENLIFE NGO
    services.js
    Interactive Features
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      PRELOADER
    =========================================*/
    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            setTimeout(() => {
                preloader.remove();
            }, 700);
        }
    });


    /*=========================================
      HEADER SCROLL
    =========================================*/
    const header = document.querySelector("header");

    function handleHeader() {
        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    handleHeader();
    window.addEventListener("scroll", handleHeader);


    /*=========================================
      MOBILE MENU
    =========================================*/
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
            body.classList.toggle("menu-open");

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                body.classList.remove("menu-open");

            });

        });

    }


    /*=========================================
      MOBILE DROPDOWN
    =========================================*/
    document.querySelectorAll(".dropdown > a").forEach(item => {

        item.addEventListener("click", function (e) {

            if (window.innerWidth <= 991) {

                e.preventDefault();

                this.parentElement.classList.toggle("active");

            }

        });

    });


    /*=========================================
      SCROLL REVEAL
    =========================================*/
    const revealItems = document.querySelectorAll(
        ".reveal,.reveal-left,.reveal-right"
    );

    function revealOnScroll() {

        const trigger = window.innerHeight - 120;

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < trigger) {

                item.classList.add("active");

            }

        });

    }

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);


    /*=========================================
      COUNTER ANIMATION
    =========================================*/
    const counters = document.querySelectorAll(".counter");

    const runCounter = counter => {

        const target = +counter.dataset.target;

        const speed = 80;

        const update = () => {

            let current = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (current < target) {

                counter.innerText = current + increment;

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        };

        update();

    };

    if (counters.length) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    runCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: .5
        });

        counters.forEach(counter => observer.observe(counter));

    }


    /*=========================================
      SERVICE CARD HOVER EFFECT
    =========================================*/
    document.querySelectorAll(".service-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("hovered");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("hovered");

        });

    });


    /*=========================================
      PARALLAX HERO
    =========================================*/
    const hero = document.querySelector(".service-hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const y = window.pageYOffset;

        hero.style.backgroundPosition = `center ${y * 0.35}px`;

    });


    /*=========================================
      SMOOTH SCROLL
    =========================================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 90,

                behavior: "smooth"

            });

        });

    });


    /*=========================================
      ACTIVE MENU HIGHLIGHT
    =========================================*/
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (pageYOffset >= top &&
                pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }

    activeMenu();
    window.addEventListener("scroll", activeMenu);


    /*=========================================
      BACK TO TOP BUTTON
    =========================================*/
    const backTop = document.querySelector(".back-to-top");

    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        });

        backTop.addEventListener("click", e => {

            e.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /*=========================================
      FLOATING ICONS
    =========================================*/
    document.querySelectorAll(".floating-icon").forEach((icon, index) => {

        icon.style.animationDelay = `${index * 0.5}s`;

    });


    /*=========================================
      RIPPLE BUTTON EFFECT
    =========================================*/
    document.querySelectorAll(".btn-primary,.btn-secondary").forEach(btn => {

        btn.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });


    /*=========================================
      SERVICE IMAGE ZOOM
    =========================================*/
    document.querySelectorAll(".service-image img").forEach(img => {

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.08)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "scale(1)";

        });

    });

});