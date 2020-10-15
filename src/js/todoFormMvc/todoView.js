export default class TodoListView {
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

    showDeadlineMessage(currentTodo, doneStatus) {
        const projectTime = currentTodo.querySelector('.project__button--calendar').value;
        const projectHeader = currentTodo.querySelector('.project__header');
        let dateOfTodo = new Date(projectTime)
        let currentDate = new Date();        
        let message = currentTodo.querySelector('.form__message');

        if(message) {
            message.remove();
        }

        if(currentDate >= dateOfTodo) {
            message = document.createElement('p');
            message.classList.add('form__message');
            message.classList.add('project__message');
            projectHeader.before(message);            

            if(doneStatus) {                
                message.classList.add('form__message--success');
                message.innerText = 'TODO list deadline has expired and you have completed all tasks.';
            } else {
                message.classList.add('form__message--error');
                message.innerText = 'TODO list deadline has expired, choose a new date or mark the tasks as completed.';
            }

        }
    }

    showTaskList(currentTasks, currentProject) {
        const project = document.getElementById(currentProject);
        const taskList = project.querySelector('.project__task-list');
        taskList.innerHTML = '';
        let doneStatus = false;
        let amountTasks = currentTasks.length;
        let amountCheckTasks = 0;
        
        if(amountTasks) {

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
                    amountCheckTasks++;
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

            if(amountTasks === amountCheckTasks) {
                doneStatus = true;
            }
        }
        
        this.showDeadlineMessage(project, doneStatus);   
    }    
}