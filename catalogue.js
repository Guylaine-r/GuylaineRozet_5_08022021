import {fetchProducts, postFormData} from "./utilities.js";

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

//affiche dans un élément HTML (ex: id= products-list) d'autre éléments HTML (ex: product => information du produit). qui correspondent à des info de produits
const displayProducts = (products) => {
    let list = document.getElementById("products-list");

    products.forEach((product) => {
        let element = buildProductElement(product);
        list.appendChild(element);
    });
}

// on met ces lignes de code dans une fonction asynchrone car nous avons besoin du await
// Fonction lancée au chargement de la page 
async function onLoad() {
    let products = await fetchProducts(); // On récupère du backend les informations du produit
    displayProducts(products); // On affiche les informations du produit
}
onLoad();