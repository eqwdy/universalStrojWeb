export async function createCard(formData, token) {
  try {
    const response = await fetch(`http://localhost/api/db/card`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
      );
    }

    const answer = await response.json();

    document.dispatchEvent(new CustomEvent("catalogCardDbChanged"), {
      detail: { event: answer.event },
    });

    return answer;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function createExamplesCards(token) {
  try {
    const response = await fetch(`http://localhost/api/db/card/examples`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
      );
    }

    const answer = await response.json();

    document.dispatchEvent(new CustomEvent("catalogCardDbChanged"), {
      detail: { event: answer.event },
    });

    return answer;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function getCards() {
  try {
    const response = await fetch("http://localhost/api/db/card", {
      method: "GET",
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
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
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
      );
    }

    const card = await response.json();

    return card;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function deleteAllCards(token) {
  try {
    const response = await fetch(`http://localhost/api/db/card`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
      );
    }

    const answer = await response.json();

    document.dispatchEvent(new CustomEvent("catalogCardDbChanged"), {
      detail: { event: answer.event },
    });

    return answer;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function deleteCardsById(id, token) {
  try {
    const response = await fetch(`http://localhost/api/db/card/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
      );
    }

    const answer = await response.json();

    document.dispatchEvent(new CustomEvent("catalogCardDbChanged"), {
      detail: { event: answer.event },
    });

    return answer;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function updateCard(id, formData, token) {
  try {
    const response = await fetch(`http://localhost/api/db/card/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`,
      );
    }

    const answer = await response.json();

    document.dispatchEvent(new CustomEvent("catalogCardDbChanged"), {
      detail: { event: answer.event },
    });

    return answer;
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}
