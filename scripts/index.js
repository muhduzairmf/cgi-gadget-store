/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds,
    };
}

function initializeClock(endtime) {
    const daysDiv = document.querySelector(".days h3");
    const hoursDiv = document.querySelector(".hours h3");
    const minutesDiv = document.querySelector(".minutes h3");
    const secondsDiv = document.querySelector(".seconds h3");

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysDiv.innerHTML = t.days;
        hoursDiv.innerHTML = ("0" + t.hours).slice(-2);
        minutesDiv.innerHTML = ("0" + t.minutes).slice(-2);
        secondsDiv.innerHTML = ("0" + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

const containerTopSellingDiv = document.querySelector(".topselling-div");

const getData = async () => {
    const res = await fetch("../data/db.json");

    const data = await res.json();

    return data;
};

const renderProduct = (products) => {
    let templateTopSellingDiv = ``;

    for (let index = 0; index < 8; index++) {
        const product = products[index];
        templateTopSellingDiv += `
                <div class="topselling-card">
                    <div class="topselling-image">
                        <img src="../assets/${
                            product.productImages + "-1.png"
                        }" alt="$product.productName" class="topselling-img">
                        <a href="product.html?productId=${
                            product.productId
                        }" class="topselling-btn">Buy</a>
                    </div>
                    <div class="topselling-desc">
                        <h4 class="topselling-title">${product.productName}</h4>
                            <div class="topselling-rating">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                            </div>
                        <h5 class="topselling-price">${
                            product.productPriceNew
                        }</h5>
                        <a href="category.html?category=${product.productCategory.toLowerCase()}">${
            product.productCategory
        }</a>&nbsp;|&nbsp;
                        <a href="category.html?searchQuery=${product.productBrand.toLowerCase()}&category=all">${
            product.productBrand
        }</a>
                        
                        
                    </div>
                </div>
        `;
    }

    containerTopSellingDiv.innerHTML = templateTopSellingDiv;
};

getData().then((data) => {
    const shuffledProducts = data.products.sort((a, b) => 0.5 - Math.random());

    renderProduct(shuffledProducts);
})

const deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000);
initializeClock(deadline);

function refreshcartnumber() {
    let cartnumber = window.localStorage.getItem("cartnumber")
        ? parseInt(window.localStorage.getItem("cartnumber"))
        : 0;

    window.localStorage.setItem("cartnumber", cartnumber);

    document.querySelector(".no-addedtocart span").textContent = cartnumber;
}

refreshcartnumber();