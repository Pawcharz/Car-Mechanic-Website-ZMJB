const offerDisplay = async () => {
    const offerCards = document.querySelectorAll('.offer-card');
    const priceOfferCards = document.querySelectorAll('.priceOffer-card');

    const display = document.querySelector('.offerDisplay');
    const closeBtn = display.querySelector('.btn-close');
    const innerDisplay = display.querySelector('.offerDisplay-main');


    function toBase64(arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
    for (let i = 0; i < offerCards.length; i++) {
        let offerCard = offerCards[i];
        let seeMore = offerCard.querySelector('span');
        seeMore.addEventListener('click', (e) => {
            let id = offerCard.dataset.dbId;

            fetch('/fetchOfferById', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => res.json())
            .then(res => {

                let image = res.img;
                let imageBufferData = new Uint8Array(image.data.data)

                let imageEl = display.querySelector('#image');
                imageEl.src = `data:image/png;base64,${toBase64(imageBufferData)}`;


                let name = res.name;
                let nameEl = display.querySelector('#name');
                nameEl.innerText = name;

                let time = res.time;
                let timeEl = display.querySelector('#time')

                timeEl.innerText = time;

                if (time == 1)
                    timeEl.innerText += " godzinę";
                else if (time <= 4)
                    timeEl.innerText += " godziny";
                else
                    timeEl.innerText += " godzin";


                let price = res.price;
                let priceEl = display.querySelector('#price')
                priceEl.innerText = price + " zł";

                let description = res.description;
                let descriptionEl = display.querySelector('#description')
                descriptionEl.innerText = description;


                display.classList.add('offerDisplay-active');
            })
        })
    }
    for (let i = 0; i < priceOfferCards.length; i++) {
        let offerCard = priceOfferCards[i];
        offerCard.addEventListener('click', (e) => {
            let id = offerCard.dataset.dbId;

            fetch('/fetchOfferById', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => res.json())
            .then(res => {
                
                let image = res.img;
                let imageBufferData = new Uint8Array(image.data.data)

                let imageEl = display.querySelector('#image');
                imageEl.src = `data:image/png;base64,${toBase64(imageBufferData)}`;


                let name = res.name;
                let nameEl = display.querySelector('#name');
                nameEl.innerText = name;

                let time = res.time;
                let timeEl = display.querySelector('#time')

                timeEl.innerText = time;

                if (time == 1)
                    timeEl.innerText += " godzinę";
                else if (time <= 4)
                    timeEl.innerText += " godziny";
                else
                    timeEl.innerText += " godzin";


                let price = res.price;
                let priceEl = display.querySelector('#price')
                priceEl.innerText = price + " zł";

                let description = res.description;
                let descriptionEl = display.querySelector('#description')
                descriptionEl.innerText = description;



                display.classList.add('offerDisplay-active');
            })
        })
    }
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        display.classList.remove('offerDisplay-active');
    })
    display.addEventListener('click', (e) => {
        e.stopPropagation();
        display.classList.remove('offerDisplay-active');
    })
    innerDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}
offerDisplay();