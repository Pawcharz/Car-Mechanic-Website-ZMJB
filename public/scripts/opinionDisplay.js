const opinionDisplay = async () => {
    const opinionCards = document.querySelectorAll('.opinion-card');
    
    const display = document.querySelector('.opinionDisplay');
    const closeBtn = display.querySelector('.btn-close');
    const innerDisplay = display.querySelector('.opinionDisplay-main');

    for (let i = 0; i < opinionCards.length; i++) {
        let opinionCard = opinionCards[i];
        opinionCard.addEventListener('click', (e) => {
            let id = opinionCard.dataset.dbId;
    
            fetch('/getOpinionById', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id
                })
            })
            .then( res => res.json())
            .then( res => {
    
                let name = res.name;
                let nameEl = display.querySelector('#name');
                nameEl.innerText = name;
    
                let rating = res.rating;
                let ratingEl = display.querySelector('#rating')

                let ratingStars = ratingEl.querySelectorAll('h3');
                for (let j = 0; j < ratingStars.length; j++) {
                    const ratingStar = ratingStars[j];

                    if(j+1 <= rating) {
                        ratingStar.innerText = "★";
                    }
                    else {
                        ratingStar.innerText = "☆";
                    }
                }

                let content = res.content;
                let contentEl = display.querySelector('#content')
                contentEl.innerText = content;

                

                display.classList.add('opinionDisplay-active');
            })
        }) 
    }

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        display.classList.remove('opinionDisplay-active');
    })
    display.addEventListener('click', (e) => {
        e.stopPropagation();
        display.classList.remove('opinionDisplay-active');
    })
    innerDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}
opinionDisplay();