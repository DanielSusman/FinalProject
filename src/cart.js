document.addEventListener("DOMContentLoaded", displayProductsFromLocalStorage);
document.addEventListener("DOMContentLoaded", cartLogic);

const cartTable = document.getElementById("cart-table");
const cartTotal = document.getElementById("cart-total");

let outputTable = "";
let outputTotal = "";
let totalCartValue = 0;

let cartItems = JSON.parse(window.localStorage.getItem("cartItems"));

function displayProductsFromLocalStorage() {
  cartItems.forEach((cartItem) => {
    createTableELement(cartItem);
    totalCartValue += cartItem.subTotal;
  });
  document.getElementById("cart-table").innerHTML += outputTable;
  createTotalValueElement(totalCartValue);
  cartTotal.innerHTML += outputTotal;
}

function createTableELement(cartItem) {
  outputTable += `<tr>
                    <td><a href="./details.html?id=${cartItem.id}">${cartItem.denumire}</a></td>
                    <td>${cartItem.pret}</td>
                    <td>
                        <span style="cursor: pointer" class="decrease" data-id=${cartItem.id}>&#x00AB</span>
                        <span>${cartItem.cantitate}</span>
                        <span style="cursor: pointer" class="increase" data-id=${cartItem.id}>&#x00BB</span>
                    </td>
                    <td data-id=${cartItem.id}>${cartItem.subTotal}</td>
                    <td><span style="cursor: pointer" class="remove" data-id=${cartItem.id}>Sterge</span></td>
                </tr>`;
}

function createTotalValueElement(totalCartValue) {
  outputTotal += `<span id="total-container">${totalCartValue}</span>`;
}

function cartLogic() {
  cartTable.addEventListener("click", (e) => {
    const target = e.target.closest("span");
    const targetElement = target.classList.contains("remove");
    if (!target) return;

    const id = parseInt(target.dataset.id, 10);
    let cartItem = cartItems.find((item) => item.id === id);

    if (targetElement) {
      target.parentElement.parentElement.remove();
      cartItems = cartItems.filter((item) => item.id !== cartItem.id);
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));

      totalCartValue = totalCartValue - cartItem.subTotal;
      document.getElementById("total-container").innerHTML = totalCartValue;
    } else if (target.classList.contains("increase")) {
      cartItem.cantitate++;
      cartItem.subTotal = cartItem.cantitate * cartItem.pret;

      const itemIndex = cartItems.indexOf(cartItem);
      cartItems[itemIndex] = cartItem;

      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));

      target.previousElementSibling.innerText = cartItem.cantitate;
      target.parentElement.nextElementSibling.innerText = cartItem.subTotal;

      totalCartValue = totalCartValue + cartItem.pret;
      document.getElementById("total-container").innerHTML = totalCartValue;
    } else if (target.classList.contains("decrease")) {
      if (cartItem.cantitate > 1) {
        cartItem.cantitate--;
        cartItem.subTotal = cartItem.cantitate * cartItem.pret;

        const itemIndex = cartItems.indexOf(cartItem);
        cartItems[itemIndex] = cartItem;

        window.localStorage.setItem("cartItems", JSON.stringify(cartItems));

        target.nextElementSibling.innerText = cartItem.cantitate;
        target.parentElement.nextElementSibling.innerText = cartItem.subTotal;

        totalCartValue = totalCartValue - cartItem.pret;
        document.getElementById("total-container").innerHTML = totalCartValue;
      } else {
        target.parentElement.parentElement.remove();
        cartItems = cartItems.filter((item) => item.id !== cartItem.id);
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
        totalCartValue = 0;
        document.getElementById("total-container").innerHTML = totalCartValue;
      }
    }
  });
}
