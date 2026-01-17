async function sendDataToTg(formData) {
  try {
    const response = await fetch("http://localhost/api/bot/sendData", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return new Error(
        `${response.status}: ${response.statusText || "Неизвестный сбой"}`
      );
    }

    const answer = await response.json();
    if (answer.status === "error") {
      throw new Error(answer.errorType);
    }

    return { success: true };
  } catch (error) {
    console.error(`Ошибка отправки в Telegram:`, error);
    return { success: false, error: error };
  }
}
