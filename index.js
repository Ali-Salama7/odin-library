"use strict";
const container = document.querySelector(".library-container");
const bookTitle = document.querySelector(".book-title");
const authorBook = document.querySelector(".book-author");
const pagesBook = document.querySelector(".book-pages");
const readBook = document.querySelector(".book-read");
const dialog = document.querySelector(".book-info");
const closeBtn = document.querySelector(".add-book-btn");
const openBtn = document.querySelector(".new-book-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const addBookBtn = document.querySelector(".add-book-btn");
let library = [];
class Book {
    id;
    title;
    author;
    pages;
    read;
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleReadStatus() {
        this.read = !this.read;
    }
}
const addBook = (newBook) => {
    return library.push(newBook);
};
const displayBook = () => {
    container.innerHTML = "";
    library.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("book-card");
        const header = document.createElement("h3");
        header.innerHTML = `Book Title: ${book.title}`;
        const paragrahAuthor = document.createElement("p");
        paragrahAuthor.classList.add("book-author");
        paragrahAuthor.innerHTML = `Book author: ${book.author}`;
        const paragrahPages = document.createElement("p");
        paragrahPages.classList.add("book-pages");
        paragrahPages.innerHTML = `Book Pages: ${String(book.pages)}`;
        const read = document.createElement("p");
        read.innerHTML = book.read ? "Readed ✔" : "Not Readed ❌";
        const toggle = document.createElement("button");
        toggle.classList.add("toggleRead");
        toggle.innerHTML = "toggle";
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.setAttribute("data-id", book.id);
        deleteBtn.addEventListener("click", () => {
            library = library.filter(b => b.id !== book.id);
            displayBook();
        });
        toggle.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBook();
        });
        div.appendChild(header);
        div.appendChild(paragrahAuthor);
        div.appendChild(paragrahPages);
        div.appendChild(read);
        div.appendChild(toggle);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
};
addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const titleValue = titleInput.value;
    const authorValue = authorInput.value;
    const pagesValue = pagesInput.value;
    const readValue = readInput.checked;
    const newUserBook = new Book(titleValue, authorValue, Number(pagesValue), readValue);
    addBook(newUserBook);
    displayBook();
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
});
openBtn.addEventListener("click", () => {
    dialog.showModal();
});
closeBtn.addEventListener("click", () => {
    dialog.close();
});
