export async function createUser(data) {
  try {
    const response = await fetch("http://localhost/api/db/user/register", {
      method: "POST",
      body: data,
    });

    const answer = await response.json();

    if (!response.ok) {
      return new Error(answer.message || "Ошибка регистрации");
    }

    return { token: answer.token };
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function authUser(data) {
  try {
    const response = await fetch(`http://localhost/api/db/user/login`, {
      method: "POST",
      body: data,
    });

    const answer = await response.json();

    if (!response.ok) {
      return new Error(answer.message || "Ошибка регистрации");
    }

    const token = answer.token;
    return token || new Error("Ошибка авторизации");
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}
