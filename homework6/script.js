"use strict";

const Product = function(title, img, price) {
    this.title = title;
    this.img = img;
    this.price = price;
};

const BasketProduct = function(amount, product) {
    this.amount = amount;
    this.product = product;
};

const catalog = {
    products: [],

    addProduct(product) {
        this.products.push(product);
    },
    render(selectorId, title) {
        const app = document.getElementById(selectorId);
        if (!app) return;

        app.insertAdjacentHTML("afterbegin", `<h2 class="title">${title}</h2>`);
        const productsDiv = document.createElement("div");
        productsDiv.className = "catalog__products";

        this.products.forEach((item, i) => {
            productsDiv.insertAdjacentHTML(
                "beforeend",
                `<article class="catalog__product">
                    <h3 class="catalog__product-title">${item.title}</h3>
                    <div class="catalog__product-img">
                        <img src="img/${item.img}" alt="${item.title}" class='img'>
                    </div>
                    <div class="catalog__controls">
                        <input id="amount_input_${i}" type="number" min="1" max="99" value="1" required>
                        <button id="add_${i}" onclick="basket.addProduct(document.getElementById('amount_input_${i}'), catalog.products[${i}])">Add to cart</button>
                    </div>
                    <div class="catalog__product-price">Price: <b>${item.price}</b> rubles.</div>
                </article>`
            );
        });
        app.appendChild(productsDiv);
    },
};

const basket = {
    totalSum: 0,
    totalAmount: 0,
    items: [],
    _app: null,
    _title: "",

    addProduct(inputNum, product) {
        const amount = +inputNum.value;
        if (amount <= 0 || amount > 99) return;

        this.items.push(new BasketProduct(amount, product));
        this.calculate();
        this.setData({ totalAmount: this.totalAmount, totalSum: this.totalSum });

        inputNum.value = 1;
    },
    clear() {
        basket.items = [];
        this.calculate();
        this.setData({ totalAmount: this.totalAmount, totalSum: this.totalSum });
    },
    calculate() {
        this.totalSum = this.items
            .map((item) => item.product.price * item.amount)
            .reduce((total, price) => total + price, 0);
        this.totalAmount = this.items.reduce(
            (total, item) => total + item.amount,
            0
        );
    },
    // Что-то похожее на реактивность.
    template(data) {
        let html = "<p>Корзина пуста.</p>";

        if (data.totalAmount > 0 && data.totalSum > 0) {
            html = `<p>В корзине: <b>${data.totalAmount}</b> на сумму <b>${data.totalSum}</b> рублей.</p>`;
        }

        html += '<button onclick="basket.clear()">Очистить корзину</button>';

        return html;
    },
    setData(data) {
        this._app.innerHTML = this._title + this.template(data);
        const counter = document.getElementById("cart_counter");
        if (!counter) return;
        counter.innerText = data.totalAmount;
    },

    render(selectorId, title) {
        this._app = document.getElementById(selectorId);
        if (!this._app) return;

        this._title = `<h2 class="title">${title}</h2>`;
        this.setData({ totalAmount: this.totalAmount, totalSum: this.totalSum });
    },
};

catalog.addProduct(new Product("Peaches", "peaches.jpg", 350));
catalog.addProduct(new Product("Apples", "apples.jpg", 240));
catalog.addProduct(new Product("Bread", "bread.jpg", 100));
catalog.addProduct(new Product("Corn", "corn.jpg", 150));

catalog.render("catalog_app", "Catalog");

basket.render("basket_app", "Basket");

const images = [...document.querySelectorAll(".img")];
const modal = document.querySelector(".modal");
const largeImages = ["peaches.jpg", "apples1.jpg", "bread1.jpg", "corn.jpg"];

const addImg = (img) => {
    const largeImg = document.createElement("img");
    largeImg.classList.add("img-large");
    largeImg.setAttribute("src", `img/max/${img}`);
    modal.appendChild(largeImg);
};

window.addEventListener("click", (e) => {
    if (e.target.classList[0] === "modal") {
        modal.classList.remove("active");
        modal.innerHTML = "";
    }
});

images.forEach((el, i) => {
    el.addEventListener("click", () => {
        modal.classList.add("active");
        addImg(largeImages[i]);
    });
});