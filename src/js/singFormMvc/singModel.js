export default class SignInForm  {    
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

    getUser(currentUser, check) {
        fetch(`/users/${currentUser.login}`)
        .then(user => user.json())
        .then(user => {
            if(check) {
                if(user.login === currentUser.login) {                    
                    this.view.showMessage('An account with this login already exists. Please, input another login.', 'error');
                }
            } else if(user.password === currentUser.pass){
                this.currentUser = user['_id'];
                this.subscribers.publish('todoLists', this.currentUser);
            } else {
                this.view.showMessage('Password is wrong. Please, input correct.', 'error');
            }
        })
        .catch(err => {
            if (check) {
                this.addUser(currentUser);
                this.handleShowSingIn();
                this.view.showMessage('User has been successfully created, you can sing in to you account', 'success');
            }  else {
                this.view.showMessage('No user with this login. Please, sing up.', 'error');
            }
        });
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
}