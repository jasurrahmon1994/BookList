class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addToBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML =
            ` <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><img class="delete" src="trash.svg"/></td>
               `
        list.appendChild(row);

    }

    showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000)
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static displayBooks() {
        let books = Store.getBooks();
        books.forEach(book => {
            let ui = new UI;
            ui.addToBookList(book);
        })

    }

    static addBooks(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        let books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn == isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);

    let ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Plese, fill in the fields', 'error')
    } else {
        ui.addToBookList(book);
        Store.addBooks(book)
        ui.clearFields();
        ui.showAlert('Book added', 'success')
    }


    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', Store.displayBooks)

document.querySelector('#book-list').addEventListener('click', (e) => {

    let ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book Removed', 'success')

    e.preventDefault();
});