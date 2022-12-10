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

const containerCartlist = document.querySelector(".cartlist");
const cartlistProduct = window.localStorage.getItem("cartlist")
    ? JSON.parse(window.localStorage.getItem("cartlist"))
    : [];

if (cartlistProduct.length !== 0) {
    let overallprice = 0.0;
    cartlistProduct.forEach((prouductincart) => {
        containerCartlist.innerHTML += `
        <div class="cartlist-product">
            <div class="cartlist-product-img">
                <img
                    src="assets/${prouductincart.productImages}-1.png"
                    alt="cartlist-product-image"
                    class="cartlist-product-image"
                />
            </div>
            <div class="cartlist-product-detail">
                <div class="cartlist-product-title">${prouductincart.productName}</div>
                <div class="cartlist-product-action">
                    <div class="cartlist-product-adjustquantity">
                        <button class="decrease-btn" onclick="decrease('${prouductincart.productId}')"><i class="bi bi-chevron-left"></i></button>
                        <input type="text" id="quantity-${prouductincart.productId}" value="${prouductincart.quantityToBuy}" readonly />
                        <button class="increase-btn" onclick="increase('${prouductincart.productId}')"><i class="bi bi-chevron-right"></i></button>
                    </div>
                    <div class="cartlist-product-delete">
                        <i class="bi bi-trash" onclick="deleteProduct('${prouductincart.productId}')"></i>
                    </div>
                </div>
            </div>
            <div class="cartlist-product-price"><h5 class="cartlist-product-price-title">PRICE : RM ${prouductincart.productPrice}</h5></div>
        </div>
        `;
        overallprice +=
            prouductincart.quantityToBuy * prouductincart.productPrice;
    });

    overallprice = Math.round((overallprice + Number.EPSILON) * 100) / 100;
    containerCartlist.innerHTML += `
    <div class="cartlist-overall">
        <h4 class="cartlist-overall-title">OVERALL TOTAL :</h4>
        <h4 class="cartlist-overall-price">RM ${overallprice}</h4>
    </div>
    <div class="cartlist-group-btn">
        <button class="btn-secondary" onclick="window.location.href = 'category.html?category=all';">CONTINUE SHOPPING</button>
        <button class="btn-primary" onclick="window.location.href = 'checkout.html';">PROCEED TO CHECKOUT</button>
    </div>
    `;
} else {
    containerCartlist.innerHTML += `
        <div style="display:flex;justify-content:center;align-items:center;height:20vh;width:100%;">
        <h3>There is no product here...</h3>
        </div>
        <div class="cartlist-group-btn">
            <button class="btn-primary" onclick="window.location.href = 'category.html?category=all';">CONTINUE SHOPPING</button>
        </div>
    `;
}

function increase(productId) {
    let quantityToBuy = parseInt(
        document.querySelector("#quantity-" + productId).value
    );

    if (quantityToBuy === 10) {
        alert("You have reach out maximum quantity to buy.");
        return;
    }

    quantityToBuy += 1;
    document.querySelector("#quantity-" + productId).value = quantityToBuy;

    let theproduct = JSON.parse(window.localStorage.getItem("cartlist")).filter(
        (product) => product.productId === productId
    )[0];

    theproduct.quantityToBuy = quantityToBuy;

    let newcartlist = JSON.parse(
        window.localStorage.getItem("cartlist")
    ).filter((product) => product.productId !== productId);

    newcartlist = [...newcartlist, theproduct];

    window.localStorage.setItem("cartlist", JSON.stringify(newcartlist));

    let newoverallprice = 0;
    let allquantity = 0;

    newcartlist.forEach((product) => {
        newoverallprice += product.quantityToBuy * product.productPrice;
        allquantity += product.quantityToBuy;
    });

    document.querySelector(".cartlist-overall-price").textContent =
        "RM " + newoverallprice;

    window.localStorage.setItem("cartnumber", allquantity);
}

function decrease(productId) {
    let quantityToBuy = parseInt(
        document.querySelector("#quantity-" + productId).value
    );

    if (quantityToBuy === 1) {
        deleteProduct(productId);
        return;
    }

    quantityToBuy -= 1;
    document.querySelector("#quantity-" + productId).value = quantityToBuy;

    let theproduct = JSON.parse(window.localStorage.getItem("cartlist")).filter(
        (product) => product.productId === productId
    )[0];

    theproduct.quantityToBuy = quantityToBuy;

    let newcartlist = JSON.parse(
        window.localStorage.getItem("cartlist")
    ).filter((product) => product.productId !== productId);

    console.log(JSON.parse(window.localStorage.getItem("cartlist")));
    newcartlist = [...newcartlist, theproduct];

    window.localStorage.setItem("cartlist", JSON.stringify(newcartlist));

    let newoverallprice = 0;
    let allquantity = 0;

    newcartlist.forEach((product) => {
        newoverallprice += product.quantityToBuy * product.productPrice;
        allquantity += product.quantityToBuy;
    });

    document.querySelector(".cartlist-overall-price").textContent =
        "RM " + newoverallprice;

    window.localStorage.setItem("cartnumber", allquantity);
}

function deleteProduct(productId) {
    let newcartlist = cartlistProduct.filter(
        (product) => product.productId !== productId
    );

    window.localStorage.setItem("cartlist", JSON.stringify(newcartlist));

    let cartnumber = 0;

    newcartlist.forEach((product) => {
        cartnumber += product.quantityToBuy;
    });

    window.localStorage.setItem("cartnumber", cartnumber);

    window.location.href = "cart.html";
}

function refreshcartnumber() {
    let cartnumber = window.localStorage.getItem("cartnumber")
        ? parseInt(window.localStorage.getItem("cartnumber"))
        : 0;

    window.localStorage.setItem("cartnumber", cartnumber);

    document.querySelector(".no-addedtocart span").textContent = cartnumber;
}

refreshcartnumber();
