/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

document.querySelector(".register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "user.html?section=detail";
});
