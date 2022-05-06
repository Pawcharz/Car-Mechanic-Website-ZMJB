const addOfferForm = async () => {
    const form = document.querySelector('.section-admin-offers .form-standard');

    const imageInput = form.querySelector('#imageInput-form');
    const imageLabelText = form.querySelector('#imageInput-form + label p');
    const filenameEl = form.querySelector('#filename');
    
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
addOfferForm();