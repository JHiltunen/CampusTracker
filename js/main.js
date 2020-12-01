// get close and open button elements
let openBtn = document.getElementById("openbtn");
let sidenav = document.getElementById("sidenav");

// add event listeners
openBtn.addEventListener("click", open);

// function to handle navbar opening
function open() {
    if (sidenav.style.width == '223px') {
        sidenav.style.width = '0';
        sidenav.style.opacity = 0;
    } else {
        sidenav.style.width = "223px";
        sidenav.style.opacity = 1.5;
    }
}
