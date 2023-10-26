function mostrarModal(titulo, autor, imagen, description) {
    var modal = document.getElementById("my-modal");
    var modalImage = document.getElementById("modal-image");
    var modalTitle = document.getElementById("modal-title");
    var modalAuthor = document.getElementById("modal-author");
    var modalDescription = document.getElementById("modal-description");
  
    modal.style.display = "block";
    modalImage.src = imagen;
    modalTitle.innerHTML = titulo;
    modalAuthor.innerHTML = autor;
    modalDescription.innerHTML = description;
}
  
function cerrarModal() {
    var modal = document.getElementById("my-modal");
    modal.style.display = "none";
}
  
window.onclick = function (event) {
    var modal = document.getElementById("my-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
