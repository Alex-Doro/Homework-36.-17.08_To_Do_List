'use strict'
const DB_NAME = 'todoList_data';

// creates a To Do Item on submit
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

// Page reload renders all TO DO List from Local Storage data
window.addEventListener('load', () => {
    if (!localStorage[DB_NAME]) return;
    const data = JSON.parse(localStorage.todoList_data);
    data.forEach(item => renderTemplate(item));
})

// save input Data to Local Storage
function saveData(dataItem) {
    if (localStorage[DB_NAME]) {
        const data = JSON.parse(localStorage[DB_NAME]);
        data.push(dataItem);
        localStorage.setItem(DB_NAME, JSON.stringify(data))
        return data
    };

    localStorage.setItem(DB_NAME, JSON.stringify([dataItem]))
};

// add To Do items to DOM and display to user
function renderTemplate({title, description}) {
    const template = createTemplate(title, description);
    document.querySelector('#todoItems').prepend(template);
};

// pre-build a To Do Item structure before rendering
function createTemplate(title = '', description = '') {
    let mainDiv = document.createElement('div');
    let wrapperDiv = document.createElement('div');
    let headerDiv = document.createElement('div');
    let descDiv = document.createElement('div');

    mainDiv.setAttribute('class', 'col-4');
    wrapperDiv.setAttribute('class', 'taskWrapper');
    headerDiv.setAttribute('class', 'taskHeading');
    descDiv.setAttribute('class', 'taskDescription');

    headerDiv.innerHTML = title;
    descDiv.innerHTML = description;

    mainDiv.append(wrapperDiv);
    wrapperDiv.append(headerDiv);
    wrapperDiv.append(descDiv);

    return mainDiv;
};