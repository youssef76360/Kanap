fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then(products => {
    console.log(products)

    const items = document.getElementById('items'); 
    for (let i=0; i<products.length; i++){

        let elementA = document.createElement('a');
        elementA.href = 'product.html?id=' + products[i]._id;

        let elementImage = document.createElement('img');
        elementImage.src = products[i].imageUrl;
        elementImage.alt = products[i].altTxt;

        let elementH3 = document.createElement('h3');
        elementH3.innerText = products[i].name;
        elementH3.className = 'productName';

        let elementP = document.createElement('p');
        elementP.innerText = products[i].description;
        elementP.className = 'productDescription';

        let elementArticle = document.createElement('article');
        elementArticle.appendChild(elementImage);
        elementArticle.appendChild(elementH3);
        elementArticle.appendChild(elementP);

        elementA.appendChild(elementArticle);
        items.appendChild(elementA);
    }
})
.catch(error => console.log(error))

