export default class TodoListController {    
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