async function sendDataToTg(formData) {
  try {
    const response = await fetch(
      //   "https://xn----82-53dkc5deutityk0kl.xn--p1ai/botApi",
      "http://localhost/botApi",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `${response.status}: ${errorData.errorType || "Неизвестный сбой"}`
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
