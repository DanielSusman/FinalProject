const formElem = document.getElementById("contact-form");
const NameElem = document.getElementById("name");
const emailNameElem = document.getElementById("email");
const messageElem = document.getElementById("message");

console.log(NameElem, emailNameElem, messageElem, formElem);

class UI {
  constructor() {
    this.allElementsAreValid = true;
    this.submitNumbers = 0;
  }

  showError(elem, message) {
    elem.parentElement.classList.add("error");
    const smallElem = elem.parentElement.querySelector("small");
    smallElem.innerHTML = message;
  }

  showSuccess(elem) {
    elem.parentElement.classList.remove("error");
    elem.parentElement.classList.add("success");
  }

  showSubmitSuccessMessage() {
    if (this.allElementsAreValid && this.submitNumbers == 0) {
      let successMessage = document.createElement("p");
      successMessage.classList.add("success");
      successMessage.innerHTML =
        "Va multumim pentru mesaj " + NameElem.value + " " + "!";
      let divFirstInput = document.getElementById("first-input");
      formElem.insertBefore(successMessage, divFirstInput);

      setTimeout(() => {
        successMessage.remove();
      }, 2000);
      this.submitNumbers++;
    }
  }

  clearFields() {
    formElem.reset();
    NameElem.parentElement.classList.remove("success");
    emailNameElem.parentElement.classList.remove("success");
    messageElem.parentElement.classList.remove("success");
  }
}

formElem.addEventListener("submit", (e) => {
  e.preventDefault();

  let ui = new UI();
  console.log(ui.allElementsAreValid);

  if (NameElem.value === "") {
    ui.showError(NameElem, "Nume obligatoriu!");
    ui.allElementsAreValid = false;
  } else {
    ui.showSuccess(NameElem);
  }

  if (emailNameElem.value === "") {
    ui.showError(emailNameElem, "Email obligatoriu!");
    ui.allElementsAreValid = false;
  } else {
    ui.showSuccess(emailNameElem);
  }

  if (messageElem.value === "") {
    ui.showError(messageElem, "Mesaj obligatoriu!");
    ui.allElementsAreValid = false;
  } else {
    ui.showSuccess(messageElem);
  }

  ui.showSubmitSuccessMessage();
  ui.clearFields();
});
