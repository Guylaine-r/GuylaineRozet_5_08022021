// Entrée : id de commande
// Affiche l'id de commande
function displayOrderId(orderId) {
    let element = document.getElementById("order-id");
    element.innerHTML = "Identifiant de commande : " + orderId;
    
    return element;
}

// Entrée : prix total
// Affiche le prix total
function displayTotal(total) {
    let element = document.getElementById('total');
    element.innerHTML = "Prix total : " + (total/100).toFixed(2) + " €";
    
    return element;
}

// Entrée : nom de paramètre
// Sortie : le paramètre dans l'url qui est associé à ce nom
function getParameter(parameterName) {
    let queryString = window.location.search;
    let parameters = new URLSearchParams(queryString);
    
    return parameters.get(parameterName);
}

displayTotal(getParameter("total"));
displayOrderId(getParameter("order-id"));