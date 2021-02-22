export const SERVER = 'http://192.168.1.21:3000/api/teddies/';

// fichier: produit.js et panier.js
// recupère l'information du produit
export async function fetchProductInfo(id){
    let response = await fetch(SERVER + id);
    let productInfo = await response.json();
    
    return productInfo;
}

// fichier : catalogue.js
//  recupère (tous)les produits
export async function fetchProducts() {
    let response = await fetch(SERVER);
    let products = await response.json();
    
    return products;
}

// fichier :  panier.js
// Envoyer des données du formulaire
export async function postFormData(firstname, lastname, city, address, email, products){
    let url = SERVER + "order";
    let body = {
        contact : {
            firstName: firstname,
            lastName: lastname,
            city: city,
            address: address,
            email: email
        },
        products : products,
    };

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    
    let toJson = await response.json();
    
    return toJson;
}