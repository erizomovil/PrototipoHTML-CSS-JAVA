const BUSCADOS = [
    
]

const BOOKLIST = [];

function initialize() {
    // Recuperar los datos de localStorage si existen
    const BUSCADOS_STORAGE = localStorage.getItem("Buscados");

    const LOCAL_STORAGE_ARRAY = JSON.parse(localStorage.getItem("booksArrayKey")) || [
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

    BOOKLIST.push(...LOCAL_STORAGE_ARRAY);

    // Verificar si hay datos en localStorage y asignarlos a BUSCADOS
    if (BUSCADOS_STORAGE) {
        BUSCADOS.push(...JSON.parse(BUSCADOS_STORAGE));
    }
    if (BUSCADOS.length > 0) {
        const RESULTS_CONTAINER = document.getElementById('search-results');

        for (let index = 0; index < BUSCADOS.length; index++) {
            const WRITE_LIST = document.createElement('li');
            WRITE_LIST.className = 'list-group-item';
            WRITE_LIST.textContent = `${BUSCADOS[index].title} - ${BUSCADOS[index].author} (${BUSCADOS[index].genre})${BUSCADOS[index].reserved ? ' - Reservado' : ''}`;

            // Adjuntar el elemento al contenedor en el DOM
            RESULTS_CONTAINER.appendChild(WRITE_LIST);
        }
    }
}


function searchBooks() {
    // Obtén los valores de búsqueda
    const SEARCH_INPUT_BOOK = document.getElementById('search-input-book').value.toLowerCase();
    const SEARCH_INPUT_AUTHOR = document.getElementById('search-input-author').value.toLowerCase();
    const SELECTED_GENRE = document.getElementById('genre-select').value.toLowerCase();
    const IS_RESERVED = document.getElementById('reserved-checkbox').checked;
    const BOOK_ERROR = document.getElementById("search-input-book-error");
    const AUTHOR_ERROR = document.getElementById("search-input-author-error");
    const GENRE_ERROR = document.getElementById("search-input-genre-error");
    if (SEARCH_INPUT_BOOK === '' && SELECTED_GENRE === '' && SEARCH_INPUT_AUTHOR === '') {
        if(SEARCH_INPUT_BOOK === '') {
            BOOK_ERROR.style.visibility = "visible";
        }
        if(SEARCH_INPUT_AUTHOR === '') {
            AUTHOR_ERROR.style.visibility = "visible";
        }
        if(SELECTED_GENRE === ''){
            GENRE_ERROR.style.visibility = "visible";
        }
        return;
    }
    BOOK_ERROR.style.visibility = "hidden";
    AUTHOR_ERROR.style.visibility = "hidden";
    GENRE_ERROR.style.visibility = "hidden";
    localStorage.setItem("InputBook", JSON.stringify(SEARCH_INPUT_BOOK));
    localStorage.setItem("InputAuthor", JSON.stringify(SEARCH_INPUT_AUTHOR));
    localStorage.setItem("InputGenre", JSON.stringify(SELECTED_GENRE));
    localStorage.setItem("InputReserved", JSON.stringify(IS_RESERVED));
    // Filtra la lista de libros según los criterios de búsqueda
    const RESULTS = BOOKLIST.filter(book =>
        (SEARCH_INPUT_BOOK === '' || book.title.toLowerCase().includes(SEARCH_INPUT_BOOK)) &&
        (SEARCH_INPUT_AUTHOR === '' || book.author.toLowerCase().includes(SEARCH_INPUT_AUTHOR)) &&
        (SELECTED_GENRE === '' || book.genre.toLowerCase() === SELECTED_GENRE) &&
        (!IS_RESERVED || !book.reserved)
    );

    // Muestra los resultados en la página
    displayResults(RESULTS);
}

function displayResults(RESULTS) {
    const RESULTS_CONTAINER = document.getElementById('search-results');
    // Limpia los resultados anteriores
    BUSCADOS.splice(0, BUSCADOS.length);
    RESULTS_CONTAINER.innerHTML = '';
    // Muestra los resultados en la lista
    RESULTS.forEach(book => {
        
        const LIST_ITEM = document.createElement('li');
        LIST_ITEM.className = 'list-group-item';
        LIST_ITEM.textContent = `${book.title} - ${book.author} (${book.genre})${book.reserved ? ' - Reservado' : ''}`;

        BUSCADOS.push({
            title: book.title, 
            author: book.author,
            genre: book.genre,
            reserved: book.reserved
        });
        localStorage.setItem("Buscados", JSON.stringify(BUSCADOS));
        RESULTS_CONTAINER.appendChild(LIST_ITEM);
    }); 
}
initialize();