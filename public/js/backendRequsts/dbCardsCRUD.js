export async function getCards() {
  try {
    const response = await fetch("http://localhost/api/db/card", {
      method: "GET",
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`
      );
    }

    const cards = await response.json();

    return cards;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function getCardById(id) {
  try {
    const response = await fetch(`http://localhost/api/db/card/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`
      );
    }

    const card = await response.json();

    return card;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}
