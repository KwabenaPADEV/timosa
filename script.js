/*=========================================================
    GREENLIFE WEBSITE
    script.js - Part 1
    Preloader
    Sticky Header
    Mobile Navigation
    Mobile Dropdown
    Smooth Scroll
    Active Navigation
=========================================================*/

"use strict";

/*=========================================================
PRELOADER
=========================================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        preloader.style.opacity = "0";

        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 700);

    }

});


/*=========================================================
SELECTORS
=========================================================*/

const header = document.getElementById("header");

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

const dropdowns = document.querySelectorAll(".dropdown");

const navItems = document.querySelectorAll(".nav-links a");


/*=========================================================
STICKY HEADER
=========================================================*/

function stickyHeader(){

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", stickyHeader);

stickyHeader();


/*=========================================================
MOBILE MENU
=========================================================*/

if(menuToggle){

    menuToggle.addEventListener("click", ()=>{

        navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

}


/*=========================================================
HAMBURGER ANIMATION
=========================================================*/

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        const bars = menuToggle.querySelectorAll("span");

        if(menuToggle.classList.contains("active")){

            bars[0].style.transform="rotate(45deg) translateY(12px)";

            bars[1].style.opacity="0";

            bars[2].style.transform="rotate(-45deg) translateY(-12px)";

        }else{

            bars[0].style.transform="";

            bars[1].style.opacity="1";

            bars[2].style.transform="";

        }

    });

}


/*=========================================================
CLOSE MENU WHEN CLICKING A LINK
=========================================================*/

