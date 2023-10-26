window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var nav = document.querySelector('#navbar');

    if (window.scrollY > header.offsetHeight) {
        nav.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav');
    }
});