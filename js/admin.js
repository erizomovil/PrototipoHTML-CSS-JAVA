// Tu array en localStorage
const BOOKS_LIST_KEY = "llave";
const PASSWORD_KEY = "contraseña";


function setPassword() {
    localStorage.setItem("passwordKey", (PASSWORD_KEY));
}

// Función para verificar la contraseña
function checkPassword() {
    const enteredPassword = document.getElementById("password-input").value;
    const storedPassword = localStorage.getItem("passwordKey");

    if (enteredPassword === storedPassword) {
        // Contraseña correcta, mostrar la sección CRUD
        document.getElementById("login-section").style.display = "none";
        document.getElementById("crud-section").style.display = "block";

        // Cargar y mostrar los libros existentes
        displayBooks();
    } else {
        alert("Contraseña incorrecta. Intenta de nuevo.");
    }
}

// Agregar un nuevo libro al array y actualizar localStorage
function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const reserved = document.getElementById("reserved").checked;

    if (title.trim() === '' || author.trim() === '' || genre.trim() === '') {
        alert("Por favor, completa todos los campos antes de agregar el libro.");
        return;
    }

    const NEW_BOOK = { title, author, genre, reserved };

    // Obtener el array de libros del localStorage o inicializar si no existe
    const BOOKS_ARRAY = JSON.parse(localStorage.getItem("booksArrayKey")) || [
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

    // Agregar el nuevo libro al array
    BOOKS_ARRAY.push(NEW_BOOK);

    // Actualizar el array en localStorage
    localStorage.setItem("booksArrayKey", JSON.stringify(BOOKS_ARRAY));

    // Limpiar el formulario
    clearForm();

    // Recargar y mostrar los libros
    displayBooks();
}

// Limpiar los campos del formulario
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("reserved").checked = false;
}

// Mostrar los libros en la interfaz
function displayBooks() {
    const BOOKS_ARRAY = JSON.parse(localStorage.getItem("booksArrayKey")) || [
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
    localStorage.setItem("booksArrayKey", JSON.stringify(BOOKS_ARRAY));
    const BOOK_LIST = document.getElementById("book-list");
    BOOK_LIST.innerHTML = "";

    BOOKS_ARRAY.forEach((book, index) => {
        const LIST_ITEM = document.createElement("li");
        LIST_ITEM.className = "list-group-item";
        LIST_ITEM.innerHTML = `<strong>${book.title}</strong> - ${book.author} - ${book.genre}
                             <span>${book.reserved ? "Reservado" : "Disponible"}</span>
                             <button class="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#modifyModal" onclick="openModifyModal(${index})">Modificar</button>
                             <button class="btn btn-danger btn-sm float-right" onclick="deleteBook(${index})">Eliminar</button>`;
        BOOK_LIST.appendChild(LIST_ITEM);
    });
}

function openModifyModal(index) {
    const BOOKS_ARRAY = JSON.parse(localStorage.getItem("booksArrayKey")) || [];
    const BOOK_MODIFY = BOOKS_ARRAY[index];

    document.getElementById("newTitle").value = BOOK_MODIFY.title;
    document.getElementById("newAuthor").value = BOOK_MODIFY.author;
    document.getElementById("newGenre").value = BOOK_MODIFY.genre;
    document.getElementById("newReserved").checked = BOOK_MODIFY.reserved;

    // Puedes almacenar el índice del libro actual en un atributo de datos del formulario
    document.getElementById("modifyForm").setAttribute("data-index", index);

    // Abre el modal
    const modifyModal = new bootstrap.Modal(document.getElementById('modifyModal'));
    modifyModal.show();
}

function modifyBook() {
    const BOOKS_ARRAY = JSON.parse(localStorage.getItem("booksArrayKey")) || [];
    
    // Obtén el índice del libro desde el atributo de datos del formulario
    const index = document.getElementById("modifyForm").getAttribute("data-index");

    if (index >= 0 && index < BOOKS_ARRAY.length) {
        // Obtén el libro a modificar
        const BOOK_MODIFY = BOOKS_ARRAY[index];

        // Pide al usuario que ingrese los nuevos datos
        const NEW_TITLE = document.getElementById("newTitle").value;
        const NEW_AUTHOR = document.getElementById("newAuthor").value;
        const NEW_GENRE = document.getElementById("newGenre").value;
        const NEW_RESERVED = document.getElementById("newReserved").checked;

        // Log para verificar si se obtienen los nuevos datos
        console.log("Nuevos datos:", NEW_TITLE, NEW_AUTHOR, NEW_GENRE, NEW_RESERVED);

        // Actualiza los datos del libro
        BOOKS_ARRAY[index] = {
            title: NEW_TITLE,
            author: NEW_AUTHOR,
            genre: NEW_GENRE,
            reserved: NEW_RESERVED
        };

        // Actualiza el array en localStorage
        localStorage.setItem("booksArrayKey", JSON.stringify(BOOKS_ARRAY));

        // Recargar y mostrar los libros
        const modifyModal = new bootstrap.Modal(document.getElementById('modifyModal'));
        modifyModal.hide();

        displayBooks();
    } else {
        console.error("Índice inválido al intentar modificar el libro.");
    }
}

// Eliminar un libro del array y actualizar localStorage
function deleteBook(index) {
    const BOOKS_ARRAY = JSON.parse(localStorage.getItem("booksArrayKey")) || [];

    if (index >= 0 && index < BOOKS_ARRAY.length) {
        // Elimina solo el libro en la posición index
        BOOKS_ARRAY.splice(index, 1);
        localStorage.setItem("booksArrayKey", JSON.stringify(BOOKS_ARRAY));

        // Recargar y mostrar los libros
        displayBooks();
    } else {
        console.error("Índice inválido al intentar eliminar el libro.");
    }
}

// Llamar a displayBooks al cargar la página si la contraseña es correcta
if (localStorage.getItem("passwordKey")) {
    checkPassword();
}
displayBooks();
setPassword();
