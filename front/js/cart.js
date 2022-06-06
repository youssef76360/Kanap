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

let firstNameValidator= new RegExp
(pattern="/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/")


function validationForm(){
    let valid = true;
    //validation firstname
    let firstNameValidator = new RegExp("[a-zA-Z]");
    let firstName = document.getElementById('firstname');
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    if (!firstNameValidator.test(firstName)){
        valid = false;

        firstNameErrorMsg.innerText = "le nom n'est pas au bon format";

    }
    else{
        firstNameErrorMsg.innerText = '';
    }
    //validation lastname
    let lastNameValidator = new RegExp("[a-zA-Z]");
    let lastName = document.getElementById('lastName');
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    if (!lastNameValidator.test(lastName)){
        valid = false;

        lastNameErrorMsg.innerText = "le prénom n'est pas au bon format";

    }
    else{
        lastNameErrorMsg.innerText = '';
    }
    //validation address
    let addressValidator = new RegExp(/^[0-9A-z\- ]+$/);
    let address = document.getElementById('address');
    let addressErrorMsg = document.getElementById('addressErrorMsg');
    if (!addressValidator.test(address)){
        valid = false;

        addressErrorMsg.innerText = "l'adresse n'est pas au bon format";

    }
    else{
        addressErrorMsg.innerText = '';
    }
    //validation city
    let cityValidator = new RegExp("[a-zA-Z]");
    let city = document.getElementById('city');
    let cityErrorMsg = document.getElementById('cityErrorMsg');
    if (!cityValidator.test(city)){
        valid = false;

        cityErrorMsg.innerText = "la ville n'est pas au bon format";

    }
    else{
        cityErrorMsg.innerText = '';
    }
    //validation email
    let emailValidator = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,4}$")
    let email = document.getElementById('email').value;
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    if (!emailValidator.test(email)){
        valid = false;
       
        emailErrorMsg.innerText = "l'email n'est pas valide";
    }
    else{
        emailErrorMsg.innerText = '';
    }
    //retour fonction valid
    return valid;
}
const orderButton = document.getElementById('order');
orderButton.addEventListener('click', function() {


    //récupérer validationForm
    let formIsValid = validationForm()
    if (!formIsValid) {
        alert('le formulaire est incorrect');
        return false;
    
    }

    let panier = JSON.parse(localStorage.getItem("panier"));
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    if (panier == null || panier.length < 1) {
        alert('le panier est vide')
        return false
    }

    //récupérer le localstorage
   
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        address:document.getElementById("address").value,
        city:document.getElementById("city").value,
        email:document.getElementById("email").value,
    }
    
    // va contenir les produits à envoyer à l'api
    let products = []
    panier.forEach((produit) => products.push(produit.id));

    // for (let i = 0; i< panier.length; i++){
    //     product.push(panier[i].id)}
    // }

    let orderObject = {
        contact,
        products
    }

    console.log(orderObject)

    fetch ('http://localhost:3000/api/products/order/',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(orderObject)
    })
    .then (res =>res.json())
    .then(function(data){
        localStorage.clear();
        document.location.href = 'http://127.0.0.1:5500/front/html/confirmation.html?orderId=' + data.orderId
    })
})









    //vérifier que le localstorage n'est pas vide


    //et que le formulaire est valide

    //si valide appel de l'API sur /order
    //vider le localstorage
    //se rendre sur la page confirmation.html en lui passant en param le num commande (API/order)



