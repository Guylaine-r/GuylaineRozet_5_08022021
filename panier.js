import {postFormData, fetchProductInfo} from "./utilities.js";

// fonction fetchProductInfo (recupère les informations du produit API) => fct asynchrone (promesse)
// fonction postFormData (envoyer les données du formulaire API) =>  fct asynchrone (promesse)

// Entrée : prix total, identifiant de commande
// Redirige sur la page de confirmation qui a accès au prix total et à l'identifiant de commande (orderId)
function redirectToConfirmation(orderId, total) {
    window.location.href = "confirmation.html?order-id=" + orderId + "&total=" + total;
}

async function sendForm (){
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let city=  document.getElementById("city").value;
    let address = document.getElementById("address").value;
    let response = await postFormData(firstname, lastname, city, address, email, fetchPanier());
    let total = 0;
    response.products.forEach((element) => {
        total += element.price;
    });
    redirectToConfirmation(response.orderId, total);
}

// Entrée : données complètes d'un produit 
// Sortie : élément HTML correspondant au produit
function createCartProductElement(product) {
    let element = document.createElement("li");
    element.classList.add("list-group-item", "d-flex","flex-row");
    element.innerHTML = `
    <img class="image-panier" src="${product.imageUrl}" alt="photo de ${product.name}" >
    <div class="d-flex flex-row justify-content-between container-fluid">
        <div class="d-flex flex-column justify-content-between "> 
            <span class="fs-4">${product.name}</span>
        </div>
        <div class="d-flex flex-column">
            <span class="fs-5 font-bold">${(product.price/100).toFixed(2)}€</span>
        </div>
    </div>
    `;
    return element;
}

// Entrée : données partielles du panier 
// Sortie : données complètes du panier
async function buildFullCartData(panier) {
    let fullCartData = [];
    for(let i = 0; i < panier.length; i++) {
        fullCartData.push(await fetchProductInfo(panier[i]));
    }
    return fullCartData;
}

// Entrée : données complète de panier
// Affiche les éléments (données) du panier sur la page
function displayCartData(fullCartData) {
    let cart = document.getElementById('cart');
    cart.innerHTML = ""; //suppression des éléments éventuellement présent dans la id="cart"
    for(let i = 0; i < fullCartData.length; i++) {
        let product = fullCartData[i];
        let element = createCartProductElement(product);
        cart.appendChild(element);
    }
    return cart;
}

// Entrée : données complète de panier
// Affiche le total sur la page
function displayTotal(fullCartData) {
    let sum = 0;
    for(let i = 0; i < fullCartData.length; i++) {
        sum += fullCartData[i].price;
    }
    let element = document.getElementById("total");
    element.innerHTML = `
        <span class="font-bold">Total : ${(sum/100).toFixed(2)}€</span>
    `;
}

// Sortie : Données de panier dans le localStorage
function fetchPanier() {
    if (localStorage.panier == undefined){
        return [];
    }
    return JSON.parse(localStorage.panier);
}

// Supprimer le panier
function clearCart(){
    localStorage.removeItem('panier');
    refresh();
}

//rafraichir la page : lorsqu'on supprime le panier "il se mets directement à jour"
// Si le fetchPanier = 0 (vide) alors disabled ==> donc on ne peut pas appuyer sur le bouton "valider" le formulaire
async function refresh(){
    let cartData = fetchPanier();
    let fullCartData = await buildFullCartData(cartData);
    displayTotal(fullCartData);
    displayCartData(fullCartData);
    if(fetchPanier().length == 0){
        document.getElementById("submit-button").disabled = true;
    }
}

refresh();

// Ajouter évènement onclick au bouton
document.getElementById("clear-cart-button").addEventListener('click', () => {
    clearCart();
});


// Cela permet de valider ou non le formulaire selon si l'utilisateur remplit bien ou non le formulaire
//preventDefault() permet d'annuler un événement si annulable
let form = document.getElementById("form");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('was-validated');
    if(form.checkValidity()) {
       sendForm()
    }
});