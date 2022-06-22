// 1- récupérer le panier à partir du localStorage
// 2- pour chaque produit du panier afficher les éléments sur la page

let products = JSON.parse(localStorage.getItem('panier'));
if (products === undefined || products === null){
    products = []
}
const section = document.getElementById('cart__items'); 
let totalPrice = 0;
let totalQuantity = 0;
for (let i=0; i<products.length; i++){

    totalPrice += products[i].quantity * products[i].price;
    totalQuantity += products[i].quantity;

    let elementArticle = document.createElement('article');
    elementArticle.dataId = products[i].id;
    elementArticle.dataColor = products[i].color;
    elementArticle.className = 'cart__item';

    elementArticle.setAttribute ("dataId", products[i].id);
    elementArticle.setAttribute ("dataColor", products[i].color);

    let divImg = document.createElement('div');
    divImg.className = 'cart__item__img';
    
    let divContent = document.createElement('div');
    divContent.className = 'cart__item__content';

    let divContentDescription = document.createElement('div');
    divContentDescription.className = 'cart__item__content__description';

    let divContentSettings = document.createElement('div');
    divContentSettings.className = 'cart__item__content__settings';

    let divContentQuantity = document.createElement('div');
    divContentQuantity.className = 'cart__item__content__settings__quantity';

    let divContentDelete = document.createElement('div');
    divContentDelete.className = 'cart__item__content__settings__delete';
    

    let elementImage = document.createElement('img');
    elementImage.src = products[i].image;
    elementImage.alt = products[i].imageAlt;
    divImg.appendChild(elementImage);

    let elementH2 = document.createElement('h2');
    elementH2.innerText = products[i].name;
    elementH2.className = 'productName';
    divContentDescription.appendChild(elementH2);

    let elementPPrice = document.createElement('p');
    elementPPrice.innerText = products[i].price;
    elementPPrice.className = 'productPrice';
    divContentDescription.appendChild(elementPPrice);

    let elementPColor = document.createElement('p');
    elementPColor.innerText = products[i].color;
    elementPColor.className = 'productColor';
    divContentDescription.appendChild(elementPColor);
    divContent.appendChild(divContentDescription);

    let elementPQuantity = document.createElement('p');
    elementPQuantity.innerText = 'Qté : ';
    elementPQuantity.className = 'productQuantity';
    divContentDescription.appendChild(elementPQuantity);

    let elementInputQuantity = document.createElement('input');
    elementInputQuantity.type = 'number';
    elementInputQuantity.className = 'itemQuantity';
    elementInputQuantity.name = 'itemQuantity';
    elementInputQuantity.value = products[i].quantity;

    elementInputQuantity.addEventListener('change', updateQuantityAndPrice) 

    divContentQuantity.appendChild(elementPQuantity);
    divContentQuantity.appendChild(elementInputQuantity);

    divContentSettings.appendChild(divContentQuantity);
    

    let elementDelete = document.createElement('p');
    elementDelete.innerText = 'Supprimer';
    elementDelete.className = 'deleteItem';
    divContentDelete.appendChild(elementDelete);
    divContentSettings.appendChild(divContentDelete);

    elementDelete.addEventListener('click', deleteProduct)
    function deleteProduct (e){
        const article = this.closest('article')
        const id = article.getAttribute('DataId');
        const color = article.getAttribute('Datacolor')
        console.log("id= "+id);
        console.log("color= "+color);
        // on récupére le panier du localstorage
        let products = JSON.parse(localStorage.getItem('panier'));
        // on supprime le produit du panier en créant un nouveau panier et en bouclant sur l'ancien
        const newPanier = []
        for (let i = 0; i < products.length; i++) {
            const currentProduct = products[i];
            if(currentProduct.id == id && currentProduct.color == color) {
                // on veut supprimer ce produit donc on ne l'ajoute pas
                products.splice(i,1);
                localStorage.setItem('panier', JSON.stringify(products))
                window.location.reload();
            }  
        }
    }

    divContent.appendChild(divContentSettings);


    elementArticle.appendChild(divImg);
    elementArticle.appendChild(divContent);
    section.appendChild(elementArticle);
}

