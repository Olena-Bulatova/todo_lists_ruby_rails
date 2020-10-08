export default class TodoListForm {    
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