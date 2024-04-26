/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal('.home__data, .footer__container, .footer__group');
sr.reveal('.logos__img', { delay: 700, origin: 'bottom' });
sr.reveal('.logos__img, .program__card, .pricing__card', { interval: 100 });
sr.reveal('.choose__img, .calculate__content', { origin: 'left' });
sr.reveal('.choose__content, .calculate__img', { origin: 'right' });

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form');
const calculateCm = document.getElementById('calculate-cm');
const calculateKg = document.getElementById('calculate-kg');
const calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
    e.preventDefault();

    if (calculateCm.value === '' || calculateKg.value === '') {
        calculateMessage.classList.remove('color-green');
        calculateMessage.classList.add('color-red');
        calculateMessage.textContent = 'Fill in the Height and Weight';
        setTimeout(() => {
            calculateMessage.textContent = '';
        }, 3000);
    } else {
        const cm = calculateCm.value / 100;
        const kg = calculateKg.value;
        const bmi = Math.round(kg / (cm * cm));

        if (bmi < 18.5) {
            calculateMessage.classList.add('color-green');
            calculateMessage.innerHTML = `Your BMI is ${bmi} and you are <a href="https://www.youtube.com/watch?v=lAxqyzmGpUg&list=PLAmWsNoj4IeVNXRRu-dTX0fqbBzeW7Kl8">underweight</a>`;
        } else if (bmi < 25) {
            calculateMessage.classList.add('color-green');
            calculateMessage.innerHTML = `Your BMI is ${bmi} and you are <a href="https://www.youtube.com/watch?v=iWtFLj6yV1I">healthy</a>`;
        } else {
            calculateMessage.classList.add('color-red');
            calculateMessage.innerHTML = `Your BMI is ${bmi} and you are <a href="https://www.youtube.com/watch?v=9FBIaqr7TjQ">overweight</a>`;
        }

        calculateCm.value = '';
        calculateKg.value = '';

        setTimeout(() => {
            calculateMessage.textContent = '';
        }, 4000);
    }
};

calculateForm.addEventListener('submit', calculateBmi);


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');
const contactUser = document.getElementById('contact-user');

const sendEmail = (e) =>{
    e.preventDefault()
    // Check if the field has a value
    if(contactUser.value===''){
        // Add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')
        // Show message
        contactMessage.textContent ='You must enter your email'

        // Remove message three seconds
        setTimeout(()=>{
            contactMessage.textContent=''
        },3000)

    }else{
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_d345ebr','template_wmdjfei','#contact-form','dfYnpCK7QZwDVvKOi')
             .then(()=>{
                // Show message and add color
                contactMessage.classList.add('color-green')
                contactMessage.textContent ='You registered successfully'
                // Remove message after three seconds
                setTimeout(()=>{
                    contactMessage.textContent = ''
                },3000)

             },(error)=>{
                // Mail sending error
                alert('OOPS! SOMETHING HAS FAILED...',error)
             })
    
        // To clear the input field
        contactUser.value =''
    }


}
contactForm.addEventListener('submit', sendEmail);
