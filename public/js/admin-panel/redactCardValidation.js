import { getJWTToken } from "../addition/jwtTokenControl.js";
import { choseCloseOverlay } from "../addition/modalsControl.js";
import { updateCard } from "../backendRequsts/cardsCRUD.js";
import RedactCardAdditionsController from "../addition/RedactCardAdditionsController.js";

const overlayRedact = document.getElementById("overlayRedact");
const formRedact = document.getElementById("formRedact");
let openedOverlayRedactButton = null;

const validatorRedact = new JustValidate("#formRedact");
const titleEl = document.getElementById("redactTitle");
const priceEl = document.getElementById("redactPrice");
const descEl = document.getElementById("redactDescription");

validatorRedact
  .addField("#redactTitle", [
    {
      validator: () => {
        const title = titleEl.value.trim();
        const price = priceEl.value.trim();
        const desc = descEl.value.trim();
        return title !== "" || price !== "" || desc !== "";
      },
      errorMessage: "Заполните хотя бы одно поле!",
    },
  ])
  .addField("#redactPrice", [
    {
      validator: () => {
        const title = titleEl.value.trim();
        const price = priceEl.value.trim();
        const desc = descEl.value.trim();
        return title !== "" || price !== "" || desc !== "";
      },
      errorMessage: "Заполните хотя бы одно поле!",
    },
  ])
  .addField("#redactDescription", [
    {
      validator: () => {
        const title = titleEl.value.trim();
        const price = priceEl.value.trim();
        const desc = descEl.value.trim();
        return title !== "" || price !== "" || desc !== "";
      },
      errorMessage: "Заполните хотя бы одно поле!",
    },
  ])
  .onSuccess(async (e) => {
    e.preventDefault();
    const id = formRedact.dataset.productId;
    const formRedactData = RedactCardAdditionsController.collectData();

    try {
      const answer = await updateCard(id, formRedactData, getJWTToken());

      if (answer instanceof Error) {
        switch (answer.message) {
          case "Card not found":
            return badAnswerPopup("Товар не найден!");

          default:
            return badAnswerPopup("Ошибка при изменение товара!");
        }
      }

      goodAnswerPopup("Изменение товара прошло успешно!");
      console.log(answer);
      formRedact.reset();
      choseCloseOverlay(overlayRedact, openedOverlayRedactButton);

      document.dispatchEvent(new Event("cardRedact"));
    } catch (e) {
      console.error(e);
      return badAnswerPopup("Неожиданная ошибка при изменении товара!");
    }
  });
