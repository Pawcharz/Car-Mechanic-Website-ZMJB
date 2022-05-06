const nav = document.querySelector('.nav');
const navList = nav.querySelector('.nav-list');
const navButton = nav.querySelector('.nav-button');

const svgLines = nav.querySelectorAll('.line');

navButton.addEventListener('click', e => {
    
    if(window.getComputedStyle(navList).visibility == "hidden") {
        navList.classList.add('active');
        svgLines.forEach(lineEl => {
            lineEl.classList.add('opened')
        });
    }
    else {
        navList.classList.remove('active');
        svgLines.forEach(lineEl => {
            lineEl.classList.remove('opened')
        });
    }
})
