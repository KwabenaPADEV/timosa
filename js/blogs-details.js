/*======================================================
BLOG DETAILS.JS
TIMOSA FOUNDATION

PART 1

- Strict Mode
- DOM Ready
- Preloader
- Sticky Header
- Mobile Navigation
- Smooth Scroll
- Active Navigation
======================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    SELECTORS
    ==================================================*/

    const body = document.body;

    const header = document.querySelector("header");

    const menuToggle = document.querySelector(".menu-toggle");

    const navLinks = document.querySelector(".nav-links");

    const navItems = document.querySelectorAll(".nav-links a");

    const backToTop = document.getElementById("backToTop");



    /*==================================================
    PRELOADER
    ==================================================*/

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        if(preloader){

            preloader.style.opacity = "0";

            preloader.style.visibility = "hidden";

            setTimeout(() => {

                preloader.remove();

            },600);

        }

    });



    /*==================================================
    STICKY HEADER
    ==================================================*/

    const stickyHeader = () => {

        if(window.scrollY > 80){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    };

    stickyHeader();

    window.addEventListener("scroll", stickyHeader);



    /*==================================================
    MOBILE MENU
    ==================================================*/

    if(menuToggle){

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            navLinks.classList.toggle("active");

            body.classList.toggle("menu-open");

        });

    }



    /*==================================================
    CLOSE MENU WHEN LINK IS CLICKED
    ==================================================*/

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            body.classList.remove("menu-open");

        });

    });



    /*==================================================
    ACTIVE NAVIGATION
    ==================================================*/

    const currentPage = location.pathname.split("/").pop();

    navItems.forEach(link => {

        const href = link.getAttribute("href");

        if(href === currentPage){

            link.classList.add("active");

        }

    });



    /*==================================================
    SMOOTH SCROLL
    ==================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });
    /*==================================================
    READING PROGRESS BAR
    ==================================================*/

    const progressBar = document.createElement("div");

    progressBar.id = "readingProgress";

    progressBar.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:0%;
        height:4px;
        background:#0B6E4F;
        z-index:9999;
        transition:width .15s linear;
    `;

    document.body.appendChild(progressBar);

    const updateReadingProgress = () => {

        const scrollTop = window.scrollY;

        const documentHeight =

        document.documentElement.scrollHeight - window.innerHeight;

        const progress = (scrollTop / documentHeight) * 100;

        progressBar.style.width = progress + "%";

    };

    window.addEventListener("scroll", updateReadingProgress);

    updateReadingProgress();



    /*==================================================
    BACK TO TOP BUTTON
    ==================================================*/

    const toggleBackToTop = () => {

        if(!backToTop) return;

        if(window.scrollY > 500){

            backToTop.classList.add("show");

        }

        else{

            backToTop.classList.remove("show");

        }

    };

    window.addEventListener("scroll", toggleBackToTop);

    toggleBackToTop();

    if(backToTop){

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }



    /*==================================================
    SCROLL REVEAL ANIMATION
    ==================================================*/

    const revealElements = document.querySelectorAll(

        ".article-content h2, .article-content p, .article-image, .highlight-box, blockquote, .author-box, .post-card"

    );

    const revealOnScroll = () => {

        revealElements.forEach(element => {

            const top = element.getBoundingClientRect().top;

            const trigger = window.innerHeight - 120;

            if(top < trigger){

                element.classList.add("show");

            }

        });

    };

    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);



    /*==================================================
    IMAGE FADE-IN
    ==================================================*/

    const articleImages = document.querySelectorAll(

        ".article-image img"

    );

    articleImages.forEach(image => {

        image.style.opacity = "0";

        image.style.transform = "translateY(40px)";

        image.style.transition =

        "all .8s ease";

    });

    const revealImages = () => {

        articleImages.forEach(image => {

            const top = image.getBoundingClientRect().top;

            if(top < window.innerHeight - 80){

                image.style.opacity = "1";

                image.style.transform =

                "translateY(0)";

            }

        });

    };

    revealImages();

    window.addEventListener("scroll", revealImages);



    /*==================================================
    COUNT ARTICLE WORDS
    ==================================================*/

    const article = document.querySelector(".article-content");

    if(article){

        const text = article.innerText;

        const words = text.trim().split(/\s+/).length;

        const readingTime = Math.ceil(words / 220);

        console.log(

            `Estimated Reading Time: ${readingTime} min`

        );

    }

        /*==================================================
    LAZY LOAD ARTICLE IMAGES
    ==================================================*/

    const lazyImages = document.querySelectorAll("img");

    if ("IntersectionObserver" in window) {

        const imageObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const img = entry.target;

                    img.classList.add("loaded");

                    observer.unobserve(img);

                }

            });

        }, {

            threshold: 0.2

        });

        lazyImages.forEach(img => {

            imageObserver.observe(img);

        });

    }



    /*==================================================
    SOCIAL SHARE
    ==================================================*/

    const pageTitle = document.title;

    const pageURL = window.location.href;

    document.querySelectorAll(".social-links a").forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            let url = "";

            if (link.querySelector(".fa-facebook-f")) {

                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageURL)}`;

            }

            else if (link.querySelector(".fa-x-twitter")) {

                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageURL)}`;

            }

            else if (link.querySelector(".fa-linkedin-in")) {

                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageURL)}`;

            }

            else if (link.querySelector(".fa-whatsapp")) {

                url = `https://wa.me/?text=${encodeURIComponent(pageTitle + " " + pageURL)}`;

            }

            if (url !== "") {

                window.open(

                    url,

                    "_blank",

                    "width=700,height=600"

                );

            }

        });

    });



    /*==================================================
    COPY LINK
    ==================================================*/

    const copyButton = document.getElementById("copyLink");

    if(copyButton){

        copyButton.addEventListener("click",()=>{

            navigator.clipboard.writeText(pageURL);

            copyButton.innerHTML =

            '<i class="fas fa-check"></i> Copied';

            setTimeout(()=>{

                copyButton.innerHTML =

                '<i class="fas fa-link"></i> Copy Link';

            },2000);

        });

    }



    /*==================================================
    NEWSLETTER FORM
    ==================================================*/

    const newsletterForm =

    document.querySelector(".newsletter-form");

    if(newsletterForm){

        newsletterForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const email =

            newsletterForm.querySelector("input");

            const value = email.value.trim();

            const pattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!pattern.test(value)){

                alert("Please enter a valid email address.");

                email.focus();

                return;

            }

            alert(

                "Thank you for subscribing to the TIMOSA Foundation newsletter."

            );

            newsletterForm.reset();

        });

    }



    /*==================================================
    KEYBOARD ACCESSIBILITY
    ==================================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key === "Escape"){

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            body.classList.remove("menu-open");

        }

    });



    /*==================================================
    IMAGE ZOOM
    ==================================================*/

    document.querySelectorAll(".article-image img")

    .forEach(image=>{

        image.addEventListener("click",()=>{

            image.classList.toggle("zoom");

        });

    });



    /*==================================================
    PERFORMANCE
    ==================================================*/

    window.addEventListener("load",()=>{

        console.log(

            `TIMOSA Foundation Blog loaded in ${Math.round(performance.now())} ms`

        );

    });

        /*==================================================
    READING TIME
    ==================================================*/

    const readingTimeElement = document.getElementById("readingTime");

    if(article && readingTimeElement){

        const words = article.innerText.trim().split(/\s+/).length;

        const minutes = Math.max(1, Math.ceil(words / 220));

        readingTimeElement.textContent = `${minutes} min read`;

    }



    /*==================================================
    ACTIVE SECTION HIGHLIGHT
    ==================================================*/

    const sections = document.querySelectorAll(

        ".article-content h2"

    );

    const activateSection = () => {

        let current = "";

        sections.forEach(section => {

            const top =

            section.getBoundingClientRect().top;

            if(top <= 180){

                current = section.textContent;

            }

        });

        console.log("Reading:", current);

    };

    window.addEventListener("scroll", activateSection);



    /*==================================================
    PRINT ARTICLE
    ==================================================*/

    const printButton =

    document.getElementById("printArticle");

    if(printButton){

        printButton.addEventListener("click",()=>{

            window.print();

        });

    }



    /*==================================================
    REDUCED MOTION
    ==================================================*/

    const prefersReducedMotion =

    window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    );

    if(prefersReducedMotion.matches){

        document.documentElement.style.scrollBehavior =

        "auto";

    }



    /*==================================================
    EXTERNAL LINKS
    ==================================================*/

    document.querySelectorAll("a").forEach(link=>{

        if(

            link.hostname &&

            link.hostname !== window.location.hostname

        ){

            link.setAttribute("target","_blank");

            link.setAttribute(

                "rel",

                "noopener noreferrer"

            );

        }

    });



    /*==================================================
    IMAGE LOADING EFFECT
    ==================================================*/

    document.querySelectorAll("img").forEach(img=>{

        if(img.complete){

            img.classList.add("loaded");

        }

        else{

            img.addEventListener("load",()=>{

                img.classList.add("loaded");

            });

        }

    });



    /*==================================================
    WINDOW RESIZE
    ==================================================*/

    window.addEventListener("resize",()=>{

        if(window.innerWidth > 992){

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            body.classList.remove("menu-open");

        }

    });



    /*==================================================
    PAGE VISIBILITY
    ==================================================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                console.log(

                    "TIMOSA Blog paused."

                );

            }

            else{

                console.log(

                    "TIMOSA Blog resumed."

                );

            }

        }

    );



    /*==================================================
    INITIALIZE PAGE
    ==================================================*/

    const initialize = () => {

        stickyHeader();

        updateReadingProgress();

        toggleBackToTop();

        revealOnScroll();

        revealImages();

        activateSection();

    };

    initialize();



    /*==================================================
    END DOM READY
    ==================================================*/

});