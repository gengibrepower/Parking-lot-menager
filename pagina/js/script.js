const header = document.querySelector(".header");
const hero = document.querySelector(".fundo_header");

window.addEventListener("scroll", function () {

    const trigger = hero.offsetHeight - 100;

    if (window.scrollY > trigger) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});