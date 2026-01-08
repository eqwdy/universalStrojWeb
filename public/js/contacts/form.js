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
  .onSuccess(async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let result = await sendDataToTg(formData);
    if (result.success) {
      goodAnswerPopup(
        "<span>Ваша заяка <br />отправленна!</span> <span>Мы вам перезвоним</span>"
      );

      form.reset();
      if (openedModalBtn) {
        smartCloseOverlay(openedModalBtn);
      } else {
        closeOverlay();
      }
    } else {
      badAnswerPopup("<span>Ошибка при отправке!</span>");
    }
  });
