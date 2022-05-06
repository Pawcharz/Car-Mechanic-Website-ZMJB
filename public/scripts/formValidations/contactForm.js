const form = document.querySelector('.form-standard');
const confirmButton = form.querySelector('button');

const nameInput = form.querySelector('input[name="name"]');
const nameMessage = nameInput.nextElementSibling;

const phoneNrInput = form.querySelector('input[name="phoneNr"]');
const phoneNrMessage = phoneNrInput.nextElementSibling;

const emailInput = form.querySelector('input[name="email"]');
const emailMessage = emailInput.nextElementSibling;

const messageInput = form.querySelector('textarea[name="message"]');
const messageMessage = messageInput.nextElementSibling;


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
let validatePhoneNr = () => {
    let valid = false;
    let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;

    let value = phoneNrInput.value;
    
    if(regex.test(value)) {
        valid = true;
        phoneNrMessage.textContent = "";
    }
    else {
        valid = false;
        phoneNrMessage.textContent = "Podano nieprawidłowy numer telefonu.";
    }
    
    return valid;
}
let validateEmail = () => {
    let valid = false;
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let value = emailInput.value;
    
    if(regex.test(value)) {
        valid = true;
        emailMessage.textContent = "";
    }
    else {
        valid = false;
        emailMessage.textContent = "Podano nieprawidłowy adres email.";
    }
    
    return valid;
}
let validateMessage = () => {
    let valid = false;

    let value = messageInput.value;
    
    if(value.length >= 12) {
        valid = true;
        messageMessage.textContent = "";
    }
    else {
        valid = false;
        messageMessage.textContent = "Wiadomość musi mieć przynajmniej 12 znaków.";
    }


    return valid;
}

const validateForm = () => {
    let valid = false;

    let isNameValid = validateName();
    let isPhoneNrValid = validatePhoneNr();
    let isEmailValid = validateEmail();
    let isMessageValid = validateMessage();

    if(isNameValid && isPhoneNrValid && isEmailValid && isMessageValid) {
        valid = true;
    }
    else {
        valid = false;
    }


    return valid;
}