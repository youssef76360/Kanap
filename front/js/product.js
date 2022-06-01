// 1- récupérer la variable id dans l'url
// 2- utiliser l'id récupéré pour fetch le produit concerné
// 3- créer les éléments dans le dom (cf. commentaires html)
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
console.log(id);

// on déclare le produit qui sera utilisé par les fonctions plus tard
let product = undefined;

fetch('http://localhost:3000/api/products/'+id)
.then(response => response.json())
.then(responseProduit => {
    product = responseProduit;
    let image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    const itemImg = document.querySelector('.item__img');
    itemImg.appendChild(image);
    
    let title = document.getElementById('title');
    title.innerText = product.name;

    let price = document.getElementById('price');
    price.innerText = product.price;

    let description = document.getElementById('description');
    description.innerText = product.description;

    for (let i = 0; i < product.colors.length; i++ ){
        const colors = document.getElementById('colors');
        let option = document.createElement('option');
        option.innerText = product.colors[i];
        option.value = product.colors[i];

        colors.appendChild(option);
    }
});

const button = document.getElementById('addToCart');
button.addEventListener('click', function(){
    // on récupére le panier depuis le localStorage
    let panier = JSON.parse(localStorage.getItem('panier'));
    if (panier === undefined || panier === null){
        panier = []
    }
    console.log(panier);

    // on récupère la couleur
    let color = document.getElementById('colors').value;
    // on récupère la quantité
    let quantity = parseInt(document.getElementById('quantity').value);
    
    // permet de savoir si c'est une mise à jour (true) ou un ajout (false)
    let update = false
    // on va parcourir le panier à la recherche du même produit
    for (let i = 0; i < panier.length; i++ ){
        let memeId = panier[i].id === product._id
        let memeCouleur = panier[i].color === color
        
        if (memeId && memeCouleur) {
            update = true
            // si trouvé, on modifie la quantité
            panier[i].quantity += quantity
        }
    }
        
    // sinon on l'ajoute au panier

    if (update == false ){
        panier.push({
            id: product._id,
            image: product.imageUrl,
            imageAlt: product.imageAlt,
            name: product.name,
            price:product.price,
            color: color,
            quantity: quantity,
        });

    }
    
    // on met à jour le localstorage
    localStorage.setItem('panier', JSON.stringify(panier));
    alert("ajouté au panier");
    window.location.replace('http://127.0.0.1:5500/front/html/cart.html');
});