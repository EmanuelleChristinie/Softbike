let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.slider');
let itens = document.querySelectorAll('.slider .list .item');
let indicator = document.querySelector('.indicators');
let dots = document.querySelectorAll('ul li');


let active = 0;
let firstPosition = 0;
let lastPosition = itens.length - 1; /** quantidades de itens + 1 mudando a posição*/


function setSlider() {

    let itemOld = container.querySelector('.list .item.active');
    if (itemOld) {
        itemOld.classList.remove('active');
    }

    let dotsOld = indicator.querySelector('ul li.active');
    if (dotsOld) {
        dotsOld.classList.remove('active');
    }
    
    itens[active].classList.add('active');
     dots[active].classList.add('active')

    indicator.querySelector('.number').innerHTML = (active + 1 < 10 ? '0' : '') + (active + 1);
    
}


nextButton.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1
    setSlider();
}

prevButton.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1
    setSlider();
    itens[active].classList.add('active');
}

dots.forEach((li, index) => {
    li.addEventListener('click', () => {
        active = index;
        setSlider();
    });
});