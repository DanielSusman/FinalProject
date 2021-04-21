document.addEventListener("DOMContentLoaded", getProductsFromJSON);

function getProductsFromJSON() {
  fetch("http://localhost:3000/products")
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((products) => {
      let output = "";
      products.forEach((product) => {
        output += `<div class="card">
                    <img class="wine-image" src="${product.image}" />
                    <span class="wine-name">${product.denumire}</span>
                    <div class="details-container">
                        <span class="wine-price">${product.pret} Lei</span>
                        <a href="./details.html?id=${product.id}" class="details-button">Details</a>
                    </div>
                    </div>
            `;
      });
      document.getElementById("output").innerHTML += output;
    });
}
