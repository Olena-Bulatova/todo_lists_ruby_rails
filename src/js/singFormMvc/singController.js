export default class SignInController  {    
    constructor(model, subscribers) {
        this.model = model;
        this.subscribers = subscribers;
    }

    handleShowForm() {
        this.model.handleShowForm();
        this.handleShowSingIn();
        this.actionForForm();
    }


    handleShowSingIn() {
        this.model.handleShowSingIn();
    }

    handleShowSingUp() {
        this.model.handleShowSingUp();
    }

    validation(nameInput, surnameInput, loginInput, passInput) {

        if (nameInput && surnameInput && loginInput && passInput) {
            if(!nameInput.value) {
                nameInput.setCustomValidity('Please, enter name!');
                nameInput.reportValidity();
                return false;
            } else if(!surnameInput.value) {
                surnameInput.setCustomValidity('Please, enter surname!');
                surnameInput.reportValidity();                
                return false;
            } else if(!loginInput.value) {
                loginInput.setCustomValidity('Please, enter login!');
                loginInput.reportValidity();                
                return false;
            } else if(!passInput.value) {
                passInput.setCustomValidity('Please, enter password!');
                passInput.reportValidity();                
                return false;
            } else {
                return true;
            }

        } else {
            if(!loginInput.value) {
                loginInput.setCustomValidity('Please, enter login!');
                loginInput.reportValidity();                
                return false;
            } else if(!passInput.value) {
                passInput.setCustomValidity('Please, enter password!');
                passInput.reportValidity();
                return false;
            } else {
                return true;
            }
        } 

    }

    actionForForm() {
        const formTitle = document.querySelector('.form__title');
        const typeForm = document.querySelectorAll('.form__type');
        const formButton = document.querySelector('.form__button');

        formTitle.addEventListener('click', event => {
            let activeForm = document.querySelector('.form__type--active').innerText.toLowerCase();
            let currentElement = event.target;
            let currentText = currentElement.innerText.toLowerCase();

            if(activeForm !== currentText) {         
                if(currentText === 'sign in') {                    
                    this.handleShowSingIn();
                } else if(currentText === 'sign up') {
                    this.handleShowSingUp();                    
                }
            }
        });

        formButton.addEventListener('click', event => {            
            const nameInput = document.querySelector('#name');
            const surnameInput = document.querySelector('#surname');
            const loginInput = document.querySelector('#login');
            const passInput = document.querySelector('#pass');                                
            event.preventDefault();
            let currentElement = event.target;
            let currentText = currentElement.innerText.toLowerCase();

            let user = {
                login: loginInput.value,
                pass: passInput.value,
            }

            let validation = this.validation(nameInput, surnameInput, loginInput, passInput);

            if(loginInput.value && passInput.value && validation) {
                
                if(currentText === 'sign in') {
                    this.model.getUser(user);  
                } else if(currentText === 'sign up') {
                    if(nameInput.value && surnameInput.value) {
                        user.name = nameInput.value;
                        user.surname = surnameInput.value;               
                        this.model.getUser(user,true);
                    } 
                }
            }
        });
    }
}