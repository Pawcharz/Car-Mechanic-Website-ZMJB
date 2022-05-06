const offerEditor = async () => {

    const offersEditBtns = document.querySelectorAll('.adminOffer-card .btn-edit');
    const editor = document.querySelector('.offerEditor');
    const innerEditor = editor.querySelector('.offerEditor-outter');
    const closeBtn = editor.querySelector('.btn-close');


    const imageInput = editor.querySelector('#imageInput');
    const imageLabelText = editor.querySelector('#imageInput + label p');
    const filenameEl = editor.querySelector('#filename');



    function toBase64(arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
    offersEditBtns.forEach(button => {
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

                let imageEl = editor.querySelector('#image');
                imageEl.src = `data:image/png;base64,${toBase64(imageBufferData)}`;


                let idEl = editor.querySelector('#id');
                idEl.value = id;

                let name = res.name;
                let nameEl = editor.querySelector('#name');
                nameEl.value = name;
                
                let time = res.time;
                let timeEl = editor.querySelector('#time')
                timeEl.value = time;

                let price = res.price;
                let priceEl = editor.querySelector('#price')
                priceEl.value = price;
                
                let description = res.description;
                let descriptionEl = editor.querySelector('#description')
                descriptionEl.innerText = description;


                editor.classList.add('offerEditor-active');
            })



        })
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editor.classList.remove('offerEditor-active');


        imageInput.value = null;
        imageInput.classList.remove('fileInput-picked');
        filenameEl.textContent = "brak zdjęcia";
        imageLabelText.textContent = "Wybierz zdjęcie";
    })
    editor.addEventListener('click', (e) => {
        e.stopPropagation();
        editor.classList.remove('offerEditor-active');


        imageInput.value = null;
        imageInput.classList.remove('fileInput-picked');
        filenameEl.textContent = "brak zdjęcia";
        imageLabelText.textContent = "Wybierz zdjęcie";
    })
    innerEditor.addEventListener('click', (e) => {
        e.stopPropagation();
    })


    imageInput.addEventListener('change', () => {

        if(imageInput.files.length > 0) {
            imageInput.classList.add('fileInput-picked');
            
            let filename = imageInput.files[0].name;
            filenameEl.textContent = filename;
            imageLabelText.textContent = "Wybrano zdjęcie";
        }
        else {
            imageInput.classList.remove('fileInput-picked');
            filenameEl.textContent = "brak zdjęcia";
            imageLabelText.textContent = "Wybierz zdjęcie";
        }
    })

}
offerEditor();