navItems.forEach(link=>{

    link.addEventListener("click",()=>{

        if(window.innerWidth < 992){

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });

});


/*=========================================================
CARE STYLE MOBILE DROPDOWN
=========================================================*/

dropdowns.forEach(drop=>{

    const trigger = drop.querySelector("a");

    trigger.addEventListener("click",(e)=>{

        if(window.innerWidth <= 991){

            e.preventDefault();

            dropdowns.forEach(item=>{

                if(item!==drop){

                    item.classList.remove("active");

                }

            });

            drop.classList.toggle("active");

        }

    });

});


/*=========================================================
CLICK OUTSIDE MENU
=========================================================*/

document.addEventListener("click",(e)=>{

    if(window.innerWidth > 991) return;

    const insideNav = navLinks.contains(e.target);

    const insideToggle = menuToggle.contains(e.target);

    if(!insideNav && !insideToggle){

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        dropdowns.forEach(drop=>{

            drop.classList.remove("active");

        });

    }

});


/*=========================================================
SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});


/*=========================================================
ACTIVE MENU ON SCROLL
=========================================================*/

const sections = document.querySelectorAll("section");

function activeMenu(){

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 140;

        const sectionHeight = section.clientHeight;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if(href === "#" + current){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll",activeMenu);


/*=========================================================
HEADER HIDE / SHOW
=========================================================*/

let lastScroll = 0;

window.addEventListener("scroll",()=>{

    const current = window.pageYOffset;

    if(current > lastScroll && current > 150){

        header.style.transform="translateY(-100%)";

    }else{

        header.style.transform="translateY(0)";

    }

    lastScroll=current;

});


/*=========================================================
ESC KEY CLOSES MENU
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        dropdowns.forEach(drop=>drop.classList.remove("active"));

    }

});


/*=========================================================
WINDOW RESIZE RESET
=========================================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth > 991){

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        dropdowns.forEach(drop=>{

            drop.classList.remove("active");

        });

        document.body.classList.remove("menu-open");

    }

});


/*=========================================================
END OF PART 1
=========================================================*/

/*=========================================================
    GREENLIFE WEBSITE
    script.js - Part 2
    Professional Hero Slider
    Auto Slide
    Navigation Dots
    Pause on Hover
    Ken Burns Reset
=========================================================*/

"use strict";

/*=========================================================
HERO SLIDER
=========================================================*/

const slides = document.querySelectorAll(".hero-slider .slide");
const dots = document.querySelectorAll(".slider-navigation .dot");

let currentSlide = 0;
let sliderInterval = null;

const SLIDE_DURATION = 6000;


/*=========================================================
SHOW SLIDE
=========================================================*/

function showSlide(index){

    if(slides.length === 0) return;

    if(index >= slides.length){
        index = 0;
    }

    if(index < 0){
        index = slides.length - 1;
    }

    slides.forEach((slide)=>{

        slide.classList.remove("active");

        /* Reset Ken Burns animation */

        slide.style.animation = "none";

        void slide.offsetWidth;

    });

    dots.forEach((dot)=>{

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");

    /* Restart animation */

    slides[index].style.animation = "";

    if(dots[index]){
        dots[index].classList.add("active");
    }

    currentSlide = index;

}


/*=========================================================
NEXT SLIDE
=========================================================*/

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


/*=========================================================
PREVIOUS SLIDE
=========================================================*/

function previousSlide(){

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}


/*=========================================================
AUTO PLAY
=========================================================*/

function startSlider(){

    stopSlider();

    sliderInterval = setInterval(()=>{

        nextSlide();

    },SLIDE_DURATION);

}


/*=========================================================
STOP SLIDER
=========================================================*/

function stopSlider(){

    if(sliderInterval){

        clearInterval(sliderInterval);

    }

}


/*=========================================================
DOT NAVIGATION
=========================================================*/

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showSlide(index);

        startSlider();

    });

});


/*=========================================================
PAUSE ON HOVER
=========================================================*/

const hero = document.querySelector(".hero");

if(hero){

    hero.addEventListener("mouseenter",()=>{

        stopSlider();

    });

    hero.addEventListener("mouseleave",()=>{

        startSlider();

    });

}


/*=========================================================
KEYBOARD SUPPORT
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key === "ArrowRight"){

        nextSlide();

        startSlider();

    }

    if(e.key === "ArrowLeft"){

        previousSlide();

        startSlider();

    }

});


/*=========================================================
TOUCH SWIPE SUPPORT
=========================================================*/

let touchStartX = 0;
let touchEndX = 0;

if(hero){

    hero.addEventListener("touchstart",(e)=>{

        touchStartX = e.changedTouches[0].screenX;

    });

    hero.addEventListener("touchend",(e)=>{

        touchEndX = e.changedTouches[0].screenX;

        if(touchEndX < touchStartX - 50){

            nextSlide();

            startSlider();

        }

        if(touchEndX > touchStartX + 50){

            previousSlide();

            startSlider();

        }

    });

}


/*=========================================================
PAGE VISIBILITY API
Pause slider when tab isn't active
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        stopSlider();

    }else{

        startSlider();

    }

});


/*=========================================================
INITIALIZE
=========================================================*/

if(slides.length){

    showSlide(0);

    startSlider();

}


/*=========================================================
OPTIONAL PARALLAX ON MOUSE MOVE
=========================================================*/

if(hero){

    hero.addEventListener("mousemove",(e)=>{

        const x = (e.clientX / window.innerWidth - 0.5) * 20;

        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        const activeSlide = document.querySelector(".slide.active");

        if(activeSlide){

            activeSlide.style.backgroundPosition =
                `calc(50% + ${x}px) calc(50% + ${y}px)`;

        }

    });

    hero.addEventListener("mouseleave",()=>{

        const activeSlide = document.querySelector(".slide.active");

        if(activeSlide){

            activeSlide.style.backgroundPosition = "center";

        }

    });

}


/*=========================================================
END OF PART 2
=========================================================*/

/*=========================================================
    GREENLIFE WEBSITE
    script.js - Part 3
    Scroll Reveal
    Counter Animation
    Parallax
    Floating Animations
    Active Section Observer
=========================================================*/

"use strict";

/*=========================================================
SELECT REVEAL ELEMENTS
=========================================================*/

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

/*=========================================================
SCROLL REVEAL
=========================================================*/

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(item=>{

    revealObserver.observe(item);

});


/*=========================================================
COUNTER ANIMATION
=========================================================*/

const counters = document.querySelectorAll(".counter");

function animateCounter(counter){

    const target = Number(counter.dataset.target);

    const speed = 80;

    let current = 0;

    const increment = Math.ceil(target / speed);

    const update = ()=>{

        current += increment;

        if(current >= target){

            current = target;

        }

        counter.innerText = current.toLocaleString();

        if(current < target){

            requestAnimationFrame(update);

        }

    };

    update();

}

/*=========================================================
COUNTER OBSERVER
=========================================================*/

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


/*=========================================================
PARALLAX HERO
=========================================================*/

const heroSection = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(!heroSection) return;

    const offset = window.pageYOffset;

    heroSection.style.backgroundPositionY = `${offset * 0.35}px`;

});


/*=========================================================
FLOATING CARDS
=========================================================*/

const floatingCards = document.querySelectorAll(".feature-card");

floatingCards.forEach((card,index)=>{

    card.style.animation =
        `floating ${5 + (index*0.4)}s ease-in-out infinite`;

});


/*=========================================================
FEATURE CARD TILT
=========================================================*/

floatingCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height/2)/18;

        const rotateY = (x - rect.width/2)/18;

        card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-10px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


/*=========================================================
ACTIVE SECTION OBSERVER
=========================================================*/

const observedSections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            document
                .querySelectorAll(".nav-links a")
                .forEach(link=>{

                    link.classList.remove("active");

                });

            const activeLink =
                document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );

            if(activeLink){

                activeLink.classList.add("active");

            }

        }

    });

},{
    threshold:0.55
});

observedSections.forEach(section=>{

    sectionObserver.observe(section);

});


