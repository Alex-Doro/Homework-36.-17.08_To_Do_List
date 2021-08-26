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
    handleInputs(inputs) {
        const dataItem = {};
    
        for (let input of inputs) {
            dataItem[input.name] = input.value
        };

        return dataItem
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
    }
};

const todoView = {
    form: document.querySelector('#todoForm'),
    setEvents() {
        window.addEventListener('load', this.onLoadFunc.bind(this))
        this.form.addEventListener('submit', this.formSubmit.bind(this))
    },
    formSubmit(e) {
        e.preventDefault();

        const inputs = document.querySelectorAll('#todoForm input, #todoForm textarea');
        
        for (let input of inputs) {
            if (!input.value.length) return alert('Please enter a text')
        };

        const todoItemObject = todoController.setData(inputs)
        this.renderTemplate(todoItemObject);
    },
    onLoadFunc() {
        todoController.getData().forEach(item => this.renderTemplate(item))
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
    
        return mainDiv;
    },
    renderTemplate({title, description}) {
        const template = this.createTemplate(title, description);
        document.querySelector('#todoItems').prepend(template);
    }
};

todoView.setEvents();
























// 'use strict'
// const DB_NAME = 'todoList_data';

// document.querySelector('#todoForm').addEventListener('submit', event => {
//     event.preventDefault();

//     const dataItem = {};
//     const inputs = document.querySelectorAll('#todoForm input, #todoForm textarea');
    
//     for (let input of inputs) {
//         dataItem[input.name] = input.value
//     };

//     saveData(dataItem);
//     createTemplate();
//     renderTemplate(dataItem);
// });

// window.addEventListener('load', () => {
//     if (!localStorage[DB_NAME]) return;
//     const data = JSON.parse(localStorage.todoList_data);
//     data.forEach(item => renderTemplate(item));
// })

// function saveData(dataItem) {
//     if (localStorage[DB_NAME]) {
//         const data = JSON.parse(localStorage[DB_NAME]);
//         data.push(dataItem);
//         localStorage.setItem(DB_NAME, JSON.stringify(data))
//         return data
//     };

//     localStorage.setItem(DB_NAME, JSON.stringify([dataItem]))
// };

// function renderTemplate({title, description}) {
//     const template = createTemplate(title, description);
//     document.querySelector('#todoItems').prepend(template);
// };

// function createTemplate(title = '', description = '') {
//     let mainDiv = document.createElement('div');
//     mainDiv.className = 'col-4';
    
//     let wrapperDiv = document.createElement('div');
//     wrapperDiv.className = 'taskWrapper';
//     mainDiv.append(wrapperDiv);

//     let headerDiv = document.createElement('div');
//     headerDiv.className = 'taskHeading';
//     wrapperDiv.append(headerDiv);
//     headerDiv.innerHTML = title;

//     let descDiv = document.createElement('div');
//     descDiv.className = 'taskDescription';
//     wrapperDiv.append(descDiv);    
//     descDiv.innerHTML = description;

//     return mainDiv;
// };