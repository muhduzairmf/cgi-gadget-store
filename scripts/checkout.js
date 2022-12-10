/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

const containerSummary = document.querySelector(".summary");
const summaryList = JSON.parse(window.localStorage.getItem("cartlist"));
const currentUser = JSON.parse(window.localStorage.getItem("userlist")).filter(
    (user) => user.id === window.localStorage.getItem("activeuser")
)[0];

let overallprice = 0;

summaryList.forEach((product) => {
    containerSummary.innerHTML += `
    <div class="summary-product">
        <div class="summary-product-detail">
            <div class="summary-product-desc">
                <img
                    src="assets/${product.productImages}-1.png"
                    alt="summary-product-desc-img"
                    class="summary-product-desc-img"
                />
                <p class="summary-product-desc-title">
                    ${product.productName}
                </p>
            </div>
            <div class="summary-product-quantity">
                <p class="summary-product-quantity-title">${
                    product.quantityToBuy
                }</p>
            </div>
            <div class="summary-product-price">
                <p class="summary-product-price-title">
                    RM ${product.quantityToBuy * product.productPrice}
                </p>
            </div>
        </div>
        <hr />
    </div>
    `;
    overallprice += product.quantityToBuy * product.productPrice;
});

overallprice = Math.round((overallprice + Number.EPSILON) * 100) / 100;
let discountapplied = 0;
let discountpercent = 0;
let cartnumber = parseInt(window.localStorage.getItem("cartnumber"));

if (cartnumber >= 5 && cartnumber <= 10) {
    discountapplied =
        Math.round((overallprice * 0.05 + Number.EPSILON) * 100) / 100;
    discountpercent = 5;
} else if (cartnumber >= 11) {
    discountapplied =
        Math.round((overallprice * 0.15 + Number.EPSILON) * 100) / 100;
    discountpercent = 15;
}

// let shippingfee = overallprice >= 100.0 ? 0 : 10;
let shippingfee = 0;
if (overallprice > 100.00) {
    shippingfee = 0;
} else {
    shippingfee = 10;
}

let amounttopay =
    Math.round(
        (overallprice - discountapplied + shippingfee + Number.EPSILON) * 100
    ) / 100;

containerSummary.innerHTML += `
<div class="summary-pay">
    <div class="summary-pay-overall">
        <div></div>
        <p class="summary-pay-overall-title">OVERALL TOTAL </p>
        <p>:&nbsp;&nbsp;&nbsp;RM</p>
        <p class="summary-pay-overall-quantity">${overallprice}</p>
    </div>
    <div class="summary-pay-shipping">
        <div></div>
        <p class="summary-pay-shipping-title">SHIPPING FEE </p>
        <p>:&nbsp;&nbsp;&nbsp;RM</p>
        <p class="summary-pay-shipping-quantity">${shippingfee}</p>
    </div>
    <div class="summary-pay-discount">
        <div></div>
        <p class="summary-pay-discount-title">DISCOUNT (${discountpercent}%)</p>
        <p>:&nbsp;&nbsp;&nbsp;RM</p>
        <p class="summary-pay-discount-quantity">${discountapplied}</p>
    </div>
    <div class="summary-pay-amount">
        <div></div>
        <p class="summary-pay-amount-title">AMOUNT TO PAY</p>
        <p>:&nbsp;&nbsp;&nbsp;RM</p>
        <p class="summary-pay-amount-quantity">${amounttopay}</p>
    </div>
</div>
`;

if (currentUser) {
    document.querySelector("#receivername").value =
        currentUser.firstname + " " + currentUser.lastname;
    document.querySelector("#phonenum").value = currentUser.phonenum;
    document.querySelector("#email").value = currentUser.email;
} else {
    document.querySelector("#receivername").placeholder = "Receiver Name";
    document.querySelector("#phonenum").placeholder = "Receiver Phone Number";
    document.querySelector("#email").placeholder = "Receiver Email Address";
}

document.querySelector(".billing-msg").style.display = "none";

document.querySelector(".billing-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const receivername = document.querySelector("#receivername").value;
    const phonenum = document.querySelector("#phonenum").value;
    const email = document.querySelector("#email").value;
    const addressline1 = document.querySelector("#addressline1").value;
    // const addressline2 = document.querySelector("#addressline2").value;
    const postcode = document.querySelector("#postcode").value;
    const towncity = document.querySelector("#towncity").value;
    const state = document.querySelector("#state").value;
    // const ordernotes = document.querySelector("#ordernotes").value;

    if (
        !receivername ||
        !phonenum ||
        !email ||
        !addressline1 ||
        !postcode ||
        !towncity ||
        !state
    ) {
        // console.log("all field is required!");
        document.querySelector(".billing-msg-content").textContent =
            "All the * field is required!";
        document.querySelector(".billing-msg").style.display = "block";
        window.location.href = "#error_billing";
        return;
    }

    if (receivername.length < 1) {
        // console.log("you must enter valid name");
        document.querySelector(".billing-msg-content").textContent =
            "You must enter valid name";
        document.querySelector(".billing-msg").style.display = "block";
        window.location.href = "#error_billing";
        return;
    }

    const phonenumRegexp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (!phonenum.match(phonenumRegexp)) {
        // console.log("you must enter valid phone number");
        document.querySelector(".billing-msg-content").textContent =
            "You must enter valid phone number";
        document.querySelector(".billing-msg").style.display = "block";
        window.location.href = "#error_billing";
        return;
    }

    const emailRegexp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(emailRegexp)) {
        // console.log("you must enter valid email");
        document.querySelector(".billing-msg-content").textContent =
            "You must enter valid email";
        document.querySelector(".billing-msg").style.display = "block";
        window.location.href = "#error_billing";
        return;
    }

    alert("To be continued...");
});

function refreshcartnumber() {
    let cartnumber = window.localStorage.getItem("cartnumber")
        ? parseInt(window.localStorage.getItem("cartnumber"))
        : 0;

    window.localStorage.setItem("cartnumber", cartnumber);

    document.querySelector(".no-addedtocart span").textContent = cartnumber;
}

refreshcartnumber();
