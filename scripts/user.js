/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

const activeuser = window.localStorage.getItem("activeuser");

if (
    !activeuser ||
    !JSON.parse(window.localStorage.getItem("userlist")) ||
    !JSON.parse(window.localStorage.getItem("userlist")).filter(
        (theUser) => theUser.id === activeuser
    )[0]
) {
    window.location.href = "register.html";
}

const section = new URLSearchParams(window.location.search).get("section");
const containerHeader = document.querySelector(".header");
const containerMainSection = document.querySelector(".main-section");

if (section) {
    const userlist = JSON.parse(window.localStorage.getItem("userlist"));
    const user = userlist.filter((theUser) => theUser.id === activeuser)[0];
    if (section === "detail") {
        containerHeader.innerHTML = `
            <h3 class="header-title">User Detail</h3>
            <div class="breadcrumb">
                <a class="breadcrumb-element" href="index.html">Home</a>
                &nbsp;
                <h5 class="chevron"><i class="bi bi-chevron-right"></i></h5>
                &nbsp;
                <a class="breadcrumb-element" href="#">User Detail</a>
            </div>    
        `;
        containerMainSection.innerHTML = `
            <div class="detail">
                <div class="detail-container-img">
                    <img src="../assets/male-profile-img.png" alt="detail-img" class="detail-img">
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Name</h5>
                    <p class="detail-content">${user.firstname}&nbsp;${user.lastname}</p>
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Gender</h5>
                    <p class="detail-content">${user.gender}</p>
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Email</h5>
                    <p class="detail-content">${user.email}</p>
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Phone Number</h5>
                    <p class="detail-content">${user.phonenum}</p>
                </div>
                <div class="detail-group-link">
                    <a href="user.html?section=edit-profile" ><button class="btn-secondary">EDIT</button></a>
                    <a href="user.html?section=change-password" ><button class="btn-primary">CHANGE PASSWORD</button></a>
                </div>
            </div>
        `;
    } else if (section === "edit-profile") {
        containerHeader.innerHTML = `
            <h3 class="header-title">Edit Profile</h3>
            <div class="breadcrumb">
                <a class="breadcrumb-element" href="index.html">Home</a>
                &nbsp;
                <h5 class="chevron"><i class="bi bi-chevron-right"></i></h5>
                &nbsp;
                <a class="breadcrumb-element" href="user.html?section=detail">User Detail</a>
                &nbsp;
                <h5 class="chevron"><i class="bi bi-chevron-right"></i></h5>
                &nbsp;
                <a class="breadcrumb-element" href="#">Edit Profile</a>
            </div>
        `;
        containerMainSection.innerHTML = `
            <form class="detail" id="editProfile">
                <div class="detail-msg" id="error_edit">
                    <p class="detail-msg-content"></p>
                </div>
                <div class="detail-group-input">
                    <label for="firstname" class="detail-label"
                        >First Name</label
                    >
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        class="detail-input"
                        autocomplete="off"
                        value="${user.firstname}"
                    />
                </div>
                <div class="detail-group-input">
                    <label for="lastname" class="detail-label">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        class="detail-input"
                        autocomplete="off"
                        value="${user.lastname}"
                    />
                </div>
                <div class="detail-group-input">
                    <label for="gender" class="detail-label">Gender</label>
                    <select name="gender" id="gender" class="detail-input">
                        <option value="male">Male</option ${
                            user.gender === "Male" ? "default" : ""
                        }>
                        <option value="female">Female</option ${
                            user.gender === "Female" ? "default" : ""
                        }>
                    </select>
                </div>
                <div class="detail-group-input">
                    <label for="phonenum" class="detail-label"
                        >Phone Number</label
                    >
                    <input
                        type="tel"
                        name="phonenum"
                        id="phonenum"
                        class="detail-input"
                        autocomplete="off"
                        value="${user.phonenum}"
                    />
                </div>
                <div class="detail-group-input">
                    <label for="email" class="detail-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        class="detail-input"
                        autocomplete="off"
                        value="${user.email}"
                    />
                </div>
                <div class="detail-group-btn">
                    <a href="user.html?section=detail"><button type="button" class="btn-secondary">CANCEL</button></a>
                    <button type="submit" class="btn-primary">SAVE</button>
                </div>
            </form>
        `;
        document.querySelector(".detail-msg").style.display = "none";
    } else if (section === "change-password") {
        containerHeader.innerHTML = `
            <h3 class="header-title">Change Password</h3>
            <div class="breadcrumb">
                <a class="breadcrumb-element" href="index.html">Home</a>
                &nbsp;
                <h5 class="chevron"><i class="bi bi-chevron-right"></i></h5>
                &nbsp;
                <a class="breadcrumb-element" href="user.html?section=detail">User Detail</a>
                &nbsp;
                <h5 class="chevron"><i class="bi bi-chevron-right"></i></h5>
                &nbsp;
                <a class="breadcrumb-element" href="#">Change Password</a>
            </div>
        `;
        containerMainSection.innerHTML = `
            <form class="detail" id="changePassword">
                <div class="detail-msg" id="error_edit">
                    <p class="detail-msg-content"></p>
                </div>
                <div class="detail-group-input">
                    <label for="currentpassword" class="detail-label"
                        >Current Password</label
                    >
                    <input
                        type="password"
                        name="currentpassword"
                        id="currentpassword"
                        class="detail-input"
                        autocomplete="off"
                        placeholder="&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;"
                    />
                </div>
                <div class="detail-group-input">
                    <label for="newpassword" class="detail-label"
                        >New Password</label
                    >
                    <input
                        type="password"
                        name="newpassword"
                        id="newpassword"
                        class="detail-input"
                        autocomplete="off"
                        placeholder="&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;"
                    />
                    <small
                        >Password must contains 8 characters with combination of
                        uppercase, lowercase and number.</small
                    >
                </div>
                <div class="detail-group-input">
                    <label for="confirmpassword" class="detail-label"
                        >Confirm New Password</label
                    >
                    <input
                        type="password"
                        name="confirmpassword"
                        id="confirmpassword"
                        class="detail-input"
                        autocomplete="off"
                        placeholder="&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;"
                    />
                </div>
                <div class="detail-group-btn">
                    <a href="user.html?section=detail"><button type="button" class="btn-secondary">CANCEL</button></a>
                    <button type="submit" class="btn-primary">SAVE</button>
                </div>
            </form>
        `;
        document.querySelector(".detail-msg").style.display = "none";
    }
} else {
    window.location.href = "user.html?section=detail";
}

