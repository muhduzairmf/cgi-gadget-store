/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

document.querySelector(".register-msg").style.display = "none";

document.querySelector(".register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // window.location.href = "user.html?section=detail";

    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const gender = document.querySelector("#gender").value;
    const phonenum = document.querySelector("#phonenum").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmpassword = document.querySelector("#confirmpassword").value;

    // check all input section is filled
    if (
        !firstname ||
        !lastname ||
        !gender ||
        !phonenum ||
        !email ||
        !password ||
        !confirmpassword
    ) {
        // console.log("all field is required!");
        document.querySelector(".register-msg-content").textContent =
            "All field is required!";
        document.querySelector(".register-msg").style.display = "block";
        window.location.href = "#error_register";
        return;
    }

    // check first name and last name is more than 1 character
    if (firstname.length < 1 || lastname.length < 1) {
        // console.log("you must enter valid name");
        document.querySelector(".register-msg-content").textContent =
            "You must enter valid name";
        document.querySelector(".register-msg").style.display = "block";
        window.location.href = "#error_register";
        return;
    }

    // check the validity of phone number
    const phonenumRegexp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (!phonenum.match(phonenumRegexp)) {
        // console.log("you must enter valid phone number");
        document.querySelector(".register-msg-content").textContent =
            "You must enter valid phone number";
        document.querySelector(".register-msg").style.display = "block";
        window.location.href = "#error_register";
        return;
    }

    // check the validity of email
    const emailRegexp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(emailRegexp)) {
        // console.log("you must enter valid email");
        document.querySelector(".register-msg-content").textContent =
            "You must enter valid email";
        document.querySelector(".register-msg").style.display = "block";
        window.location.href = "#error_register";
        return;
    }

    // check if the password meet the requirement
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegexp)) {
        // console.log("the password must meet the given requirement");
        document.querySelector(".register-msg-content").textContent =
            "The password must meet the given requirement";
        document.querySelector(".register-msg").style.display = "block";
        window.location.href = "#error_register";
        return;
    }

    // check if the confirm password is same as password
    if (!password.match(confirmpassword)) {
        // console.log("confirm password must same as password");
        document.querySelector(".register-msg-content").textContent =
            "Confirm password must same as password";
        document.querySelector(".register-msg").style.display = "block";
        window.location.href = "#error_register";
        return;
    }

    let userlist = [];

    if (window.localStorage.getItem("userlist")) {
        userlist = JSON.parse(window.localStorage.getItem("userlist"));
        // check if the email already exists
        userlist.forEach((user) => {
            if (email === user.email) {
                document.querySelector(".register-msg-content").textContent =
                    "Email is alrady used";
                document.querySelector(".register-msg").style.display = "block";
                window.location.href = "#error_register";
                return;
            }
        });
    }

    const newuser = {
        id: self.crypto.randomUUID(),
        firstname,
        lastname,
        gender,
        phonenum,
        email,
        password
    };

    userlist = [...userlist, newuser];

    // if all of above is passed, store all info in localstorage, in a form of array
    window.localStorage.setItem("userlist", JSON.stringify(userlist));

    // store status session as active user
    window.localStorage.setItem("activeuser", newuser.id);

    // redirect to user detail page
    window.location.href = "user.html?section=detail";
});
