// Set the width of the side navigation to 250px
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

// Set the width of the side navigation to 0
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

const category = new URLSearchParams(window.location.search).get("category");
const searchQuery = new URLSearchParams(window.location.search).get(
    "searchQuery"
);
const containerCategoryList = document.querySelector(".category-list");
const containerSearchbox = document.querySelector("form.searchbox-form");
const containerCategoryTitle = document.querySelector(".header-title");
const containerCategoryBread = document.querySelector(
    ".breadcrumb-element-category"
);

containerSearchbox.innerHTML = `
    <input type="text" class="search-input" name="searchQuery" placeholder="Search in the related category" value="${searchQuery}" />
    <button class="search-btn" type="submit">Search</button>
    <input type="hidden" name="category" value="${category}" />
`;

const getData = async () => {
    const res = await fetch("../data/db.json");

    const data = await res.json();

    return data;
};

const renderProduct = (products) => {
    let templateCategoryList = ``;

    if (products.length == 0) {
        templateCategoryList = `<h3>No product found</h3>`;
        containerCategoryList.innerHTML = templateCategoryList;
        return;
    }

    if (category.toLowerCase() === "ram" || category.toLowerCase() === "ssd") {
        containerCategoryTitle.textContent = category.toUpperCase();
        containerCategoryBread.textContent = category.toUpperCase();
    } else {
        containerCategoryTitle.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);
        containerCategoryBread.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);
    }

    products.forEach((product) => {
        templateCategoryList += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="../assets/${
                            product.productImages + "-1.png"
                        }" alt="$product.productName" class="product-img">
                        <a href="product.html?productId=${
                            product.productId
                        }" class="product-btn">Buy</a>
                    </div>
                    <div class="product-desc">
                        <h4 class="product-title">${product.productName}</h4>
                            <div class="product-rating">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                                <img src="../assets/star.png" alt="star" class="star">
                            </div>
                        <h5 class="product-price">RM${
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
    });

    containerCategoryList.innerHTML = templateCategoryList;
};

if (searchQuery) {
    getData().then((data) => {
        const products = data.products.filter(function (products) {
            if (
                products.productCategory.toLowerCase() === category ||
                category === "all"
            ) {
                if (
                    products.productName
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1 ||
                    products.productFullName
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1 ||
                    products.productCategory
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1 ||
                    products.productBrand
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
                ) {
                    return true;
                }
            }
        });

        containerSearchbox.innerHTML = `
            <input type="text" class="search-input" name="searchQuery" placeholder="Search in the related category" value="${searchQuery}" />
            <button class="search-btn" type="submit">Search</button>
            <input type="hidden" name="category" value="${category}" />
        `;

        renderProduct(products);
    });
} else {
    getData().then((data) => {
        const products = data.products.filter(function (products) {
            if (
                products.productCategory.toLowerCase() === category ||
                category === "all"
            ) {
                return true;
            }
        });

        const shuffledProducts = products.sort((a, b) => 0.5 - Math.random());

        containerSearchbox.innerHTML = `
            <input type="text" class="search-input" name="searchQuery" placeholder="Search in the related category" value="" />
            <button class="search-btn" type="submit">Search</button>
            <input type="hidden" name="category" value="${category}" />
        `;

        renderProduct(shuffledProducts);
    });
}

document.querySelector("#" + category).style.backgroundColor =
    "var(--red-color)";
document.querySelector("#" + category).style.color = "white";
document.querySelector("#" + category).style.border = "1px solid transparent";

function refreshcartnumber() {
    let cartnumber = window.localStorage.getItem("cartnumber")
        ? parseInt(window.localStorage.getItem("cartnumber"))
        : 0;

    window.localStorage.setItem("cartnumber", cartnumber);

    document.querySelector(".no-addedtocart span").textContent = cartnumber;
}

refreshcartnumber();