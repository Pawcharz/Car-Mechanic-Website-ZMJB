const deletionPopUP = async () => {
    const offersDeletionBtns = document.querySelectorAll('.adminOffer-card .btn-delete');
    const deletion = document.querySelector('.offerDeletion');
    const innerDeletion = deletion.querySelector('.offerDeletion-outter');
    const closeBtn = deletion.querySelector('.btn-close');


    
    function toBase64(arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
    offersDeletionBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            let id = button.dataset.id;

            fetch('/fetchOfferById', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id
                })
            })
            .then( res => res.json())
            .then( res => {

                let image = res.img;
                let imageBufferData = new Uint8Array(image.data.data)

                let imageEl = deletion.querySelector('#image');
                imageEl.src = `data:image/png;base64,${toBase64(imageBufferData)}`;


                let idEl = deletion.querySelector('#id');
                idEl.value = id;

                let name = res.name;
                let nameEl = deletion.querySelector('#name');
                nameEl.innerText = name;
                
                let time = res.time;
                let timeEl = deletion.querySelector('#time')
                timeEl.innerText = time;

                let price = res.price;
                let priceEl = deletion.querySelector('#price')
                priceEl.innerText = price;
                
                let description = res.description;
                let descriptionEl = deletion.querySelector('#description')
                descriptionEl.innerText = description;


                deletion.classList.add('offerDeletion-active');
            })



        })
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deletion.classList.remove('offerDeletion-active');
    })
    deletion.addEventListener('click', (e) => {
        e.stopPropagation();
        deletion.classList.remove('offerDeletion-active');
    })
    innerDeletion.addEventListener('click', (e) => {
        e.stopPropagation();
    })

    
}
deletionPopUP();