export function resize(input) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = getComputedStyle(input).font;
  const textWidth = ctx.measureText(input.value).width;
  const maxWidth = 300;
  const minWidth = 80;
  const paddingsWidth = 45;
  const bordersWidth = 2;
  input.style.width =
    Math.min(
      Math.max(Math.ceil(textWidth + paddingsWidth + bordersWidth), minWidth),
      maxWidth,
    ) + "px";
}

export function createAddition(text = null) {
  const li = document.createElement("li");
  li.classList.add("redact-form__addition");

  const addition = document.createElement("div");
  addition.classList.add("addition");

  const input = document.createElement("input");
  input.classList.add("addition__content", "redact-form__input");
  input.value = text || "";
  input.name = text || " ";

  const button = document.createElement("button");
  button.classList.add("addition__delete");
  button.type = "button";
  button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke-width="0" />
        <g stroke-linecap="round" stroke-linejoin="round"/>
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

  document.dispatchEvent(
    new CustomEvent("redactAdditionAdd", {
      detail: { input },
    }),
  );

  return li;
}
