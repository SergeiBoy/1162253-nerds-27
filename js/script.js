
var button = document.querySelector(".map button");

var popup = document.querySelector(".modal-message");
var close = popup.querySelector(".close-cross");

var form = popup.querySelector(".message-form");
var personName = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var text = popup.querySelector("[name=text]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

button.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-message-show");

  if (storageName) {
    personName.value = storageName;
    email.focus();
  }
  if (storageEmail) {
    email.value = storageEmail;
    text.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-message-show");
  popup.classList.remove("modal-message-error");
  personName.required = false;
  email.required = false;
});

form.addEventListener("submit", function (evt) {
  if (!personName.value || !email.value) {
    evt.preventDefault();
      if (!personName.value) {
        personName.required = true;
      }
      if (!email.value) {
        email.required = true;
      }
    popup.classList.remove("modal-message-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-message-error");
  } else {
    if (isStorageSupport) {
	  localStorage.setItem("name", personName.value);
	  localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-message-show")) {
      popup.classList.remove("modal-message-show");
      popup.classList.remove("modal-message-error");
      personName.required = false;
      email.required = false;
    }
  }
});
