function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() { }

UI.prototype.addBookToList = function (book) {
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

UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showAlert = (message, className) => {
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

UI.prototype.deleteBook = target => {
    if(target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn)
    
    let ui = new UI()

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Plese, fill in the fields', 'error')
    } else {
        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert('Book added', 'success')
    }


    e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', (e) => {

    let ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed', 'success')

    e.preventDefault();
});