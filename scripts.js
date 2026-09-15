let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.slider');
let itens = document.querySelectorAll('.slider .list .item');
let indicator = document.querySelector('.indicators');
let dots = document.querySelectorAll('.indicators ul li');

let active = 0;
let firstPosition = 0;
let lastPosition = itens.length - 1;

function setSlider() {
    if (!container) return;

    let itemOld = container.querySelector('.list .item.active');
    if (itemOld) {
        itemOld.classList.remove('active');
    }

    let dotsOld = indicator ? indicator.querySelector('ul li.active') : null;
    if (dotsOld) {
        dotsOld.classList.remove('active');
    }

    if (itens[active]) itens[active].classList.add('active');
    if (dots[active]) dots[active].classList.add('active');

    if (indicator) {
        indicator.querySelector('.number').innerHTML = (active + 1 < 10 ? '0' : '') + (active + 1);
    }
}

if (nextButton) {
    nextButton.onclick = () => {
        active = active + 1 > lastPosition ? 0 : active + 1;
        setSlider();
    };
}

if (prevButton) {
    prevButton.onclick = () => {
        active = active - 1 < firstPosition ? lastPosition : active - 1;
        setSlider();
    };
}

dots.forEach((li, index) => {
    li.addEventListener('click', () => {
        active = index;
        setSlider();
    });
});

/* Lógica do Menu Três Traços */
const menuToggle = document.getElementById('menuToggle');
const drawerClose = document.getElementById('drawerClose');
const sideDrawer = document.getElementById('sideDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openMenu() {
    if (sideDrawer) sideDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');
}

function closeMenu() {
    if (sideDrawer) sideDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
}

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (drawerClose) drawerClose.addEventListener('click', closeMenu);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);