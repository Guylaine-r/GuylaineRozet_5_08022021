import {fetchProductInfo} from "./backend.js";

// fonction fetchProductInfo (recupère les informations du produit API) => fct asynchrone (promesse)

// Afficher un produit
const displayProduct = (product) => {
    let element = document.createElement("div");
    element.classList.add('d-flex', 'flex-row', 'mt-5');
    element.innerHTML = `
        <img class="image-catalogue" src="${product.imageUrl}" alt="photo de ${product.name}" > 
        <div class="d-flex flex-column justify-content-between ms-3 container-fluid">
            <div class="d-flex flex-column">
                <span class="fs-1 font-bold">${product.name}</span>
                <p>${product.description}</p>
                <label for="color-selection">Couleur :</label>
                <select class="form-control" id="color-selection">
                </select>
            </div>
            <span class="fs-3 text-end font-bold mt-3">${(product.price/100).toFixed(2)}€</span>
            <div class="d-flex flex-row-reverse mt-5">
                <button type="button" id="add-to-cart-button" class="btn btn-primary" >Ajouter au panier</button>
            </div>
            
        </div>
    `;
    let container = document.getElementById("container");
    container.appendChild(element);

    // Ajout des options
    let select = document.getElementById("color-selection");
    product.colors.forEach(color => {
        let option = document.createElement("option");
        option.innerText = color;
        select.appendChild(option);
    });

    // Ajouter évènement onclick au bouton
    document.getElementById("add-to-cart-button").addEventListener('click', () => {
        AddToCart(product._id); 
        document.location.href = "panier.html";
    });
}

// Ajouter au panier à l'aide du bouton "ajouter au panier"
function AddToCart(id) {
    if(localStorage.panier == undefined){
        localStorage.panier = JSON.stringify([id]);
    }else{
        let panier = JSON.parse(localStorage.panier);
        panier.push(id);
        localStorage.panier = JSON.stringify(panier);
    }
}


async function onLoad(){
    let queryString = window.location.search;
    let parameters = new URLSearchParams(queryString);
    let productId = parameters.get("id");
    
    let productInfo = await fetchProductInfo(productId);
    displayProduct(productInfo);
}

onLoad();