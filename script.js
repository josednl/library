const dialog = document.getElementById('new-book');
const showButton = document.getElementById("add-book");
const closeButton = document.querySelector("#new-book button");
const form = document.getElementById("book-info");
const info = document.querySelectorAll("#book-info input");
const newBookButton = document.getElementById("new-book-button");
const myLibrary = [];

newBookButton.addEventListener('click', validateForm);

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if(read == "Yes") {
        this.read = "alreadey read";
    } else {
        this.read = "not read yet";
    }
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary() {
    let name = info[0].value;
    let author = info[1].value;
    let pages = info[2].value;
    let read = info[3].value;
    var newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
    console.log(newBook.info())
}

function validateForm () {
    for (let i = 0; i < info.length; i++) {
        const element = info[i];
        if (element.value == "") {
            alert("Please complete the info");
            return; 
        }
    }
    addBookToLibrary();
    form.reset();
}

//Modal
showButton.addEventListener("click", () => {
    dialog.showModal();
});
  
closeButton.addEventListener("click", () => {
    dialog.close();
});