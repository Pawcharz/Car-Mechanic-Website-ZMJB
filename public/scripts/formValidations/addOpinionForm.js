const form = document.querySelector('#form-addOffer');
const confirmButton = form.querySelector('button');

const nameInput = form.querySelector('input[name="name"]');
const nameMessage = nameInput.nextElementSibling;

const ratingContainer = form.querySelector('.inputBoxes-container-rating-main');
const ratingInputs = ratingContainer.querySelectorAll('input[name="rating"]');
const ratingMessage = ratingContainer.nextElementSibling;

const contentInput = form.querySelector('textarea[name="content"]');
const contentMessage = contentInput.nextElementSibling;



let validateName = () => {
    let valid = false;
    let regex = /^[a-zA-Ząęćśżźłó ]+$/;

    let value = nameInput.value;
    if(regex.test(value) && value.length >= 3) {
        valid = true;
        nameMessage.textContent = "";
    }
    else {
        valid = false;
        nameMessage.textContent = "Imię i Nazwisko musi być dłuższe niż 3 znaki i nie może zawierać znaków specjalnych.";
    }

    
    return valid;
}
let validateRating = () => {
    let valid = false;

    let value = ratingContainer.querySelector('input:checked');
    console.log(value)
    
    if(value != null) {
        valid = true;
        ratingMessage.textContent = "";
    }
    else {
        valid = false;
        ratingMessage.textContent = "Zaznacz jak oceniasz nasze usługi.";
    }


    return valid;
}
let validateContent = () => {
    let valid = false;

    let value = contentInput.value;
    
    if(value.length >= 12) {
        valid = true;
        contentMessage.textContent = "";
    }
    else {
        valid = false;
        contentMessage.textContent = "Wiadomość musi mieć przynajmniej 12 znaków.";
    }


    return valid;
}

const validateForm = () => {
    let valid = false;

    let isNameValid = validateName();
    let isRatingValid = validateRating();
    let isContentValid = validateContent();

    if(isNameValid && isRatingValid && isContentValid) {
        valid = true;
    }
    else {
        valid = false;
    }


    return valid;
}