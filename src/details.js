document.addEventListener("DOMContentLoaded", getProductByIdFromJSON);

const urlParams = new URLSearchParams(window.location.search);
let wineDetails = {};
let cartItems = [];

function getProductByIdFromJSON() {
  if (urlParams.has("id")) {
    const wineId = Number(urlParams.get("id"));
    fetch("http://localhost:3000/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        wineDetails = products.find((product) => product.id === wineId);
        createDetailElement(wineDetails);
      });
  }
}

function createDetailElement(wineDetails) {
  let output = "";
  output += `<div>
    <div class="main-description">
        <span>${wineDetails.denumire}</span><br>
        <span>${wineDetails.alcool}</span>
    </div>
    <div class="characteristics">
        <div class="attributes">
            <span>Tara de origine:</span>
            <span>${wineDetails.taradeorigine}</span>
            <br><br>
        </div>
        <div class="attributes">
            <span>Regiune:</span>
            <span>${wineDetails.regiune}</span>
            <br><br>
        </div>
        <div class="attributes">
            <span>Culoare:</span>
            <span>${wineDetails.culoare}</span>
            <br><br>
        </div>
        <div class="attributes">
            <span>Stil:</span>
            <span>${wineDetails.stil}</span>
            <br><br>
        </div>
        <div class="attributes">
            <span>Soi:</span>
            <span>${wineDetails.soi}</span>
            <br><br>
        </div>
        <div class="attributes">
            <span>Stoc:</span>
            <span>${wineDetails.stoc}</span>
        </div>
    </div>
    </div>
    <div>
        <img class="details-image" src="${wineDetails.image}"/>
    </div>
    <div>
        <div>
            <span class="price">Pret: ${wineDetails.pret} Lei</span>
            <div>
                <input type="number" id="cantitate" value=1 />
                <br>
                <button class="btn" id="shop-button">Adauga in cos</button>
            </div>
            <div class="description">
                <span>${wineDetails.descriere}</span>   
            </div>
        </div>
    </div>`;
  document.getElementById("output-details").innerHTML += output;
  document.getElementById("shop-button").addEventListener("click", addToCart);
}

function addToCart() {
  if (
    window.localStorage.cartItems &&
    window.localStorage.cartItems.length > 0
  ) {
    cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
  } else {
    cartItems = [];
  }

  const cantitate = document.getElementById("cantitate").value;
  wineDetails.cantitate = cantitate;
  wineDetails.subTotal = wineDetails.cantitate * wineDetails.pret;
  cartItems.push(wineDetails);
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  console.log(window.localStorage.cartItems);
}
