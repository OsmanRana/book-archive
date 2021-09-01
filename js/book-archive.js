// Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}




const searchBooks = () => {
    //Display spinner
    toggleSpinner('d-block');
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data.docs))
};

const displayBooks = books => {
    const bookContainer = document.getElementById('display-container');
    bookContainer.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card-group">
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i} -M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h4 class="card-title fw-bold">${book.title ? book.title: 'Book title is not available' }</h4>
                <p class="card-text fs-4">by ${book.author_name ? book.author_name: 'Auther name is not available'}</p>
                <p class="card-text">First published in ${book.first_publish_year ? book.first_publish_year: 'Publish year is not available' }</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
        console.log(book)
    });
    console.log(books)
}