document.getElementById("totalQuantity").innerText = totalQuantity;
document.getElementById("totalPrice").innerText = totalPrice;

// Mettre à jour la quantité et le prix
function updateQuantityAndPrice(e){
    const newValue = e.target.value;
    const article = this.closest('article')
    const id = article.getAttribute('DataId');
    const color = article.getAttribute('Datacolor');

    // on récupére du localstorage le produit concerné
    let products = JSON.parse(localStorage.getItem('panier'));
    const product = products.find(p => p.id === id && p.color === color)
    // on lui assigne la nouvelle valeur
    product.quantity = parseInt (newValue);
    localStorage.setItem('panier', JSON.stringify(products));
    // on recalcule le total et la quantité
    let totalPrice = 0;
    let totalQuantity = 0;
    for (let i=0; i<products.length; i++){
        totalPrice += products[i].quantity * products[i].price;
        totalQuantity += products[i].quantity;
        
    }
    document.getElementById("totalQuantity").innerText = totalQuantity;
    document.getElementById("totalPrice").innerText = totalPrice;
}

////////REGEX//////////

/* LE FORMULAIRE */

// sélection du bouton Valider
const btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  // Regex pour le contrôle des champs Prénom, Nom et Ville
  const regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  // Regex pour le contrôle du champ Adresse
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  // Regex pour le contrôle du champ Email
  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonctions de contrôle du champ Prénom:
  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      inputFirstName.style.backgroundColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      inputFirstName.style.backgroundColor = "#FF6F61";

      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ Prénom de formulaire invalide, ex: Paul";
      return false;
    }
  }

  // Fonctions de contrôle du champ Nom:
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (regExPrenomNomVille(nom)) {
      inputLastName.style.backgroundColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ Nom de formulaire invalide, ex: Durand";
      return false;
    }
  }

  // Fonctions de contrôle du champ Adresse:
  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (regExAdresse(adresse)) {
      inputAddress.style.backgroundColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";

      document.querySelector("#addressErrorMsg").textContent =
        "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
      return false;
    }
  }

  // Fonctions de contrôle du champ Ville:
  function cityControl() {
    const ville = contact.city;
    let inputCity = document.querySelector("#city");
    if (regExPrenomNomVille(ville)) {
      inputCity.style.backgroundColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";

      document.querySelector("#cityErrorMsg").textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }
  }

  // Fonctions de contrôle du champ Email:
  function mailControl() {
    const courriel = contact.email;
    let inputMail = document.querySelector("#email");
    if (regExEmail(courriel)) {
      inputMail.style.backgroundColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputMail.style.backgroundColor = "#FF6F61";

      document.querySelector("#emailErrorMsg").textContent =
        "Champ Email de formulaire invalide, ex: example@contact.fr";
      return false;
    }
  }

  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistrer le formulaire dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));

    document.querySelector("#order").value =
      "Articles et formulaire valide\n Passer commande !";
    sendToServer();
  } else {
    error("Veuillez bien remplir le formulaire");
  }

   
  /* REQUÊTE DU SERVEUR ET POST DES DONNÉES */
  function sendToServer() {
    const sendToServer = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Récupération et stockage de la réponse de l'API (orderId)
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
      });

    // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId;
    }
  }
;

/* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES */

// Maintenir le contenu du localStorage dans le champs du formulaire

let dataFormulaire = JSON.parse(localStorage.getItem("contact"));

console.log(dataFormulaire);
if (dataFormulaire) {
  document.querySelector("#firstName").value = dataFormulaire.firstName;
  document.querySelector("#lastName").value = dataFormulaire.lastName;
  document.querySelector("#address").value = dataFormulaire.address;
  document.querySelector("#city").value = dataFormulaire.city;
  document.querySelector("#email").value = dataFormulaire.email;
} else {
  console.log("Le formulaire est vide");}
});
//RECUPERATION DU NUMERO DE COMMANDE DANS L'URL POUR AFFICHAGE

