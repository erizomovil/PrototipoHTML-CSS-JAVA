const bookList = [
    { title: 'Mi portada de libro', author: 'Autor 1', genre: 'Aventura', reserved: false },
    { title: 'Crea tu Portada de Libro', author: 'Autor 2', genre: 'Ciencia Ficción', reserved: true },
    { title: 'El Último Eco de la Ciudad de las Máquinas', author: 'Autor 3', genre: 'Romance', reserved: false },
    { title: 'El Canto de las Hojas Doradas', author: 'Autor 4', genre: 'Policiaca', reserved: false },
    { title: 'El Susurro de las Estrellas Perdidas', author: 'Autor 5', genre: 'Terror y misterio', reserved: false },
    { title: 'Sombras en el Laberinto del Tiempo', author: 'Autor 6', genre: 'Terror y misterio', reserved: false },
    { title: 'Risas en el Rincón de los Absurdos', author: 'Autor 7', genre: 'Humor', reserved: true },
    { title: 'Versos de la Luna Silente', author: 'Autor 8', genre: 'Poesía', reserved: true },
    { title: 'El Oráculo de los Sueños Olvidados', author: 'Autor 1', genre: 'Mitología', reserved: false },
    { title: 'El Viaje de las Estrellas Perdidas', author: 'Autor 1', genre: 'Cuento', reserved: true },
];

function searchBooks() {
    // Obtén los valores de búsqueda
    const searchInputBook = document.getElementById('search-input-book').value.toLowerCase();
    const searchInputAuthor = document.getElementById('search-input-author').value.toLowerCase();
    const selectedGenre = document.getElementById('genre-select').value.toLowerCase();
    const isReserved = document.getElementById('reserved-checkbox').checked;

    if (searchInputBook === '' && selectedGenre === '' && searchInputAuthor === '') {
        alert('Por favor, ingresa al menos el titulo de un libro o nombre de autor o selecciona un género.');
        return;
    }

    // Filtra la lista de libros según los criterios de búsqueda
    const results = bookList.filter(book =>
        (searchInputBook === '' || book.title.toLowerCase().includes(searchInputBook)) &&
        (searchInputAuthor === '' || book.author.toLowerCase().includes(searchInputAuthor)) &&
        (selectedGenre === '' || book.genre.toLowerCase() === selectedGenre) &&
        (!isReserved || !book.reserved)
    );

    // Muestra los resultados en la página
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');

    // Limpia los resultados anteriores
    resultsContainer.innerHTML = '';

    // Muestra los resultados en la lista
    results.forEach(book => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${book.title} - ${book.author} (${book.genre})${book.reserved ? ' - Reservado' : ''}`;
        resultsContainer.appendChild(listItem);
    });
}