import {fetchProducts} from "./utilities.js";

// fonction fetchProducts (recupère les produits API) => fct asynchrone (promesse)

const buildProductElement = (product) => {
    let element = document.createElement("a");
    element.classList.add("list-group-item","list-group-item-action", "d-flex","flex-row");
    element.href = "produit.html?id=" + product._id;
    element.innerHTML = `
        
        <img class="image-catalogue" src="${product.imageUrl}" alt="photo de ${product.name}">
        
        <div class="d-flex flex-column  ms-3 container-fluid">
            <span class="fs-1 font-bold">${product.name}</span>
            <p>${product.description}</p>
            <span class="fs-3 text-end font-bold" >${(product.price/100).toFixed(2)}€</span>
        </div>
    `;
    return element;
}

const displayProducts = (products) => {
    let list = document.getElementById("products-list");

    products.forEach((product) => {
        let element = buildProductElement(product);
        list.appendChild(element);
    });
}

async function onLoad() {
    let products = await fetchProducts();
    displayProducts(products);
}

onLoad();