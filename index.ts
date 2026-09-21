const container = document.querySelector(".library-container")
const bookTitle = document.querySelector(".book-title") as HTMLHeadingElement
const authorBook = document.querySelector(".book-author") as HTMLParagraphElement
const pagesBook = document.querySelector(".book-pages") as HTMLSpanElement
const readBook = document.querySelector(".book-read") as HTMLSpanElement

const dialog = document.querySelector(".book-info") as HTMLDialogElement
const closeBtn = document.querySelector(".add-book-btn") as HTMLButtonElement
const openBtn = document.querySelector(".new-book-btn") as HTMLButtonElement

const titleInput = document.querySelector("#title") as HTMLInputElement
const authorInput = document.querySelector("#author") as HTMLInputElement  
const pagesInput = document.querySelector("#pages") as HTMLInputElement
const readInput = document.querySelector("#read") as HTMLInputElement
const addBookBtn = document.querySelector(".add-book-btn") as HTMLButtonElement

const library:Book[] = []

class Book {
    id: string
    title: string
    author: string
    pages: number
    read: boolean

    constructor(title: string, author: string, pages: number, read: boolean){
        this.id = crypto.randomUUID()
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

const addBook = (newBook: Book) => {
    return library.push(newBook)
}


// const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true)

// const book2 = new Book("1984", "George Orwell", 328, false)

// const addBook = (newBook: Book) => {
//     return library.push(newBook)
// }

const displayBook = () => {
    library.forEach((book) => {
        const div = document.createElement("div")
        div.classList.add("book-card")

        const header = document.createElement("h3")
        header.innerHTML = `Book Title: ${book.title}`

        const paragrahAuthor = document.createElement("p")
        paragrahAuthor.classList.add("book-author")
        paragrahAuthor.innerHTML = `Book author: ${book.author}`

        const paragrahPages = document.createElement("p")
        paragrahPages.classList.add("book-pages")
        paragrahPages.innerHTML = `Book Pages: ${String(book.pages)}`

        const read = document.createElement("p")
        read.innerHTML = book.read ? "Readed a lot" : "Not Readed enough"

        div.appendChild(header)
        div.appendChild(paragrahAuthor)
        div.appendChild(paragrahPages)
        div.appendChild(read)
        container?.appendChild(div)
    })
}


addBookBtn.addEventListener("click", (e: Event) => {
    e.preventDefault()
    const titleValue = titleInput.value
    const authorValue = authorInput.value
    const pagesValue = pagesInput.value
    const readValue = readInput.checked

    console.log(titleValue)
    console.log(authorValue)
    console.log(typeof pagesValue)
    console.log(readValue)

    const newUserBook = new Book(titleValue, authorValue, Number(pagesValue), readValue)

    addBook(newUserBook)

    displayBook()
})

// addBook()
// addBook(book2)



openBtn.addEventListener("click", () => {
    dialog.showModal()
})

closeBtn.addEventListener("click", () => {
    dialog.close()
})
