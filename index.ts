const container = document.querySelector(
  ".library-container",
) as HTMLDivElement;
const bookTitle = document.querySelector(".book-title") as HTMLHeadingElement;
const authorBook = document.querySelector(
  ".book-author"
) as HTMLParagraphElement;
const pagesBook = document.querySelector(".book-pages") as HTMLSpanElement;
const readBook = document.querySelector(".book-read") as HTMLSpanElement;

const dialog = document.querySelector(".book-info") as HTMLDialogElement;
// const closeBtn = document.querySelector(".add-book-btn") as HTMLButtonElement;
const openBtn = document.querySelector(".new-book-btn") as HTMLButtonElement;

const titleInput = document.querySelector("#title") as HTMLInputElement;
const authorInput = document.querySelector("#author") as HTMLInputElement;
const pagesInput = document.querySelector("#pages") as HTMLInputElement;
const readInput = document.querySelector("#read") as HTMLInputElement;
const addBookBtn = document.querySelector(".add-book-btn") as HTMLButtonElement;

let library: Book[] = [];

class Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  read: boolean;

  constructor(title: string, author: string, pages: number, read: boolean) {
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

const addBook = (newBook: Book) => {
  return library.push(newBook);
};

const createBookCard = (book: Book) => {
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
    library = library.filter((b) => b.id !== book.id);
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
  
  return div
};

const displayBook = () => {
  container.innerHTML = "";
  library.forEach((book) => {
    const bookCard = createBookCard(book)
    container.appendChild(bookCard);
  });
};

addBookBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const pagesValue = pagesInput.value;
  const readValue = readInput.checked;


  if(!titleValue || !authorValue || !pagesValue){
    alert("Please! Enter information of book.")
    return
  }

  const newUserBook = new Book(
    titleValue,
    authorValue,
    Number(pagesValue),
    readValue,
  );

  addBook(newUserBook);
  displayBook();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;

  dialog.close();
});

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

// closeBtn.addEventListener("click", () => {
//   dialog.close();
// });
