'use strict'
const DB_NAME = 'todoList_data';

document.querySelector('#todoForm').addEventListener('submit', event => {
    event.preventDefault();

    const dataItem = {};
    const inputs = document.querySelectorAll('#todoForm input, #todoForm textarea');
    
    for (let input of inputs) {
        dataItem[input.name] = input.value
    };

    saveData(dataItem);
    createTemplate();
    renderTemplate(dataItem);
});

window.addEventListener('load', () => {
    if (!localStorage[DB_NAME]) return;
    const data = JSON.parse(localStorage.todoList_data);
    data.forEach(item => renderTemplate(item));
})

function saveData(dataItem) {
    if (localStorage[DB_NAME]) {
        const data = JSON.parse(localStorage[DB_NAME]);
        data.push(dataItem);
        localStorage.setItem(DB_NAME, JSON.stringify(data))
        return data
    };

    localStorage.setItem(DB_NAME, JSON.stringify([dataItem]))
};

function renderTemplate({title, description}) {
    const template = createTemplate(title, description);
    document.querySelector('#todoItems').prepend(template);
};

function createTemplate(title = '', description = '') {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'col-4';
    
    let wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'taskWrapper';
    mainDiv.append(wrapperDiv);

    let headerDiv = document.createElement('div');
    headerDiv.className = 'taskHeading';
    wrapperDiv.append(headerDiv);
    headerDiv.innerHTML = title;

    let descDiv = document.createElement('div');
    descDiv.className = 'taskDescription';
    wrapperDiv.append(descDiv);    
    descDiv.innerHTML = description;

    return mainDiv;
};