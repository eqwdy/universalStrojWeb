import { loginUser } from "../backendRequsts/usersCRUD.js";
import { getJWTToken, setJWTToken } from "../addition/jwtTokenControl.js";

const form = document.getElementById("form");
const validator = new JustValidate("#form");
const formTel = document.getElementById("formTel");
const formTelMask = new Inputmask("+7(999) 999-99-99");
formTelMask.mask(formTel);

validator
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

    const answer = await loginUser(formData);
    if (answer instanceof Error) {
      switch (answer.message) {
        case "User wasnt found":
          return badAnswerPopup("Пользователь не найден");

        case "Uncorrect password":
          return badAnswerPopup("Неверный пароль");

        default:
          return badAnswerPopup("Ошибка при авторизации");
      }
    }

    if (!answer.token) {
      console.log(answer);
      return badAnswerPopup("Ошибка токена");
    }

    const token = answer.token;
    setJWTToken(token);

    if (getJWTToken()) {
      goodAnswerPopup("Авторизация прошла успешно");
      console.log(answer);
      form.reset();
    }
  });
