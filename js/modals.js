function mostrarModal(titulo, autor, genere, imagen, description) {
    var modal = document.getElementById("unic-my-modal");
    var modalImage = document.getElementById("unic-modal-image");
    var modalTitle = document.getElementById("unic-modal-title");
    var modalAuthor = document.getElementById("unic-modal-author");
    var modalGenere = document.getElementById("unic-modal-genere");
    var modalDescription = document.getElementById("unic-modal-description");

    modal.style.display = "block";
    modalImage.src = imagen;
    modalTitle.innerHTML = titulo;
    modalAuthor.innerHTML = autor;
    modalGenere.innerHTML = genere;
    modalDescription.innerHTML = description;
}

function cerrarModal() {
    var modal = document.getElementById("unic-my-modal");
    modal.style.display = "none";
}

window.onclick = function (event) {
    var modal = document.getElementById("unic-my-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
