// Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toggleDisplayContainer = displayStyle => {
    document.getElementById('display').style.display = displayStyle;
};

// Load Section
const searchBooks = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    //Clear data
    inputField.value = '';
    toggleSpinner('block');
    toggleDisplayContainer('none')
    const errorMassage = document.getElementById('error-message');
    errorMassage.textContent = '';

    // Error message
    if (searchText === '') {
        const errorMassage = document.getElementById('error-message');
        const h4 = document.createElement('h4');
        h4.innerText = 'Please write something to get a result!!!';
        errorMassage.appendChild(h4);
        toggleSpinner('none');
    }
    else {
        const url = `HTTPS://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
    }
};
// Display Section
const displayBooks = books => {
    
    if (books.docs.length === 0) {
        const errorMassage = document.getElementById('error-message');
        const h4 = document.createElement('h4');
        h4.innerText = 'No result found, please rearch again! Thanks';
        errorMassage.appendChild(h4);
    }
    else {
        //Result found
        const resultFound = document.getElementById('result-found');
        resultFound.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <div class = " border border-success rounded-pill">
        <h4 class="text-center text-black-50  mt-5">Result Found: ${books.numFound}</h4>
        <p class="text-center text-success mb-5"> Showing result ${books.docs.length} of ${books.numFound}
        </div>
        `;
        resultFound.appendChild(div);

        //Book Details
        const bookContainer = document.getElementById('display-container');
        //Clear Data
        bookContainer.textContent = '';
        books.docs.forEach(book => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card-group">
                <div class="card">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: 10909258 } -M.jpg" class="card-img-top img-fluid" style= "height:662px" alt="Book Cover">
                    <div class="card-body overflow-auto" style= "height:200px">
                    <h5 class="card-title">${book.title ? book.title: ': Book title is not available' }</h5>
                    <p class="card-text fs-5">by ${book.author_name ? book.author_name: ': Auther name is not available'}</p>
                    <p class="card-text">First published in ${book.first_publish_year ? book.first_publish_year: ': Publish year is not available' }</p>
                    <p class="card-text">Published by ${book.publisher ? book.publisher: ': Publisher is not available' }</p>
                </div>
            </div>
            `;
            bookContainer.appendChild(div);
        });    
    }
    toggleSpinner('none');
    if (books.docs.length === 0) {
        toggleDisplayContainer('none');
    }
    else {
        toggleDisplayContainer('block');
    }
    
};

