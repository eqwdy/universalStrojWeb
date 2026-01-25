// import { getCardById } from "../backendRequsts/cardsCRUD.js";
// import { getJWTToken } from "../addition/jwtTokenControl.js";

const redactAdditionsList = document.getElementById("redactAdditionsList");
const redactAdditionButtonAdd = document.getElementById(
  "redactAdditionButtonAdd",
);

// Append addition
redactAdditionButtonAdd.addEventListener("click", () => {
  const newAddition = createAddition();
  redactAdditionsList.insertBefore(
    newAddition,
    redactAdditionButtonAdd.closest(".redact-form__addition"),
  );
});

// Input logic
const inputs = document.querySelectorAll(".addition__content");
inputs.forEach((input) => {
  const addition = input.closest(".redact-form__addition");
  const deleteBtn = addition.querySelector(".addition__delete");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addition.remove();
  });

  function resize() {
    const btnWidth = deleteBtn ? deleteBtn.offsetWidth : 0;
    input.style.width = `calc(${input.value.length + 1}ch + ${btnWidth}px)`;
  }

  resize();
  input.addEventListener("input", () => {
    resize();
    input.name = input.value;
  });
  input.addEventListener("change", () => {
    if (input.value === "") {
      addition.remove();
    }
  });
});

function createAddition(text = null) {
  const li = document.createElement("li");
  li.classList.add("redact-form__addition");

  const addition = document.createElement("div");
  addition.classList.add("addition");

  const input = document.createElement("input");
  input.classList.add("addition__content", "redact-form__input");
  if (text) {
    input.value = text;
    input.name = text;
  }

  const button = document.createElement("button");
  button.classList.add("addition__delete");
  button.type = "button";
  button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke-width="0" />
        <g stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier">
        <path
            d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
            stroke="#ee2020"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        </g>
    </svg>`;

  addition.appendChild(input);
  addition.appendChild(button);

  li.appendChild(addition);

  return li;
}
