// get close and open button elements
const closeBtn = document.getElementById("closebtn");
const openBtn = document.getElementById("openbtn");

// add event listeners
closeBtn.addEventListener("click", closeNav);
openBtn.addEventListener("click", openNav);

// function to handle navbar opening
function openNav() {
    document.getElementById("sidenav").style.width = "250px";
}

// function to handle navbar closing
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}
