/*=====================================================
CONTACT.JS
TIMOSA FOUNDATION

Professional Interactive JavaScript

Features:
- Preloader
- Header Scroll
- Mobile Menu
- Dropdown
- Hero Slider
- FAQ Accordion
- Scroll Reveal
- Contact Form
- Newsletter
- Back To Top
- Ripple Effect
- Current Year

======================================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*=====================================================
PRELOADER
======================================================*/


const preloader=document.querySelector("#preloader");


window.addEventListener("load",()=>{


    if(preloader){


        preloader.style.opacity="0";


        setTimeout(()=>{


            preloader.remove();


        },700);


    }


});





/*=====================================================
HEADER SCROLL
======================================================*/


const header=document.querySelector("header");


function headerScroll(){


    if(!header)return;


    if(window.scrollY>60){


        header.classList.add("scrolled");


    }else{


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


const menuToggle=
document.querySelector(".menu-toggle");


const navLinks=
document.querySelector(".nav-links");


if(menuToggle && navLinks){


menuToggle.addEventListener("click",()=>{


    menuToggle.classList.toggle("active");


    navLinks.classList.toggle("open");


    document.body.classList.toggle(
    "menu-open"
    );


});



document.querySelectorAll(".nav-links a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        menuToggle.classList.remove("active");


        navLinks.classList.remove("open");


        document.body.classList.remove(
        "menu-open"
        );


    });


});


}





/*=====================================================
MOBILE DROPDOWN
======================================================*/


document.querySelectorAll(".dropdown > a")
.forEach(drop=>{


drop.addEventListener("click",function(e){


    if(window.innerWidth <=1100){


        e.preventDefault();


        this.parentElement.classList.toggle(
        "active"
        );


    }


});


});







/*=====================================================
HERO SLIDER
======================================================*/


const slides=
document.querySelectorAll(".slide");


const dots=
document.querySelectorAll(
".slider-navigation .dot"
);



let slideIndex=0;



function showSlide(index){


    slides.forEach(slide=>

        slide.classList.remove("active")

    );


    dots.forEach(dot=>

        dot.classList.remove("active")

    );



    if(slides[index]){


        slides[index]
        .classList.add("active");


    }



    if(dots[index]){


        dots[index]
        .classList.add("active");


    }


}



function nextSlide(){


    slideIndex++;


    if(slideIndex>=slides.length){


        slideIndex=0;


    }


    showSlide(slideIndex);


}



if(slides.length){


setInterval(
nextSlide,
6000
);


}



dots.forEach((dot,index)=>{


dot.addEventListener("click",()=>{


    slideIndex=index;


    showSlide(index);


});


});








/*=====================================================
FAQ ACCORDION
======================================================*/


const faqItems=
document.querySelectorAll(".faq-item");



faqItems.forEach(item=>{


const button=
item.querySelector(".faq-question");


const answer=
item.querySelector(".faq-answer");



button.addEventListener("click",()=>{


    faqItems.forEach(other=>{


        if(other!==item){


            other.classList.remove(
            "active"
            );


            other.querySelector(
            ".faq-answer"
            ).style.maxHeight=null;


        }


    });



    item.classList.toggle(
    "active"
    );



    if(item.classList.contains("active")){


        answer.style.maxHeight=
        answer.scrollHeight+"px";


    }else{


        answer.style.maxHeight=null;


    }



});


});









/*=====================================================
SCROLL REVEAL
======================================================*/


const revealItems=document.querySelectorAll(

".contact-card,\
.contact-left,\
.contact-form-wrapper,\
.social-card,\
.location-card,\
.map-wrapper,\
.faq-item,\
.cta-content"

);



function reveal(){


const trigger=
window.innerHeight-100;



revealItems.forEach(item=>{


const top=
item.getBoundingClientRect().top;



if(top<trigger){


    item.classList.add("show");


}


});


}



reveal();


window.addEventListener(
"scroll",
reveal
);







/*=====================================================
CONTACT FORM
======================================================*/


const contactForm=
document.querySelector(".contact-form");



if(contactForm){


contactForm.addEventListener(
"submit",
function(e){


e.preventDefault();



const button=
this.querySelector("button");



const old=
button.innerHTML;



button.innerHTML=
`
<i class="fas fa-spinner fa-spin"></i>
Sending...
`;



button.disabled=true;




setTimeout(()=>{


alert(
"Thank you for contacting TIMOSA Foundation. We will respond shortly."
);



this.reset();



button.innerHTML=old;


button.disabled=false;



},1800);



});


}







/*=====================================================
NEWSLETTER FORM
======================================================*/


const newsletter=
document.querySelector(".newsletter-form");



if(newsletter){


newsletter.addEventListener(
"submit",
e=>{


e.preventDefault();


alert(
"Thank you for subscribing to TIMOSA Foundation updates."
);


newsletter.reset();


});


}







/*=====================================================
RIPPLE BUTTON EFFECT
======================================================*/


document.querySelectorAll(
".btn-primary,.btn-secondary"
)
.forEach(btn=>{


btn.addEventListener(
"click",
function(e){



const ripple=
document.createElement("span");


ripple.className="ripple";



const rect=
this.getBoundingClientRect();



ripple.style.left=
`${e.clientX-rect.left}px`;



ripple.style.top=
`${e.clientY-rect.top}px`;



this.appendChild(ripple);



setTimeout(()=>{


ripple.remove();


},700);



});


});








/*=====================================================
BACK TO TOP
======================================================*/


const backTop=
document.querySelector(".back-to-top");



if(backTop){


window.addEventListener(
"scroll",
()=>{


if(window.scrollY>450){


backTop.classList.add(
"show"
);


}else{


backTop.classList.remove(
"show"
);


}


});




backTop.addEventListener(
"click",
e=>{


e.preventDefault();



window.scrollTo({

top:0,

behavior:"smooth"

});


});


}







/*=====================================================
FLOATING ICON ANIMATION
======================================================*/


document.querySelectorAll(
".info-icon,.location-icon"
)
.forEach((icon,index)=>{


icon.animate([

{
transform:"translateY(0)"
},

{
transform:"translateY(-8px)"
},

{
transform:"translateY(0)"
}

],{

duration:3000 + index*400,

iterations:Infinity

});


});






/*=====================================================
CURRENT YEAR
======================================================*/


const year=
document.querySelector("#year");


if(year){


year.textContent=
new Date().getFullYear();


}



});