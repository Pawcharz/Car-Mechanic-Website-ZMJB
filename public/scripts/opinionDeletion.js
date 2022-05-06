const opinionDeletion = async () => {
    const opinionCardButtons = document.querySelectorAll('.adminOpinion-card .btn-delete');
    
    const deletion = document.querySelector('.opinionDeletion');
    const closeBtn = deletion.querySelector('.btn-close');
    const innerDeletion = deletion.querySelector('.opinionDeletion-main');

    for (let i = 0; i < opinionCardButtons.length; i++) {
        let opinionCard = opinionCardButtons[i];
        opinionCard.addEventListener('click', (e) => {
            let id = opinionCard.dataset.id;
            
            fetch('/getOpinionById', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id
                })
            })
            .then( res => res.json())
            .then( res => {
    
                let idEl = deletion.querySelector('#id');
                idEl.value = id;


                let name = res.name;
                let nameEl = deletion.querySelector('#name');
                nameEl.innerText = name;
    
                let rating = res.rating;
                let ratingEl = deletion.querySelector('#rating')

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
                let contentEl = deletion.querySelector('#content')
                contentEl.innerText = content;

                

                deletion.classList.add('opinionDeletion-active');
            })
        }) 
    }

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deletion.classList.remove('opinionDeletion-active');
    })
    deletion.addEventListener('click', (e) => {
        e.stopPropagation();
        deletion.classList.remove('opinionDeletion-active');
    })
    innerDeletion.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}
opinionDeletion();