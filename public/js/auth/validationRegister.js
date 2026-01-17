import { createUser } from "../backendRequsts/dbUsersCRUD.js";

const form = document.getElementById("form");
const validator = new JustValidate("#form");
const formTel = document.getElementById("formTel");
const formTelMask = new Inputmask("+7(999) 999-99-99");
formTelMask.mask(formTel);

validator
  .addField("#formName", [
    {
      rule: "required",
      errorMessage: "Введите имя!",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!",
    },
  ])
  .addField("#formTel", [
    {
      validator: () => {
        const digits = formTel.inputmask.unmaskedvalue();
        return digits.length >= 10;
      },
      errorMessage: "Введите телефон!",
    },
  ])
  .addField("#formPass", [
    {
      rule: "required",
      errorMessage: "Введите пароль!",
    },
    {
      rule: "minLength",
      value: 4,
      errorMessage: "Минимум 4 символа!",
    },
  ])
  .onSuccess(async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const answer = await createUser(formData);
    if (answer instanceof Error) {
      switch (answer.message) {
        case "Missing or uncorrect name":
          return badAnswerPopup("Некорректное имя");

        case "Missing or uncorrect telephone":
          return badAnswerPopup("Некорректный телефон");

        case "Missing or uncorrect password":
          return badAnswerPopup("Некорректный пароль");

        case "This telephone is already in use":
          return badAnswerPopup("Этот телефон уже используется");

        default:
          return badAnswerPopup("Ошибка при регистрации");
      }
    }

    if (!answer.token) {
      console.log(answer);
      return badAnswerPopup("Ошибка токена");
    }

    goodAnswerPopup("Регистрация прошла успешно");
    console.log(answer);
  });
