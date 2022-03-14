import i18Obj from './translate.js';

const hamburger = document.querySelector('.hamburger');
const header__nav = document.querySelector('.header__nav');
const navLink = document.querySelectorAll(".nav__link");
const wrapper = document.querySelector('body');
const header = document.querySelector('.container__header');
const portfolioImages = document.querySelectorAll('.photo__img');
const portfolioBtns = document.querySelector('.portfolio__buttons');
const buttons = document.querySelectorAll('.portfolio__button');
const ru = document.querySelector('.switch__rus');
const en = document.querySelector('.switch__en');
const temD = document.querySelector('.light-tem');  
const sectionHero = document.querySelector('.section__hero');
const sectionTitle = document.querySelectorAll('.section__title');
const section = document.querySelectorAll('.section');
const logo = document.querySelector('.logo')
const navSwitch = document.querySelector('.nav__switch')
const temN = document.querySelector('.night-teme');
const color = document.querySelectorAll('.color');
const contact = document.querySelector('.contacts__container');
const bgNight = document.querySelectorAll('.bg__night')
const logoFooter = document.querySelectorAll('.color-link')
const pinterest= document.querySelector('.pinterest')
const placeholder =  document.querySelectorAll('.bg__placeholder')
const line = document.querySelectorAll('.line')
const linkBlack =document.querySelectorAll('.black')
const switchLang = document.querySelectorAll('.switch')

let lang = "en"
let theme = "dark"

function togMenu() {
    document.documentElement.classList.toggle('menu')
    wrapper.classList.toggle('menu');
    hamburger.classList.toggle('open');
    header__nav.classList.toggle('open');
    header.classList.toggle('new__header');
    if(!header.classList.contains('bg__day')){
        navLink.forEach((x)=>x.classList.toggle('color-gold'))
    }
    if(header.classList.contains('bg__day')){
        header__nav.classList.toggle('nav-white')
    }
}
hamburger.addEventListener('click', togMenu);

function exitMenu () {
    hamburger.classList.remove("open");
    header__nav.classList.remove("open");
    wrapper.classList.remove('menu');
    header.classList.remove('new__header');
}

navLink.forEach((x)=>x.addEventListener("click", exitMenu));

function changeImage(event) {
    if(event.target.classList.contains('portfolio__button')) {
        if (event.target.dataset.season === "winter") {
            portfolioImages.forEach((img, index) => img.style.backgroundImage = `url('./assets/img/winter/${index + 1}.jpg')`);
        } else if (event.target.dataset.season ==="spring") {
            portfolioImages.forEach((img, index) => img.style.backgroundImage = `url('./assets/img/spring/${index + 1}.jpg')`);
        } else if (event.target.dataset.season === "summer") {
            portfolioImages.forEach((img, index) => img.style.backgroundImage = `url('./assets/img/summer/${index + 1}.jpg')`);
        }else {
            portfolioImages.forEach((img, index) => img.style.backgroundImage = `url('./assets/img/autumn/${index + 1}.jpg')`);
        }
    }
}
portfolioBtns.addEventListener(('click'),changeImage);

buttons.forEach((x)=>x.addEventListener("click", changeClassActive));

function changeClassActive (event) {
    buttons.forEach((x)=>x.classList.remove('bottun__activ'));
    if(event.target.classList.contains('portfolio__button')) {
        event.target.classList.toggle('bottun__activ');
    } 
    if (event.target.classList.contains('day-light-color-button')){
    buttons.forEach((x)=>x.classList.remove('bottun__activ-night'));
        event.target.classList.toggle('bottun__activ-night');
    }
}
switchLang.forEach((x)=>x.addEventListener("click", chanceNavSwitch));

function chanceNavSwitch (event) {
    switchLang.forEach((x)=>x.classList.remove('color-gold'));
    if(event.target.classList.contains('switch')) {
        event.target.classList.toggle('color-gold');
    } 
}

function getTranslate (Language) {
    const data = document.querySelectorAll('[data-i18]');
    data.forEach((x) => {
        if (x.placeholder) {
            x.placeholder = i18Obj[Language][x.dataset.i18]
            x.textContent = ''
        } x.textContent = i18Obj[Language][x.dataset.i18]
    })
    lang = Language
}

en.addEventListener('click', () => getTranslate("en"));
ru.addEventListener('click', () => getTranslate("ru"));

temD.addEventListener('click', () => lightTems('light'));
temN.addEventListener('click', () => lightTems('dark'));

function lightTems (themeScreen) {
    section.forEach((x)=>x.classList.toggle('day-light'));
    sectionTitle.forEach((x)=>x.classList.toggle('day-light'))
    document.body.classList.toggle('day-light','day-light-color');
    contact.classList.toggle('bg__contacts');
    header.classList.toggle('bg__day');
    sectionHero.classList.toggle('bg__day');
    logo.classList.toggle('logo__day');
    navSwitch.classList.toggle('day-light-color');
    color.forEach((x)=>x.classList.toggle('day-light-color'))
    buttons.forEach((x)=>x.classList.toggle('day-light-color-button'))
    bgNight.forEach((x)=>x.classList.toggle('day-light'))
    logoFooter.forEach((img, index) => img.style.backgroundImage = `url('./assets/svg/footer/${index + 1}.svg')`);
    pinterest.classList.toggle('logo__contact');
    placeholder.forEach((x)=>x.classList.toggle('bg__placeholder-new'));
    sectionTitle.forEach((x)=>x.classList.toggle('section__title-day'))
    linkBlack.forEach((x)=>x.classList.toggle('black__color'))
    line.forEach((x)=>x.classList.toggle('black__background'))
    temD.classList.toggle('light')
    temN.classList.toggle('night')

    theme = themeScreen
}

navLink.forEach((x)=>x.addEventListener("click", changeClassActiveLink));

function changeClassActiveLink (event) {
    navLink.forEach((x)=>x.classList.remove('nav__link-active'));
    if(event.target.classList.contains('nav__link')) {
        event.target.classList.toggle('nav__link-active');
    } 
}

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}

window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        let lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
    if(localStorage.getItem('theme')) {
        let theme = localStorage.getItem('theme');
        if (theme==="dark") {
            return 
        }else lightTems(theme);
    }
}

window.addEventListener('load', getLocalStorage)

// const bn = document.querySelector('.focus')

// bn.addEventListener('click', function (e) {
// const x = e.clientX
// const y = e.clientY

// const buttonTop = e.target.offsetTop
// const buttonLeft = e.target.offsetLeft

// const xInside = x - buttonLeft
// const yInside = y - buttonTop

// const circle = document.createElement('span')
// circle.classList.add('circle')
// circle.style.top = e.target.offsetTop + 'px'
// circle.style.left = buttonLeft + 'px'

// this.appendChild(circle)

// setTimeout(() => circle.remove(), 500)
// })