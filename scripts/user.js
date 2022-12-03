/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

const section = new URLSearchParams(window.location.search).get("section");
const containerHeader = document.querySelector(".header");
const containerMainSection = document.querySelector(".main-section");

if (section) {
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
                    <p class="detail-content">John Smith</p>
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Gender</h5>
                    <p class="detail-content">Male</p>
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Email</h5>
                    <p class="detail-content">johnsmith@email.com</p>
                </div>
                <div class="detail-group">
                    <h5 class="detail-title">Phone Number</h5>
                    <p class="detail-content">+60198767890</p>
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
            <form class="detail">
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
                        value="John"
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
                        value="Smith"
                    />
                </div>
                <div class="detail-group-input">
                    <label for="gender" class="detail-label">Gender</label>
                    <select name="gender" id="gender" class="detail-input">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
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
                        value="+60198767890"
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
                        value="johnsmith@email.com"
                    />
                </div>
                <div class="detail-group-btn">
                    <a href="user.html?section=detail"><button type="button" class="btn-secondary">CANCEL</button></a>
                    <button type="submit" class="btn-primary">SAVE</button>
                </div>
            </form>
        `;
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
            <form class="detail">
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
    }
} else {
    window.location.href = "user.html?section=detail";
}

function cancelSubmission() {
    window.location.href = "user.html?section=detail";
}

document.querySelector(".detail").addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "user.html?section=detail";
});