/*=========================================================
IMAGE FADE-IN
=========================================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="scale(1)";

        }

    });

},{
    threshold:0.2
});

images.forEach(img=>{

    img.style.opacity="0";

    img.style.transform="scale(.94)";

    img.style.transition="1s";

    imageObserver.observe(img);

});


/*=========================================================
BUTTON HOVER GLOW
=========================================================*/

const buttons = document.querySelectorAll(
    ".btn-primary,.btn-secondary"
);

buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.boxShadow =
        "0 18px 45px rgba(19,138,54,.35)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.boxShadow="";

    });

});


/*=========================================================
SMOOTH PAGE FADE
=========================================================*/

window.addEventListener("pageshow",()=>{

    document.body.style.opacity="1";

});

document.body.style.opacity="0";
document.body.style.transition="opacity .5s ease";


/*=========================================================
FLOATING KEYFRAME (Injected)
=========================================================*/

const floatingAnimation = document.createElement("style");

floatingAnimation.innerHTML = `

@keyframes floating{

    0%{

        transform:translateY(0px);

    }

    50%{

        transform:translateY(-10px);

    }

    100%{

        transform:translateY(0px);

    }

}

`;

document.head.appendChild(floatingAnimation);


/*=========================================================
END OF PART 3
=========================================================*/


/*=========================================================
    GREENLIFE WEBSITE
    script.js - Part 4
    Back To Top
    Ripple Effect
    Navbar Progress
    Lazy Loading
    Scroll Progress
    Final Initialization
=========================================================*/

"use strict";

/*=========================================================
BACK TO TOP BUTTON
=========================================================*/

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";

backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

document.body.appendChild(backToTop);

backToTop.style.cssText = `
position:fixed;
right:25px;
bottom:25px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:linear-gradient(135deg,#138a36,#27ae60);
color:#fff;
font-size:18px;
cursor:pointer;
opacity:0;
visibility:hidden;
transform:translateY(20px);
transition:.35s;
z-index:999;
box-shadow:0 12px 30px rgba(19,138,54,.35);
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
        backToTop.style.transform = "translateY(0)";

    } else {

        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
        backToTop.style.transform = "translateY(20px)";
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=========================================================
SCROLL PROGRESS BAR
=========================================================*/

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);

progressBar.style.cssText = `
position:fixed;
top:0;
left:0;
height:4px;
width:0%;
background:linear-gradient(90deg,#138a36,#49c16d);
z-index:99999;
transition:width .1s linear;
`;

window.addEventListener("scroll",()=>{

    const scrollTop =
        document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent =
        (scrollTop / height) * 100;

    progressBar.style.width = percent + "%";

});


/*=========================================================
BUTTON RIPPLE EFFECT
=========================================================*/

document.querySelectorAll(".btn-primary,.btn-secondary")
.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple =
            document.createElement("span");

        const rect =
            this.getBoundingClientRect();

        const size =
            Math.max(rect.width,rect.height);

        ripple.style.width = size+"px";
        ripple.style.height = size+"px";

        ripple.style.left =
            e.clientX - rect.left - size/2 + "px";

        ripple.style.top =
            e.clientY - rect.top - size/2 + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});


/*=========================================================
RIPPLE STYLE
=========================================================*/

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

.btn-primary,
.btn-secondary{

overflow:hidden;
position:relative;

}

.ripple{

position:absolute;

border-radius:50%;

transform:scale(0);

background:rgba(255,255,255,.45);

animation:ripple .7s linear;

pointer-events:none;

}

@keyframes ripple{

to{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);


/*=========================================================
LAZY LOAD IMAGES
=========================================================*/

const lazyImages =
document.querySelectorAll("img");

const lazyObserver =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img = entry.target;

img.loading="lazy";

lazyObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

lazyObserver.observe(img);

});


/*=========================================================
SMOOTH HOVER EFFECT
=========================================================*/

document.querySelectorAll(
".feature-card"
).forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transition=".4s";

});

});


/*=========================================================
PARALLAX SCROLL
=========================================================*/

window.addEventListener("scroll",()=>{

const hero =
document.querySelector(".hero");

if(!hero) return;

const y =
window.pageYOffset;

hero.style.transform =
`translateY(${y*0.15}px)`;

});


/*=========================================================
WINDOW FOCUS
=========================================================*/

window.addEventListener("focus",()=>{

document.body.classList.remove("blurred");

});

window.addEventListener("blur",()=>{

document.body.classList.add("blurred");

});


/*=========================================================
PAGE LOADED CLASS
=========================================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});


/*=========================================================
SMOOTH REVEAL DELAYS
=========================================================*/

document.querySelectorAll(".feature-card")
.forEach((card,index)=>{

card.style.transitionDelay =
(index * .08)+"s";

});


/*=========================================================
INITIALIZE ALL
=========================================================*/

function initializeWebsite(){

    console.log(
        "GreenLife Website Loaded Successfully."
    );

}

initializeWebsite();


/*=========================================================
END OF FILE
=========================================================*/