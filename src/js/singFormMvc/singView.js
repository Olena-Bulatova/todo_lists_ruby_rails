export default class SignInView  {
    constructor() {

    }

    showForm() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '';

        const form = document.createElement('form');
        form.classList.add('form');
        mainContent.append(form);

        const formTitle = document.createElement('nav');
        formTitle.classList.add('form__title');
        form.append(formTitle);

        const signIn = document.createElement('a');
        signIn.innerText = 'Sign in';
        signIn.classList.add('form__type');
        signIn.classList.add('form__type--active');
        formTitle.append(signIn);

        const signUp = document.createElement('a');
        signUp.innerText = 'Sign up';
        signUp.classList.add('form__type');
        formTitle.append(signUp);        

        const loginLable = document.createElement('lable');
        loginLable.setAttribute('for', 'login');
        loginLable.classList.add('form__lable');
        loginLable.innerText = 'login';
        form.append(loginLable);

        const loginInput = document.createElement('input');
        loginInput.setAttribute('id', 'login');
        loginInput.setAttribute('name', 'login');
        loginInput.setAttribute('required', 'required');
        loginInput.classList.add('form__input');
        loginInput.setAttribute('placeholder', 'Enter login');
        form.append(loginInput);

        const passLable = document.createElement('lable');
        passLable.setAttribute('for', 'pass');
        passLable.classList.add('form__lable');
        passLable.innerText = 'password';
        form.append(passLable);        

        const passInput = document.createElement('input');
        passInput.setAttribute('type', 'password');        
        passInput.setAttribute('id', 'pass');
        passInput.setAttribute('required', 'required');
        passInput.setAttribute('name', 'pass');
        passInput.classList.add('form__input');
        passInput.setAttribute('placeholder', 'Enter password');
        form.append(passInput);

        const formButton = document.createElement('button');
        formButton.classList.add('form__button');
        form.append(formButton);
        this.showSingIn();
    }

    showSingIn() {
        const formButton = document.querySelector('.form__button');
        formButton.innerText = 'sign in';

        const message = document.querySelector('.form__message');
        if(message) {
            message.remove();
        }

        const formTitle = document.querySelector('.form__title');

        const typeForm = document.querySelectorAll('.form__type');
        typeForm.forEach(item => item.classList.remove('form__type--active'));
        typeForm[0].classList.add('form__type--active')

        const subTitle = formTitle.querySelector('.form__title-text');
        if(subTitle) subTitle.remove();

        const elementsSignUp = document.querySelectorAll('.form__sing-up'); 

        if(elementsSignUp) {
            elementsSignUp.forEach(item => item.remove());
        }

    }

    showMessage(messageText, messageType) {
        const formTitle = document.querySelector('.form__title');
        let message = document.querySelector('.form__message');
        let styleType = `form__message--${messageType}`;

        if(message) {
            message.remove();
        } else {
            message = document.createElement('p');
            message.classList.add('form__message');
            message.classList.add(styleType);
            message.innerText = messageText;
            formTitle.after(message);
        }

    }

    showSingUp() {
        const formButton = document.querySelector('.form__button');
        formButton.innerText = 'sign up';

        const message = document.querySelector('.form__message');
        if(message) {
            message.remove();
        }

        const typeForm = document.querySelectorAll('.form__type');
        typeForm.forEach(item => item.classList.remove('form__type--active'));
        typeForm[1].classList.add('form__type--active')
        
        const formTitle = document.querySelector('.form__title');

        const subtitle = document.createElement('p'); 
        subtitle.classList.add('form__title-text'); 
        subtitle.innerText = 'Please fill all of the fields to create an account';
        formTitle.append(subtitle);

        const nameLable = document.createElement('lable');
        nameLable.setAttribute('for', 'name');
        nameLable.classList.add('form__lable');
        nameLable.classList.add('form__sing-up');
        nameLable.innerText = 'name';
        formTitle.after(nameLable);    
        
        const nameInput = document.createElement('input');
        nameInput.setAttribute('id', 'name');
        nameInput.setAttribute('name', 'name');
        nameInput.setAttribute('required', 'required');
        nameInput.classList.add('form__input');
        nameInput.classList.add('form__sing-up');
        nameInput.setAttribute('placeholder', 'Enter Name');
        nameLable.after(nameInput);    

        const surnameLable = document.createElement('lable');
        surnameLable.setAttribute('for', 'surname');
        surnameLable.classList.add('form__lable');
        surnameLable.classList.add('form__sing-up');
        surnameLable.innerText = 'surname';
        nameInput.after(surnameLable);    
        
        const surnameInput = document.createElement('input');
        surnameInput.setAttribute('id', 'surname');
        surnameInput.setAttribute('name', 'surname');
        surnameInput.setAttribute('required', 'required');
        surnameInput.classList.add('form__input');
        surnameInput.classList.add('form__sing-up');
        surnameInput.setAttribute('placeholder', 'Enter Surname');
        surnameLable.after(surnameInput);

    }
}