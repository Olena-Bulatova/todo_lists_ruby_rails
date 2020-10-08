import SignInView from './singFormMvc/singView';
import SignInForm from './singFormMvc/singModel';
import SignInController from './singFormMvc/singController';
import TodoListView from './todoFormMvc/todoView';
import TodoListForm from './todoFormMvc/todoModel';
import TodoListController from './todoFormMvc/todoController';
import PubSub from './pattern/pubSub';

document.addEventListener ('DOMContentLoaded', function() {

    const subscribers = new PubSub();

    const signInView = new SignInView();
    const signInForm = new SignInForm(signInView, subscribers);
    const signInController = new SignInController(signInForm);
    
    const todoListView = new TodoListView();
    const todoListForm = new TodoListForm(todoListView, subscribers);
    const todoListController = new TodoListController(todoListForm);

    subscribers.publish.bind(subscribers);

    subscribers.subscribe('signIn', signInController.handleShowForm.bind(signInController));
    subscribers.subscribe('todoLists', todoListController.handleShowForm.bind(todoListController));
    subscribers.subscribe('taskLists', todoListController.handleTasksList.bind(todoListController));    
    
    signInController.handleShowForm();
});