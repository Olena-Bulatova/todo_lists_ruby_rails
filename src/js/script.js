class SignInView  {
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

        const elementsSignUp = document.querySelectorAll('.form__sing-up'); 

        if(elementsSignUp) {
            elementsSignUp.forEach(item => item.remove());
        }

    }

    showSingUp() {
        const formButton = document.querySelector('.form__button');
        formButton.innerText = 'sign up';
        
        const formTitle = document.querySelector('.form__title');

        const nameLable = document.createElement('lable');
        nameLable.setAttribute('for', 'name');
        nameLable.classList.add('form__lable');
        nameLable.classList.add('form__sing-up');
        nameLable.innerText = 'name';
        formTitle.after(nameLable);    
        
        const nameInput = document.createElement('input');
        nameInput.setAttribute('id', 'name');
        nameInput.setAttribute('name', 'name');
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
        surnameInput.classList.add('form__input');
        surnameInput.classList.add('form__sing-up');
        surnameInput.setAttribute('placeholder', 'Enter Surname');
        surnameLable.after(surnameInput);

    }
}

class SignInForm  {    
    constructor(view, subscribers) {
        this.view = view;
        this.currentUser;
        this.subscribers = subscribers;
    }

    handleShowForm() {
        this.view.showForm();
    }    

    handleShowSingIn() {
        this.view.showSingIn();
    }

    handleShowSingUp() {
        this.view.showSingUp();
    }

    getUser(currentUser) {
        fetch(`/users/${currentUser.login}`)
        .then(currentUser => currentUser.json())
        .then(currentUser => {
            this.currentUser = currentUser.id;
            this.subscribers.publish('todoLists', this.currentUser);          
        })
        .catch(err => console.error(`Connection Error:${err}`));
    }

    addUser(user) {
        if(user) {         
            return fetch('/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            .then(response => response)
            .catch(err => console.error(`Connection Error:${err}`));
        } else {
            alert('Enter all data, please!!');
        }

    }

    updateUser() {

    }
}

class SignInController  {    
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
                typeForm.forEach(item => item.classList.remove('form__type--active'));
                currentElement.classList.add('form__type--active');
            }
        });

        formButton.addEventListener('click', event => {
            event.preventDefault();
            let currentElement = event.target;
            let currentText = currentElement.innerText.toLowerCase();
            const nameInput = document.querySelector('#name');
            const surnameInput = document.querySelector('#surname');
            const loginInput = document.querySelector('#login');
            const passInput = document.querySelector('#pass');
            let user = {
                login: loginInput.value,
                pass: passInput.value,
            }                     
            if(currentText === 'sign in') {
                this.model.getUser(user);
            } else if(currentText === 'sign up') {
                user.name = nameInput.value;
                user.surname = surnameInput.value;
                this.model.addUser(user);                    
                this.handleShowSingIn();
            }
        })


    }
}


class TodoListView {
    constructor() {

    }

    showForm() {
        const mainContent = document.querySelector('.main-content');
        mainContent = '';

        const projectList = document.createElement('div');
        projectList.classList.add('project-list');
        mainContent.append(projectList);

        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('project-button');
        mainContent.append(addProjectButton);
        
    }
    
}

class TodoListForm {    
    constructor(view) {
        this.view = view;
    }

    handleShowForm() {
        this.view.showForm();
    }

    getTodoList() {

    }

    getTasks() {

    }

    addTodoList() {

    }

    addTasks() {

    }
    
    updateTodoList() {

    }

    updateTasks() {

    }

}

class TodoListController {    
    constructor(model, subscribers) {
        this.model = model;
        this.subscribers = subscribers;
    }

    handleShowForm() {
        this.model.handleShowForm();
    }
}

class PubSub {
    constructor() {
        this.subscribers = {};
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }    
        this.subscribers[event].push(callback);
    }

    publish(event, data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(subscriberCallback =>
            subscriberCallback(data));
    }
}

document.addEventListener ('DOMContentLoaded', function() {

    const subscribers = new PubSub();

    const signInView = new SignInView();
    const signInForm = new SignInForm(signInView, subscribers);
    const signInController = new SignInController(signInForm, subscribers);
    
    const todoListView = new TodoListView();
    const todoListForm = new TodoListForm(todoListView, subscribers);
    const todoListController = new TodoListController(todoListForm, subscribers);

    subscribers.subscribe('signIn', signInController.handleShowForm.bind(signInController));
    subscribers.subscribe('todoLists', todoListController.handleShowForm.bind(todoListController));    
    
    signInController.handleShowForm();

});