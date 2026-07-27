/*==================================================
    TIMOSA FOUNDATION
    DONATE.JS

    Professional Donation Page JavaScript

    Features:
    - Loader
    - Navigation
    - Donation Selection
    - Counters
    - FAQ
    - Animations
    - Validation
    - UI Enhancements

==================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


/*==================================================
    PAGE LOADER
==================================================*/


const loader =
document.querySelector(
".page-loader"
);


window.addEventListener(
"load",
()=>{


if(loader){


setTimeout(()=>{


loader.style.opacity="0";


loader.style.visibility="hidden";


},500);


}


});





/*==================================================
    MOBILE MENU
==================================================*/


const menuBtn =
document.querySelector(
".mobile-menu-btn"
);


const navMenu =
document.querySelector(
".nav-menu"
);



if(menuBtn && navMenu){


menuBtn.addEventListener(
"click",
()=>{


navMenu.classList.toggle(
"active"
);


menuBtn.classList.toggle(
"active"
);


document.body.classList.toggle(
"menu-open"
);



});


}





/*==================================================
    DONATION FREQUENCY
==================================================*/


const frequencyButtons =
document.querySelectorAll(
".frequency-btn"
);



frequencyButtons.forEach(
button=>{


button.addEventListener(
"click",
()=>{


frequencyButtons.forEach(
btn=>{

btn.classList.remove(
"active"
);

});


button.classList.add(
"active"
);



});


});





/*==================================================
    DONATION AMOUNT SELECTOR
==================================================*/


const amountButtons =
document.querySelectorAll(
".amount-btn"
);


const customAmount =
document.querySelector(
".amount-input input"
);



amountButtons.forEach(
button=>{


button.addEventListener(
"click",
()=>{


amountButtons.forEach(
btn=>{

btn.classList.remove(
"active"
);

});


button.classList.add(
"active"
);



if(customAmount){


customAmount.value =
button.dataset.amount;


}



});


});





if(customAmount){


customAmount.addEventListener(
"input",
()=>{


amountButtons.forEach(
btn=>{

btn.classList.remove(
"active"
);

});


});


}





/*==================================================
    COUNTER ANIMATION
==================================================*/


const counters =
document.querySelectorAll(
".counter"
);



const runCounter =
(counter)=>{


const target =
Number(
counter.dataset.target
);



let count = 0;


const speed =
target / 100;



const update = ()=>{


count += speed;



if(count < target){


counter.innerText =
Math.ceil(count);



requestAnimationFrame(
update
);



}else{


counter.innerText =
target.toLocaleString(
"en-US"
);



}



};


update();


};



const counterObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(
entry=>{


if(
entry.isIntersecting
){


runCounter(
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



counters.forEach(
counter=>{


counterObserver.observe(
counter
);



});





/*==================================================
    SCROLL REVEAL ANIMATION
==================================================*/


const revealElements =
document.querySelectorAll(
".reveal, .reveal-left, .reveal-right"
);



const revealObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(
entry=>{


if(
entry.isIntersecting
){


entry.target.classList.add(
"active"
);


revealObserver.unobserve(
entry.target
);



}



});


},
{

threshold:.15

}
);



revealElements.forEach(
element=>{


revealObserver.observe(
element
);



});





/*==================================================
    FAQ ACCORDION
==================================================*/


const faqItems =
document.querySelectorAll(
".faq-item"
);



faqItems.forEach(
item=>{


const question =
item.querySelector(
".faq-question"
);



if(question){


question.addEventListener(
"click",
()=>{


faqItems.forEach(
other=>{


if(
other !== item
){


other.classList.remove(
"active"
);



}



});



item.classList.toggle(
"active"
);



});


}


});





/*==================================================
    BACK TO TOP
==================================================*/


const backTop =
document.querySelector(
".back-to-top"
);



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 500){


backTop?.classList.add(
"show"
);



}else{


backTop?.classList.remove(
"show"
);



}



});



if(backTop){


backTop.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}





/*==================================================
    SMOOTH SCROLL
==================================================*/


document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(
link=>{


link.addEventListener(
"click",
(e)=>{


const target =
document.querySelector(
link.getAttribute("href")
);



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
    DONATION FORM VALIDATION
==================================================*/


const donationForm =
document.querySelector(
".donation-form"
);



if(donationForm){


donationForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const inputs =
donationForm.querySelectorAll(
"input[required], select[required]"
);



let valid=true;



inputs.forEach(
input=>{


if(!input.value.trim()){


input.style.borderColor =
"#DC2626";


valid=false;



}else{


input.style.borderColor =
"#D1D5DB";



}



});



if(valid){


showMessage(
"Thank you for your generous donation. Redirecting to secure payment..."
);



}



});


}





/*==================================================
    NEWSLETTER
==================================================*/


const newsletter =
document.querySelector(
".newsletter-form"
);



if(newsletter){


newsletter.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const email =
newsletter.querySelector(
"input"
);



if(email.value){


showMessage(
"You have successfully subscribed to TIMOSA updates."
);



email.value="";


}



});


}





/*==================================================
    NOTIFICATION SYSTEM
==================================================*/


function showMessage(message){


const notification =
document.createElement(
"div"
);



notification.className =
"js-notification";



notification.innerHTML =
`

<i class="fas fa-check-circle"></i>

<span>${message}</span>

`;



document.body.appendChild(
notification
);



setTimeout(
()=>{


notification.classList.add(
"show"
);



},
100
);



setTimeout(
()=>{


notification.classList.remove(
"show"
);



setTimeout(
()=>{


notification.remove();



},
500
);



},
4000
);



}





/*==================================================
    NAVBAR SCROLL EFFECT
==================================================*/


const navbar =
document.querySelector(
".navbar"
);



window.addEventListener(
"scroll",
()=>{


if(
window.scrollY > 80
){


navbar?.classList.add(
"scrolled"
);



}else{


navbar?.classList.remove(
"scrolled"
);



}



});





/*==================================================
    INITIALIZATION COMPLETE
==================================================*/


console.log(
`
================================

 TIMOSA DONATION SYSTEM READY

 ✓ Form Validation
 ✓ Payment UI
 ✓ Animations
 ✓ Counters
 ✓ FAQ System
 ✓ Responsive Controls

================================
`
);



});