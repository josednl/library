const dialog = document.getElementById('new-book');
const showButton = document.getElementById("add-book");
const closeButton = document.querySelector("#new-book button");
const form = document.getElementById("book-info");
const info = document.querySelectorAll("#book-info input");
const newBookButton = document.getElementById("new-book-button");
const dataTable = document.getElementById("books-data");
const dataBody = document.querySelector("#books-data tbody");
const myLibrary = [];

document.addEventListener("DOMContentLoaded", setTable);
newBookButton.addEventListener('click', validateForm);


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if(read == "Yes") {
        this.read = "already read";
    } else {
        this.read = "not read yet";
    }
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
    this.changeReadStatus = function() {
        if(this.read == "already read") {
            this.read = "not read yet";
        } else if (this.read == "not read yet"){
            this.read = "already read";
        }
    }
}

var newBook1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, "No");
var newBook2 = new Book("1984", "George Orwell", 328, "Yes");
var newBook3 = new Book("Moby-Dick", "Herman Melville", 645, "No");
var newBook4 = new Book("The Odyssey", "Homer", 324, "Yes");
var newBook5 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, "No");
myLibrary.push(newBook1, newBook2, newBook3, newBook4, newBook5);

function addBookToLibrary() {
    let title = info[0].value;
    let author = info[1].value;
    let pages = info[2].value;
    let read = info[3].value;
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    // console.log(newBook.info());
    setTable();
    closeButton.click();
}

function validateForm () {
    // for (let i = 0; i < info.length; i++) {
    //     const element = info[i];
    //     if (element.value == "") {
    //         alert("Please complete the info");
    //         return; 
    //     }
    // }
    // addBookToLibrary();
    // form.reset();

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const status = document.getElementById('read');

    var inputs = [title, author, pages, status];

    if(inputs.some(input => input.value.length === 0)) {
        alert('Invalid: Please, complete the empty fields');
        return false;
    }

    if (status.value.toLowerCase() !== "no" && status.value.toLowerCase() !== "yes") {
        alert("PLease, write Yes or No");
        status.classList.add('invalid');
        return false;
    } else {
        status.classList.remove('invalid');
        addBookToLibrary();
        form.reset();
    }
}

function setTable() {
    dataBody.innerHTML = "";
    myLibrary.forEach(function (element, i) {
        let row = document.createElement('tr');
        let title = document.createElement('td');
        let author = document.createElement('td');
        let pages = document.createElement('td');
        let status = document.createElement('td');
        let buttons = document.createElement('td');
        let changeStatus = document.createElement('button');
        let eliminate = document.createElement('button');
        changeStatus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>swap-horizontal</title><path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" /></svg> Change Status';
        changeStatus.classList.add("change-status");
        changeStatus.setAttribute("data-index", i);
        eliminate.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg> Delete';
        eliminate.classList.add("eliminate");
        eliminate.setAttribute("data-index", i);
        buttons.setAttribute("style", "display:flex;justify-content:center;align-items:center;gap:20px");
        title.textContent = element.title;
        author.textContent = element.author;
        pages.textContent = element.pages;
        status.textContent = element.read;
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(status);
        buttons.appendChild(changeStatus);
        buttons.appendChild(eliminate);
        row.appendChild(buttons);
        dataBody.appendChild(row);
    });

    const statusButtons = document.getElementsByClassName('change-status');
    const deleteButtons = document.getElementsByClassName('eliminate');

    for (let i = 0; i < statusButtons.length; i++) {
        statusButtons[i].addEventListener('click', toggleBookStatus);
    }

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', removeBook);
    }
}

function toggleBookStatus(e) {
    myLibrary[e.currentTarget.dataset.index].changeReadStatus();
    setTable();
}

function removeBook(e) {
    myLibrary.splice(e.currentTarget.dataset.index, 1);
    setTable();
}

//Modal
showButton.addEventListener("click", () => {
    dialog.showModal();
});
  
closeButton.addEventListener("click", () => {
    dialog.close();
});