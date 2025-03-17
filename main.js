const addBookBtn = document.querySelector('.add-book-btn');
const booksListHeader = document.querySelector('.books-list-header');
const booksList = document.querySelector('.books-list');
const dialog = document.querySelector('dialog');
const bookForm = dialog.querySelector('form');
const dialogCloseBtn = dialog.querySelector('.dialog-close');
const dialogAddBookBtn = dialog.querySelector('.add-btn');

let myLibrary = [];

class Book {
  static currentId = 0;

  constructor(title, author, pages, isRead) {
    this.id = Book.getId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleStatus() {
    this.isRead = !this.isRead;
  }

  static getId() {
    this.currentId++;
    return this.currentId;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  console.log(newBook);
}

function handleDialogAddBook(e) {
  e.preventDefault();

  const title = bookForm.title.value;
  const author = bookForm.author.value;
  const pages = bookForm.pages.value;
  const isRead = bookForm.isRead.checked;

  addBookToLibrary(title, author, pages, isRead);
  renderBooks(myLibrary);

  bookForm.reset();
  dialog.close();
}

function handleDeleteBook(e) {
  const bookId = e.target.closest('.book').dataset.id;
  myLibrary = myLibrary.filter((book) => book.id != Number(bookId));
  renderBooks(myLibrary);
}

function handleStatusToggle(e) {
  const bookId = e.target.closest('.book').dataset.id;
  const book = myLibrary.find((book) => book.id == Number(bookId));
  const bookStatusEl = e.target.closest('.book').querySelector('.book-status');

  book.toggleStatus();
  bookStatusEl.textContent = book.isRead ? 'Read' : 'Unread';
  bookStatusEl.classList.toggle('read');
}

function renderBooks(bookArray) {
  if (myLibrary.length === 0) {
    booksListHeader.classList.add('hidden');
  } else {
    booksListHeader.classList.remove('hidden');
  }

  booksList.innerHTML = bookArray
    .map(
      ({ title, author, pages, isRead, id }) => `
    <div class="book heading-regular" data-id="${id}">
          <a class="book-title" href="#book">${title}</a>
          <span class="book-author">${author}</span>
          <span class="book-pages">${pages}</span>
          <span class="book-status ${isRead ? 'read' : ''}">${
        isRead ? 'Read' : 'Unread'
      }</span>
          <div class="book-controls">
            <button
              class="book-status-toggle btn"
              aria-label="Book status toggle."
              title="Change book status"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
              </svg>
            </button>
            <button
              class="book-delete btn"
              type="button"
              aria-label="Delete book."
              title="Delete book"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                />
              </svg>
            </button>
          </div>
        </div>
  `
    )
    .join('');

  const deleteButtons = booksList.querySelectorAll('.book-delete');
  const bookStatusButtons = booksList.querySelectorAll('.book-status-toggle');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', handleDeleteBook);
  });

  bookStatusButtons.forEach((button) => {
    button.addEventListener('click', handleStatusToggle);
  });
}

addBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

dialogCloseBtn.addEventListener('click', () => {
  dialog.close();
});

bookForm.addEventListener('submit', handleDialogAddBook);
