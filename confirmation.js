import {getParameter} from "./utilities.js";

// Entrée : id de commande
// Affiche l'id de commande
function displayOrderId(orderId) {
    let element = document.getElementById("order-id");
    element.innerHTML = "Identifiant de commande : " + orderId;
}

// Entrée : prix total
// Affiche le prix total
function displayTotal(total) {
    let element = document.getElementById('total');
    element.innerHTML = "Prix total : " + (total/100).toFixed(2) + " €";
}

displayTotal(getParameter("total"));
displayOrderId(getParameter("order-id"));