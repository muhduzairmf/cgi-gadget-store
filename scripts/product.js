// Set the width of the side navigation to 250px
function openNav() {
    document.getElementById("sidenav").style.width = "65vw";
}

// Set the width of the side navigation to 0
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

const productId = new URLSearchParams(window.location.search).get("productId");
const containerProductImage = document.querySelector(".product-img");
const containerProductDetail = document.querySelector(".product-detail");
const containerProductDescList = document.querySelector(".product-desc-list");
const containerRelatedProduct = document.querySelector(
    ".related-product-container"
);

let imageName;

const productHeader = document.querySelector(".header-title");
const categoryBread = document.querySelector("#categoryBread");
const productBread = document.querySelector("#productBread");

const getData = async () => {
    const res = await fetch("../data/db.json");

    const data = await res.json();

    return data;
};

getData().then((data) => {
    const product = data.products.filter(function (product) {
        if (product.productId === productId) {
            return true;
        }
    });

    imageName = product[0].productImages;

    const templateProductImage = `
        <div class="product-images-collection">
            <div></div>
            <img src="../assets/${product[0].productImages}-1.png" alt="product-img-main" class="product-images-main">
            <div class="product-images-collague">
                <img src="../assets/${product[0].productImages}-1.png" alt="product-img-1" class="product-images-single" onclick="changeImageMain('1')">
                <img src="../assets/${product[0].productImages}-2.png" alt="product-img-2" class="product-images-single" onclick="changeImageMain('2')">
                <img src="../assets/${product[0].productImages}-3.png" alt="product-img-3" class="product-images-single" onclick="changeImageMain('3')">
                <img src="../assets/${product[0].productImages}-4.png" alt="product-img-4" class="product-images-single" onclick="changeImageMain('4')">
            <div></div>
            </div>
        </div>
    `;

    const templateProductDetail = `
        <h3 class="product-detail-name">${product[0].productName}</h3>
        <h6 class="product-detail-fullname">${product[0].productFullName}</h6>
        <a class="product-detail-category-and-brand">${product[0].productCategory}&nbsp;&nbsp;|&nbsp;&nbsp;${product[0].productBrand}</a>
        <div class="product-detail-price">
            <p class="product-detail-newprice">${product[0].productPriceNew}</p>&nbsp;&nbsp;
            <p class="product-detail-oldprice"><del>${product[0].productPriceOld}</del></p>
        </div>
        <div class="product-rating">
            <img src="../assets/star.png" alt="star" class="star" />
            <img src="../assets/star.png" alt="star" class="star" />
            <img src="../assets/star.png" alt="star" class="star" />
            <img src="../assets/star.png" alt="star" class="star" />
            <img src="../assets/star.png" alt="star" class="star" />
        </div>
        <div class="product-detail-buttons">
            <div class="product-detail-quantity">
                <button class="detaildecrease" onclick="decrease()"><i class="bi bi-chevron-left"></i></button>
                <input type="text" id="quantity" value="0" readonly />
                <button class="detailincrease" onclick="increase()"><i class="bi bi-chevron-right"></i></button>
            </div>
            <button class="product-detail-buy">Buy</button>
            <button class="product-detail-addtocart">Add to Cart</button>
        </div>
    `;

    let templateProductDescList = ``;

    product[0].productDesc.forEach((desc) => {
        templateProductDescList += `
            <li>${desc}</li>
        `;
    });

    const relatedProducts = data.products.filter(function (relatedProduct) {
        if (
            relatedProduct.productCategory === product[0].productCategory &&
            relatedProduct.productName !== product[0].productName
        ) {
            return true;
        }
    });

    let templateRelatedProduct = `
    <div></div>
    `;

    relatedProducts.forEach((relatedProduct) => {
        templateRelatedProduct += `
            <div class="product-card">
                <div class="product-image">
                    <img src="../assets/${
                        relatedProduct.productImages + "-1.png"
                    }" alt="$product.productName" class="product-img">
                    <a href="product.html?productId=${
                        relatedProduct.productId
                    }" class="product-btn">Buy</a>
                </div>
                <div class="product-desc">
                    <h4 class="product-title">${relatedProduct.productName}</h4>
                        <div class="product-rating">
                            <img src="../assets/star.png" alt="star" class="star">
                            <img src="../assets/star.png" alt="star" class="star">
                            <img src="../assets/star.png" alt="star" class="star">
                            <img src="../assets/star.png" alt="star" class="star">
                            <img src="../assets/star.png" alt="star" class="star">
                        </div>
                    <h5 class="product-price">${
                        relatedProduct.productPriceNew
                    }</h5>
                </div>
            </div>
        `;
    });

    templateRelatedProduct += `<div></div>`;

    productHeader.textContent = product[0].productName;
    categoryBread.textContent = product[0].productCategory;
    categoryBread.href =
        "category.html?category=" + product[0].productCategory.toLowerCase();
    productBread.textContent = product[0].productName;

    containerProductImage.innerHTML = templateProductImage;
    containerProductDetail.innerHTML = templateProductDetail;
    containerProductDescList.innerHTML = templateProductDescList;
    containerRelatedProduct.innerHTML = templateRelatedProduct;
});

function changeImageMain(number) {
    document.querySelector("img.product-images-main").src =
        "../assets/" + imageName + "-" + number + ".png";
}

let quantityToBuy = 0;

function increase() {
    if (quantityToBuy === 10) {
        alert("You have reach out maximum quantity to buy.");
        return;
    }

    quantityToBuy += 1;
    document.querySelector("#quantity").value = quantityToBuy;
}

function decrease() {
    if (quantityToBuy === 0) {
        return;
    }

    quantityToBuy -= 1;
    document.querySelector("#quantity").value = quantityToBuy;
}
