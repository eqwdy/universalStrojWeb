export async function createAdmin(formData, token) {
  try {
    const response = await fetch(
      `http://localhost/api/db/user/register/admin`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const answer = await response.json();

    if (!response.ok) {
      return new Error(answer.message || "Ошибка регистрации");
    }

    return answer || new Error("Ошибка авторизации");
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function authAdmin(data) {
  try {
    const response = await fetch(`http://localhost/api/db/user/auth/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });

    const answer = await response.json();

    if (!response.ok) {
      return new Error(answer.message || "Ошибка авторизации");
    }

    const token = answer.token;
    return token || new Error("Ошибка авторизации");
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function getAdmins(token) {
  try {
    const response = await fetch(`http://localhost/api/db/user/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const answer = await response.json();

    if (!response.ok) {
      return new Error(answer.message || "Ошибка регистрации");
    }

    return answer || new Error("Ошибка регистрации");
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}

export async function deleteAdmin(id, token) {
  try {
    const response = await fetch(`http://localhost/api/db/user/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const answer = await response.json();

    if (!response.ok) {
      return new Error(answer.message || "Ошибка регистрации");
    }

    return answer || new Error("Ошибка авторизации");
  } catch (error) {
    return new Error(error.message || "Ошибка запроса");
  }
}
