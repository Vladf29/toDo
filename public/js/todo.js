'use strict'

downloadTasks();

const form = document.querySelector('.js-form');
const list = document.querySelector('.js-list');

form.addEventListener('submit', handlerFormAddTask);
list.addEventListener('click', handlerList);

function checkType(type) {
    return Object.prototype.toString.call(type).slice(8, -1);
}

function httpRequest(url = '', method = 'GET', header = [], data) {
    return new Promise((resolve, reject) => {
        if (!url) reject(new Error('without url'));

        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (header.length === 2) xhr.setRequestHeader(header[0], header[1]);
        data ? xhr.send(data) : xhr.send();

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(this.response);
            }
        }

        xhr.onerror = function () {
            reject(new Error('Something went wrong'));
        }
    });
}

async function downloadTasks() {
    try {
        const result = await httpRequest('/todo/all');
        addTaskToList(JSON.parse(result));
    } catch (err) {
        console.log(err);
    }
}

async function handlerFormAddTask(event) {
    event.preventDefault();

    const val = this.elements['taskField'].value;
    if (!val) return;

    try {
        const data = JSON.stringify({
            task: val,
            done: false
        });
        await httpRequest('/todo/add', 'POST', ['Content-Type', 'application/json'], data);
        downloadTasks();
    } catch (err) {
        console.log(err.message);
    }
}

async function handlerList(event) {
    event.preventDefault();
    const target = event.target;
    if (!target.hasAttribute('data-action')) return;

    const action = target.getAttribute('data-action');
    const li = target.closest('.js-item-task');
    const id = li.getAttribute('data-id-task');

    try {
        const data = JSON.stringify({
            id
        });
        if (action === 'delete') {
            const result = await httpRequest('/todo/delete', 'DELETE', ['Content-Type', 'application/json'], data);
            this.removeChild(li);
        } else if (action === 'done') {
            const result = await httpRequest('/todo/done', 'PUT', ['Content-Type', 'application/json'], data);
            downloadTasks();
        }
    } catch (err) {
        console.log(err.message);
    }
}

function addTaskToList(task = {}) {
    if (!task) return;

    const ul = document.querySelector('.js-list');
    ul.innerHTML = '';
    const tempBtns = `
        <div class='btn-group btn-group-sm'>
            <button class='btn btn-secondary' data-action='done'>Done</button>
            <button class='btn btn-secondary' data-action='delete'>Delete</button>
            <button class='btn btn-secondary' data-action='edit'>Edit</button>
        </div>
    `
    if (checkType(task) === 'Array') {
        task.forEach((item, ind) => {
            const li = document.createElement('li');
            const clses = ['list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center', 'js-item-task'];
            li.classList.add(...clses);
            li.setAttribute('data-id-task', item._id);
            li.setAttribute('data-done', item.done);
            li.innerHTML = `<span class='js-task'>${item.task}</span>${tempBtns}`
            ul.appendChild(li);
        });
    }
}