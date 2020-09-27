class LogInView  {
    constructor() {

    }
}

class LogInForm  {    
    constructor(view) {
        this.view = view;
    }

    getUser() {

    }

    addUser() {

    }

    updateUser() {

    }
}

class LogInController  {    
    constructor(model, subscribers) {
        this.model = model;
        this.subscribers = subscribers;
    }

    handleShowForm() {

    }
}


class TodoListView {
    constructor() {

    }
    
}

class TodoListForm {    
    constructor(view) {
        this.view = view;
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

    const logInView = new LogInView();
    const logInForm = new LogInForm(logInView);
    const logInController = new LogInController(logInForm, subscribers);
    
    const todoListView = new TodoListView();
    const todoListForm = new LogInForm(todoListView);
    const todoListController = new TodoListController(todoListForm, subscribers);

    subscribers.subscribe('logIn', logInController.handleShowForm.bind(logInController));
    subscribers.subscribe('todoLists', todoListController.handleShowForm.bind(todoListController));    
    
    logInController.handleShowForm();

});