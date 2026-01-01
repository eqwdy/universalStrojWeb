const validator = new JustValidate("#form");

validator
  .addField("#formName", [
    {
      rule: "required",
      errorMessage: "Введите ваше имя!",
    },
  ])
  .addField("#formTel", [
    {
      rule: "required",
      errorMessage: "Введите ваш телефон!",
    },
  ])
  .onSuccess((e) => {
    e.preventDefault();

    const form = e.target;
    form.reset();
    console.log("Сработало!");
    togglePopup();
  });
