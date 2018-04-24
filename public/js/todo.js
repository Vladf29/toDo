'use strict'

downloadTasks();

const form = document.querySelector('.js-form');

form.addEventListener('submit', handlerForm);

const checkType = (type) => {
    return Object.prototype.toString.call(type).slice(8, -1);
}

const addTaskToDB = (task) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/todo/add');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(task));

        xhr.onload = function () {
            if (this.status === 200) resolve(JSON.parse(this.response));
            else reject(this.response);
        }

        xhr.onerror = function () {
            reject(new Error('no connection'));
        }
    });
}

function downloadTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/todo/all');
    xhr.send();

    xhr.onload = function () {
        if (this.status === 200) {
            addTaskToList(JSON.parse(this.response));
        } else {
            console.log(this.response);
        }
    }
}

async function handlerForm(event) {
    event.preventDefault();

    const val = this.elements['taskField'].value;
    if (!val) return;

    try {
        const result = await addTaskToDB({
            task: val,
            done: false
        });
        addTaskToList(result);
    } catch (err) {
        console.log(err.message);
    }
}

function addTaskToList(task = {}) {
    if (!task) return;

    const ul = document.querySelector('.js-list');

    if (checkType(task) === 'Object') {
        const li = document.createElement('li');
        li.textContent = task.task;
        ul.appendChild(li);
    } else if (checkType(task) === 'Array') {
        task.forEach((item, ind) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `${item.task} <span class="badge badge-secondary badge-pill">${ind + 1}</span>`
            ul.appendChild(li);
        });
    }
}