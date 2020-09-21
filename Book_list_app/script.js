//book class to represent a book
class Book{
    constructor(title, author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class to handle UI tasks
class UI{

    //static functions can call the class directly without the need to instatiate it
    static displayBooks(){
        const books = Store.getBooks()

      books.forEach((book) => UI.addBooksToList(book));
    }
    static addBooksToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        // vanish the alert in 2 sec
        setTimeout(() => document.querySelector('.alert').remove(),
        2000);
    }
    static clearFields(){
        document.querySelector('#title').value ="";
        document.querySelector('#author').value ="";
        document.querySelector('#isbn').value ="";

    }
}
//Store class will handle storage in our case the local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') == null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));


    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}
//events to display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//event to add a book
document.querySelector('#book-form').addEventListener('submit', (e)=>{

    //prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

//validate fields
if(title == ''|| author == '' | isbn ==''){
    UI.showAlert('Please fill in all the fields', 'danger')
}else{

//instantiate the Book class
const book = new Book(title, author, isbn);

//add book to UI

UI.addBooksToList(book);

//add book to store
Store.addBook(book);

//show success 
UI.showAlert('Added a new book','success');

//clear fields
UI.clearFields();

}

});

//Event to remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>{
    
    // remove book from UI
    UI.deleteBook(e.target);

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    //show success message on delete book
    UI.showAlert('Book removed successfully','success');

    
});





