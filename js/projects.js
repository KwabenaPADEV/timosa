/*=====================================================
    TIMOSA FOUNDATION
    PROJECTS.JS

    Hero Slider
    Counter
    Reveal Animation
    Navigation
    Interactive Effects
======================================================*/


document.addEventListener("DOMContentLoaded",()=>{



/*=====================================================
    PRELOADER
======================================================*/


const preloader =
document.querySelector("#preloader");



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
    HEADER SCROLL
======================================================*/


const header =
document.querySelector("header");



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


window.addEventListener(
"scroll",
headerScroll
);








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


if(window.innerWidth <=991){


e.preventDefault();


this.parentElement.classList.toggle("active");


}


});


});









/*=====================================================
    PROJECT HERO SLIDER
======================================================*/


const hero =
document.querySelector(".project-hero");



if(hero){



const slides =
hero.querySelectorAll(".slide");


const dots =
hero.querySelectorAll(".dot");



let current=0;

let sliderTimer;




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

current =
slides.length-1;


}



showSlide(current);


}




function startSlider(){


sliderTimer =
setInterval(
nextSlide,
5000
);


}



function stopSlider(){


clearInterval(sliderTimer);


}




dots.forEach((dot,index)=>{


dot.addEventListener("click",()=>{


stopSlider();


showSlide(index);


startSlider();


});


});






hero.addEventListener(
"mouseenter",
stopSlider
);



hero.addEventListener(
"mouseleave",
startSlider
);







/* MOBILE SWIPE */


let startX=0;



hero.addEventListener(
"touchstart",
e=>{


startX =
e.changedTouches[0].screenX;


});





hero.addEventListener(
"touchend",
e=>{


let endX =
e.changedTouches[0].screenX;



if(endX < startX-50){


stopSlider();


nextSlide();


startSlider();


}




if(endX > startX+50){


stopSlider();


previousSlide();


startSlider();


}




});





showSlide(0);


startSlider();



}









/*=====================================================
    SCROLL REVEAL
======================================================*/


const revealItems =
document.querySelectorAll(
".project-card,.category-card,.impact-box"
);



function reveal(){



revealItems.forEach(item=>{


const position =
item.getBoundingClientRect().top;



if(position <
window.innerHeight - 100){


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
document.querySelectorAll(
".counter"
);



function counterAnimation(counter){



const target =
Number(counter.dataset.target);



let value=0;



const speed =
target / 100;



function update(){



value += speed;



if(value < target){



counter.innerHTML =
Math.floor(value);



requestAnimationFrame(update);



}

else{


counter.innerHTML =
target;


}



}



update();



}



const counterObserver =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){



counterAnimation(
entry.target
);



counterObserver.unobserve(
entry.target
);



}



});



},
{
threshold:.5
}
);



counters.forEach(counter=>{


counterObserver.observe(counter);


});









/*=====================================================
    ACTIVE NAVIGATION
======================================================*/


const sections =
document.querySelectorAll(
"section[id]"
);


const navItems =
document.querySelectorAll(
".nav-links a"
);




function activeMenu(){



let current="";



sections.forEach(section=>{


let top =
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


link.classList.remove(
"active"
);



if(
link.getAttribute("href")
===
"#"+current
){


link.classList.add(
"active"
);


}



});



}




window.addEventListener(
"scroll",
activeMenu
);








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
target.offsetTop-90,


behavior:"smooth"


});



}



});



});








/*=====================================================
    PARALLAX HERO
======================================================*/


window.addEventListener(
"scroll",
()=>{


if(!hero) return;



hero.style.backgroundPositionY =
window.scrollY * .35 +"px";


});









/*=====================================================
    PROJECT CARD FLOATING EFFECT
======================================================*/


document.querySelectorAll(
".project-card,.category-card,.impact-box"
)
.forEach((card,index)=>{


card.style.animation =
`floating 5s ease-in-out ${index*.2}s infinite`;


});








});







/*=====================================================
    FLOATING ANIMATION CSS
======================================================*/


const floatingStyle =
document.createElement("style");



floatingStyle.innerHTML=`


@keyframes floating{


0%{

transform:translateY(0);

}


50%{

transform:translateY(-8px);

}


100%{

transform:translateY(0);

}



}



`;



document.head.appendChild(
floatingStyle
);


/*=========================================
PROJECT GALLERY FILTER
=========================================*/


const filterButtons =
document.querySelectorAll(".filter-btn");


const galleryItems =
document.querySelectorAll(".gallery-item");



filterButtons.forEach(button=>{


button.addEventListener("click",()=>{


// remove active

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});



button.classList.add("active");



const filter =
button.dataset.filter;




galleryItems.forEach(item=>{


if(
filter==="all" ||
item.classList.contains(filter)
){


item.classList.remove("hide");

setTimeout(()=>{

item.style.opacity="1";

},50);



}

else{


item.style.opacity="0";


setTimeout(()=>{

item.classList.add("hide");

},300);



}


});



});


});