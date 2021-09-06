'use strict'

const todoController = {
    todoId: 0,
    todoIdInc() {
        return this.todoId++
    },
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

        dataItem['isCompleted'] = false;
        dataItem['id'] = this.todoId;

        return dataItem
    },
    clearAllData() {
        todoModel.clearAllData();
    },
    //Сначала решил удаление одного todoItem путем поиска его индекса в DOM дереве, работало нормально) ниже рабочий вариант через id
    // removeTodoItem(index) {
    //     const data = this.getData();
    //     let itemIndex = data.length - 1 - index

    //     data.splice(itemIndex, 1);
    //     todoModel.setData(data);
    // },
    removeTodoItem(id) {
        const data = this.getData();
        
        for (let item of data) {
            if (item.id === id) {
                data.splice(data.indexOf(item), 1)
            }
        }

        todoModel.setData(data)
        if (!this.getData().length) this.clearAllData();
    },
    todoItemCompleted(id) {
        const data = this.getData();

        for (let item of data) {
            if (item.id === id) {
                item.isCompleted = !item.isCompleted
            }
        }

        todoModel.setData(data)
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
    setData(data) {
        localStorage.setItem(this.dbName, JSON.stringify(data))
    },
    clearAllData() {
        localStorage.removeItem(this.dbName)
    }
};

const todoView = {
    form: document.querySelector('#todoForm'),
    todoItems: document.querySelector('#todoItems'),
    clearAllBtn: document.querySelector('#todo-btn-clearAll'),
    setEvents() {
        window.addEventListener('load', this.onLoadFunc.bind(this));
        this.form.addEventListener('submit', this.formSubmit.bind(this));
        this.clearAllBtn.addEventListener('mouseup', this.clearAllData.bind(this));
        this.todoItems.addEventListener('mouseup', this.deleteTodoItem.bind(this));
        this.todoItems.addEventListener('mouseup', this.todoItemCompleted.bind(this));
    },
    formSubmit(e) {
        e.preventDefault();

        const inputs = document.querySelectorAll('#todoForm input, #todoForm textarea');
        
        for (let input of inputs) {
            if (!input.value.length) return alert('Please enter a text')
        };

        const todoItemObject = todoController.setData(inputs)
        this.renderTemplate(todoItemObject);
        todoController.todoIdInc();

        e.target.reset();
    },
    onLoadFunc() {
        if (todoController.getData()) todoController.getData().forEach(item => {
            this.renderTemplate(item);
            todoController.todoId = item.id + 1
        })
    },
    createTemplate(title, description, isCompleted, id) {
        const mainDiv = document.createElement('div');
        mainDiv.className = 'col-4';
        mainDiv.setAttribute('id', id);
        
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
        checkIfCompleted.className = 'form-check-input todo-item-completed-checkbox';
        if (isCompleted) checkIfCompleted.checked = true;
        wrapperDiv.append(checkIfCompleted);

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('type', 'button');
        closeBtn.className = 'btn-close todo-close-btn';
        wrapperDiv.prepend(closeBtn);
        
        return mainDiv;
    },
    renderTemplate({title, description, isCompleted, id}) {
        const template = this.createTemplate(title, description, isCompleted, id);
        this.todoItems.prepend(template);
    },
    clearAllData() {
        todoController.clearAllData();
        location.reload();
    },
    //Сначала решил удаление одного todoItem путем поиска его индекса в DOM дереве, работало нормально) ниже рабочий вариант через id
    // deleteTodoItem({target}) {
    //     const child = target.parentNode.parentNode
    //     const parent = target.parentNode.parentNode.parentNode;
    //     let index = Array.from(parent.children).indexOf(child);

    //     if (target.className.includes('todo-close-btn')) {
    //         target.parentElement.parentElement.remove();
    //         todoController.removeTodoItem(index);
    //     }
    // },
    deleteTodoItem({target}) {
        const parent = target.parentNode.parentNode //todoItem
        let id = +parent.getAttribute('id');

        if (target.className.includes('todo-close-btn')) {
            parent.remove();
            todoController.removeTodoItem(id);
        }
    },
    todoItemCompleted({target}) {
        const parent = target.parentNode.parentNode //todoItem
        let id = +parent.getAttribute('id');

        if (target.className.includes('todo-item-completed-checkbox')) todoController.todoItemCompleted(id);
    }
};

todoView.setEvents();