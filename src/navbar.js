const menuBtn = document.getElementsByClassName("menubtn")[0];
const menuImg = document.getElementsByClassName("menubtn")[0];
const navLinks = document.getElementsByClassName("navlinks")[0];

menuBtn.addEventListener("click", navhandler);
menuImg.src = "./assets/menubar.png";
function navhandler() {
  menuImg.src = "./assets/menubar.png";
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  } else {
    menuImg.src = "./assets/closebar.png";
    navLinks.classList.add("active");
  }
}
