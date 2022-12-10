/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

const activeuser = window.localStorage.getItem("activeuser");
if (activeuser) {
    document.querySelector(".user-menu-container").innerHTML = `
        <a href="user.html?section=detail" class="user-menu-child">User Detail</a>
        <span class="or">or</span>
        <a href="#logout" class="user-menu-child" onclick="logout('${activeuser}')">Logout</a>
    `;
} else {
    console.log("nothing happen");
}

function logout() {
    window.localStorage.removeItem("activeuser");

    window.location.href = "login.html";
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
    const theuser = userlist.filter((user) => user.email === email)[0];

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
        console.log(theuser.password);
        return;
    }

    // store status session as active user
    window.localStorage.setItem("activeuser", theuser.id);

    window.location.href = "user.html?section=detail";
});

function refreshcartnumber() {
    let cartnumber = window.localStorage.getItem("cartnumber")
        ? parseInt(window.localStorage.getItem("cartnumber"))
        : 0;

    window.localStorage.setItem("cartnumber", cartnumber);

    document.querySelector(".no-addedtocart span").textContent = cartnumber;
}

refreshcartnumber();
