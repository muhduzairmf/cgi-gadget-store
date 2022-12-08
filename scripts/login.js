/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

document.querySelector(".login-msg").style.display = "none";

document.querySelector(".login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // all input is required
    if (!email || !password) {
        document.querySelector(".login-msg-content").textContent =
            "You must enter valid phone number";
        document.querySelector(".login-msg").style.display = "block";
        window.location.href = "#error_login";
        return;
    }

    // check the validity of email
    const emailRegexp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(emailRegexp)) {
        document.querySelector(".login-msg-content").textContent =
            "You must enter valid email";
        document.querySelector(".login-msg").style.display = "block";
        window.location.href = "#error_login";
        return;
    }

    // get userlist
    const userlist = JSON.parse(window.localStorage.getItem("userlist"));

    // check all user's email in userlist, if same as email input
    const theuser = userlist.filter((user) => user.email === email);

    if (!theuser) {
        document.querySelector(".login-msg-content").textContent =
            "Email does not exists";
        document.querySelector(".login-msg").style.display = "block";
        window.location.href = "#error_login";
        return;
    }

    // check if user's password that associated to the email, if same as password input
    if (theuser.password !== password) {
        document.querySelector(".login-msg-content").textContent =
            "Password does not match";
        document.querySelector(".login-msg").style.display = "block";
        window.location.href = "#error_login";
        return;
    }

    // store status session as active user
    window.localStorage.setItem("activeuser", theuser.id);

    window.location.href = "user.html?section=detail";
});