function cancelSubmission() {
    window.location.href = "user.html?section=detail";
}

document.querySelector("#editProfile").addEventListener("submit", (e) => {
    e.preventDefault();

    // get firstname, lastname, gender, phonenum, email
    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const gender = document.querySelector("#gender").value;
    const phonenum = document.querySelector("#phonenum").value;
    const email = document.querySelector("#email").value;

    // check all input section is filled
    if (!firstname || !lastname || !gender || !phonenum || !email) {
        // console.log("all field is required!");
        document.querySelector(".detail-msg-content").textContent =
            "All field is required!";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // validate firstname and lastname
    if (firstname.length < 1 || lastname.length < 1) {
        // console.log("you must enter valid name");
        document.querySelector(".detail-msg-content").textContent =
            "You must enter valid name";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // validate phonenum
    const phonenumRegexp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (!phonenum.match(phonenumRegexp)) {
        // console.log("you must enter valid phone number");
        document.querySelector(".detail-msg-content").textContent =
            "You must enter valid phone number";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // validate email
    const emailRegexp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(emailRegexp)) {
        // console.log("you must enter valid email");
        document.querySelector(".detail-msg-content").textContent =
            "You must enter valid email";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // get userlist without activeuser
    let userlist = JSON.parse(window.localStorage.getItem("userlist")).filter(
        (user) => user.id !== activeuser
    );

    // change the detail value of this user
    const theuser = JSON.parse(window.localStorage.getItem("userlist")).filter(
        (user) => user.id === activeuser
    )[0];
    const editeduser = {
        id: activeuser,
        firstname,
        lastname,
        gender,
        phonenum,
        email,
        password: theuser.password,
    };

    // update the userlist
    userlist = [...userlist, editeduser];
    window.localStorage.setItem("userlist", JSON.stringify(userlist));

    window.location.href = "user.html?section=detail";
});

document.querySelector("#changePassword").addEventListener("submit", (e) => {
    e.preventDefault();

    // get current password, new password, confirm new password
    const currentpassword = document.querySelector("#currentpassword").value;
    const newpassword = document.querySelector("#newpassword").value;
    const confirmpassword = document.querySelector("#confirmpassword").value;

    // check if current password is same as before
    const theuser = JSON.parse(window.localStorage.getItem("userlist")).filter(
        (user) => user.id === activeuser
    )[0];
    if (!currentpassword.match(theuser.password)) {
        document.querySelector(".detail-msg-content").textContent =
            "Please enter your current password correctly";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // check if the new password meets the requirement
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!newpassword.match(passwordRegexp)) {
        // console.log("the password must meet the given requirement");
        document.querySelector(".detail-msg-content").textContent =
            "The password must meet the given requirement";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // check if the confirm new password is same as new password
    if (!newpassword.match(confirmpassword)) {
        // console.log("confirm password must same as password");
        document.querySelector(".detail-msg-content").textContent =
            "Confirm password must same as password";
        document.querySelector(".detail-msg").style.display = "block";
        window.location.href = "#error_edit";
        return;
    }

    // get userlist without activeuser
    let userlist = JSON.parse(window.localStorage.getItem("userlist")).filter(
        (user) => user.id !== activeuser
    );

    // change the detail value of this user
    const editeduser = {
        id: activeuser,
        firstname: theuser.firstname,
        lastname: theuser.lastname,
        gender: theuser.gender,
        phonenum: theuser.phonenum,
        email: theuser.email,
        password: newpassword,
    };

    // update the userlist
    userlist = [...userlist, editeduser];
    window.localStorage.setItem("userlist", JSON.stringify(userlist));

    window.location.href = "user.html?section=detail";
});
