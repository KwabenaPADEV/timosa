/*=====================================================
    TIMOSA FOUNDATION
    MAIN JAVASCRIPT
    Animations • Slider • Counter • FAQ • Interactions
======================================================*/


document.addEventListener("DOMContentLoaded", () => {



/*=====================================================
    PRELOADER
======================================================*/

const preloader = document.querySelector("#preloader");


window.addEventListener("load",()=>{

    if(preloader){

        preloader.style.opacity="0";
        preloader.style.visibility="hidden";


        setTimeout(()=>{

            preloader.remove();

        },700);

    }

});





/*=====================================================
    HEADER SCROLL EFFECT
======================================================*/


const header = document.querySelector("header");


function headerScroll(){

    if(!header) return;


    if(window.scrollY > 60){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

}


headerScroll();

window.addEventListener("scroll",headerScroll);







/*=====================================================
    MOBILE MENU
======================================================*/


const menuToggle =
document.querySelector(".menu-toggle");


const navLinks =
document.querySelector(".nav-links");


if(menuToggle && navLinks){


menuToggle.addEventListener("click",()=>{


    menuToggle.classList.toggle("active");

    navLinks.classList.toggle("active");

    document.body.classList.toggle("menu-open");


});



document.querySelectorAll(".nav-links a")
.forEach(link=>{


link.addEventListener("click",()=>{


menuToggle.classList.remove("active");

navLinks.classList.remove("active");

document.body.classList.remove("menu-open");


});


});


}







/*=====================================================
    MOBILE DROPDOWN
======================================================*/


document.querySelectorAll(".dropdown > a")
.forEach(drop=>{


drop.addEventListener("click",function(e){


if(window.innerWidth <= 991){

e.preventDefault();


this.parentElement.classList.toggle("active");


}


});


});







/*=====================================================
    HERO SLIDER
======================================================*/


function initializeSlider(container){


const slider =
document.querySelector(container);


if(!slider) return;



const slides =
slider.querySelectorAll(".slide");


const dots =
slider.querySelectorAll(".dot");



if(!slides.length) return;



let current=0;

let interval;




function showSlide(index){


slides.forEach((slide,i)=>{


slide.classList.toggle(
"active",
i===index
);


});


dots.forEach((dot,i)=>{


dot.classList.toggle(
"active",
i===index
);


});


current=index;


}




function nextSlide(){


current++;


if(current >= slides.length){

current=0;

}


showSlide(current);


}



function previousSlide(){


current--;


if(current < 0){

current=slides.length-1;

}


showSlide(current);


}



function start(){

interval=setInterval(nextSlide,5000);

}



function stop(){

clearInterval(interval);

}





dots.forEach((dot,index)=>{


dot.addEventListener("click",()=>{


stop();


showSlide(index);


start();


});


});




slider.addEventListener(
"mouseenter",
stop
);



slider.addEventListener(
"mouseleave",
start
);





/* Mobile Swipe */


let startX=0;



slider.addEventListener(
"touchstart",
e=>{

startX=e.changedTouches[0].screenX;

}

);



slider.addEventListener(
"touchend",
e=>{


let endX =
e.changedTouches[0].screenX;



if(endX < startX-50){

stop();

nextSlide();

start();

}



if(endX > startX+50){

stop();

previousSlide();

start();

}



}

);




showSlide(0);

start();



}



initializeSlider(".program-hero");

initializeSlider(".service-hero");









/*=====================================================
    SCROLL REVEAL
======================================================*/


const revealElements =
document.querySelectorAll(
".reveal,.fade-up,.fade-left,.fade-right"
);



function reveal(){


revealElements.forEach(item=>{


const position =
item.getBoundingClientRect().top;



if(position < window.innerHeight - 120){


item.classList.add("active");


}


});


}



reveal();


window.addEventListener(
"scroll",
reveal
);









/*=====================================================
    COUNTER ANIMATION
======================================================*/


const counters =
document.querySelectorAll(".counter");



function animateCounter(counter){


const target =
Number(counter.dataset.target);



let count=0;



const speed =
target / 100;



function update(){



count += speed;



if(count < target){


counter.textContent =
Math.floor(count);


requestAnimationFrame(update);


}

else{


counter.textContent =
target;


}



}



update();



}



const counterObserver =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


animateCounter(entry.target);


counterObserver.unobserve(
entry.target
);


}


});


},
{
threshold:.5
});



