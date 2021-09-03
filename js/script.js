'use strict'

const todoController = {
    getData() {
        if (!todoModel.getData()) return false
        return JSON.parse(todoModel.getData());
    },
    setData(inputs) {
        const todoItemObject = this.handleInputs(inputs)
        todoModel.saveData(todoItemObject);
        return todoItemObject
    },
    handleInputs(inputs, isComplited = false) {
        const dataItem = {};
    
        for (let input of inputs) {
            dataItem[input.name] = input.value
        };

        dataItem['isCompleted'] = isComplited;

        return dataItem
    },
    clearAllData() {
        todoModel.clearAllData();
    }
};

const todoModel = {
    dbName: 'todoList_data',
    saveData(dataItem) {
        if (localStorage[this.dbName]) {
            const data = JSON.parse(localStorage[this.dbName]);
            data.push(dataItem);
            localStorage.setItem(this.dbName, JSON.stringify(data))
            return data
        };
    
        localStorage.setItem(this.dbName, JSON.stringify([dataItem]))
    },
    getData() {
        if (!localStorage.getItem(this.dbName)) return false;
        return localStorage.getItem(this.dbName);
    },
    clearAllData() {
        localStorage.removeItem(this.dbName)
    }
};

const todoView = {
    form: document.querySelector('#todoForm'),
    todoItems: document.querySelector('#todoItems'),
    clearAllBtn: document.querySelector('#todo-btn-clearAll'),
    deleteTodoItemBtn: document.querySelector('.todo-close-btn'),
    setEvents() {
        window.addEventListener('load', this.onLoadFunc.bind(this));
        this.form.addEventListener('submit', this.formSubmit.bind(this));
        this.clearAllBtn.addEventListener('mouseup', this.clearAllData.bind(this));
        this.todoItems.addEventListener('mouseup', this.deleteTodoItem.bind(this));
    },
    formSubmit(e) {
        e.preventDefault();

        const inputs = document.querySelectorAll('#todoForm input, #todoForm textarea');
        
        for (let input of inputs) {
            if (!input.value.length) return alert('Please enter a text')
        };

        const todoItemObject = todoController.setData(inputs)
        this.renderTemplate(todoItemObject);

        e.target.reset();
    },
    onLoadFunc() {
        if (todoController.getData()) todoController.getData().forEach(item => this.renderTemplate(item))
    },
    createTemplate(title = '', description = '') {
        const mainDiv = document.createElement('div');
        mainDiv.className = 'col-4';
        
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'taskWrapper';
        mainDiv.append(wrapperDiv);
    
        const headerDiv = document.createElement('div');
        headerDiv.className = 'taskHeading';
        wrapperDiv.append(headerDiv);
        headerDiv.innerHTML = title;
    
        const descDiv = document.createElement('div');
        descDiv.className = 'taskDescription';
        wrapperDiv.append(descDiv);    
        descDiv.innerHTML = description;

        const checkIfCompleted = document.createElement('input');
        checkIfCompleted.setAttribute('type', 'checkbox');
        checkIfCompleted.className = 'form-check-input';
        wrapperDiv.append(checkIfCompleted);

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('type', 'button');
        closeBtn.className = 'btn-close todo-close-btn';
        wrapperDiv.prepend(closeBtn);
        
        return mainDiv;
    },
    renderTemplate({title, description}) {
        const template = this.createTemplate(title, description);
        document.querySelector('#todoItems').prepend(template);
    },
    clearAllData() {
        todoController.clearAllData();
        location.reload();
    },
    deleteTodoItem({target}) {
        if (target.className.includes('todo-close-btn')) {
            target.parentElement.parentElement.remove();
        }
    }
};

todoView.setEvents();













































// 'use strict'

// const todoController = {
//     getData() {
//         if (!todoModel.getData()) return false
//         return JSON.parse(todoModel.getData());
//     },
//     setData(inputs) {
//         const todoItemObject = this.handleInputs(inputs)
//         todoModel.saveData(todoItemObject);
//         return todoItemObject
//     },
//     handleInputs(inputs) {
//         const dataItem = {};
    
//         for (let input of inputs) {
//             dataItem[input.name] = input.value
//         };

//         return dataItem
//     }
// };

// const todoModel = {
//     dbName: 'todoList_data',
//     saveData(dataItem) {
//         if (localStorage[this.dbName]) {
//             const data = JSON.parse(localStorage[this.dbName]);
//             data.push(dataItem);
//             localStorage.setItem(this.dbName, JSON.stringify(data))
//             return data
//         };
    
//         localStorage.setItem(this.dbName, JSON.stringify([dataItem]))
//     },
//     getData() {
//         if (!localStorage.getItem(this.dbName)) return false;
//         return localStorage.getItem(this.dbName);
//     }
// };

// const todoView = {
//     form: document.querySelector('#todoForm'),
//     setEvents() {
//         window.addEventListener('load', this.onLoadFunc.bind(this))
//         this.form.addEventListener('submit', this.formSubmit.bind(this))
//     },
//     formSubmit(e) {
//         e.preventDefault();

//         const inputs = document.querySelectorAll('#todoForm input, #todoForm textarea');
        
//         for (let input of inputs) {
//             if (!input.value.length) return alert('Please enter a text')
//         };

//         const todoItemObject = todoController.setData(inputs)
//         this.renderTemplate(todoItemObject);

//         e.target.reset();
//     },
//     onLoadFunc() {
//         if (todoController.getData()) todoController.getData().forEach(item => this.renderTemplate(item))
//     },
//     createTemplate(title = '', description = '') {
//         const mainDiv = document.createElement('div');
//         mainDiv.className = 'col-4';
        
//         const wrapperDiv = document.createElement('div');
//         wrapperDiv.className = 'taskWrapper';
//         mainDiv.append(wrapperDiv);
    
//         const headerDiv = document.createElement('div');
//         headerDiv.className = 'taskHeading';
//         wrapperDiv.append(headerDiv);
//         headerDiv.innerHTML = title;
    
//         const descDiv = document.createElement('div');
//         descDiv.className = 'taskDescription';
//         wrapperDiv.append(descDiv);    
//         descDiv.innerHTML = description;
    
//         return mainDiv;
//     },
//     renderTemplate({title, description}) {
//         const template = this.createTemplate(title, description);
//         document.querySelector('#todoItems').prepend(template);
//     }
// };

// todoView.setEvents();