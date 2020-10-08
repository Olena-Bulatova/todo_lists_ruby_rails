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


class TodoListView {
    constructor() {
        this.currentUser;
    }

    showForm(currentUser) {
        this.currentUser = currentUser;

        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '';

        const projectList = document.createElement('div');
        projectList.classList.add('project-list');
        mainContent.append(projectList);

        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('project-button');
        addProjectButton.innerText = 'Add TODO List';
        mainContent.append(addProjectButton);

        const dialog = document.createElement('div');
        dialog.classList.add('dialog');
        dialog.innerText = 'Please, input name of task for creating.'
        mainContent.append(dialog);        
    }

    showProject(currentProjects) {
        const projectList = document.querySelector('.project-list');
        projectList.innerHTML = '';

        if (currentProjects.length) {
            currentProjects.forEach( item => {
                const project = document.createElement('section');
                project.id = item['_id']; 
                project.classList.add('project');
                projectList.append(project);
    
                const projectHeader = document.createElement('div');
                projectHeader.classList.add('project__header');
                project.append(projectHeader);
    
                const projectTime = document.createElement('input');
                projectTime.classList.add('project__button');
                projectTime.classList.add('project__button--calendar');
                let date = new Date(item.deadline);
                projectTime.value = item.deadline ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : '';
                projectHeader.append(projectTime);
    
                const projectTitle = document.createElement('input');
                projectTitle.classList.add('project__title');
                projectTitle.setAttribute('placeholder', 'Enter TODO List name');
                projectTitle.value = item.name ? item.name : '';
                projectHeader.append(projectTitle);
    
                const projectEditName = document.createElement('button');
                projectEditName.classList.add('project__button');
                projectEditName.classList.add('project__button--edit');
                projectHeader.append(projectEditName);        
    
                const projectDelete = document.createElement('button');
                projectDelete.classList.add('project__button');
                projectDelete.classList.add('project__button--delete');
                projectHeader.append(projectDelete);
    
                const taskTitle = document.createElement('div');
                taskTitle.classList.add('project__task-title');
                project.append(taskTitle);
    
                const taskListShow = document.createElement('button');
                taskListShow.classList.add('project__button');
                taskListShow.classList.add('project__button--show');
                taskTitle.append(taskListShow);
    
                const inputTaskName = document.createElement('input');
                inputTaskName.classList.add('project__task-name');
                inputTaskName.setAttribute('placeholder', 'Start typing here to create task...');
                taskTitle.append(inputTaskName);
    
                const taskAdd = document.createElement('button');
                taskAdd.classList.add('project__button');
                taskAdd.innerText = 'Add Task';
                taskAdd.classList.add('project__button--add');
                taskTitle.append(taskAdd);        
    
                const taskList = document.createElement('table');
                taskList.classList.add('project__task-list');
                project.append(taskList);
            })
        }      
    }

    showTaskList(currentTasks, currentProject) {
        const project = document.getElementById(currentProject);
        const taskList = project.querySelector('.project__task-list');
        taskList.innerHTML = '';
        
        if(currentTasks.length) {

            currentTasks.forEach( item => {
                const rowTask = document.createElement('tr');
                rowTask.classList.add('project__task-item');            
                rowTask.id = item['_id'];
                taskList.append(rowTask);
    
                const checkTask = document.createElement('td');
                checkTask.classList.add('project__task-check');
                rowTask.append(checkTask);
    
                const inputTask = document.createElement('td');
                inputTask.classList.add('project__task-input');            
                rowTask.append(inputTask);
    
                const actionTask = document.createElement('td');
                actionTask.classList.add('project__task-action');
                rowTask.append(actionTask);
    
                const inputName = document.createElement('textarea');
                inputName.classList.remove('project__task-input--done');
    
                const checkBnt = document.createElement('input');
                checkBnt.setAttribute('type', 'checkbox');
                checkBnt.classList.add('project__task-input--check');                
                if(item.done) {
                    inputName.classList.add('project__task-input--done');
                    checkBnt.checked = 'checked';
                }
                checkTask.append(checkBnt);

                inputName.classList.add('project__task-input--name');
                inputName.value = item.nameTask;
                inputTask.append(inputName);
    
                const priorityBnt = document.createElement('input');
                priorityBnt.setAttribute('type', 'number');
                priorityBnt.setAttribute('min', '1');
                priorityBnt.setAttribute('max', '9');
                priorityBnt.classList.add('project__task-input--number');
                priorityBnt.value = item.priority;
                actionTask.append(priorityBnt);
    
                const editBnt = document.createElement('button');
                editBnt.classList.add('project__task-button');
                editBnt.classList.add('project__task--edit');
                actionTask.append(editBnt);        
    
                const deleteBnt = document.createElement('button');
                deleteBnt.classList.add('project__task-button');
                deleteBnt.classList.add('project__task--delete');
                actionTask.append(deleteBnt);     
    
            });

        }
        
    }
    
}

