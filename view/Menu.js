const menuBtn = document.querySelector('.hamburger-button');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});

// Detect all clicks on the document
document.addEventListener("click", function(event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(".box")) return
    // If user clicks outside the element, hide it!
    if(menuBtn.classList.contains('w--open')){
        menuBtn.classList.remove('open');
        menuOpen = false;
    }

});