counters.forEach(counter=>{

counterObserver.observe(counter);

});









/*=====================================================
    FAQ ACCORDION
======================================================*/


document.querySelectorAll(".faq-question")
.forEach(question=>{


question.addEventListener("click",()=>{


const item =
question.parentElement;



document.querySelectorAll(".faq-item")
.forEach(faq=>{


if(faq !== item){

faq.classList.remove("active");

}


});



item.classList.toggle("active");



});


});









/*=====================================================
    SMOOTH SCROLL
======================================================*/


document.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{


anchor.addEventListener(
"click",
function(e){



const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



window.scrollTo({

top:
target.offsetTop - 90,


behavior:"smooth"


});


}



});


});









/*=====================================================
    ACTIVE NAVIGATION
======================================================*/


const sections =
document.querySelectorAll("section[id]");


const navItems =
document.querySelectorAll(".nav-links a");



function activeMenu(){


let current="";



sections.forEach(section=>{


const top =
section.offsetTop - 120;


if(
window.scrollY >= top &&
window.scrollY <
top + section.offsetHeight
){


current =
section.id;


}



});



navItems.forEach(link=>{


link.classList.remove("active");


if(
link.getAttribute("href")
===
"#"+current
){


link.classList.add("active");


}


});


}



window.addEventListener(
"scroll",
activeMenu
);



activeMenu();









/*=====================================================
    BACK TO TOP
======================================================*/


const backTop =
document.querySelector(".back-to-top");



if(backTop){


window.addEventListener("scroll",()=>{


if(window.scrollY > 500){


backTop.classList.add("show");


}

else{


backTop.classList.remove("show");


}



});




backTop.onclick=e=>{


e.preventDefault();



window.scrollTo({

top:0,

behavior:"smooth"

});


};


}









/*=====================================================
    PARALLAX HERO
======================================================*/


const heroes =
document.querySelectorAll(
".program-hero,.service-hero"
);



window.addEventListener(
"scroll",
()=>{


heroes.forEach(hero=>{


hero.style.backgroundPositionY =
window.scrollY * .35 +"px";


});


});









/*=====================================================
    SERVICE CARD EFFECT
======================================================*/


document.querySelectorAll(
".service-card"
)
.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{

card.classList.add("hovered");

});


card.addEventListener(
"mouseleave",
()=>{

card.classList.remove("hovered");

});


});









/*=====================================================
    FLOATING CARDS
======================================================*/


document.querySelectorAll(
".program-card,.timeline-card,.partner-card"
)
.forEach((card,index)=>{


card.style.animation =
`floating 5s ease-in-out ${index*.2}s infinite`;


});









/*=====================================================
    RIPPLE BUTTON
======================================================*/


document.querySelectorAll(
".btn-primary,.btn-secondary"
)
.forEach(button=>{


button.addEventListener(
"click",
function(e){


const ripple =
document.createElement("span");


ripple.className="ripple";



const rect =
this.getBoundingClientRect();



ripple.style.left =
e.clientX-rect.left+"px";


ripple.style.top =
e.clientY-rect.top+"px";



this.appendChild(ripple);



setTimeout(()=>{

ripple.remove();

},700);



});


});



});







/*=====================================================
    FLOATING ANIMATION CSS
======================================================*/


const animation =
document.createElement("style");


animation.innerHTML=`

@keyframes floating{

0%{

transform:translateY(0);

}


50%{

transform:translateY(-10px);

}


100%{

transform:translateY(0);

}


}

`;



document.head.appendChild(animation);