class TodoListForm {    
    constructor(view, subscribers) {
        this.view = view;
        this.subscribers = subscribers;
        this.currentUser;
    }

    handleShowForm(currentUser) {
        this.currentUser = currentUser;
        this.view.showForm();
    }

    getTodoList() {
        return fetch(`/projects/${this.currentUser}`)
        .then(currentProjects => currentProjects.json())
        .then(currentProjects => {
            this.view.showProject(currentProjects);
            if(currentProjects.length) {
                currentProjects.forEach( item => {
                    this.subscribers.publish('taskLists', item['_id']);
                });
            }
        })
        .catch(err => console.error(`Connection Error:${err}`));
    }

    addTodoList() {
        let project = {
            name: '',
            userId: this.currentUser,
        }

        return fetch('/projects', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(project)
        })
        .then((response) => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }
    
    updateTodoList(currentProject, newName) {
        return fetch(`/projects/${currentProject}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(newName)
        })
        .then(response => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }

    deleteTodoList(currentProject, tasks) {
        return fetch(`/projects/${currentProject}`, {
            method: 'DELETE'
        })
        .then(response => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }
    
    getTasks(project) {
        return fetch(`/tasks/${project}`)
        .then(currentTasks => currentTasks.json())
        .then(currentTasks => {
            this.view.showTaskList(currentTasks, project);
        })
        .catch(err => console.error(`Connection Error:${err}`));
    }


    addTasks(currentProjects, nameTask) {
        let taskList = {
            nameTask: nameTask,
            done: false,
            priority: '',
            projectId: currentProjects,
        }

        return fetch('/tasks', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(taskList)
        })
        .then((response) => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }


    updateTasks(currentTask, newInfo) {
        return fetch(`/tasks/${currentTask}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(newInfo)
        })
        .then(response => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }

    deleteTask(currentTask) {
        return fetch(`/tasks/${currentTask}`, {
            method: 'DELETE'
        })
        .then(response => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }

}

class TodoListController {    
    constructor(model, subscribers) {
        this.model = model;
        this.subscribers = subscribers;
    }

    handleShowForm(currentUser) {
        this.handleShow(currentUser);
        this.handleProject();
    }

    handleShow(currentUser) {
        this.model.handleShowForm(currentUser);
        this.actionForForm();
    }

    handleProject() {
        let getProject = async () => {                                      
            await this.model.getTodoList();
            this.actionForProject();
        }
        getProject();
    }

    handleTasksList(currentProject) {
        let getTasksList = async () => {
            const project = document.getElementById(currentProject);                                      
            await this.model.getTasks(currentProject);
            this.actionForTasks(project);
        }
        getTasksList();
    }

    actionForForm() {
        const addProjectButton = document.querySelector('.project-button');
                
        addProjectButton.addEventListener('click', () => {
            let addProject = async () => {                                    
                await this.model.addTodoList();
                this.handleProject()
            }
            addProject();
        });
    }

