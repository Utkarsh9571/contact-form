const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const isValidName = (name) => {
    const re = /^[a-zA-Z\s'-]+$/;
    return re.test(name);
};

const form = document.getElementById('form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email-input');
const queryInputs = document.querySelectorAll('input[type="radio"][name="enquiry"]');
const queryError = document.querySelector('.error-query');
const iconRadioCheck = document.getElementById('radio-selected')
const messageInput = document.getElementById('textarea');
const checkboxInput = document.querySelector('input[type="checkbox"][name="checkbox"]');
const checkboxError = document.querySelector('.error-unchecked-terms');
const iconCheckbox = document.getElementById('icon-checkbox')
const queryLabel = document.getElementById('query-type')
const enquirylabel = document.getElementById('enquiry-label')
const requestlabel = document.getElementById('request-label')

let isValidationOn = false;

const resetElm = (elm) => {
    elm.classList.remove('invalid');
    const errorElement = elm.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
        errorElement.classList.add('hidden');
    }
};

const inputs = [firstNameInput, lastNameInput, emailInput, messageInput];

const invalidateInputs = (elm) => {
    elm.classList.add('invalid');
    const errorElement = elm.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
        errorElement.classList.remove('hidden');
    }
};

const validateInputs = () => {
    if (!isValidationOn) return true; // Return true if validation is off

    resetElm(firstNameInput);
    resetElm(lastNameInput);
    resetElm(emailInput);
    resetElm(messageInput);

    let formIsValid = true;

    if (!isValidName(firstNameInput.value)) {
        invalidateInputs(firstNameInput);
        formIsValid = false;
    }
    if (!isValidName(lastNameInput.value)) {
        invalidateInputs(lastNameInput);
        formIsValid = false;
    }
    if (!isValidEmail(emailInput.value)) {
        invalidateInputs(emailInput);
        formIsValid = false;
    }
    if (!messageInput.value) {
        invalidateInputs(messageInput);
        formIsValid = false;
    }

    // Validate Radio Buttons
    let querySelected = false;
    queryInputs.forEach(radio => {
        if (radio.checked) {
            querySelected = true;
        }
    });
    if (!querySelected) {
        if (queryError) {
            queryError.classList.remove('hidden');
        }
        formIsValid = false;
    } else {
        if (queryError) {
            queryError.classList.add('hidden');
        }
    }

    // Validate Checkbox
    if (!checkboxInput.checked) {
        if (checkboxError) {
            checkboxError.classList.remove('hidden');
            iconCheckbox.style.display = 'none';
        }
        formIsValid = false;
    } else {
        if (checkboxError) {
            checkboxError.classList.add('hidden');
            iconCheckbox.style.display = 'block';
        }
    }

    return formIsValid;
};

const changeEnquiryBg = () =>{
    if(enquirylabel.style.backgroundColor === "white"){
        enquirylabel.style.backgroundColor = 'hsl(148, 38%, 91%)';
        enquirylabel.style.border = "2px solid var(--Green-600-medium)";
        requestlabel.style.backgroundColor = "";
    } else{        
        enquirylabel.style.backgroundColor = 'white';
        requestlabel.style.border = "1px solid var(--Grey-500-medium)";
    }
}
const changeRequestBg = () =>{
    if(requestlabel.style.backgroundColor === "white"){
        requestlabel.style.backgroundColor = 'hsl(148, 38%, 91%)';
        requestlabel.style.border = "2px solid var(--Green-600-medium)";
        enquirylabel.style.backgroundColor = "";
    } else{        
        requestlabel.style.backgroundColor = 'white';
        enquirylabel.style.border = "1px solid var(--Grey-500-medium)";
    }
}

enquirylabel.addEventListener('click', ()=>{
    changeEnquiryBg();
})

requestlabel.addEventListener('click', ()=>{
    changeRequestBg();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    isValidationOn = true;
    const formIsValid = validateInputs();

    if (formIsValid) {
        document.querySelector('.success-message').style.display = 'block';
    } else {
        document.querySelector('.success-message').style.display = 'none';
    }
});

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (isValidationOn) {
            validateInputs();
        }
    });
});

queryInputs.forEach(radio => {
    radio.addEventListener('change', () => {
        if (isValidationOn) {
            validateInputs();
        }
        if (queryError) {
            queryError.classList.add('hidden');
        }
    });
});

checkboxInput.addEventListener('click', () => {
    if (isValidationOn) {
        validateInputs();
    }
    if (checkboxError) {
        checkboxError.classList.add('hidden');
    } else{
    }
});