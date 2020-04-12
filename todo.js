const form = document.querySelector('form');
const todoInput = document.querySelector('input[type="text"');
const ul = document.querySelector('ul');
const removeSelectionBtn = document.querySelector('#removeSelection');
const markCompletedBtn = document.querySelector('#completed');
const selectAllCb = document.querySelector('input[name="selectAll"]');

const liBuilder = (data) => {
    const newTodo = document.createElement('li');
    newTodo.innerText = ' ' + data;

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('name', 'todoCb');
    checkBox.setAttribute('value', newTodo.innerText);

    ul.appendChild(newTodo);
    newTodo.prepend(checkBox);
    todoInput.value = '';
};

// checks if there is any data in local storage
if (localStorage.length > 0) {
    // extracts the keys of localstorage without including the properties in prototype chain
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            liBuilder(key);
        }
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (todoInput.value !== '') {
        // stores task in localStorage
        localStorage.setItem(todoInput.value, todoInput.value);
        // reads from local storage then builds list items with the data
        liBuilder(localStorage.getItem(todoInput.value));
    }
});

removeSelectionBtn.addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[name="todoCb"]');
    // iterates through all checkboxes with the name todoCb
    for (let input of checkboxes) {
        // if the checkbox is checked, then it is removed from localStorage and the DOM
        if (input.checked === true) {
            // extra step that removes the prepended space added by libuilder
            const item = input.parentElement.innerText.substring(1);
            localStorage.removeItem(item);
            input.parentElement.remove();
        }
    }
});

markCompletedBtn.addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[name="todoCb"]');
    for (let input of checkboxes) {
        // toggle the completed class if checkbox is checked
        if (input.checked === true) {
            input.parentElement.classList.toggle('completed');
        }
    }
});

selectAllCb.addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[name="todoCb"]');
    // iterate through checkboxes and toggles on/off all checkboxes
    for (let input of checkboxes) {
        if (selectAllCb.checked === true && input.checked === false) {
            input.checked = true;
            // changes label text if all task items are selected
            selectAllCb.previousElementSibling.innerText = 'Deselect All:';
        } else if (selectAllCb.checked === false && input.checked === true) {
            input.checked = false;
            selectAllCb.previousElementSibling.innerText = 'Select All:';
        }
    }
});