    actionForProject() {
        const taskAdd = document.querySelectorAll('.project__button--add');

        $('.project__button--calendar').datepicker({
            showOn: 'button',
            buttonImage: '../images/calendar-alt-regular.svg',
            buttonImageOnly: true,
            onSelect: function() {
                let eventInput = new Event('change');
                inputDate.dispatchEvent(eventInput);
            },
        });

        $('.dialog').dialog({
            /* buttons: [{text: "OK", click: function() {$(this).dialog("close")}}], */
            title: 'Uncorrect name of task',
            minHeight: false,
            autoOpen: false,
            modal:true
        });

        const buttonDate = document.querySelectorAll('.ui-datepicker-trigger');
        let currentDate = null;
        let inputDate = null;

        buttonDate.forEach(item => {
            item.addEventListener('click', event => {
                currentDate = event.target;
                inputDate = currentDate.parentElement.querySelector('.project__button--calendar');
            });
        });

        const calendar = document.querySelectorAll('.project__button--calendar');

        calendar.forEach( item => {
            item.addEventListener('change', (event) => {
                let parent = event.target.parentElement;
                let currentProject = parent.parentElement.id;
                let deadline = { deadline: new Date(event.target.value)};
                this.model.updateTodoList(currentProject, deadline);
            });
        });

        let addTask = async(event) => {
            let parent = event.target.parentElement;
            let currentProject = parent.parentElement.id;                                  
            
            if(parent.childNodes[1].value) {
                await this.model.addTasks(currentProject, parent.childNodes[1].value);
                this.handleTasksList(currentProject);
                parent.childNodes[1].value = '';
            } else {
                $('.dialog').dialog("open");
            }
        }

        taskAdd.forEach( item => {
            item.addEventListener('click', (event) => {
                addTask(event);
            });
        })
        const inputTaskName = document.querySelectorAll('.project__task-name');

        inputTaskName.forEach( item => {
            item.addEventListener('keyup', (event) => {
                if(event.keyCode === 13) {
                    addTask(event);            
                }
            });
        })

        const projectName = document.querySelectorAll('.project__title');

        let editName = async (event) => {
            let parent = event.target.parentElement;
            let currentProject = parent.parentElement.id;
            let nameProject = { name: event.target.value};                             
            await this.model.updateTodoList(currentProject, nameProject);            
            this.handleProject();
        }

        projectName.forEach(item => {
            item.addEventListener('change', event => {
                editName(event);
            });
        });
        
        const projectDelete = document.querySelectorAll('.project__button--delete');

        projectDelete.forEach( item => {
            item.addEventListener('click', event => {
                let parent = event.target.parentElement;
                let currentProject = parent.parentElement.id;

                let deleteProject = async () => {
                    const tasks = parent.parentElement.querySelectorAll('.project__task-item');                                      
                    await this.model.deleteTodoList(currentProject);
                    if(tasks.length) {
                        tasks.forEach( item => this.model.deleteTask(item.id));
                    }
                    this.handleProject();
                }
                deleteProject();
            });
        });
        const projectEditName = document.querySelectorAll('.project__button--edit');

        projectEditName.forEach( item => {
            item.addEventListener('click', event => {                
                let parent = event.target.parentElement;
                let currentProject = parent.parentElement.id;
                const project = document.querySelectorAll('.project');
                project.forEach( toDo => {
                    if(toDo.id === currentProject) {
                        toDo.childNodes[0].childNodes[1].focus();
                    }
                })

            });
        });

        const taskListShow = document.querySelectorAll('project__button--show');
        taskListShow.forEach( item => {
            item.addEventListener('click', event => {                
                let parent = event.target.parentElement;
                let currentProject = parent.parentElement;
                let taskList = currentProject.querySelector('.project__task-list');
            });
        });
        
    }

    actionForTasks(project) {
        const inputName = project.querySelectorAll('.project__task-input--name');

        let editName = async (event) => {                
            let parent = event.target.parentElement;
            let currentTask = parent.parentElement;
            let nameTask = { nameTask: event.target.value};                             
            await this.model.updateTasks(currentTask.id, nameTask);            
            this.handleTasksList(currentTask.parentElement.parentElement.id);
        }

        inputName.forEach( item => {
            item.addEventListener('input', (event) => {
                if(inputName.scrollTop > 0){
                    inputName.style.height = inputName.scrollHeight + "px";
                }
            });

            item.addEventListener('change', (event) => {
                editName(event);
            });
        });

        const editBnt = project.querySelectorAll('.project__task--edit');

        editBnt.forEach( item => {
            item.addEventListener('click', event => {                
                let parent = event.target.parentElement;
                let currentTask = parent.parentElement.id;
                const tasks = project.querySelectorAll('.project__task-item');
                tasks.forEach( task => {
                    if(task.id === currentTask) {
                        task.childNodes[1].childNodes[0].focus();
                    }
                })

            });
        })          

        const checkBnt = project.querySelectorAll('.project__task-input--check');
        checkBnt.forEach( item => {
            item.addEventListener('change', event => {                
                let parent = event.target.parentElement;
                let currentTask = parent.parentElement;
                let status = { done: event.target.checked};
                let editStatus = async () => {                              
                    await this.model.updateTasks(currentTask.id, status);            
                    this.handleTasksList(currentTask.parentElement.parentElement.id);
                }
                editStatus();
            });
        }) 

        const priorityBnt = project.querySelectorAll('.project__task-input--number');

        priorityBnt.forEach( item => {
            item.addEventListener('change', event => {                
                let parent = event.target.parentElement;
                let currentTask = parent.parentElement;
                let priority = { priority: event.target.value};
                let editPriority = async () => {                              
                    await this.model.updateTasks(currentTask.id, priority);            
                    this.handleTasksList(currentTask.parentElement.parentElement.id);
                }
                editPriority();
            });
        }) 

        const deleteBnt = project.querySelectorAll('.project__task--delete');

        deleteBnt.forEach( item => {
            item.addEventListener('click', event => {               
                let parent = event.target.parentElement;
                let currentTask = parent.parentElement;
                let deleteTask= async () => {                                    
                    await this.model.deleteTask(currentTask.id);                        
                    this.handleTasksList(currentTask.parentElement.parentElement.id);
                }
                deleteTask();
            });
        });

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