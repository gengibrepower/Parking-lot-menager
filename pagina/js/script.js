const header = document.querySelector(".header");
const hero = document.querySelector(".fundo_header");

window.addEventListener("scroll", function () {

    const trigger = hero.offsetHeight -500;

    if (window.scrollY > trigger) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.modulo').forEach(m => observer.observe(m));