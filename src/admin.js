document.addEventListener("DOMContentLoaded", getProductsFromJSON);
document.addEventListener("DOMContentLoaded", adminLogic);
document.getElementById("save-stuff").addEventListener("click", addProduct);

const adminForm = document.getElementById("submitProduct");
adminForm.addEventListener("submit", addProduct);

const adminTable = document.getElementById("admin-table");

let wineProducts = [];

function getProductsFromJSON() {
  fetch("http://localhost:3000/products")
    .then((res) => {
      return res.json();
    })
    .then((products) => {
      let output = "";
      wineProducts = products;
      products.forEach((product) => {
        output += `<tr>
                    <td><img style="width:60px;height:60px;" src="${product.image}"/></td>
                    <td><a href="./details.html?id=${product.id}">${product.denumire}</a></td>
                    <td>${product.pret}</td>
                    <td>${product.stoc}</td>
                    <td><span style="cursor: pointer" class="remove" data-id=${product.id}>Sterge</span></td>
                </tr>`;
      });
      document.getElementById("admin-table").innerHTML += output;
    });
}

function adminLogic() {
  adminTable.addEventListener("click", (e) => {
    const target = e.target.closest("span");
    const targetElement = target.classList.contains("remove");
    if (!target) return;

    const id = parseInt(target.dataset.id, 10);
    let productItem = wineProducts.find((item) => item.id === id);

    if (targetElement) {
      target.parentElement.parentElement.remove();
      fetch("http://localhost:3000/products/" + productItem.id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(() => {
          console.log(`Product with id ${productItem.id} deleted!`);
        })
        .catch(() => {
          console.log("Could not delete item...");
        });
    }
  });
}

function addProduct() {
  const imageValue = document.getElementById("image").value;
  const numeValue = document.getElementById("nume").value;
  const pretValue = document.getElementById("pret").value;
  const descriereValue = document.getElementById("descriere").value;
  const stocValue = document.getElementById("stoc").value;

  let product = {
    id: Math.random(),
    image: imageValue,
    denumire: numeValue,
    pret: pretValue,
    descriere: descriereValue,
    stoc: stocValue,
  };

  fetch("http://localhost:3000/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
    },
  }).then(() => {
    console.log(`Product with id ${product.id} added!`);
    document.getElementById("admin-create").style.display = "none";
    document.getElementById("output-admin").style.display = "initial";
    getProductsFromJSON();
  });
}
